create database travelPlanner
use travelPlanner


CREATE TABLE users (
    userId INT PRIMARY KEY IDENTITY(1,1),
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    country VARCHAR(100),
    password VARCHAR(255) NOT NULL,
    member_since DATETIME DEFAULT GETDATE()
);
select * from users
delete from users

CREATE TABLE trip(
    tripId INT PRIMARY KEY IDENTITY(1,1),
    tripName VARCHAR(100)NOT NULL,
    destination VARCHAR(100) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    notes text,
    userId INT,
    FOREIGN KEY(userId)REFERENCES users(userId)

)
INSERT INTO trip (tripName, destination, startDate, endDate, notes, userId) 
                VALUES (':tripName',':destination', '12-09-2025', '12-10-2025', ':notes', 1)
select * from trip
delete from trip
DROP TABLE trip


CREATE TABLE wishlist (
    id INT  PRIMARY KEY IDENTITY(1,1),
    placeName VARCHAR(100) NOT NULL unique,
    userId INT,
    FOREIGN KEY(userId)REFERENCES users(userId)
);

select * from wishlist
drop table wishlist
delete from wishlist

SELECT COUNT(*) AS tripCount
FROM trip
WHERE userId = 1;
SELECT count(*) FROM wishlist WHERE userId =1 