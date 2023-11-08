import { Stack, Text, Timeline, Title } from '@mantine/core';
import { IconUsers, IconUserStar } from '@tabler/icons-react';

import { DataType } from '@/types/Data';

export default function MeetingActions({ data }: { data: DataType }) {
  const meetingActionItems = data.Meeting.action_items;

  return (
    <>
      <Title order={4} mb="lg" c="blue">
        Meeting Action Items
      </Title>
      <Stack gap="50px">
        {Object.keys(meetingActionItems).map((key, index) => (
          <Timeline
            key={index}
            radius="xs"
            active={meetingActionItems[key].length}
            lineWidth={1}
            bulletSize={26}
            color={index % 2 === 0 ? 'blue' : 'orange'}
          >
            {meetingActionItems[key].map((item, idx) => (
              <Timeline.Item
                key={idx}
                title={item}
                bullet={key.toLowerCase().startsWith('all') ? <IconUsers size={16} /> : <IconUserStar size={18} />}
              >
                <Text c="gray.7" size="sm">
                  {key.slice(0, -1)}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        ))}
      </Stack>
    </>
  );
}
