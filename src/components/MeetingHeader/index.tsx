import { Avatar, Flex, Group, Paper, Stack, Text, Title, Tooltip } from '@mantine/core';
import Lottie from 'lottie-react';

import { COLOURS } from '@/assets/data/colours';

interface MeetingHeaderProps {
  lottie: unknown;
  title: string;
  date: string;
  time: string;
  duration: string;
  attendees: string[];
}

export default function MeetingHeader({ lottie, title, date, time, duration, attendees }: MeetingHeaderProps) {
  return (
    <Paper shadow="xs" radius="lg" style={{ padding: '0 1rem' }}>
      <Group justify="space-between">
        <Group>
          <Lottie animationData={lottie} loop style={{ height: 100 }} />
          <Stack gap="0">
            <Title order={4}>{title}</Title>
            <Text size="md">{`${date} - ${time}`}</Text>
            <Text size="sm" c="gray.7">
              {duration}
            </Text>
          </Stack>
        </Group>
        <Flex align="center" gap="sm">
          <Text size="sm" c="gray.7">
            Attendees:
          </Text>
          <Tooltip.Group openDelay={300} closeDelay={100}>
            <Avatar.Group spacing="sm">
              {attendees.map((attendee) => (
                <Tooltip label={attendee} withArrow>
                  <Avatar src="image.png" radius="xl" color={COLOURS[Math.floor(Math.random() * COLOURS.length)]}>
                    {attendee[0]}
                  </Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
          </Tooltip.Group>
        </Flex>
      </Group>
    </Paper>
  );
}
