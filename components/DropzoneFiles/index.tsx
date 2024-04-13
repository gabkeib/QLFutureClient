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
            >
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload
                          style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                          stroke={1.5}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                          style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                          stroke={1.5}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto
                          style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                          stroke={1.5}
                        />
                    </Dropzone.Idle>

                    <div>
                        {!file ? <>
                            <Text size="xl" inline>
                                Drag images here or click to select files
                            </Text>
                            <Text size="sm" c="dimmed" inline mt={7}>
                        Attach as many files as you like, each file should not exceed 5mb
                            </Text>
                                 </> : <>
                            <FileCard file={file[0]} handleDelete={handleDelete} />
                                       </>
                    }
                    </div>
                </Group>
            </Dropzone>
        );
}
