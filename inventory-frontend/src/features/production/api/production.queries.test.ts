import { describe, it, expect, vi, beforeEach } from "vitest";
import api from "@/lib/client/axios";
import { getProductionSuggestion } from "./production.queries";
import type { ProductionSuggestionResponse } from "../types";

vi.mock("@/lib/client/axios");

const mockedApiGet = vi.mocked(api.get);

describe("Production Suggestion API Query", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch production suggestion successfully", async () => {
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

    mockedApiGet.mockResolvedValue({ data: mockResponse });

    const result = await getProductionSuggestion();

    expect(mockedApiGet).toHaveBeenCalledTimes(1);
    expect(mockedApiGet).toHaveBeenCalledWith("/production/suggestion");

    expect(result).toEqual(mockResponse);
  });

  it("should throw an error if API call fails", async () => {
    mockedApiGet.mockRejectedValue(new Error("API Error"));

    await expect(getProductionSuggestion()).rejects.toThrow("API Error");
    expect(mockedApiGet).toHaveBeenCalledTimes(1);
  });
});
