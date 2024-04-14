'use client';

import { Grid, Title, Text } from '@mantine/core';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
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

    return (
        <div {...props}>
            <section className={classes.card}>
                <motion.div style={{ y }}>
                    <Title className={classes.title}>{title}</Title>
                    <Text ref={ref} style={{ textAlign: 'center' }}>{description}</Text>
                </motion.div>
                {children}
            </section>
        </div>
    );
}
