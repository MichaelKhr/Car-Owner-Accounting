import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ICarOwnersService {
  getOwners(): Observable<OwnerEntity[]>;
  getOwnerById(aId: number): Observable<OwnerEntity>;
  createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: CarEntity[]
  ): Observable<OwnerEntity>;
  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity>;
  deleteOwner(aOwnerId: number): Observable<OwnerEntity[]>;
}

export interface OwnerEntity {
  id?: number,
  name: string,
  surname: string,
  patronymic: string,
  cars: CarEntity[]
}

export interface CarEntity {
  num: string,
  car_make: string,
  car_model: string,
  year: string
}

@Injectable({
  providedIn: 'root'
})
export class CarOwnerAccountingService implements ICarOwnersService {

  users!: OwnerEntity[]

  constructor(private httpClient: HttpClient) { }

  getOwners(): Observable<OwnerEntity[]> {
    return this.httpClient.get<OwnerEntity[]>('/api/users')
  }
  getOwnerById(aId: number): Observable<OwnerEntity> {
    return this.httpClient.get<OwnerEntity>(`/api/users/${aId}`)
  }
  createOwner(aLastName: string, aFirstName: string, aMiddleName: string, aCars: CarEntity[]): Observable<OwnerEntity> {
    return this.httpClient.post<OwnerEntity>('/api/users', {
      surname: aLastName,
      name: aFirstName,
      patronymic: aMiddleName,
      cars: aCars
    })
  }
  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    return this.httpClient.put<OwnerEntity>(`/api/users/${aOwner.id}`, aOwner)
  }
  deleteOwner(aOwnerId: number): Observable<OwnerEntity[]> {
    return this.httpClient.delete<OwnerEntity[]>(`/api/users/${aOwnerId}`)
  }

}
