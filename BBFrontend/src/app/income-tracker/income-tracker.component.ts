import { Component } from '@angular/core';

@Component({
  selector: 'app-income-tracker',
  templateUrl: './income-tracker.component.html',
  styleUrl: './income-tracker.component.css'
})
export class IncomeTrackerComponent {


  currentInc: number = 0;
  foodAllocation: number = 0;
  rentAllocation: number = 0;
  billsAllocation: number = 0;
  otherAllocation: number = 0;

  constructor() {}

  editFoodAllocation(){}
  editIncome(){}
  logout(){}
  editRentAllocation(){}
  editBillsAllocation(){}
  editOtherAllocation(){}


}
