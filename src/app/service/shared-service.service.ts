// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private bloodRequestSubmitted = new BehaviorSubject<boolean>(false);
  bloodRequestSubmitted$ = this.bloodRequestSubmitted.asObservable();

  setBloodRequestSubmitted(status: boolean): void {
    this.bloodRequestSubmitted.next(status);
  }
}
