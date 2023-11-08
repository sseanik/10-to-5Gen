import { Blockquote, Tabs } from '@mantine/core';

export default function MeetingActionItems({ data }: { data: any }) {
  return (
    <Tabs.Panel value="meeting">
      {Object.keys(data).map((key, index) => {
        if (!/^\d/.test(key)) return null;
        return (
          <Blockquote key={index} color="blue" cite={key} p="sm" mt="md">
            {data[key]}
          </Blockquote>
        );
      })}
    </Tabs.Panel>
  );
}
