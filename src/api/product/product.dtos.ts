export type productDto = {
  name: string;
  description: string;
  price: number;
}

export type addProductDto = productDto;

export type updateProductDto = Partial<productDto>;
