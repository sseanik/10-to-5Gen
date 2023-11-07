import { ActionIcon, Badge, Menu, NavLink, rem, Stack, Tooltip } from '@mantine/core';
import {
  IconBrowserCheck,
  IconBulb,
  IconCalendarStats,
  IconChartDots,
  IconChartDots2,
  IconTimeline,
  IconTimelineEventExclamation,
} from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: IconChartDots, children: [], to: '/' },
  { label: 'Meetings AI', icon: IconCalendarStats, children: [], to: '/meeting' },
  {
    label: 'Agile AI',
    icon: IconBulb,
    to: '',
    children: [
      { label: 'Sprint Planning', icon: IconTimeline, children: [], to: '/planning' },
      { label: 'Standups', icon: IconBrowserCheck, children: [], to: '/standup' },
      { label: 'Retrospectives', icon: IconTimelineEventExclamation, children: [], to: '/retro' },
      { label: 'Sprint Review', icon: IconChartDots2, children: [], to: '/review' },
    ],
  },
];

export function NavLinks({ opened }: { opened: boolean }) {
  const { pathname } = useLocation();

  return opened ? (
    // Desktop Nav items
    NAV_ITEMS.map((item) => (
      <NavLink
        key={item.label}
        label={item.label}
        leftSection={<item.icon size="24px" stroke={1.5} />}
        p="md"
        defaultOpened
        component={Link}
        to={item.to}
        active={item.to === pathname}
      >
        {item.children.length > 0 &&
          item.children.map((itemChild, index) => (
            <NavLink
              key={itemChild.label}
              label={itemChild.label}
              leftSection={<itemChild.icon size="24px" stroke={1.5} />}
              rightSection={
                <Badge size="xs" variant="filled" color="orange" w={16} h={16} p={0}>
                  {index + 1}
                </Badge>
              }
              p="sm"
              component={Link}
              to={itemChild.to}
              active={itemChild.to === pathname}
            />
          ))}
      </NavLink>
    ))
  ) : (
    // Mobile Nav Items
    <Stack align="center">
      {NAV_ITEMS.map((item) =>
        item.children.length === 0 ? (
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
        ) : (
          <Menu key={item.label} shadow="md" width={200} trigger="hover" position="right" withArrow>
            <Menu.Target>
              <ActionIcon variant="transparent" size="xl" color="black" onClick={(event) => event.preventDefault()}>
                <item.icon size="24px" stroke={1.5} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Agile AI</Menu.Label>
              {item.children.map((itemChild) => (
                <Menu.Item
                  key={itemChild.label}
                  leftSection={<itemChild.icon style={{ width: rem(14), height: rem(14) }} />}
                  component={Link}
                  to={itemChild.to}
                  color={itemChild.to === pathname ? 'blue' : 'black'}
                >
                  {itemChild.label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        ),
      )}
    </Stack>
  );
}
