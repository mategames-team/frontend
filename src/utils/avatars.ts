// src/constants/avatars.ts

import m1 from '@/assets/avatars-male/male-1.png';
import m2 from '@/assets/avatars-male/male-2.png';
import m3 from '@/assets/avatars-male/male-3.png';
import m4 from '@/assets/avatars-male/male-4.png';
import m5 from '@/assets/avatars-male/male-5.png';
import f1 from '@/assets/avatars-female/female-1.png';
import f2 from '@/assets/avatars-female/female-2.png';
import f3 from '@/assets/avatars-female/female-3.png';
import f4 from '@/assets/avatars-female/female-4.png';
import f5 from '@/assets/avatars-female/female-5.png';

export const ALL_AVATARS = [m1, m2, m3, m4, m5, f1, f2, f3, f4, f5];

export const getRandomAvatar = (): string => {
  const index = Math.floor(Math.random() * ALL_AVATARS.length);
  return ALL_AVATARS[index];
};
