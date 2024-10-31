import { Component } from '@angular/core';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  currentInc: number = 0; // Example current income
  remainingBudget: number = 0; // Calculate based on your logic
  foodAllocation: number = 0; // Initial value for food allocation
  rentAllocation: number = 0; // Initial value for rent allocation
  billsAllocation: number = 0; // Initial value for bills allocation
  otherAllocation: number = 0; // Initial value for other allocation

  // Temporary variables for editing
  tempIncome: number = this.currentInc;
  tempFoodAllocation: number = this.foodAllocation;
  tempRentAllocation: number = this.rentAllocation;
  tempBillsAllocation: number = this.billsAllocation;
  tempOtherAllocation: number = this.otherAllocation;

  // Editing states
  isEditingIncome: boolean = false;
  isEditingFood: boolean = false;
  isEditingRent: boolean = false;
  isEditingBills: boolean = false;
  isEditingOther: boolean = false;

  editIncome() {
    this.isEditingIncome = !this.isEditingIncome;
    if (!this.isEditingIncome) {
      // Save income and update remaining budget
      this.currentInc = this.tempIncome;
      this.remainingBudget = this.calculateRemainingBudget(); // Implement this function
    }
  }

  editFoodAllocation() {
    this.isEditingFood = !this.isEditingFood;
    if (!this.isEditingFood) {
      this.foodAllocation = this.tempFoodAllocation;
    }
  }

  editRentAllocation() {
    this.isEditingRent = !this.isEditingRent;
    if (!this.isEditingRent) {
      this.rentAllocation = this.tempRentAllocation;
    }
  }

  editBillsAllocation() {
    this.isEditingBills = !this.isEditingBills;
    if (!this.isEditingBills) {
      this.billsAllocation = this.tempBillsAllocation;
    }
  }

  editOtherAllocation() {
    this.isEditingOther = !this.isEditingOther;
    if (!this.isEditingOther) {
      this.otherAllocation = this.tempOtherAllocation;
    }
  }

  // Function to calculate the remaining budget
  calculateRemainingBudget(): number {
    return this.currentInc - (this.foodAllocation + this.rentAllocation + this.billsAllocation + this.otherAllocation);
  }
}
