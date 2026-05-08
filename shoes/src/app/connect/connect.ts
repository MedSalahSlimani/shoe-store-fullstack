// src/app/connect/connect.ts

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Compte } from '../model/compte.model';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connect',
  imports: [FormsModule, CommonModule],
  templateUrl: './connect.html',
  styleUrl: './connect.css',
})
export class Connect {
  unUser = new Compte();
  erreur: boolean = false;
  loading: boolean = false;

  constructor(private au: Auth, private r: Router) {}

  async logon() {
    this.loading = true;
    this.erreur = false;
    
    console.log('Tentative de connexion : ' + this.unUser.email);
    
    const success = await this.au.connect(this.unUser);
    
    if (success) {
      console.log('✅ Connexion réussie, redirection...');
      // Forcer la mise à jour du menu avant de naviguer
      setTimeout(() => {
        this.r.navigate(['/list-shoes']);
      }, 100);
    } else {
      this.erreur = true;
      this.loading = false;
    }
  }

  reset() {
    this.erreur = false;
  }
}