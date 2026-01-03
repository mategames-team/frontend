import { addUserGame } from '@/api/user-games';
import { useState } from 'react';

export const useUpdateGameStatus = (
  gameApiId: number,
  onStatusChange?: () => void
) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStatus = async (newStatus: string, currentStatus?: string) => {
    if (newStatus === currentStatus) return;

    setIsUpdating(true);
    try {
      await addUserGame(gameApiId, newStatus);

      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateStatus, isUpdating };
};
