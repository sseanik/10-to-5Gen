import { ActionIcon, Paper, Text, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch, IconX } from '@tabler/icons-react';
import sortBy from 'lodash/sortBy';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { URL_CONFIG } from '@/assets/config';
import mockData from '@/assets/david/master_list.json';
import AvatarGroup from '@/components/AvatarGroup';
import { Meta } from '@/types/Data';

interface MetaParsed extends Omit<Meta, 'attendees'> {
  attendees: JSX.Element;
}

export default function MeetingTable({
  setProgress,
  mock,
}: {
  setProgress: Dispatch<SetStateAction<boolean>>;
  mock?: boolean;
}) {
  // Navigating to meeting
  const navigate = useNavigate();

  // Fetching the data
  const getMeetings = async () => {
    const res = await fetch(`${URL_CONFIG}/masterlist`);
    return res.json();
  };
  // Using the hook
  const { data, isLoading } = useQuery({ queryKey: ['meetings'], queryFn: getMeetings, retry: 1 });

  useEffect(() => {
    setProgress(isLoading);
  }, [isLoading, setProgress]);

  const dataSource = mock ? mockData : !data ? mockData : (data.data as Meta[]);

  // Parsing the Data
  const mappedRows: MetaParsed[] = useMemo(
    () =>
      dataSource.map((row, index) => ({
        key: `${row.ID}-${index}`,
        ...row,
        duration: `${row.duration.split(':')[0].replace('minutes', '')} minutes`,
        attendees: <AvatarGroup key={index} names={row.attendees} />,
      })),
    [dataSource],
  );

  // Sorting
  const [meetings, setMeetings] = useState<MetaParsed[]>(sortBy(mappedRows));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<MetaParsed>>({
    columnAccessor: 'title',
    direction: 'asc',
  });

  useEffect(() => {
    const newData = sortBy(mappedRows, sortStatus.columnAccessor);
    setMeetings(sortStatus.direction === 'desc' ? newData.reverse() : newData);
  }, [mappedRows, sortStatus.columnAccessor, sortStatus.direction]);

  // Searching
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    setMeetings(
      mappedRows.filter(({ title }: { title: string }) => {
        if (!debouncedQuery) return true;
        return title.toLowerCase().includes(debouncedQuery.trim().toLowerCase());
      }),
    );
  }, [debouncedQuery, mappedRows]);

  return (
    <Paper shadow="xs" radius="lg" p="md" mt="md" pr="md" mr="sm">
      {!data && (
        <Text mb="xs" c="red.8" size="sm">
          Using Mock Data
        </Text>
      )}
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
        columns={['title', 'type', 'date', 'duration', 'attendees'].map((key) => ({
          key,
          accessor: key,
          sortable: true,
        }))} // Header Data
        records={meetings} // Content Data
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        onRowClick={({ record }) => {
          navigate(`${mock ? '/mock' : ''}/meeting/${record.ID}`);
        }}
      />
    </Paper>
  );
}
