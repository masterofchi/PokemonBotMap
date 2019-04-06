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
-- Datenbank: `mapadroid`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `common`
--

CREATE TABLE `common` (
  `id` int(11) NOT NULL,
  `key` varchar(32) NOT NULL,
  `val` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `communities`
--

CREATE TABLE `communities` (
  `id` int(11) NOT NULL,
  `community_id` varchar(35) DEFAULT NULL,
  `title` varchar(64) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `image_url` varchar(200) DEFAULT NULL,
  `size` smallint(6) DEFAULT NULL,
  `team_instinct` tinyint(4) DEFAULT NULL,
  `team_mystic` tinyint(4) DEFAULT NULL,
  `team_valor` tinyint(4) DEFAULT NULL,
  `has_invite_url` varchar(4) DEFAULT NULL,
  `invite_url` varchar(512) DEFAULT NULL,
  `lat` double(18,14) DEFAULT NULL,
  `lon` double(18,14) DEFAULT NULL,
  `updated` bigint(20) DEFAULT NULL,
  `source` tinyint(4) DEFAULT NULL,
  `submitted_by` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `forts`
--

CREATE TABLE `forts` (
  `id` int(11) NOT NULL,
  `external_id` varchar(35) DEFAULT NULL,
  `lat` double(18,14) DEFAULT NULL,
  `lon` double(18,14) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `sponsor` smallint(6) DEFAULT NULL,
  `weather_cell_id` bigint(20) UNSIGNED DEFAULT NULL,
  `park` varchar(128) DEFAULT NULL,
  `parkid` bigint(20) DEFAULT NULL,
  `edited_by` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fort_sightings`
--

CREATE TABLE `fort_sightings` (
  `id` bigint(20) NOT NULL,
  `fort_id` int(11) DEFAULT NULL,
  `last_modified` int(11) DEFAULT NULL,
  `team` tinyint(3) UNSIGNED DEFAULT NULL,
  `guard_pokemon_id` smallint(6) DEFAULT NULL,
  `guard_pokemon_form` smallint(6) DEFAULT NULL,
  `slots_available` smallint(6) DEFAULT NULL,
  `is_in_battle` tinyint(1) DEFAULT NULL,
  `updated` int(11) DEFAULT NULL,
  `is_ex_raid_eligible` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `gym_defenders`
--

CREATE TABLE `gym_defenders` (
  `id` bigint(20) NOT NULL,
  `fort_id` int(11) NOT NULL,
  `external_id` bigint(20) UNSIGNED NOT NULL,
  `pokemon_id` smallint(6) DEFAULT NULL,
  `form` smallint(6) DEFAULT NULL,
  `team` tinyint(3) UNSIGNED DEFAULT NULL,
  `owner_name` varchar(128) DEFAULT NULL,
  `nickname` varchar(128) DEFAULT NULL,
  `cp` int(11) DEFAULT NULL,
  `stamina` int(11) DEFAULT NULL,
  `stamina_max` int(11) DEFAULT NULL,
  `atk_iv` smallint(6) DEFAULT NULL,
  `def_iv` smallint(6) DEFAULT NULL,
  `sta_iv` smallint(6) DEFAULT NULL,
  `move_1` smallint(6) DEFAULT NULL,
  `move_2` smallint(6) DEFAULT NULL,
  `last_modified` int(11) DEFAULT NULL,
  `battles_attacked` int(11) DEFAULT NULL,
  `battles_defended` int(11) DEFAULT NULL,
  `num_upgrades` smallint(6) DEFAULT NULL,
  `created` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `gym_team`
-- (Siehe unten für die tatsächliche Ansicht)
--
CREATE TABLE `gym_team` (
`name` varchar(128)
,`team` tinyint(3) unsigned
,`last_modified` int(11)
,`slots_available` smallint(6)
,`image_link` varchar(200)
);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ingress_portals`
--

CREATE TABLE `ingress_portals` (
  `id` int(11) NOT NULL,
  `external_id` varchar(35) DEFAULT NULL,
  `lat` double(18,14) DEFAULT NULL,
  `lon` double(18,14) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `updated` bigint(11) NOT NULL,
  `imported` bigint(11) DEFAULT NULL,
  `checked` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `move`
--

CREATE TABLE `move` (
  `id` int(11) NOT NULL,
  `name` varchar(90) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `mystery_sightings`
--

CREATE TABLE `mystery_sightings` (
  `id` bigint(20) NOT NULL,
  `pokemon_id` smallint(6) DEFAULT NULL,
  `spawn_id` bigint(20) DEFAULT NULL,
  `encounter_id` bigint(20) UNSIGNED DEFAULT NULL,
  `lat` double(18,14) DEFAULT NULL,
  `lon` double(18,14) DEFAULT NULL,
  `first_seen` int(11) DEFAULT NULL,
  `first_seconds` smallint(6) DEFAULT NULL,
  `last_seconds` smallint(6) DEFAULT NULL,
  `seen_range` smallint(6) DEFAULT NULL,
  `atk_iv` tinyint(3) UNSIGNED DEFAULT NULL,
  `def_iv` tinyint(3) UNSIGNED DEFAULT NULL,
  `sta_iv` tinyint(3) UNSIGNED DEFAULT NULL,
  `move_1` smallint(6) DEFAULT NULL,
  `move_2` smallint(6) DEFAULT NULL,
  `gender` smallint(6) DEFAULT NULL,
  `form` smallint(6) DEFAULT NULL,
  `cp` smallint(6) DEFAULT NULL,
  `level` smallint(6) DEFAULT NULL,
  `weather_boosted_condition` smallint(6) DEFAULT NULL,
  `weather_cell_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `nests`
--

CREATE TABLE `nests` (
  `nest_id` bigint(20) NOT NULL,
  `lat` double(18,14) DEFAULT NULL,
  `lon` double(18,14) DEFAULT NULL,
  `pokemon_id` int(11) DEFAULT '0',
  `updated` bigint(20) DEFAULT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '0',
  `nest_submitted_by` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `selly_id` varchar(100) NOT NULL,
  `product_id` int(30) NOT NULL,
  `email` varchar(250) NOT NULL,
  `value` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `timestamp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pokestops`
--

CREATE TABLE `pokestops` (
  `id` int(11) NOT NULL,
  `external_id` varchar(35) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lat` double(18,14) DEFAULT NULL,
  `lon` double(18,14) DEFAULT NULL,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated` int(11) DEFAULT NULL,
  `quest_id` smallint(4) DEFAULT NULL,
  `reward_id` smallint(4) DEFAULT NULL,
  `deployer` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lure_start` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expires` int(11) DEFAULT NULL,
  `quest_submitted_by` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `edited_by` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `raids`
--

CREATE TABLE `raids` (
  `id` int(11) NOT NULL,
  `external_id` bigint(20) DEFAULT NULL,
  `fort_id` int(11) DEFAULT NULL,
  `level` tinyint(3) UNSIGNED DEFAULT NULL,
  `pokemon_id` smallint(6) DEFAULT NULL,
  `move_1` smallint(6) DEFAULT NULL,
  `move_2` smallint(6) DEFAULT NULL,
  `time_spawn` int(11) DEFAULT NULL,
  `time_battle` int(11) DEFAULT NULL,
  `time_end` int(11) DEFAULT NULL,
  `last_updated` int(11) DEFAULT NULL,
  `cp` int(11) DEFAULT NULL,
  `submitted_by` varchar(200) DEFAULT NULL,
  `form` smallint(6) DEFAULT NULL,
  `is_exclusive` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `raid_moves`
-- (Siehe unten für die tatsächliche Ansicht)
--
CREATE TABLE `raid_moves` (
`name` varchar(128)
,`pokemon_id` smallint(6)
,`move_1` varchar(90)
,`move_2` varchar(90)
);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sightings`
--

CREATE TABLE `sightings` (
  `id` bigint(20) NOT NULL,
  `pokemon_id` smallint(6) DEFAULT NULL,
  `spawn_id` bigint(20) DEFAULT NULL,
  `expire_timestamp` int(11) DEFAULT NULL,
  `encounter_id` bigint(20) UNSIGNED DEFAULT NULL,
  `lat` double(18,14) DEFAULT NULL,
  `lon` double(18,14) DEFAULT NULL,
  `atk_iv` tinyint(3) UNSIGNED DEFAULT NULL,
  `def_iv` tinyint(3) UNSIGNED DEFAULT NULL,
  `sta_iv` tinyint(3) UNSIGNED DEFAULT NULL,
  `move_1` smallint(6) DEFAULT NULL,
  `move_2` smallint(6) DEFAULT NULL,
  `gender` smallint(6) DEFAULT NULL,
  `form` smallint(6) DEFAULT NULL,
  `cp` smallint(6) DEFAULT NULL,
  `level` smallint(6) DEFAULT NULL,
  `updated` int(11) DEFAULT NULL,
  `weather_boosted_condition` smallint(6) DEFAULT NULL,
  `weather_cell_id` bigint(20) UNSIGNED DEFAULT NULL,
  `weight` double(18,14) DEFAULT NULL,
  `costume` smallint(6) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `spawnpoints`
--

CREATE TABLE `spawnpoints` (
  `id` int(11) NOT NULL,
  `spawn_id` bigint(20) DEFAULT NULL,
  `despawn_time` smallint(6) DEFAULT NULL,
  `lat` double(18,14) DEFAULT NULL,
  `lon` double(18,14) DEFAULT NULL,
  `updated` int(11) DEFAULT NULL,
  `duration` tinyint(3) UNSIGNED DEFAULT NULL,
  `failures` tinyint(3) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `trshash`
--

CREATE TABLE `trshash` (
  `hashid` mediumint(9) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `type` varchar(10) NOT NULL,
  `id` varchar(255) NOT NULL,
  `count` int(10) NOT NULL DEFAULT '1',
  `modify` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `trs_quest`
--

CREATE TABLE `trs_quest` (
  `GUID` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quest_type` tinyint(3) NOT NULL,
  `quest_timestamp` int(11) NOT NULL,
  `quest_stardust` smallint(4) NOT NULL,
  `quest_pokemon_id` smallint(4) NOT NULL,
  `quest_reward_type` smallint(3) NOT NULL,
  `quest_item_id` smallint(3) NOT NULL,
  `quest_item_amount` tinyint(2) NOT NULL,
  `quest_target` tinyint(3) NOT NULL,
  `quest_condition` varchar(500) DEFAULT NULL,
  `quest_reward` varchar(1000) DEFAULT NULL,
  `quest_task` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `trs_spawn`
--

CREATE TABLE `trs_spawn` (
  `spawnpoint` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `spawndef` int(11) NOT NULL DEFAULT '240',
  `earliest_unseen` int(6) NOT NULL,
  `last_scanned` datetime DEFAULT NULL,
  `first_detection` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_non_scanned` datetime DEFAULT NULL,
  `calc_endminsec` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `trs_spawnsightings`
--

CREATE TABLE `trs_spawnsightings` (
  `id` int(11) NOT NULL,
  `encounter_id` bigint(20) UNSIGNED NOT NULL,
  `spawnpoint_id` bigint(20) UNSIGNED NOT NULL,
  `scan_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tth_secs` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `trs_status`
--

CREATE TABLE `trs_status` (
  `origin` varchar(50) NOT NULL,
  `currentPos` varchar(50) DEFAULT NULL,
  `lastPos` varchar(50) DEFAULT NULL,
  `routePos` int(11) DEFAULT NULL,
  `routeMax` int(11) DEFAULT NULL,
  `routemanager` varchar(255) DEFAULT NULL,
  `rebootCounter` int(11) DEFAULT NULL,
  `lastProtoDateTime` varchar(50) DEFAULT NULL,
  `lastPogoRestart` varchar(50) DEFAULT NULL,
  `init` text,
  `rebootingOption` text,
  `restartCounter` text,
  `lastPogoReboot` varchar(50) DEFAULT NULL,
  `globalrebootcount` int(11) DEFAULT '0',
  `globalrestartcount` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `trs_usage`
--

CREATE TABLE `trs_usage` (
  `usage_id` int(10) NOT NULL,
  `instance` varchar(100) DEFAULT NULL,
  `cpu` float DEFAULT NULL,
  `memory` float DEFAULT NULL,
  `garbage` int(5) DEFAULT NULL,
  `timestamp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `user` varchar(250) NOT NULL,
  `password` varchar(250) DEFAULT NULL,
  `temp_password` varchar(250) DEFAULT NULL,
  `expire_timestamp` int(11) NOT NULL,
  `session_id` varchar(100) DEFAULT NULL,
  `login_system` varchar(40) NOT NULL,
  `access_level` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `weather`
--

CREATE TABLE `weather` (
  `id` int(11) NOT NULL,
  `s2_cell_id` bigint(20) DEFAULT NULL,
  `condition` tinyint(3) UNSIGNED DEFAULT NULL,
  `alert_severity` tinyint(3) UNSIGNED DEFAULT NULL,
  `warn` tinyint(1) DEFAULT NULL,
  `day` tinyint(3) UNSIGNED DEFAULT NULL,
  `updated` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur des Views `gym_team`
--
DROP TABLE IF EXISTS `gym_team`;

CREATE ALGORITHM=UNDEFINED DEFINER=`%USER%`@`%` SQL SECURITY DEFINER VIEW `gym_team`  AS  select `forts`.`name` AS `name`,`sightings`.`team` AS `team`,`sightings`.`last_modified` AS `last_modified`,`sightings`.`slots_available` AS `slots_available`,`forts`.`url` AS `image_link` from (`fort_sightings` `sightings` join `forts`) where ((`forts`.`id` = `sightings`.`fort_id`) and (`forts`.`name` is not null)) ;

-- --------------------------------------------------------

--
-- Struktur des Views `raid_moves`
--
DROP TABLE IF EXISTS `raid_moves`;

CREATE ALGORITHM=UNDEFINED DEFINER=`%USER%`@`%` SQL SECURITY DEFINER VIEW `raid_moves`  AS  select `forts`.`name` AS `name`,`raids`.`pokemon_id` AS `pokemon_id`,(select `move`.`name` from `move` where (`move`.`id` = `raids`.`move_1`)) AS `move_1`,(select `move`.`name` from `move` where (`move`.`id` = `raids`.`move_2`)) AS `move_2` from (`raids` join `forts`) where ((`forts`.`id` = `raids`.`fort_id`) and (`raids`.`time_end` > unix_timestamp(now())) and (`forts`.`name` is not null) and (`raids`.`pokemon_id` is not null)) ;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `common`
--
ALTER TABLE `common`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_common_key` (`key`);

--
-- Indizes für die Tabelle `communities`
--
ALTER TABLE `communities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `community_id` (`community_id`);

--
-- Indizes für die Tabelle `forts`
--
ALTER TABLE `forts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `external_id` (`external_id`),
  ADD KEY `ix_coords` (`lat`,`lon`);

--
-- Indizes für die Tabelle `fort_sightings`
--
ALTER TABLE `fort_sightings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fort_id_last_modified_unique` (`fort_id`,`last_modified`),
  ADD UNIQUE KEY `fort_id` (`fort_id`),
  ADD KEY `ix_fort_sightings_last_modified` (`last_modified`);

--
-- Indizes für die Tabelle `gym_defenders`
--
ALTER TABLE `gym_defenders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_gym_defenders_fort_id` (`fort_id`),
  ADD KEY `ix_gym_defenders_created` (`created`);

--
-- Indizes für die Tabelle `ingress_portals`
--
ALTER TABLE `ingress_portals`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `external_id` (`external_id`);

--
-- Indizes für die Tabelle `move`
--
ALTER TABLE `move`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `mystery_sightings`
--
ALTER TABLE `mystery_sightings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_encounter` (`encounter_id`,`spawn_id`),
  ADD KEY `ix_mystery_sightings_encounter_id` (`encounter_id`),
  ADD KEY `ix_mystery_sightings_spawn_id` (`spawn_id`),
  ADD KEY `ix_mystery_sightings_first_seen` (`first_seen`);

--
-- Indizes für die Tabelle `nests`
--
ALTER TABLE `nests`
  ADD PRIMARY KEY (`nest_id`);

--
-- Indizes für die Tabelle `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `pokestops`
--
ALTER TABLE `pokestops`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `external_id` (`external_id`),
  ADD KEY `ix_pokestops_lon` (`lon`),
  ADD KEY `ix_pokestops_lat` (`lat`);

--
-- Indizes für die Tabelle `raids`
--
ALTER TABLE `raids`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `external_id` (`external_id`),
  ADD KEY `fort_id` (`fort_id`),
  ADD KEY `ix_raids_time_spawn` (`time_spawn`);

--
-- Indizes für die Tabelle `sightings`
--
ALTER TABLE `sightings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `encounter_id` (`encounter_id`),
  ADD KEY `ix_sightings_encounter_id` (`encounter_id`),
  ADD KEY `ix_sightings_expire_timestamp` (`expire_timestamp`);

--
-- Indizes für die Tabelle `spawnpoints`
--
ALTER TABLE `spawnpoints`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ix_spawnpoints_spawn_id` (`spawn_id`),
  ADD KEY `ix_spawnpoints_updated` (`updated`),
  ADD KEY `ix_coords_sp` (`lat`,`lon`),
  ADD KEY `ix_spawnpoints_despawn_time` (`despawn_time`);

--
-- Indizes für die Tabelle `trshash`
--
ALTER TABLE `trshash`
  ADD PRIMARY KEY (`hashid`);

--
-- Indizes für die Tabelle `trs_quest`
--
ALTER TABLE `trs_quest`
  ADD PRIMARY KEY (`GUID`),
  ADD KEY `quest_type` (`quest_type`);

--
-- Indizes für die Tabelle `trs_spawn`
--
ALTER TABLE `trs_spawn`
  ADD UNIQUE KEY `spawnpoint_2` (`spawnpoint`),
  ADD KEY `spawnpoint` (`spawnpoint`);

--
-- Indizes für die Tabelle `trs_spawnsightings`
--
ALTER TABLE `trs_spawnsightings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trs_spawnpointdd_spawnpoint_id` (`spawnpoint_id`);

--
-- Indizes für die Tabelle `trs_status`
--
ALTER TABLE `trs_status`
  ADD PRIMARY KEY (`origin`);

--
-- Indizes für die Tabelle `trs_usage`
--
ALTER TABLE `trs_usage`
  ADD PRIMARY KEY (`usage_id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `weather`
--
ALTER TABLE `weather`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `s2_cell_id` (`s2_cell_id`) USING BTREE;

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `common`
--
ALTER TABLE `common`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `communities`
--
ALTER TABLE `communities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `forts`
--
ALTER TABLE `forts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `fort_sightings`
--
ALTER TABLE `fort_sightings`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `gym_defenders`
--
ALTER TABLE `gym_defenders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `ingress_portals`
--
ALTER TABLE `ingress_portals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `mystery_sightings`
--
ALTER TABLE `mystery_sightings`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `nests`
--
ALTER TABLE `nests`
  MODIFY `nest_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `pokestops`
--
ALTER TABLE `pokestops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `raids`
--
ALTER TABLE `raids`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `sightings`
--
ALTER TABLE `sightings`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `spawnpoints`
--
ALTER TABLE `spawnpoints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `trshash`
--
ALTER TABLE `trshash`
  MODIFY `hashid` mediumint(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `trs_spawnsightings`
--
ALTER TABLE `trs_spawnsightings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `trs_usage`
--
ALTER TABLE `trs_usage`
  MODIFY `usage_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `weather`
--
ALTER TABLE `weather`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `fort_sightings`
--
ALTER TABLE `fort_sightings`
  ADD CONSTRAINT `fort_sightings_ibfk_1` FOREIGN KEY (`fort_id`) REFERENCES `forts` (`id`);

--
-- Constraints der Tabelle `gym_defenders`
--
ALTER TABLE `gym_defenders`
  ADD CONSTRAINT `gym_defenders_ibfk_1` FOREIGN KEY (`fort_id`) REFERENCES `forts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `raids`
--
ALTER TABLE `raids`
  ADD CONSTRAINT `raids_ibfk_1` FOREIGN KEY (`fort_id`) REFERENCES `forts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
