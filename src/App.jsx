import {useState, useEffect} from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {CssBaseline, Container, Box} from '@mui/material';
import './App.css';

// Import components
import Board from './components/Board';
import GameControls from './components/GameControls';
import Instructions from './components/Instructions';

// Create Material-UI theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#776e65',
        },
        secondary: {
            main: '#bbada0',
        },
        background: {
            default: '#faf8ef',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

function App() {
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    // Load best score from localStorage
    useEffect(() => {
        const savedBestScore = localStorage.getItem('bestScore');
        if (savedBestScore) {
            setBestScore(parseInt(savedBestScore, 10));
        }
    }, []);

    // Update best score when score changes
    useEffect(() => {
        if (score > bestScore) {
            setBestScore(score);
            localStorage.setItem('bestScore', score.toString());
        }
    }, [score, bestScore]);

    // Handle game restart
    const handleRestart = () => {
        // The Board component will handle the actual reset
        // We just need to reset the game state here
        setGameOver(false);
        setScore(0);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="md" sx={{py: 4}}>
                <Box sx={{minHeight: '100vh'}}>
                    {/* Game Controls (Score, Best Score, New Game button) */}
                    <GameControls
                        score={score}
                        bestScore={bestScore}
                        gameOver={gameOver}
                        onRestart={handleRestart}
                    />

                    {/* Game Board */}
                    <Board
                        score={score}
                        setScore={setScore}
                        gameOver={gameOver}
                        setGameOver={setGameOver}
                    />

                    {/* Instructions */}
                    <Instructions/>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default App;
