import { Badge, Card, Group, Text } from '@mantine/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function RetroCard({ index, text }: { index: number; text: string }) {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder my="sm">
      <Group justify="space-between">
        <Text fw={500}>{text}</Text>
        <Badge color="pink" variant="light">
          On Sale
        </Badge>
      </Group>
    </Card>
  );
}
