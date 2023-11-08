import { Blockquote, Title } from '@mantine/core';

import retroData from '@/assets/david/retro.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function RetroActions({ id }: { id?: string }) {
  const retroActionItems = retroData.retro_actions;

  return (
    <>
      <Title order={4} mb="lg" c="blue">
        Retrospective Action Items
      </Title>
      {Object.keys(retroActionItems).map((key, index) => {
        if (!/^\d/.test(key)) return null;
        return (
          <Blockquote key={index} color="blue" p="sm" mt="md">
            {retroActionItems[key]}
          </Blockquote>
        );
      })}
    </>
  );
}
