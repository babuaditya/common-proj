import { useState, useMemo } from "react";
import { IDLE, defaultApiStatuses } from "../../constant/api-status";

/**
 * Capitalizes the first character of a string.
 * @param s - The input string.
 * @returns The capitalized string.
 */
const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Builds a status object with boolean flags for each API status.
 * @param currentStatus - The current API status.
 * @returns An object with keys like `isIdle`, `isLoading`, etc., based on the current status.
 */
const prepareStatuses = (currentStatus: string): Record<string, boolean> => {
  const statuses: Record<string, boolean> = {};
  for (const status of defaultApiStatuses) {
    const normalisedStatus = capitalize(status.toLowerCase());
    const normalisedStatusKey = `is${normalisedStatus}`;
    statuses[normalisedStatusKey] = status === currentStatus;
  }
  return statuses;
};

/**
 * Custom hook to manage API status.
 *
 * @param currentStatus - Optional initial status, defaults to `IDLE`.
 * @returns An object containing the current status, a setter function, and boolean flags
 * like `isIdle`, `isLoading`, etc., indicating the current status.
 */
export const useApiStatus = (currentStatus: string = IDLE): {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  [key: `is${string}`]: boolean | string | React.Dispatch<React.SetStateAction<string>>;
} => {
  const [status, setStatus] = useState<string>(currentStatus);
  const statuses = useMemo(() => prepareStatuses(status), [status]);

  return {
    status,
    setStatus,
    ...statuses,
  };
};
