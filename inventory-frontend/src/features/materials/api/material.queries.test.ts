import { describe, it, expect, vi, beforeEach } from "vitest";
import api from "@/lib/client/axios";
import { getMaterials, getMaterialById } from "./material.queries";
import type { Material } from "../types";

vi.mock("@/lib/client/axios");
const mockedApiGet = vi.mocked(api.get);

describe("Material API Queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockMaterials: Material[] = [
    { id: 1, name: "Material A", stockQuantity: 100 },
    { id: 2, name: "Material B", stockQuantity: 200 },
  ];

  const mockMaterial: Material = {
    id: 1,
    name: "Material A",
    stockQuantity: 100,
  };

  describe("getMaterials", () => {
    it("should call the correct endpoint and return materials list", async () => {
      mockedApiGet.mockResolvedValue({ data: mockMaterials });

      const result = await getMaterials();

      expect(mockedApiGet).toHaveBeenCalledTimes(1);
      expect(mockedApiGet).toHaveBeenCalledWith("/raw-materials");
      expect(result).toEqual(mockMaterials);
    });

    it("should propagate errors when request fails", async () => {
      const error = new Error("Network Error");
      mockedApiGet.mockRejectedValue(error);

      await expect(getMaterials()).rejects.toBe(error);
      expect(mockedApiGet).toHaveBeenCalledTimes(1);
      expect(mockedApiGet).toHaveBeenCalledWith("/raw-materials");
    });
  });

  describe("getMaterialById", () => {
    it("should call the correct endpoint with id and return the material", async () => {
      mockedApiGet.mockResolvedValue({ data: mockMaterial });

      const result = await getMaterialById(1);

      expect(mockedApiGet).toHaveBeenCalledTimes(1);
      expect(mockedApiGet).toHaveBeenCalledWith("/raw-materials/1");
      expect(result).toEqual(mockMaterial);
    });

    it("should propagate errors when request fails", async () => {
      const error = new Error("Not Found");
      mockedApiGet.mockRejectedValue(error);

      await expect(getMaterialById(999)).rejects.toBe(error);
      expect(mockedApiGet).toHaveBeenCalledTimes(1);
      expect(mockedApiGet).toHaveBeenCalledWith("/raw-materials/999");
    });
  });
});
