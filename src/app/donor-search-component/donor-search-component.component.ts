import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DonorService } from '../service/donor-service.service';
import { TokenService } from '../token-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-donor-search-component',
  templateUrl: './donor-search-component.component.html',
  styleUrls: ['./donor-search-component.component.scss']
})
export class DonorSearchComponentComponent implements OnInit {

  searchForm: FormGroup;
  donors: any[] = [];
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private donorService: DonorService,
    private tokenService: TokenService
  ) {
    this.searchForm = this.fb.group({
      city: ['', Validators.required],
      bloodGroup: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  searchDonors(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { city, bloodGroup } = this.searchForm.value;

    // Fetch token and call the donor search API
    this.tokenService.getAccessToken().subscribe(
      (tokenResponse) => {
        const token = tokenResponse.access_token;

        this.donorService.getDonorsByCityAndBloodGroup(city, bloodGroup, token).subscribe(
          (response) => {
            this.donors = response;
            this.isLoading = false;
          },
          (error) => {
            this.isLoading = false;
            console.error('Error fetching donors:', error);
            Swal.fire({
              title: 'Error',
              text: 'Failed to fetch donors. Please try again later.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        );
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching token:', error);
        Swal.fire({
          title: 'Token Error',
          text: 'Failed to retrieve access token. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}
