import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useTransition } from '../../context/TransitionContext';
import { useEffect, useRef } from 'react';

const Text_Wrapper = ({ children }) => {
    const { isTransitioning } = useTransition();
    const controls = useAnimation();
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.1 });

    useEffect(() => {
        // Only start the "visible" animation if in view AND transitons are done
        if (!isTransitioning && isInView) {
            controls.start("visible");
        } else if (!isInView) {
            controls.set("hidden");
        }
    }, [isTransitioning, isInView, controls]);
    // Animation variants for the container (staggering the children)
    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.01, // Speed of the "typing" effect
                delayChildren: 0.1,
            },
        },
    };

    // Animation variants for each individual character
    const charVariants = {
        hidden: { x: "-105%", opacity: 0 },
        visible: {
            x: "0%",
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1], // Equivalent to power3.out
            },
        },
    };

    return (
        <div style={{ maxWidth: 'auto' }}>
            {React.Children.map(children, (child, i) => {
                const isString = typeof child === 'string';
                const text = isString ? child : child.props.children;
                const childProps = isString ? {} : child.props;

                return (
                    <motion.div
                        key={i}
                        className={`line-row ${childProps.className || ""}`}
                        variants={containerVariants}
                        initial="hidden"
                        animate={controls}
                        style={{ ...styles.lineRow, ...childProps.style }}
                        ref={containerRef}
                    >
                        {text.split('').map((char, index) => (
                            <span key={index} style={styles.charSlot}>
                                <motion.span
                                    variants={charVariants}
                                    style={styles.charItem}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            </span>
                        ))}
                    </motion.div>
                );
            })}
        </div>
    );
};

const styles = {
    lineRow: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        marginBottom: '8px',
    },
    charSlot: {
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'bottom',
    },
    charItem: {
        display: 'inline-block',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        color: 'inherit',
        fontFamily: 'inherit',
        willChange: 'transform',
    },
};

export default Text_Wrapper;