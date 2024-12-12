package com.Bonvino.ReporteRankingVinos.models.strategy;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.Bonvino.ReporteRankingVinos.models.Vino;

public interface ITipoReseniaStrategy {

  List<Map<Vino, Double>> obtenerVinosConPromedio(List<Vino> vinos, Date fechaInicio, Date fechaFin);

  double calcularPromedioReseniasValidadas(List<Integer> puntajeResenias);

}
