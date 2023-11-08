import { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';

import DesktopNavLinks from './DesktopNavLinks';
import MobileNavLinks from './MobileNavLinks';

interface NavLinksProps {
  opened: boolean;
  nestedNav: string;
  setNestedNav: Dispatch<SetStateAction<string>>;
}

export function NavLinks({ opened, nestedNav, setNestedNav }: NavLinksProps) {
  const { pathname } = useLocation();
  const isMeeting = /^\/meeting\/.*/.test(pathname);

  return opened ? (
    <DesktopNavLinks meeting={isMeeting} nestedNav={nestedNav} setNestedNav={setNestedNav} />
  ) : (
    <MobileNavLinks meeting={isMeeting} nestedNav={nestedNav} setNestedNav={setNestedNav} />
  );
}
