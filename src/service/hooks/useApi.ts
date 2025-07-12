import { useState } from "react";
import { useApiStatus } from "./useApiStatus";
import { PENDING, SUCCESS, ERROR } from "../../constant/api-status";

/**
 * Configuration for the `useApi` hook.
 */
interface UseApiConfig<T> {
  /** Optional initial data to set before API call */
  initialData?: T;
}

/**
 * Result object returned by the API call.
 */
interface ApiResult<T> {
  data: T | null;
  error: unknown;
}

/**
 * Custom hook to manage API calls with automatic status and error handling.
 *
 * @param fn - The asynchronous function to execute (e.g., API call).
 * @param config - Optional configuration, including initial data.
 * @returns Object containing API data, error, status, exec function, and status flags.
 */
export function useApi<T = any, A extends any[] = any[]>(
  fn: (...args: A) => Promise<T>,
  config: UseApiConfig<T> = {}
) {
  const { initialData } = config;
  const [data, setData] = useState<T | undefined>(initialData);
  const [error, setError] = useState<unknown>();
  const { status, setStatus, ...normalisedStatuses } = useApiStatus();

  const exec = async (...args: A): Promise<ApiResult<T>> => {
    try {
      setStatus(PENDING);
      const result = await fn(...args);
      setData(result);
      setStatus(SUCCESS);
      return {
        data: result,
        error: null,
      };
    } catch (err) {
      setError(err);
      setStatus(ERROR);
      return {
        error: err,
        data: null,
      };
    }
  };

  return {
    data,
    setData,
    status,
    setStatus,
    error,
    exec,
    ...normalisedStatuses,
  };
}
