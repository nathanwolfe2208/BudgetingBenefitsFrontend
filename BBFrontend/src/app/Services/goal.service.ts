import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Goal {
  id: number;
  title: string;
  amount: number;
  amountSaved: number;
  userId: number;
}

export interface CreateGoalDto {
  title: string;
  amount: number;
  amountSaved?: number;
}

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private apiUrl = 'http://localhost:3000/goal';

  constructor(private http: HttpClient) { }

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  async getGoalsByUserId(userId: number, token: string): Promise<Goal[]> {
    return firstValueFrom(
      this.http.get<Goal[]>(`${this.apiUrl}/${userId}`, {
        headers: this.getHeaders(token)
      })
    );
  }

  async createGoal(userId: number, goalData: CreateGoalDto, token: string): Promise<Goal> {
    return firstValueFrom(
      this.http.post<Goal>(`${this.apiUrl}`, {
        ...goalData,
        userId
      }, {
        headers: this.getHeaders(token)
      })
    );
  }

  async updateGoal(goalId: number, goalData: Partial<CreateGoalDto>, token: string): Promise<Goal> {
    return firstValueFrom(
      this.http.patch<Goal>(`${this.apiUrl}/${goalId}`, goalData, {
        headers: this.getHeaders(token)
      })
    );
  }

  async deleteGoal(goalId: number, token: string): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/${goalId}`, {
        headers: this.getHeaders(token)
      })
    );
  }

  calculateGoalProgress(goal: Goal): number {
    return goal.amount > 0 
      ? Math.round((goal.amountSaved / goal.amount) * 100) 
      : 0;
  }

  calculateTotalSavings(goals: Goal[]): number {
    return goals.reduce((total, goal) => total + goal.amountSaved, 0);
  }
}