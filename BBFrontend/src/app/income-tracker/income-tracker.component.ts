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

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  years: number[] = [2023, 2024, 2025]; // Add more years as needed
  selectedMonth: string = this.months[new Date().getMonth()]; // Default to current month
  selectedYear: number = new Date().getFullYear(); // Default to current year

  tempIncome: number = this.currentInc;
  tempFoodAllocation: number = this.foodAllocation;
  tempRentAllocation: number = this.rentAllocation;
  tempBillsAllocation: number = this.billsAllocation;
  tempOtherAllocation: number = this.otherAllocation;

  isEditingFood: boolean = false;
  isEditingRent: boolean = false;
  isEditingBills: boolean = false;
  isEditingOther: boolean = false;

  constructor() {}

  resetAllocations() {
    // Reset allocations to zero
    this.foodAllocation = 0;
    this.rentAllocation = 0;
    this.billsAllocation = 0;
    this.otherAllocation = 0;
    // Optionally reset the currentInc if you have different budgets for different months
    // this.currentInc = this.getMonthlyBudget(this.selectedMonth, this.selectedYear);
  }
  get remainingBudget(): number {
    return this.currentInc - (this.foodAllocation + this.rentAllocation + this.billsAllocation + this.otherAllocation);
  }

  getMonthlyBudget(month: string, year: number): number {
    // Implement logic to retrieve the preset budget for the selected month and year
    return 1000; // Placeholder, adjust accordingly
  }

  updateIncome() {
    this.currentInc = this.tempIncome;
  }

  updateFoodAllocation() {
    this.foodAllocation = this.tempFoodAllocation;
    this.isEditingFood = false;
  }

  updateRentAllocation() {
    this.rentAllocation = this.tempRentAllocation;
    this.isEditingRent = false;
  }

  updateBillsAllocation() {
    this.billsAllocation = this.tempBillsAllocation;
    this.isEditingBills = false;
  }

  updateOtherAllocation() {
    this.otherAllocation = this.tempOtherAllocation;
    this.isEditingOther = false;
  }

  logout() {
    // Placeholder logout functionality
  }

  editFoodAllocation() {
    this.isEditingFood = !this.isEditingFood;
    if (this.isEditingFood) {
      this.tempFoodAllocation = this.foodAllocation;
    }
  }

  editRentAllocation() {
    this.isEditingRent = !this.isEditingRent;
    if (this.isEditingRent) {
      this.tempRentAllocation = this.rentAllocation;
    }
  }

  editBillsAllocation() {
    this.isEditingBills = !this.isEditingBills;
    if (this.isEditingBills) {
      this.tempBillsAllocation = this.billsAllocation;
    }
  }

  editOtherAllocation() {
    this.isEditingOther = !this.isEditingOther;
    if (this.isEditingOther) {
      this.tempOtherAllocation = this.otherAllocation;
    }
  }
}
