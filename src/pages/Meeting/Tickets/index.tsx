import { Flex, Title } from '@mantine/core';

import TicketCard from '@/components/TicketCard';
import { DataType } from '@/types/Data';

export default function Tickets({ data }: { data: DataType }) {
  const tickets = data.Jira.jira_tickets;
  return (
    <>
      <Title order={4} mb="lg" c="blue">
        Suggested Agile Tickets
      </Title>
      <Flex mih={50} gap="lg" justify="flex-start" align="center" direction="row" wrap="wrap">
        {tickets.map((ticket, index) => (
          <TicketCard key={index} {...ticket} />
        ))}
      </Flex>
    </>
  );
}
