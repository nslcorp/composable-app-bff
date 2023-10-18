import { Controller, Get } from '@nestjs/common';
import { TempService } from './services/TempService';

@Controller('temp')
export class TempController {
  constructor(private readonly tempService: TempService) {}
  @Get('/')
  async geRoot(): Promise<string> {
    return await this.tempService.getRoot();
  }
}
