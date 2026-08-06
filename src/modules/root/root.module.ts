import { Module } from '@nestjs/common';
import { RootController } from './presentation/root.controller';

@Module({
  controllers: [RootController],
})
export class RootModule {}
