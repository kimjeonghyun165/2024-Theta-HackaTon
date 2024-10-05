import { z } from "zod";

export const fetchFromApi = async (
  URL: string,
  endpoint: string,
  payload: Record<string, any> = {},
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH" = "POST",
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
    body: method !== "GET" ? JSON.stringify(payload) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to fetch from ${endpoint}`);
  }

  return response.json();
};

export const createPasswordSchema = () => {
  return z
    .object({
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
          {
            message:
              "Password must contain at least 8 characters, including upper/lower case letters, a number, and a special character.",
          }
        ),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
};

export const getErrorMessage = (error: Error): string => {
  if (!error) {
    return "An unexpected error occurred.";
  }

  let errorMessage = error.message;

  try {
    const parsedError = JSON.parse(errorMessage);

    if (parsedError && typeof parsedError === "object") {
      const { statusCode, message } = parsedError;

      switch (statusCode) {
        case 400:
          return "Bad request. Please check the information you provided.";
        case 401:
          return "Authentication failed. Please log in again.";
        case 403:
          return "You do not have permission to perform this action.";
        case 404:
          return "The requested resource was not found.";
        case 500:
          return "Internal server error. Please try again later.";
        default:
          return message || "An unexpected error occurred. Please try again.";
      }
    }
  } catch (e) {
    return errorMessage;
  }

  return errorMessage;
};
