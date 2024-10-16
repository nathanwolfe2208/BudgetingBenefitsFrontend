import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-income',
  templateUrl: './manage-income.component.html',
  styleUrls: ['./manage-income.component.css']
})
export class ManageIncomeComponent {
  selectedMonth: string = ''; // Initialize to an empty string
  months = [
    { name: 'January', value: 'January' },
    { name: 'February', value: 'February' },
    // Add other months...
  ];
  
  budgetFields: Array<{ name: string; estimatedExpense: number; actualExpense: number }> = [];
  currentIncome: number = 5000; // Example data
  recommendedBudget: number = 3000; // Example data
  currentSavings: number = 1000; // Example data
  remainingBudget: number = this.recommendedBudget; // Example calculation
  additionalSavings: number = 0; // Initialize to 0
  dipIntoSavingsAmount: number = 0; // Change name to avoid conflict

  addBudgetField() {
    const fieldName = prompt('Enter the name for the new field:');
    if (fieldName) {
      const formattedName = fieldName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      this.budgetFields.push({ name: formattedName, estimatedExpense: 0, actualExpense: 0 });
    }
  }

  addToSavings() {
    if (this.additionalSavings) {
      this.currentSavings += this.additionalSavings;
      this.additionalSavings = 0; // Reset input
    }
  }

  dipIntoSavings() {
    if (this.dipIntoSavingsAmount) {
      this.currentSavings -= this.dipIntoSavingsAmount;
      this.dipIntoSavingsAmount = 0; // Reset input
    }
  }

  submitBudget() {
    // Logic for submitting budget, e.g., API call to save data
    console.log('Budget submitted', this.budgetFields);
  }
}
