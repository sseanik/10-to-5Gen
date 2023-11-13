import { Avatar, Button, Flex, Group, Modal, Paper, rem, Stack, Text, ThemeIcon, Title, Tooltip } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconBrandOpenai, IconCalendarStats } from '@tabler/icons-react';
import Lottie from 'lottie-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { COLOURS } from '@/assets/data/colours';
import loadingLottie from '@/assets/lotties/loading.json';
import { getCollection } from '@/helpers/api';
import parseNames from '@/helpers/parseNames';
import { MockAllData } from '@/types/Data';

import Assistant from '../Assistant';

interface MeetingHeaderProps {
  lottie: unknown;
  mock?: boolean;
  meetingId: string;
  setIsRetro?: Dispatch<SetStateAction<boolean>>;
  isGenerating?: boolean;
}

export default function MeetingHeader({ lottie, mock, meetingId, setIsRetro, isGenerating }: MeetingHeaderProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [jsonData, setJsonData] = useState<MockAllData | null>(null);
  const isMobile = useMediaQuery(`(max-width: 750px)`);

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

  const renderData = mock ? jsonData : data;

  return (
    <Paper
      shadow="sm"
      radius="lg"
      p="md"
      pos={isMobile ? 'relative' : 'sticky'}
      w="100%"
      top={3}
      withBorder
      style={{ zIndex: 102 }}
    >
      <Group justify="space-between">
        <Group>
          <Lottie animationData={isGenerating ? loadingLottie : lottie} loop style={{ height: 100 }} />
          <Stack gap="0">
            <Group gap={6}>
              <Title order={4}>{renderData?.summaries?.title ?? ''}</Title>
              {renderData?.summaries?.type && (
                <Group gap={2}>
                  <ThemeIcon variant="white" color="gray.7" ml={-5}>
                    <IconCalendarStats style={{ width: '70%', height: '70%' }} />
                  </ThemeIcon>
                  <Title order={6} c="gray.9">
                    {renderData?.summaries?.type ?? ''}
                  </Title>
                </Group>
              )}
            </Group>

            <Group gap={6}>
              <Text size="sm">{`${renderData?.summaries?.date ?? ''} ${renderData?.summaries?.time ?? ''}`}</Text>
              <Text size="sm" c="gray.7">
                {renderData?.summaries?.duration !== 0 &&
                  renderData?.summaries?.duration &&
                  `${renderData?.summaries?.duration} minutes`}
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
          id="assistant-modal"
          opened={opened}
          onClose={close}
          size="55rem"
          centered
          title=""
          padding={0}
          m={0}
          style={{ padding: '0 !important' }}
          styles={{
            header: { backgroundColor: '#343541' },
            close: { color: 'white' },
          }}
        >
          <Assistant meetingId={meetingId} />
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
