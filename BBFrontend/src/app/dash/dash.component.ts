import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { AuthService } from '../login/auth/auth.service';
import { User, UpdateUserDto } from '../Services/user.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  user: User | null = null;
  
  // Editing states
  editingField: 'savings' | 'monthlyInc' | 'emgfund' | 'debt' | null = null;
  editedValue: number = 0;

  constructor(
    private userService: UserService, 
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    const userId = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('access_token');
    
    if (token && userId) {
      try {
        this.user = await this.userService.getUserById(Number(userId), token);
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    }
  }

  logout(): void {
    this.authService.logout();
  }

  startEditing(field: 'savings' | 'monthlyInc' | 'emgfund' | 'debt'): void {
    if (this.user) {
      this.editingField = field;
      this.editedValue = this.user[field];
    }
  }

  async saveEdit(field: 'savings' | 'monthlyInc' | 'emgfund' | 'debt'): Promise<void> {
    if (!this.user || !this.editingField) return;
  
    try {
      const token = sessionStorage.getItem('access_token');
      if (!token) {
        throw new Error('No authentication token');
      }
  
      const updateDto: UpdateUserDto = {
        [field]: this.editedValue
      };
  
      const updatedUser = await this.userService.updateUser(
        this.user.id.toString(), 
        updateDto, 
        token
      );
  
      this.user = updatedUser;
      
      this.editingField = null;
    } catch (error) {
      console.error('Failed to update user', error);
    }
  }

  cancelEdit(): void {
    this.editingField = null;
  }
}