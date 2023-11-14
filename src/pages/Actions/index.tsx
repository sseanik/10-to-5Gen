import { Blockquote, Box, Button, Flex, Group, Loader, Modal, Stack, Text, Timeline, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUsers, IconUserStar } from '@tabler/icons-react';
import { useJsonStreaming } from 'http-streaming-request';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { URL_CONFIG } from '@/assets/config';
import lottie from '@/assets/lotties/retro.json';
import Container from '@/components/Container';
import MeetingHeader from '@/components/MeetingHeader';
import Progress from '@/components/Progress';
import RegenerateModal from '@/components/RegenerateModal';
import TicketModal from '@/components/TicketModal';
import { type Action, MockAllData } from '@/types/Data';

export default function Actions({
  setProgress,
  mock,
}: {
  setProgress: Dispatch<SetStateAction<boolean>>;
  mock?: boolean;
}) {
  const { meetingId } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [blurb, setBlurb] = useState('');
  const [isRetro, setIsRetro] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [jsonData, setJsonData] = useState<MockAllData | null>(null);

  const { data, run } = useJsonStreaming<Action>({
    url: `${URL_CONFIG}/actions/${meetingId}${mock ? 'break' : ''}`,
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
      //   title: 'Successfully Generated Action Items',
      //   message: 'View your generated Action Items and interact with them.',
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
      <MeetingHeader
        lottie={lottie}
        mock={mock}
        meetingId={meetingId as string}
        setIsRetro={setIsRetro}
        isGenerating={isGenerating}
      />
      <Progress mounted={isGenerating} text={data} />
      <Container>
        <Flex align="center" gap="xs" mb="sm" justify="space-between">
          <Group>
            <Title order={4} mb="6" c="blue">
              {isRetro ? 'Retrospective' : 'Meeting'} Action Items
            </Title>
            {isGenerating && <Loader color="blue" size="xs" />}
          </Group>
          {!mock && <RegenerateModal meetingId={meetingId} />}
        </Flex>
        <Stack gap="20px">
          {isRetro ? (
            <>
              <Modal opened={opened} onClose={close} title="Create Retro Item" size="xl">
                <TicketModal
                  acceptanceCriteria={[]}
                  assignee=""
                  description={blurb}
                  estimate={0}
                  priority=""
                  title=""
                  userStory=""
                  retro
                  storyPoints={0}
                />
              </Modal>
              {(mock ? jsonData : data)?.actionItems.map(
                (item, index: number) =>
                  item.actions?.map((action) => (
                    <Blockquote
                      key={`${index}-${action}`}
                      color="orange"
                      p="sm"
                      cite={
                        <Stack>
                          <Text size="md">- {item.assignee}</Text>
                          <Button
                            styles={{
                              root: { fontStyle: 'normal', opacity: 1 },
                            }}
                            color="orange"
                            onClick={() => {
                              setBlurb(action);
                              open();
                            }}
                            w="160"
                          >
                            Create Retro Item
                          </Button>
                        </Stack>
                      }
                    >
                      {action}
                    </Blockquote>
                  )),
              )}
            </>
          ) : (
            (mock ? jsonData : data)?.actionItems?.map((action, index) => (
              <Timeline
                key={index}
                radius="xs"
                active={action.actions?.length}
                lineWidth={1}
                bulletSize={26}
                color={index % 2 === 0 ? 'blue' : 'orange'}
              >
                {action?.actions?.map((item, idx) => (
                  <Timeline.Item
                    key={idx}
                    title={item}
                    bullet={
                      action.assignee.toLowerCase().startsWith('all') ? (
                        <IconUsers size={16} />
                      ) : (
                        <IconUserStar size={18} />
                      )
                    }
                  >
                    <Text c="gray.7" size="sm">
                      {action.assignee}
                    </Text>
                  </Timeline.Item>
                ))}
              </Timeline>
            ))
          )}
        </Stack>
      </Container>
    </Box>
  );
}
