DROP DATABASE IF EXISTS goalsquad;

CREATE DATABASE goalsquad;

USE goalsquad;

DROP TABLE IF EXISTS user_egg;
DROP TABLE IF EXISTS user_monster;
DROP TABLE IF EXISTS user_goal;
DROP TABLE IF EXISTS egg;
DROP TABLE IF EXISTS goal;
DROP TABLE IF EXISTS monster;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
  user_id varchar(255) NOT NULL,
  user_username varchar(255) NOT NULL,
  user_accesstoken varchar(255),
  user_refreshtoken varchar(255),
  user_level int NOT NULL DEFAULT 1,
  user_current_xp int NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id)
);

CREATE TABLE goal (
  goal_id int NOT NULL AUTO_INCREMENT,
  goal_name varchar(255) NOT NULL,
  goal_activity varchar(50) NOT NULL,
  goal_amount int NOT NULL,
  goal_difficulty varchar(50) NOT NULL,
  goal_class varchar(50) NOT NULL,
  goal_points varchar(50) NOT NULL,
  goal_timedivisor int NOT NULL,
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
  user_id varchar(255) NOT NULL,
  egg_id int NOT NULL,
  egg_xp int NOT NULL DEFAULT 0,

  PRIMARY KEY (user_egg_id),
  FOREIGN KEY (user_id) REFERENCES user (user_id),
  FOREIGN KEY (egg_id) REFERENCES egg (egg_id)
);

CREATE TABLE user_monster (
  user_monster_id int NOT NULL AUTO_INCREMENT,
  user_id varchar(255) NOT NULL,
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
  user_id varchar(255) NOT NULL,
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
  (user_username, user_id)
VALUES
  ('mickey', '3XP8GJ');

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
  (goal_name, goal_activity, goal_amount, goal_difficulty, goal_class, goal_points, goal_timedivisor)
VALUES
  ('Run 1 mile', 'distance', 1, 'easy', 'short', 10, 2),
  ('Run 2 miles','distance', 2, 'med', 'short', 25, 2),
  ('Run 5 miles','distance', 5, 'hard', 'short', 100, 2),
  ('Run 10 miles','distance', 10, 'easy', 'long', 200, 24),
  ('Run 25 miles','distance', 25, 'med', 'long', 500, 24),
  ('Run 50 miles','distance', 50, 'hard', 'long', 1000, 24),
  ('Walk 2000 steps', 'steps', 2000, 'easy', 'short', 10, 2),
  ('Walk 4000 steps', 'steps', 4000, 'med', 'short', 25, 2),
  ('Walk 10000 steps', 'steps', 10000, 'hard', 'short', 100, 2),
  ('Walk 20000 steps', 'steps', 20000, 'easy', 'long', 200, 24),
  ('Walk 50000 steps', 'steps', 50000, 'med', 'long', 500, 24),
  ('Walk 100000 steps', 'steps', 100000, 'hard', 'long', 1000, 24),
  ('Climb 3 stairs', 'stairs', 3, 'easy', 'short', 10, 2),
  ('Climb 5 stairs', 'stairs', 5, 'med', 'short', 25, 2),
  ('Climb 20 stairs', 'stairs', 20, 'hard', 'short', 100, 2),
  ('Climb 40 stairs', 'stairs', 40, 'easy', 'long', 200, 24),
  ('Climb 100 stairs', 'stairs', 100, 'med', 'long', 500, 24),
  ('Climb 200 stairs', 'stairs', 200, 'hard', 'long', 1000, 24);

insert into user_egg
  (user_id, egg_id)
VALUES
  ('3XP8GJ', 5);

insert into user_monster
  (user_id, monster_id)
VALUES
  ('3XP8GJ', 2);

insert into user_goal
  (user_id, goal_id, user_goal_start_value, user_goal_current, user_goal_start_date, user_goal_end_date)
VALUES
  ('3XP8GJ', 1, 0, 2, 2018-03-15, 2018-03-20),
  ('3XP8GJ', 2, 0, 2, 2018-03-15, 2018-03-20),
  ('3XP8GJ', 3, 0, 2, 2018-03-15, 2018-03-20),
  ('3XP8GJ', 4, 0, 2, 2018-03-15, 2018-03-20),
  ('3XP8GJ', 5, 0, 2, 2018-03-15, 2018-03-20),
  ('3XP8GJ', 6, 0, 2, 2018-03-15, 2018-03-20);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
