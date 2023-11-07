import { Burger, Image, Title } from '@mantine/core';

import Logo from '@/assets/logo.svg';

import classes from './index.module.css';

export function NavLogo({ opened, toggle }: { opened: boolean; toggle: () => void }) {
  return (
    <div className={classes.header}>
      {opened && (
        <>
          <Image src={Logo} alt="React Logo" height={30} width={30} fit="contain" />
          <Title order={3} style={{ color: '#131a35' }}>
            Congregate
          </Title>
        </>
      )}
      <Burger onClick={toggle} aria-label="Toggle navigation" size="sm" />
    </div>
  );
}
