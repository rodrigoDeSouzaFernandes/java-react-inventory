import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { useRemoveMaterialFromProduct } from "./useRemoveMaterialFromProduct";
import { removeMaterialFromProduct } from "../api/product-material.mutations";
import { enqueueSnackbar } from "notistack";

vi.mock("../api/product-material.mutations", () => ({
  removeMaterialFromProduct: vi.fn(),
}));

vi.mock("notistack", () => ({
  enqueueSnackbar: vi.fn(),
}));

const mockedRemoveMaterialFromProduct = vi.mocked(removeMaterialFromProduct);
const mockedEnqueueSnackbar = vi.mocked(enqueueSnackbar);

const PRODUCT_ID = 1;
const RAW_MATERIAL_ID = 2;
const NOT_FOUND_PRODUCT_ID = 999;
const NOT_FOUND_RAW_MATERIAL_ID = 888;

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

describe("useRemoveMaterialFromProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call API, invalidate products query and show success message", async () => {
    mockedRemoveMaterialFromProduct.mockResolvedValue(undefined);

    const { wrapper, invalidateSpy } = setupHook();

    const { result } = renderHook(() => useRemoveMaterialFromProduct(), {
      wrapper,
    });

    await act(async () => {
      await result.current.mutateAsync({
        productId: PRODUCT_ID,
        rawMaterialId: RAW_MATERIAL_ID,
      });
    });

    expect(mockedRemoveMaterialFromProduct).toHaveBeenCalledTimes(1);
    expect(mockedRemoveMaterialFromProduct).toHaveBeenCalledWith(
      {
        productId: PRODUCT_ID,
        rawMaterialId: RAW_MATERIAL_ID,
      },
      expect.any(Object),
    );

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ["products"],
      exact: false,
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Material removed from product successfully.",
      { variant: "success" },
    );
  });

  it("should call API with correct parameters even on error", async () => {
    const apiError = {
      response: {
        data: { message: "Material not found" },
      },
    } as AxiosError;

    mockedRemoveMaterialFromProduct.mockRejectedValue(apiError);

    const { wrapper } = setupHook();

    const { result } = renderHook(() => useRemoveMaterialFromProduct(), {
      wrapper,
    });

    await act(async () => {
      try {
        await result.current.mutateAsync({
          productId: NOT_FOUND_PRODUCT_ID,
          rawMaterialId: NOT_FOUND_RAW_MATERIAL_ID,
        });
      } catch {}
    });

    expect(mockedRemoveMaterialFromProduct).toHaveBeenCalledWith(
      {
        productId: NOT_FOUND_PRODUCT_ID,
        rawMaterialId: NOT_FOUND_RAW_MATERIAL_ID,
      },
      expect.any(Object),
    );
    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith("Material not found", {
      variant: "error",
    });
  });

  it("should show fallback error message if API response is missing", async () => {
    const apiError = {
      message: "Network error",
    } as unknown as AxiosError;

    mockedRemoveMaterialFromProduct.mockRejectedValue(apiError);

    const { wrapper } = setupHook();

    const { result } = renderHook(() => useRemoveMaterialFromProduct(), {
      wrapper,
    });

    await act(async () => {
      try {
        await result.current.mutateAsync({
          productId: PRODUCT_ID,
          rawMaterialId: RAW_MATERIAL_ID,
        });
      } catch {}
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Failed to remove material from product. Please try again.",
      { variant: "error" },
    );
  });

  it("should show fallback error message if error has no response data", async () => {
    const apiError = {} as AxiosError;

    mockedRemoveMaterialFromProduct.mockRejectedValue(apiError);

    const { wrapper } = setupHook();

    const { result } = renderHook(() => useRemoveMaterialFromProduct(), {
      wrapper,
    });

    await act(async () => {
      try {
        await result.current.mutateAsync({
          productId: PRODUCT_ID,
          rawMaterialId: RAW_MATERIAL_ID,
        });
      } catch {}
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Failed to remove material from product. Please try again.",
      { variant: "error" },
    );
  });
});
