import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId: string | null = null;
  profileData: any = null;

  constructor(
    private jwtService: JwtService,
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeUserId();
  
  }

  private initializeUserId(): void {
    this.userId = this.authService.getUserId();

    if (this.userId) {
      this.fetchProfileData(this.userId);
    } else {
      this.showError('User ID is missing!');
    }
  }

  private fetchProfileData(userId: string): void {
    this.jwtService.getProfileData(userId).subscribe({
      next: (response) => {
        this.profileData = response;
        console.log('Profile Data:', this.profileData);
      },
      error: () => this.showError('Failed to fetch profile data. Please try again later.'),
    });
  }

  private showError(message: string): void {
    console.error(message);
    // Optionally, navigate to an error page or show a toast message
  }
}
