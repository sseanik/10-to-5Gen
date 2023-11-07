import { ActionIcon, Badge, NavLink, Stack, Tooltip } from '@mantine/core';
import {
  IconBrowserCheck,
  IconBulb,
  IconCalendarStats,
  IconChartDots,
  IconTimelineEventExclamation,
} from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: IconChartDots, to: '/' },
  { label: 'Meetings', icon: IconCalendarStats, to: '/meeting' },
  { label: 'Agile Suggestions', icon: IconBulb, to: 'agile' },
  { label: 'Standups', icon: IconBrowserCheck, to: '/standup' },
  { label: 'Retrospectives', icon: IconTimelineEventExclamation, to: '/retro' },
];

export function NavLinks({ opened }: { opened: boolean }) {
  const { pathname } = useLocation();

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
        active={item.to === pathname}
        disableRightSectionRotation
      />
    ))
  ) : (
    // Mobile Nav Items
    <Stack align="center">
      {NAV_ITEMS.map((item) => (
        <Tooltip key={item.label} label={item.label} position="right" withArrow arrowOffset={50} arrowSize={5}>
          <ActionIcon
            variant={item.to === pathname ? 'light' : 'transparent'}
            size="xl"
            color={item.to === pathname ? 'blue' : 'black'}
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
