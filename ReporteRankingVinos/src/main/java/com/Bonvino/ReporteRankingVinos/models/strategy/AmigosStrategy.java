package com.Bonvino.ReporteRankingVinos.models.strategy;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.Bonvino.ReporteRankingVinos.models.Resenia;
import com.Bonvino.ReporteRankingVinos.models.Vino;

public class AmigosStrategy implements ITipoReporteStrategy {

  public List<Resenia> getReseniasValidas(List<Vino> vinos, Date fechaInicio, Date fechaFin) {
    List<Resenia> reseniasValidas = new ArrayList<Resenia>();
    vinos.forEach(
        vino -> {
          if (vino.tieneResenias()) {
            vino.getResenias().forEach(
                resenia -> {
                  if (resenia.getFechaResenia().after(fechaInicio) && resenia.getFechaResenia().before(fechaFin)) {
                    reseniasValidas.add(resenia);
                  }
                });
          }
        });
    return reseniasValidas;
  }

  public List<String> obtenerVinosConPuntaje(List<Vino> vinos, Date fechaInicio, Date fechaFin) {
    List<String> vinosConPuntaje = new ArrayList<String>();
    List<Resenia> reseniasValidas = getReseniasValidas(vinos, fechaInicio, fechaFin);
    reseniasValidas.forEach(
        resenia -> {
          if (resenia.getPuntaje() >= 90) {
            vinosConPuntaje.add(resenia.getVino().getNombre());
          }
        });
    return vinosConPuntaje;
  }
}
