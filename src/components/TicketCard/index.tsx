import {
  Avatar,
  Badge,
  Box,
  Card,
  getThemeColor,
  Group,
  Modal,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconClock, IconUrgent } from '@tabler/icons-react';

import { COLOURS } from '@/assets/data/colours';
import TicketModal from '@/components/TicketModal';
import { getDurationColour, getPriorityColour } from '@/helpers/colours';
import { Ticket } from '@/types/Data';

import styles from './index.module.css';

export default function TicketCard(props: Ticket) {
  const { assignee, description, estimate, priority, title } = props;
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={title} size="xl">
        <TicketModal {...props} />
      </Modal>
      <Card
        component="button"
        onClick={open}
        shadow="sm"
        radius="md"
        p="sm"
        withBorder
        styles={{
          root: { borderLeft: `5px solid ${getThemeColor(getDurationColour(estimate), theme)}`, textAlign: 'left' },
        }}
        style={{ width: 300, height: 170 }}
        className={styles.ticket}
      >
        <Stack justify="space-between" h="100%">
          <Box>
            <Text fw={600} lineClamp={2} size="md" mb="5">
              {title}
            </Text>

            <Text fw={500} lineClamp={2} c="gray.7" size="sm">
              {description}
            </Text>
          </Box>

          <Group justify="space-between">
            <Group>
              <Badge color={`${getDurationColour(estimate)}`} leftSection={<IconClock size={16} />} py="8px">
                {estimate}
              </Badge>

              <Badge color={`${getPriorityColour(priority)}`} leftSection={<IconUrgent size={16} />} py="8px">
                {priority}
              </Badge>
            </Group>

            {assignee && (
              <Tooltip label={assignee} position="right">
                <Avatar color={COLOURS[Math.floor(assignee[0]?.charCodeAt(0) ?? 0 % COLOURS.length)]} radius="xl">
                  {assignee.replace(/[^A-Z]+/g, '')}
                </Avatar>
              </Tooltip>
            )}
          </Group>
        </Stack>
      </Card>
    </>
  );
}
