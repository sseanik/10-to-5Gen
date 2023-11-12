import {
  Avatar,
  Box,
  Button,
  Code,
  Flex,
  Group,
  Modal,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Textarea,
  ThemeIcon,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { IconBrandOpenai, IconCalendarStats } from '@tabler/icons-react';
import Lottie from 'lottie-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { URL_CONFIG } from '@/assets/config';
import { COLOURS } from '@/assets/data/colours';
import loadingLottie from '@/assets/lotties/loading.json';
import { getCollection } from '@/helpers/api';
import parseNames from '@/helpers/parseNames';
import { MockAllData } from '@/types/Data';

interface MeetingHeaderProps {
  lottie: unknown;
  mock: boolean;
  meetingId: string;
  setIsRetro?: Dispatch<SetStateAction<boolean>>;
  isGenerating?: boolean;
}

export default function MeetingHeader({ lottie, mock, meetingId, setIsRetro, isGenerating }: MeetingHeaderProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [jsonData, setJsonData] = useState<MockAllData | null>(null);
  const [messages, setMessages] = useState<Array<{ user: string; message: string }>>([
    {
      user: 'ai',
      message:
        "Hello, I'm your AI Meeting Assistant. I can help you understand more about your meetings and the data generated. Feel free to ask me any questions you might have about your recent meetings, summaries, action items, tickets, or agendas. For example, you can ask about specific details of a meeting, clarifications on action items, updates on ticket statuses, or insights from the meeting summaries. Just type your question below, and I'll provide the information you need.",
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [aiMessage, setAiMessage] = useState('');

  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: () => getCollection('summary', meetingId),
    retry: 1,
    enabled: !mock,
  });

  useEffect(() => {
    if (data?.summaries?.type && setIsRetro) setIsRetro((data?.summaries?.type ?? '') === 'Retrospective');
  }, [data?.summaries?.type, setIsRetro]);

  useEffect(() => {
    if (mock) {
      fetch(`../${meetingId}.json`)
        .then((response) => response.json())
        .then((d) => setJsonData(d));
    }
  }, [meetingId, mock]);

  const parsedNames = parseNames(mock ? jsonData?.summaries?.attendees ?? [] : data?.summaries?.attendees);

  const fetchData = async () => {
    setCurrentMessage((prev) => {
      setMessages((prevMsgs) => [...prevMsgs, { user: 'user', message: prev }]);
      return '';
    });
    await fetchEventSource(`${URL_CONFIG}/assistant`, {
      method: 'POST',
      headers: { Accept: 'text/event-stream' },
      body: JSON.stringify({ meetingId, message: currentMessage }),
      onmessage(event) {
        setAiMessage((prev) => prev + event.data);
      },
      onclose() {
        if (aiMessage) {
          setAiMessage((prev) => {
            setMessages((prevMsgs) => [...prevMsgs, { user: 'ai', message: prev }]);
            return '';
          });
        }
      },
    });
  };

  return (
    <Paper shadow="sm" radius="lg" p="md" pos="sticky" w="100%" top={3} withBorder style={{ zIndex: 102 }}>
      <Group justify="space-between">
        <Group>
          <Lottie animationData={isGenerating ? loadingLottie : lottie} loop style={{ height: 100 }} />
          <Stack gap="0">
            <Group gap={6}>
              <Title order={4}>{mock ? jsonData?.summaries.title : data?.summaries?.title}</Title>
              {(mock ? jsonData?.summaries.type : data?.summaries?.type) && (
                <Group gap={2}>
                  <ThemeIcon variant="white" color="gray.7" ml={-5}>
                    <IconCalendarStats style={{ width: '70%', height: '70%' }} />
                  </ThemeIcon>
                  <Title order={6} c="gray.9">
                    {mock ? jsonData?.summaries.type : data?.summaries?.type}
                  </Title>
                </Group>
              )}
            </Group>

            <Group gap={6}>
              <Text size="sm">{`${mock ? jsonData?.summaries.date : data?.summaries?.date} ${
                mock ? jsonData?.summaries.time : data?.summaries?.time
              }`}</Text>
              <Text size="sm" c="gray.7">
                {(mock ? jsonData?.summaries.duration : data?.summaries?.duration) !== 0 &&
                  `${mock ? jsonData?.summaries.duration : data?.summaries?.duration} minutes`}
              </Text>
            </Group>
            {(mock ? jsonData?.summaries.attendees ?? [] : data?.summaries?.attendees ?? []).length > 0 && (
              <Flex align="center" gap="sm">
                <Text size="sm" c="gray.8">
                  Attendees:
                </Text>
                <Tooltip.Group openDelay={300} closeDelay={100}>
                  <Avatar.Group spacing="sm">
                    {parsedNames.map((attendee, index) => (
                      <Tooltip key={`${attendee}-${index}`} label={attendee} withArrow>
                        <Avatar
                          size="30px"
                          radius="xl"
                          color={
                            attendee.length > 0
                              ? COLOURS[Math.floor(attendee[0].charCodeAt(0) % COLOURS.length)]
                              : 'gray'
                          }
                        >
                          {attendee[0]}
                        </Avatar>
                      </Tooltip>
                    ))}
                  </Avatar.Group>
                </Tooltip.Group>
              </Flex>
            )}
          </Stack>
        </Group>
        <Modal
          opened={opened}
          onClose={close}
          size="55rem"
          centered
          bg="#202123"
          withCloseButton={false}
          title=""
          padding={0}
          m={0}
          style={{ padding: '0 !important' }}
        >
          <Box
            bg="#343541"
            w="100%"
            h="70vh"
            p="sm"
            display="flex"
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Stack w="100%" justify="space-between" h="100%">
              <ScrollArea>
                <Stack h="100%" display="flex" justify="flex-end">
                  {messages.map((message, idx) =>
                    message.user === 'ai' ? (
                      <Code
                        key={idx}
                        color="#181c20"
                        c="white"
                        bg="#272831"
                        w="auto"
                        block
                        fs="xl"
                        style={{ fontSize: '1rem', display: 'inline-flex', whiteSpace: 'pre-wrap' }}
                        ta="left"
                      >
                        {message.message}
                      </Code>
                    ) : (
                      <Box key={idx} bg="#343541" w="100%" p="sm" ta="right" h="auto">
                        <Text
                          c="white"
                          w="auto"
                          fs="xl"
                          style={{ fontSize: '1rem', display: 'inline-flex' }}
                          ta="right"
                        >
                          {message.message}
                        </Text>
                      </Box>
                    ),
                  )}
                  {aiMessage && (
                    <Code
                      color="#181c20"
                      c="white"
                      bg="#272831"
                      w="auto"
                      block
                      fs="xl"
                      style={{ fontSize: '1rem', display: 'inline-flex', whiteSpace: 'pre-wrap' }}
                      ta="left"
                    >
                      {aiMessage}
                    </Code>
                  )}
                </Stack>
              </ScrollArea>
              <Flex wrap="nowrap" gap="xs">
                <Textarea
                  id="textarea-override"
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchData()}
                  fs="large"
                  placeholder="Message AI Assistant"
                  w="90%"
                  value={currentMessage}
                  classNames={{
                    label: '.assistant-text-area',
                  }}
                />
                <Button w="10%" h="100%" color="black" onClick={() => fetchData()}>
                  Submit
                </Button>
              </Flex>
            </Stack>
          </Box>
        </Modal>
        {!mock && (
          <Button
            leftSection={<IconBrandOpenai size="24px" stroke={1.5} />}
            size="md"
            color="black"
            onClick={() => open()}
          >
            AI Assistant
          </Button>
        )}
      </Group>
    </Paper>
  );
}
