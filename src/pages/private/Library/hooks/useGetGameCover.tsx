import { useCallback, useEffect, useRef, useState } from "react";
import { gamesServices, steamService } from "../../../../services";
import type { Game } from "../../../../models";

interface useGetGameCoverParams {
  onSuccess?: (game: Game[]) => void;
  onError?: (error: unknown) => void;
  onFinally?: () => void;
  enable?: boolean;
  steamId: string;
}

interface useGetGameCoverReturn {
  data: Game[] | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isEmpty: boolean;
  refetch: () => Promise<void>;
  reset: () => void;
}

export const useGetGameCover = ({
  onSuccess,
  onError,
  onFinally,
  enable = true,
  steamId,
}: useGetGameCoverParams) => {
  const [state, setState] = useState<{
    data: Game[] | null;
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
  }>({
    data: null,
    isLoading: false,
    error: null,
    isSuccess: false,
  });

  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    setState({
      data: null,
      isLoading: false,
      error: null,
      isSuccess: false,
    });
  }, []);

  const fetchData = useCallback(async (): Promise<void> => {
    if (!enable || !steamId) {
      reset();
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      isSuccess: false,
    }));

    try {
      const steamResponse = await steamService.getUserGames(steamId);

      if (!steamResponse.success) {
        throw new Error("Failed to fetch Steam games");
      }
      const steamGames = steamResponse.data.games;

      if (steamGames.length === 0) {
        setState({
          data: [],
          isLoading: false,
          error: null,
          isSuccess: true,
        });
        onSuccess?.([]);
        return;
      }

      if (isMountedRef.current) {
        setState({
          data: steamGames,
          isLoading: false,
          error: null,
          isSuccess: true,
        });

        onSuccess?.(steamGames);
      }
    } catch (err: any) {
      if (!isMountedRef.current || err.name === "AbortError") {
        return;
      }

      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while loading games";

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
        isSuccess: false,
      }));

      onError?.(err);
    } finally {
      if (isMountedRef.current) {
        onFinally?.();
      }
    }
  }, [steamId, enable, reset, onSuccess, onError, onFinally]);

  const refetch = useCallback(async (): Promise<void> => {
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    isMountedRef.current = true;

    const executeFetch = async () => {
      if (isMountedRef.current) {
        await fetchData();
      }
    };

    if (enable && steamId) {
      executeFetch();
    }

    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [enable, steamId]);

  const isEmpty = !state.data || state.data.length === 0;

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    isSuccess: state.isSuccess,
    isEmpty,
    refetch,
    reset,
  } as useGetGameCoverReturn;
};
