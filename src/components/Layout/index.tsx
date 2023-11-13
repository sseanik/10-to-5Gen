import '@mantine/core/styles.css';

import { AppShell, Progress } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';

import Navbar from '@/components/Navbar';

interface LayoutProps {
  children?: ReactNode;
  progress: boolean;
}

export default function Layout({ children, progress }: LayoutProps) {
  const [opened, { toggle }] = useDisclosure(window.innerWidth > 768);

  return (
    <AppShell navbar={{ width: 250, breakpoint: 'sm' }} padding="0" style={{ height: 'calc(100vh - 10px)' }}>
      <Progress
        radius="xs"
        size="xs"
        value={100}
        animated={progress}
        style={{ zIndex: 103 }}
        pos="fixed"
        w="100%"
        top={0}
      />
      <AppShell.Navbar withBorder={false} style={{ backgroundColor: 'unset', width: opened ? '250px' : '50px' }}>
        <Navbar opened={opened} toggle={toggle} />
      </AppShell.Navbar>

      <AppShell.Main
        styles={{
          main: { paddingLeft: opened ? 260 : 60, minHeight: 'calc(100dvh - 3px)', backgroundColor: '#f6f6f3' },
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
