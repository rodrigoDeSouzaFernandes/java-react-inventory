import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAddMaterialToProduct } from "./useAddMaterialToProduct";
import { addMaterialToProduct } from "../api/product-material.mutations";
import { enqueueSnackbar } from "notistack";
import type { ProductMaterial } from "../types";

vi.mock("../api/product-material.mutations", () => ({
  addMaterialToProduct: vi.fn(),
}));

vi.mock("notistack", () => ({
  enqueueSnackbar: vi.fn(),
}));

describe("useAddMaterialToProduct", () => {
  let queryClient: QueryClient;

  const createWrapper = () => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call API, invalidate correct product query and show success message", async () => {
    const mockData: ProductMaterial = {
      productId: 10,
      rawMaterialId: 5,
      requiredQuantity: 2,
    };

    (addMaterialToProduct as any).mockResolvedValue(mockData);

    const wrapper = createWrapper();

    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useAddMaterialToProduct(), {
      wrapper,
    });

    await act(async () => {
      await result.current.mutateAsync(mockData);
    });

    expect(addMaterialToProduct).toHaveBeenCalledWith(
      mockData,
      expect.any(Object),
    );

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ["products", 10],
      exact: false,
    });

    expect(enqueueSnackbar).toHaveBeenCalledWith(
      "Material added to product successfully.",
      { variant: "success" },
    );
  });

  it("should show backend error message when provided", async () => {
    const error = {
      response: {
        data: { message: "Custom backend error" },
      },
    };

    (addMaterialToProduct as any).mockRejectedValue(error);

    const { result } = renderHook(() => useAddMaterialToProduct(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.mutateAsync({} as any).catch(() => {});
    });

    expect(enqueueSnackbar).toHaveBeenCalledWith("Custom backend error", {
      variant: "error",
    });
  });

  it("should show 409 specific error message", async () => {
    const error = {
      status: 409,
      response: { data: {} },
    };

    (addMaterialToProduct as any).mockRejectedValue(error);

    const { result } = renderHook(() => useAddMaterialToProduct(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.mutateAsync({} as any).catch(() => {});
    });

    expect(enqueueSnackbar).toHaveBeenCalledWith(
      "This material has already been added to the product.",
      { variant: "error" },
    );
  });
});
