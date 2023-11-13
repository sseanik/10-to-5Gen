import { Blockquote, Box, Button, Group, Stack, Text, Title } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { useJsonStreaming } from 'http-streaming-request';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { URL_CONFIG } from '@/assets/config';
import lottie from '@/assets/lotties/planning.json';
import AvatarGroup from '@/components/AvatarGroup';
import Container from '@/components/Container';
import MeetingHeader from '@/components/MeetingHeader';
import Progress from '@/components/Progress';
import { type Agenda as AgendaType, MockAllData } from '@/types/Data';

export default function Agenda({
  setProgress,
  mock,
}: {
  setProgress: Dispatch<SetStateAction<boolean>>;
  mock?: boolean;
}) {
  const { meetingId } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [jsonData, setJsonData] = useState<MockAllData | null>(null);

  const { data, run } = useJsonStreaming<AgendaType>({
    url: `${URL_CONFIG}/agenda/${meetingId}`,
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
      //   title: 'Successfully Generated Agenda Data',
      //   message: 'View your generated Next Agenda Items and Suggested Schedule.',
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
      <Progress mounted={isGenerating} text={mock ? jsonData ?? '' : data} />

      <Container>
        <Title order={4} mb="xs" c="#40469d">
          Suggested Upcoming Agenda
        </Title>

        <Box mb="sm">
          <Text>
            <b>Proposed Date</b>: {(mock ? jsonData : data)?.proposedSchedule?.date}
          </Text>
          <Group>
            <b>Proposed Attendees: </b>
            <AvatarGroup names={(mock ? jsonData : data)?.proposedSchedule?.attendees ?? []} />
          </Group>
          <Button
            color="#4e55bd"
            mt="xs"
            onClick={() =>
              alert('Not Implemented Yet: REST API Call triggered to Microsoft Teams Graph API to create a meeting')
            }
          >
            Schedule in Teams
          </Button>
        </Box>

        <Title order={4} mb="lg" c="#40469d">
          Suggested Upcoming Agenda
        </Title>

        <Stack gap={0}>
          {(mock ? jsonData : data)?.agendaItems?.map((item, index) => (
            <Blockquote
              key={`${item.title}-${index}`}
              color="#40469d"
              cite={
                <Text mt={-20} mb={10} style={{ fontStyle: 'normal' }} fw={700}>
                  {item.title}
                </Text>
              }
              icon={<IconCircleCheck size={30} />}
              p={30}
              style={{ display: 'flex', flexDirection: 'column-reverse', backgroundColor: '#f9faff' }}
            >
              {item.agendaItems?.map((agenda, idx) => <div key={`detail-${idx}`}>{agenda}</div>)}
            </Blockquote>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
