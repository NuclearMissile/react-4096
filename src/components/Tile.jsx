import React from 'react';
import {Box, Typography} from '@mui/material';
import {keyframes, styled} from '@mui/material/styles';

// Animations
const appear = keyframes`
    0% {
        opacity: 0;
        transform: scale(0);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

const pop = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
`;

// Styled component for the tile
const TileBox = styled(Box)(({theme, value, mergeAnimation, appearAnimation}) => {
    // Define colors based on tile value
    const getBackgroundColor = () => {
        switch (value) {
            case 2:
                return '#eee4da';
            case 4:
                return '#ede0c8';
            case 8:
                return '#f2b179';
            case 16:
                return '#f59563';
            case 32:
                return '#f67c5f';
            case 64:
                return '#f65e3b';
            case 128:
                return '#edcf72';
            case 256:
                return '#edcc61';
            case 512:
                return '#edc850';
            case 1024:
                return '#edc53f';
            case 2048:
                return '#edc22e';
            case 4096:
                return '#3c3a32';
            default:
                return '#cdc1b4';
        }
    };

    const getTextColor = () => {
        return value <= 4 ? '#776e65' : '#f9f6f2';
    };

    const getFontSize = () => {
        if (value < 100) return '3rem';
        if (value < 1000) return '2.5rem';
        return '2rem';
    };

    return {
        position: 'absolute',
        width: 'calc(25% - 16px)',
        height: 'calc(25% - 16px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        borderRadius: '6px',
        animation: appearAnimation ? `${appear} 0.3s ease` : mergeAnimation ? `${pop} 0.3s ease` : 'none',
        boxShadow: theme.shadows[2],
        zIndex: 1,
        '& .MuiTypography-root': {
            fontSize: getFontSize(),
            fontWeight: 'bold',
        },
    };
});

const Tile = ({value, row, col, mergeAnimation, appearAnimation}) => {
    // Calculate position based on row and column
    const top = `calc(${row * 25}% + 8px)`;
    const left = `calc(${col * 25}% + 8px)`;

    return (
        <TileBox
            value={value}
            mergeAnimation={mergeAnimation}
            appearAnimation={appearAnimation}
            sx={{top, left}}
        >
            <Typography variant="h4">{value}</Typography>
        </TileBox>
    );
};

export default Tile;