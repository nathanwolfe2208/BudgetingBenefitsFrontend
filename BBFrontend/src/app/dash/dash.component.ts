import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UserService, User } from '../Services/user.service';
import { AuthService } from '../login/auth/auth.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css'
})
export class DashComponent implements OnInit{

  constructor(private userService: UserService, private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) {}

  user: User | null = null;

  async ngOnInit(): Promise<void> {

      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('access_token');
      
      if(token && userId){
        this.user = await this.userService.getUserById(Number(userId), token);
      }
        
  }

}
