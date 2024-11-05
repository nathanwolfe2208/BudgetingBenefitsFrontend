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
}
