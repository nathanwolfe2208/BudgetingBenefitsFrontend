import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  monthlyInc: number;
  debt: number;
  emgfund: number;
  savings: number;
}

export interface UpdateUserDto {
  savings?: number;
  monthlyInc?: number;
  emgfund?: number;
  debt?: number;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user';


  constructor(private http: HttpClient) { }

  

  async getUserById(id: number, token: string): Promise<User> {
    return firstValueFrom(this.http.get<User>(`${this.apiUrl}/${id}`, { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }) }));
  }

  async updateUser(
    userId: string, userData: Partial<UpdateUserDto>, token: string): Promise<User> {
    return firstValueFrom(
      this.http.patch<User>(`${this.apiUrl}/${userId}`, userData, { headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }) }));
  }



}
