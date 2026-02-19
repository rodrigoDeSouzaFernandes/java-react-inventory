export interface ProductionSuggestionItem {
  productId: number;
  productName: string;
  unitValue: number;
  producibleQuantity: number;
  totalValue: number;
}

export interface ProductionSuggestionResponse {
  items: ProductionSuggestionItem[];
  grandTotal: number;
}
