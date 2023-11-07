import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from '@/components/Layout';
import Agile from '@/pages/Agile';
import Dashboard from '@/pages/Dashboard';
import Meeting from '@/pages/Meeting';
import Meetings from '@/pages/Meetings';
import NotFound from '@/pages/NotFound';
import Retro from '@/pages/Retro';
import Standup from '@/pages/Standup';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/meetings/:meetingId" element={<Meeting />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/agile" element={<Agile />} />
          <Route path="/retro" element={<Retro />} />
          <Route path="/standup" element={<Standup />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
