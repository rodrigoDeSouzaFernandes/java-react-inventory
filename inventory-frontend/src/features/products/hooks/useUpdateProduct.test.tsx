import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { useUpdateProduct } from "./useUpdateProduct";
import { updateProduct } from "../api/product.mutations";
import { enqueueSnackbar } from "notistack";

vi.mock("../api/product.mutations", () => ({
  updateProduct: vi.fn(),
}));

vi.mock("notistack", () => ({
  enqueueSnackbar: vi.fn(),
}));

const mockedUpdateProduct = vi.mocked(updateProduct);
const mockedEnqueueSnackbar = vi.mocked(enqueueSnackbar);

const PRODUCT_ID = 1;
const NOT_FOUND_PRODUCT_ID = 999;

const setupHook = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return { wrapper, invalidateSpy, queryClient };
};

describe("useUpdateProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call API, invalidate products query and show success message", async () => {
    mockedUpdateProduct.mockResolvedValue(undefined);

    const { wrapper, invalidateSpy } = setupHook();

    const { result } = renderHook(() => useUpdateProduct(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        id: PRODUCT_ID,
        name: "Updated Product",
        value: 150,
      });
    });

    expect(mockedUpdateProduct).toHaveBeenCalledTimes(1);
    expect(mockedUpdateProduct).toHaveBeenCalledWith(
      { id: PRODUCT_ID, name: "Updated Product", value: 150 },
      expect.any(Object),
    );

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ["products"],
      exact: false,
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Product updated successfully!",
      { variant: "success" },
    );
  });

  it("should call API with correct id even on error", async () => {
    const apiError = {
      response: {
        data: { message: "Product not found" },
      },
    } as AxiosError;

    mockedUpdateProduct.mockRejectedValue(apiError);

    const { wrapper } = setupHook();

    const { result } = renderHook(() => useUpdateProduct(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({
          id: NOT_FOUND_PRODUCT_ID,
          name: "Non-existent",
        });
      } catch {}
    });

    expect(mockedUpdateProduct).toHaveBeenCalledWith({
      id: NOT_FOUND_PRODUCT_ID,
      name: "Non-existent",
    },
  expect.any(Object)
);
    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith("Product not found", {
      variant: "error",
    });
  });

  it("should show fallback error message if API response is missing", async () => {
    const apiError = {
      message: "Network error",
    } as unknown as AxiosError;

    mockedUpdateProduct.mockRejectedValue(apiError);

    const { wrapper } = setupHook();

    const { result } = renderHook(() => useUpdateProduct(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({ id: PRODUCT_ID });
      } catch {}
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Failed to save changes",
      { variant: "error" },
    );
  });

  it("should show fallback error message if error has no response data", async () => {
    const apiError = {} as AxiosError;

    mockedUpdateProduct.mockRejectedValue(apiError);

    const { wrapper } = setupHook();

    const { result } = renderHook(() => useUpdateProduct(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({ id: PRODUCT_ID });
      } catch {}
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Failed to save changes",
      { variant: "error" },
    );
  });
});
