import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('addMultiple')
  async addMultiple(
    @Body()
    body: {
      type: string;
      cmd_chain: Array<{ type: string; cmd: string }>;
    },
  ) {
    await this.appService.handleAddMulti(body);

    // Begin a transaction on the SQL server
  }
}
