import React, {useEffect, useRef} from 'react';

const SwipeHandler = ({onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight, children}) => {
    const touchStartRef = useRef({x: 0, y: 0});
    const containerRef = useRef(null);
    const minSwipeDistance = 50; // Minimum distance in pixels to consider a swipe

    useEffect(() => {
        const handleTouchStart = (e) => {
            const touch = e.touches[0];
            touchStartRef.current = {x: touch.clientX, y: touch.clientY};
        };

        const handleTouchMove = (e) => {
            e.preventDefault(); // Prevent default browser behavior during the swipe
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

        // Add touch event listeners to the container element
        const container = containerRef.current;
        if (container) {
            container.addEventListener('touchstart', handleTouchStart, {passive: false});
            container.addEventListener('touchmove', handleTouchMove, {passive: false});
            container.addEventListener('touchend', handleTouchEnd, {passive: false});
        }

        // Clean up event listeners
        return () => {
            if (container) {
                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchmove', handleTouchMove);
                container.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, [onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight]);

    return <div ref={containerRef} style={{ touchAction: 'none' }}>{children}</div>;
};

export default SwipeHandler;
