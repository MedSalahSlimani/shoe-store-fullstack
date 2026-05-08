package com.shoestore.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "order_lines")
public class OrderLine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shoe_id")
    private Shoe shoe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    private int quantity;
    private double priceAtOrder;

    public OrderLine() {}

    // Getters
    public Long getId() { return id; }
    public Shoe getShoe() { return shoe; }
    public Order getOrder() { return order; }
    public int getQuantity() { return quantity; }
    public double getPriceAtOrder() { return priceAtOrder; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setShoe(Shoe shoe) { this.shoe = shoe; }
    public void setOrder(Order order) { this.order = order; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public void setPriceAtOrder(double priceAtOrder) { this.priceAtOrder = priceAtOrder; }
}