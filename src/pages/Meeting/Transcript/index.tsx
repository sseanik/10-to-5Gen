import { Accordion, Highlight } from '@mantine/core';
import { IconVocabulary, IconVocabularyOff } from '@tabler/icons-react';

import { DataType } from '@/types/Data';

export default function Transcript({ data }: { data: DataType }) {
  const transcriptText = data.transcript;
  const names = data.Meta.attendees;

  if (!transcriptText) {
    return <div>No Transcript Found, please upload one.</div>;
  }

  return (
    <Accordion defaultValue="transcript-ai" variant="separated">
      <Accordion.Item key="transcript-ai" value="transcript-ai">
        <Accordion.Control icon={<IconVocabulary />}>Parsed Transcript</Accordion.Control>
        <Accordion.Panel>
          <Highlight color="gray" highlight={names}>
            {transcriptText}
          </Highlight>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="transcript-original" value="transcript-original">
        <Accordion.Control icon={<IconVocabularyOff />}>Original Transcript</Accordion.Control>
        <Accordion.Panel>{transcriptText}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
