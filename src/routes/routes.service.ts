import { Injectable } from '@nestjs/common';
import { RouteDto } from './dto/route.dto';

@Injectable()
export class RoutesService {
  private routes = ['test']; // 다른 컴포넌트에서의 수정 방지

  getAllRoutes() {
    return this.routes;
  }

  createRoute(routeDto: RouteDto) {
    return;
  }
}
