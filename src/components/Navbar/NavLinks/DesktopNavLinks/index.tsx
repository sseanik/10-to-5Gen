import { Badge, NavLink } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { Dispatch, SetStateAction } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { NAV_ITEMS, NESTED_NAV_ITEMS } from '@/assets/data/navData';
import { isNavActive } from '@/helpers/navHelper';
import { NavBadgeKeys, NavBadgesType } from '@/types/NavBadges';

interface DesktopNavLinksProps {
  meeting?: boolean;
  nestedNav: string;
  setNestedNav: Dispatch<SetStateAction<string>>;
  navBadges: NavBadgesType;
}

export default function DesktopNavLinks({ meeting, nestedNav, setNestedNav, navBadges }: DesktopNavLinksProps) {
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
          key={`${item.label}-${index}`}
          label={item.label}
          leftSection={<item.icon size="24px" stroke={1.5} />}
          rightSection={
            navBadges[item.label as NavBadgeKeys] && (
              <Badge size="xs" variant="filled" color="red" w={16} h={16} p={0}>
                {navBadges[item.label as NavBadgeKeys]}
              </Badge>
            )
          }
          p="md"
          defaultOpened
          disableRightSectionRotation={item.children.length === 0}
          active={
            // eslint-disable-next-line no-nested-ternary
            item.label !== 'Meetings' && item.children.length > 0
              ? false
              : meeting
              ? item.label === nestedNav
              : isNavActive(pathname, item.to)
          }
          {...(meeting
            ? { onClick: item.children.length === 0 ? () => setNestedNav(item.label) : () => {}, to: '' }
            : { component: Link, to: item.to })}
        >
          {item.children.map((nestedItem, index) => (
            <NavLink
              key={`${nestedItem.label}-${index}`}
              label={nestedItem.label}
              leftSection={<nestedItem.icon size="24px" stroke={1.5} />}
              rightSection={
                navBadges[nestedItem.label as NavBadgeKeys] && (
                  <Badge size="xs" variant="filled" color="red" w={16} h={16} p={0}>
                    {navBadges[nestedItem.label as NavBadgeKeys]}
                  </Badge>
                )
              }
              p="md"
              defaultOpened
              disableRightSectionRotation
              active={meeting ? nestedItem.label === nestedNav : isNavActive(pathname, nestedItem.to)}
              {...(meeting
                ? { onClick: () => setNestedNav(nestedItem.label), to: '' }
                : { component: Link, to: nestedItem.to })}
            />
          ))}
        </NavLink>
      ))}
    </>
  );
}
