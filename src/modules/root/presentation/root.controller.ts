import { Controller, Get } from '@nestjs/common';

@Controller()
export class RootController {
  @Get()
  getRoot(): {
    name: string;
    assistant: string;
    meaning: string;
    status: string;
    version: string;
  } {
    return {
      name: 'chatbot-alice',
      assistant: 'ALICE',
      meaning: 'Artificial Labile Intelligence Cybernetic Existence',
      status: 'running',
      version: '0.1.0',
    };
  }
}
