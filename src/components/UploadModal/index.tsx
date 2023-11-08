import { Button, Input, Modal, rem, Select, Stack, Text } from '@mantine/core';
import { Dropzone, FileRejection, FileWithPath } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { IconFileSmile, IconTextPlus, IconUpload, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { useMutation } from 'react-query';

interface UploadType {
  name: string;
  meetingType: string;
  file: FileWithPath;
}

export default function UploadModal({ opened, close }: { opened: boolean; close: () => void }) {
  const TRANSCRIPT_MIME_TYPE = [
    'text/vtt',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  const form = useForm({
    initialValues: {
      name: '',
      meetingType: '',
    },
  });

  const [fileUpload, setFileUpload] = useState<FileWithPath>();

  const uploadTranscript = useMutation({
    mutationFn: ({ name, meetingType, file }: UploadType) =>
      fetch('https://congregate-backend.onrender.com//uploadtranscript', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, meetingType, file }),
      }),
  });

  return (
    <Modal opened={opened} onClose={close} title="Upload Transcript">
      <form
        onSubmit={form.onSubmit(({ name, meetingType }) =>
          uploadTranscript.mutate({ name, meetingType, file: fileUpload as FileWithPath }),
        )}
      >
        <Dropzone
          onDrop={(f: FileWithPath[]) => setFileUpload(f[0])}
          onReject={(f: FileRejection[]) => console.log(`Files rejected: ${f[0]}`)}
          maxSize={3 * 1024 ** 2}
          accept={TRANSCRIPT_MIME_TYPE}
          maxFiles={1}
          multiple={false}
        >
          <Stack justify="center" gap="xl" style={{ pointerEvents: 'none', alignItems: 'center' }}>
            <Dropzone.Accept>
              <IconUpload
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              {fileUpload ? (
                <IconFileSmile
                  style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                  stroke={1.5}
                />
              ) : (
                <IconTextPlus
                  style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                  stroke={1.5}
                />
              )}
            </Dropzone.Idle>

            <Stack mb="sm" gap="xs" justify="center">
              {fileUpload ? (
                <>
                  <Text size="xl" inline style={{ textAlign: 'center' }} w="100%">
                    One File Selected
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7} style={{ textAlign: 'center' }}>
                    {fileUpload.name}
                  </Text>
                </>
              ) : (
                <>
                  <Text size="xl" inline style={{ textAlign: 'center' }}>
                    Drag your Microsoft Teams transcript file
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7} style={{ textAlign: 'center' }}>
                    Attach one .vtt, .txt or .docx file at a time
                  </Text>
                </>
              )}
            </Stack>
          </Stack>
        </Dropzone>
        <Stack gap="sm" mt="xs">
          <Input.Wrapper label="Meeting Name">
            <Input placeholder="Type Meeting Name" {...form.getInputProps('name')} />
          </Input.Wrapper>
          <Select
            label="Meeting Type"
            placeholder="Pick Meeting Type"
            data={['Standup', 'Sprint Planning', 'Retrospective', 'Sprint Review']}
            {...form.getInputProps('meetingType')}
          />
          <Button variant="filled" mt="xs" type="submit">
            Upload
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
