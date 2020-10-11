import axios, { AxiosRequestConfig } from "axios";

interface RequestOptions {
  endpoint: "multiple" | "categories";
  method: "get" | "post" | "delete" | "put";
  data?: any;
}

export const makeRequest = (props: RequestOptions) => {
  const { endpoint, method, data } = props;
  const uri = `/api/${endpoint}`;
  var options = {
    method: method,
  };
  if (data) {
    var optionsWithData = { ...options, data: data };
    options = optionsWithData;
  }

  var request = axios(uri, options);

  return {
    onReceive: request,
  };
};
