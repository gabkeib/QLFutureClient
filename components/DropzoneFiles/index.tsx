import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import '@mantine/dropzone/styles.css';
import FileCard from '@/components/FileCard';

type DropzoneFilesProps = {
    onDrop: (file: FileWithPath[]) => void;
    handleDelete: () => void;
    file: FileWithPath[] | null;
};

export default function DropzoneFiles({ onDrop, handleDelete, file }: DropzoneFilesProps) {
    return (
            <Dropzone
              onReject={(files) => console.log('rejected files', files)}
              maxSize={5 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              onDrop={onDrop}
              activateOnClick={!file}
              disabled
            >
                <Group justify="center" gap="xl" style={{ pointerEvents: 'none' }}>
                    <div>
                        {!file ? <>
                            <Text ta="center">Drop images here</Text>
                                 </> : <>
                            <FileCard file={file[0].name} handleDelete={handleDelete} />
                                       </>
                    }
                    </div>
                </Group>
            </Dropzone>
        );
}
