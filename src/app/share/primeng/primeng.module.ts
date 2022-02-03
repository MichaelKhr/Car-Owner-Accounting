import { NgModule } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


const PrimeNg = [
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  ProgressSpinnerModule
]

@NgModule({
  imports: [PrimeNg],
  exports: [PrimeNg]
})
export class PrimengModule { }
