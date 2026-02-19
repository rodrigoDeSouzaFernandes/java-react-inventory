import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useCreateMaterial } from "./useCreateMaterial";
import { createMaterial } from "../api/material.mutations";
import { enqueueSnackbar } from "notistack";
import type { Material, MaterialCreateDTO } from "../types";

vi.mock("../api/material.mutations", () => ({
  createMaterial: vi.fn(),
}));

vi.mock("notistack", () => ({
  enqueueSnackbar: vi.fn(),
}));

const mockedCreateMaterial = vi.mocked(createMaterial);
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

describe("useCreateMaterial", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create material, invalidate query and show success snackbar", async () => {
    const input: MaterialCreateDTO = {
      name: "New Material",
      stockQuantity: 50,
    };

    const mockResponse: Material = {
      id: 1,
      ...input,
    };

    mockedCreateMaterial.mockResolvedValue(mockResponse);

    const { wrapper, invalidateSpy } = createWrapper();

    const { result } = renderHook(() => useCreateMaterial(), { wrapper });

    await act(async () => {
      return await result.current.mutateAsync(input);
    });

    expect(mockedCreateMaterial).toHaveBeenCalledTimes(1);
    expect(mockedCreateMaterial.mock.calls[0][0]).toEqual(input);

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ["raw-materials"],
      exact: false,
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Material created successfully!",
      { variant: "success" },
    );
  });

  it("should show backend error message when API returns custom message", async () => {
    const input: MaterialCreateDTO = {
      name: "Test",
      stockQuantity: 10,
    };

    const apiError = {
      response: {
        data: { message: "Custom backend error" },
      },
    };

    mockedCreateMaterial.mockRejectedValue(apiError);

    const { wrapper, invalidateSpy } = createWrapper();

    const { result } = renderHook(() => useCreateMaterial(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync(input);
      } catch {}
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith("Custom backend error", {
      variant: "error",
    });

    expect(invalidateSpy).not.toHaveBeenCalled();
  });

  it("should show fallback error message when API error has no message", async () => {
    const input: MaterialCreateDTO = {
      name: "Test",
      stockQuantity: 10,
    };

    const apiError = {} as Error;

    mockedCreateMaterial.mockRejectedValue(apiError);

    const { wrapper, invalidateSpy } = createWrapper();

    const { result } = renderHook(() => useCreateMaterial(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync(input);
      } catch {}
    });

    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Failed to create material",
      { variant: "error" },
    );

    expect(invalidateSpy).not.toHaveBeenCalled();
  });
});
