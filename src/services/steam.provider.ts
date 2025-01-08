import axios from "axios";

export interface OpenIdParams {
  [key: string]: string;
}

const loginUrlParams = {
  "openid.ns": "http://specs.openid.net/auth/2.0",
  "openid.mode": "checkid_setup",
  "openid.return_to": "http://localhost:5173/",
  "openid.realm": `${window.location.protocol}//${window.location.host}`,
  "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
  "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
};

export function handleSteamAuth() {
  const steamLoginUrl = `https://steamcommunity.com/openid/login?${new URLSearchParams(
    loginUrlParams
  ).toString()}`;

  window.location.href = steamLoginUrl;
}

export async function handleSteamValidation(
  searchParams: URLSearchParams
): Promise<any> {
  const paramsObject: OpenIdParams = {};
  console.log(searchParams.get("openid_assoc_handle"));

  // Extract specific parameters
  paramsObject["openid.assoc_handle"] =
    searchParams.get("openid_assoc_handle") || "";
  paramsObject["openid.signed"] = searchParams.get("openid_signed") || "";
  paramsObject["openid.sig"] = searchParams.get("openid_sig") || "";
  paramsObject["openid.ns"] = "http://specs.openid.net/auth/2.0";
  paramsObject["openid.mode"] = "check_authentication";

  // Process the signed items
  const signedItems = (paramsObject["openid.signed"] || "").split(",");

  signedItems.forEach((item) => {
    const valueKey = `openid_${item.replace(".", "_")}`;
    const value = searchParams.get(valueKey) || "";
    paramsObject[`openid.${item}`] = value;
  });

  console.log("Constructed OpenID Parameters:", paramsObject);

  // Convert the params to URLSearchParams (equivalent to PHP's http_build_query)
  const data = new URLSearchParams(paramsObject).toString();

  try {
    // Send the POST request using Axios
    const response = await axios.post(
      "https://steamcommunity.com/openid/login",
      data, // Send the query string data
      {
        headers: {
          "Accept-Language": "en",
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    console.log("Steam Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error during OpenID validation:", error);
    throw error;
  }
}

export const apiSteam = axios.create({ baseURL: "" });
