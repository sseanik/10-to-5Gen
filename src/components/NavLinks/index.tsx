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

const NAV_ITEMS = [
  { label: 'Dashboard', icon: IconChartDots, children: [] },
  { label: 'Meetings AI', icon: IconCalendarStats, children: [] },
  {
    label: 'Agile AI',
    icon: IconBulb,
    children: [
      { label: 'Sprint Planning', icon: IconTimeline, children: [] },
      { label: 'Standups', icon: IconBrowserCheck, children: [] },
      { label: 'Retrospectives', icon: IconTimelineEventExclamation, children: [] },
      { label: 'Sprint Review', icon: IconChartDots2, children: [] },
    ],
  },
];

export function NavLinks({ opened }: { opened: boolean }) {
  return opened ? (
    // Desktop Nav items
    NAV_ITEMS.map((item) => (
      <NavLink
        key={item.label}
        label={item.label}
        leftSection={<item.icon size="24px" stroke={1.5} />}
        p="md"
        defaultOpened
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
            <ActionIcon variant="transparent" size="xl" color="black" onClick={(event) => event.preventDefault()}>
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
