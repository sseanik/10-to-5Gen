import { useNavigate, useParams } from 'react-router-dom';

import lottie from '@/assets/lotties/meeting.json';
import { MEETINGS } from '@/assets/mock/meetings';
import Header from '@/components/Header';

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
      <Header heading={meeting.title} description="<NEED DESCRIPTION>" lottie={lottie} hideUpload />
      {meetingId}
    </>
  );
}
