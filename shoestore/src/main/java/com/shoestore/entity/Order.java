package com.shoestore.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "commandes")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime date;
    private String customerName;
    private String customerEmail;
    private double totalAmount;
    private String status;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderLine> lignes = new ArrayList<>();

    public Order() {}

    // Getters
    public Long getId() { return id; }
    public LocalDateTime getDate() { return date; }
    public String getCustomerName() { return customerName; }
    public String getCustomerEmail() { return customerEmail; }
    public double getTotalAmount() { return totalAmount; }
    public String getStatus() { return status; }
    public List<OrderLine> getLignes() { return lignes; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setDate(LocalDateTime date) { this.date = date; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
    public void setStatus(String status) { this.status = status; }
    public void setLignes(List<OrderLine> lignes) { this.lignes = lignes; }
}