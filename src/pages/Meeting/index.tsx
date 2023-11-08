import { Box, Paper } from '@mantine/core';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import data from '@/assets/david/master_output.json';
import lottie from '@/assets/lotties/meeting.json';
import MeetingHeader from '@/components/MeetingHeader';
import { NavBadgesType } from '@/types/NavBadges';

import Agenda from './Agenda';
import Dashboard from './Dashboard';
import MeetingActions from './MeetingActions';
import Minutes from './Minutes';
import RetroActions from './RetroActions';
import Tickets from './Tickets';
import Transcript from './Transcript';

interface MeetingProps {
  nestedNav: string;
  setNavBadges: Dispatch<SetStateAction<NavBadgesType>>;
}

export default function Meeting({ nestedNav, setNavBadges }: MeetingProps) {
  const { meetingId } = useParams();

  useEffect(() => {
    setNavBadges({
      'Retro Action Items': data.Retro.retro_actions.length,
      'Suggested Tickets': data.Jira.jira_tickets.length,
    });
  }, [setNavBadges]);

  // const navigate = useNavigate();
  // if (!meeting) {
  //   navigate(`/404`);
  //   return null;
  // }

  return (
    <>
      <MeetingHeader data={data} lottie={lottie} />
      <Paper shadow="xs" radius="lg" p="xs" mt="sm">
        <Box p="sm" mt="xs" style={{ whiteSpace: 'pre-wrap' }}>
          {(() => {
            switch (nestedNav) {
              case 'Dashboard':
                return <Dashboard data={data} />;
              case 'Transcript':
                return <Transcript data={data} />;
              case 'Meeting Minutes':
                return <Minutes data={data} />;
              case 'Meeting Action Items':
                return <MeetingActions data={data} />;
              case 'Retro Action Items':
                return <RetroActions data={data} />;
              case 'Suggested Tickets':
                return <Tickets data={data} />;
              case 'Next Agenda':
                return <Agenda data={data} />;
              default:
                return null;
            }
          })()}
        </Box>
      </Paper>
    </>
  );
}
