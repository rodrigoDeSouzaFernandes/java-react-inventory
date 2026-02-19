import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useProductsList } from "./useProductsList";
import { getProducts } from "../api/product.queries";

vi.mock("../api/product.queries", () => ({
  getProducts: vi.fn(),
}));

const mockedGetProducts = vi.mocked(getProducts);

const createWrapper = () => {
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

describe("useProductsList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch products with productibleOnly false by default", async () => {
    const mockProducts = [
      { id: 1, name: "Product 1", value: 100, productibleQuantity: 50 },
      { id: 2, name: "Product 2", value: 200, productibleQuantity: 30 },
    ];

    mockedGetProducts.mockResolvedValue(mockProducts);

    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useProductsList(false), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedGetProducts).toHaveBeenCalledTimes(1);
    expect(mockedGetProducts).toHaveBeenCalledWith(false);
    expect(result.current.data).toEqual(mockProducts);
  });

  it("should fetch products with productibleOnly true", async () => {
    const mockProducts = [
      { id: 1, name: "Product 1", value: 100, productibleQuantity: 50 },
    ];

    mockedGetProducts.mockResolvedValue(mockProducts);

    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useProductsList(true), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedGetProducts).toHaveBeenCalledTimes(1);
    expect(mockedGetProducts).toHaveBeenCalledWith(true);
    expect(result.current.data).toEqual(mockProducts);
  });

  it("should handle errors when fetching products fails", async () => {
    const error = new Error("Failed to fetch products");
    mockedGetProducts.mockRejectedValue(error);

    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useProductsList(false), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(error);
  });

  it("should have correct query key based on productibleOnly parameter", async () => {
    mockedGetProducts.mockResolvedValue([]);

    const { wrapper, queryClient } = createWrapper();

    renderHook(() => useProductsList(true), { wrapper });

    await waitFor(() => expect(mockedGetProducts).toHaveBeenCalled());

    const cache = queryClient.getQueryCache();
    const queries = cache.getAll();
    
    expect(queries.some((q) => 
      Array.isArray(q.queryKey) && 
      q.queryKey.includes("products") && 
      q.queryKey.includes(true)
    )).toBe(true);
  });
});
