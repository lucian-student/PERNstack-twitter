CREATE DATABASE twitter;

CREATE TABLE users (
    user_id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    online BOOLEAN NOT NULL
);
SELECT * FROM users;

SELECT * FROM users WHERE user_id=1;

DELETE FROM users WHERE user_id=2;

INSERT INTO users (name,email,password,online) 
VALUES ('fikus','fikus@gmail.com','hesloJeVeslo',true);

CREATE TABLE tweets (
    tweet_id serial PRIMARY KEY,
    user_id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    num_of_likes BIGINT NOT NULL,
    num_of_comments BIGINT NOT NULL,
    FOREIGN KEY (user_id)
      REFERENCES users (user_id)
        ON DELETE CASCADE
);

CREATE TABLE tweetlikes (
    like_id serial PRIMARY KEY,
    user_id INT NOT NULL,
    tweet_id INT NOT NULL,
    FOREIGN KEY (user_id)
      REFERENCES users (user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (tweet_id)
      REFERENCES tweets (tweet_id) 
        ON DELETE CASCADE
);

CREATE TABLE comments (
    comment_id serial PRIMARY KEY,
    user_id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    tweet_id INT NOT NULL,
    content VARCHAR(255) NOT NULL,
    num_of_likes BIGINT NOT NULL,
    FOREIGN KEY (user_id)
      REFERENCES users (user_id)  
        ON DELETE CASCADE,
    FOREIGN KEY (tweet_id)
      REFERENCES tweets (tweet_id)  
        ON DELETE CASCADE
);

CREATE TABLE commentlikes (
    like_id serial PRIMARY KEY,
    user_id INT NOT NULL,
    comment_id INT NOT NULL,
    FOREIGN KEY (user_id)
      REFERENCES users (user_id)  
        ON DELETE CASCADE,
    FOREIGN KEY (comment_id)
      REFERENCES comments (comment_id) 
        ON DELETE CASCADE
);

CREATE TABLE refreshtokens (
  token_id serial PRIMARY KEY,
  user_id INT NOT NULL,
  token TEXT NOT NULL,
  FOREIGN KEY (user_id)
      REFERENCES users (user_id) 
        ON DELETE CASCADE
);


