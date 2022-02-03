import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarOwnerAccountingService, OwnerEntity } from '../../servises/car-owner-accounting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public selectedOwner!: OwnerEntity

  private subForOwners!: Subscription


  constructor(
    public carOwnersServ: CarOwnerAccountingService
  ) { }

  ngOnInit(): void {
    this.carOwnersServ.getOwners().subscribe(data => {
      this.carOwnersServ.users = data
    })
  }


  deleteUser() {
    this.carOwnersServ.deleteOwner(this.selectedOwner.id!).subscribe(() => {
      this.ngOnInit()
    })
  }

  ngOnDestroy(): void {
    if (this.subForOwners) {
      this.subForOwners.unsubscribe()
    }
  }

}
