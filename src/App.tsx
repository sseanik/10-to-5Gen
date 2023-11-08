import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Layout from '@/components/Layout';
import Agile from '@/pages/Agile';
import Meeting from '@/pages/Meeting';
import Meetings from '@/pages/Meetings';
import NotFound from '@/pages/NotFound';
import Retro from '@/pages/Retro';
import Standup from '@/pages/Standup';

import { NavBadgesType } from './types/NavBadges';

function App() {
  const { pathname } = useLocation();

  const [nestedNav, setNestedNav] = useState(/^\/\w+\/.*$/.test(pathname) ? 'Dashboard' : 'Meetings');
  const [navBadges, setNavBadges] = useState<NavBadgesType>({
    'Meeting Action Items': 0,
    'Retro Action Items': 0,
    'Suggested Tickets': 0,
  });

  return (
    <Layout nestedNav={nestedNav} setNestedNav={setNestedNav} navBadges={navBadges}>
      <Routes>
        <Route path="/" element={<Meetings />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/meeting/:meetingId" element={<Meeting nestedNav={nestedNav} setNavBadges={setNavBadges} />} />
        <Route path="/agile" element={<Agile />} />
        <Route path="/retro" element={<Retro />} />
        <Route path="/standup" element={<Standup />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
