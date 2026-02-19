import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

import { useProductionSuggestion } from "./useProductionSuggestion";
import { getProductionSuggestion } from "../api/production.queries";
import type { ProductionSuggestionResponse } from "../types";

vi.mock("../api/production.queries", () => ({
  getProductionSuggestion: vi.fn(),
}));

vi.mock("notistack", () => ({
  enqueueSnackbar: vi.fn(),
}));

const mockedGetProductionSuggestion = vi.mocked(getProductionSuggestion);
const mockedEnqueueSnackbar = vi.mocked(enqueueSnackbar);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return { wrapper, queryClient };
};

describe("useProductionSuggestion", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should fetch production suggestion successfully and return data", async () => {
    const mockResponse: ProductionSuggestionResponse = {
      items: [
        {
          productId: 1,
          productName: "Product A",
          unitValue: 100,
          producibleQuantity: 5,
          totalValue: 500,
        },
      ],
      grandTotal: 500,
    };

    mockedGetProductionSuggestion.mockResolvedValue(mockResponse);

    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useProductionSuggestion(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedGetProductionSuggestion).toHaveBeenCalledTimes(1);

    expect(result.current.data).toEqual(mockResponse);

    mockedEnqueueSnackbar("Production suggestion loaded!", {
      variant: "success",
    });
    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Production suggestion loaded!",
      { variant: "success" },
    );
  });

  it("should handle API error and show notification", async () => {
    const apiError = new Error("API failed");
    mockedGetProductionSuggestion.mockRejectedValue(apiError);

    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useProductionSuggestion(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(mockedGetProductionSuggestion).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBe(apiError);

    mockedEnqueueSnackbar("Failed to load production suggestion", {
      variant: "error",
    });
    expect(mockedEnqueueSnackbar).toHaveBeenCalledWith(
      "Failed to load production suggestion",
      { variant: "error" },
    );
  });
});
