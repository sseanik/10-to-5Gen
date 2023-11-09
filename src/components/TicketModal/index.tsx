import { Button, Group, NumberInput, Select, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Buffer } from 'buffer';

import { JiraTicketType } from '@/types/Data';

const JIRA_TOKEN =
  'ATATT3xFfGF04ApslNZrv629dNcw6DUxBNpV7P-PxAy0BkSdmZwgee0spVitpJRULMX3dYjoU-PHTjT-sS7uiUfRYuWn7hbl-CEHAvGOUPkPc7z6Qe3Ef0dAa5RbvRx932cPGUfynkW6YM8iKeJSamFNTroWw9lv4qIr7d8Zngb8_c1-XWPFMZI=7B899608';
const VARIABLE = `seaniksmith@gmail.com:${JIRA_TOKEN}`;

interface TicketModalProps extends JiraTicketType {
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

  const corsApiUrl = 'https://cors-anywhere.herokuapp.com';
  const handleJiraUpload = () => {
    const bodyData = `{
      "fields": {
        "assignee": {
          "id": "5b109f2e9729b51b54dc274d"
        },
        "components": [
          {
            "id": "10000"
          }
        ],
        "customfield_10000": "09/Jun/19",
        "customfield_20000": "06/Jul/19 3:25 PM",
        "customfield_30000": [
          "10000",
          "10002"
        ],
        "customfield_40000": {
          "content": [
            {
              "content": [
                {
                  "text": "Occurs on all orders",
                  "type": "text"
                }
              ],
              "type": "paragraph"
            }
          ],
          "type": "doc",
          "version": 1
        },
        "customfield_50000": {
          "content": [
            {
              "content": [
                {
                  "text": "Could impact day-to-day work.",
                  "type": "text"
                }
              ],
              "type": "paragraph"
            }
          ],
          "type": "doc",
          "version": 1
        },
        "customfield_60000": "jira-software-users",
        "customfield_70000": [
          "jira-administrators",
          "jira-software-users"
        ],
        "customfield_80000": {
          "value": "red"
        },
        "description": {
          "content": [
            {
              "content": [
                {
                  "text": "Order entry fails when selecting supplier.",
                  "type": "text"
                }
              ],
              "type": "paragraph"
            }
          ],
          "type": "doc",
          "version": 1
        },
        "duedate": "2019-05-11",
        "environment": {
          "content": [
            {
              "content": [
                {
                  "text": "UAT",
                  "type": "text"
                }
              ],
              "type": "paragraph"
            }
          ],
          "type": "doc",
          "version": 1
        },
        "fixVersions": [
          {
            "id": "10001"
          }
        ],
        "issuetype": {
          "id": "10000"
        },
        "labels": [
          "bugfix",
          "blitz_test"
        ],
        "parent": {
          "key": "PROJ-123"
        },
        "priority": {
          "id": "20000"
        },
        "project": {
          "id": "10000"
        },
        "reporter": {
          "id": "5b10a2844c20165700ede21g"
        },
        "security": {
          "id": "10000"
        },
        "summary": "Main order flow broken",
        "timetracking": {
          "originalEstimate": "10",
          "remainingEstimate": "5"
        },
        "versions": [
          {
            "id": "10000"
          }
        ]
      },
      "update": {}
    }`;

    fetch(`${corsApiUrl}/https://10to5gen.atlassian.net/rest/api/3/issue`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          'seaniksmith@gmail.com:ATATT3xFfGF04ApslNZrv629dNcw6DUxBNpV7P-PxAy0BkSdmZwgee0spVitpJRULMX3dYjoU-PHTjT-sS7uiUfRYuWn7hbl-CEHAvGOUPkPc7z6Qe3Ef0dAa5RbvRx932cPGUfynkW6YM8iKeJSamFNTroWw9lv4qIr7d8Zngb8_c1-XWPFMZI=7B899608',
        ).toString('base64')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Atlassian-Token': 'no-check',
      },
      body: bodyData,
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
          Upload to {retro ? 'EasyRetro' : 'Jira'}
        </Button>
      </Group>
    </form>
  );
}
