import { List, Text, Title } from '@mantine/core';

import { DataType } from '@/types/Data';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Minutes({ data }: { data: DataType }) {
  const agenda = data.Meeting.minutes?.minutes.agenda;
  const summary = data.Meeting.minutes?.minutes.summary;

  return (
    <>
      <Title order={4} mb="xs" c="blue">
        Agenda
      </Title>
      <List>{agenda?.map((line, index) => <Text key={`line-${index}`}>{line}</Text>)}</List>
      <Title order={4} mt="lg" mb="6" c="blue">
        Summary
      </Title>
      {summary?.map((line, index) => <Text key={index}>{line}</Text>)}
    </>
  );
}
