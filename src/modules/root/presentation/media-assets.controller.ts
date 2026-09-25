import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import type { Response } from 'express';
import { join } from 'node:path';

const MEDIA_FILES = new Set([
  'principal.jpeg',
  'alemania.jpeg',
  'belgica.jpeg',
  'estados-unidos.jpeg',
  'francia.jpeg',
  'italia.jpeg',
]);

@ApiExcludeController()
@Controller('assets')
export class MediaAssetsController {
  @Get(':filename')
  sendImage(
    @Param('filename') filename: string,
    @Res() response: Response,
  ): void {
    if (!MEDIA_FILES.has(filename)) throw new NotFoundException();
    response.sendFile(join(process.cwd(), 'public', 'images', filename));
  }
}
