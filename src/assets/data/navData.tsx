import {
  IconBrandTrello,
  IconCalendarStats,
  IconFileTextAi,
  IconListDetails,
  IconNotes,
  IconTimelineEventText,
  IconUsersGroup,
} from '@tabler/icons-react';

export const NAV_ITEMS = [
  { label: 'Meetings', icon: IconCalendarStats, to: '/meetings' },
  { label: 'About', icon: IconUsersGroup, to: '/about' },
  // { label: 'Dashboard', icon: IconChartDots, to: 'dashboard' },
  // { label: 'Agile Suggestions', icon: IconBulb, to: '/agile' },
  // { label: 'Standups', icon: IconBrowserCheck, to: '/standup' },
  // { label: 'Retrospectives', icon: IconTimelineEventExclamation, to: '/retro' },
];

export const NESTED_NAV_ITEMS = [
  { label: 'Transcript', icon: IconNotes, to: '/transcript' },
  { label: 'Meeting Minutes', icon: IconFileTextAi, to: '/minutes' },
  {
    label: 'Action Items',
    icon: IconListDetails,
    to: '/actions',
    children: [],
  },
  { label: 'Suggested Tickets', icon: IconBrandTrello, to: '/tickets' },
  { label: 'Next Agenda', icon: IconTimelineEventText, to: '/agendas' },
];
