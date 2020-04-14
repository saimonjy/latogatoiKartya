-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Gép: localhost
-- Létrehozás ideje: 2020. Ápr 14. 22:48
-- Kiszolgáló verziója: 10.1.39-MariaDB
-- PHP verzió: 7.1.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `Latogatoi`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `Card`
--

CREATE TABLE `Card` (
  `id` int(11) NOT NULL,
  `elotag` varchar(5) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `vezeteknev` varchar(20) COLLATE utf8_hungarian_ci NOT NULL,
  `keresztnev` varchar(20) COLLATE utf8_hungarian_ci NOT NULL,
  `intezmeny_nev` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `img` longtext COLLATE utf8_hungarian_ci,
  `rendfokozat` varchar(30) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `latogatoi_csoport` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `nev` varchar(32) COLLATE utf8_hungarian_ci NOT NULL,
  `jelszo` varchar(32) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `latogatoi_csoport`
--

CREATE TABLE `latogatoi_csoport` (
  `id` int(11) NOT NULL,
  `nev` varchar(30) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `latogatoi_csoport`
--

INSERT INTO `latogatoi_csoport` (`id`, `nev`) VALUES
(1, 'Tanuló'),
(2, 'Tanár'),
(3, 'Vendeg');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `Card`
--
ALTER TABLE `Card`
  ADD PRIMARY KEY (`id`),
  ADD KEY `latogatoi_csoport` (`latogatoi_csoport`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`nev`);

--
-- A tábla indexei `latogatoi_csoport`
--
ALTER TABLE `latogatoi_csoport`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `Card`
--
ALTER TABLE `Card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `latogatoi_csoport`
--
ALTER TABLE `latogatoi_csoport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `Card`
--
ALTER TABLE `Card`
  ADD CONSTRAINT `card_ibfk_1` FOREIGN KEY (`latogatoi_csoport`) REFERENCES `latogatoi_csoport` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
