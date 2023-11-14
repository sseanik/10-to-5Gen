import { Box, Flex, Group, List, Loader, Text, Title } from '@mantine/core';
import { useJsonStreaming } from 'http-streaming-request';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { URL_CONFIG } from '@/assets/config';
import lottie from '@/assets/lotties/meetingBackup.json';
import Container from '@/components/Container';
import MeetingHeader from '@/components/MeetingHeader';
import Progress from '@/components/Progress';
import RegenerateModal from '@/components/RegenerateModal';
import { type Minutes as MinutesType, MockAllData } from '@/types/Data';

export default function Minutes({
  setProgress,
  mock,
}: {
  setProgress: Dispatch<SetStateAction<boolean>>;
  mock?: boolean;
}) {
  const { meetingId } = useParams();

  const [isGenerating, setIsGenerating] = useState(false);
  // const [activeTab, setActiveTab] = useState<string | null>('summary');
  const [jsonData, setJsonData] = useState<MockAllData | null>(null);

  const { data, run } = useJsonStreaming<MinutesType>({
    url: `${URL_CONFIG}/minutes/${meetingId}`,
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
      //   title: 'Successfully Generated Meeting Minutes',
      //   message: 'View your overall summary, summary points, meeting attendee and attendee summary.',
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
        {/* <Tabs variant="pills" defaultValue="summary" onChange={setActiveTab}>
          <Tabs.List grow>
            {[
              { icon: IconPhoto, tab: 'summary', value: 'Summary' },
              { icon: IconMessageCircle, tab: 'agenda', value: 'Agenda' },
              { icon: IconSettings, tab: 'attendeeSummary', value: 'Attendee Summary' },
            ].map((tab, index) => (
              <Tabs.Tab
                key={index}
                value={tab.tab}
                leftSection={<tab.icon />}
                rightSection={isGenerating && <Loader color={activeTab === tab.tab ? 'white' : 'blue'} type="dots" />}
              >
                {tab.value}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Tabs.Panel value="summary">
            <Title order={4} mt="lg" mb="6" c="blue">
              Summary
            </Title>
            <Text mb="lg">{!mock ? data?.overallSummary : jsonData?.overallSummary}</Text>

            <List>
              {!mock &&
                data?.summaryPoints?.map((line: string, index: number) => (
                  <List.Item key={index}>
                    <Text>{line}</Text>
                  </List.Item>
                ))}
              {mock &&
                jsonData?.summaryPoints?.map((line: string, index: number) => (
                  <List.Item key={index}>
                    <Text>{line}</Text>
                  </List.Item>
                ))}
            </List>
          </Tabs.Panel>

          <Tabs.Panel value="agenda">
            <Title order={4} mt="lg" mb="6" c="blue">
              Agenda
            </Title>
            <List>
              {!mock &&
                data?.agenda?.map((line: string, index: number) => (
                  <List.Item key={index}>
                    <Text>{line}</Text>
                  </List.Item>
                ))}
              {mock &&
                jsonData?.agenda?.map((line: string, index: number) => (
                  <List.Item key={index}>
                    <Text>{line}</Text>
                  </List.Item>
                ))}
            </List>
          </Tabs.Panel>

          <Tabs.Panel value="attendeeSummary">
            <Title order={4} mt="lg" mb="6" c="blue">
              Attendee Summary
            </Title>
            <List>
              {!mock &&
                data?.attendeeSummary?.map((line: { name: string; summary: string }, index: number) => (
                  <List.Item key={index}>
                    <Text>
                      <b>{line.name}</b>: {line.summary}
                    </Text>
                  </List.Item>
                ))}
              {mock &&
                jsonData?.attendeeSummary?.map((line: { name: string; summary: string }, index: number) => (
                  <List.Item key={index}>
                    <Text>
                      <b>{line.name}</b>: {line.summary}
                    </Text>
                  </List.Item>
                ))}
            </List>
          </Tabs.Panel>
        </Tabs> */}
        <Box>
          <Flex align="center" gap="xs" mb="sm" justify="space-between">
            <Group>
              <Title order={4} mb="6" c="blue">
                Summary
              </Title>
              {isGenerating && <Loader color="blue" size="xs" />}
            </Group>
            {!mock && <RegenerateModal meetingId={meetingId} />}
          </Flex>

          <Text mb="lg">{!mock ? data?.overallSummary : jsonData?.overallSummary}</Text>

          <List>
            {!mock &&
              data?.summaryPoints?.map((line: string, index: number) => (
                <List.Item key={index}>
                  <Text>{line}</Text>
                </List.Item>
              ))}
            {mock &&
              jsonData?.summaryPoints?.map((line: string, index: number) => (
                <List.Item key={index}>
                  <Text>{line}</Text>
                </List.Item>
              ))}
          </List>
        </Box>

        <Box>
          <Flex mt="md" align="center" gap="xs">
            <Title order={4} mb="6" c="blue">
              Agenda
            </Title>
            {isGenerating && <Loader color="blue" size="xs" />}
          </Flex>
          <List>
            {!mock &&
              data?.agenda?.map((line: string, index: number) => (
                <List.Item key={index}>
                  <Text>{line}</Text>
                </List.Item>
              ))}
            {mock &&
              jsonData?.agenda?.map((line: string, index: number) => (
                <List.Item key={index}>
                  <Text>{line}</Text>
                </List.Item>
              ))}
          </List>
        </Box>

        <Box>
          <Flex mt="md" align="center" gap="xs">
            <Title order={4} mb="6" c="blue">
              Attendee Summary
            </Title>
            {isGenerating && <Loader color="blue" size="xs" />}
          </Flex>
          <List>
            {!mock &&
              data?.attendeeSummary?.map((line: { name: string; summary: string }, index: number) => (
                <List.Item key={index}>
                  <Text>
                    <b>{line.name}</b>: {line.summary}
                  </Text>
                </List.Item>
              ))}
            {mock &&
              jsonData?.attendeeSummary?.map((line: { name: string; summary: string }, index: number) => (
                <List.Item key={index}>
                  <Text>
                    <b>{line.name}</b>: {line.summary}
                  </Text>
                </List.Item>
              ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
}
