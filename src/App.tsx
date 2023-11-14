import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Layout from '@/components/Layout';
import Meetings from '@/pages/Meetings';
import NotFound from '@/pages/NotFound';

import About from './pages/About';
import Actions from './pages/Actions';
import Agenda from './pages/Agenda';
import Minutes from './pages/Minutes';
import Tickets from './pages/Tickets';
import Transcript from './pages/Transcript';

function App() {
  const location = useLocation();

  const [progress, setProgress] = useState(false);
  // const [navBadges, setNavBadges] = useState<NavBadgesType>({
  //   'Retro Action Items': 0,
  //   'Suggested Tickets': 0,
  // });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AnimatePresence mode="wait">
      <Layout progress={progress}>
        <Routes key={location.pathname} location={location}>
          {/* Home */}
          <Route path="/" element={<Meetings setProgress={setProgress} />} />
          <Route path="/meetings" element={<Meetings setProgress={setProgress} />} />
          <Route path="/about" element={<About />} />
          {/* Nested */}
          <Route path="/transcript/:meetingId" element={<Transcript />} />
          <Route path="/minutes/:meetingId" element={<Minutes setProgress={setProgress} />} />
          <Route path="/actions/:meetingId" element={<Actions setProgress={setProgress} />} />
          <Route path="/tickets/:meetingId" element={<Tickets setProgress={setProgress} />} />
          <Route path="/agendas/:meetingId" element={<Agenda setProgress={setProgress} />} />
          {/* Mock */}
          <Route path="/mock/transcript/:meetingId" element={<Transcript mock />} />
          <Route path="/mock/minutes/:meetingId" element={<Minutes setProgress={setProgress} mock />} />
          <Route path="/mock/actions/:meetingId" element={<Actions setProgress={setProgress} mock />} />
          <Route path="/mock/tickets/:meetingId" element={<Tickets setProgress={setProgress} mock />} />
          <Route path="/mock/agendas/:meetingId" element={<Agenda setProgress={setProgress} mock />} />
          {/* Errors */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </AnimatePresence>
  );
}

export default App;
