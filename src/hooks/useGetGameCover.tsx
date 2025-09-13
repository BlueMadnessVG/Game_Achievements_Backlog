import { useEffect, useState } from "react";
import { fetchGames } from "../services";

interface Params {
  data: any;
  loading: boolean;
  error: undefined | string;
}

export const useGetGameCover = (fetchParams: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<undefined | string>(undefined);

  useEffect(() => {
    setLoading(true);
    let controller = new AbortController();

    const fetchUserGames = async () => {
      try {
        const games = await fetchGames(fetchParams);
        console.log(games);
        setData(games);
      } catch (err) {
        setError("Failed to fetch games");
      } finally {
        setLoading(false);
      }
    };
    fetchUserGames();

    return () => {
      controller?.abort();
    }
  }, []);

  return { data, loading, error } as Params;
};
