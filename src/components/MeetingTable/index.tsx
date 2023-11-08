import { ActionIcon, Paper, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch, IconX } from '@tabler/icons-react';
import sortBy from 'lodash/sortBy';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MEETINGS } from '@/assets/mock/meetings';
import AvatarGroup from '@/components/AvatarGroup';

interface MeetingRow {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  duration: string;
  attendees: string[];
  plusNumber: number;
}

interface ParsedMeetingRow extends Omit<MeetingRow, 'attendees' | 'plusNumber'> {
  attendees: JSX.Element;
}

export default function MeetingTable() {
  // attendees: <AvatarGroup names={['Sean', 'David', 'Jason', 'Steven', 'Chris']} plusNumber={1} />,

  const parsedMeetings: ParsedMeetingRow[] = useMemo(
    () =>
      MEETINGS.map((meeting: MeetingRow) => ({
        ...meeting,
        attendees: (
          <AvatarGroup names={['Sean', 'David', 'Jason', 'Steven', 'Chris']} plusNumber={meeting.plusNumber} />
        ),
      })),
    [],
  );

  // Sorting
  const [meetings, setMeetings] = useState<ParsedMeetingRow[]>(sortBy(parsedMeetings));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<ParsedMeetingRow>>({
    columnAccessor: 'title',
    direction: 'asc',
  });

  useEffect(() => {
    const data = sortBy(parsedMeetings, sortStatus.columnAccessor);
    setMeetings(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [sortStatus, parsedMeetings]);

  // Searching
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    setMeetings(
      parsedMeetings.filter(({ title }: { title: string }) => {
        if (!debouncedQuery) return true;
        return title.toLowerCase().includes(debouncedQuery.trim().toLowerCase());
      }),
    );
  }, [debouncedQuery, parsedMeetings]);

  // Navigating to meeting
  const navigate = useNavigate();

  return (
    <Paper shadow="xs" radius="lg" p="md" mt="md">
      <TextInput
        placeholder="Search Meetings..."
        leftSection={<IconSearch size={16} />}
        rightSection={
          <ActionIcon size="sm" variant="transparent" c="dimmed" onClick={() => setQuery('')}>
            <IconX size={14} />
          </ActionIcon>
        }
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        mb="md"
      />
      <DataTable
        striped
        highlightOnHover
        columns={['title', 'type', 'date', 'time', 'duration', 'attendees'].map((key) => ({
          accessor: key,
          sortable: true,
        }))} // Header Data
        records={meetings} // Content Data
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        onRowClick={({ record }) => navigate(`/meeting/${record.id}`)}
      />
    </Paper>
  );
}
