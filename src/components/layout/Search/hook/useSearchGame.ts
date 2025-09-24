import { useEffect, useState } from "react";
import { useDebounce } from "../../../../hooks/useDeobunce";

const tryData = [
    { id: 1, name: "Game 1" },
    { id: 2, name: "Game 2" },
    { id: 3, name: "Game 3" },
];

export const useSearchGame = (query: string, delay: number = 500) => {
    const [result, setResult] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const debounceQuery = useDebounce(query, delay);

    useEffect(() => {
        if (!debounceQuery) {
            setResult([]);
            return;
        }

        const fetchResult = async () => {
            setLoading(true);
            setError(null);

            setResult(tryData);
            setLoading(false);
        }

        fetchResult();
    }, [debounceQuery]);

    return { result, loading, error };
}
