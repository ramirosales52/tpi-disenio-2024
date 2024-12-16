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

    // Llenar las filas con los datos
    for (int i = 0; i < data.size(); i++) {
      Row row = sheet.createRow(i);
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
