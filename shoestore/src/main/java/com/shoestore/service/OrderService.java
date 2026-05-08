package com.shoestore.service;

import com.shoestore.entity.Order;
import com.shoestore.entity.OrderLine;
import com.shoestore.repository.OrderRepository;
import com.shoestore.repository.ShoeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ShoeRepository shoeRepository;

    public List<Order> findAll() { return orderRepository.findAll(); }

    public Optional<Order> findById(Long id) { return orderRepository.findById(id); }

    public Order create(Order order) {
        order.setDate(LocalDateTime.now());
        if (order.getStatus() == null || order.getStatus().isBlank()) {
            order.setStatus("EN_ATTENTE");
        }

        double total = 0;
        for (OrderLine ligne : order.getLignes()) {
            ligne.setOrder(order);
            if (ligne.getShoe() != null && ligne.getShoe().getId() != null) {
                Optional<com.shoestore.entity.Shoe> shoeOpt =
                    shoeRepository.findById(ligne.getShoe().getId());
                if (shoeOpt.isPresent()) {
                    com.shoestore.entity.Shoe shoe = shoeOpt.get();
                    ligne.setShoe(shoe);
                    double price = shoe.getPromo() != null ? shoe.getPromo() : shoe.getPrix();
                    ligne.setPriceAtOrder(price);
                }
            }
            total += ligne.getPriceAtOrder() * ligne.getQuantity();
        }
        order.setTotalAmount(total);
        return orderRepository.save(order);
    }

    public Optional<Order> updateStatus(Long id, String status) {
        return orderRepository.findById(id).map(order -> {
            order.setStatus(status);
            return orderRepository.save(order);
        });
    }

    public boolean delete(Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }
}