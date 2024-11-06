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

  // Temporary values for editing allocations
  tempFoodAllocation: number = 0;
  tempRentAllocation: number = 0;
  tempBillsAllocation: number = 0;
  tempOtherAllocation: number = 0;

  // Flags for edit mode
  isEditingFood: boolean = false;
  isEditingRent: boolean = false;
  isEditingBills: boolean = false;
  isEditingOther: boolean = false;

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  years: number[] = [2023, 2024, 2025];
  selectedMonth: string = this.months[new Date().getMonth()];
  selectedYear: number = new Date().getFullYear();

  // Store allocations by month-year key
  budgetAllocations: { [key: string]: { food: number; rent: number; bills: number; other: number } } = {};
  previousKey: string | null = null;

  constructor() {}

  // Get unique key for the month and year
  getMonthYearKey(): string {
    return `${this.selectedMonth}-${this.selectedYear}`;
  }

  // Reset allocations and load any saved data for the month
  resetAllocations() {
    if (this.previousKey) {
      this.saveAllocations();
    }
    
    const key = this.getMonthYearKey();
    this.previousKey = key;  // Update the previous key

    if (this.budgetAllocations[key]) {
      const savedAllocations = this.budgetAllocations[key];
      this.foodAllocation = savedAllocations.food;
      this.rentAllocation = savedAllocations.rent;
      this.billsAllocation = savedAllocations.bills;
      this.otherAllocation = savedAllocations.other;
    } else {
      // Default allocations if no saved data
      this.foodAllocation = 0;
      this.rentAllocation = 0;
      this.billsAllocation = 0;
      this.otherAllocation = 0;
    }

    // Reset temporary allocations
    this.tempFoodAllocation = this.foodAllocation;
    this.tempRentAllocation = this.rentAllocation;
    this.tempBillsAllocation = this.billsAllocation;
    this.tempOtherAllocation = this.otherAllocation;
  }

  saveAllocations() {
    const key = this.getMonthYearKey();
    this.budgetAllocations[key] = {
      food: this.foodAllocation,
      rent: this.rentAllocation,
      bills: this.billsAllocation,
      other: this.otherAllocation
    };
  }

  // Edit methods for toggling edit mode for each allocation
  editFoodAllocation() {
    this.isEditingFood = true;
    this.tempFoodAllocation = this.foodAllocation;
  }

  editRentAllocation() {
    this.isEditingRent = true;
    this.tempRentAllocation = this.rentAllocation;
  }

  editBillsAllocation() {
    this.isEditingBills = true;
    this.tempBillsAllocation = this.billsAllocation;
  }

  editOtherAllocation() {
    this.isEditingOther = true;
    this.tempOtherAllocation = this.otherAllocation;
  }

  // Update methods for each allocation, calling saveAllocations
  updateFoodAllocation() {
    this.foodAllocation = this.tempFoodAllocation;
    this.isEditingFood = false;
    this.saveAllocations();
  }

  updateRentAllocation() {
    this.rentAllocation = this.tempRentAllocation;
    this.isEditingRent = false;
    this.saveAllocations();
  }

  updateBillsAllocation() {
    this.billsAllocation = this.tempBillsAllocation;
    this.isEditingBills = false;
    this.saveAllocations();
  }

  updateOtherAllocation() {
    this.otherAllocation = this.tempOtherAllocation;
    this.isEditingOther = false;
    this.saveAllocations();
  }

  get remainingBudget(): number {
    return this.currentInc - (this.foodAllocation + this.rentAllocation + this.billsAllocation + this.otherAllocation);
  }

  // Stub for the logout function
  logout() {
    console.log("Logged out");
  }
}
