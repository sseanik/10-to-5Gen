import '@mantine/core/styles.css';

import { AppShell, Progress } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Navbar from '@/components/Navbar';

function App() {
  const [opened, { toggle }] = useDisclosure(window.innerWidth > 768);

  return (
    <>
      <Progress radius="xs" size="xs" value={100} animated style={{ zIndex: 102 }} />
      <AppShell navbar={{ width: 250, breakpoint: 'sm' }} padding="md">
        <AppShell.Navbar withBorder={false} style={{ backgroundColor: 'unset' }}>
          <Navbar opened={opened} toggle={toggle} />
        </AppShell.Navbar>

        <AppShell.Main
          styles={{
            main: { paddingLeft: opened ? 275 : 100 },
          }}
        >
          Main
        </AppShell.Main>
      </AppShell>
    </>
  );
}

export default App;
