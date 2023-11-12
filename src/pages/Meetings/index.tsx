import { Dispatch, SetStateAction } from 'react';

import lottie from '@/assets/lotties/meetings.json';
import Header from '@/components/Header';
import MeetingTable from '@/components/MeetingTable';

export default function Meetings({ setProgress }: { setProgress: Dispatch<SetStateAction<boolean>> }) {
  return (
    <>
      <Header
        heading="Meetings"
        description="Select a meeting row from the table to view generated data."
        lottie={lottie}
      />
      <MeetingTable setProgress={setProgress} />
      <MeetingTable setProgress={setProgress} mock />
    </>
  );
}
