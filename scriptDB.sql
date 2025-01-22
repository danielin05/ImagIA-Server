CREATE DATABASE ImageIAdb;

CREATE USER 'ImagIAuser'@'localhost' IDENTIFIED BY 'ImagIAp@ss123';

GRANT ALL PRIVILEGES on ImagIAdb.* TO 'ImagIAuser'@'localhost';

FLUSH PRIVILEGES;