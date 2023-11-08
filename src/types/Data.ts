export interface Meta {
  ID: number;
  title: string;
  type: string;
  date: string;
  duration: string;
  attendees: string[];
}

export interface Minutes {
  date: string;
  time: string;
  location: string;
  attendees: string[];
  agenda: string[];
  summary: string[];
  actionItems: string[];
  adjourned: string;
}

export interface Agenda {
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  items: {
    item: string;
    detail: string[];
  }[];
}

export interface JiraTicketType {
  title: string;
  description: string;
  assignee: string;
  acceptanceCriteria: string;
  estimate: string;
  priority: string;
  userStory: string;
}

export interface DataType {
  Meta: Meta;
  Meeting: {
    minutes: {
      minutes: Minutes;
    };
    action_items: Record<string, string[]>;
    next_agenda: {
      agenda: Agenda;
    };
  };
  Jira: {
    jira_tickets: JiraTicketType[];
  };
  Retro: {
    retro_actions: string[];
  };
  transcript: string;
}
