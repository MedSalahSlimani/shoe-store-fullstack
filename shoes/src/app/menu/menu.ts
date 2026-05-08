// src/app/menu/menu.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
 // styleUrls: ['./menu.css']
})
export class Menu implements OnInit {
  constructor(public au: Auth, private router: Router) {}
  
  ngOnInit() {
    this.au.initFromStorage();
  }

  disconnect(): void {
    console.log('Déconnexion...');
    this.au.disconnect();
    // Attendre un peu avant de naviguer
    setTimeout(() => {
      this.router.navigate(['/connect']).catch(err => {
        console.error('Erreur navigation:', err);
        // Force redirect si router échoue
        window.location.href = '/connect';
      });
    }, 100);
  }
}