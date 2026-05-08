import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Shoes } from '../services/shoes';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-add-shoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-shoes.html',
  styleUrls: ['./add-shoes.css']
})
export class AddShoesComponent {
  newProd: Product = {
    id: 0,
    marque: '',
    modele: '',
    description: '',
    taille: 0,
    couleur: '',
    codeBarres: '',
    poids: 0,
    dateSortie: new Date(),
    prix: 0,
    promo: null,
    disponible: true
  };

  constructor(private shoeService: Shoes, private router: Router) { }

  addProduct() {
    this.shoeService.addProd(this.newProd).subscribe({
      next: () => {
        console.log('✅ Produit ajouté');
        this.router.navigate(['/list-shoes']);
      },
      error: (err) => console.error('❌ Erreur:', err)
    });
  }
}