package com.shoestore.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "shoes")
public class Shoe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String marque;
    private String modele;

    @Column(columnDefinition = "TEXT")
    private String description;

    private int taille;
    private String couleur;
    private String codeBarres;
    private int poids;
    private LocalDate dateSortie;
    private double prix;
    private Double promo;
    private boolean disponible;

    public Shoe() {}

    public Shoe(Long id, String marque, String modele, String description,
                int taille, String couleur, String codeBarres, int poids,
                LocalDate dateSortie, double prix, Double promo, boolean disponible) {
        this.id = id;
        this.marque = marque;
        this.modele = modele;
        this.description = description;
        this.taille = taille;
        this.couleur = couleur;
        this.codeBarres = codeBarres;
        this.poids = poids;
        this.dateSortie = dateSortie;
        this.prix = prix;
        this.promo = promo;
        this.disponible = disponible;
    }

    // Getters
    public Long getId() { return id; }
    public String getMarque() { return marque; }
    public String getModele() { return modele; }
    public String getDescription() { return description; }
    public int getTaille() { return taille; }
    public String getCouleur() { return couleur; }
    public String getCodeBarres() { return codeBarres; }
    public int getPoids() { return poids; }
    public LocalDate getDateSortie() { return dateSortie; }
    public double getPrix() { return prix; }
    public Double getPromo() { return promo; }
    public boolean isDisponible() { return disponible; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setMarque(String marque) { this.marque = marque; }
    public void setModele(String modele) { this.modele = modele; }
    public void setDescription(String description) { this.description = description; }
    public void setTaille(int taille) { this.taille = taille; }
    public void setCouleur(String couleur) { this.couleur = couleur; }
    public void setCodeBarres(String codeBarres) { this.codeBarres = codeBarres; }
    public void setPoids(int poids) { this.poids = poids; }
    public void setDateSortie(LocalDate dateSortie) { this.dateSortie = dateSortie; }
    public void setPrix(double prix) { this.prix = prix; }
    public void setPromo(Double promo) { this.promo = promo; }
    public void setDisponible(boolean disponible) { this.disponible = disponible; }
}