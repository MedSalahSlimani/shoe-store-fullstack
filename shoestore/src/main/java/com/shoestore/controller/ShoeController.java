package com.shoestore.controller;

import com.shoestore.entity.Shoe;
import com.shoestore.service.ShoeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shoes")
public class ShoeController {

    @Autowired
    private ShoeService shoeService;

    @GetMapping
    public List<Shoe> getAll() {
        return shoeService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shoe> getById(@PathVariable Long id) {
        return shoeService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/marque/{marque}")
    public List<Shoe> getByMarque(@PathVariable String marque) {
        return shoeService.findByMarque(marque);
    }

    @GetMapping("/disponibles")
    public List<Shoe> getDisponibles() {
        return shoeService.findDisponibles();
    }

    @GetMapping("/promo")
    public List<Shoe> getEnPromo() {
        return shoeService.findEnPromo();
    }

    @GetMapping("/taille/{taille}")
    public List<Shoe> getByTaille(@PathVariable int taille) {
        return shoeService.findByTaille(taille);
    }

    @PostMapping
    public ResponseEntity<Shoe> create(@RequestBody Shoe shoe) {
        return ResponseEntity.status(HttpStatus.CREATED).body(shoeService.save(shoe));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shoe> update(@PathVariable Long id, @RequestBody Shoe shoe) {
        return shoeService.update(id, shoe)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (shoeService.delete(id)) return ResponseEntity.noContent().build();
        return ResponseEntity.notFound().build();
    }
}