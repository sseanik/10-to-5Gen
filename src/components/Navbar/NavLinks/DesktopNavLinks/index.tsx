import { Badge, NavLink } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { Dispatch, SetStateAction } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { NAV_ITEMS, NESTED_NAV_ITEMS } from '@/assets/data/navData';
import { isNavActive } from '@/helpers/navHelper';

interface DesktopNavLinksProps {
  meeting?: boolean;
  nestedNav: string;
  setNestedNav: Dispatch<SetStateAction<string>>;
}

export default function DesktopNavLinks({ meeting, nestedNav, setNestedNav }: DesktopNavLinksProps) {
  const data = !meeting ? NAV_ITEMS : NESTED_NAV_ITEMS;
  const { pathname } = useLocation();

  return (
    <>
      {meeting && (
        <NavLink
          label="Back to Meetings"
          leftSection={<IconChevronLeft size="24px" stroke={1.5} />}
          p="md"
          defaultOpened
          disableRightSectionRotation
          component={Link}
          to="/meetings"
          onClick={() => setNestedNav('Dashboard')}
          color="gray"
          variant="subtle"
          active
        />
      )}
      {data.map((item, index) => (
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
          disableRightSectionRotation
          active={meeting ? item.label === nestedNav : isNavActive(pathname, item.to)}
          {...(meeting ? { onClick: () => setNestedNav(item.label), to: '' } : { component: Link, to: item.to })}
        />
      ))}
    </>
  );
}
