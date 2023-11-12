import { Box, Paper } from '@mantine/core';
import { ReactNode } from 'react';

interface PageProps {
  children: ReactNode;
}

export default function Container({ children }: PageProps) {
  return (
    <Paper shadow="xs" radius="lg" p="xs" mt="sm">
      <Box p="sm" mt="xs" style={{ whiteSpace: 'pre-wrap' }}>
        {children}
      </Box>
    </Paper>
  );
}
