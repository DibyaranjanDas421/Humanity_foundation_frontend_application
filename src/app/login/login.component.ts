// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router'; // Import Router
// import { LoginService, LoginCredentials } from '../service/login-service.service'; 
// import { TokenService } from '../token-service.service';  // Import TokenService
// import { TokenResponse } from '../models/token-response.model';
// import Swal from 'sweetalert2';  // Import SweetAlert2
// import { CookieService } from 'ngx-cookie-service';  // Import CookieService

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup = this.fb.group({
//     userId: ['', Validators.required],
//     password: ['', Validators.required]
//   });

//   isLoading = false;
//   loginError = false;

//   constructor(
//     private fb: FormBuilder,
//     private loginService: LoginService, // Inject LoginService
//     private tokenService: TokenService, // Inject TokenService to get the token
//     private cookieService: CookieService, // Inject CookieService
//     private router: Router // Inject Router
//   ) {}

//   ngOnInit(): void {}

//   onSubmit(): void {
//     if (this.loginForm.valid) {
//       this.isLoading = true;
//       this.loginError = false;

//       const credentials: LoginCredentials = this.loginForm.value;

//       // Step 1: Get the access token using TokenService
//       this.tokenService.getAccessToken().subscribe(
//         (tokenResponse: TokenResponse) => {
//           const token = tokenResponse.access_token; // Assuming the token is in the `access_token` field

//           // Step 2: Call the login API with the token included in the request
//           this.loginService.login(credentials, token).subscribe(
//             response => {
//               this.isLoading = false;
//               console.log('Login successful:', response);

//               // Step 3: Store the token in a cookie for 3 days
//               this.cookieService.set('auth_token', token, { expires: 3, path: '/' });

//               // Step 4: Show success popup using SweetAlert2
//               Swal.fire({
//                 title: 'Login Successful',
//                 text: response.message,  // Using the message from the response (e.g. "Login successful")
//                 icon: 'success',
//                 confirmButtonText: 'OK'
//               }).then(() => {
//                 // Step 5: Redirect to the home route
//                 this.router.navigate(['/home']);
//               });

//             },
//             error => {
//               this.isLoading = false;
//               this.loginError = true;
//               console.error('Login failed:', error);

//               // Handle error (e.g., show error message)
//               Swal.fire({
//                 title: 'Login Failed',
//                 text: 'Invalid username or password', // Customize the error message
//                 icon: 'error',
//                 confirmButtonText: 'Try Again'
//               });
//             }
//           );
//         },
//         error => {
//           this.isLoading = false;
//           this.loginError = true;
//           console.error('Failed to get token:', error);

//           // Show token error popup
//           Swal.fire({
//             title: 'Token Error',
//             text: 'Failed to retrieve access token. Please try again later.',
//             icon: 'error',
//             confirmButtonText: 'OK'
//           });
//         }
//       );
//     } else {
//       this.loginForm.markAllAsTouched();
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router for navigation
import { LoginService, LoginCredentials } from '../service/login-service.service'; 
import { TokenService } from '../token-service.service';  // Import TokenService to get the token
import { TokenResponse } from '../models/token-response.model';
import Swal from 'sweetalert2';  // Import SweetAlert2
import { CookieService } from 'ngx-cookie-service';  // Import CookieService to handle cookies
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  isLoading = false;
  loginError = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService, // Inject LoginService to handle login
    private tokenService: TokenService, // Inject TokenService to get the access token
    private cookieService: CookieService, // Inject CookieService to manage token in cookies
    private router: Router, // Inject Router to navigate after successful login
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = false;
  
      const credentials: LoginCredentials = this.loginForm.value;
  
      // Step 1: Get the access token using TokenService
      this.tokenService.getAccessToken().subscribe(
        (tokenResponse: TokenResponse) => {
          const token = tokenResponse.access_token; // Assuming the token is in `access_token`
  
          // Step 2: Call the login API with the credentials and token
          this.loginService.login(credentials, token).subscribe(
            response => {
              this.isLoading = false;
              console.log('Login successful:', response);
  
              // Step 3: Store the token in a cookie for 3 days and update login status
              this.authService.saveToken(token); // This will update the `isLoggedIn` status
  
              // Step 4: Show success popup using SweetAlert2
              Swal.fire({
                title: 'Login Successful',
                text: response.message, // Assuming response contains a message
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                // Step 5: Redirect to the home route after successful login
                this.router.navigate(['/home']);
              });
            },
            error => {
              this.isLoading = false;
              this.loginError = true;
              console.error('Login failed:', error);
  
              // Step 6: Show error popup
              Swal.fire({
                title: 'Login Failed',
                text: 'Invalid username or password', // Customize this as per your backend response
                icon: 'error',
                confirmButtonText: 'Try Again'
              });
            }
          );
        },
        error => {
          this.isLoading = false;
          this.loginError = true;
          console.error('Failed to get token:', error);
  
          // Show token error popup
          Swal.fire({
            title: 'Token Error',
            text: 'Failed to retrieve access token. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  
}

