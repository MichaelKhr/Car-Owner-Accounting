import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    return {
      users: [
        {
          id: 1,
          name: 'Иван',
          surname: 'Иванов',
          patronymic: 'Иванович',
          cars: [
            {
              num: 'AX2555HE',
              car_make: 'Tesla',
              car_model: 'Model S',
              year: '2021'
            },
          ]
        },
        {
          id: 2,
          name: 'Наталья',
          surname: 'Петрова',
          patronymic: 'Игоревна',
          cars: [
            {
              num: 'AX2121HP',
              car_make: 'Hundai',
              car_model: 'Accent',
              year: '2009'
            },
            {
              num: 'BC7286AE',
              car_make: 'KIA',
              car_model: 'Optima',
              year: '2019'
            },
          ]
        },
        {
          id: 3,
          name: 'Алексей',
          surname: 'Антонов',
          patronymic: 'Сергеевич',
          cars: [
            {
              num: 'AX0913HX',
              car_make: 'Ferrari',
              car_model: 'LaFerrari',
              year: '2020'
            }
          ]
        }
      ]
    }
  }
}
