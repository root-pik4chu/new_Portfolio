import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTransition } from '../../context/TransitionContext';

const PageTransition = ({ locationKey }) => {
    const { setIsTransitioning } = useTransition();
    const blackLayer = useRef();
    const whiteLayer = useRef();
    const isFirstMount = useRef(true);

    useGSAP(() => {
        // Skip the animation on the very first load
        if (isFirstMount.current) {
            isFirstMount.current = false;
            // Set initial state out of view
            gsap.set([blackLayer.current, whiteLayer.current], { y: "-100%" });
            return;
        }

        // Reset positions for the transition
        gsap.set([blackLayer.current, whiteLayer.current], { y: "0%" });
        setIsTransitioning(true);

        const tl = gsap.timeline();

        // 1. Black layer slides up
        tl.to(blackLayer.current, {
            y: "-100%",
            duration: 1.2,
            ease: "expo.inOut",
            delay: 0.2 // Small initial buffer
        });

        // 2. White layer "chases"
        tl.to(whiteLayer.current, {
            y: "-100%",
            duration: 1.2,
            ease: "expo.inOut",
            onComplete: () => {
                setIsTransitioning(false);
            }
        }, "-=1.05");

    }, [locationKey]); // Trigger on route changes

    return (
        <>
            {/* The Black Division (Top Layer) */}
            <div
                ref={blackLayer}
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    backgroundColor: '#000',
                    zIndex: 200, // High z-index to cover content
                    pointerEvents: 'none',
                    transform: 'translateY(-100%)' // Initial state
                }}
            />

            {/* The White Division (Chasing Layer) */}
            <div
                ref={whiteLayer}
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    backgroundColor: '#fff',
                    zIndex: 190,
                    pointerEvents: 'none',
                    transform: 'translateY(-100%)' // Initial state
                }}
            />
        </>
    );
};

export default PageTransition;
