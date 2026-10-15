import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AllahName } from "./allah-name.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AllahName])],
  exports: [TypeOrmModule],
})
export class NamesModule {}
