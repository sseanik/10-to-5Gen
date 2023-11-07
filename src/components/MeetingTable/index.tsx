import { ActionIcon, Paper, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch, IconX } from '@tabler/icons-react';
import sortBy from 'lodash/sortBy';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MEETINGS } from '@/assets/mock/meetings';

interface MeetingRow {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  duration: string;
  attendees: JSX.Element;
}

export default function MeetingTable() {
  // Sorting
  const [meetings, setMeetings] = useState(sortBy(MEETINGS, 'name'));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<MeetingRow>>({
    columnAccessor: 'name',
    direction: 'asc',
  });

  useEffect(() => {
    const data = sortBy(MEETINGS, sortStatus.columnAccessor);
    setMeetings(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [sortStatus]);

  // Searching
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    setMeetings(
      MEETINGS.filter(({ title }: { title: string }) => {
        if (!debouncedQuery) return true;
        return title.toLowerCase().includes(debouncedQuery.trim().toLowerCase());
      }),
    );
  }, [debouncedQuery]);

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
        columns={Object.keys(MEETINGS[0])
          .slice(1)
          .map((key) => ({
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
