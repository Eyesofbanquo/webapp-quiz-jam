import { makeRequest } from "../networking/network";

export interface Deletable {
  id: string;
}

export async function deleteRequest<T extends Deletable>(props: {
  items: T[];
  selectedItem: T;
  endpoint: "multiple" | "categories" | "questions";
}) {
  const { items, selectedItem, endpoint } = props;

  let filteredItems: T[] = [];
  await makeRequest({
    endpoint: endpoint,
    method: "delete",
    data: {
      id: selectedItem.id,
    },
  }).onReceive.then((response) => {
    console.log(response.data);
    if (response.data.success) {
      console.log(items, selectedItem.id);
      filteredItems = items.filter(
        (savedItem) => savedItem.id !== selectedItem.id
      );
    }
  });
  return {
    filteredItems: filteredItems,
  };
}
