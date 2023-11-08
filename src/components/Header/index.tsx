import { Button, FileButton, Group, Modal, Paper, rem, Stack, Text, Title } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useDisclosure } from '@mantine/hooks';
import { IconFileUpload, IconNotes, IconPhoto, IconTextPlus, IconUpload, IconX } from '@tabler/icons-react';
import Lottie from 'lottie-react';

import UploadModal from '../UploadModal';

interface HeaderProps {
  heading: string;
  description: string;
  lottie: unknown;
  hideUpload?: boolean;
}

export default function Header({ heading, description, lottie, hideUpload }: HeaderProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Paper shadow="xs" radius="lg" style={{ padding: '0 1rem' }} pr="md" mr="sm">
      <Group justify="space-between">
        <Group>
          <Lottie animationData={lottie} loop style={{ height: 100 }} />
          <Stack gap="0">
            <Title order={4}>{heading}</Title>
            <Text size="md">{description}</Text>
          </Stack>
        </Group>

        {!hideUpload && (
          <>
            <UploadModal opened={opened} close={close} />
            <Button onClick={open} leftSection={<IconFileUpload size="24px" stroke={1.5} />} size="md">
              Upload Transcript
            </Button>
          </>
        )}
      </Group>
    </Paper>
  );
}
