import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import './Loader.css';
import { useTransition } from '../../context/TransitionContext';

const Loader = ({ onFinished }) => {
    const { setIsTransitioning } = useTransition();
    const loaderLineRef = useRef(null);
    const messageRef = useRef(null);
    const blackLayerRef = useRef(null);
    const whiteLayerRef = useRef(null);
    const loaderContainerRef = useRef(null);

    useLayoutEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onFinished) onFinished();
            }
        });

        // Timing Settings
        const t1 = 2; // Time for first message
        const t2 = 2.5; // Time for second message
        const t3 = 2; // Time for "Thanks"
        const totalTime = t1 + t2 + t3;

        // 1. Progress bar moves throughout the total duration
        tl.to(loaderLineRef.current, {
            width: "100%",
            duration: totalTime,
            ease: "none"
        }, 0);

        // 2. Message Sequence

        // Message 1
        tl.to(messageRef.current, {
            onStart: () => { messageRef.current.textContent = "I create whatever I see on websites"; },
            opacity: 1,
            duration: 0.5
        }, 0)
            .to(messageRef.current, { opacity: 0, duration: 0.5 }, t1 - 0.5);

        // Message 2
        tl.to(messageRef.current, {
            onStart: () => { messageRef.current.textContent = "If it's premium, then I create that on priority"; },
            opacity: 1,
            duration: 0.5
        }, t1)
            .to(messageRef.current, { opacity: 0, duration: 0.5 }, (t1 + t2) - 0.5);

        // Message 3
        tl.to(messageRef.current, {
            onStart: () => { messageRef.current.textContent = "Thanks"; },
            opacity: 1,
            duration: 0.5
        }, t1 + t2)
            .to(messageRef.current, { opacity: 0, duration: 0.5 }, totalTime - 0.2);

        // 3. The Layered Reveal
        tl.to(loaderLineRef.current, { opacity: 0, duration: 0.2 });

        tl.to(blackLayerRef.current, {
            y: "-100%",
            duration: 1.2,
            ease: "expo.inOut"
        });

        tl.to(whiteLayerRef.current, {
            y: "-100%",
            duration: 1.2,
            ease: "expo.inOut",
            onComplete: () => {
                setIsTransitioning(false);
            }
        }, "-=1.05");

        tl.set(loaderContainerRef.current, { display: "none" });

        return () => {
            tl.kill();
        };
    }, []); // Run once on mount

    return (
        <div className="loader-container" ref={loaderContainerRef}>
            <div id="loader-line" ref={loaderLineRef}></div>
            <div className="panel white-layer" ref={whiteLayerRef}></div>
            <div className="panel black-layer" ref={blackLayerRef}></div>
            <div className="loader-ui">
                <div className="loader-message" ref={messageRef}></div>
            </div>
        </div>
    );
};

export default Loader;
