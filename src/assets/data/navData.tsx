import {
  IconBrandTrello,
  IconCalendarStats,
  IconChartDots,
  IconFileTextAi,
  IconListDetails,
  IconNotes,
  IconTimelineEventText,
} from '@tabler/icons-react';

export const NAV_ITEMS = [
  // { label: 'Dashboard', icon: IconChartDots, to: '/' },
  { label: 'Meetings', icon: IconCalendarStats, to: '/meetings' },
  // { label: 'Agile Suggestions', icon: IconBulb, to: '/agile' },
  // { label: 'Standups', icon: IconBrowserCheck, to: '/standup' },
  // { label: 'Retrospectives', icon: IconTimelineEventExclamation, to: '/retro' },
];

export const NESTED_NAV_ITEMS = [
  { label: 'Dashboard', icon: IconChartDots, to: '' },
  { label: 'Transcript', icon: IconNotes, to: '' },
  { label: 'Meeting Minutes', icon: IconFileTextAi, to: '' },
  { label: 'Action Items', icon: IconListDetails, to: '' },
  { label: 'Suggested Tickets', icon: IconBrandTrello, to: '' },
  { label: 'Next Agenda', icon: IconTimelineEventText, to: '' },
];
