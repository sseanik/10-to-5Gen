import { Box, em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect } from 'react';

import { NavLinks } from '@/components/Navbar/NavLinks';
import { NavLogo } from '@/components/Navbar/NavLogo';
import { NavProfile } from '@/components/Navbar/NavProfile';
import { NavBadgesType } from '@/types/NavBadges';

import classes from './index.module.css';

interface NavbarProps {
  opened: boolean;
  toggle: () => void;
  nestedNav: string;
  setNestedNav: Dispatch<SetStateAction<string>>;
  navBadges: NavBadgesType;
}

export default function Navbar({ opened, toggle, nestedNav, setNestedNav, navBadges }: NavbarProps) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  useEffect(() => {
    if (opened && isMobile) {
      toggle();
    } else if (!opened && !isMobile) {
      toggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <motion.nav
      animate={{
        width: opened ? '250px' : '75px',
      }}
      className={classes.navbar}
    >
      <Box>
        <NavLogo opened={opened} toggle={toggle} />
        <NavLinks opened={opened} nestedNav={nestedNav} setNestedNav={setNestedNav} navBadges={navBadges} />
      </Box>
      <NavProfile opened={opened} />
    </motion.nav>
  );
}
