import { Blockquote, Stack, Text, Title } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';

import { DataType } from '@/types/Data';

export default function Agenda({ data }: { data: DataType }) {
  const { items } = data.Meeting.next_agenda.agenda;

  return (
    <>
      <Title order={4} mb="lg" c="blue">
        Suggested Upcoming Agenda
      </Title>
      <Stack gap={0}>
        {items.map((item, index) => (
          <Blockquote
            key={`${item.item.split(':')[0]}-${index}`}
            color="blue"
            cite={
              <Text mt={-20} mb={10} style={{ fontStyle: 'normal' }} fw={700}>
                {item.item.split(':')[0]}
              </Text>
            }
            icon={<IconCircleCheck size={30} />}
            p={30}
            style={{ display: 'flex', flexDirection: 'column-reverse', backgroundColor: '#f9faff' }}
          >
            {item.detail.map((detail, idx) => (
              <div key={`detail-${idx}`}>{detail}</div>
            ))}
          </Blockquote>
        ))}
      </Stack>
    </>
  );
}
