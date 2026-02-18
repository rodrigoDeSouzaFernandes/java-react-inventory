import type { ProductRow } from "../../types";

  export interface ProductDialogData {
    open: boolean;
    product: ProductRow | null;
  }