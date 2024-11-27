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

-- Insertar vinos
INSERT INTO vino (nombre, precio, bodega_id) VALUES
('Norton Malbec Gran Reserva', 3500, (SELECT id FROM bodega WHERE nombre = 'Bodega Norton')),
('Trapiche Cabernet', 4200, (SELECT id FROM bodega WHERE nombre = 'Bodega Trapiche')),
('Callia Syrah', 2800, (SELECT id FROM bodega WHERE nombre = 'Bodega Callia')),
('Montes Carmenere', 4500, (SELECT id FROM bodega WHERE nombre = 'Bodega Montes')),
('Garzón Pinot Noir', 4700, (SELECT id FROM bodega WHERE nombre = 'Bodega Garzón'));

-- Insertar relaciones vino-varietal
INSERT INTO vino_varietal (vino_id, varietal_id) VALUES
((SELECT id FROM vino WHERE nombre = 'Norton Malbec Gran Reserva'), @uvaMalbec),
((SELECT id FROM vino WHERE nombre = 'Trapiche Cabernet'), @uvaCabernet),
((SELECT id FROM vino WHERE nombre = 'Callia Syrah'), @uvaSyrah),
((SELECT id FROM vino WHERE nombre = 'Montes Carmenere'), @uvaCarmenere),
((SELECT id FROM vino WHERE nombre = 'Garzón Pinot Noir'), @uvaPinotNoir);

-- Insertar reseñas
INSERT INTO resenia (es_premium, fecha_resenia, puntaje, vino_id)
VALUES
(TRUE, '2024-01-01', 95, (SELECT id FROM vino WHERE nombre = 'Norton Malbec Gran Reserva')),
(FALSE, '2024-03-10', 88, (SELECT id FROM vino WHERE nombre = 'Trapiche Cabernet')),
(TRUE, '2024-05-20', 92, (SELECT id FROM vino WHERE nombre = 'Callia Syrah')),
(TRUE, '2024-06-15', 93, (SELECT id FROM vino WHERE nombre = 'Montes Carmenere')),
(FALSE, '2024-08-10', 87, (SELECT id FROM vino WHERE nombre = 'Garzón Pinot Noir'));


-- Insertar reseñas para Norton Malbec Gran Reserva
INSERT INTO resenia (es_premium, fecha_resenia, puntaje, vino_id) VALUES
(TRUE, '2024-01-15', 96, (SELECT id FROM vino WHERE nombre = 'Norton Malbec Gran Reserva')),
(FALSE, '2024-02-10', 89, (SELECT id FROM vino WHERE nombre = 'Norton Malbec Gran Reserva')),
(TRUE, '2024-03-12', 94, (SELECT id FROM vino WHERE nombre = 'Norton Malbec Gran Reserva')),
(FALSE, '2024-04-18', 87, (SELECT id FROM vino WHERE nombre = 'Norton Malbec Gran Reserva')),
(TRUE, '2024-05-20', 95, (SELECT id FROM vino WHERE nombre = 'Norton Malbec Gran Reserva'));

-- Insertar reseñas para Trapiche Cabernet
INSERT INTO resenia (es_premium, fecha_resenia, puntaje, vino_id) VALUES
(FALSE, '2024-01-20', 88, (SELECT id FROM vino WHERE nombre = 'Trapiche Cabernet')),
(TRUE, '2024-02-25', 91, (SELECT id FROM vino WHERE nombre = 'Trapiche Cabernet')),
(FALSE, '2024-03-15', 85, (SELECT id FROM vino WHERE nombre = 'Trapiche Cabernet')),
(TRUE, '2024-04-05', 90, (SELECT id FROM vino WHERE nombre = 'Trapiche Cabernet')),
(FALSE, '2024-06-30', 86, (SELECT id FROM vino WHERE nombre = 'Trapiche Cabernet'));

-- Insertar reseñas para Callia Syrah
INSERT INTO resenia (es_premium, fecha_resenia, puntaje, vino_id) VALUES
(TRUE, '2024-01-10', 92, (SELECT id FROM vino WHERE nombre = 'Callia Syrah')),
(FALSE, '2024-02-18', 84, (SELECT id FROM vino WHERE nombre = 'Callia Syrah')),
(TRUE, '2024-03-21', 91, (SELECT id FROM vino WHERE nombre = 'Callia Syrah')),
(FALSE, '2024-04-27', 83, (SELECT id FROM vino WHERE nombre = 'Callia Syrah')),
(TRUE, '2024-05-15', 93, (SELECT id FROM vino WHERE nombre = 'Callia Syrah'));

-- Insertar reseñas para Montes Carmenere
INSERT INTO resenia (es_premium, fecha_resenia, puntaje, vino_id) VALUES
(FALSE, '2024-01-30', 87, (SELECT id FROM vino WHERE nombre = 'Montes Carmenere')),
(TRUE, '2024-02-15', 93, (SELECT id FROM vino WHERE nombre = 'Montes Carmenere')),
(FALSE, '2024-03-05', 89, (SELECT id FROM vino WHERE nombre = 'Montes Carmenere')),
(TRUE, '2024-04-15', 94, (SELECT id FROM vino WHERE nombre = 'Montes Carmenere')),
(FALSE, '2024-05-25', 90, (SELECT id FROM vino WHERE nombre = 'Montes Carmenere'));

-- Insertar reseñas para Garzón Pinot Noir
INSERT INTO resenia (es_premium, fecha_resenia, puntaje, vino_id) VALUES
(TRUE, '2024-01-05', 88, (SELECT id FROM vino WHERE nombre = 'Garzón Pinot Noir')),
(FALSE, '2024-02-12', 85, (SELECT id FROM vino WHERE nombre = 'Garzón Pinot Noir')),
(TRUE, '2024-03-08', 91, (SELECT id FROM vino WHERE nombre = 'Garzón Pinot Noir')),
(FALSE, '2024-04-20', 83, (SELECT id FROM vino WHERE nombre = 'Garzón Pinot Noir')),
(TRUE, '2024-05-18', 92, (SELECT id FROM vino WHERE nombre = 'Garzón Pinot Noir'));

-- Más reseñas aleatorias para todos los vinos
INSERT INTO resenia (es_premium, fecha_resenia, puntaje, vino_id) VALUES
(TRUE, '2024-06-01', 97, (SELECT id FROM vino WHERE nombre = 'Norton Malbec Gran Reserva')),
(FALSE, '2024-06-10', 86, (SELECT id FROM vino WHERE nombre = 'Trapiche Cabernet')),
(TRUE, '2024-06-15', 94, (SELECT id FROM vino WHERE nombre = 'Callia Syrah')),
(FALSE, '2024-06-20', 85, (SELECT id FROM vino WHERE nombre = 'Montes Carmenere')),
(TRUE, '2024-06-25', 93, (SELECT id FROM vino WHERE nombre = 'Garzón Pinot Noir')),
(TRUE, '2024-07-05', 98, (SELECT id FROM vino WHERE nombre = 'Norton Malbec Gran Reserva')),
(FALSE, '2024-07-10', 89, (SELECT id FROM vino WHERE nombre = 'Trapiche Cabernet')),
(TRUE, '2024-07-15', 95, (SELECT id FROM vino WHERE nombre = 'Callia Syrah')),
(FALSE, '2024-07-20', 84, (SELECT id FROM vino WHERE nombre = 'Montes Carmenere')),
(TRUE, '2024-07-25', 91, (SELECT id FROM vino WHERE nombre = 'Garzón Pinot Noir'));
