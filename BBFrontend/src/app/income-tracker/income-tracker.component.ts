import { Component } from '@angular/core';

@Component({
  selector: 'app-income-tracker',
  templateUrl: './income-tracker.component.html',
  styleUrls: ['./income-tracker.component.css']
})
export class IncomeTrackerComponent {

  currentInc: number = 1000; // Example monthly income
  foodAllocation: number = 0;
  rentAllocation: number = 0;
  billsAllocation: number = 0;
  otherAllocation: number = 0;

  tempIncome: number = this.currentInc;
  tempFoodAllocation: number = this.foodAllocation;
  tempRentAllocation: number = this.rentAllocation;
  tempBillsAllocation: number = this.billsAllocation;
  tempOtherAllocation: number = this.otherAllocation;

  constructor() {}

  get remainingBudget(): number {
    return this.currentInc - (this.foodAllocation + this.rentAllocation + this.billsAllocation + this.otherAllocation);
  }

  updateIncome() {
    this.currentInc = this.tempIncome;
  }

  updateFoodAllocation() {
    this.foodAllocation = this.tempFoodAllocation;
  }

  updateRentAllocation() {
    this.rentAllocation = this.tempRentAllocation;
  }

  updateBillsAllocation() {
    this.billsAllocation = this.tempBillsAllocation;
  }

  updateOtherAllocation() {
    this.otherAllocation = this.tempOtherAllocation;
  }

  logout() {
    // Placeholder logout functionality
  }

  editIncome() {
    // Placeholder edit income functionality
  }

  editFoodAllocation() {
    // Placeholder edit food allocation functionality
  }

  editRentAllocation() {
    // Placeholder edit rent allocation functionality
  }

  editBillsAllocation() {
    // Placeholder edit bills allocation functionality
  }

  editOtherAllocation() {
    // Placeholder edit other allocation functionality
  }
}
