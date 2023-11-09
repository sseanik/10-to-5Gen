import { Blockquote, Button, Modal, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import TicketModal from '@/assets/src/components/TicketModal';
import { DataType } from '@/types/Data';

export default function RetroActions({ data }: { data: DataType }) {
  const retroActionItems = data.Retro.retro_actions;
  const [opened, { open, close }] = useDisclosure(false);
  const [blurb, setBlurb] = useState('');

  return (
    <>
      <Title order={4} mb="lg" c="blue">
        Retrospective Action Items
      </Title>
      <Modal opened={opened} onClose={close} title="Create Retro Item" size="xl">
        <TicketModal
          acceptanceCriteria=""
          assignee=""
          description={blurb}
          estimate=""
          priority=""
          title=""
          userStory=""
          retro
        />
      </Modal>
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
              onClick={() => {
                setBlurb(item);
                open();
              }}
            >
              Create Retro Item
            </Button>
          }
        >
          {item}
        </Blockquote>
      ))}
    </>
  );
}
