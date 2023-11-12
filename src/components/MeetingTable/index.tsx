import { ActionIcon, Flex, Group, Loader, Paper, Text, TextInput, Title } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch, IconX } from '@tabler/icons-react';
import sortBy from 'lodash/sortBy';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { URL_CONFIG } from '@/assets/config';
import mockData from '@/assets/mockMeetings.json';
import AvatarGroup from '@/components/AvatarGroup';
import { Summary } from '@/types/Data';

interface SummaryParsed extends Omit<Summary, 'attendees' | 'duration'> {
  attendees: JSX.Element;
  duration: string;
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
    const res = await fetch(`${URL_CONFIG}/meetings`);
    return res.json();
  };
  // Using the hook
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['meetings'],
    queryFn: getMeetings,
    retry: 1,
    enabled: !mock,
  });

  const dataSource: Summary[] = mock ? mockData.meetings : data?.meetings;

  // Parsing the Data
  const mappedRows: SummaryParsed[] = useMemo(
    () =>
      dataSource?.map((row: Summary, index: number) => ({
        key: `${row.id}-${index}`,
        ...row,
        duration: `${row.duration === 0 ? '-' : row.duration}`,
        attendees: <AvatarGroup key={index} names={row.attendees} />,
      })),
    [dataSource],
  );

  // Sorting
  const [meetings, setMeetings] = useState<SummaryParsed[]>(sortBy(mappedRows));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<SummaryParsed>>({
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
      mappedRows?.filter(({ title }: { title: string }) => {
        if (!debouncedQuery) return true;
        return title.toLowerCase().includes(debouncedQuery.trim().toLowerCase());
      }),
    );
  }, [debouncedQuery, mappedRows]);

  useEffect(() => {
    setProgress(isLoading);
  }, [isLoading, setProgress]);

  return (
    <Paper shadow="xs" radius="lg" p="md" mt="md" pr="md" mr="sm">
      <Title order={4} mb="xs" c="blue">
        {mock ? 'Mock' : 'API'} Meetings
      </Title>
      {isLoading && !mock && !isSuccess && (
        <Flex gap="lg">
          <Loader color="red" size="sm" />
          <Text mb="sm" size="sm" c="red">
            Waiting for Backend to load (we have deployed the backend on a free service that shuts down on inactivity).
            Please wait a small moment before the API successfully returns meeting data.
          </Text>
        </Flex>
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
        minHeight={120}
        textSelectionDisabled
        noRecordsText="No meetings to show"
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
          navigate(`${mock ? '/mock' : ''}/transcript/${record.id}`);
        }}
      />
      {mock && (
        <Text size="xs" c="gray.8" mt="xs">
          Mock example meetings if any of the API&apos;s fail
        </Text>
      )}
    </Paper>
  );
}
