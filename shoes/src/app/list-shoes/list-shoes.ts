// src/app/list-shoes/list-shoes.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shoes } from '../services/shoes';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-list-shoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-shoes.html',
  styleUrls: ['./list-shoes.css']
})
export class ListShoesComponent implements OnInit {
  shoes: Product[] = [];
  loading = true;
  errorMessage = '';

  constructor(private shoeService: Shoes) { }

  ngOnInit() {
    this.loadShoes();
  }

  loadShoes() {
    this.shoeService.listProd().subscribe({
      next: (data) => {
        this.shoes = data;
        this.loading = false;
        console.log('✅ Chaussures chargées:', this.shoes);
      },
      error: (err) => {
        this.errorMessage = 'Erreur de chargement des chaussures';
        this.loading = false;
        console.error('❌ Erreur API:', err);
      }
    });
  }

  deleteShoe(id: number) {
    if (confirm('Supprimer cette chaussure ?')) {
      this.shoeService.delProd(id).subscribe({
        next: () => {
          this.loadShoes(); // Recharge la liste après suppression
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
        }
      });
    }
  }
}