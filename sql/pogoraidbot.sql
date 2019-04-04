-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 62.108.32.172:3306
-- Erstellungszeit: 04. Apr 2019 um 21:24
-- Server-Version: 5.6.40
-- PHP-Version: 7.1.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `pogoraidbot`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `abo`
--

CREATE TABLE `abo` (
  `id` int(11) NOT NULL,
  `abo_type` varchar(45) NOT NULL,
  `abo_level` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `attendance`
--

CREATE TABLE `attendance` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `raid_id` int(10) UNSIGNED DEFAULT NULL,
  `attend_time` datetime DEFAULT NULL,
  `extra_mystic` tinyint(1) UNSIGNED DEFAULT '0',
  `extra_valor` tinyint(1) UNSIGNED DEFAULT '0',
  `extra_instinct` tinyint(1) UNSIGNED DEFAULT '0',
  `arrived` tinyint(1) UNSIGNED DEFAULT '0',
  `raid_done` tinyint(1) UNSIGNED DEFAULT '0',
  `cancel` tinyint(1) UNSIGNED DEFAULT '0',
  `late` tinyint(1) UNSIGNED DEFAULT '0',
  `invite` tinyint(1) UNSIGNED DEFAULT '0',
  `pokemon` varchar(20) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `cleanup`
--

CREATE TABLE `cleanup` (
  `id` int(10) UNSIGNED NOT NULL,
  `raid_id` int(10) UNSIGNED NOT NULL,
  `chat_id` bigint(20) NOT NULL,
  `message_id` bigint(20) UNSIGNED NOT NULL,
  `cleaned` int(10) UNSIGNED DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `groups`
--

CREATE TABLE `groups` (
  `chat_id` bigint(20) NOT NULL,
  `chat_name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `gyms`
--

CREATE TABLE `gyms` (
  `id` int(10) UNSIGNED NOT NULL,
  `lat` decimal(10,8) DEFAULT NULL,
  `lon` decimal(11,8) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `gym_name` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ex_gym` tinyint(1) UNSIGNED DEFAULT '0',
  `show_gym` tinyint(1) UNSIGNED DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `moves`
-- (Siehe unten für die tatsächliche Ansicht)
--
CREATE TABLE `moves` (
`id` int(10) unsigned
,`move_1` varchar(90)
,`move_2` varchar(90)
);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `overview`
--

CREATE TABLE `overview` (
  `id` int(10) UNSIGNED NOT NULL,
  `chat_id` bigint(20) NOT NULL,
  `message_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pokemon`
--

CREATE TABLE `pokemon` (
  `id` int(10) UNSIGNED NOT NULL,
  `pokedex_id` int(10) UNSIGNED NOT NULL,
  `pokemon_name` varchar(12) DEFAULT NULL,
  `pokemon_form` varchar(12) DEFAULT 'normal',
  `raid_level` enum('0','1','2','3','4','5','X') DEFAULT '0',
  `min_cp` int(10) UNSIGNED NOT NULL,
  `max_cp` int(10) UNSIGNED NOT NULL,
  `min_weather_cp` int(10) UNSIGNED NOT NULL,
  `max_weather_cp` int(10) UNSIGNED NOT NULL,
  `weather` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pokemon_i18n`
--

CREATE TABLE `pokemon_i18n` (
  `pokedex_id` int(10) UNSIGNED NOT NULL,
  `language` varchar(45) NOT NULL,
  `pokemon_name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pokemon_sent`
--

CREATE TABLE `pokemon_sent` (
  `user_id` bigint(20) DEFAULT NULL,
  `pokemon_id` int(10) UNSIGNED DEFAULT NULL,
  `expire_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `pokemon_sightings`
-- (Siehe unten für die tatsächliche Ansicht)
--
CREATE TABLE `pokemon_sightings` (
`pokemon_id` smallint(6)
,`pokemon_name` varchar(12)
,`tth` time
,`lat` double(18,14)
,`lon` double(18,14)
,`iv` decimal(9,0)
,`level` smallint(6)
,`cp` smallint(6)
,`gender` varchar(1)
,`form` smallint(6)
);

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `pokeradar`
-- (Siehe unten für die tatsächliche Ansicht)
--
CREATE TABLE `pokeradar` (
`user_id` bigint(20)
,`pokemon_id` int(10) unsigned
,`pokemon_name` varchar(12)
,`deadline` datetime
,`lat` double(18,14)
,`lon` double(18,14)
,`iv` decimal(12,4)
,`level` smallint(6)
,`cp` smallint(6)
);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `raids`
--

CREATE TABLE `raids` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `pokemon` varchar(20) DEFAULT NULL,
  `first_seen` datetime DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `timezone` char(30) DEFAULT NULL,
  `gym_team` enum('mystic','valor','instinct') DEFAULT NULL,
  `gym_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `nick` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `name` varchar(200) CHARACTER SET utf8mb4 DEFAULT NULL,
  `team` enum('mystic','valor','instinct') DEFAULT NULL,
  `moderator` tinyint(1) UNSIGNED DEFAULT NULL,
  `timezone` int(10) DEFAULT NULL,
  `level` int(10) UNSIGNED DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user_abo`
--

CREATE TABLE `user_abo` (
  `user_id` int(11) NOT NULL,
  `abo_id` int(11) NOT NULL,
  `city` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user_pokemon`
--

CREATE TABLE `user_pokemon` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `pokemon_id` int(10) UNSIGNED DEFAULT NULL,
  `min_iv` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur des Views `moves`
--
DROP TABLE IF EXISTS `moves`;

CREATE ALGORITHM=UNDEFINED DEFINER=`%USER%`@`%` SQL SECURITY DEFINER VIEW `moves`  AS  select `gyms`.`id` AS `id`,`moves`.`move_1` AS `move_1`,`moves`.`move_2` AS `move_2` from (`mapadroid`.`raid_moves` `moves` join `gyms`) where (convert(`moves`.`name` using utf8mb4) = `gyms`.`gym_name`) ;

-- --------------------------------------------------------

--
-- Struktur des Views `pokemon_sightings`
--
DROP TABLE IF EXISTS `pokemon_sightings`;

CREATE ALGORITHM=UNDEFINED DEFINER=`%USER%`@`%` SQL SECURITY DEFINER VIEW `pokemon_sightings`  AS  select distinct `mapadroid`.`sightings`.`pokemon_id` AS `pokemon_id`,`pokemon`.`pokemon_name` AS `pokemon_name`,sec_to_time(timestampdiff(SECOND,now(),from_unixtime(`mapadroid`.`sightings`.`expire_timestamp`))) AS `tth`,`mapadroid`.`sightings`.`lat` AS `lat`,`mapadroid`.`sightings`.`lon` AS `lon`,round((case when isnull(((`mapadroid`.`sightings`.`atk_iv` + `mapadroid`.`sightings`.`def_iv`) + `mapadroid`.`sightings`.`sta_iv`)) then 0 else ((((`mapadroid`.`sightings`.`atk_iv` + `mapadroid`.`sightings`.`def_iv`) + `mapadroid`.`sightings`.`sta_iv`) / 45) * 100) end),0) AS `iv`,`mapadroid`.`sightings`.`level` AS `level`,`mapadroid`.`sightings`.`cp` AS `cp`,(case when (`mapadroid`.`sightings`.`gender` = 2) then 'm' else 'w' end) AS `gender`,`mapadroid`.`sightings`.`form` AS `form` from (`mapadroid`.`sightings` left join `pokemon` on((`pokemon`.`pokedex_id` = `mapadroid`.`sightings`.`pokemon_id`))) where (from_unixtime(`mapadroid`.`sightings`.`expire_timestamp`) > (now() + interval 3 minute)) order by `mapadroid`.`sightings`.`expire_timestamp` ;

-- --------------------------------------------------------

--
-- Struktur des Views `pokeradar`
--
DROP TABLE IF EXISTS `pokeradar`;

CREATE ALGORITHM=UNDEFINED DEFINER=`%USER%`@`%` SQL SECURITY DEFINER VIEW `pokeradar`  AS  select `user_pokemon`.`user_id` AS `user_id`,`pokemon`.`pokedex_id` AS `pokemon_id`,`pokemon`.`pokemon_name` AS `pokemon_name`,from_unixtime(`mapadroid`.`sightings`.`expire_timestamp`) AS `deadline`,`mapadroid`.`sightings`.`lat` AS `lat`,`mapadroid`.`sightings`.`lon` AS `lon`,(case when isnull(((`mapadroid`.`sightings`.`atk_iv` + `mapadroid`.`sightings`.`def_iv`) + `mapadroid`.`sightings`.`sta_iv`)) then 0 else ((((`mapadroid`.`sightings`.`atk_iv` + `mapadroid`.`sightings`.`def_iv`) + `mapadroid`.`sightings`.`sta_iv`) / 45) * 100) end) AS `iv`,`mapadroid`.`sightings`.`level` AS `level`,`mapadroid`.`sightings`.`cp` AS `cp` from ((`mapadroid`.`sightings` join `user_pokemon` on(((`user_pokemon`.`pokemon_id` = `mapadroid`.`sightings`.`pokemon_id`) and ((case when isnull(((`mapadroid`.`sightings`.`atk_iv` + `mapadroid`.`sightings`.`def_iv`) + `mapadroid`.`sightings`.`sta_iv`)) then 0 else ((((`mapadroid`.`sightings`.`atk_iv` + `mapadroid`.`sightings`.`def_iv`) + `mapadroid`.`sightings`.`sta_iv`) / 45) * 100) end) >= `user_pokemon`.`min_iv`)))) join `pokemon` on((`pokemon`.`pokedex_id` = `mapadroid`.`sightings`.`pokemon_id`))) where (`mapadroid`.`sightings`.`expire_timestamp` > unix_timestamp((now() + interval 5 minute))) ;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `abo`
--
ALTER TABLE `abo`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `raid_id` (`raid_id`);

--
-- Indizes für die Tabelle `cleanup`
--
ALTER TABLE `cleanup`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`chat_id`);

--
-- Indizes für die Tabelle `gyms`
--
ALTER TABLE `gyms`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `overview`
--
ALTER TABLE `overview`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `pokemon`
--
ALTER TABLE `pokemon`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `pokemon_i18n`
--
ALTER TABLE `pokemon_i18n`
  ADD PRIMARY KEY (`pokedex_id`,`language`,`pokemon_name`);

--
-- Indizes für die Tabelle `pokemon_sent`
--
ALTER TABLE `pokemon_sent`
  ADD KEY `FK_USER_ID_idx` (`user_id`);

--
-- Indizes für die Tabelle `raids`
--
ALTER TABLE `raids`
  ADD PRIMARY KEY (`id`),
  ADD KEY `end_time` (`end_time`),
  ADD KEY `user_id` (`user_id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `i_userid` (`user_id`);

--
-- Indizes für die Tabelle `user_abo`
--
ALTER TABLE `user_abo`
  ADD PRIMARY KEY (`user_id`,`abo_id`,`city`);

--
-- Indizes für die Tabelle `user_pokemon`
--
ALTER TABLE `user_pokemon`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `abo`
--
ALTER TABLE `abo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `cleanup`
--
ALTER TABLE `cleanup`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `gyms`
--
ALTER TABLE `gyms`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `overview`
--
ALTER TABLE `overview`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `pokemon`
--
ALTER TABLE `pokemon`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `raids`
--
ALTER TABLE `raids`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `user_pokemon`
--
ALTER TABLE `user_pokemon`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `pokemon_sent`
--
ALTER TABLE `pokemon_sent`
  ADD CONSTRAINT `FK_USER_ID` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
