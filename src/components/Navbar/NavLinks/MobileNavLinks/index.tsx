import { ActionIcon, Stack, Tooltip } from '@mantine/core';
import { IconChevronLeft, TablerIconsProps } from '@tabler/icons-react';
import { Dispatch, SetStateAction } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { NAV_ITEMS, NESTED_NAV_ITEMS } from '@/assets/data/navData';
import { isNavActive } from '@/helpers/navHelper';

interface MobileNavLinksProps {
  meeting?: boolean;
  nestedNav: string;
  setNestedNav: Dispatch<SetStateAction<string>>;
}

export default function MobileNavLinks({ meeting, nestedNav, setNestedNav }: MobileNavLinksProps) {
  const data = !meeting ? NAV_ITEMS : NESTED_NAV_ITEMS;
  const { pathname } = useLocation();

  const isActive = (item: { label: string; icon: (props: TablerIconsProps) => JSX.Element; to: string }) =>
    meeting ? item.label === nestedNav : isNavActive(pathname, item.to);

  return (
    <Stack align="center">
      {meeting && (
        <Tooltip label="Back to Meetings" position="right" withArrow arrowOffset={50} arrowSize={5}>
          <ActionIcon
            variant="light"
            size="xl"
            color="gray"
            component={Link}
            to="/meetings"
            onClick={() => setNestedNav('Dashboard')}
          >
            <IconChevronLeft size="24px" stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      )}
      {data.map((item) => (
        <Tooltip key={item.label} label={item.label} position="right" withArrow arrowOffset={50} arrowSize={5}>
          <ActionIcon
            size="xl"
            variant={isActive(item) ? 'light' : 'transparent'}
            color={isActive(item) ? 'blue' : 'black'}
            {...(meeting ? { onClick: () => setNestedNav(item.label), to: '' } : { component: Link, to: item.to })}
          >
            <item.icon size="24px" stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      ))}
    </Stack>
  );
}
