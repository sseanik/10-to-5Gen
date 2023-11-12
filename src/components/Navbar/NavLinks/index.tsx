import { useLocation } from 'react-router-dom';

import DesktopNavLinks from './DesktopNavLinks';
import MobileNavLinks from './MobileNavLinks';

interface NavLinksProps {
  opened: boolean;
}

export function NavLinks({ opened }: NavLinksProps) {
  const { pathname } = useLocation();
  const isMeeting = pathname !== '/' && !/^.*(meetings|dashboard|about).*$/.test(pathname);
  const isMock = /^.*mock.*$/.test(pathname);

  return opened ? (
    <DesktopNavLinks isMeeting={isMeeting} isMock={isMock} />
  ) : (
    <MobileNavLinks meeting={isMeeting} isMock={isMock} />
  );
}
