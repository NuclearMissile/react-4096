import React, {useEffect, useRef} from 'react';

const SwipeHandler = ({onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight, children}) => {
    const touchStartRef = useRef({x: 0, y: 0});
    const minSwipeDistance = 50; // Minimum distance in pixels to consider a swipe

    useEffect(() => {
        const handleTouchStart = (e) => {
            const touch = e.touches[0];
            touchStartRef.current = {x: touch.clientX, y: touch.clientY};
        };

        const handleTouchEnd = (e) => {
            if (e.touches.length > 0) return; // Ignore if there are still touches active

            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - touchStartRef.current.x;
            const deltaY = touch.clientY - touchStartRef.current.y;

            // Determine if the swipe was horizontal or vertical
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe
                if (Math.abs(deltaX) >= minSwipeDistance) {
                    if (deltaX > 0) {
                        onSwipeRight && onSwipeRight();
                    } else {
                        onSwipeLeft && onSwipeLeft();
                    }
                }
            } else {
                // Vertical swipe
                if (Math.abs(deltaY) >= minSwipeDistance) {
                    if (deltaY > 0) {
                        onSwipeDown && onSwipeDown();
                    } else {
                        onSwipeUp && onSwipeUp();
                    }
                }
            }
        };

        // Add touch event listeners to the document
        document.addEventListener('touchstart', handleTouchStart, {passive: true});
        document.addEventListener('touchend', handleTouchEnd, {passive: true});

        // Clean up event listeners
        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight]);

    return <>{children}</>;
};

export default SwipeHandler;