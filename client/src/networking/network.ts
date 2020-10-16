import axios from "axios";
import { useEffect, useState } from "react";

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
export function useMakeRequest<T>(props: RequestOptions) {
  const [request, setRequest] = useState<T>();
  useEffect(() => {
    makeRequest({
      endpoint: props.endpoint,
      method: props.method,
      data: props.data,
    }).onReceive.then((result) => {
      setRequest(result.data);
    });
  }, []);

  return { request, setRequest };
}
