import { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';

import { NavBadgesType } from '@/types/NavBadges';

import DesktopNavLinks from './DesktopNavLinks';
import MobileNavLinks from './MobileNavLinks';

interface NavLinksProps {
  opened: boolean;
  nestedNav: string;
  setNestedNav: Dispatch<SetStateAction<string>>;
  navBadges: NavBadgesType;
}

export function NavLinks({ opened, nestedNav, setNestedNav, navBadges }: NavLinksProps) {
  const { pathname } = useLocation();
  const isMeeting = /^\/meeting\/.*/.test(pathname);

  return opened ? (
    <DesktopNavLinks meeting={isMeeting} nestedNav={nestedNav} setNestedNav={setNestedNav} navBadges={navBadges} />
  ) : (
    <MobileNavLinks meeting={isMeeting} nestedNav={nestedNav} setNestedNav={setNestedNav} navBadges={navBadges} />
  );
}
