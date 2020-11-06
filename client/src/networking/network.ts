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
  let uri = `/api/${endpoint}`;
  var options = {
    method: method,
  };

  /* Add the data. If the data is for a delete then modify URI instead of body */
  if (data && method !== "delete") {
    var optionsWithData = { ...options, data: data };
    options = optionsWithData;
  } else if (data && method === "delete") {
    uri = uri + `/${data.id}`;
  }

  /* This is for injecting a base and port. Used for contract testing */
  if (base && port) {
    var optionsWithBaseAndPort = {
      ...options,
      baseURL: `http://${base}:${port}`,
    };
    options = optionsWithBaseAndPort;
  }

  /* This is for adding headers to POSTABLE data */
  if (method === "post" || method == "delete") {
    var optionsWithHeaders = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    options = optionsWithHeaders;
  }

  console.log(options);

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
