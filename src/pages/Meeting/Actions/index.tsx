import { Box } from '@mantine/core';

import actionData from '@/assets/david/meeting.json';
import retroData from '@/assets/david/retro.json';

export default function Actions({ id }: { id?: string }) {
  const meetingActionItems = actionData.action_items;
  const retroActionItems = retroData.retro_actions;
  return (
    <div>
      <Box>{JSON.stringify(meetingActionItems)}</Box>
      <Box>{JSON.stringify(retroActionItems)}</Box>
    </div>
  );
}
