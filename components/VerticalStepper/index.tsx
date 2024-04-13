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
            .then(data => data);
    }

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const [probability, setProbability] = useState({});
    const [status, setStatus] = useState('unknown');
    const [genomeFile, setGenomeFile] = useState<FileWithPath[] | null>(null);

    const [dnaFile, setDnaFile] = useState<FileWithPath[] | null>(null);

    const [loading, setLoading] = useState(false);
    const handleGenomeDelete = () => {
        setGenomeFile(null);
    };

    const handleGenomeUpload = (file: FileWithPath[]) => {
        setGenomeFile(file);
        // setAllowForward(true);
    };

    const handleDnaDelete = () => {
        setDnaFile(null);
    };

    const handleDnaUpload = (file: FileWithPath[]) => {
        setDnaFile(file);
        // setAllowForward(true);
    };

    const allowBackward = active > 0 && !loading;
    const allowForward = ((genomeFile && active === 0) || (dnaFile && active === 1)) && !loading;

    const handleRunAnalysis = async () => {
        setLoading(true);
        const data = await calculateSubgenomes();
        await (new Promise((resolve) => setTimeout(resolve, 5000)));
        setLoading(() => false);
        setProbability(data.probability);
        setStatus(data.response);
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
                              onDrop={(file) => handleGenomeUpload(file)} />
                            <>
                                <div>
                                    <label htmlFor="file" className="sr-only">
                                        Choose a file
                                    </label>
                                    <input id="file" type="file" onChange={handleFileChange} />
                                </div>
                                {file && (
                                    <section>
                                        File details:
                                        <ul>
                                            <li>Name: {file.name}</li>
                                            <li>Type: {file.type}</li>
                                            <li>Size: {file.size} bytes</li>
                                        </ul>
                                    </section>
                                )}

                                {/*{file && <button onClick={handleUpload}>Upload a file</button>}*/}
                            </>
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
                              onDrop={(file) => handleDnaUpload(file)}
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

                            {
                            Object.values(probability).map((value, index) =>
                                <Text key={index}>Probability for {index}: {value}</Text>)}
                                <Text>
                                    Status: {status}
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
                <Button variant="default" disabled={!allowBackward} onClick={prevStep}>Back</Button>
                <Button onClick={nextStep} disabled={!allowForward}>Next step</Button>
            </Group>
        </>
    );
}
