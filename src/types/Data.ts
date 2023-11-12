export interface Summary {
  title: string;
  type: string;
  time: string;
  date: string;
  attendees: string[];
  duration: number;
  id?: string;
}

export interface Minutes {
  agenda: string[];
  summaryPoints: string[];
  attendeeSummary: Array<{ name: string; summary: string }>;
  aiGenerated: boolean;
  overallSummary: string;
}

export interface Agenda {
  agendaItems: Array<{
    title: string;
    agendaItems: string[];
  }>;
  aiGenerated: boolean;
  proposedSchedule: {
    attendees: string[];
    date: string;
  };
}

export interface Tickets {
  aiGenerated: boolean;
  tickets: Ticket[];
}

export interface Ticket {
  acceptanceCriteria: string[];
  assignee: string;
  description: string;
  estimate: number;
  priority: string;
  storyPoints: number;
  title: string;
  userStory: string;
}

export interface Action {
  aiGenerated: boolean;
  actionItems: Array<{ actions: string[]; assignee: string }>;
}

export interface NLPData {
  namedEntities: Array<{ count: number; text: string; type: string }>;
  wordFreq: Record<string, number>;
  topics: string[];
  sentences: string[];
  commonTopics: Record<string, number>;
  sentiment: number;
  questions: string[];
  summary: string;
}

export interface MockAllData {
  transcript: string;
  attendeeSummary: Array<{ name: string; summary: string }>;
  overallSummary: string;
  summaryPoints: string[];
  agenda: string[];
  actionItems: Array<{ actions: string[]; assignee: string }>;
  summaries: Summary;
  tickets: Ticket[];
  agendaItems: Array<{ agendaItems: string[]; title: string }>;
  proposedSchedule: {
    attendees: string[];
    date: string;
  };
}
