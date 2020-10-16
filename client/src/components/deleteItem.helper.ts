import { makeRequest } from "../networking/network";

export interface Deletable {
  id: string;
}

export async function deleteRequest<T extends Deletable>(props: {
  items: T[];
  selectedItem: T;
  endpoint: "multiple" | "categories";
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
    if (response.data.success) {
      filteredItems = items.filter(
        (savedItem) => savedItem.id !== selectedItem.id
      );
    }
  });
  return {
    filteredItems: filteredItems,
  };
}
