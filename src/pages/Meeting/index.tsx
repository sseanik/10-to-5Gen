import { Box, Paper } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';

import lottie from '@/assets/lotties/meeting.json';
import { MEETINGS } from '@/assets/mock/meetings';
import MeetingHeader from '@/components/MeetingHeader';

import Actions from './Actions';
import Agenda from './Agenda';
import Dashboard from './Dashboard';
import Minutes from './Minutes';
import Tickets from './Tickets';
import Transcript from './Transcript';

export default function Meeting({ nestedNav }: { nestedNav: string }) {
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
        <Box p="sm" mt="xs" style={{ whiteSpace: 'pre-wrap' }}>
          {(() => {
            switch (nestedNav) {
              case 'Dashboard':
                return <Dashboard id={meetingId} />;
              case 'Transcript':
                return <Transcript id={meetingId} />;
              case 'Meeting Minutes':
                return <Minutes id={meetingId} />;
              case 'Action Items':
                return <Actions id={meetingId} />;
              case 'Suggested Tickets':
                return <Tickets id={meetingId} />;
              case 'Next Agenda':
                return <Agenda id={meetingId} />;
              default:
                return null;
            }
          })()}
        </Box>
        {/* <Tabs defaultValue="summary" variant="pills" radius="lg">
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

          {MEETING_TAB_ITEMS.map((item) => (
            <Tabs.Panel value={item.value}>
              <Box key={item.label} p="md" mt="xs" style={{ whiteSpace: 'pre-wrap' }}>
                {item.component(meeting.id)}
              </Box>
            </Tabs.Panel>
          ))}
        </Tabs> */}
      </Paper>
    </>
  );
}
