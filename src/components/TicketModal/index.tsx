import { Button, Group, NumberInput, Select, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { Ticket } from '@/types/Data';

interface TicketModalProps extends Ticket {
  retro?: boolean;
}

export default function TicketModal(props: TicketModalProps) {
  const { acceptanceCriteria, assignee, description, estimate, priority, title, userStory, retro } = props;

  const form = useForm({
    initialValues: {
      title,
      description,
      userStory,
      acceptanceCriteria,
      assignee,
      estimate,
      priority,
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => console.info(values))}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
    >
      <TextInput label="Title" {...form.getInputProps('title')} />
      <Textarea autosize label="Description" {...form.getInputProps('description')} />
      <Textarea autosize label="User Story" {...form.getInputProps('userStory')} />
      <Textarea autosize label="Acceptance Criteria" {...form.getInputProps('acceptanceCriteria')} />
      <TextInput label="Assignee" {...form.getInputProps('assignee')} />
      <NumberInput min={0} label="Duration Estimate" {...form.getInputProps('estimate')} />
      <Select label="Duration Estimate" {...form.getInputProps('priority')} data={['High', 'Medium', 'Low']} />

      <Group justify="flex-end" mt="md">
        <Button
          type="submit"
          variant="outline"
          color="red"
          onClick={() => alert('Not Implemented Yet: REST API Call triggered to delete this item')}
        >
          Delete
        </Button>
        <Button
          type="submit"
          variant="outline"
          color="green"
          onClick={() => alert('Not Implemented Yet: REST API Call triggered to save this item')}
        >
          Save
        </Button>
        <Button
          type="button"
          onClick={() =>
            alert(
              `Not Implemented Yet: REST API Call triggered to ${retro ? 'EasyRetro' : 'Jira'} to create a ${
                retro ? 'action item' : 'ticket'
              }`,
            )
          }
          color={retro ? 'orange' : '#2580f6'}
        >
          Upload to {retro ? 'EasyRetro' : 'Jira'}
        </Button>
      </Group>
    </form>
  );
}
