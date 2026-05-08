package com.shoestore.service;

import com.shoestore.entity.Shoe;
import com.shoestore.repository.ShoeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShoeService {

    @Autowired
    private ShoeRepository shoeRepository;

    public List<Shoe> findAll() { return shoeRepository.findAll(); }

    public Optional<Shoe> findById(Long id) { return shoeRepository.findById(id); }

    public List<Shoe> findByMarque(String marque) { return shoeRepository.findByMarque(marque); }

    public List<Shoe> findDisponibles() { return shoeRepository.findByDisponibleTrue(); }

    public List<Shoe> findEnPromo() { return shoeRepository.findByPromoIsNotNull(); }

    public List<Shoe> findByTaille(int taille) { return shoeRepository.findByTaille(taille); }

    public Shoe save(Shoe shoe) { return shoeRepository.save(shoe); }

    public Optional<Shoe> update(Long id, Shoe updated) {
        return shoeRepository.findById(id).map(existing -> {
            existing.setMarque(updated.getMarque());
            existing.setModele(updated.getModele());
            existing.setDescription(updated.getDescription());
            existing.setTaille(updated.getTaille());
            existing.setCouleur(updated.getCouleur());
            existing.setCodeBarres(updated.getCodeBarres());
            existing.setPoids(updated.getPoids());
            existing.setDateSortie(updated.getDateSortie());
            existing.setPrix(updated.getPrix());
            existing.setPromo(updated.getPromo());
            existing.setDisponible(updated.isDisponible());
            return shoeRepository.save(existing);
        });
    }

    public boolean delete(Long id) {
        if (shoeRepository.existsById(id)) {
            shoeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}