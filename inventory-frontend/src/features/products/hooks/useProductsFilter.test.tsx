import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import { useProductsFilter } from "./useProductsFilter";

describe("useProductsFilter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return productibleOnly as false by default", () => {
    const { result } = renderHook(() => useProductsFilter(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/products"]}>
          {children}
        </MemoryRouter>
      ),
    });

    expect(result.current.productibleOnly).toBe(false);
  });

  it("should return productibleOnly as true when parameter is set in URL", () => {
    const { result } = renderHook(() => useProductsFilter(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/products?productibleOnly=true"]}>
          {children}
        </MemoryRouter>
      ),
    });

    expect(result.current.productibleOnly).toBe(true);
  });

  it("should provide handleToogleProductibleOnly function", () => {
    const { result } = renderHook(() => useProductsFilter(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/products"]}>
          {children}
        </MemoryRouter>
      ),
    });

    expect(result.current.handleToogleProductibleOnly).toBeDefined();
    expect(typeof result.current.handleToogleProductibleOnly).toBe("function");
  });

  it("should handle toggle to true when checkbox is checked", () => {
    const { result } = renderHook(() => useProductsFilter(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/products"]}>
          {children}
        </MemoryRouter>
      ),
    });

    const changeEvent = {
      target: { checked: true },
    } as React.ChangeEvent<HTMLInputElement, Element>;

    expect(() => {
      result.current.handleToogleProductibleOnly(changeEvent);
    }).not.toThrow();
  });

  it("should handle toggle to false when checkbox is unchecked", () => {
    const { result } = renderHook(() => useProductsFilter(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/products?productibleOnly=true"]}>
          {children}
        </MemoryRouter>
      ),
    });

    const changeEvent = {
      target: { checked: false },
    } as React.ChangeEvent<HTMLInputElement, Element>;

    expect(() => {
      result.current.handleToogleProductibleOnly(changeEvent);
    }).not.toThrow();
  });
});
