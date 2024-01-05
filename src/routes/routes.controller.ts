import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CoordinateDto } from './dto/route.dto';

@Controller('routes')
export class RoutesController {
  constructor(private routesService: RoutesService) {}

  @Get()
  getSample() {
    return this.routesService.getSample();
  }

  @Post()
  getTransPathByCenterCoord(@Body() coordinateDto: CoordinateDto) {
    return this.routesService.getTransPathByCenterCoord(coordinateDto);
  }
}
