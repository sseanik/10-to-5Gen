import '@mantine/core/styles.css';

import { AppShell, Progress } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Dispatch, ReactNode, SetStateAction } from 'react';

import Navbar from '@/components/Navbar';
import { NavBadgesType } from '@/types/NavBadges';

interface LayoutProps {
  nestedNav: string;
  setNestedNav: Dispatch<SetStateAction<string>>;
  children?: ReactNode;
  navBadges: NavBadgesType;
  progress: boolean;
}

export default function Layout({ nestedNav, setNestedNav, children, navBadges, progress }: LayoutProps) {
  const [opened, { toggle }] = useDisclosure(window.innerWidth > 768);

  return (
    <AppShell navbar={{ width: 250, breakpoint: 'sm' }} padding="xs" style={{ height: 'calc(100vh - 10px)' }}>
      <Progress radius="xs" size="xs" value={100} animated={progress} style={{ zIndex: 102 }} />
      <AppShell.Navbar withBorder={false} style={{ backgroundColor: 'unset', width: opened ? '250px' : '75px' }}>
        <Navbar
          opened={opened}
          toggle={toggle}
          nestedNav={nestedNav}
          setNestedNav={setNestedNav}
          navBadges={navBadges}
        />
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
