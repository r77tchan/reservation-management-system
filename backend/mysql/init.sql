-- データベース作成
CREATE DATABASE IF NOT EXISTS `reservation-management-system`;
-- データベース選択
USE `reservation-management-system`;
-- usersテーブル作成
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL
);
-- reservationsテーブル作成
CREATE TABLE IF NOT EXISTS reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status INT NOT NULL
);
-- 初期データ挿入 (usersテーブル)
INSERT INTO users (username, email, password)
VALUES ('JohnDoe', 'john.doe@example.com', 'password123'),
  (
    'JaneSmith',
    'jane.smith@example.com',
    'securepass456'
  ),
  (
    'AliceJohnson',
    'alice.johnson@example.com',
    'mypassword789'
  );
-- 初期データ挿入 (reservationsテーブル)
INSERT INTO reservations (user_id, date, time, status)
VALUES (1, '2024-12-20', '10:00:00', 1),
  (2, '2024-12-21', '14:30:00', 2),
  (3, '2024-12-22', '16:00:00', 0);