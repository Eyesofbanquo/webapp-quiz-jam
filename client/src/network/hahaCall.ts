import { useEffect, useState } from "react";

type Response = {
  haha: string;
};

export const HahaCall = () => {
  const [data, setData] = useState<Response>();

  const retrieveData = async () => {
    const response = await fetch("/api/welcome");
    const json = (await response.json()) as Response[];

    console.log(json);
    return json[0];
  };

  useEffect(() => {
    retrieveData()
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    hahaData: data,
  };
};
