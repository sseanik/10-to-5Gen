import { Tabs, Timeline } from '@mantine/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RetroActionItems({ data }: { data: any }) {
  return (
    <Tabs.Panel value="retro" mt="lg">
      <Timeline radius="xs" active={Object.keys(data).length} lineWidth={2} bulletSize={26}>
        {Object.keys(data).map((key, index) => {
          if (!/^\d/.test(key)) return null;
          return <Timeline.Item title={data[key]} bullet={index + 1} />;
        })}
      </Timeline>
    </Tabs.Panel>
  );
}
