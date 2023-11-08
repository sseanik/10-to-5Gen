import { Flex } from '@mantine/core';

import data from '@/assets/david/agile.json';
import TicketCard from '@/components/TicketCard';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Tickets({ id }: { id?: string }) {
  const tickets = data.jira_tickets;
  return (
    <Flex mih={50} gap="lg" justify="flex-start" align="center" direction="row" wrap="wrap">
      {tickets.map((ticket, index) => (
        <TicketCard
          key={index}
          title={ticket[Object.keys(ticket)[0]]}
          description={ticket['- Description']}
          assignee={ticket['- Assignee']}
          ac={ticket['- Acceptance Criteria']}
          duration={ticket['- Duration Estimate']}
          priority={ticket['- Priority']}
        />
      ))}
    </Flex>
  );
}
