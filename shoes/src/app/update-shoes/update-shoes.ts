import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Shoes } from '../services/shoes';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-update-shoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-shoes.html',
  styleUrls: ['./update-shoes.css']
})
export class UpdateShoesComponent implements OnInit {
  prodCourant: Product = {
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

  tab_marq: string[] = ['Nike', 'Adidas', 'Hoka', 'New Balance', 'Puma', 'Asics'];

  constructor(
    private s: Shoes,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.s.getProdById(id).subscribe({
        next: (data) => {
          this.prodCourant = data;
        },
        error: (err) => console.error(err)
      });
    }
  }

  updateProduct() {
    if (this.prodCourant.id) {
      this.s.editProd(this.prodCourant.id, this.prodCourant).subscribe({
        next: () => {
          console.log('✅ Produit modifié');
          this.router.navigate(['/list-shoes']);
        },
        error: (err) => console.error(err)
      });
    }
  }

  // ✅ AJOUTER CETTE MÉTHODE
  goBack() {
    this.router.navigate(['/list-shoes']);
  }
}