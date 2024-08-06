export const fetchFromApi = async (
  URL: string,
  endpoint: string,
  payload: Record<string, any> = {},
  method: "POST" | "GET" | "PUT" | "DELETE" = "POST",
  token?: string | null
) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${URL}/${endpoint}`, {
    method: method,
    headers: headers,
    body: method === "POST" ? JSON.stringify(payload) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to fetch from ${endpoint}`);
  }

  return response.json();
};
