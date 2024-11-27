package com.Bonvino.ReporteRankingVinos.controllers;

import java.util.*;

import com.Bonvino.ReporteRankingVinos.models.TipoUva;
import com.Bonvino.ReporteRankingVinos.models.Varietal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Bonvino.ReporteRankingVinos.exceptions.NotFoundException;
import com.Bonvino.ReporteRankingVinos.models.Vino;
import com.Bonvino.ReporteRankingVinos.models.strategy.AmigosStrategy;
import com.Bonvino.ReporteRankingVinos.models.strategy.NormalStrategy;
import com.Bonvino.ReporteRankingVinos.models.strategy.SommelierStrategy;
import com.Bonvino.ReporteRankingVinos.models.strategy.ITipoReporteStrategy;
import com.Bonvino.ReporteRankingVinos.services.IVinoService;

@RestController
//@RequestMapping("/ranking-vinos")

public class GestorRankingVinos {

  @Autowired
  private IVinoService vinoService;

  @CrossOrigin(origins = "http://localhost:3000")
  @GetMapping("/generar-ranking")
  public ResponseEntity<Object> generarRankingVinos(
          @RequestParam @DateTimeFormat(pattern = "yyyy-mm-dd") Date fechaDesde,
          @RequestParam @DateTimeFormat(pattern = "yyyy-mm-dd") Date fechaHasta,
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
      List<Map<Vino, Double>> vinosYPuntaje = new ArrayList<>(vinos.stream().map(vino -> {
          double puntaje = vino.mostrarReseniasDeSommelierEnPeriodo(fechaDesde, fechaHasta);
          if(puntaje == 0) {
              return null;
          }
          return new HashMap<>(Map.of(vino, puntaje));
      }).filter(Objects::nonNull).toList());

      this.ordenarVinosSegunPuntaje(vinosYPuntaje);

      List<List<String>> topTenVinosConInformacion = this.obtenerTopTenVinosConInformacion(vinosYPuntaje);

      return ResponseEntity.ok(topTenVinosConInformacion);

//      return ResponseEntity.noContent().build();
  }

  private void ordenarVinosSegunPuntaje(List<Map<Vino, Double>> vinosYPuntaje) {
      vinosYPuntaje.sort((mapaA, mapaB) -> {
          double maxA = mapaA.values().stream().max(Double::compare).orElse(0.0);
          double maxB = mapaB.values().stream().max(Double::compare).orElse(0.0);
          return Double.compare(maxB, maxA);
      });
  }

    private List<List<String>> obtenerTopTenVinosConInformacion(List<Map<Vino, Double>> vinosYPuntaje) {
      return vinosYPuntaje.subList(0, Math.min(10, vinosYPuntaje.size())).stream()
          .map(mapa -> {
              Vino vino = mapa.keySet().iterator().next();
              double puntaje = mapa.values().iterator().next();
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