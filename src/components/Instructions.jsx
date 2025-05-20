import React from 'react';
import {Box, Paper, Typography, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const InstructionsContainer = styled(Paper)(({theme}) => ({
    padding: theme.spacing(3),
    width: '500px',
    margin: '20px auto',
    backgroundColor: '#f9f6f2',
    borderRadius: '8px',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}));

const KeyboardKey = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee4da',
    borderRadius: '4px',
    padding: theme.spacing(1),
    width: '40px',
    height: '40px',
    margin: '0 auto',
    boxShadow: theme.shadows[1],
}));

const Instructions = () => {
    return (
        <InstructionsContainer elevation={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                How to Play
            </Typography>

            <Typography variant="body2">
                Use your arrow keys or swipe to move and merge the tiles.
                The goal is to create a tile with the number 4096.
            </Typography>

            <Grid container spacing={2} sx={{mt: 2}}>
                <Grid item xs={3}>
                    <KeyboardKey>
                        <KeyboardArrowUpIcon/>
                    </KeyboardKey>
                    <Typography variant="body2" align="center" sx={{mt: 1}}>
                        Up
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <KeyboardKey>
                        <KeyboardArrowDownIcon/>
                    </KeyboardKey>
                    <Typography variant="body2" align="center" sx={{mt: 1}}>
                        Down
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <KeyboardKey>
                        <KeyboardArrowLeftIcon/>
                    </KeyboardKey>
                    <Typography variant="body2" align="center" sx={{mt: 1}}>
                        Left
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <KeyboardKey>
                        <KeyboardArrowRightIcon/>
                    </KeyboardKey>
                    <Typography variant="body2" align="center" sx={{mt: 1}}>
                        Right
                    </Typography>
                </Grid>
            </Grid>

            <Typography variant="body2" sx={{mt: 3}}>
                <strong>Tip:</strong> Plan your moves carefully! Think ahead and try to keep your highest tiles in one
                corner.
            </Typography>
        </InstructionsContainer>
    );
};

export default Instructions;