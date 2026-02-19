import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ReactNode } from "react";

import { useDeleteMaterial } from "./useDeleteMaterial";
import { deleteMaterial } from "../api/material.mutations";
import { enqueueSnackbar } from "notistack";

vi.mock("../api/material.mutations", () => ({
  deleteMaterial: vi.fn(),
}));

vi.mock("notistack", () => ({
  enqueueSnackbar: vi.fn(),
}));

const mockedDeleteMaterial = vi.mocked(deleteMaterial);
const mockedEnqueueSnackbar = vi.mocked(enqueueSnackbar);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return { wrapper, invalidateSpy };
};

describe("useDeleteMaterial", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should delete material, invalidate query and show success snackbar", async () => {
    const materialId = 1;
    mockedDeleteMaterial.mockResolvedValue(undefined);

    const { wrapper, invalidateSpy } = createWrapper();

    const { result } = renderHook(() => useDeleteMaterial(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(materialId);
    });

    expect(mockedDeleteMaterial).toHaveBeenCalledTimes(1);
    expect(mockedDeleteMaterial.mock.calls[0][0]).toBe(materialId);

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ["raw-materials"],
      exact: false,
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Material deleted successfully!",
      { variant: "success" },
    );
  });

  it("should show backend error message when API returns custom message", async () => {
    const materialId = 999;

    const apiError = {
      response: {
        data: { message: "Material not found" },
      },
    } as AxiosError;

    mockedDeleteMaterial.mockRejectedValue(apiError);

    const { wrapper, invalidateSpy } = createWrapper();

    const { result } = renderHook(() => useDeleteMaterial(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync(materialId);
      } catch {}
    });

    expect(mockedDeleteMaterial.mock.calls[0][0]).toBe(materialId);

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith("Material not found", {
      variant: "error",
    });

    expect(invalidateSpy).not.toHaveBeenCalled();
  });

  it("should show fallback error message when API error has no message", async () => {
    const materialId = 1;
    const apiError = {} as AxiosError;

    mockedDeleteMaterial.mockRejectedValue(apiError);

    const { wrapper, invalidateSpy } = createWrapper();

    const { result } = renderHook(() => useDeleteMaterial(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync(materialId);
      } catch {}
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Failed to delete material",
      { variant: "error" },
    );

    expect(invalidateSpy).not.toHaveBeenCalled();
  });
});
