'use client';

import Image from 'next/image';
import {motion, useInView, useScroll, useSpring, useTransform} from 'framer-motion';
import { useEffect, useRef } from 'react';
import InfoCard from '@/components/InfoCard';
import classes from './styles.module.css';
import {Center, Text} from "@mantine/core";

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

    const refText = useRef(null);
    const isInView = useInView(refText, { once: true });

    return (
        <div>
            <Text style={{opacity: isInView ? 1 : 0, transition: "all 2.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"}} ref={refText} className={classes.taskSmallTitleEvenBigger}>
                Our Solution
            </Text>
        <div ref={ref} className={classes.timeline}>
            <InfoCard title="Building the circuit" description="Quantum circuit that we propose">
                <Center>
                <Image
                    alt={'Circuit'}
                    width={740}
                    height={700}
                  src="/circuit.png">
                </Image>
                </Center>
            </InfoCard>
            <InfoCard title="Advantages" description="Time complexity comparison">
                <div>
                        <Text className={classes.taskSmallTitleBigger}>
                            Classical (Knoth-Pratt-Morris) - O(N + M)
                        </Text>
                        <Text className={classes.taskSmallTitleBigger}>
                            Quantum (Ramesh-Vinay) - O(√N + √M)
                        </Text>
                        <Text className={classes.taskSmallTitleBigger}>
                            Our solution - O(N/M)
                        </Text>
                </div>
            </InfoCard>
            <InfoCard title="Limitations of technology" description="What to expect in the future?">
                <div>
                    <Text className={classes.taskSmallTitleBigger}>
                        Today ~23 days with 29 qubits
                    </Text>
                    <Text className={classes.taskSmallTitleBigger}>
                        In 2029 ~20 minutes with 1 000 000 qubits
                    </Text>
                </div>
            </InfoCard>
            <motion.div className={classes.progress} style={{ scaleX }} />
        </div>
        </div>
    );
}
