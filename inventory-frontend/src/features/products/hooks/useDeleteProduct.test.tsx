import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { useDeleteProduct } from "./useDeleteProduct";
import { deleteProduct } from "../api/product.mutations";
import { enqueueSnackbar } from "notistack";

vi.mock("../api/product.mutations", () => ({
  deleteProduct: vi.fn(),
}));

vi.mock("notistack", () => ({
  enqueueSnackbar: vi.fn(),
}));

const mockedDeleteProduct = vi.mocked(deleteProduct);
const mockedEnqueueSnackbar = vi.mocked(enqueueSnackbar);

const createWrapper = () => {
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

  return { wrapper, invalidateSpy };
};

describe("useDeleteProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call API, invalidate products query and show success message", async () => {
    mockedDeleteProduct.mockResolvedValue(undefined);

    const { wrapper, invalidateSpy } = createWrapper();

    const { result } = renderHook(() => useDeleteProduct(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(1);
    });

    expect(mockedDeleteProduct).toHaveBeenCalledTimes(1);
    expect(mockedDeleteProduct.mock.calls[0][0]).toEqual(1);

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ["products"],
      exact: false,
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Product deleted successfully!",
      { variant: "success" },
    );
  });

  it("should show API error message if provided", async () => {
    const apiError = {
      response: {
        data: { message: "Product not found" },
      },
    } as AxiosError;

    mockedDeleteProduct.mockRejectedValue(apiError);

    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useDeleteProduct(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync(999);
      } catch {}
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith("Product not found", {
      variant: "error",
    });
  });

  it("should show fallback error message if API message is missing", async () => {
    const apiError = {} as AxiosError;

    mockedDeleteProduct.mockRejectedValue(apiError);

    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useDeleteProduct(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync(1);
      } catch {}
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Failed to delete product",
      { variant: "error" },
    );
  });
});
