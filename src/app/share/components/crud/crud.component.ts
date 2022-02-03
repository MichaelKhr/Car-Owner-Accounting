import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OwnerEntity, CarOwnerAccountingService, CarEntity } from '../../servises/car-owner-accounting.service';
import { isRepeatNumber } from '../../servises/car-owner.validator';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit, OnDestroy {

  public userForm!: FormGroup
  public cars!: FormArray
  public userNow!: OwnerEntity

  public updateMode: boolean | Number = false;
  public createMode: boolean = false;
  public readMode: boolean = false;
  public repeatCar: boolean = false;

  private subParams!: Subscription
  private subCreate!: Subscription
  private subEdit!: Subscription

  constructor(
    public carOwnersServ: CarOwnerAccountingService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.subParams = this.activatedRoute.params.subscribe((par: Params) => {
      switch (par['mode']) {
        case 'create':
          this.createMode = true;
          break;
        case 'update':
          this.updateMode = +par['id'];
          break;
        case 'read':
          this.readMode = true;
          break;
        default:
          this.router.navigate([''])
          break;
      }

      this.createForm()

      if (this.carOwnersServ.users && par['id'] !== 'new') {
        let user: OwnerEntity[] = this.carOwnersServ.users.filter(item => item.id == par['id'])
        this.userNow = user[0]
        for (let i = 2; i <= this.userNow.cars.length; i++) {
          this.addAuto()
        }
      }
    })

    this.userForm.patchValue(this.userNow)

  }

  createForm() {
    this.userForm = this.formBuilder.group({
      surname: this.formBuilder.control({ value: '', disabled: this.readMode }, [
        Validators.required, Validators.pattern(/\D/g)
      ]),
      name: this.formBuilder.control({ value: '', disabled: this.readMode }, [
        Validators.required, Validators.pattern(/\D/g)
      ]),
      patronymic: this.formBuilder.control({ value: '', disabled: this.readMode }, [
        Validators.required, Validators.pattern(/\D/g)
      ]),
      cars: this.formBuilder.array([this.createAuto()])
    })
  }

  isRepeatCar() {
    return this.userForm.value.cars.map((itemMap: CarEntity, iMap: number) => {
      return this.userForm.value.cars.some((valueSome: CarEntity, iSome: number) => {
        if (iMap === iSome) {
          return false
        } else
          if (itemMap.num === valueSome.num) {
            return true
          } else {
            return false
          }
      })

    }).filter((i: boolean) => i)
  }

  saveUser() {

    if (this.isRepeatCar().length) {
      this.repeatCar = true

    } else {
      if (this.createMode) {
        this.subCreate = this.carOwnersServ.createOwner(this.userForm.value.surname, this.userForm.value.name, this.userForm.value.patronymic, this.userForm.value.cars).subscribe(() => {
          this.router.navigate([''])
        }
        )
      } else {
        this.userForm.value['id'] = this.updateMode

        this.subEdit = this.carOwnersServ.editOwner(this.userForm.value).subscribe(() => {
          this.router.navigate([''])
        })
      }
    }

  }

  createAuto(): FormGroup {
    return this.formBuilder.group({
      num: this.formBuilder.control({ value: '', disabled: this.readMode }, [
        Validators.required, Validators.pattern(/[A-Z][A-Z]\d\d\d\d[A-Z][A-Z]/)
      ], [
        isRepeatNumber.bind(this)
      ]),
      car_make: this.formBuilder.control({ value: '', disabled: this.readMode }, [
        Validators.required
      ]),
      car_model: this.formBuilder.control({ value: '', disabled: this.readMode }, [
        Validators.required
      ]),
      year: this.formBuilder.control({ value: '', disabled: this.readMode }, [
        Validators.required, Validators.min(1990), Validators.max(+(new Date().getFullYear()))
      ])
    })
  }

  addAuto(): void {
    (this.userForm.get('cars') as FormArray).push(this.createAuto());

  }

  removeCar(i: number): void {
    (this.userForm.get('cars') as FormArray).removeAt(i)
  }

  fixBug() {
    return ((<FormArray>this.userForm.get('cars'))['controls'])
  }

  ngOnDestroy() {
    if (this.subParams) {
      this.subParams.unsubscribe()
    }
    if (this.subCreate) {
      this.subCreate.unsubscribe()
    }
    if (this.subEdit) {
      this.subEdit.unsubscribe()
    }
  }


}
