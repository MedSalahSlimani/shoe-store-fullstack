// src/app/model/product.model.ts
export interface Product {
  id: number;
  marque: string;
  modele: string;        // ← au lieu de "model"
  description: string;   // ← au lieu de "desc"
  taille: number;        // ← au lieu de "taill"
  couleur: string;       // ← au lieu de "Couleur"
  codeBarres: string;    // ← au lieu de "codeBar"
  poids: number;
  dateSortie: Date;      // ← au lieu de "Date_sortie"
  prix: number;
  promo?: number | null; // ← nouveau champ
  disponible: boolean;   // ← au lieu de "dispo"
}