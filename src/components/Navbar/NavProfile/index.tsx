import { Avatar, Group, rem, Text, UnstyledButton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

import classes from './index.module.css';

export function NavProfile({ opened }: { opened: boolean }) {
  return (
    <UnstyledButton
      className={classes.user}
      onClick={() =>
        alert(
          'NOT YET IMPLEMENTED: Settings screen with inputs to put Jira, EasyRetro and Microsoft Teams details/API keys',
        )
      }
    >
      <Group justify="center">
        <Avatar radius="xl" color="blue">
          R
        </Avatar>

        {opened && (
          <>
            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                Ronkley
              </Text>

              <Text c="dimmed" size="xs">
                Product Manager
              </Text>
            </div>

            <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
          </>
        )}
      </Group>
    </UnstyledButton>
  );
}
