import { Text, Timeline, Title } from '@mantine/core';

import actionData from '@/assets/david/meeting.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function MeetingActions({ id }: { id?: string }) {
  const meetingActionItems = actionData.action_items;

  return (
    <>
      <Title order={4} mb="lg" c="blue">
        Meeting Action Items
      </Title>
      <Timeline radius="xs" active={Object.keys(meetingActionItems).length} lineWidth={1} bulletSize={26}>
        {Object.keys(meetingActionItems).map((key, index) => {
          if (!/^\d/.test(key)) return null;
          return (
            <Timeline.Item title={meetingActionItems[key]} bullet={index}>
              <Text c="dimmed" size="sm">
                {key.slice(0, -1)}
              </Text>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </>
  );
}
