import {
  IconBrandTrello,
  IconCalendarStats,
  IconChartDots,
  IconFileTextAi,
  IconListDetails,
  IconListNumbers,
  IconNotes,
  IconSubtask,
  IconTimelineEventText,
} from '@tabler/icons-react';

export const NAV_ITEMS = [
  // { label: 'Dashboard', icon: IconChartDots, to: '/' },
  { label: 'Meetings', icon: IconCalendarStats, to: '/meetings', children: [] },
  // { label: 'Agile Suggestions', icon: IconBulb, to: '/agile' },
  // { label: 'Standups', icon: IconBrowserCheck, to: '/standup' },
  // { label: 'Retrospectives', icon: IconTimelineEventExclamation, to: '/retro' },
];

export const NESTED_NAV_ITEMS = [
  { label: 'Dashboard', icon: IconChartDots, to: '', children: [] },
  { label: 'Transcript', icon: IconNotes, to: '', children: [] },
  { label: 'Meeting Minutes', icon: IconFileTextAi, to: '', children: [] },
  {
    label: 'Action Items',
    icon: IconListDetails,
    to: '',
    children: [
      { label: 'Meeting Action Items', icon: IconListNumbers, to: '' },
      { label: 'Retro Action Items', icon: IconSubtask, to: '' },
    ],
  },
  { label: 'Suggested Tickets', icon: IconBrandTrello, to: '', children: [] },
  { label: 'Next Agenda', icon: IconTimelineEventText, to: '', children: [] },
];
