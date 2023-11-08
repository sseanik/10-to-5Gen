import { Blockquote, List, Text } from '@mantine/core';

import data from '@/assets/david/meeting.json';

export default function Minutes({ id }: { id?: string }) {
  const minuteLines = data.minutes.content.split('\n');

  return minuteLines.map((line) => {
    if (!line.includes('\n') && line.includes(':') && !line.includes('[Insert')) {
      return (
        <Blockquote color="blue" p="sm" my="xs" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
          {line}
        </Blockquote>
      );
    }
    if (/^-/.test(line)) {
      return (
        <List>
          <List.Item>{line.replace(/^-/, '')}</List.Item>
        </List>
      );
    }
    return <Text>{line}</Text>;
  });
}
