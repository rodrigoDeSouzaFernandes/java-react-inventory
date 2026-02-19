import { describe, it, expect, vi, beforeEach } from "vitest";
import api from "@/lib/client/axios";
import { getProducts, getProductById } from "./product.queries";
import type { Product, ProductWithMaterials } from "../types";

vi.mock("@/lib/client/axios");
const mockedApiGet = vi.mocked(api.get);

describe("Product API Queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockProducts: Product[] = [
    { id: 1, name: "Product A", value: 100, productibleQuantity: 0 },
    { id: 2, name: "Product B", value: 200, productibleQuantity: 5 },
  ];

  const mockProductWithMaterials: ProductWithMaterials = {
    id: 1,
    name: "Product A",
    value: 100,
    producibleQuantity: 0,
    materials: [{ id: 10, name: "Wood", stockQuantity: 50, requiredQuantity: 5 }],
  };

  it("should fetch all products successfully", async () => {
    mockedApiGet.mockResolvedValue({ data: mockProducts });

    const result = await getProducts();

    expect(mockedApiGet).toHaveBeenCalledWith("/products/?productibleOnly=false");
    expect(result).toEqual(mockProducts);
  });

  it("should fetch only productible products when flag is true", async () => {
    const productibleOnly = mockProducts.filter(p => p.productibleQuantity > 0);

    mockedApiGet.mockResolvedValue({ data: productibleOnly });

    const result = await getProducts(true);

    expect(mockedApiGet).toHaveBeenCalledWith("/products/?productibleOnly=true");
    expect(result).toEqual(productibleOnly);
  });

  it("should fetch a product by ID successfully", async () => {
    mockedApiGet.mockResolvedValue({ data: mockProductWithMaterials });

    const result = await getProductById(1);

    expect(mockedApiGet).toHaveBeenCalledWith("/products/1");
    expect(result).toEqual(mockProductWithMaterials);
  });

  it("should propagate errors from getProducts", async () => {
    const error = new Error("Network Error");
    mockedApiGet.mockRejectedValue(error);

    await expect(getProducts()).rejects.toThrow(error);
    expect(mockedApiGet).toHaveBeenCalledWith("/products/?productibleOnly=false");
  });

  it("should propagate errors from getProductById", async () => {
    const error = new Error("Not Found");
    mockedApiGet.mockRejectedValue(error);

    await expect(getProductById(999)).rejects.toThrow(error);
    expect(mockedApiGet).toHaveBeenCalledWith("/products/999");
  });
});
