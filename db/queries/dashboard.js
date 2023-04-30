const db = require("../connection");

const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1;', [id])
    .then(result => {
      if (result.rows.length === 0) {
        return null;
      } else {
        return result.rows[0];
      }
    });
};

const getUserPasswordsById = (id) => {
  return db
    .query(`
    SELECT user_passwords.username, user_passwords.password, websites.name AS website, categories.name AS category
    FROM user_passwords
    JOIN users ON users.id = user_passwords.user_id
    JOIN websites ON websites.id = user_passwords.website_id
    JOIN categories ON categories.id = websites.category_id
    WHERE users.id = $1
    `, [id])
    .then(result => result.rows);
  };

const getOrganizationPasswordsById = (id) => {
  return db
    .query(`
    SELECT org_passwords.username, org_passwords.password, websites.name AS website
    FROM org_passwords
    JOIN organizations ON organizations.id = org_passwords.organization_id
    JOIN users ON users.organization_id = organizations.id
    JOIN websites ON websites.id = org_passwords.website_id
    WHERE users.id = $1
    `, [id])
    .then(result => result.rows);
  };

const getOrganizationNameById = (id) => {
  return db
    .query(`
    SELECT name
    FROM organizations
    JOIN users ON organizations.id = organization_id
    WHERE users.id = $1
    `, [id])
    .then(result => result.rows[0]);
  };

module.exports = { getUserById, getUserPasswordsById, getOrganizationPasswordsById, getOrganizationNameById };
