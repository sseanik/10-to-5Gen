import { Badge, Paper, Tabs } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';

import { MEETING_TAB_ITEMS } from '@/assets/data/meetingTabData';
import lottie from '@/assets/lotties/meeting.json';
import { MEETINGS } from '@/assets/mock/meetings';
import MeetingHeader from '@/components/MeetingHeader';
import Transcript from '@/components/Transcript';

export default function Meeting() {
  const { meetingId } = useParams();
  const meeting = MEETINGS.find((m) => m.id === meetingId);

  const navigate = useNavigate();
  if (!meeting) {
    navigate(`/404`);
    return null;
  }

  return (
    <>
      <MeetingHeader {...meeting} lottie={lottie} />
      <Paper shadow="xs" radius="lg" p="xs" mt="sm">
        <Tabs defaultValue="summary" variant="pills" radius="lg">
          <Tabs.List grow>
            {MEETING_TAB_ITEMS.map((item) => (
              <Tabs.Tab
                key={item.value}
                value={item.value}
                leftSection={<item.icon size={22} />}
                rightSection={
                  item.badge && (
                    <Badge size="xs" variant="filled" color="red" w={16} h={16} p={0}>
                      1
                    </Badge>
                  )
                }
              >
                {item.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Tabs.Panel value="summary">Gallery tab content</Tabs.Panel>
          <Tabs.Panel value="transcript">
            <Transcript id={meeting.id} />
          </Tabs.Panel>
          <Tabs.Panel value="minutes">Settings tab content</Tabs.Panel>
          <Tabs.Panel value="agenda">Settings tab content</Tabs.Panel>
          <Tabs.Panel value="schedule">Settings tab content</Tabs.Panel>
        </Tabs>
      </Paper>
    </>
  );
}
