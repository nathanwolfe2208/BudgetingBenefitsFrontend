import { Component } from '@angular/core';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  currentInc: number = 5000; // Example current income
  remainingBudget: number = 0; // Will be calculated based on allocations
  foodAllocation: number = 1000; // Initial value for food allocation
  rentAllocation: number = 1500; // Initial value for rent allocation
  billsAllocation: number = 500; // Initial value for bills allocation
  otherAllocation: number = 800; // Initial value for other allocation

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

  // User property to hold user data
  user: { name: string } | null = { name: 'John Doe' }; // Example user data

  constructor() {
    this.remainingBudget = this.calculateRemainingBudget(); // Calculate initial remaining budget
  }

  editIncome() {
    this.isEditingIncome = !this.isEditingIncome;
    if (!this.isEditingIncome) {
      // Save income and update remaining budget
      this.currentInc = this.tempIncome;
      this.remainingBudget = this.calculateRemainingBudget();
    }
  }

  editFoodAllocation() {
    this.isEditingFood = !this.isEditingFood;
    if (!this.isEditingFood) {
      this.foodAllocation = this.tempFoodAllocation;
      this.remainingBudget = this.calculateRemainingBudget(); // Update remaining budget after editing
    }
  }

  editRentAllocation() {
    this.isEditingRent = !this.isEditingRent;
    if (!this.isEditingRent) {
      this.rentAllocation = this.tempRentAllocation;
      this.remainingBudget = this.calculateRemainingBudget(); // Update remaining budget after editing
    }
  }

  editBillsAllocation() {
    this.isEditingBills = !this.isEditingBills;
    if (!this.isEditingBills) {
      this.billsAllocation = this.tempBillsAllocation;
      this.remainingBudget = this.calculateRemainingBudget(); // Update remaining budget after editing
    }
  }

  editOtherAllocation() {
    this.isEditingOther = !this.isEditingOther;
    if (!this.isEditingOther) {
      this.otherAllocation = this.tempOtherAllocation;
      this.remainingBudget = this.calculateRemainingBudget(); // Update remaining budget after editing
    }
  }

  // Function to calculate the remaining budget
  calculateRemainingBudget(): number {
    return this.currentInc - (this.foodAllocation + this.rentAllocation + this.billsAllocation + this.otherAllocation);
  }

  // Logout method
  logout() {
    // Implement your logout logic here
    console.log("User logged out.");
    // You might want to navigate to a login page or clear user data
  }
}
