-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 06 Nov 2021 pada 13.11
-- Versi server: 5.7.33
-- Versi PHP: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `manga`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `info`
--

CREATE TABLE `info` (
  `id` int(100) NOT NULL,
  `manga_name` varchar(300) NOT NULL,
  `japan_title` varchar(100) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `chapter` varchar(100) NOT NULL,
  `genre` varchar(100) NOT NULL,
  `type` varchar(300) NOT NULL,
  `author` varchar(100) NOT NULL,
  `published` varchar(100) NOT NULL,
  `score` varchar(100) NOT NULL,
  `views` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `path_image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `info`
--

INSERT INTO `info` (`id`, `manga_name`, `japan_title`, `description`, `chapter`, `genre`, `type`, `author`, `published`, `score`, `views`, `status`, `path_image`) VALUES
(3, 'Chichi wa Eiyuu, Haha wa Seirei, Musume no Watashi wa Tenseisha', 'Chichi wa Eiyuu, Haha wa Seirei, Musume no Watashi wa Tenseisha', '\n \n                ', '36', '\n                                \n                                    Fantasy\n                      ', 'Light Novel', 'keepout', 'Mar 10, 2018 to ?', 'N/A', '55', 'Publishing', './manga/Chichi-wa-Eiyuu-Haha-wa-Seirei-Musume-no-Watashi-wa-Tenseisha');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `info`
--
ALTER TABLE `info`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
