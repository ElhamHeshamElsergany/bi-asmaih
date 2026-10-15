import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./book.entity";
import { BookChunk } from "./book-chunk.entity";
import { BookSection } from "./book-section.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookSection, BookChunk])],
  exports: [TypeOrmModule],
})
export class BooksModule {}
