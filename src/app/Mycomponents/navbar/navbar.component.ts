// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AuthService } from '../../auth.service';
// import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss']
// })
// export class NavbarComponent implements OnInit, OnDestroy {
//   isLoggedIn = false;
//   private authSubscription!: Subscription;

//   constructor(private authService: AuthService, private router: Router) {}

//   ngOnInit(): void {
//     // Subscribe to login status changes
//     this.authSubscription = this.authService.loggedIn$.subscribe(status => {
//       this.isLoggedIn = status; // Update isLoggedIn based on authService's loggedIn$ observable
//     });
//   }

//   ngOnDestroy(): void {
//     // Clean up the subscription when the component is destroyed
//     if (this.authSubscription) {
//       this.authSubscription.unsubscribe();
//     }
//   }

//   logout(): void {
//     this.authService.clearToken(); // Clear the token on logout
//     this.router.navigate(['/home']); // Redirect to home after logout
//   }
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../../service/shared-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  bloodRequestSubmitted = false;
  private authSubscription!: Subscription;
  private bloodRequestSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.loggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.bloodRequestSubscription = this.sharedService.bloodRequestSubmitted$.subscribe((status) => {
      this.bloodRequestSubmitted = status;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.bloodRequestSubscription) {
      this.bloodRequestSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.clearToken();
    this.router.navigate(['/home']);
  }
}
