import { BadRequestException, Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AskService } from "./ask.service";

@Controller("ask")
export class AskController {
  constructor(private readonly askService: AskService) {}

  @Post()
  @HttpCode(200)
  ask(@Body() body: { question?: unknown }) {
    const question = typeof body?.question === "string" ? body.question.trim() : "";
    if (question.length < 2 || question.length > 500) {
      throw new BadRequestException("اكتب سؤالًا بين حرفين و500 حرف.");
    }
    return this.askService.ask(question);
  }
}
