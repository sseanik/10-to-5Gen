import { Accordion, Highlight } from '@mantine/core';
import { IconVocabulary, IconVocabularyOff } from '@tabler/icons-react';
import { useMemo } from 'react';

import { TRANSCRIPTS } from '@/assets/mock/transcripts';

const extractUniqueNames = (text?: string) => {
  if (!text) return [];
  // Use regular expression to find all names followed by a colon (e.g., "Sarah:")
  const regex = /(\w+):/g;
  const matches = text.match(regex);

  if (!matches) {
    return [];
  }

  // Extract unique names by converting the matched names into a Set
  const uniqueNames = [...new Set(matches.map((match) => match.replace(':', '').trim()))];

  return uniqueNames;
};

export default function Transcript({ id }: { id: string }) {
  const transcriptText = useMemo(() => TRANSCRIPTS.find((t) => t.id === id), [id]);
  const names = useMemo(() => extractUniqueNames(transcriptText?.ai), [transcriptText?.ai]);
  if (!transcriptText) {
    return <div>No Transcript Found, please upload one.</div>;
  }

  return (
    <Accordion defaultValue="transcript-ai" variant="separated">
      <Accordion.Item key="transcript-ai" value="transcript-ai">
        <Accordion.Control icon={<IconVocabulary />}>Parsed Transcript</Accordion.Control>
        <Accordion.Panel>
          <Highlight color="gray" highlight={names}>
            {transcriptText.ai}
          </Highlight>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="transcript-original" value="transcript-original">
        <Accordion.Control icon={<IconVocabularyOff />}>Original Transcript</Accordion.Control>
        <Accordion.Panel>{transcriptText.old}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
