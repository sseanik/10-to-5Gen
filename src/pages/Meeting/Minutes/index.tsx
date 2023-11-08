import { Blockquote, List, Text } from '@mantine/core';

import data from '@/assets/david/meeting.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Minutes({ id }: { id?: string }) {
  const minuteLines = data.minutes.content.split('\n');

  return minuteLines.map((line, index) => {
    if (!line.includes('\n') && line.includes(':') && !line.includes('[Insert')) {
      return (
        <Blockquote key={index} color="blue" p="sm" my="xs" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
          {line}
        </Blockquote>
      );
    }
    if (/^-/.test(line)) {
      return (
        <List key={index}>
          <List.Item>{line.replace(/^-/, '')}</List.Item>
        </List>
      );
    }
    return <Text key={index}>{line}</Text>;
  });
}
