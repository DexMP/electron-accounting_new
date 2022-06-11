-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Хост: sql4.freemysqlhosting.net
-- Время создания: Июн 11 2022 г., 01:52
-- Версия сервера: 5.5.54-0ubuntu0.12.04.1
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
-- База данных: `sql4498020`
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
('8ccd2a29aa7ff5b6', 'test', 1.1, '2022-06-09'),
('88dc0ba4bec1140c', 'test', 14663, '2022-06-10'),
('a16e7c7c2a41ff9d', 'test', 123.21, '2022-06-10'),
('9934c875ea636bce', 'test', 1.55, '2022-06-10'),
('532d09fff5927e76', 'test', 2.75, '2022-06-10'),
('fd9b10ffa80b1a1b', 'test', 3.58, '2022-06-10');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
