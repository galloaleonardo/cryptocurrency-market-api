DROP TABLE IF EXISTS wallets;
DROP TABLE IF EXISTS refresh_tokens;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_wallet_cryptocoins;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL
);

INSERT INTO users (username, password) VALUES ('test', '$2b$10$7n8FaXhY2boQCePhoGbbEe4Nv2IEqw6tchnJWhu/EbmPzgRI19WMC');

CREATE TABLE wallets (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  wallet VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

INSERT INTO wallets (user_id, wallet) VALUES (1, 'c3585816b0c56498d834b67264d85d2ebe627b8c2021951ce13597d8a3415ea3');

CREATE TABLE refresh_tokens (
  user_id INT NOT NULL,
  refresh_token VARCHAR NOT NULL
);

CREATE TABLE user_wallet_cryptocoins (
  id SERIAL PRIMARY KEY,
  wallet_id INT NOT NULL,
  initials VARCHAR NOT NULL,
  quantity NUMERIC(13,8) NOT NULL,
  UNIQUE (wallet_id, initials)
);

INSERT INTO user_wallet_cryptocoins (wallet_id, initials, quantity) VALUES (1, 'ETH', 23.5586);