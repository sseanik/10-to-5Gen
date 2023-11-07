import '@mantine/core/styles.css';

import { AppShell, Progress } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';

import Navbar from '@/components/Navbar';

export default function Layout({ children }: { children?: ReactNode }) {
  const [opened, { toggle }] = useDisclosure(window.innerWidth > 768);

  return (
    <AppShell navbar={{ width: 250, breakpoint: 'sm' }} padding="xs" style={{ height: 'calc(100vh - 10px)' }}>
      <Progress radius="xs" size="xs" value={100} animated style={{ zIndex: 102 }} />
      <AppShell.Navbar withBorder={false} style={{ backgroundColor: 'unset' }}>
        <Navbar opened={opened} toggle={toggle} />
      </AppShell.Navbar>

      <AppShell.Main
        styles={{
          main: { paddingLeft: opened ? 260 : 85, minHeight: 'calc(100dvh - 3px)', backgroundColor: '#f6f6f3' },
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
