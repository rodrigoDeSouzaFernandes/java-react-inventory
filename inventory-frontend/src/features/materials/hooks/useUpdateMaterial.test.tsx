import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useUpdateMaterial } from "./useUpdateMaterial";
import { updateMaterial } from "../api/material.mutations";
import { enqueueSnackbar } from "notistack";
import type { MaterialUpdateDTO } from "../types";

vi.mock("../api/material.mutations", () => ({
  updateMaterial: vi.fn(),
}));

vi.mock("notistack", () => ({
  enqueueSnackbar: vi.fn(),
}));

const mockedUpdateMaterial = vi.mocked(updateMaterial);
const mockedEnqueueSnackbar = vi.mocked(enqueueSnackbar);

describe("useUpdateMaterial", () => {
  let queryClient: QueryClient;

  const createWrapper = () => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    return ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should update material, invalidate query and show success snackbar", async () => {
    const input: MaterialUpdateDTO = {
      id: 1,
      name: "Updated Material",
      stockQuantity: 150,
    };

    mockedUpdateMaterial.mockResolvedValue(undefined);

    const wrapper = createWrapper();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useUpdateMaterial(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(input);
    });

    expect(mockedUpdateMaterial).toHaveBeenCalledTimes(1);
    expect(mockedUpdateMaterial).toHaveBeenCalledWith(
      input,
      expect.any(Object),
    );

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ["raw-materials"],
      exact: false,
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Material updated successfully!",
      { variant: "success" },
    );
  });

  it("should show backend error message when API returns custom message", async () => {
    const error = {
      response: {
        data: { message: "Custom backend error" },
      },
    };

    mockedUpdateMaterial.mockRejectedValue(error);

    const wrapper = createWrapper();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useUpdateMaterial(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({
          id: 1,
          name: "Test",
          stockQuantity: 10,
        });
      } catch {}
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith("Custom backend error", {
      variant: "error",
    });

    expect(invalidateSpy).not.toHaveBeenCalled();
  });

  it("should show fallback error message when API error has no response message", async () => {
    const error = new Error("Network error");

    mockedUpdateMaterial.mockRejectedValue(error);

    const wrapper = createWrapper();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useUpdateMaterial(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({
          id: 1,
          name: "Test",
          stockQuantity: 10,
        });
      } catch {}
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Failed to update material",
      { variant: "error" },
    );

    expect(invalidateSpy).not.toHaveBeenCalled();
  });
});
