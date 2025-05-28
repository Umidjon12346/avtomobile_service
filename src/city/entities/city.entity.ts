import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Region } from "../../region/entities/region.entity";

@Entity("cities")
export class City {
  @ApiProperty({ example: 1, description: "Shahar identifikatori" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Tashkent", description: "Shahar nomi" })
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Region, (region) => region.city)
  regions: Region[];
}
