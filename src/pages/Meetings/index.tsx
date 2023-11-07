import lottie from '@/assets/meeting.json';
import Header from '@/components/Header';
import MeetingTable from '@/components/MeetingTable';

export default function Meetings() {
  return (
    <>
      <Header heading="Meetings" description="<NEED DESCRIPTION>" lottie={lottie} />
      <MeetingTable />
    </>
  );
}
