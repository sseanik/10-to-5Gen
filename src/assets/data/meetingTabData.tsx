import { IconCalendarPlus, IconFileDescription, IconListCheck, IconNotes, IconUsersGroup } from '@tabler/icons-react';

export const MEETING_TAB_ITEMS = [
  { label: 'Summary', value: 'summary', icon: IconUsersGroup, badge: false },
  { label: 'Transcript', value: 'transcript', icon: IconFileDescription, badge: false },
  { label: 'Minutes', value: 'minutes', icon: IconNotes, badge: true },
  { label: 'Next Agenda', value: 'agenda', icon: IconListCheck, badge: true },
  { label: 'Schedule', value: 'schedule', icon: IconCalendarPlus, badge: true },
];
