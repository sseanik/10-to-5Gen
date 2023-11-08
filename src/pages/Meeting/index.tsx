import { Box, Paper } from '@mantine/core';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { URL_CONFIG } from '@/assets/config';
import mockData from '@/assets/david/master_output.json';
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
  setNestedNav: Dispatch<SetStateAction<string>>;
  setNavBadges: Dispatch<SetStateAction<NavBadgesType>>;
  setProgress: Dispatch<SetStateAction<boolean>>;
}

export default function Meeting({ nestedNav, setNestedNav, setNavBadges, setProgress }: MeetingProps) {
  const { meetingId } = useParams();
  console.log({ meetingId });
  // Fetching the data
  const getMeeting = async () => {
    const res = await fetch(`${URL_CONFIG}/files/${meetingId}`);
    return res.json();
  };
  // Using the hook
  const { data, isLoading } = useQuery({ queryKey: ['meetingId', meetingId], queryFn: getMeeting, retry: 1 });

  useEffect(() => {
    setNestedNav('Dashboard');
  }, [setNestedNav]);

  useEffect(() => {
    setProgress(isLoading);
  }, [isLoading, setProgress]);

  const dataSource = !data ? mockData : data.data;

  useEffect(() => {
    setNavBadges({
      'Retro Action Items': dataSource.Retro.retro_actions.length,
      'Suggested Tickets': dataSource.Jira.jira_tickets.length,
    });
  }, [dataSource.Jira.jira_tickets.length, dataSource.Retro.retro_actions.length, setNavBadges]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box mr="10px">
      <MeetingHeader data={dataSource} lottie={lottie} mock={!data} />
      <Paper shadow="xs" radius="lg" p="xs" mt="sm">
        <Box p="sm" mt="xs" style={{ whiteSpace: 'pre-wrap' }}>
          {(() => {
            switch (nestedNav) {
              case 'Meetings':
                return <Dashboard data={dataSource} />;
              case 'Dashboard':
                return <Dashboard data={dataSource} />;
              case 'Transcript':
                return <Transcript data={dataSource} />;
              case 'Meeting Minutes':
                return <Minutes data={dataSource} />;
              case 'Meeting Action Items':
                return <MeetingActions data={dataSource} />;
              case 'Retro Action Items':
                return <RetroActions data={dataSource} />;
              case 'Suggested Tickets':
                return <Tickets data={dataSource} />;
              case 'Next Agenda':
                return <Agenda data={dataSource} />;
              default:
                return <div>Something went wrong.</div>;
            }
          })()}
        </Box>
      </Paper>
    </Box>
  );
}
