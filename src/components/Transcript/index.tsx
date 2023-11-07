import { Box } from '@mantine/core';

import { TRANSCRIPTS } from '@/assets/mock/transcripts';

export default function Transcript({ id }: { id: string }) {
  const transcriptText = TRANSCRIPTS.find((t) => t.id === id);
  if (!transcriptText) {
    return <div>No Transcript Found, please upload one.</div>;
  }
  return (
    <Box p="md" mt="xs" style={{ whiteSpace: 'pre-wrap' }}>
      {transcriptText.data}
    </Box>
  );
}
