import { NavLink } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';

import { NAV_ITEMS, NESTED_NAV_ITEMS } from '@/assets/data/navData';
import { isNavActive } from '@/helpers/navHelper';

interface DesktopNavLinksProps {
  isMeeting?: boolean;
  isMock?: boolean;
}

export default function DesktopNavLinks({ isMeeting, isMock }: DesktopNavLinksProps) {
  const data = !isMeeting ? NAV_ITEMS : NESTED_NAV_ITEMS;
  console.log({ data });
  const { pathname } = useLocation();
  const route = pathname.split('/').at(-1);
  const meetingId = route === 'meetings' || route === 'dashboard' || route === 'about' ? '' : route;
  const mockUrl = isMock ? '/mock' : '';

  return (
    <>
      {isMeeting && (
        <NavLink
          label="Back to Meetings"
          leftSection={<IconChevronLeft size="24px" stroke={1.5} />}
          p="md"
          defaultOpened
          disableRightSectionRotation
          component={Link}
          to="/meetings"
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
          // rightSection={
          //   navBadges[item.label as NavBadgeKeys] && (
          //     <Badge size="xs" variant="filled" color="red" w={16} h={16} p={0}>
          //       {navBadges[item.label as NavBadgeKeys]}
          //     </Badge>
          //   )
          // }
          p="md"
          defaultOpened
          // disableRightSectionRotation={item.children.length === 0}
          active={isNavActive(pathname, item.to)}
          component={Link}
          to={meetingId === '' ? `${mockUrl}${item.to}` : `${mockUrl}${item.to}/${meetingId}`}
        >
          {/* {item.children.map((nestedItem, idx) => (
            <NavLink
              key={`${nestedItem.label}-${idx}`}
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
          ))} */}
        </NavLink>
      ))}
    </>
  );
}
