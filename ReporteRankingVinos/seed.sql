-- Insertar datos de países
INSERT INTO pais (nombre) VALUES ('Argentina'), ('Chile'), ('Uruguay');
SET @paisArgentina = (SELECT id FROM pais WHERE nombre = 'Argentina');
SET @paisChile = (SELECT id FROM pais WHERE nombre = 'Chile');
SET @paisUruguay = (SELECT id FROM pais WHERE nombre = 'Uruguay');

-- Insertar provincias
INSERT INTO provincia (nombre, pais_id) VALUES
('Mendoza', @paisArgentina),
('San Juan', @paisArgentina),
('La Rioja', @paisArgentina),
('Colchagua', @paisChile),
('Maipo', @paisChile),
('Canelones', @paisUruguay);

SET @provMendoza = (SELECT id FROM provincia WHERE nombre = 'Mendoza');
SET @provSanJuan = (SELECT id FROM provincia WHERE nombre = 'San Juan');
SET @provLaRioja = (SELECT id FROM provincia WHERE nombre = 'La Rioja');
SET @provColchagua = (SELECT id FROM provincia WHERE nombre = 'Colchagua');
SET @provMaipo = (SELECT id FROM provincia WHERE nombre = 'Maipo');
SET @provCanelones = (SELECT id FROM provincia WHERE nombre = 'Canelones');

-- Insertar regiones vitivinícolas
INSERT INTO region_vitivinicola (nombre, provincia_id) VALUES
('Valle de Uco', @provMendoza),
('Luján de Cuyo', @provMendoza),
('Tulum', @provSanJuan),
('Famatina', @provLaRioja),
('Colchagua Andes', @provColchagua),
('Maipo Alto', @provMaipo),
('Las Violetas', @provCanelones);

SET @regionValleUco = (SELECT id FROM region_vitivinicola WHERE nombre = 'Valle de Uco');
SET @regionLujan = (SELECT id FROM region_vitivinicola WHERE nombre = 'Luján de Cuyo');
SET @regionTulum = (SELECT id FROM region_vitivinicola WHERE nombre = 'Tulum');
SET @regionFamatina = (SELECT id FROM region_vitivinicola WHERE nombre = 'Famatina');
SET @regionColchagua = (SELECT id FROM region_vitivinicola WHERE nombre = 'Colchagua Andes');
SET @regionMaipo = (SELECT id FROM region_vitivinicola WHERE nombre = 'Maipo Alto');
SET @regionCanelones = (SELECT id FROM region_vitivinicola WHERE nombre = 'Las Violetas');

-- Insertar bodegas
INSERT INTO bodega (nombre, region_id) VALUES
('Bodega Norton', @regionValleUco),
('Bodega Trapiche', @regionLujan),
('Bodega Callia', @regionTulum),
('Bodega La Riojana', @regionFamatina),
('Bodega Montes', @regionColchagua),
('Bodega Concha y Toro', @regionMaipo),
('Bodega Garzón', @regionCanelones);

-- Insertar tipos de uva
INSERT INTO tipo_uva (nombre) VALUES
('Malbec'), ('Merlot'), ('Cabernet Sauvignon'),
('Syrah'), ('Chardonnay'), ('Torrontés'),
('Carmenere'), ('Pinot Noir'), ('Sauvignon Blanc');

SET @uvaMalbec = (SELECT id FROM tipo_uva WHERE nombre = 'Malbec');
SET @uvaMerlot = (SELECT id FROM tipo_uva WHERE nombre = 'Merlot');
SET @uvaCabernet = (SELECT id FROM tipo_uva WHERE nombre = 'Cabernet Sauvignon');
SET @uvaSyrah = (SELECT id FROM tipo_uva WHERE nombre = 'Syrah');
SET @uvaChardonnay = (SELECT id FROM tipo_uva WHERE nombre = 'Chardonnay');
SET @uvaTorrontes = (SELECT id FROM tipo_uva WHERE nombre = 'Torrontés');
SET @uvaCarmenere = (SELECT id FROM tipo_uva WHERE nombre = 'Carmenere');
SET @uvaPinotNoir = (SELECT id FROM tipo_uva WHERE nombre = 'Pinot Noir');
SET @uvaSauvignon = (SELECT id FROM tipo_uva WHERE nombre = 'Sauvignon Blanc');

-- Insertar varietales
INSERT INTO varietal (nombre, tipo_uva_id) VALUES
('Malbec Reserva', @uvaMalbec),
('Merlot Reserva', @uvaMerlot),
('Cabernet Gran Reserva', @uvaCabernet),
('Syrah Premium', @uvaSyrah),
('Chardonnay Clásico', @uvaChardonnay),
('Torrontés Dulce', @uvaTorrontes),
('Carmenere Andes', @uvaCarmenere),
('Pinot Noir Reserva', @uvaPinotNoir),
('Sauvignon Blanc Finca', @uvaSauvignon);

-- -- Insertar vinos
-- INSERT INTO vino (nombre, precio, bodega_id) VALUES
-- ('Norton Malbec Gran Reserva', 3500, (SELECT id FROM bodega WHERE nombre = 'Bodega Norton')),
-- ('Trapiche Cabernet', 4200, (SELECT id FROM bodega WHERE nombre = 'Bodega Trapiche')),
-- ('Callia Syrah', 2800, (SELECT id FROM bodega WHERE nombre = 'Bodega Callia')),
-- ('Montes Carmenere', 4500, (SELECT id FROM bodega WHERE nombre = 'Bodega Montes')),
-- ('Garzón Pinot Noir', 4700, (SELECT id FROM bodega WHERE nombre = 'Bodega Garzón'));

-- Insertar vinos
INSERT INTO vino (nombre, precio, bodega_id) VALUES
('Norton Chardonnay Reserva', 3100, (SELECT id FROM bodega WHERE nombre = 'Bodega Norton')),
('Trapiche Malbec', 2500, (SELECT id FROM bodega WHERE nombre = 'Bodega Trapiche')),
('Callia Syrah', 1800, (SELECT id FROM bodega WHERE nombre = 'Bodega Callia')),
('La Riojana Torrontés', 1500, (SELECT id FROM bodega WHERE nombre = 'Bodega La Riojana')),
('Montes Alpha Cabernet Sauvignon', 4500, (SELECT id FROM bodega WHERE nombre = 'Bodega Montes')),
('Concha y Toro Merlot', 3200, (SELECT id FROM bodega WHERE nombre = 'Bodega Concha y Toro')),
('Garzón Albariño', 3800, (SELECT id FROM bodega WHERE nombre = 'Bodega Garzón')),
('Norton Malbec', 2900, (SELECT id FROM bodega WHERE nombre = 'Bodega Norton')),
('Trapiche Cabernet Sauvignon', 2700, (SELECT id FROM bodega WHERE nombre = 'Bodega Trapiche')),
('Callia Malbec', 2000, (SELECT id FROM bodega WHERE nombre = 'Bodega Callia')),
('La Riojana Syrah', 1600, (SELECT id FROM bodega WHERE nombre = 'Bodega La Riojana')),
('Montes Alpha Syrah', 4700, (SELECT id FROM bodega WHERE nombre = 'Bodega Montes')),
('Concha y Toro Chardonnay', 3400, (SELECT id FROM bodega WHERE nombre = 'Bodega Concha y Toro')),
('Garzón Tannat', 4000, (SELECT id FROM bodega WHERE nombre = 'Bodega Garzón')),
('Norton Sauvignon Blanc', 3000, (SELECT id FROM bodega WHERE nombre = 'Bodega Norton'));

-- Asociaciones con varietales
-- Insertar vino_varietal
INSERT INTO vino_varietal (vino_id, varietal_id) VALUES
((SELECT id FROM vino WHERE nombre = 'Norton Chardonnay Reserva'), @uvaChardonnay),
((SELECT id FROM vino WHERE nombre = 'Trapiche Malbec'), @uvaMalbec),
((SELECT id FROM vino WHERE nombre = 'Callia Syrah'), @uvaSyrah),
((SELECT id FROM vino WHERE nombre = 'La Riojana Torrontés'), @uvaTorrontes),
((SELECT id FROM vino WHERE nombre = 'Montes Alpha Cabernet Sauvignon'), @uvaCabernet),
((SELECT id FROM vino WHERE nombre = 'Concha y Toro Merlot'), @uvaMerlot),
((SELECT id FROM vino WHERE nombre = 'Garzón Albariño'), @uvaSauvignon),
((SELECT id FROM vino WHERE nombre = 'Norton Malbec'), @uvaMalbec),
((SELECT id FROM vino WHERE nombre = 'Trapiche Cabernet Sauvignon'), @uvaCabernet),
((SELECT id FROM vino WHERE nombre = 'Callia Malbec'), @uvaMalbec),
((SELECT id FROM vino WHERE nombre = 'La Riojana Syrah'), @uvaSyrah),
((SELECT id FROM vino WHERE nombre = 'Montes Alpha Syrah'), @uvaSyrah),
((SELECT id FROM vino WHERE nombre = 'Concha y Toro Chardonnay'), @uvaChardonnay),
((SELECT id FROM vino WHERE nombre = 'Garzón Tannat'), @uvaPinotNoir),
((SELECT id FROM vino WHERE nombre = 'Norton Sauvignon Blanc'), @uvaSauvignon);

-- Más reseñas aleatorias para todos los vinos
INSERT INTO resenia (es_premium, fecha_resenia, puntaje, vino_id) VALUES
(TRUE, '2023-10-01', 97, (SELECT id FROM vino WHERE nombre = 'Norton Chardonnay Reserva')),
(FALSE, '2022-05-15', 85, (SELECT id FROM vino WHERE nombre = 'Norton Chardonnay Reserva')),
(TRUE, '2021-07-20', 92, (SELECT id FROM vino WHERE nombre = 'Norton Chardonnay Reserva')),
(FALSE, '2020-11-30', 78, (SELECT id FROM vino WHERE nombre = 'Norton Chardonnay Reserva')),
(TRUE, '2019-03-25', 88, (SELECT id FROM vino WHERE nombre = 'Norton Chardonnay Reserva')),

(FALSE, '2023-09-10', 90, (SELECT id FROM vino WHERE nombre = 'Trapiche Malbec')),
(TRUE, '2022-04-18', 95, (SELECT id FROM vino WHERE nombre = 'Trapiche Malbec')),
(FALSE, '2021-08-22', 80, (SELECT id FROM vino WHERE nombre = 'Trapiche Malbec')),
(TRUE, '2020-12-05', 85, (SELECT id FROM vino WHERE nombre = 'Trapiche Malbec')),
(FALSE, '2019-02-14', 75, (SELECT id FROM vino WHERE nombre = 'Trapiche Malbec')),

(TRUE, '2023-08-05', 88, (SELECT id FROM vino WHERE nombre = 'Callia Syrah')),
(FALSE, '2022-03-12', 82, (SELECT id FROM vino WHERE nombre = 'Callia Syrah')),
(TRUE, '2021-09-30', 91, (SELECT id FROM vino WHERE nombre = 'Callia Syrah')),
(FALSE, '2020-10-25', 77, (SELECT id FROM vino WHERE nombre = 'Callia Syrah')),
(TRUE, '2019-01-18', 85, (SELECT id FROM vino WHERE nombre = 'Callia Syrah')),

(FALSE, '2023-07-15', 89, (SELECT id FROM vino WHERE nombre = 'La Riojana Torrontés')),
(TRUE, '2022-02-20', 93, (SELECT id FROM vino WHERE nombre = 'La Riojana Torrontés')),
(FALSE, '2021-11-10', 81, (SELECT id FROM vino WHERE nombre = 'La Riojana Torrontés')),
(TRUE, '2020-09-05', 86, (SELECT id FROM vino WHERE nombre = 'La Riojana Torrontés')),
(FALSE, '2019-04-12', 79, (SELECT id FROM vino WHERE nombre = 'La Riojana Torrontés')),

(TRUE, '2023-06-25', 96, (SELECT id FROM vino WHERE nombre = 'Montes Alpha Cabernet Sauvignon')),
(FALSE, '2022-01-30', 87, (SELECT id FROM vino WHERE nombre = 'Montes Alpha Cabernet Sauvignon')),
(TRUE, '2021-10-15', 92, (SELECT id FROM vino WHERE nombre = 'Montes Alpha Cabernet Sauvignon')),
(FALSE, '2020-08-20', 84, (SELECT id FROM vino WHERE nombre = 'Montes Alpha Cabernet Sauvignon')),
(TRUE, '2019-05-05', 90, (SELECT id FROM vino WHERE nombre = 'Montes Alpha Cabernet Sauvignon')),

(FALSE, '2023-05-10', 88, (SELECT id FROM vino WHERE nombre = 'Concha y Toro Merlot')),
(TRUE, '2022-12-25', 91, (SELECT id FROM vino WHERE nombre = 'Concha y Toro Merlot')),
(FALSE, '2021-06-18', 83, (SELECT id FROM vino WHERE nombre = 'Concha y Toro Merlot')),
(TRUE, '2020-07-30', 87, (SELECT id FROM vino WHERE nombre = 'Concha y Toro Merlot')),
(FALSE, '2019-08-15', 80, (SELECT id FROM vino WHERE nombre = 'Concha y Toro Merlot')),

(TRUE, '2023-04-05', 94, (SELECT id FROM vino WHERE nombre = 'Garzón Albariño')),
(FALSE, '2022-11-20', 89, (SELECT id FROM vino WHERE nombre = 'Garzón Albariño')),
(TRUE, '2021-05-25', 92, (SELECT id FROM vino WHERE nombre = 'Garzón Albariño')),
(FALSE, '2020-06-10', 85, (SELECT id FROM vino WHERE nombre = 'Garzón Albariño')),
(TRUE, '2019-09-30', 88, (SELECT id FROM vino WHERE nombre = 'Garzón Albariño')),

(FALSE, '2023-03-15', 90, (SELECT id FROM vino WHERE nombre = 'Norton Malbec')),
(TRUE, '2022-10-25', 95, (SELECT id FROM vino WHERE nombre = 'Norton Malbec')),
(FALSE, '2021-04-18', 82, (SELECT id FROM vino WHERE nombre = 'Norton Malbec')),
(TRUE, '2020-05-30', 87, (SELECT id FROM vino WHERE nombre = 'Norton Malbec')),
(FALSE, '2019-10-15', 79, (SELECT id FROM vino WHERE nombre = 'Norton Malbec')),

(TRUE, '2023-02-10', 93, (SELECT id FROM vino WHERE nombre = 'Trapiche Cabernet Sauvignon')),
(FALSE, '2022-09-20', 88, (SELECT id FROM vino WHERE nombre = 'Trapiche Cabernet Sauvignon')),
(TRUE, '2021-03-25', 91, (SELECT id FROM vino WHERE nombre = 'Trapiche Cabernet Sauvignon')),
(FALSE, '2020-04-10', 84, (SELECT id FROM vino WHERE nombre = 'Trapiche Cabernet Sauvignon')),
(TRUE, '2019-11-30', 86, (SELECT id FROM vino WHERE nombre = 'Trapiche Cabernet Sauvignon')),

(FALSE, '2023-01-05', 89, (SELECT id FROM vino WHERE nombre = 'Callia Malbec')),
(TRUE, '2022-08-15', 94, (SELECT id FROM vino WHERE nombre = 'Callia Malbec')),
(FALSE, '2021-02-20', 81, (SELECT id FROM vino WHERE nombre = 'Callia Malbec')),
(TRUE, '2020-03-30', 86, (SELECT id FROM vino WHERE nombre = 'Callia Malbec')),
(FALSE, '2019-12-10', 78, (SELECT id FROM vino WHERE nombre = 'Callia Malbec')),

(TRUE, '2022-12-01', 92, (SELECT id FROM vino WHERE nombre = 'La Riojana Syrah')),
(FALSE, '2022-07-10', 87, (SELECT id FROM vino WHERE nombre = 'La Riojana Syrah')),
(TRUE, '2021-01-15', 90, (SELECT id FROM vino WHERE nombre = 'La Riojana Syrah')),
(FALSE, '2020-02-25', 83, (SELECT id FROM vino WHERE nombre = 'La Riojana Syrah')),
(TRUE, '2019-06-30', 85, (SELECT id FROM vino WHERE nombre = 'La Riojana Syrah')),

(FALSE, '2022-11-05', 91, (SELECT id FROM vino WHERE nombre = 'Montes Alpha Syrah')),
(TRUE, '2022-06-20', 94, (SELECT id FROM vino WHERE nombre = 'Montes Alpha Syrah')),
(FALSE, '2021-12-25', 88, (SELECT id FROM vino WHERE nombre = 'Montes Alpha Syrah')),
(TRUE, '2020-01-30', 85, (SELECT id FROM vino WHERE nombre = 'Montes Alpha Syrah')),
(FALSE, '2019-07-15', 80, (SELECT id FROM vino WHERE nombre = 'Montes Alpha Syrah')),

(TRUE, '2022-10-01', 93, (SELECT id FROM vino WHERE nombre = 'Concha y Toro Chardonnay')),
(FALSE, '2022-05-10', 89, (SELECT id FROM vino WHERE nombre = 'Concha y Toro Chardonnay')),
(TRUE, '2021-11-15', 92, (SELECT id FROM vino WHERE nombre = 'Concha y Toro Chardonnay')),
(FALSE, '2020-12-25', 86, (SELECT id FROM vino WHERE nombre = 'Concha y Toro Chardonnay')),
(TRUE, '2019-08-30', 88, (SELECT id FROM vino WHERE nombre = 'Concha y Toro Chardonnay')),

(FALSE, '2022-09-05', 90, (SELECT id FROM vino WHERE nombre = 'Garzón Tannat')),
(TRUE, '2022-04-20', 95, (SELECT id FROM vino WHERE nombre = 'Garzón Tannat')),
(FALSE, '2021-10-25', 82, (SELECT id FROM vino WHERE nombre = 'Garzón Tannat')),
(TRUE, '2020-11-10', 87, (SELECT id FROM vino WHERE nombre = 'Garzón Tannat')),
(FALSE, '2019-09-15', 79, (SELECT id FROM vino WHERE nombre = 'Garzón Tannat')),

(TRUE, '2022-08-01', 94, (SELECT id FROM vino WHERE nombre = 'Norton Sauvignon Blanc')),
(FALSE, '2022-03-10', 89, (SELECT id FROM vino WHERE nombre = 'Norton Sauvignon Blanc')),
(TRUE, '2021-09-15', 92, (SELECT id FROM vino WHERE nombre = 'Norton Sauvignon Blanc')),
(FALSE, '2020-10-25', 85, (SELECT id FROM vino WHERE nombre = 'Norton Sauvignon Blanc')),
(TRUE, '2019-10-30', 88, (SELECT id FROM vino WHERE nombre = 'Norton Sauvignon Blanc'));