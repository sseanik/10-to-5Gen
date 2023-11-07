import { ActionIcon, Badge, NavLink, Stack, Tooltip } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

import { NAV_ITEMS } from '@/assets/data/navData';

export function NavLinks({ opened }: { opened: boolean }) {
  const { pathname } = useLocation();

  const isNavActive = (to: string) => {
    const lastSlashIndex = pathname.slice(1).lastIndexOf('/');

    if (lastSlashIndex !== -1) {
      return pathname.substring(0, lastSlashIndex + 1) === to;
    }

    return pathname === to;
  };

  return opened ? (
    // Desktop Nav items
    NAV_ITEMS.map((item, index) => (
      <NavLink
        key={item.label}
        label={item.label}
        leftSection={<item.icon size="24px" stroke={1.5} />}
        rightSection={
          <Badge size="xs" variant="filled" color="red" w={16} h={16} p={0}>
            {index + 1}
          </Badge>
        }
        p="md"
        defaultOpened
        component={Link}
        to={item.to}
        active={isNavActive(item.to)}
        disableRightSectionRotation
      />
    ))
  ) : (
    // Mobile Nav Items
    <Stack align="center">
      {NAV_ITEMS.map((item) => (
        <Tooltip key={item.label} label={item.label} position="right" withArrow arrowOffset={50} arrowSize={5}>
          <ActionIcon
            variant={isNavActive(item.to) ? 'light' : 'transparent'}
            size="xl"
            color={isNavActive(item.to) ? 'blue' : 'black'}
            component={Link}
            to={item.to}
          >
            <item.icon size="24px" stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      ))}
    </Stack>
  );
}
