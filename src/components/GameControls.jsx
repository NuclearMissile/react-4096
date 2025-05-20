import React from 'react';
import {Box, Button, Typography, Paper, Link} from '@mui/material';
import {styled} from '@mui/material/styles';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// Styled components
const ControlsContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '500px',
    margin: '0 auto 20px auto',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
}));

const ScoreBox = styled(Paper)(({theme}) => ({
    padding: theme.spacing(1, 2),
    backgroundColor: '#bbada0',
    borderRadius: '6px',
    minWidth: '120px',
    textAlign: 'center',
}));

const GameOverOverlay = styled(Box)(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(238, 228, 218, 0.73)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderRadius: '8px',
}));

const GameControls = ({score, bestScore, gameOver, onRestart}) => {
    return (
        <>
            <ControlsContainer>
                <Box>
                    <Link variant="h4" fontWeight="bold" color="primary" underline='none'
                          href="https://github.com/NuclearMissile/react-4096" target="_blank" rel="noreferrer">
                        4096
                    </Link>
                </Box>

                <Box sx={{display: 'flex', gap: 2}}>
                    <ScoreBox elevation={2}>
                        <Typography variant="body2" color="white">
                            SCORE
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" color="white">
                            {score}
                        </Typography>
                    </ScoreBox>

                    <ScoreBox elevation={2}>
                        <Typography variant="body2" color="white">
                            BEST
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" color="white">
                            {bestScore}
                        </Typography>
                    </ScoreBox>

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<RestartAltIcon/>}
                        onClick={onRestart}
                    >
                        New Game
                    </Button>
                </Box>
            </ControlsContainer>

            {gameOver && (
                <GameOverOverlay>
                    <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
                        Game Over!
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<RestartAltIcon/>}
                        onClick={onRestart}
                        size="large"
                    >
                        Try Again
                    </Button>
                </GameOverOverlay>
            )}
        </>
    );
};

export default GameControls;