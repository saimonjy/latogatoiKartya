-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 15, 2020 at 07:21 PM
-- Server version: 10.1.40-MariaDB
-- PHP Version: 7.1.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `latogatoi`
--
CREATE DATABASE IF NOT EXISTS `latogatoi` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `latogatoi`;

-- --------------------------------------------------------

--
-- Table structure for table `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `nev` varchar(32) COLLATE utf8_hungarian_ci NOT NULL,
  `jelszo` varchar(32) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `felhasznalok`
--

INSERT INTO `felhasznalok` (`nev`, `jelszo`) VALUES
('hello', 'cd880b726e0a0dbd4237f10d15da46f4');

-- --------------------------------------------------------

--
-- Table structure for table `kartyak`
--

CREATE TABLE `kartyak` (
  `id` int(11) NOT NULL,
  `vezeteknev` varchar(20) COLLATE utf8_hungarian_ci NOT NULL,
  `keresztnev` varchar(20) COLLATE utf8_hungarian_ci NOT NULL,
  `img` longtext COLLATE utf8_hungarian_ci,
  `rendfokozat` varchar(30) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `latogatoi_csoport` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `kartyak`
--

INSERT INTO `kartyak` (`id`, `vezeteknev`, `keresztnev`, `img`, `rendfokozat`, `latogatoi_csoport`) VALUES
(7, 'asdasdf', '', '', '', 4);

-- --------------------------------------------------------

--
-- Table structure for table `latogatoi_csoportok`
--

CREATE TABLE `latogatoi_csoportok` (
  `id` int(11) NOT NULL,
  `nev` varchar(30) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `latogatoi_csoportok`
--

INSERT INTO `latogatoi_csoportok` (`id`, `nev`) VALUES
(4, 'Tanulók'),
(5, 'Tanárok');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`nev`);

--
-- Indexes for table `kartyak`
--
ALTER TABLE `kartyak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `latogatoi_csoport` (`latogatoi_csoport`);

--
-- Indexes for table `latogatoi_csoportok`
--
ALTER TABLE `latogatoi_csoportok`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kartyak`
--
ALTER TABLE `kartyak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `latogatoi_csoportok`
--
ALTER TABLE `latogatoi_csoportok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kartyak`
--
ALTER TABLE `kartyak`
  ADD CONSTRAINT `card_ibfk_1` FOREIGN KEY (`latogatoi_csoport`) REFERENCES `latogatoi_csoportok` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
