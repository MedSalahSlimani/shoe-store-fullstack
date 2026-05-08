package com.shoestore.runner;

import com.shoestore.entity.Shoe;
import com.shoestore.repository.ShoeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private ShoeRepository shoeRepository;

    @Override
    public void run(String... args) {
        if (shoeRepository.count() > 0) return;

        List<Shoe> shoes = Arrays.asList(
            new Shoe(null, "Nike", "Air Zoom Pegasus 37", "Chaussure de course légère",
                42, "Bleu - Rouge", "Nike-BARCODE-001", 250,
                LocalDate.of(2021, 1, 3), 70.0, 63.0, true),

            new Shoe(null, "Adidas", "Ultraboot 21", "Confort exceptionnel",
                42, "Noir - Blanc", "Adidas-BARCODE-002", 310,
                LocalDate.of(2025, 1, 3), 90.0, 81.0, true),

            new Shoe(null, "Hoka", "Clifton 8", "Amorti maximal",
                42, "Noir - Bleu - Blanc", "Hoka-BARCODE-003", 260,
                LocalDate.of(2021, 1, 3), 100.0, 80.0, true),

            new Shoe(null, "New Balance", "Fresh Foam 1080v11", "Souplesse et réactivité",
                44, "Vert - Violet", "NB-BARCODE-004", 280,
                LocalDate.of(2022, 1, 2), 120.0, 96.0, false),

            new Shoe(null, "Puma", "Deviate Nitro", "Réactif et léger",
                44, "Jaune - Violet", "Puma-BARCODE-005", 240,
                LocalDate.of(2019, 12, 5), 60.0, null, false),

            new Shoe(null, "Asics", "Gel-Kayano 28", "Support stable",
                41, "Jaune - Violet", "Asics-BARCODE-006", 290,
                LocalDate.of(2024, 1, 3), 80.0, 72.0, true)
        );

        shoeRepository.saveAll(shoes);
        System.out.println("✅ DataLoader : 6 chaussures insérées !");
    }
}