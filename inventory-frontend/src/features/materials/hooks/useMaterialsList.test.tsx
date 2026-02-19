import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useMaterialsList } from "./useMaterialsList";
import { getMaterials } from "../api/material.queries";

vi.mock("../api/material.queries", () => ({
  getMaterials: vi.fn(),
}));

const mockedGetMaterials = vi.mocked(getMaterials);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return { wrapper, queryClient };
};

describe("useMaterialsList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should start in loading state", () => {
    mockedGetMaterials.mockResolvedValue([]);

    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useMaterialsList(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.isError).toBe(false);
  });

  it("should fetch materials successfully", async () => {
    const mockMaterials = [
      { id: 1, name: "Material 1", stockQuantity: 100 },
      { id: 2, name: "Material 2", stockQuantity: 200 },
    ];

    mockedGetMaterials.mockResolvedValue(mockMaterials);

    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useMaterialsList(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedGetMaterials).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockMaterials);
    expect(result.current.isError).toBe(false);
  });

  it("should handle errors when fetching materials fails", async () => {
    const error = new Error("Failed to fetch materials");
    mockedGetMaterials.mockRejectedValue(error);

    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useMaterialsList(), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockedGetMaterials).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.data).toBeUndefined();
  });
});
