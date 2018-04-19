CREATE TABLE IF NOT EXISTS `egg` (
  `egg_id` int(11) NOT NULL AUTO_INCREMENT,
  `egg_name` varchar(255) NOT NULL,
  PRIMARY KEY (`egg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `goal` (
  `goal_id` int(11) NOT NULL AUTO_INCREMENT,
  `goal_name` varchar(255) NOT NULL,
  `goal_activity` varchar(50) NOT NULL,
  `goal_amount` int(11) NOT NULL,
  `goal_difficulty` varchar(50) NOT NULL,
  `goal_class` varchar(50) NOT NULL,
  `goal_points` varchar(50) NOT NULL,
  `goal_timedivisor` int(11) NOT NULL,
  PRIMARY KEY (`goal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `monster` (
  `monster_id` int(11) NOT NULL AUTO_INCREMENT,
  `monster_name` varchar(255) NOT NULL,
  `monster_pic` varchar(255) DEFAULT NULL,
  `monster_icon` varchar(255) DEFAULT NULL,
  `monster_description` varchar(255) DEFAULT NULL,
  `monster_sound` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`monster_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `fitbit_id` varchar(255) DEFAULT NULL,
  `user_username` varchar(255) NOT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_accesstoken` varchar(255) DEFAULT NULL,
  `user_refreshtoken` varchar(255) DEFAULT NULL,
  `user_level` int(11) NOT NULL DEFAULT '1',
  `user_current_xp` int(11) NOT NULL DEFAULT '0',
  `user_total_points` int(11) NOT NULL DEFAULT '0',
  `custom_goal_timer_1` varchar(255) DEFAULT NULL,
  `custom_goal_timer_2` varchar(255) DEFAULT NULL,
  `notified_of_push_notifications` bool default 0,
  `wants_push_notifications` bool default 0,
  `unsubscribed_from_notifications` bool default 0,
  `role` varchar (30) default null,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `user_egg` (
  `user_egg_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `egg_id` int(11) NOT NULL,
  `egg_xp` int(11) NOT NULL DEFAULT '0',
  `egg_hatched` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_egg_id`),
  KEY `user_id` (`user_id`),
  KEY `egg_id` (`egg_id`),
  CONSTRAINT `user_egg_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `user_egg_ibfk_2` FOREIGN KEY (`egg_id`) REFERENCES `egg` (`egg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `user_goal` (
  `user_goal_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `user_goal_start_value` int(11) DEFAULT NULL,
  `user_goal_current` int(11) DEFAULT NULL,
  `user_goal_target` int(11) DEFAULT NULL,
  `user_goal_start_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_goal_end_date` datetime DEFAULT NULL,
  `user_goal_finalized` tinyint(1) DEFAULT '0',
  `user_goal_success` tinyint(1) DEFAULT '0',
  `user_goal_concluded` tinyint(1) DEFAULT '0',
  `user_goal_points` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_goal_id`),
  KEY `user_id` (`user_id`),
  KEY `goal_id` (`goal_id`),
  CONSTRAINT `user_goal_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `user_goal_ibfk_2` FOREIGN KEY (`goal_id`) REFERENCES `goal` (`goal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `user_monster` (
  `user_monster_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `monster_id` int(11) NOT NULL,
  `user_monster_level` int(11) NOT NULL DEFAULT '1',
  `user_monster_new_name` varchar(255) DEFAULT NULL,
  `user_monster_attack` int(11) DEFAULT NULL,
  `user_monster_defense` int(11) DEFAULT NULL,
  `user_monster_current_xp` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_monster_id`),
  KEY `user_id` (`user_id`),
  KEY `monster_id` (`monster_id`),
  CONSTRAINT `user_monster_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `user_monster_ibfk_2` FOREIGN KEY (`monster_id`) REFERENCES `monster` (`monster_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO `egg` (`egg_id`,`egg_name`) VALUES (1,'scuttlebutt_egg');
INSERT INTO `egg` (`egg_id`,`egg_name`) VALUES (2,'pruny_egg');
INSERT INTO `egg` (`egg_id`,`egg_name`) VALUES (3,'bard_egg');
INSERT INTO `egg` (`egg_id`,`egg_name`) VALUES (4,'squaggle_egg');
INSERT INTO `egg` (`egg_id`,`egg_name`) VALUES (5,'kow_egg');

INSERT INTO `goal` (`goal_id`,`goal_name`,`goal_activity`,`goal_amount`,`goal_difficulty`,`goal_class`,`goal_points`,`goal_timedivisor`) VALUES (1,'Run 1 mile','distance',1,'easy','short','5',2);
INSERT INTO `goal` (`goal_id`,`goal_name`,`goal_activity`,`goal_amount`,`goal_difficulty`,`goal_class`,`goal_points`,`goal_timedivisor`) VALUES (2,'Run 2 miles','distance',2,'med','short','10',2);
INSERT INTO `goal` (`goal_id`,`goal_name`,`goal_activity`,`goal_amount`,`goal_difficulty`,`goal_class`,`goal_points`,`goal_timedivisor`) VALUES (3,'Run 5 miles','distance',5,'hard','short','20',2);
INSERT INTO `goal` (`goal_id`,`goal_name`,`goal_activity`,`goal_amount`,`goal_difficulty`,`goal_class`,`goal_points`,`goal_timedivisor`) VALUES (4,'Run 10 miles','distance',10,'easy','long','50',24);
INSERT INTO `goal` (`goal_id`,`goal_name`,`goal_activity`,`goal_amount`,`goal_difficulty`,`goal_class`,`goal_points`,`goal_timedivisor`) VALUES (5,'Run 25 miles','distance',25,'med','long','75',24);
INSERT INTO `goal` (`goal_id`,`goal_name`,`goal_activity`,`goal_amount`,`goal_difficulty`,`goal_class`,`goal_points`,`goal_timedivisor`) VALUES (6,'Run 50 miles','distance',50,'hard','long','100',24);
INSERT INTO `goal` (`goal_id`,`goal_name`,`goal_activity`,`goal_amount`,`goal_difficulty`,`goal_class`,`goal_points`,`goal_timedivisor`) VALUES (7,'Walk 2,000 steps','steps',2000,'easy','short','5',2);
INSERT INTO `goal` (`goal_id`,`goal_name`,`goal_activity`,`goal_amount`,`goal_difficulty`,`goal_class`,`goal_points`,`goal_timedivisor`) VALUES (8,'Walk 4,000 steps','steps',4000,'med','short','10',2);
INSERT INTO `goal` (`goal_id`,`goal_name`,`goal_activity`,`goal_amount`,`goal_difficulty`,`goal_class`,`goal_points`,`goal_timedivisor`) VALUES (9,'Walk 10,000 steps','steps',10000,'hard','short','20',2);
INSERT INTO `goal` (`goal_id`,`goal_name`,`goal_activity`,`goal_amount`,`goal_difficulty`,`goal_class`,`goal_points`,`goal_timedivisor`) VALUES (10,'Walk 20,000 steps','steps',20000,'easy','long','50',24);
INSERT INTO `goal` (`goal_id`,`goal_name`,`goal_activity`,`goal_amount`,`goal_difficulty`,`goal_class`,`goal_points`,`goal_timedivisor`) VALUES (11,'Walk 50,000 steps','steps',50000,'med','long','75',24);
INSERT INTO `goal` (`goal_id`,`goal_name`,`goal_activity`,`goal_amount`,`goal_difficulty`,`goal_class`,`goal_points`,`goal_timedivisor`) VALUES (12,'Walk 100,000 steps','steps',100000,'hard','long','100',24);
INSERT INTO `goal` (`goal_id`,`goal_name`,`goal_activity`,`goal_amount`,`goal_difficulty`,`goal_class`,`goal_points`,`goal_timedivisor`) VALUES (13,'Climb 3 stairs','floors',3,'easy','short','5',2);
INSERT INTO `goal` (`goal_id`,`goal_name`,`goal_activity`,`goal_amount`,`goal_difficulty`,`goal_class`,`goal_points`,`goal_timedivisor`) VALUES (14,'Climb 5 stairs','floors',5,'med','short','10',2);
INSERT INTO `goal` (`goal_id`,`goal_name`,`goal_activity`,`goal_amount`,`goal_difficulty`,`goal_class`,`goal_points`,`goal_timedivisor`) VALUES (15,'Climb 20 stairs','floors',20,'hard','short','20',2);
INSERT INTO `goal` (`goal_id`,`goal_name`,`goal_activity`,`goal_amount`,`goal_difficulty`,`goal_class`,`goal_points`,`goal_timedivisor`) VALUES (16,'Climb 40 stairs','floors',40,'easy','long','50',24);
INSERT INTO `goal` (`goal_id`,`goal_name`,`goal_activity`,`goal_amount`,`goal_difficulty`,`goal_class`,`goal_points`,`goal_timedivisor`) VALUES (17,'Climb 100 stairs','floors',100,'med','long','75',24);
INSERT INTO `goal` (`goal_id`,`goal_name`,`goal_activity`,`goal_amount`,`goal_difficulty`,`goal_class`,`goal_points`,`goal_timedivisor`) VALUES (18,'Climb 200 stairs','floors',200,'hard','long','100',24);

INSERT INTO `monster` (`monster_id`,`monster_name`,`monster_pic`,`monster_icon`,`monster_description`,`monster_sound`) VALUES (1,'Scuttlebutt','./assets/squaddies/scuttlebutt.png','./assets/squaddies/scuttlebutt-icon.png','This is a sample description of Scuttlebutt.',NULL);
INSERT INTO `monster` (`monster_id`,`monster_name`,`monster_pic`,`monster_icon`,`monster_description`,`monster_sound`) VALUES (2,'Pruny','./assets/squaddies/pruny.png','./assets/squaddies/pruny-icon.png','This is a sample description of Pruny.',NULL);
INSERT INTO `monster` (`monster_id`,`monster_name`,`monster_pic`,`monster_icon`,`monster_description`,`monster_sound`) VALUES (3,'Bard','./assets/squaddies/bard.png','./assets/squaddies/bard-icon.png','This is a sample description of Bard.',NULL);
INSERT INTO `monster` (`monster_id`,`monster_name`,`monster_pic`,`monster_icon`,`monster_description`,`monster_sound`) VALUES (4,'Squaggle','./assets/squaddies/squaggle.png','./assets/squaddies/squaggle-icon.png','This is a sample description of Squaggle.',NULL);
INSERT INTO `monster` (`monster_id`,`monster_name`,`monster_pic`,`monster_icon`,`monster_description`,`monster_sound`) VALUES (5,'Kow','./assets/squaddies/kow.png','./assets/squaddies/kow-icon.png','This is a sample description of Kow.',NULL);

INSERT INTO `user` (`user_id`,`fitbit_id`,`user_username`,`user_password`,`user_accesstoken`,`user_refreshtoken`,`user_level`,`user_current_xp`,`user_total_points`,`custom_goal_timer_1`,`custom_goal_timer_2`) VALUES (1,'3XP8GJ','mickey',NULL,NULL,NULL,1,0,0,NULL,NULL);

INSERT INTO `user_egg` (`user_egg_id`,`user_id`,`egg_id`,`egg_xp`,`egg_hatched`) VALUES (1,1,2,0,0);

INSERT INTO `user_goal` (`user_goal_id`,`user_id`,`goal_id`,`user_goal_start_value`,`user_goal_current`,`user_goal_target`,`user_goal_start_date`,`user_goal_end_date`,`user_goal_finalized`,`user_goal_success`,`user_goal_concluded`,`user_goal_points`) VALUES (1,1,2,NULL,NULL,20,'2018-03-26 10:27:26.000','2018-03-20 00:00:00.000',0,0,0,20);
INSERT INTO `user_goal` (`user_goal_id`,`user_id`,`goal_id`,`user_goal_start_value`,`user_goal_current`,`user_goal_target`,`user_goal_start_date`,`user_goal_end_date`,`user_goal_finalized`,`user_goal_success`,`user_goal_concluded`,`user_goal_points`) VALUES (2,1,14,NULL,NULL,6000,'2018-03-26 10:27:26.000','2018-03-21 00:00:00.000',0,0,0,25);
INSERT INTO `user_goal` (`user_goal_id`,`user_id`,`goal_id`,`user_goal_start_value`,`user_goal_current`,`user_goal_target`,`user_goal_start_date`,`user_goal_end_date`,`user_goal_finalized`,`user_goal_success`,`user_goal_concluded`,`user_goal_points`) VALUES (3,1,9,NULL,NULL,30000,'2018-03-26 10:27:26.000','2018-03-22 00:00:00.000',0,0,0,30);
INSERT INTO `user_goal` (`user_goal_id`,`user_id`,`goal_id`,`user_goal_start_value`,`user_goal_current`,`user_goal_target`,`user_goal_start_date`,`user_goal_end_date`,`user_goal_finalized`,`user_goal_success`,`user_goal_concluded`,`user_goal_points`) VALUES (4,1,3,NULL,NULL,2000,'2018-03-26 10:27:26.000','2018-03-23 00:00:00.000',0,0,0,5);
INSERT INTO `user_goal` (`user_goal_id`,`user_id`,`goal_id`,`user_goal_start_value`,`user_goal_current`,`user_goal_target`,`user_goal_start_date`,`user_goal_end_date`,`user_goal_finalized`,`user_goal_success`,`user_goal_concluded`,`user_goal_points`) VALUES (5,1,5,NULL,NULL,5000,'2018-03-26 10:27:26.000','2018-03-24 00:00:00.000',0,0,0,40);
INSERT INTO `user_goal` (`user_goal_id`,`user_id`,`goal_id`,`user_goal_start_value`,`user_goal_current`,`user_goal_target`,`user_goal_start_date`,`user_goal_end_date`,`user_goal_finalized`,`user_goal_success`,`user_goal_concluded`,`user_goal_points`) VALUES (6,1,12,NULL,NULL,376800,'2018-03-26 10:27:26.000','2018-03-25 00:00:00.000',0,0,0,60);

INSERT INTO `user_monster` (`user_monster_id`,`user_id`,`monster_id`,`user_monster_level`,`user_monster_new_name`,`user_monster_attack`,`user_monster_defense`,`user_monster_current_xp`) VALUES (1,1,2,1,NULL,NULL,NULL,NULL);