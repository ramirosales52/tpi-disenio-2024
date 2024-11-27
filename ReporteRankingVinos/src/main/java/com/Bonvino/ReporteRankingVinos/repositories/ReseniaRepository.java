package com.Bonvino.ReporteRankingVinos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Bonvino.ReporteRankingVinos.models.Resenia;

public interface ReseniaRepository extends JpaRepository<Resenia, Integer> {
}