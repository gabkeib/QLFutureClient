'use client';

import { Button, Grid, Group, Stepper, Text } from '@mantine/core';
import { useState } from 'react';
import { FileWithPath } from '@mantine/dropzone';
import classes from './styles.module.css';
import DropzoneFiles from '@/components/DropzoneFiles';

export function VerticalStepper() {

    async function calculateSubgenomes() {
        const message = {
            genome: 'string',
            subgenome: 'string',
        };
        const stringifiedMessage = JSON.stringify(message);
        return fetch('https://qlfuturebackend.onrender.com/genome',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: stringifiedMessage,
            })
            .then(response => response.json())
            .then(data => {
                return data;
            });
    }

    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const [genomeFile, setGenomeFile] = useState<FileWithPath[] | null>(null);

    const [dnaFile, setDnaFile] = useState<FileWithPath[] | null>(null);
    const handleGenomeDelete = () => {
        setGenomeFile(null);
    };

    const handleDnaDelete = () => {
        setDnaFile(null);
    };

    const handleRunAnalysis = async () => {
        console.log('here');
        const data = await calculateSubgenomes();
        console.log(data);
    };

    return (
        <>
            <Stepper
              className={classes.stepper}
              active={active}
              onStepClick={setActive}
              allowNextStepsSelect={false}>
                <Stepper.Step label="First step" description="Upload genome">
                    <Grid className={classes.grid}>
                        <Grid.Col span={6} style={{ width: '500px' }}>
                            <Text className={classes.taskTitle}>
                                Upload genome file
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DropzoneFiles
                              file={genomeFile}
                              handleDelete={handleGenomeDelete}
                              onDrop={(file) => setGenomeFile(file)} />
                        </Grid.Col>
                    </Grid>
                </Stepper.Step>
                <Stepper.Step label="Second step" description="Upload DNA">
                    <Grid className={classes.grid}>
                        <Grid.Col span={6} style={{ width: '500px' }}>
                            <Text className={classes.taskTitle}>
                                Upload DNA (or DNA fragment) file
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DropzoneFiles
                              file={dnaFile}
                              handleDelete={handleDnaDelete}
                              onDrop={(file) => setDnaFile(file)}
                            />
                        </Grid.Col>
                    </Grid>
                </Stepper.Step>
                <Stepper.Step label="Run analysis" description="Submit for analysis">
                    <Grid className={classes.grid}>
                        <Grid.Col span={6} style={{ width: '500px' }}>
                            <Text className={classes.taskTitle}>
                                Run analysis.
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={6} m="auto">
                            <Text>
                                In this step DNA analysis is performed.
                            </Text>
                            <Button justify="center" mt="xl" onClick={handleRunAnalysis}>Run analysis</Button>
                        </Grid.Col>
                    </Grid>
                </Stepper.Step>
                <Stepper.Step label="Final step" description="Get full access">
                    <Grid className={classes.grid}>
                        <Grid.Col span={6} style={{ width: '500px' }}>
                            <Text className={classes.taskTitle}>
                                Results
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={6} m="auto">
                            <Text>
                                In this step DNA analysis is performed.
                            </Text>
                            <Button justify="center" mt="xl" onClick={handleRunAnalysis}>Run analysis</Button>
                        </Grid.Col>
                    </Grid>
                </Stepper.Step>
                <Stepper.Completed>
                    Completed, click back button to get to previous step
                </Stepper.Completed>
            </Stepper>

            <Group justify="center" mt="xl">
                <Button variant="default" onClick={prevStep}>Back</Button>
                <Button onClick={nextStep}>Next step</Button>
            </Group>
        </>
    );
}
