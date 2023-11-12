import { Accordion, Box, Highlight } from '@mantine/core';
import { IconVocabulary, IconVocabularyOff } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import lottie from '@/assets/lotties/meeting.json';
import Container from '@/components/Container';
import MeetingHeader from '@/components/MeetingHeader';
import { getCollection } from '@/helpers/api';
import { MockAllData } from '@/types/Data';

export default function Transcript({ mock }: { mock?: boolean }) {
  const { meetingId } = useParams();
  const [jsonData, setJsonData] = useState<MockAllData | null>(null);

  const summaryQuery = useQuery({
    queryKey: ['summary'],
    queryFn: () => getCollection('summary', meetingId as string),
    retry: 1,
    enabled: !mock,
  });
  const transcriptQuery = useQuery({
    queryKey: ['transcript'],
    queryFn: () => getCollection('transcript', meetingId as string),
    retry: 1,
    enabled: !mock,
  });

  useEffect(() => {
    if (mock) {
      fetch(`../${meetingId}.json`)
        .then((response) => response.json())
        .then((data) => setJsonData(data));
    }
  }, [meetingId, mock]);

  return (
    <Box mr="10px">
      <MeetingHeader lottie={lottie} mock={mock || false} meetingId={meetingId as string} />
      <Container>
        {summaryQuery.isSuccess && transcriptQuery.isSuccess && (
          <Accordion defaultValue="transcript-ai" variant="separated">
            <Accordion.Item key="transcript-ai" value="transcript-ai">
              <Accordion.Control icon={<IconVocabulary />}>Parsed Transcript</Accordion.Control>
              <Accordion.Panel>
                {transcriptQuery?.data?.transcript.split('\n').map((line: string, index: number) => (
                  <Highlight key={index} color="gray.3" highlight={summaryQuery?.data?.summaries?.attendees}>
                    {line.startsWith('<') ? line.replace(/<v (.*?)>(.*?)<\/v>/g, '$1: $2') : line}
                  </Highlight>
                ))}
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item key="transcript-original" value="transcript-original">
              <Accordion.Control icon={<IconVocabularyOff />}>Original Transcript</Accordion.Control>
              <Accordion.Panel>{transcriptQuery.data?.transcript}</Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        )}
        {mock && jsonData && (
          <Accordion defaultValue="transcript-ai" variant="separated">
            <Accordion.Item key="transcript-ai" value="transcript-ai">
              <Accordion.Control icon={<IconVocabulary />}>Parsed Transcript</Accordion.Control>
              <Accordion.Panel>
                {jsonData?.transcript.split('\n').map((line: string, index: number) => (
                  <Highlight key={index} color="gray.3" highlight={summaryQuery?.data?.summaries?.attendees}>
                    {line.startsWith('<') ? line.replace(/<v (.*?)>(.*?)<\/v>/g, '$1: $2') : line}
                  </Highlight>
                ))}
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item key="transcript-original" value="transcript-original">
              <Accordion.Control icon={<IconVocabularyOff />}>Original Transcript</Accordion.Control>
              <Accordion.Panel>{transcriptQuery.data?.transcript}</Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        )}
      </Container>
    </Box>
  );
}
