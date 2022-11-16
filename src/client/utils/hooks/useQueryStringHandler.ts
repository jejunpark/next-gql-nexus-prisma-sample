import { useRouter } from "next/router";

interface queryStringItem {
  keyName: string;
  value: string;
}

export default function useQueryString() {
  const router = useRouter();
  const query = router.query;

  function queryStringHandler(list: queryStringItem[]) {
    const newQuery = { ...query };
    list.forEach((item) => {
      newQuery[item.keyName] = item.value;
    });

    router.push({ query: newQuery }, undefined, { scroll: false });
  }

  return {
    queryStringHandler,
  };
}
