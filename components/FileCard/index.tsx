import {ActionIcon, Card, Grid, Paper} from '@mantine/core';
import { IconSquareX } from '@tabler/icons-react';
import classes from './styles.module.css';

type FileCardProps = {
    handleDelete: () => void;
    file: string;
};

export default function FileCard({ handleDelete, file }: FileCardProps) {
    return (
        <Paper m="md" shadow="xs" withBorder p="sm">
            <Grid style={{ pointerEvents: 'auto' }}>
                <Grid.Col span="auto">{file}</Grid.Col>
                <Grid.Col span={1} me="md">
                    <ActionIcon className={classes.button} onClick={handleDelete}>
                        <IconSquareX className={classes.button} />
                    </ActionIcon>
                </Grid.Col>

            </Grid>
        </Paper>
    );
}
