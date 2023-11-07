import { Button, FileButton, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { IconFileUpload } from '@tabler/icons-react';
import Lottie from 'lottie-react';
import { useState } from 'react';

interface HeaderProps {
  heading: string;
  description: string;
  lottie: unknown;
}

export default function Header({ heading, description, lottie }: HeaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  console.log({ files });

  return (
    <Paper shadow="xs" radius="lg" style={{ padding: '0 1rem' }}>
      <Group justify="space-between">
        <Group>
          <Lottie animationData={lottie} loop style={{ height: 100 }} />
          <Stack gap="0">
            <Title order={4}>{heading}</Title>
            <Text size="md">{description}</Text>
          </Stack>
        </Group>

        <FileButton onChange={setFiles} accept="image/png,image/jpeg" multiple>
          {(props) => (
            <Button {...props} leftSection={<IconFileUpload size="24px" stroke={1.5} />} size="md">
              Upload Meeting
            </Button>
          )}
        </FileButton>
      </Group>
    </Paper>
  );
}
