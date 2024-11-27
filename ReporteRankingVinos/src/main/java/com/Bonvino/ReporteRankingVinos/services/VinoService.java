package com.Bonvino.ReporteRankingVinos.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.Bonvino.ReporteRankingVinos.models.Vino;
import com.Bonvino.ReporteRankingVinos.repositories.VinoRepository;

@Service
public class VinoService implements IVinoService {

  @Autowired
  private VinoRepository vinoRepository;

  @Override
  public List<Vino> getAllVinos() {
    return vinoRepository.findAll();
  }

  @Override
  public Vino getVinoById(Integer id) {
    Vino vino = vinoRepository.findById(id).orElse(null);
    if (vino == null) {
      throw new com.Bonvino.ReporteRankingVinos.exceptions.NotFoundException("Vino no encontrado");
    }
    return vino;
  }
}