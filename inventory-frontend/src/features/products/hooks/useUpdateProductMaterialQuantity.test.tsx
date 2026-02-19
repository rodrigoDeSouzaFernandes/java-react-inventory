import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { useUpdateProductMaterialQuantity } from "./useUpdateProductMaterialQuantity";
import { updateProductMaterialQuantity } from "../api/product-material.mutations";
import { enqueueSnackbar } from "notistack";

vi.mock("../api/product-material.mutations", () => ({
  updateProductMaterialQuantity: vi.fn(),
}));

vi.mock("notistack", () => ({
  enqueueSnackbar: vi.fn(),
}));

const mockedUpdateProductMaterialQuantity = vi.mocked(
  updateProductMaterialQuantity,
);
const mockedEnqueueSnackbar = vi.mocked(enqueueSnackbar);

const PRODUCT_ID = 1;
const RAW_MATERIAL_ID = 2;
const REQUIRED_QUANTITY = 50;
const INVALID_QUANTITY = -1;

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

  return { wrapper, invalidateSpy, queryClient };
};

describe("useUpdateProductMaterialQuantity", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call API, invalidate products query and show success message", async () => {
    mockedUpdateProductMaterialQuantity.mockResolvedValue(undefined);

    const { wrapper, invalidateSpy } = createWrapper();

    const { result } = renderHook(() => useUpdateProductMaterialQuantity(), {
      wrapper,
    });

    await act(async () => {
      await result.current.mutateAsync({
        productId: PRODUCT_ID,
        rawMaterialId: RAW_MATERIAL_ID,
        requiredQuantity: REQUIRED_QUANTITY,
      });
    });

    expect(mockedUpdateProductMaterialQuantity).toHaveBeenCalledTimes(1);
    expect(mockedUpdateProductMaterialQuantity).toHaveBeenCalledWith(
      {
        productId: PRODUCT_ID,
        rawMaterialId: RAW_MATERIAL_ID,
        requiredQuantity: REQUIRED_QUANTITY,
      },
      expect.any(Object),
    );

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ["products"],
      exact: false,
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Required quantity updated successfully.",
      { variant: "success" },
    );
  });

  it("should call API with correct parameters even on error", async () => {
    const apiError = {
      response: {
        data: { message: "Invalid quantity" },
      },
    } as AxiosError;

    mockedUpdateProductMaterialQuantity.mockRejectedValue(apiError);

    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useUpdateProductMaterialQuantity(), {
      wrapper,
    });

    await act(async () => {
      try {
        await result.current.mutateAsync({
          productId: PRODUCT_ID,
          rawMaterialId: RAW_MATERIAL_ID,
          requiredQuantity: INVALID_QUANTITY,
        });
      } catch {}
    });

    expect(mockedUpdateProductMaterialQuantity).toHaveBeenCalledWith(
      {
        productId: PRODUCT_ID,
        rawMaterialId: RAW_MATERIAL_ID,
        requiredQuantity: INVALID_QUANTITY,
      },
      expect.any(Object),
    );
    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith("Invalid quantity", {
      variant: "error",
    });
  });

  it("should show fallback error message if API response is missing", async () => {
    const apiError = {
      message: "Network error",
    } as unknown as AxiosError;

    mockedUpdateProductMaterialQuantity.mockRejectedValue(apiError);

    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useUpdateProductMaterialQuantity(), {
      wrapper,
    });

    await act(async () => {
      try {
        await result.current.mutateAsync({
          productId: PRODUCT_ID,
          rawMaterialId: RAW_MATERIAL_ID,
          requiredQuantity: REQUIRED_QUANTITY,
        });
      } catch {}
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Failed to update required quantity. Please try again.",
      { variant: "error" },
    );
  });

  it("should show fallback error message if error has no response data", async () => {
    const apiError = {} as AxiosError;

    mockedUpdateProductMaterialQuantity.mockRejectedValue(apiError);

    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useUpdateProductMaterialQuantity(), {
      wrapper,
    });

    await act(async () => {
      try {
        await result.current.mutateAsync({
          productId: PRODUCT_ID,
          rawMaterialId: RAW_MATERIAL_ID,
          requiredQuantity: REQUIRED_QUANTITY,
        });
      } catch {}
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Failed to update required quantity. Please try again.",
      { variant: "error" },
    );
  });
});
