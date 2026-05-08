package com.shoestore.repository;

import com.shoestore.entity.Shoe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoeRepository extends JpaRepository<Shoe, Long> {

    List<Shoe> findByMarque(String marque);

    List<Shoe> findByDisponibleTrue();

    List<Shoe> findByPromoIsNotNull();

    List<Shoe> findByTaille(int taille);
}