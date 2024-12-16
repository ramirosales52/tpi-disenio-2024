package com.Bonvino.ReporteRankingVinos.boundaries;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ExcelFileService {

  public void createExcelFile(List<List<String>> data, String filename) throws IOException {
    Files.createDirectories(Paths.get("./static"));
    String staticDirectoryPath = Paths.get("./static").toAbsolutePath().toString();
    String filePath = staticDirectoryPath + "/" + filename;

    Workbook workbook = new XSSFWorkbook();
    Sheet sheet = workbook.createSheet("Vinos");

    // Crear estilo de celda para los títulos
    CellStyle headerStyle = workbook.createCellStyle();
    Font boldFont = workbook.createFont();
    boldFont.setBold(true);
    headerStyle.setFont(boldFont);

    // Crear la fila de encabezado
    Row headerRow = sheet.createRow(0);

    // Crear y estilizar las celdas de los títulos
    Cell headerCell1 = headerRow.createCell(0);
    headerCell1.setCellValue("Puntaje");
    headerCell1.setCellStyle(headerStyle);

    Cell headerCell2 = headerRow.createCell(1);
    headerCell2.setCellValue("Datos del vino");
    headerCell2.setCellStyle(headerStyle);

    // Llenar las filas con los datos
    for (int i = 0; i < data.size(); i++) {
      Row row = sheet.createRow(i + 1); // Empieza desde la fila 1
      List<String> rowData = data.get(i);

      for (int j = 0; j < rowData.size(); j++) {
        Cell cell = row.createCell(j);
        cell.setCellValue(rowData.get(j));
      }
    }

    // Guardar el archivo en el sistema de archivos
    try (FileOutputStream fileOut = new FileOutputStream(filePath)) {
      workbook.write(fileOut);
    } finally {
      workbook.close();
    }

    System.out.println("Archivo Excel creado en: " + filePath);
  }
}
