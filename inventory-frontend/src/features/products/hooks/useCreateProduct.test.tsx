import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { useCreateProduct } from "./useCreateProduct";
import { createProduct } from "../api/product.mutations";
import { enqueueSnackbar } from "notistack";
import type { ProductCreateDTO } from "../types";

vi.mock("../api/product.mutations", () => ({
  createProduct: vi.fn(),
}));

vi.mock("notistack", () => ({
  enqueueSnackbar: vi.fn(),
}));

const mockedCreateProduct = vi.mocked(createProduct);
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

describe("useCreateProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call API, invalidate products query and show success message", async () => {
    const mockData: ProductCreateDTO = {
      name: "Test Product",
      value: 100,
    };

    mockedCreateProduct.mockResolvedValue({
      id: 1,
      ...mockData,
      productibleQuantity: 0,
    });

    const { wrapper, invalidateSpy } = createWrapper();

    const { result } = renderHook(() => useCreateProduct(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(mockData);
    });

    expect(mockedCreateProduct).toHaveBeenCalledTimes(1);
    expect(mockedCreateProduct.mock.calls[0][0]).toEqual(mockData);

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ["products"],
      exact: false,
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Product created successfully!",
      { variant: "success" },
    );
  });

  it("should show API error message if provided", async () => {
    const apiError = {
      response: {
        data: { message: "Product already exists" },
      },
    } as AxiosError;

    mockedCreateProduct.mockRejectedValue(apiError);

    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useCreateProduct(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({
          name: "Duplicate",
          value: 50,
        });
      } catch {}
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Product already exists",
      { variant: "error" },
    );
  });

  it("should show fallback error message if API message is missing", async () => {
    const apiError = {} as AxiosError;

    mockedCreateProduct.mockRejectedValue(apiError);

    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useCreateProduct(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({
          name: "Error Product",
          value: 20,
        });
      } catch {}
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Failed to create product",
      { variant: "error" },
    );
  });
});
