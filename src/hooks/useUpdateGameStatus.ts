import { addUserGame } from '@/api/user-games';
import type { GameStatus } from '@/types/Game';
import { useAppDispatch } from '@/store/hooks';
import { updateGame } from '@/store/slices/userSlice';

export const useUpdateGameStatus = (
  gameApiId: number,
  onStatusChange?: () => void
) => {
  const dispatch = useAppDispatch();

  const updateStatus = async (newStatus: string, currentStatus?: string) => {
    try {
      if (newStatus === currentStatus) {
        // await deleteUserGame(gameApiId);
        // dispatch(deleteGame(gameApiId));

        return;
      } else {
        await addUserGame(gameApiId, newStatus);
        dispatch(
          updateGame({ apiId: gameApiId, status: newStatus as GameStatus })
        );
      }

      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { updateStatus };
};
