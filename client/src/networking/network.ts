import axios from "axios";
import { useEffect, useState } from "react";

type QuizServiceEndpoints =
  | "multiple"
  | "categories"
  | "question-types"
  | "questions"
  | "difficulty";

type AuthServiceEndpoints = "users" | "login" | "token" | "logout";

type Microservice = "quiz" | "auth";

const baseUri = (service: Microservice) => {
  let uri;
  if (service === "quiz") {
    uri = `/api`;
  }

  if (service === "auth") {
    uri = process.env.REACT_APP_AUTH_SERVICE_URI ?? `/error`;
  }

  if (uri === undefined) {
    return "/error";
  }

  return uri;
};

interface RequestOptions {
  base?: string;
  port?: string;
  service?: "quiz" | "auth";
  endpoint: QuizServiceEndpoints | AuthServiceEndpoints;
  method: "get" | "post" | "delete" | "put";
  data?: any;
}

export const makeRequest = ({
  endpoint,
  method,
  data,
  base,
  port,
  service = "quiz",
}: RequestOptions) => {
  let serviceBaseDomain = baseUri(service);
  let uri = `${serviceBaseDomain}/${endpoint}`;

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

  console.log(uri, options);

  var request = axios(uri, options);

  return {
    onReceive: request,
  };
};
export function useMakeRequest<T>({
  endpoint,
  method,
  data,
  base,
  port,
  service = "quiz",
}: RequestOptions) {
  const [request, setRequest] = useState<T>();
  useEffect(() => {
    makeRequest({
      endpoint: endpoint,
      method: method,
      data: data,
      service: service,
    }).onReceive.then((result) => {
      setRequest(result.data);
    });
  }, []);

  return { request, setRequest };
}
