import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { City } from "../../city/entities/city.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Workshop } from "../../workshop/entities/workshop.entity";

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Mirzo Ulug'bek", description: "Hudud nomi" })
  @Column()
  name: string;

  @ApiProperty({ example: 1, description: "Shahar (City) ID si" })
  @ManyToOne(() => City, (city) => city.regions, { onDelete: "CASCADE" },)
  city: City;

  @OneToMany(()=>Workshop,(workshop)=>workshop.region)
  workshops:Workshop[]
}
