export const PROFILE_TABS = [
  { label: 'Saved', value: 'backlog' },
  { label: 'In progress', value: 'in_progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Reviews', value: 'reviews' },
] as const;

export type ProfileTab = (typeof PROFILE_TABS)[number]['value'];
