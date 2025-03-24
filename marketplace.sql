-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 22-03-2025 a las 20:27:18
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `marketplace`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carreras`
--

CREATE DATABASE IF NOT EXISTS `marketplace` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish2_ci;
USE `marketplace`;

DROP TABLE IF EXISTS `carreras`;
CREATE TABLE IF NOT EXISTS `carreras` (
  `carrera_id` int NOT NULL AUTO_INCREMENT,
  `carrera_nombre` varchar(80) COLLATE utf8mb3_spanish2_ci NOT NULL,
  PRIMARY KEY (`carrera_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

--
-- Volcado de datos para la tabla `carreras`
--

INSERT INTO `carreras` (`carrera_id`, `carrera_nombre`) VALUES
(1, 'Computación'),
(2, 'Electrónica'),
(3, 'Diseño'),
(4, 'Civil'),
(5, 'Matemáticas aplicadas'),
(6, 'Alimentos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `producto_id` int NOT NULL AUTO_INCREMENT,
  `producto_descripcion` varchar(120) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `producto_precio` int NOT NULL,
  `producto_existencia` int NOT NULL,
  `producto_estado` int NOT NULL,
  `id_carrera_p` int NOT NULL,
  PRIMARY KEY (`producto_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`producto_id`, `producto_descripcion`, `producto_precio`, `producto_existencia`, `producto_estado`, `id_carrera_p`) VALUES
(1, 'Raspberry Pi Pico W RPW2040', 150, 2, 1, 1),
(2, 'Multímetro digital Truper VC301', 180, 1, 2, 2),
(3, 'Portaplanos Ke De 95 Cm Rojo Con Negro', 406, 1, 2, 3),
(4, 'Juego De 40 Pinceles Profesionales Con Estuche De Almacenami', 900, 1, 1, 3),
(5, 'Logitech M100 - Mouse USB con Cable, 3 Botones, Seguimiento óptico de 1000 dpi', 540, 1, 2, 1),
(6, 'Álgebra de Baldor Original', 270, 1, 2, 5),
(7, 'Kit de laboratorio de química : Industrial y Científico', 1900, 1, 2, 6),
(8, 'Mechero de Bunsen', 200, 2, 1, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_usuarios`
--

DROP TABLE IF EXISTS `productos_usuarios`;
CREATE TABLE IF NOT EXISTS `productos_usuarios` (
  `id_usuario` int NOT NULL,
  `id_producto` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

--
-- Volcado de datos para la tabla `productos_usuarios`
--

INSERT INTO `productos_usuarios` (`id_usuario`, `id_producto`) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(1, 5),
(4, 6),
(6, 7),
(6, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `usuario_nombre` varchar(60) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `usuario_apellidos` varchar(60) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `id_carrera_u` int NOT NULL,
  PRIMARY KEY (`usuario_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `usuario_nombre`, `usuario_apellidos`, `id_carrera_u`) VALUES
(1, 'Ulises', 'Pastor Martínez', 1),
(2, 'Francisco', 'Méndez Quiroz', 3),
(3, 'Hugo', 'López Mateos', 2),
(4, 'Gerardo', 'Díaz Rodríguez', 5),
(5, 'Juan', 'Cruz Silva', 4),
(6, 'Ana Lucía', 'García Álvarez', 6);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
