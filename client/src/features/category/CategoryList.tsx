import React, { useEffect, useState } from "react";
import { makeRequest } from "../../networking/network";
import { Category } from "./category";

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const onReceive = makeRequest({
      endpoint: "categories",
      method: "get",
    }).onReceive;

    onReceive.then((results) => {
      setCategories(results.data);
    });
  }, []);

  return <h1>Hi</h1>;
};
