CREATE TABLE remembers (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    day VARCHAR(100) NOT NULL,
    month VARCHAR(100) NOT NULL,
    year VARCHAR(100) NOT NULL,
    remember TEXT NOT NULL
)