interface Product {
  id: number;
  name: string;
  value: number;
  productibleQuantity: number;
}

interface ProductCreateDTO {
  name: string;
  value: number;
}

type ProductUpdateDTO = Partial<ProductCreateDTO> & {
  id: number
}
