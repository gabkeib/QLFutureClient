import { ActionIcon, Grid } from '@mantine/core';
import { IconSquareX } from '@tabler/icons-react';
import { FileWithPath } from '@mantine/dropzone';

type FileCardProps = {
    handleDelete: () => void;
    file: FileWithPath;
};

export default function FileCard({ handleDelete, file }: FileCardProps) {
    return (
        <Grid style={{ pointerEvents: 'auto' }}>
            <Grid.Col span="auto">{file.name}</Grid.Col>
            <Grid.Col span={3}>
                <ActionIcon onClick={handleDelete}>
                    <IconSquareX />
                </ActionIcon>
            </Grid.Col>

        </Grid>
    );
}
