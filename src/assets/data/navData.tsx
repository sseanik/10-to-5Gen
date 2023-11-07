import {
  IconBrowserCheck,
  IconBulb,
  IconCalendarStats,
  IconChartDots,
  IconTimelineEventExclamation,
} from '@tabler/icons-react';

export const NAV_ITEMS = [
  { label: 'Dashboard', icon: IconChartDots, to: '/' },
  { label: 'Meetings', icon: IconCalendarStats, to: '/meetings' },
  { label: 'Agile Suggestions', icon: IconBulb, to: '/agile' },
  { label: 'Standups', icon: IconBrowserCheck, to: '/standup' },
  { label: 'Retrospectives', icon: IconTimelineEventExclamation, to: '/retro' },
];
