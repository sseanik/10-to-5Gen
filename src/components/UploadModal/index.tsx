import { Button, Input, LoadingOverlay, Modal, rem, Select, Stack, Text } from '@mantine/core';
import { Dropzone, FileRejection, FileWithPath } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconFileSmile, IconTextPlus, IconUpload, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { URL_CONFIG } from '@/assets/config';

interface UploadType {
  name: string;
  meetingType: string;
}

export default function UploadModal({ opened, close }: { opened: boolean; close: () => void }) {
  const form = useForm({
    initialValues: {
      name: '',
      meetingType: '',
    },
  });

  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const navigate = useNavigate();

  const uploadTranscript = async ({ name, meetingType }: UploadType) => {
    const data = new FormData();
    data.append('name', name);
    data.append('meetingType', meetingType);
    data.append('file', fileUpload as File);

    const response = await fetch(`${URL_CONFIG}/upload`, {
      method: 'POST',
      body: data,
    });
    const json = await response.json();
    return json;
  };

  const { mutate, isLoading, status } = useMutation(uploadTranscript, {
    onSuccess: (data) => {
      close();
      showNotification({
        title: 'File Successfully Uploaded',
        message: 'Open your meeting and generate your data.',
        color: 'green',
      });
      navigate(`/transcript/${data.id}`);
    },
    onError: (error) => {
      showNotification({
        title: 'Error Uploading File',
        message: String(error),
        color: 'red',
      });
    },
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
        loaderProps={{ color: 'blue', type: 'bars', children: 'Uploading File...' }}
      />
      <form onSubmit={form.onSubmit(({ name, meetingType }) => mutate({ name, meetingType }))}>
        <Dropzone
          onDrop={(f: FileWithPath[]) => {
            setFileUpload(f[0]);
          }}
          onReject={(f: FileRejection[]) => console.error(f)}
          maxSize={3 * 1024 ** 2}
          accept={{
            'text/plain': ['.txt'],
            'text/vtt': ['.vtt'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
          }}
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
                    Attach a .docx, .vtt or .txt file
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
          <Text size="xs">Note: We have limited tokens/credits, so please upload a smaller transcript</Text>
          <Button variant="filled" mt="xs" type="submit">
            {isLoading ? 'Uploading...' : 'Upload'}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
