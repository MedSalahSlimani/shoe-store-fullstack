import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Compte } from '../model/compte.model';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:8080/api/auth';

  // Propriétés accessibles dans le menu
  userCourant: string = '';
  isConnected: boolean = false;
  roleCourant: string = '';

  constructor(private router: Router) {
    // Initialise l'état à partir du localStorage au démarrage
    this.initFromStorage();
  }

  /**
   * Méthode de connexion (async/await)
   * Appelée depuis connect.ts
   */
  async connect(compte: Compte): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: compte.email,
          password: compte.mot2pass
        })
      });

      if (!response.ok) {
        console.error('Erreur HTTP:', response.status);
        return false;
      }

      const data = await response.json();

      if (data.token) {
        // Sauvegarde dans localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);

        // Mise à jour des propriétés réactives
        this.userCourant = data.username;
        this.roleCourant = data.role;
        this.isConnected = true;

        console.log(`✅ Connexion réussie : ${data.username} (${data.role})`);
        return true;
      }

      return false;
    } catch (error) {
      console.error('❌ Erreur de connexion:', error);
      return false;
    }
  }

  /**
   * Vérifie si l'utilisateur a le rôle ADMIN
   */
  testerAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'ADMIN';
  }

  /**
   * Vérifie si un token existe
   */
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  /**
   * Déconnexion : vide le localStorage et reset les propriétés
   */
  disconnect(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');

    this.userCourant = '';
    this.roleCourant = '';
    this.isConnected = false;

    console.log('🔓 Déconnexion effectuée');
    this.router.navigate(['/connect']);
  }

  /**
   * Récupère le token JWT
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Récupère le rôle
   */
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  /**
   * Récupère le nom d'utilisateur
   */
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  /**
   * Initialise les propriétés depuis le localStorage
   * À appeler au démarrage de l'app
   */
  initFromStorage(): void {
    this.isConnected = this.isLoggedIn();
    this.userCourant = this.getUsername() || '';
    this.roleCourant = this.getRole() || '';
    console.log(`🔄 État restauré : connecté=${this.isConnected}, rôle=${this.roleCourant}`);
  }
}