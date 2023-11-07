import { Paper, Table } from '@mantine/core';

import AvatarGroup from '../AvatarGroup';

const MEETING_DATA = [
  {
    title: 'VAS Experience Standup',
    type: 'Standup',
    date: '07/11/2023',
    time: '2:15 PM',
    duration: '30 Minutes',
    attendees: <AvatarGroup names={['Sean', 'David', 'Jason', 'Steven', 'Chris']} plusNumber={1} />,
  },
  {
    title: 'VAS Sprint Planning',
    type: 'Sprint Planning',
    date: '15/11/2023',
    time: '3:00 PM',
    duration: '1 Hour',
    attendees: <AvatarGroup names={['Shaun', 'Daniel', 'Jack', 'Simon', 'Craig']} plusNumber={3} />,
  },
  {
    title: 'Marketing Campaign Review',
    type: 'Review',
    date: '20/11/2023',
    time: '10:30 AM',
    duration: '45 Minutes',
    attendees: <AvatarGroup names={['Emily', 'Sarah', 'Michael', 'Rachel']} plusNumber={2} />,
  },
  {
    title: 'Product Development Meeting',
    type: 'Development',
    date: '25/11/2023',
    time: '11:00 AM',
    duration: '1 Hour 30 Minutes',
    attendees: <AvatarGroup names={['John', 'Emma', 'Liam', 'Olivia']} plusNumber={1} />,
  },
  {
    title: 'Finance Quarterly Review',
    type: 'Review',
    date: '02/12/2023',
    time: '4:00 PM',
    duration: '1 Hour',
    attendees: <AvatarGroup names={['Sophia', 'Noah', 'Ava', 'William', 'Ella']} plusNumber={4} />,
  },
];

export default function MeetingTable() {
  const rows = MEETING_DATA.map((meeting) => (
    <Table.Tr key={meeting.title}>
      <Table.Td>{meeting.title}</Table.Td>
      <Table.Td>{meeting.type}</Table.Td>
      <Table.Td>{meeting.date}</Table.Td>
      <Table.Td>{meeting.time}</Table.Td>
      <Table.Td>{meeting.duration}</Table.Td>
      <Table.Td>{meeting.attendees}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper shadow="xs" radius="lg" p="md" mt="md">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Meeting Title</Table.Th>
            <Table.Th>Meeting Type</Table.Th>
            <Table.Th>Meeting Date</Table.Th>
            <Table.Th>Meeting Time</Table.Th>
            <Table.Th>Meeting Duration</Table.Th>
            <Table.Th>Meeting Attendees</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
}
