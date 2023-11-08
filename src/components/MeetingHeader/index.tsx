import { Avatar, Button, Flex, Group, Paper, Stack, Text, ThemeIcon, Title, Tooltip } from '@mantine/core';
import { IconBrandOpenai, IconCalendarStats } from '@tabler/icons-react';
import Lottie from 'lottie-react';

import { COLOURS } from '@/assets/data/colours';
import parseNames from '@/helpers/parseNames';
import { DataType } from '@/types/Data';

interface MeetingHeaderProps {
  data: DataType;
  lottie: unknown;
  mock: boolean;
}

export default function MeetingHeader({ data, lottie, mock }: MeetingHeaderProps) {
  const { attendees, date, duration, title, type } = data.Meta;
  const { time, location } = data.Meeting.minutes.minutes;
  const parsedNames = parseNames(attendees);

  return (
    <Paper
      shadow="sm"
      radius="lg"
      p="xs"
      pr="xl"
      pl={0}
      pos="sticky"
      w="100%"
      top={3}
      withBorder
      style={{ zIndex: 102 }}
    >
      <Group justify="space-between">
        <Group>
          <Lottie animationData={lottie} loop style={{ height: 100 }} />
          <Stack gap="0">
            <Group gap={6}>
              <Title order={4}>{title}</Title>
              <Text size="sm" c="gray.7">
                ({location})
              </Text>
            </Group>

            <Group gap={2}>
              <ThemeIcon variant="white" color="gray.7" ml={-5}>
                <IconCalendarStats style={{ width: '70%', height: '70%' }} />
              </ThemeIcon>
              <Title order={6} c="gray.9">
                {type}
              </Title>
            </Group>

            <Group gap={6}>
              <Text size="sm">{`${date} at ${time}`}</Text>
              <Text size="sm" c="gray.7">
                ({duration} minutes)
              </Text>
            </Group>
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
                        color={COLOURS[Math.floor(attendee[0].charCodeAt(0) % COLOURS.length)]}
                      >
                        {attendee[0]}
                      </Avatar>
                    </Tooltip>
                  ))}
                </Avatar.Group>
              </Tooltip.Group>
            </Flex>
            {mock && (
              <Text mb="xs" c="red.8" size="sm">
                Using Mock Data
              </Text>
            )}
          </Stack>
        </Group>
        <Button variant="light" leftSection={<IconBrandOpenai size="24px" stroke={1.5} />} size="md">
          Refine Data
        </Button>
      </Group>
    </Paper>
  );
}
