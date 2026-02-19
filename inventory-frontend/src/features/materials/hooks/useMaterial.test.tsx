import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useMaterial } from "./useMaterial";
import { getMaterialById } from "../api/material.queries";

vi.mock("../api/material.queries", () => ({
  getMaterialById: vi.fn(),
}));

const mockedGetMaterialById = vi.mocked(getMaterialById);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  return { wrapper };
};

describe("useMaterial", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should start in loading state", () => {
    mockedGetMaterialById.mockResolvedValue({
      id: 1,
      name: "Test",
      stockQuantity: 10,
    });

    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useMaterial(1), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.isError).toBe(false);
  });

  it("should fetch material by id and return data", async () => {
    const materialId = 1;

    const mockMaterial = {
      id: materialId,
      name: "Test Material",
      stockQuantity: 100,
    };

    mockedGetMaterialById.mockResolvedValue(mockMaterial);

    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useMaterial(materialId), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedGetMaterialById).toHaveBeenCalledTimes(1);
    expect(mockedGetMaterialById).toHaveBeenCalledWith(materialId);
    expect(result.current.data).toEqual(mockMaterial);
  });

  it("should handle errors when fetching material fails", async () => {
    const materialId = 999;
    const error = new Error("Material not found");

    mockedGetMaterialById.mockRejectedValue(error);

    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useMaterial(materialId), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockedGetMaterialById).toHaveBeenCalledWith(materialId);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.data).toBeUndefined();
  });
});
