import { describe, it, expect, vi, beforeEach } from "vitest";
import api from "@/lib/client/axios";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "./product.mutations";
import type { Product, ProductCreateDTO, ProductUpdateDTO } from "../types";

vi.mock("@/lib/client/axios");
const mockedApiPost = vi.mocked(api.post);
const mockedApiPatch = vi.mocked(api.patch);
const mockedApiDelete = vi.mocked(api.delete);

describe("Product API Mutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createProduct", () => {
    it("should create a product successfully", async () => {
      const mockInput: ProductCreateDTO = { name: "Test Product", value: 100 };
      const mockResponse: Product = {
        id: 1,
        ...mockInput,
        productibleQuantity: 0,
      };

      mockedApiPost.mockResolvedValue({ data: mockResponse });

      const result = await createProduct(mockInput);

      expect(mockedApiPost).toHaveBeenCalledWith("/products", mockInput);
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if API call fails", async () => {
      mockedApiPost.mockRejectedValue(new Error("API Error"));

      await expect(createProduct({ name: "Fail", value: 50 })).rejects.toThrow(
        "API Error",
      );
    });
  });

  describe("updateProduct", () => {
    it("should update a product successfully", async () => {
      const mockInput: ProductUpdateDTO = {
        id: 1,
        name: "Updated",
        value: 150,
      };

      mockedApiPatch.mockResolvedValue({});

      await updateProduct(mockInput);

      expect(mockedApiPatch).toHaveBeenCalledWith("/products/1", {
        name: "Updated",
        value: 150,
      });
    });

    it("should throw an error if API call fails", async () => {
      const mockInput: ProductUpdateDTO = { id: 1, name: "Fail", value: 100 };
      mockedApiPatch.mockRejectedValue(new Error("Update Error"));

      await expect(updateProduct(mockInput)).rejects.toThrow("Update Error");
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product successfully", async () => {
      mockedApiDelete.mockResolvedValue({});

      await deleteProduct(1);

      expect(mockedApiDelete).toHaveBeenCalledWith("/products/1");
    });

    it("should throw an error if API call fails", async () => {
      mockedApiDelete.mockRejectedValue(new Error("Delete Error"));

      await expect(deleteProduct(999)).rejects.toThrow("Delete Error");
    });
  });
});
