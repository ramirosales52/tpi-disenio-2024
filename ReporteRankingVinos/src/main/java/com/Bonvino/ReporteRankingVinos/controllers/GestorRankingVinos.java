package com.Bonvino.ReporteRankingVinos.controllers;

import java.io.IOException;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Bonvino.ReporteRankingVinos.boundaries.ExcelFileService;
import com.Bonvino.ReporteRankingVinos.exceptions.NotFoundException;
import com.Bonvino.ReporteRankingVinos.models.Vino;
import com.Bonvino.ReporteRankingVinos.models.strategy.AmigosStrategy;
import com.Bonvino.ReporteRankingVinos.models.strategy.NormalStrategy;
import com.Bonvino.ReporteRankingVinos.models.strategy.SommelierStrategy;
import com.Bonvino.ReporteRankingVinos.models.strategy.ITipoReseniaStrategy;
import com.Bonvino.ReporteRankingVinos.services.IVinoService;

@RestController
// @RequestMapping("/ranking-vinos")

public class GestorRankingVinos {
  private ITipoReseniaStrategy strategy;
  @SuppressWarnings("unused")
  private String tipoVisualizacion;

  @Autowired
  private IVinoService vinoService;

  @CrossOrigin(origins = "http://localhost:3000")
  @GetMapping("/generar-ranking")
  public ResponseEntity<?> get(
      @RequestParam @DateTimeFormat(pattern = "yyyy-mm-dd") Date fechaDesde,
      @RequestParam @DateTimeFormat(pattern = "yyyy-mm-dd") Date fechaHasta,
      @RequestParam String tipoVisualizacion,
      @RequestParam String tipoResenia) throws IOException {
    // Llamado a la base de datos para obtener los vinos
    List<Vino> vinos = vinoService.getAllVinos();
    if (vinos.isEmpty()) {
      throw new NotFoundException("No hay vinos en la base de datos");
    }

    this.tomarTipoResenia(tipoResenia);
    this.tomarTipoVisualizacion(tipoVisualizacion);
    this.tomarConfirmacion();

    List<List<String>> topTenVinosConInformacion = this.generarRankingVinos(vinos, fechaDesde, fechaHasta);

    ExcelFileService excelExport = new ExcelFileService();

    excelExport.createExcelFile(topTenVinosConInformacion, "vinos.xlsx");

    return ResponseEntity.ok(topTenVinosConInformacion);
  }

  private List<List<String>> generarRankingVinos(List<Vino> vinos, Date fechaDesde, Date fechaHasta) {
    List<Map<Vino, Double>> vinosConPromedio = this.strategy.obtenerVinosConPromedio(vinos, fechaDesde, fechaHasta);

    this.ordenarVinosSegunCalificacion(vinosConPromedio);

    List<List<String>> topTenVinosConInformacion = this.obtenerTopTenVinosConInformacion(vinosConPromedio);

    return topTenVinosConInformacion;
  }

  private void tomarConfirmacion() {
  }

  private void ordenarVinosSegunCalificacion(List<Map<Vino, Double>> vinosYPuntaje) {
    vinosYPuntaje.sort((mapaA, mapaB) -> {
      double maxA = mapaA.values().stream().max(Double::compare).orElse(0.0);
      double maxB = mapaB.values().stream().max(Double::compare).orElse(0.0);
      return Double.compare(maxB, maxA);
    });
  }

  private List<List<String>> obtenerTopTenVinosConInformacion(List<Map<Vino, Double>> vinosConPromedio) {
    return vinosConPromedio.subList(0, Math.min(10, vinosConPromedio.size())).stream()
        .map(mapa -> {
          Vino vino = mapa.keySet().iterator().next();
          double puntaje = mapa.values().iterator().next();
          return List.of(
              String.format("%.2f", puntaje),
              vino.obtenerInformacionVinoBodegaYVarietal());
        }).toList();
  }

  public void tomarTipoResenia(String tipoResenia) {
    ITipoReseniaStrategy strategy = this.crearEstrategia(tipoResenia);
    this.setStrategy(strategy);
  }

  public void tomarTipoVisualizacion(String tipoVisualizacion) {
    this.tipoVisualizacion = tipoVisualizacion;
  }

  private ITipoReseniaStrategy crearEstrategia(String tipoVisualizacion) {
    return switch (tipoVisualizacion) {
      case "sommelier" -> new SommelierStrategy();
      case "amigo" -> new AmigosStrategy();
      case "normal" -> new NormalStrategy();
      default -> throw new NotFoundException("Tipo de reseñas no encontrado");
    };
  }

  public void setStrategy(ITipoReseniaStrategy strategy) {
    this.strategy = strategy;
  }
}