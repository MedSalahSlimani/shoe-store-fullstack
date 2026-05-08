// src/app/services/shoes.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product.model';

/**
 * Angular service to communicate with the Spring Boot backend.
 * Base URL: http://localhost:8080/api/shoes
 */
@Injectable({
  providedIn: 'root',
})
export class Shoes {
  /** Base API endpoint */
  private readonly apiUrl = 'http://localhost:8080/api/shoes';

  /** Static list of known brands – used for UI dropdowns */
  private readonly tab_marq: string[] = ['Nike', 'Adidas', 'Hoka', 'New Balance', 'Puma', 'Asics'];

  constructor(private http: HttpClient) {}

  // ------------------- CRUD -------------------
  /** GET all shoes */
  listProd(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  /** GET a shoe by its identifier */
  getProdById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  /** POST a new shoe */
  addProd(prod: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, prod);
  }

  /** PUT update an existing shoe */
  editProd(id: number, prod: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, prod);
  }

  /** DELETE a shoe */
  delProd(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ------------------- FILTERS (client‑side) -------------------
  /** Filter shoes by brand */
  getProdByMarque(marque: string): Observable<Product[]> {
    return this.listProd().pipe(
      map(products => products.filter(p => p.marque === marque))
    );
  }

  /** Return only shoes that are marked as available */
  getProdDisponibles(): Observable<Product[]> {
    return this.listProd().pipe(
      map(products => products.filter(p => p.disponible))
    );
  }

  /** Return shoes that are on promotion (promo > 0) */
  getProdPromo(): Observable<Product[]> {
    return this.listProd().pipe(
      map(products => products.filter(p => p.promo != null && p.promo > 0))
    );
  }

  /** Filter shoes by size */
  getProdByTaille(taille: number): Observable<Product[]> {
    return this.listProd().pipe(
      map(products => products.filter(p => p.taille === taille))
    );
  }

  /** Search shoes by model name (client‑side) */
  chercherParModel(modele: string): Observable<Product[]> {
    const lower = modele.toLowerCase();
    return this.listProd().pipe(
      map(products => products.filter(p => p.modele.toLowerCase().includes(lower)))
    );
  }

  // ------------------- STATIC HELPERS -------------------
  /** List of all brands */
  listMarque(): string[] {
    return this.tab_marq;
  }

  /** Number of known brands */
  getNbMarque(): number {
    return this.tab_marq.length;
  }
}