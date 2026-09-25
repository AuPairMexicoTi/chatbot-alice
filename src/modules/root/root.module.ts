import { Module } from '@nestjs/common';
import { RootController } from './presentation/root.controller';
import { MediaAssetsController } from './presentation/media-assets.controller';

@Module({
  controllers: [RootController, MediaAssetsController],
})
export class RootModule {}
