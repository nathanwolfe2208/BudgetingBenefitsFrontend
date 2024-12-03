import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';



export interface Strategy {
  id: number,
  userID: number;
  totalIncome: number;
  foodAllocation: number;
  rentAllocation: number;
  billsAllocation: number;
  otherAllocation: number;
  
}

export interface UpdateStrategyDTO {
  totalIncome?: number;
  foodAllocation?: number;
  rentAllocation?: number;
  billsAllocation?: number;
  otherAllocation?: number;
}

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private apiUrl = 'http://localhost:3000/strategy';

  constructor(private http: HttpClient) { }

  async getStrategybyID(id: number, token: string): Promise<Strategy> {
    return firstValueFrom(this.http.get<Strategy>(`${this.apiUrl}/${id}`, { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }) }));
  }

  async updateStrategy(strategyId: number, strategyData: Partial<UpdateStrategyDTO>, token: string): Promise<Strategy> {
    return firstValueFrom(
      this.http.patch<Strategy>(`${this.apiUrl}/${strategyId}`, strategyData, {
      })
    );
  }
}
