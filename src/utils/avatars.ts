import m1 from '@/assets/avatars/male-1.png';
import m2 from '@/assets/avatars/male-2.png';
import m3 from '@/assets/avatars/male-3.png';
import m4 from '@/assets/avatars/male-4.png';
import m5 from '@/assets/avatars/male-5.png';
import f1 from '@/assets/avatars/female-1.png';
import f2 from '@/assets/avatars/female-2.png';
import f3 from '@/assets/avatars/female-3.png';
import f4 from '@/assets/avatars/female-4.png';
import f5 from '@/assets/avatars/female-5.png';
import defaultUserImg from '@/assets/avatars/default-avatar.png';

export const AVATARS: Record<string, string> = {
  'default-avatar.png': defaultUserImg,
  'male-1.png': m1,
  'male-2.png': m2,
  'male-3.png': m3,
  'male-4.png': m4,
  'male-5.png': m5,
  'female-1.png': f1,
  'female-2.png': f2,
  'female-3.png': f3,
  'female-4.png': f4,
  'female-5.png': f5,
};

export const ALL_AVATARS = Object.values(AVATARS);

export const getRandomAvatar = (): string => {
  const index = Math.floor(Math.random() * ALL_AVATARS.length);
  return ALL_AVATARS[index];
};

export const getAvatarById = (id: string | number) => {
  const index = Number(id) % ALL_AVATARS.length;
  return ALL_AVATARS[index];
};

export const getDefaultAvatar = () => defaultUserImg;
