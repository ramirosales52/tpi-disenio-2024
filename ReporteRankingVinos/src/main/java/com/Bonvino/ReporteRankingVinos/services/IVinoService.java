package com.Bonvino.ReporteRankingVinos.services;

import java.util.List;

import com.Bonvino.ReporteRankingVinos.models.Vino;

public interface IVinoService {

  List<Vino> getAllVinos();

  Vino getVinoById(Integer id);

}
