package com.Bonvino.ReporteRankingVinos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Bonvino.ReporteRankingVinos.models.Vino;

@Repository
public interface VinoRepository extends JpaRepository<Vino, Integer> {

}
