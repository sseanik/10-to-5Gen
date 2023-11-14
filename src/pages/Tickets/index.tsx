import { Box, Flex, Group, Loader, Title } from '@mantine/core';
import { useJsonStreaming } from 'http-streaming-request';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { URL_CONFIG } from '@/assets/config';
import lottie from '@/assets/lotties/standup.json';
import Container from '@/components/Container';
import MeetingHeader from '@/components/MeetingHeader';
import Progress from '@/components/Progress';
import RegenerateModal from '@/components/RegenerateModal';
import TicketCard from '@/components/TicketCard';
import { MockAllData, type Ticket as TicketType, type Tickets as TicketsType } from '@/types/Data';

export default function Tickets({
  setProgress,
  mock,
}: {
  setProgress: Dispatch<SetStateAction<boolean>>;
  mock?: boolean;
}) {
  const { meetingId } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [jsonData, setJsonData] = useState<MockAllData | null>(null);

  const { data, run } = useJsonStreaming<TicketsType>({
    url: `${URL_CONFIG}/tickets/${meetingId}`,
    method: 'GET',
    manual: true,
  });

  useEffect(() => {
    if (mock) return;

    setIsGenerating(true);
    setProgress(true);
    async function fetchData() {
      await run();
      setIsGenerating(false);
      setProgress(false);
      // showNotification({
      //   title: 'Successfully Generated Ticket Suggestions',
      //   message: 'Interact with the suggested JIRA tickets.',
      //   color: 'green',
      // });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mock) {
      fetch(`../${meetingId}.json`)
        .then((response) => response.json())
        .then((d) => setJsonData(d));
    }
  }, [meetingId, mock]);

  return (
    <Box mr="10px">
      <MeetingHeader lottie={lottie} mock={mock || false} meetingId={meetingId as string} isGenerating={isGenerating} />
      <Progress mounted={isGenerating} text={data} />

      <Container>
        <Flex align="center" gap="xs" mb="sm" justify="space-between">
          <Group>
            <Title order={4} mb="6" c="blue">
              Suggested Agile Tickets
            </Title>
            {isGenerating && <Loader color="blue" size="xs" />}
          </Group>
          {!mock && <RegenerateModal meetingId={meetingId} />}
        </Flex>
        <Flex mih={50} gap="lg" justify="flex-start" align="center" direction="row" wrap="wrap">
          {(mock ? jsonData : data)?.tickets &&
            (mock ? jsonData : data)?.tickets?.map((ticket: TicketType, index: number) => (
              <TicketCard key={index} {...ticket} />
            ))}
        </Flex>
      </Container>
    </Box>
  );
}
