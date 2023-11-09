import { Dispatch, SetStateAction } from 'react';

import lottie from '@/assets/lotties/meetings.json';
import Header from '@/components/Header';
import MeetingTable from '@/components/MeetingTable';

export default function Meetings({ setProgress }: { setProgress: Dispatch<SetStateAction<boolean>> }) {
  return (
    <>
      <Header heading="Meetings" description="View a list of previously uploaded meetings." lottie={lottie} />
      <MeetingTable setProgress={setProgress} />
      <MeetingTable setProgress={setProgress} mock />
    </>
  );
}
