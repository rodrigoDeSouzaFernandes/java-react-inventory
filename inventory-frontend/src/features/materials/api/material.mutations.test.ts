import { describe, it, expect, vi, beforeEach } from "vitest";
import api from "@/lib/client/axios";
import {
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "./material.mutations";
import type { Material, MaterialCreateDTO, MaterialUpdateDTO } from "../types";

vi.mock("@/lib/client/axios");
const mockedApiPost = vi.mocked(api.post);
const mockedApiPatch = vi.mocked(api.patch);
const mockedApiDelete = vi.mocked(api.delete);

describe("Material API Mutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createMaterial", () => {
    it("should call the correct endpoint and return created material", async () => {
      const mockInput: MaterialCreateDTO = {
        name: "Test Material",
        stockQuantity: 100,
      };

      const mockResponse: Material = {
        id: 1,
        ...mockInput,
      };

      mockedApiPost.mockResolvedValue({ data: mockResponse });

      const result = await createMaterial(mockInput);

      expect(mockedApiPost).toHaveBeenCalledTimes(1);
      expect(mockedApiPost).toHaveBeenCalledWith("/raw-materials", mockInput);
      expect(result).toEqual(mockResponse);
    });

    it("should propagate errors when request fails", async () => {
      const error = new Error("API Error");
      const mockInput: MaterialCreateDTO = {
        name: "Fail",
        stockQuantity: 50,
      };

      mockedApiPost.mockRejectedValue(error);

      await expect(createMaterial(mockInput)).rejects.toBe(error);
      expect(mockedApiPost).toHaveBeenCalledTimes(1);
      expect(mockedApiPost).toHaveBeenCalledWith("/raw-materials", mockInput);
    });
  });

  describe("updateMaterial", () => {
    it("should call the correct endpoint without sending id in the body", async () => {
      const mockInput: MaterialUpdateDTO = {
        id: 1,
        name: "Updated",
        stockQuantity: 150,
      };

      mockedApiPatch.mockResolvedValue({});

      await updateMaterial(mockInput);

      expect(mockedApiPatch).toHaveBeenCalledTimes(1);
      expect(mockedApiPatch).toHaveBeenCalledWith("/raw-materials/1", {
        name: "Updated",
        stockQuantity: 150,
      });
    });

    it("should propagate errors when request fails", async () => {
      const error = new Error("Update Error");
      const mockInput: MaterialUpdateDTO = {
        id: 1,
        name: "Fail",
        stockQuantity: 100,
      };

      mockedApiPatch.mockRejectedValue(error);

      await expect(updateMaterial(mockInput)).rejects.toBe(error);
      expect(mockedApiPatch).toHaveBeenCalledTimes(1);
      expect(mockedApiPatch).toHaveBeenCalledWith("/raw-materials/1", {
        name: "Fail",
        stockQuantity: 100,
      });
    });
  });

  describe("deleteMaterial", () => {
    it("should call the correct endpoint to delete material", async () => {
      mockedApiDelete.mockResolvedValue({});

      await deleteMaterial(1);

      expect(mockedApiDelete).toHaveBeenCalledTimes(1);
      expect(mockedApiDelete).toHaveBeenCalledWith("/raw-materials/1");
    });

    it("should propagate errors when request fails", async () => {
      const error = new Error("Delete Error");
      mockedApiDelete.mockRejectedValue(error);

      await expect(deleteMaterial(999)).rejects.toBe(error);
      expect(mockedApiDelete).toHaveBeenCalledTimes(1);
      expect(mockedApiDelete).toHaveBeenCalledWith("/raw-materials/999");
    });
  });
});
