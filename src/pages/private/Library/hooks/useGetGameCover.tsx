import { useCallback, useEffect, useState } from "react";
import { fetchGames } from "../../../../services";
import type { GameCardModel } from "../../../../models/GameCard.model";

interface useGetGameCoverParams {
  onSuccess?: (game: GameCardModel[]) => void;
  onError?: (error: unknown) => void;
  enable?: boolean;
  fetchParams: string;
}

interface useGetGameCoverReturn {
  data: GameCardModel[] | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  refetch: () => Promise<void>;
  reset: () => void;
}

export const useGetGameCover = ({
  onSuccess,
  onError,
  enable = true,
  fetchParams,
}: useGetGameCoverParams) => {
  const [state, setState] = useState<{
    data: GameCardModel[] | null;
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
  }>({
    data: null,
    isLoading: false,
    error: null,
    isSuccess: false,
  });

  const reset = useCallback(() => {
    setState({
      data: null,
      isLoading: false,
      error: null,
      isSuccess: false,
    });
  }, []);

  const fetchData = useCallback(async (): Promise<void> => {
    if (!enable) {
      reset();
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const games = await fetchGames(fetchParams);

      setState({
        data: games,
        isLoading: false,
        error: null,
        isSuccess: true,
      });

      onSuccess?.(games);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? `Failed to load games: ${err.message}`
          : "An unexpected error occurred while loading games";

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
        isSuccess: false,
      }));

      onError?.(err);
    }
  }, [fetchParams, enable, reset, onSuccess, onError]);

  const refetch = useCallback(async (): Promise<void> => {
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const executeFetch = async () => {
      if (isMounted) {
        await fetchData();
      }
    };

    if (enable) {
      executeFetch();
    }

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [fetchData, enable]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    isSuccess: state.isSuccess,
    refetch,
    reset,
  } as useGetGameCoverReturn;
};
