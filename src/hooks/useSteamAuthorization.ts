import { useState } from "react"

interface Params {
    data: string | null
}

export const useSteamAuthorization = (): Params => {
    const [data, setData] = useState(null);

/*     useEffect(() => {
        // Parse the query parameters from the URL
        const searchParams = new URLSearchParams(window.location.search);
        async function handleSteam() {
          const result = await handleSteamValidation(searchParams);
          // Store the parameters in state
          console.log(result);
        }
    
        handleSteam();
      }, []);
 */

    return { data }
}