import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AllahAttribute } from "./allah-attribute.entity";
import { NameAttributeLink } from "./name-attribute-link.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AllahAttribute, NameAttributeLink])],
  exports: [TypeOrmModule],
})
export class AttributesModule {}
