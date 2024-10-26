import { BASE_URL, getFromLocalStorage } from "@/utils";
import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosProgressEvent } from "axios";
import { toast } from "sonner";

export const getAccessToken = () => {
  return typeof window !== "undefined"
    ? typeof getFromLocalStorage("ACCESS_TOKEN") === "string"
      ? getFromLocalStorage("ACCESS_TOKEN")!
      : null
    : null;
};

type MutationOptions = {
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  isFormData?: boolean;
  BASE_URL?: string;
  body?: any;
  isAlert?: boolean;
  onProgress?: (progress: number) => void;
  type?: string; // Optional type key
};

const useMutation = () => {
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useCallback(
    async (path: string, options?: MutationOptions) => {
      setIsLoading(true);

      try {
        const token = getAccessToken();
        const url = options?.BASE_URL || BASE_URL;
        const method = options?.method || "POST";
        const body = options?.isFormData
          ? options.body
          : JSON.stringify(options?.body);
        const headers: Record<string, string> = options?.isFormData
          ? {}
          : { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;
        if (options?.type) headers["Type"] = options.type; // Add type header if provided

        const config: AxiosRequestConfig = {
          url: `${url}/${path}`,
          method,
          headers,
          data: body,
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (options?.onProgress && progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              options.onProgress(progress);
            }
          },
        };

        const response = await axios(config);
        const results = response.data;
        const status = response.status;

        if (options?.isAlert) {
          if (results?.success) {
            toast.success(results?.message);
          } else {
            toast.error(results?.error?.message);
          }
        }

        return { results, status };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message || "Something went wrong !!"
          );
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { mutation, isLoading };
};

export default useMutation;
