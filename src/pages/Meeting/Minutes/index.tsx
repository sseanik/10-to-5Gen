import { Box, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function Minutes({ id }: { id: string }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box>
      <Modal opened={opened} onClose={close} title="Authentication" size="xl" />
      <Button onClick={open}>Generate Meeting Summary</Button>
    </Box>
  );
}
