import axios from "axios";
import { useEffect, useState } from "react";

interface RequestOptions {
  base?: string;
  port?: string;
  endpoint: "multiple" | "categories" | "question-types" | "questions";
  method: "get" | "post" | "delete" | "put";
  data?: any;
}

export const makeRequest = (props: RequestOptions) => {
  const { endpoint, method, data, base, port } = props;
  const uri = `/api/${endpoint}`;
  var options = {
    method: method,
  };
  if (data) {
    var optionsWithData = { ...options, data: data };
    options = optionsWithData;
  }

  if (base && port) {
    var optionsWithBaseAndPort = {
      ...options,
      baseURL: `http://${base}:${port}`,
    };
    options = optionsWithBaseAndPort;
  }

  console.log(options);

  var request = axios(uri, options);
  // var request = axios.request({
  //   url: "/categories",
  //   baseURL: "http://127.0.0.1:4000",
  //   method: "GET",
  //   headers: {
  //     Accept: "application/json; charset=utf-8",
  //     "Content-Type": "application/json; charset=utf-8",
  //   },
  // });

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
