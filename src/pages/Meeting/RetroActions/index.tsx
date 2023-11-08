import { Blockquote, Button, Title } from '@mantine/core';

import { DataType } from '@/types/Data';

export default function RetroActions({ data }: { data: DataType }) {
  const retroActionItems = data.Retro.retro_actions;

  return (
    <>
      <Title order={4} mb="lg" c="blue">
        Retrospective Action Items
      </Title>
      {retroActionItems.map((item, index) => (
        <Blockquote
          key={`retro-${index}`}
          color="orange"
          p="sm"
          mt="md"
          cite={
            <Button
              styles={{
                root: { fontStyle: 'normal', opacity: 1 },
              }}
              color="orange"
            >
              Create Ticket
            </Button>
          }
        >
          {item}
        </Blockquote>
      ))}
    </>
  );
}
