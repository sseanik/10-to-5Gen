import '@mantine/core/styles.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from '@/pages/Dashboard';
import Meetings from '@/pages/Meetings';
import NotFound from '@/pages/NotFound';
import Planning from '@/pages/Planning';
import Retro from '@/pages/Retro';
import Review from '@/pages/Review';
import Standup from '@/pages/Standup';

import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/meeting" element={<Meetings />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/retro" element={<Retro />} />
          <Route path="/review" element={<Review />} />
          <Route path="/standup" element={<Standup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
