import { ActionIcon, Menu, Stack, Tooltip } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';

import { NAV_ITEMS, NESTED_NAV_ITEMS } from '@/assets/data/navData';

interface MobileNavLinksProps {
  meeting?: boolean;
  isMock?: boolean;
}

export default function MobileNavLinks({ meeting, isMock }: MobileNavLinksProps) {
  const data = !meeting ? NAV_ITEMS : NESTED_NAV_ITEMS;
  const { pathname } = useLocation();
  const pathnameSplit = pathname.split('/').at(-1);
  const meetingId = pathnameSplit !== 'meetings' && pathnameSplit !== 'about' ? pathnameSplit : '';
  const mockUrl = isMock ? '/mock' : '';

  const isActive = (to: string) => pathname.startsWith(to);

  console.log({ meetingId });

  return (
    <Stack align="center">
      {meeting && (
        <Tooltip label="Back to Meetings" position="right" withArrow arrowOffset={50} arrowSize={5}>
          <ActionIcon variant="light" size="xl" color="gray" component={Link} to="/meetings">
            <IconChevronLeft size="24px" stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      )}
      {data.map((item, index) => (
        <Menu
          key={`${item.label}-${index}`}
          shadow="md"
          withArrow
          arrowPosition="center"
          position="right"
          trigger="hover"
        >
          <Menu.Target>
            <ActionIcon
              size="xl"
              variant={isActive(item.to) ? 'light' : 'transparent'}
              color={isActive(item.to) ? 'blue' : 'black'}
              component={Link}
              to={`${mockUrl}${item.to}/${meetingId}`}
            >
              <item.icon size="24px" stroke={1.5} />
            </ActionIcon>
          </Menu.Target>
        </Menu>
      ))}
    </Stack>
  );
}
