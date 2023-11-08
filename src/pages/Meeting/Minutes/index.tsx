import { List, Text, Title } from '@mantine/core';

import { DataType } from '@/types/Data';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Minutes({ data }: { data: DataType }) {
  const { agenda, summary } = data.Meeting.minutes.minutes;

  return (
    <>
      <Title order={4} mb="xs" c="blue">
        Agenda
      </Title>
      <List>
        {agenda.map((line, index) => (
          <Text key={index}>{line}</Text>
        ))}
      </List>
      <Title order={4} mt="lg" mb="6" c="blue">
        Summary
      </Title>
      {summary.map((line, index) => (
        <Text key={index}>{line}</Text>
      ))}
    </>
  );
}
