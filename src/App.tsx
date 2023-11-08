import { AnimatePresence } from 'framer-motion';
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
  const location = useLocation();

  const [progress, setProgress] = useState(false);
  const [nestedNav, setNestedNav] = useState(/^\/\w+$/.test(location.pathname) ? 'Meetings' : 'Dashboard');
  const [navBadges, setNavBadges] = useState<NavBadgesType>({
    'Retro Action Items': 0,
    'Suggested Tickets': 0,
  });

  return (
    <AnimatePresence mode="wait">
      <Layout nestedNav={nestedNav} setNestedNav={setNestedNav} navBadges={navBadges} progress={progress}>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Meetings setNestedNav={setNestedNav} />} />
          <Route path="/meetings" element={<Meetings setNestedNav={setNestedNav} />} />
          <Route path="/meeting/:meetingId" element={<Meeting nestedNav={nestedNav} setNavBadges={setNavBadges} />} />
          <Route path="/agile" element={<Agile />} />
          <Route path="/retro" element={<Retro />} />
          <Route path="/standup" element={<Standup />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </AnimatePresence>
  );
}

export default App;
