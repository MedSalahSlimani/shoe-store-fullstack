// src/app/guard/gshoes-guard.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class GShoesGuard {
  constructor(private au: Auth, private router: Router) {}

  canActivate(): boolean {
    if (this.au.testerAdmin()) {
      return true;
    }
    this.router.navigate(['/forbidden']);
    return false;
  }
}