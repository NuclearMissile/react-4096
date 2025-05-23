import React, {useState, useEffect} from 'react';
import {Box, Grid, Paper, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import Tile from './Tile';
import SwipeHandler from './SwipeHandler';

// Styled components
const GameBoard = styled(Paper)(({theme}) => ({
    padding: theme.spacing(2),
    backgroundColor: '#bbada0',
    borderRadius: '8px',
    width: '500px',
    height: '500px',
    margin: '0 auto',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: 'calc(100vw - 32px)', // Full width minus padding
        maxWidth: '500px',
        maxHeight: '500px',
    },
}));

const GridCell = styled(Box)(() => ({
    backgroundColor: 'rgba(238, 228, 218, 0.35)',
    borderRadius: '6px',
    width: '100%',
    height: '100%',
}));

const Board = ({score, setScore, gameOver, setGameOver, resetTrigger}) => {
    const [board, setBoard] = useState([]);
    const [mergeAnimation, setMergeAnimation] = useState({});
    const [appearAnimation, setAppearAnimation] = useState({});

    // Initialize the board
    useEffect(() => {
        initializeBoard();
    }, []);

    // Reset the board when resetTrigger changes
    useEffect(() => {
        initializeBoard();
    }, [resetTrigger]);

    // Handle keyboard events
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameOver) return;

            if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
            }

            switch (e.key) {
                case 'ArrowUp':
                    moveUp();
                    break;
                case 'ArrowDown':
                    moveDown();
                    break;
                case 'ArrowLeft':
                    moveLeft();
                    break;
                case 'ArrowRight':
                    moveRight();
                    break;
                default:
                    return;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [board, gameOver]);

    // Initialize the board with two random tiles
    const initializeBoard = () => {
        const newBoard = Array(4).fill().map(() => Array(4).fill(0));
        const newAppearAnimation = {};
        newAppearAnimation[addRandomTile(newBoard)] = true;
        newAppearAnimation[addRandomTile(newBoard)] = true;
        setBoard(newBoard);
        setScore(0);
        setGameOver(false);
        setMergeAnimation({});
        setAppearAnimation(newAppearAnimation);
    };

    // Add a random tile (2 or 4) to an empty cell
    const addRandomTile = (board) => {
        const emptyCells = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    emptyCells.push({row: i, col: j});
                }
            }
        }

        if (emptyCells.length > 0) {
            const random = Math.random();
            const {row, col} = emptyCells[Math.floor(random * emptyCells.length)];
            board[row][col] = random < 0.7 ? 2 : (random < 0.9 ? 4 : 8);
            return `${row}-${col}`;
        }

        return 'dummy';
    };

    // Check if the game is over
    const checkGameOver = (board) => {
        // Check for empty cells
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) return false;
            }
        }

        // Check for possible merges horizontally
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === board[i][j + 1]) return false;
            }
        }

        // Check for possible merges vertically
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === board[i + 1][j]) return false;
            }
        }

        return true;
    };

    // Move tiles up
    const moveUp = () => {
        const newBoard = JSON.parse(JSON.stringify(board));
        const newMergeAnimation = {};
        const newAppearAnimation = {};
        let moved = false;
        let newScore = score;

        for (let j = 0; j < 4; j++) {
            for (let i = 1; i < 4; i++) {
                if (newBoard[i][j] !== 0) {
                    let row = i;
                    while (row > 0 && newBoard[row - 1][j] === 0) {
                        newBoard[row - 1][j] = newBoard[row][j];
                        newBoard[row][j] = 0;
                        row--;
                        moved = true;
                    }

                    if (row > 0 && newBoard[row - 1][j] === newBoard[row][j]) {
                        newBoard[row - 1][j] *= 2;
                        newScore += newBoard[row - 1][j];
                        newBoard[row][j] = 0;
                        moved = true;
                        newMergeAnimation[`${row - 1}-${j}`] = true;
                    }
                }
            }
        }

        if (moved) {
            newAppearAnimation[addRandomTile(newBoard)] = true;
            setBoard(newBoard);
            setScore(newScore);
            setMergeAnimation(newMergeAnimation);
            setAppearAnimation(newAppearAnimation);

            if (checkGameOver(newBoard)) {
                setGameOver(true);
            }
        }
    };

    // Move tiles down
    const moveDown = () => {
        const newBoard = JSON.parse(JSON.stringify(board));
        const newMergeAnimation = {};
        const newAppearAnimation = {};
        let moved = false;
        let newScore = score;

        for (let j = 0; j < 4; j++) {
            for (let i = 2; i >= 0; i--) {
                if (newBoard[i][j] !== 0) {
                    let row = i;
                    while (row < 3 && newBoard[row + 1][j] === 0) {
                        newBoard[row + 1][j] = newBoard[row][j];
                        newBoard[row][j] = 0;
                        row++;
                        moved = true;
                    }

                    if (row < 3 && newBoard[row + 1][j] === newBoard[row][j]) {
                        newBoard[row + 1][j] *= 2;
                        newScore += newBoard[row + 1][j];
                        newBoard[row][j] = 0;
                        moved = true;
                        newMergeAnimation[`${row + 1}-${j}`] = true;
                    }
                }
            }
        }

        if (moved) {
            newAppearAnimation[addRandomTile(newBoard)] = true;
            setBoard(newBoard);
            setScore(newScore);
            setMergeAnimation(newMergeAnimation);
            setAppearAnimation(newAppearAnimation);

            if (checkGameOver(newBoard)) {
                setGameOver(true);
            }
        }
    };

    // Move tiles left
    const moveLeft = () => {
        const newBoard = JSON.parse(JSON.stringify(board));
        const newMergeAnimation = {};
        const newAppearAnimation = {};
        let moved = false;
        let newScore = score;

        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                if (newBoard[i][j] !== 0) {
                    let col = j;
                    while (col > 0 && newBoard[i][col - 1] === 0) {
                        newBoard[i][col - 1] = newBoard[i][col];
                        newBoard[i][col] = 0;
                        col--;
                        moved = true;
                    }

                    if (col > 0 && newBoard[i][col - 1] === newBoard[i][col]) {
                        newBoard[i][col - 1] *= 2;
                        newScore += newBoard[i][col - 1];
                        newBoard[i][col] = 0;
                        moved = true;
                        newMergeAnimation[`${i}-${col - 1}`] = true;
                    }
                }
            }
        }

        if (moved) {
            newAppearAnimation[addRandomTile(newBoard)] = true;
            setBoard(newBoard);
            setScore(newScore);
            setMergeAnimation(newMergeAnimation);
            setAppearAnimation(newAppearAnimation);

            if (checkGameOver(newBoard)) {
                setGameOver(true);
            }
        }
    };

    // Move tiles right
    const moveRight = () => {
        const newBoard = JSON.parse(JSON.stringify(board));
        const newMergeAnimation = {};
        const newAppearAnimation = {};
        let moved = false;
        let newScore = score;

        for (let i = 0; i < 4; i++) {
            for (let j = 2; j >= 0; j--) {
                if (newBoard[i][j] !== 0) {
                    let col = j;
                    while (col < 3 && newBoard[i][col + 1] === 0) {
                        newBoard[i][col + 1] = newBoard[i][col];
                        newBoard[i][col] = 0;
                        col++;
                        moved = true;
                    }

                    if (col < 3 && newBoard[i][col + 1] === newBoard[i][col]) {
                        newBoard[i][col + 1] *= 2;
                        newScore += newBoard[i][col + 1];
                        newBoard[i][col] = 0;
                        moved = true;
                        newMergeAnimation[`${i}-${col + 1}`] = true;
                    }
                }
            }
        }

        if (moved) {
            newAppearAnimation[addRandomTile(newBoard)] = true;
            setBoard(newBoard);
            setScore(newScore);
            setMergeAnimation(newMergeAnimation);
            setAppearAnimation(newAppearAnimation);

            if (checkGameOver(newBoard)) {
                setGameOver(true);
            }
        }
    };

    return (
        <SwipeHandler
            onSwipeUp={moveUp}
            onSwipeDown={moveDown}
            onSwipeLeft={moveLeft}
            onSwipeRight={moveRight}
        >
            <GameBoard elevation={3}>
                <Grid container spacing={2} sx={{height: '100%'}}>
                    {Array(4).fill().map((_, rowIndex) => (
                        Array(4).fill().map((_, colIndex) => (
                            <Grid item xs={3} key={`${rowIndex}-${colIndex}`} sx={{height: '25%'}}>
                                <GridCell/>
                            </Grid>
                        ))
                    ))}
                </Grid>

                {/* Render tiles */}
                {board.map((row, rowIndex) => (
                    row.map((value, colIndex) => (
                        value !== 0 && (
                            <Tile
                                key={`tile-${rowIndex}-${colIndex}`}
                                value={value}
                                row={rowIndex}
                                col={colIndex}
                                mergeAnimation={mergeAnimation[`${rowIndex}-${colIndex}`]}
                                appearAnimation={appearAnimation[`${rowIndex}-${colIndex}`]}
                            />
                        )
                    ))
                ))}
            </GameBoard>
        </SwipeHandler>
    );
};

export default Board;
