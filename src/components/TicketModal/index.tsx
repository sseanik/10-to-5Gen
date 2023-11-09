import { Button, Group, NumberInput, Select, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Buffer } from 'buffer';

import { JiraTicketType } from '@/types/Data';

const JIRA_TOKEN =
  'ATATT3xFfGF0s2FgFeUfewFREggwyoYMD2pkKQgNn9NoPsp6-xMZsd_qjiVajffOrumrqynBa6nKpPy_z6e-_SYN-t0uCqHhP9Kt1wGURemNYXZqhfTwcN4yf6TbzoYbyDRmJcZjrc7iZpPbo56kDpUM_-IHG4x9Su8NVkZsxCTLwDZx1EYKzzw=B0E8B4C7';
const VARIABLE = `seaniksmith@gmail.com:${JIRA_TOKEN}`;

export default function TicketModal(props: JiraTicketType) {
  const { acceptanceCriteria, assignee, description, estimate, priority, title, userStory } = props;

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

  const handleJiraUpload = async () => {
    fetch('https://10to5gen.atlassian.net/rest/api/3/events', {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(VARIABLE).toString('base64')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then((text) => console.log(text))
      .catch((err) => console.error(err));
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => console.log(values))}
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
        <Button type="submit" variant="outline" color="red">
          Delete
        </Button>
        <Button type="submit" variant="outline" color="green">
          Save
        </Button>
        <Button type="button" onClick={handleJiraUpload}>
          Upload to Jira
        </Button>
      </Group>
    </form>
  );
}
