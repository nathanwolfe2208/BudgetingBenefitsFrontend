import { Component, OnInit } from '@angular/core';
import { IncomeService } from '../Services/income.service';
import { Strategy } from '../Services/income.service';

@Component({
  selector: 'app-income-tracker',
  templateUrl: './income-tracker.component.html',
  styleUrls: ['./income-tracker.component.css']
})
export class IncomeTrackerComponent implements OnInit {
  strategy: Strategy | null = null;
  
  
  editingField: string | null = null;
  editedValue: number = 0;

  
  currentInc: number = 0;
  foodAllocation: number = 0;
  rentAllocation: number = 0;
  billsAllocation: number = 0;
  otherAllocation: number = 0;

  constructor(
    private incomeService: IncomeService,
  ) { }

  async ngOnInit(): Promise<void> {
    const userId = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('access_token');

    if (token && userId) {
      try {
        this.strategy = await this.incomeService.getStrategybyID(Number(userId), token);
        this.currentInc = this.strategy.totalIncome;
        this.foodAllocation = this.strategy.foodAllocation;
        this.rentAllocation = this.strategy.rentAllocation;
        this.billsAllocation = this.strategy.billsAllocation;
        this.otherAllocation = this.strategy.otherAllocation;
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    }
  }

  
  startEditing(field: string, currentValue: number) {
    this.editingField = field;
    this.editedValue = currentValue;
  }

  
  async saveEdit(field: string) {
    if (!this.strategy) return;

    try {
      const userId = Number(sessionStorage.getItem('id'));
      const token = sessionStorage.getItem('access_token');

      if (!token) {
        console.error('No access token');
        return;
      }

      
      const updatedStrategy = { ...this.strategy };

      switch (field) {
        case 'income':
          updatedStrategy.totalIncome = this.editedValue;
          this.currentInc = this.editedValue;
          break;
        case 'food':
          updatedStrategy.foodAllocation = this.editedValue;
          this.foodAllocation = this.editedValue;
          break;
        case 'rent':
          updatedStrategy.rentAllocation = this.editedValue;
          this.rentAllocation = this.editedValue;
          break;
        case 'bills':
          updatedStrategy.billsAllocation = this.editedValue;
          this.billsAllocation = this.editedValue;
          break;
        case 'other':
          updatedStrategy.otherAllocation = this.editedValue;
          this.otherAllocation = this.editedValue;
          break;
      }

      
      await this.incomeService.updateStrategy(userId, updatedStrategy, token);
      
      
      this.cancelEdit();
    } catch (error) {
      console.error(`Failed to update ${field} allocation`, error);
    }
  }

  
  cancelEdit() {
    this.editingField = null;
    this.editedValue = 0;
  }


  
  get totalAllocated(): number {
    return this.foodAllocation + this.rentAllocation + 
           this.billsAllocation + this.otherAllocation;
  }

  
  get remainingAmount(): number {
    return this.currentInc - this.totalAllocated;
  }
}