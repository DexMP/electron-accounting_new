-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Хост: sql11.freemysqlhosting.net
-- Время создания: Июн 04 2022 г., 00:54
-- Версия сервера: 5.5.62-0ubuntu0.14.04.1
-- Версия PHP: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `sql11496402`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cash_data`
--

CREATE TABLE `cash_data` (
  `transaction` varchar(255) NOT NULL,
  `username` varchar(28) NOT NULL,
  `cash` float NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `cash_data`
--

INSERT INTO `cash_data` (`transaction`, `username`, `cash`, `date`) VALUES
('dea5b23fe36ce26e', 'test', 1235, '2022-06-03'),
('d81dec953b6c33a1', 'test', 1231, '2022-06-03'),
('77bf1f789d2142a1', 'test', 13, '2022-06-03'),
('e69ab73da7edf6f5', 'test', 15.5, '2022-06-03'),
('db8165237705a504', 'test', 7885680, '2022-06-03'),
('409b5982ce37ee57', 'test', 788568, '2022-06-03'),
('99936418484ff637', 'test', 788562, '2022-06-03'),
('3fca6c090bd5ec60', 'test', 788562, '2022-06-03'),
('664cb8af068eb2d3', 'test', 788562, '2022-06-03'),
('b63799a031415f92', 'test', 788562, '2022-06-03'),
('f1a3b54f1c42600f', 'test', 788562, '2022-06-03'),
('82e38cec6cec8e79', 'test', 788562, '2022-06-03');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
