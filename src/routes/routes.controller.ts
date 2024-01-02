import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RouteDto } from './dto/route.dto';

@Controller('routes')
export class RoutesController {
  constructor(private routesService: RoutesService) {}

  @Get()
  getAllRoutes() {
    return this.routesService.getAllRoutes();
  }

  @Post()
  createRoute(@Body() routeDto: RouteDto) {
    return this.routesService.createRoute(routeDto);
  }
}
