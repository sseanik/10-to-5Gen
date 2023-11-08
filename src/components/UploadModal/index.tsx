import { Button, Input, Modal, rem, Select, Stack, Text } from '@mantine/core';
import { Dropzone, FileRejection, FileWithPath } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { IconFileSmile, IconTextPlus, IconUpload, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { useMutation } from 'react-query';

interface UploadType {
  name: string;
  meetingType: string;
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

  const [fileUpload, setFileUpload] = useState<string | Blob>('');

  const uploadTranscript = async ({ name, meetingType }: UploadType) => {
    const data = new FormData();
    data.append('name', name);
    data.append('meetingType', meetingType);
    console.log(fileUpload);

    data.append('files', fileUpload);
    console.log(data.get('files'));

    const response = await fetch('https://congregate-backend.onrender.com/uploadtranscript', {
      method: 'POST',
      body: data,
    });
    const json = await response.json();
    return json;
  };

  const { mutate, isLoading } = useMutation(uploadTranscript, {
    onSuccess: (data) => {
      console.log(data);
      const message = 'success';
      alert(message);
    },
    onError: () => {
      alert('there was an error');
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries('create');
    // },
  });

  return (
    <Modal opened={opened} onClose={close} title="Upload Transcript">
      <form onSubmit={form.onSubmit(({ name, meetingType }) => mutate({ name, meetingType }))}>
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
                    {/* {fileUpload.name} */}
                    {123}
                  </Text>
                </>
              ) : (
                <>
                  <Text size="xl" inline style={{ textAlign: 'center' }}>
                    Drag your Microsoft Teams transcript file
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7} style={{ textAlign: 'center' }}>
                    Attach a .vtt, .txt or .docx file
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
            data={['Standup', 'Sprint Planning', 'Retrospective', 'Sprint Review', 'Other']}
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
