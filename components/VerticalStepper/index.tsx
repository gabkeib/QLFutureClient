'use client';

import {Button, Center, Checkbox, Grid, Group, Stepper, Text} from '@mantine/core';
import { useRef, useState } from 'react';
import { FileWithPath } from '@mantine/dropzone';
import { DNA } from 'react-loader-spinner';
import {v4 as uuidv4 } from 'uuid';
import DropzoneFiles from '@/components/DropzoneFiles';
import classes from './styles.module.css';
import FileCard from '@/components/FileCard';

export function VerticalStepper() {
    async function calculateSubgenomes(genome: string, subgenome: string) {
        const message = {
            genome,
            subgenome,
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
            .then(data => data).catch(e => console.log(e));
    }

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const firstNewlineIndex = (reader.result as String).indexOf('\n');
                if (firstNewlineIndex !== -1) {
                    setGenomeData((reader.result as String).substring(firstNewlineIndex + 1));
                } else {
                    setGenomeData(reader.result as string);
                }
            };

            reader.readAsText(file);
            setFile(e.target.files[0]);
            setGenomeFile(null);
        }
    };

    const handleFileChangeSubGenome = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const firstNewlineIndex = (reader.result as String).indexOf('\n');
                if (firstNewlineIndex !== -1) {
                    setSubgenomeData((reader.result as String).substring(firstNewlineIndex + 1));
                } else {
                    setSubgenomeData(reader.result as string);
                }
            };

            reader.readAsText(file);
            setSubgenomeFile(e.target.files[0]);
        }
    };
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const [probability, setProbability] = useState({});
    const [status, setStatus] = useState('unknown');
    const [genomeFile, setGenomeFile] = useState<FileWithPath[] | null>(null);
    const [subgenomeFile, setSubgenomeFile] = useState<File | null>(null);
    const [genomeData, setGenomeData] = useState<string | null>(null);
    const [subgenomeData, setSubgenomeData] = useState<string | null>(null);
    const [subgenomeFound, setSubgenomeFound] = useState<boolean | null>(null);

    const [dnaFile, setDnaFile] = useState<FileWithPath[] | null>(null);

    const fileInput1 = useRef<HTMLInputElement | null>(null);
    const fileInput2 = useRef<HTMLInputElement | null>(null);

    const handleButtonClick1 = () => {
        if (fileInput1.current) {
            fileInput1.current.click();
        }
    };

    const handleButtonClick2 = () => {
        if (fileInput2.current) {
            fileInput2.current.click();
        }
    };

    const [loading, setLoading] = useState(false);
    const handleGenomeDelete = () => {
        setGenomeFile(null);
    };

    const handleGenomeUpload = (file: FileWithPath[]) => {
        setGenomeFile(file);
        setFile(null);
    };

    const handeFileDelete = () => {
        setFile(null);
    };

    const handleSubgenomeDelete = () => {
        setSubgenomeFile(null);
        setFile(null);
    };

    const handleDnaDelete = () => {
        setDnaFile(null);
    };

    const handleDnaUpload = (file: FileWithPath[]) => {
        setDnaFile(file);
        // setAllowForward(true);
    };

    const allowBackward = active > 0 && !loading;
    const allowForward = (
        (genomeFile && active === 0) ||
        (file && active === 0) ||
        (subgenomeFile && active === 1) ||
        (dnaFile && active === 1) ||
        (active === 3))
        && !loading;

    const handleRestart = async () => {
        setDnaFile(null);
        setFile(null);
        setGenomeFile(null);
        setGenomeData(null);
        setSubgenomeFile(null);
        setSubgenomeData(null);
        setProbability({});
        setStatus('unknown');
        setActive(0);
    };

    const handleRunAnalysis = async () => {
        setLoading(true);
        const data = await calculateSubgenomes(genomeData ?? '', subgenomeData ?? '');
        setLoading(() => false);
        // setProbability(data.probability);
        // setStatus(data.response);
        if (data && data.subgenomeFound) {
            setSubgenomeFound(data.subgenomeFound);
        }
        nextStep();
    };

    return (
        <div className={classes.wholeStepper}>
            <Stepper
              className={classes.stepper}
              active={active}
              onStepClick={setActive}
              allowNextStepsSelect={false}
              color="orange">
                <Stepper.Step label="First step" description="Upload genome">
                    <Grid className={classes.grid}>
                        <Grid.Col span={6} style={{ width: '500px' }}>
                            <Text className={classes.taskTitle}>
                                Upload gene file
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <>
                                <div>
                                    <input ref={fileInput1} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                                    <Button className={classes.uploadButton} fullWidth onClick={handleButtonClick1}>Upload gene file</Button>
                                    {file && <FileCard handleDelete={handleSubgenomeDelete} file={file.name} />}
                                </div>
                            </>
                            <Text className={classes.taskSmallTitle}>
                                Or please upload a picture of gene
                            </Text>
                            <DropzoneFiles
                              file={genomeFile}
                              handleDelete={handleGenomeDelete}
                              onDrop={(file) => handleGenomeUpload(file)} />
                        </Grid.Col>
                    </Grid>
                </Stepper.Step>
                <Stepper.Step label="Second step" description="Upload DNA">
                    <Grid className={classes.grid}>
                        <Grid.Col span={6} style={{ width: '500px' }}>
                            <Text className={classes.taskTitle}>
                                Upload genome file
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <>
                                <div>
                                    <input ref={fileInput2} type="file" style={{ display: 'none' }} onChange={handleFileChangeSubGenome} />
                                    <Button
                                      className={classes.uploadButton}
                                      fullWidth
                                      onClick={handleButtonClick2}>
                                        Choose genome file
                                    </Button>
                                    {subgenomeFile &&
                                        <FileCard
                                          handleDelete={handleSubgenomeDelete}
                                          file={subgenomeFile.name}
                                        />}
                                </div>
                            </>
                            <Text className={classes.taskSmallTitle}>
                                Or please upload a picture of genome
                            </Text>

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
                                Run analysis
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={6} m="auto">
                            <Text>
                                In this step DNA analysis is performed.
                            </Text>
                            {!loading ?
                                <Button className={classes.uploadButton} justify="center" mt="xl" onClick={handleRunAnalysis}>Run analysis</Button> :
                                <DNA />
                            }
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
                            <div style={{justifyContent: "center"}}>
                                { subgenomeFound ?
                                    <Text className={classes.taskSmallTitle}>
                                        Gene found in genome:
                                        <Text style={{fontSize: '40px'}} inherit variant="gradient" gradient={{ from: 'pink', to: 'yellow' }}>
                                            {subgenomeFound ? 'Yes' : 'No'}
                                        </Text>
                                    </Text> :
                                    <>
                                    <Text className={classes.taskSmallTitle}>
                                        It might take a few hours to get the results.
                                    </Text>
                                        <Text className={classes.taskSmallTitle}>
                                            Please check back later. <br />
                                            Here is the id of the analysis: <br /> {uuidv4()} <br/> <br/>
                                            Please save it to receive the results later.
                                        </Text>
                                        <Checkbox label={
                                            <Text >Notify me when the analysis is ready via email.
                                            </Text>
                                        }>
                                        </Checkbox>
                                    </>
                                }
                            </div>
                        </Grid.Col>
                    </Grid>
                </Stepper.Step>
                <Stepper.Completed>
                    <Grid className={classes.grid}>
                        <Grid.Col>
                            <Text className={classes.taskSmallTitle}>
                                To do another analysis, please click here.
                            </Text>
                            <Center>
                            <Button className={classes.uploadButton} justify="center" onClick={() => handleRestart()}>New analysis</Button>
                            </Center>
                        </Grid.Col>
                    </Grid>
                </Stepper.Completed>
            </Stepper>

            <Group justify="center" mt="xl">
                <Button variant="default" disabled={!allowBackward} onClick={prevStep}>Back</Button>
                <Button
                  className={classes.uploadButton}
                  onClick={nextStep}
                  disabled={!allowForward}>
                    Next step
                </Button>
            </Group>
        </div>
    );
}
