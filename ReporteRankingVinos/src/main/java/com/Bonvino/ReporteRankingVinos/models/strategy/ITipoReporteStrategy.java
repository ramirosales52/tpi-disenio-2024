package com.Bonvino.ReporteRankingVinos.models.strategy;

import java.util.Date;
import java.util.List;

import com.Bonvino.ReporteRankingVinos.models.Resenia;
import com.Bonvino.ReporteRankingVinos.models.Vino;

public interface ITipoReporteStrategy {

  List<String> obtenerVinosConPuntaje(List<Vino> vinos, Date fechaInicio, Date fechaFin);

  List<Resenia> getReseniasValidas(List<Vino> vinos, Date fechaInicio, Date fechaFin);

  // double calcularPuntajeVino(Vino vino);
}
