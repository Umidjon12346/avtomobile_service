import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({ example: "Apple", description: "Mahsulot nomi" })
  name: string;

  @ApiProperty({
    example: "Fresh red apple",
    description: "Mahsulot tavsifi",
    required: false,
  })
  description?: string;

  @ApiProperty({ example: 1.99, description: "Mahsulot narxi" })
  price: number;

}
