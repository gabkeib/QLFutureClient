'use client';

import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import InfoCard from '@/components/InfoCard';
import classes from './styles.module.css';
import {Center} from "@mantine/core";

export default function StoryTimeline() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end end'],
    });
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div ref={ref} className={classes.timeline}>
            <InfoCard title="Building the circuit" description="This is the story timeline">
                <Center>
                <Image
                    alt={'Circuit'}
                    width={450}
                    height={400}
                    style={{ paddingBottom: '20px' }}
                  src="/circuit.png">
                </Image>
                </Center>
            </InfoCard>
            <InfoCard title="Advantages" description="This is the story timeline">
                <p>Story Timeline</p>
            </InfoCard>
            <InfoCard title="Criticalities" description="This is the story timeline">
                <p>Story Timeline</p>
            </InfoCard>
            <motion.div className={classes.progress} style={{ scaleX }} />
        </div>
    );
}
