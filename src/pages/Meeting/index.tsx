import { Box, Paper } from '@mantine/core';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import lottie from '@/assets/lotties/meeting.json';
import { MEETINGS } from '@/assets/mock/meetings';
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
  const meeting = MEETINGS.find((m) => m.id === meetingId);

  useEffect(() => {
    setNavBadges({
      'Meeting Action Items': 4,
      'Retro Action Items': 6,
      'Suggested Tickets': 3,
    });
  }, [setNavBadges]);

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
              case 'Meeting Action Items':
                return <MeetingActions id={meetingId} />;
              case 'Retro Action Items':
                return <RetroActions id={meetingId} />;
              case 'Suggested Tickets':
                return <Tickets id={meetingId} />;
              case 'Next Agenda':
                return <Agenda id={meetingId} />;
              default:
                return null;
            }
          })()}
        </Box>
      </Paper>
    </>
  );
}
