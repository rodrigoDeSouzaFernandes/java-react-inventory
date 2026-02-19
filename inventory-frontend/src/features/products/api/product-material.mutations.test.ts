import { describe, it, expect, vi, beforeEach } from "vitest";
import api from "@/lib/client/axios";
import {
  addMaterialToProduct,
  updateProductMaterialQuantity,
  removeMaterialFromProduct,
} from "./product-material.mutations";
import type {
  ProductMaterial,
  ProductMaterialDeleteDTO,
} from "../types";

vi.mock("@/lib/client/axios");

const mockedApiPost = vi.mocked(api.post);
const mockedApiPut = vi.mocked(api.put);
const mockedApiDelete = vi.mocked(api.delete);

describe("Product Material API Mutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("addMaterialToProduct", () => {
    it("should add material to product successfully", async () => {
      const mockInput: ProductMaterial = {
        productId: 1,
        rawMaterialId: 2,
        requiredQuantity: 5,
      };

      const mockResponse: ProductMaterial = { ...mockInput };

      mockedApiPost.mockResolvedValue({ data: mockResponse });

      const result = await addMaterialToProduct(mockInput);

      expect(mockedApiPost).toHaveBeenCalledWith(
        "/product-raw-materials",
        mockInput,
      );
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if API call fails", async () => {
      const mockInput: ProductMaterial = {
        productId: 1,
        rawMaterialId: 2,
        requiredQuantity: 5,
      };

      mockedApiPost.mockRejectedValue(new Error("Add Error"));

      await expect(addMaterialToProduct(mockInput)).rejects.toThrow(
        "Add Error",
      );
    });
  });


  describe("updateProductMaterialQuantity", () => {
    it("should update material quantity successfully", async () => {
      const mockInput: ProductMaterial = {
        productId: 1,
        rawMaterialId: 2,
        requiredQuantity: 10,
      };

      mockedApiPut.mockResolvedValue({});

      await updateProductMaterialQuantity(mockInput);

      expect(mockedApiPut).toHaveBeenCalledWith(
        "product-raw-materials/1/2",
        { requiredQuantity: 10 },
      );
    });

    it("should throw an error if API call fails", async () => {
      const mockInput: ProductMaterial = {
        productId: 1,
        rawMaterialId: 2,
        requiredQuantity: 10,
      };

      mockedApiPut.mockRejectedValue(new Error("Update Error"));

      await expect(updateProductMaterialQuantity(mockInput)).rejects.toThrow(
        "Update Error",
      );
    });
  });


  describe("removeMaterialFromProduct", () => {
    it("should remove material from product successfully", async () => {
      const mockInput: ProductMaterialDeleteDTO = {
        productId: 1,
        rawMaterialId: 2,
      };

      mockedApiDelete.mockResolvedValue({});

      await removeMaterialFromProduct(mockInput);

      expect(mockedApiDelete).toHaveBeenCalledWith(
        "product-raw-materials/1/2",
      );
    });

    it("should throw an error if API call fails", async () => {
      const mockInput: ProductMaterialDeleteDTO = {
        productId: 999,
        rawMaterialId: 888,
      };

      mockedApiDelete.mockRejectedValue(new Error("Delete Error"));

      await expect(removeMaterialFromProduct(mockInput)).rejects.toThrow(
        "Delete Error",
      );
    });
  });
});
