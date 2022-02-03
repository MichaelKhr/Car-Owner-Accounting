import { AbstractControl, FormControl } from "@angular/forms";
import { map, Observable, of, tap } from "rxjs";
import { CarEntity, OwnerEntity } from "./car-owner-accounting.service";



export function isRepeatNumber(control: AbstractControl): Promise<{ [key: string]: boolean } | null> | Observable<{ [key: string]: boolean } | null> {

    if (this.updateMode && this.userNow) {
        if (this.userNow.cars.some((val: CarEntity) => val.num === control.value)) {
            return of(null)
        }
    }

    if (control.value) {
        return this.carOwnersServ.getOwners().pipe(
            map((parentItem: OwnerEntity[], i) => {
                return parentItem.map((childI, i) => {
                    return childI.cars.some(value => value.num === control.value)
                }).filter(value => value)

            }),
            tap((response: boolean[]) => {
                return response.length ? { 0: true } : null
            })
        )
    } else {
        return of(null)
    }

}
