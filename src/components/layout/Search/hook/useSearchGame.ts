import { useEffect, useState } from "react";

const tryData = [
  { id: 1, name: "Game 1" },
  { id: 2, name: "Game 2" },
  { id: 3, name: "Game 3" },
];

export const useSearchGame = (query: string, delay: number = 500) => {
  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      setError(null);

      setResult(tryData);
      setLoading(false);
    };

    if (query.length > 0) {
        console.log(query)
      fetchResult();
    }
  }, [query]);

  return { result, loading, error };
};
