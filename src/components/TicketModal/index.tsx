import { Button, Group, NumberInput, Select, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { TicketType } from '@/types/Ticket';

export default function TicketModal(props: TicketType) {
  const { title, description, ac, assignee, duration, priority, userStory } = props;

  const form = useForm({
    initialValues: {
      title,
      description,
      userStory,
      ac,
      assignee,
      duration,
      priority,
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => console.log(values))}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
    >
      <TextInput label="Title" {...form.getInputProps('title')} />
      <Textarea autosize label="Description" {...form.getInputProps('description')} />
      <Textarea autosize label="User Story" {...form.getInputProps('userStory')} />
      <Textarea autosize label="Acceptance Criteria" {...form.getInputProps('ac')} />
      <TextInput label="Assignee" {...form.getInputProps('assignee')} />
      <NumberInput min={0} label="Duration Estimate" {...form.getInputProps('duration')} />
      <Select label="Duration Estimate" {...form.getInputProps('priority')} data={['High', 'Medium', 'Low']} />

      <Group justify="flex-end" mt="md">
        <Button type="submit" variant="outline" color="red">
          Delete
        </Button>
        <Button type="submit" variant="outline" color="green">
          Save
        </Button>
        <Button type="submit">Upload to Jira</Button>
      </Group>
    </form>
  );
}
