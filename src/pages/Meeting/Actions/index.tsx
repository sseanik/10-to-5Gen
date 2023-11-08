import { Blockquote, Box, Tabs, Title } from '@mantine/core';
import { IconMessageCircle, IconPhoto } from '@tabler/icons-react';

import actionData from '@/assets/david/meeting.json';
import retroData from '@/assets/david/retro.json';
import MeetingActionItems from '@/components/MeetingActionItems';
import RetroActionItems from '@/components/RetroActionItems';

export default function Actions({ id }: { id?: string }) {
  const meetingActionItems = actionData.action_items;
  const retroActionItems = retroData.retro_actions;

  return (
    <Tabs variant="pills" defaultValue="meeting">
      <Tabs.List>
        <Tabs.Tab value="meeting" leftSection={<IconPhoto />}>
          Meeting Action Items
        </Tabs.Tab>
        <Tabs.Tab value="retro" leftSection={<IconMessageCircle />}>
          Retrospective Action Items
        </Tabs.Tab>
      </Tabs.List>
      <MeetingActionItems data={meetingActionItems} />
      <RetroActionItems data={retroActionItems} />
    </Tabs>
  );
}
