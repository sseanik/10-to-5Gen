import { Button, Input, LoadingOverlay, Modal, rem, Select, Stack, Text } from '@mantine/core';
import { Dropzone, FileRejection, FileWithPath } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { IconFileSmile, IconTextPlus, IconUpload, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { useMutation } from 'react-query';

import { URL_CONFIG } from '@/assets/config';

interface UploadType {
  name: string;
  meetingType: string;
}

export default function UploadModal({ opened, close }: { opened: boolean; close: () => void }) {
  const TRANSCRIPT_MIME_TYPE = ['text/vtt', 'text/plain'];

  const form = useForm({
    initialValues: {
      name: '',
      meetingType: '',
    },
  });

  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const uploadTranscript = async ({ name, meetingType }: UploadType) => {
    const data = new FormData();
    data.append('name', name);
    data.append('meetingType', meetingType);
    data.append('files', fileUpload as File);

    const response = await fetch(`${URL_CONFIG}/uploadtranscript`, {
      method: 'POST',
      body: data,
    });
    const json = await response.json();
    return json;
  };

  const { mutate, isLoading, status } = useMutation(uploadTranscript, {
    onSuccess: () => close(),
    onError: (error) => console.error(error),
  });

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Upload Transcript"
      closeOnClickOutside={isLoading === true && status === 'loading'}
    >
      <LoadingOverlay
        visible={isLoading === true && status === 'loading'}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 1 }}
        loaderProps={{ color: 'blue', type: 'bars' }}
      />
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
                    {isLoading ? 'Uploading selected file' : 'One file selected'}
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7} style={{ textAlign: 'center' }}>
                    {/* {fileUpload.name} */}
                    {fileUpload.name}
                  </Text>
                </>
              ) : (
                <>
                  <Text size="xl" inline style={{ textAlign: 'center' }}>
                    Drag your Microsoft Teams transcript file
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7} style={{ textAlign: 'center' }}>
                    Attach a .vtt or .txt file
                  </Text>
                </>
              )}
            </Stack>
          </Stack>
        </Dropzone>
        <Stack gap="sm" mt="xs">
          <Input.Wrapper label="Meeting Name" required>
            <Input required placeholder="Type Meeting Name" {...form.getInputProps('name')} />
          </Input.Wrapper>
          <Select
            required
            label="Meeting Type"
            placeholder="Pick Meeting Type"
            data={['Standup', 'Sprint Planning', 'Retrospective', 'Sprint Review', 'Other']}
            {...form.getInputProps('meetingType')}
          />
          <Button variant="filled" mt="xs" type="submit">
            {isLoading ? 'Uploading...' : 'Upload'}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
