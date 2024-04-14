'use client';

import { Grid, Title, Text } from '@mantine/core';
import {motion, MotionValue, useInView, useScroll, useTransform} from 'framer-motion';
import { useRef } from 'react';
import classes from './styles.module.css';

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

interface InfoCardProps {
    title: string;
    description: string;
    children?: React.ReactNode;
}
export default function InfoCard({ title, description, children, ...props }: InfoCardProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 600);
    const isInView = useInView(ref, { once: true });

    return (
        <div {...props}>
            <section className={classes.card}>
                <div style={{opacity: isInView ? 1 : 0, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"}}>
                <motion.div style={{ y }}>
                    <Title className={classes.title}>{title}</Title>
                    <Text ref={ref} style={{ textAlign: 'center' }} className={classes.taskSmallTitle}>{description}</Text>
                </motion.div>
                </div>
                <div style={{opacity: isInView ? 1 : 0, transition: "all 1.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"}}>
                {children}
                </div>
            </section>
        </div>
    );
}
