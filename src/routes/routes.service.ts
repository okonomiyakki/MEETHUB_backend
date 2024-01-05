import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CoordinateDto } from './dto/route.dto';

@Injectable()
export class RoutesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  private ODsayAppKey = this.config.get('ODSAY_API_APP_KEY');

  async getSample(): Promise<any> {
    try {
      return `<h1 style="width: 100%; background: lightgray; margin: 0; padding: 0; text-align: center;">루트 페이지입니다!</h1>`;
    } catch (error) {
      console.error('HTTP Request Error:', error.message);
      throw error;
    }
  }

  async getTransPathByCenterCoord(coordinateDto: CoordinateDto): Promise<any> {
    let RESPONSE_COUNT = 0;
    let RADIUS = 3000; // 반경
    const STATION_CLASS = 2; // 이동수단 : 지하철
    const MAX_STATION_COUNT = 4; // 지하철역 최대 개수
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // API fetch 딜레이

    const uniqueStation = [];
    const uniqueNamesSet = new Set();

    do {
      try {
        const PublicTransitPOIwithinRadiusUrl = `https://api.odsay.com/v1/api/pointSearch?lang=0&x=${coordinateDto.centerLng}&y=${coordinateDto.centerLat}&radius=${RADIUS}&stationClass=${STATION_CLASS}&apiKey=${this.ODsayAppKey}`;

        var response = await this.httpService
          .get(PublicTransitPOIwithinRadiusUrl)
          .toPromise();

        // console.log('response.data:', response.data);
        console.log(`Radius: ${RADIUS}, Count: ${RESPONSE_COUNT}`);

        RESPONSE_COUNT = response.data.result.count;

        if (RESPONSE_COUNT > 0) {
          response.data.result.station.forEach((station) => {
            // 만약 Set에 해당 역 이름이 없고, 배열의 길이가 4보다 작다면
            if (
              !uniqueNamesSet.has(station.stationName) &&
              uniqueStation.length < MAX_STATION_COUNT
            ) {
              // 해당 역을 배열에 추가하고, Set에 역 이름을 추가
              uniqueStation.push(station);
              uniqueNamesSet.add(station.stationName);
            }
          });
        } else if (RADIUS === 3500) break;
        else RADIUS += 500;
      } catch (error) {
        console.error('HTTP Request Error:', error.message);
        throw error;
      }
    } while (RESPONSE_COUNT === 0);

    try {
      let startToEndPath = [];
      const stationPathList = [];
      const trafficDistanceList = [];

      for (let k = 0; k < uniqueStation.length; k++) {
        for (let i = 0; i < coordinateDto.startLatlng.length; i++) {
          const PublicTransitRouteSearchUrl = `https://api.odsay.com/v1/api/searchPubTransPathT?SX=${coordinateDto.startLatlng[i][1]}&SY=${coordinateDto.startLatlng[i][0]}&EX=${uniqueStation[k].x}&EY=${uniqueStation[k].y}&apiKey=${this.ODsayAppKey}`;

          var response = await this.httpService
            .get(PublicTransitRouteSearchUrl)
            .toPromise();

          await delay(500);

          // console.log(response.data);

          startToEndPath.push(response.data);

          if (response.data.error)
            console.log(
              'error!!!!!!!',
              response.data.error.code,
              response.data.error.message,
            );

          // trafficDistanceList.push(
          //   response.data.result.path[0].info.trafficDistance,
          // ); // totalTime 은 숫자가 너무 비슷함
        }
        stationPathList.push(startToEndPath);
        startToEndPath = [];
      }

      console.log('uniqueStation', uniqueStation);

      const endPointInfo = {
        stationLength: uniqueStation.length,
        firstStationName: uniqueStation[0].stationName,
        firstStationCoord: [uniqueStation[0].x, uniqueStation[0].y],
        stationList: uniqueStation,
        stationPathList,
      };

      return endPointInfo;
    } catch (error) {
      console.error('HTTP Request Error:', error.message);
      throw error;
    }
  }
}
