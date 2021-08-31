DROP DATABASE IF EXISTS quoteCollection;

CREATE DATABASE quoteCollection;

USE quoteCollection;

CREATE TABLE quotes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quote VARCHAR(300)
) ;

INSERT INTO quotes (quote) values ("If you're always trying to be normal you will never know how amazing you can be.");
INSERT INTO quotes (quote) values ("If you don't like something, change it. If you can't change it, change your attitude.");
INSERT INTO quotes (quote) values ("You may kill me with your hatefulness, but still, like air, I'll rise.");
INSERT INTO quotes (quote) values ("When someone shows you who they are, believe them the first time.");
INSERT INTO quotes (quote) values ("We delight in the beauty of the butterfly, but rarely admit the changes it has gone through to achieve that beauty.");
/*
Execute this file from the command line by typing
mysql -u root -p < server/db/schema.sql, but depends on where the file is, be in root directory, otherwise you have to figure out where you are in relation to the schema file
THEN sign into mysql in the terminal without destination
*/
