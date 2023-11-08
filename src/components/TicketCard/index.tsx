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
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconClock, IconUrgent } from '@tabler/icons-react';

import { COLOURS } from '@/assets/data/colours';
import TicketModal from '@/components/TicketModal';
import { getDurationColour, getPriorityColour } from '@/helpers/colours';
import { TicketType } from '@/types/Ticket';

import styles from './index.module.css';

export default function TicketCard(props: TicketType) {
  const { title, description, assignee, duration, priority } = props;
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={title} size="xl">
        <TicketModal {...props} />
      </Modal>
      <Card
        shadow="sm"
        radius="md"
        p="sm"
        withBorder
        styles={{
          root: { borderLeft: `5px solid ${getThemeColor(getDurationColour(duration), theme)}` },
        }}
        style={{ width: 300, height: 170 }}
        component={UnstyledButton}
        className={styles.ticket}
        onClick={open}
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
              <Badge color={`${getDurationColour(duration)}`} leftSection={<IconClock size={16} />} py="8px">
                {duration}
              </Badge>

              <Badge color={`${getPriorityColour(priority)}`} leftSection={<IconUrgent size={16} />} py="8px">
                {priority}
              </Badge>
            </Group>

            <Tooltip label={assignee} position="right">
              <Avatar color={COLOURS[Math.floor(assignee[0].charCodeAt(0) % COLOURS.length)]} radius="xl">
                {assignee.replace(/[^A-Z]+/g, '')}
              </Avatar>
            </Tooltip>
          </Group>
        </Stack>
      </Card>
    </>
  );
}
