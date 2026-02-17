import { useSearchParams } from "react-router";

export const useProductsFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const productibleOnly = searchParams.get("productibleOnly") === "true";

  const handleToogleProductibleOnly = (
    e: React.ChangeEvent<HTMLInputElement, Element>,
  ) => {
    if (e.target.checked) {
      searchParams.set("productibleOnly", "true");
    } else {
      searchParams.delete("productibleOnly");
    }

    setSearchParams(searchParams);
  };

  return { handleToogleProductibleOnly, productibleOnly };
};
