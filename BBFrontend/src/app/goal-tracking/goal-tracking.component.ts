import { Component, OnInit } from '@angular/core';
import { GoalService, Goal, CreateGoalDto } from '../Services/goal.service';
import { AuthService } from '../login/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goal-tracking',
  templateUrl: './goal-tracking.component.html',
  styleUrls: ['./goal-tracking.component.css']
})
export class GoalTrackingComponent implements OnInit {
  goals: Goal[] = [];
  isLoading: boolean = true;
  totalSavings: number = 0;
  showEditSavingsModal = false;
  selectedGoal: Goal | null = null;
  editedAmountSaved: number = 0;
  showAddModal: boolean = false;
  newGoal = {
    title: '',
    userId: 0,
    amount: null as number | null,
    amountSaved: 0
  };

  constructor(
    public goalService: GoalService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const userId = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('access_token');
  
    if (!token || !userId) {
      return;
    }
  
    this.goals = await this.goalService.getGoalsByUserId(
      Number(userId), 
      token
    );

    console.log(this.goals);
  
    this.totalSavings = this.goalService.calculateTotalSavings(this.goals);
  }

  openEditSavingsModal(goal: Goal): void {
    console.log('Opening modal for goal:', goal);
    this.selectedGoal = goal;
    this.editedAmountSaved = goal.amountSaved;
    this.showEditSavingsModal = true;
  }

  openAddModal(): void {
    this.newGoal = {
      title: '',
      userId: 0,
      amount: null,
      amountSaved: 0
    };
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  closeEditSavingsModal(): void {
    this.showEditSavingsModal = false;
    this.selectedGoal = null;
    this.editedAmountSaved = 0;
  }

  async submitNewGoal(): Promise<void> {
    try {
      const userId = Number(sessionStorage.getItem('id'));
      const token = sessionStorage.getItem('access_token');

      if (!token) {
        // Handle no token scenario
        return;
      }

      // Validate input
      if (!this.newGoal.title || !this.newGoal.amount) {
        // Show error message
        return;
      }

      const goalData = {
        title: this.newGoal.title,
        userId: userId,
        amount: this.newGoal.amount,
        amountSaved: this.newGoal.amountSaved
      };

      const createdGoal = await this.goalService.createGoal(
        userId, 
        goalData, 
        token
      );

      // Add to goals array
      this.goals.push(createdGoal);

      // Update total savings
      this.totalSavings += createdGoal.amountSaved;

      // Close modal
      this.closeAddModal();
    } catch (error) {
      console.error('Failed to create goal', error);
      // Handle error (show error message)
    }
  }

  async updateSavedAmount(): Promise<void> {
    const userId = Number(sessionStorage.getItem('id'));
    const token = sessionStorage.getItem('access_token');

    if (!this.selectedGoal) return;
    if (!token) return;
    

    try {
      
      const updateData = {
        amountSaved: this.editedAmountSaved
      };

      if(token){}
        const updatedGoal = await this.goalService.updateGoal(
          this.selectedGoal.id, 
          updateData,
          token
        );

      
      const index = this.goals.findIndex(g => g.id === updatedGoal.id);
      if (index !== -1) {
        this.goals[index] = updatedGoal;
      }

      
      this.closeEditSavingsModal();

      
      console.log('Savings updated successfully');
    } catch (error) {
      console.error('Failed to update savings', error);
      alert('Failed to update savings');
    }
  }

  async deleteGoal(goalId: number): Promise<void> {
    const token = sessionStorage.getItem('access_token');

    if (!token) {
      return;
    }

    await this.goalService.deleteGoal(goalId, token);

    this.goals = this.goals.filter(g => g.id !== goalId);
    this.totalSavings = this.goalService.calculateTotalSavings(this.goals);
  }

}