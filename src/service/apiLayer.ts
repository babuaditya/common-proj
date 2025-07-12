import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CancelTokenSource,
  type Method,
} from 'axios';

/**
 * Base URL configuration depending on the environment
 */
const axiosParams = {
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/',
};

/**
 * Axios instance configured with base parameters
 */
const axiosInstance: AxiosInstance = axios.create(axiosParams);

/**
 * Checks if the given error was caused by request cancellation
 * @param error - Error object
 * @returns A truthy object with `aborted: true` if request was cancelled, otherwise false
 */
export const didAbort = (error: Error): { aborted: true } | false =>
  axios.isCancel(error) && { aborted: true };

/**
 * Returns a new cancel token source for request cancellation
 * @returns A CancelTokenSource object
 */
const getCancelSource = (): CancelTokenSource => axios.CancelToken.source();

/**
 * Checks if the error is an Axios error
 * @param error - Error object
 * @returns True if the error is an AxiosError
 */
export const isApiError = (error: Error): error is AxiosError =>
  axios.isAxiosError(error);

/**
 * Enhances a request function to support aborting via cancel tokens
 * @param fn - The Axios method (get, post, etc.)
 * @returns A function that accepts the same arguments with support for `abort(cancelFn)` in config
 */
const withAbort =
  <T>(fn: (...args: any[]) => Promise<AxiosResponse<T>>) =>
  async (...args: any[]): Promise<AxiosResponse<T>> => {
    const originalConfig: AxiosRequestConfig & { abort?: (cancel: () => void) => void } =
      args[args.length - 1];
    const { abort, ...config } = originalConfig;

    if (typeof abort === 'function') {
      const { cancel, token } = getCancelSource();
      config.cancelToken = token;
      abort(cancel);
    }

    try {
      if (args.length > 2) {
        const [url, body] = args;
        return await fn(url, body, config);
      } else {
        const [url] = args;
        return await fn(url, config);
      }
    } catch (error: any) {
      if (didAbort(error)) {
        (error as any).aborted = true;
      }
      throw error;
    }
  };

/**
 * Logs the error if debugging is enabled via env variable
 * @param promise - Axios promise
 * @returns The same promise with enhanced error logging
 */
const withLogger = async <T>(promise: Promise<AxiosResponse<T>>): Promise<AxiosResponse<T>> => {
  try {
    return await promise;
  } catch (error: any) {
    if (!process.env.REACT_APP_DEBUG_API) throw error;

    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('API Error Response:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Axios error:', error.message);
      }
      console.error('Request config:', error.config);
    } else {
      console.error('Unknown error:', error);
    }

    throw error;
  }
};

/**
 * Wrapper around axios methods with cancellation and logging support
 * @param axios - Axios instance
 * @returns An object with API methods (`get`, `post`, `put`, `patch`, `delete`)
 */
const api = (axios: AxiosInstance) => {
  return {
    /**
     * GET request
     */
    get: <T = any>(url: string, config: AxiosRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.get)(url, config)),

    /**
     * DELETE request
     */
    delete: <T = any>(url: string, config: AxiosRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.delete)(url, config)),

    /**
     * POST request
     */
    post: <T = any>(url: string, body: any, config: AxiosRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.post)(url, body, config)),

    /**
     * PATCH request
     */
    patch: <T = any>(url: string, body: any, config: AxiosRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.patch)(url, body, config)),

    /**
     * PUT request
     */
    put: <T = any>(url: string, body: any, config: AxiosRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.put)(url, body, config)),
  };
};

/**
 * Default API instance to be used throughout the app
 */
export default api(axiosInstance);
