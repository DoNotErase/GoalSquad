USE goalsquad;

DROP TABLE IF EXISTS user_egg;
DROP TABLE IF EXISTS user_monster;
DROP TABLE IF EXISTS user_goal;
DROP TABLE IF EXISTS egg;
DROP TABLE IF EXISTS goal;
DROP TABLE IF EXISTS monster;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
  user_id int NOT NULL AUTO_INCREMENT,
  user_username varchar(255) NOT NULL,
  user_password varchar(255) NOT NULL,
  user_fitbit_id varchar(255),
  user_sessiontoken varchar(255),
  user_refreshtoken varchar(255),
  user_level int NOT NULL DEFAULT 1,
  user_current_xp int NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id)
);

CREATE TABLE goal (
  goal_id int NOT NULL AUTO_INCREMENT,
  goal_type varchar(255) NOT NULL,
  goal_target int,
  PRIMARY KEY (goal_id)
);

CREATE TABLE egg (
  egg_id int NOT NULL AUTO_INCREMENT,
  egg_name varchar(255) NOT NULL,
  PRIMARY KEY (egg_id)
);

CREATE TABLE monster (
  monster_id int NOT NULL AUTO_INCREMENT,
  monster_name varchar(255) NOT NULL,
  monster_pic varchar(255),
  monster_sound varchar(255),
  PRIMARY KEY (monster_id)
);

CREATE TABLE user_egg (
  user_egg_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  egg_id int NOT NULL,
  egg_xp int NOT NULL DEFAULT 0,

  PRIMARY KEY (user_egg_id),
  FOREIGN KEY (user_id) REFERENCES user (user_id),
  FOREIGN KEY (egg_id) REFERENCES egg (egg_id)
);


CREATE TABLE user_monster (
  user_monster_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  monster_id int NOT NULL,
  user_monster_level int NOT NULL DEFAULT 1,
  user_monster_new_name varchar(255),
  user_monster_attack int,
  user_monster_defense int,
  user_monster_current_xp int,

  PRIMARY KEY (user_monster_id),
  FOREIGN KEY (user_id) REFERENCES user (user_id),
  FOREIGN KEY (monster_id) REFERENCES monster (monster_id)
);

CREATE TABLE user_goal (
  user_goal_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  goal_id int NOT NULL,
  user_goal_start_value int,
  user_goal_current int,
  user_goal_target int,
  user_goal_start_date date,
  user_goal_end_date date,
  user_goal_achieved bool default 0,
  PRIMARY KEY (user_goal_id),
  FOREIGN KEY (user_id) REFERENCES user (user_id),
  FOREIGN KEY (goal_id) REFERENCES goal (goal_id)
);

insert into user
  (user_username, user_password, user_fitbit_id)
VALUES
  ('mickey', 'mickey', '3XP8GJ');

insert into monster
  (monster_name)
VALUES
  ('yaboi'),
  ('GBear'),
  ('KMoney'),
  ('Sean'),
  ('BeardGuy');

insert into egg
  (egg_name)
VALUES
  ('yaboi_egg'),
  ('GBear_egg'),
  ('KMoney_egg'),
  ('Sean_egg'),
  ('BeardGuy_egg');

insert into goal
  (goal_type, goal_target)
VALUES
  ('Steps', 100),
  ('Steps', 200),
  ('Steps', 300),
  ('Floor', 100),
  ('Floor', 200),
  ('Floor', 300);

insert into user_egg
  (user_id, egg_id)
VALUES
  (1, 5);

insert into user_monster
  (user_id, monster_id)
VALUES
  (1, 2);

--date = YYYY-MM-DD
insert into user_goal
  (user_id, goal_id, user_goal_start_value, user_goal_current, user_goal_start_date, user_goal_end_date)
VALUES
  (1, 1, 0, 2, 2018-03-15, 2018-03-20),
  (1, 2, 0, 2, 2018-03-15, 2018-03-20),
  (1, 3, 0, 2, 2018-03-15, 2018-03-20),
  (1, 4, 0, 2, 2018-03-15, 2018-03-20),
  (1, 5, 0, 2, 2018-03-15, 2018-03-20),
  (1, 6, 0, 2, 2018-03-15, 2018-03-20);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
