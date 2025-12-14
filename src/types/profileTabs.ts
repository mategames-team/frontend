export const PROFILE_TABS = [
  { label: 'Backlog', value: 'backlog' },
  { label: 'In progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Reviews', value: 'reviews' },
] as const;

export type ProfileTab = (typeof PROFILE_TABS)[number]['value'];
