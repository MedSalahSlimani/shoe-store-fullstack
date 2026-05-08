import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Shoes } from '../services/shoes';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-search-shoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-shoes.html',
  styleUrls: ['./search-shoes.css']
})
export class SearchShoesComponent implements OnInit {  // ← Nom: SearchShoesComponent
  tab_product: Product[] = [];
  searchText = '';
  searchType = 'modele';

  constructor(private s: Shoes) { }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.s.listProd().subscribe(data => {
      this.tab_product = data;
    });
  }

  search() {
    if (!this.searchText.trim()) {
      this.loadAll();
      return;
    }

    if (this.searchType === 'modele') {
      this.s.listProd().subscribe(data => {
        this.tab_product = data.filter(p =>
          p.modele.toLowerCase().includes(this.searchText.toLowerCase())
        );
      });
    } else if (this.searchType === 'marque') {
      this.s.getProdByMarque(this.searchText).subscribe(data => {
        this.tab_product = data;
      });
    } else if (this.searchType === 'taille') {
      this.s.getProdByTaille(Number(this.searchText)).subscribe(data => {
        this.tab_product = data;
      });
    }
  }

  toDisponible(dispo: boolean): string {
    return dispo ? 'Oui' : 'Non';
  }
}