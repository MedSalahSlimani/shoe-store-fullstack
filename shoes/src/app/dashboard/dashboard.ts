import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shoes } from '../services/shoes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {  // ← Nom: DashboardComponent
  nbShoes = 0;
  nbMarques = 0;  // ← nbMarques (pas nbMarque)
  moyPrix = 0;
  nbUsers = 5;    // ← ajouté pour le template

  constructor(private s: Shoes) { }

  ngOnInit() {
    this.s.listProd().subscribe({
      next: (data) => {
        this.nbShoes = data.length;
        const sum = data.reduce((acc, p) => acc + p.prix, 0);
        this.moyPrix = this.nbShoes > 0 ? sum / this.nbShoes : 0;
        this.nbMarques = this.s.getNbMarque();
      },
      error: (err) => console.error(err)
    });
  }
}