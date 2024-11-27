package com.Bonvino.ReporteRankingVinos.controllers;

import java.util.*;

import com.Bonvino.ReporteRankingVinos.models.TipoUva;
import com.Bonvino.ReporteRankingVinos.models.Varietal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Bonvino.ReporteRankingVinos.exceptions.NotFoundException;
import com.Bonvino.ReporteRankingVinos.models.Vino;
import com.Bonvino.ReporteRankingVinos.models.strategy.AmigosStrategy;
import com.Bonvino.ReporteRankingVinos.models.strategy.NormalStrategy;
import com.Bonvino.ReporteRankingVinos.models.strategy.SommelierStrategy;
import com.Bonvino.ReporteRankingVinos.models.strategy.ITipoReporteStrategy;
import com.Bonvino.ReporteRankingVinos.services.IVinoService;

@RestController
public class GestorRankingVinos {

  @Autowired
  private IVinoService vinoService;

  @GetMapping("/generar-ranking")
  public ResponseEntity<Object> generarRankingVinos(
      @RequestParam Date fechaDesde,
      @RequestParam Date fechaHasta,
      @RequestParam String tipoVisualizacion,
      @RequestParam String tipoResenia) {
    // Llamado a la base de datos para obtener los vinos
    List<Vino> vinos = vinoService.getAllVinos();
    if (vinos.isEmpty()) {
      throw new NotFoundException("No hay vinos en la base de datos");
    }

    /*
     llamada a this.crearEstrategia()
     ITipoReporteStrategy tipoReporteStrategy = this.crearEstrategia(tipoVisualizacion);
     List<String> reseniasValidas = tipoReporteStrategy.obtenerVinosConPuntaje(vinos, fechaDesde, fechaHasta);
    */
      // Comienza loop en vinos
      List<Map<Vino, Float>> vinosYPuntaje = new ArrayList<>(vinos.stream().map(vino -> {
          float puntaje = vino.mostrarReseniasDeSommelierEnPeriodo(fechaDesde, fechaHasta);
          return new HashMap<>(Map.of(vino, puntaje));
      }).toList());

      this.ordenarVinosSegunPuntaje(vinosYPuntaje);

      return ResponseEntity.noContent().build();
  }

  private void ordenarVinosSegunPuntaje(List<Map<Vino, Float>> vinosYPuntaje) {
      vinosYPuntaje.sort((mapaA, mapaB) -> {
          float maxA = mapaA.values().stream().max(Float::compare).orElse(0f);
          float maxB = mapaB.values().stream().max(Float::compare).orElse(0f);
          return Float.compare(maxA, maxB);
      });
  }

    private List<List<String>> obtenerTopTenVinosConInformacion(List<Map<Vino, Float>> vinosYPuntaje) {
      return vinosYPuntaje.subList(0, Math.min(10, vinosYPuntaje.size())).stream()
          .map(mapa -> {
              Vino vino = mapa.keySet().iterator().next();
              float puntaje = mapa.values().iterator().next();
              return List.of(
                      String.valueOf(puntaje),
                      vino.getNombre(), String.valueOf(vino.getPrecio()),
                      vino.getBodega().obtenerNombreRegionProvinciaYPais()
                      );
          }).toList();
    }

  private ITipoReporteStrategy crearEstrategia(String tipoVisualizacion) {
      return switch (tipoVisualizacion) {
          case "sommelier" -> new SommelierStrategy();
          case "amigo" -> new AmigosStrategy();
          case "normal" -> new NormalStrategy();
          default -> throw new NotFoundException("Tipo de reseñas no encontrado");
      };
  }
}