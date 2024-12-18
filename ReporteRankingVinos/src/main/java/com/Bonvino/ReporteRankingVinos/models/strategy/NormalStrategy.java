package com.Bonvino.ReporteRankingVinos.models.strategy;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.Bonvino.ReporteRankingVinos.models.Vino;

public class NormalStrategy implements ITipoReseniaStrategy {

  /// Calificar Vinos
  // Creamos el List<String> para exportar a excel o pdf
  public List<Map<Vino, Double>> obtenerVinosConPromedio(List<Vino> vinos, Date fechaInicio, Date fechaFin) {
    List<Map<Vino, Double>> vinosYPuntaje = new ArrayList<Map<Vino, Double>>();
    // Mientras haya vinos
    vinos.forEach(
        vino -> {
          if (vino.tieneResenias()) {
            List<Integer> puntajeResenias = new ArrayList<Integer>();
            vino.getResenias().forEach(
                resenia -> {
                  if (resenia.esDePeriodo(fechaFin, fechaFin)) {
                    if (resenia.sosDeSommelier()) {
                      puntajeResenias.add(resenia.getPuntaje());
                    }
                  }
                });
            vinosYPuntaje.add(Map.of(vino, puntajeResenias.stream().mapToInt(Integer::intValue).average().orElse(0)));
          }
        });
    return vinosYPuntaje;
  }

  public double calcularPromedioReseniasValidadas(List<Integer> puntajeResenias) {
    return puntajeResenias.stream().mapToInt(Integer::intValue).average().orElse(0);
  }

}
