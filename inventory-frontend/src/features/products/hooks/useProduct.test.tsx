import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useProduct } from "./useProduct";
import { getProductById } from "../api/product.queries";

vi.mock("../api/product.queries", () => ({
  getProductById: vi.fn(),
}));

const mockedGetProductById = vi.mocked(getProductById);

const PRODUCT_ID = 1;
const NOT_FOUND_PRODUCT_ID = 999;

const setupHook = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return { wrapper, queryClient };
};

describe("useProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch product by id and return data", async () => {
    const mockProduct = {
      id: PRODUCT_ID,
      name: "Test Product",
      value: 100,
      producibleQuantity: 50,
      materials: [
        { id: 1, name: "Material 1", stockQuantity: 100, requiredQuantity: 10 },
      ],
    };

    mockedGetProductById.mockResolvedValue(mockProduct);

    const { wrapper } = setupHook();

    const { result } = renderHook(() => useProduct(PRODUCT_ID), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedGetProductById).toHaveBeenCalledTimes(1);
    expect(mockedGetProductById).toHaveBeenCalledWith(PRODUCT_ID);
    expect(result.current.data).toEqual(mockProduct);
  });

  it("should handle errors when product is not found", async () => {
    const error = new Error("Product not found");
    mockedGetProductById.mockRejectedValue(error);

    const { wrapper } = setupHook();

    const { result } = renderHook(() => useProduct(NOT_FOUND_PRODUCT_ID), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(error);
  });

  it("should have correct query key", async () => {
    mockedGetProductById.mockResolvedValue({
      id: PRODUCT_ID,
      name: "Test Product",
      value: 100,
      producibleQuantity: 50,
      materials: [],
    });

    const { wrapper, queryClient } = setupHook();

    renderHook(() => useProduct(PRODUCT_ID), { wrapper });

    await waitFor(() => expect(mockedGetProductById).toHaveBeenCalled());

    const cache = queryClient.getQueryCache();
    const queries = cache.getAll();
    
    expect(queries.some((q) => 
      Array.isArray(q.queryKey) && 
      q.queryKey.includes("products") && 
      q.queryKey.includes(PRODUCT_ID)
    )).toBe(true);
  });
});
