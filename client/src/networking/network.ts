import axios, { AxiosRequestConfig } from "axios";

interface RequestOptions {
  endpoint: "multiple";
  method: "get" | "post" | "delete" | "put";
  data: any;
}

export const makeRequest = (props: RequestOptions) => {
  const { endpoint, method, data } = props;
  const uri = `/api/${endpoint}`;
  const request = axios(uri, {
    method: method,
    data: data,
  });

  return {
    onReceive: request,
  };
};
