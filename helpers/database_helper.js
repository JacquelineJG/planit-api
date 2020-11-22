
//add user to database
const addUser = function(db, user) {
  const queryString = `
  INSERT INTO users (full_name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `
  return db.query(queryString, [user.full_name, user.email, user.password])
  .then(res => {
    if (res.rows.length){
      return res.rows[0];
    } else {
      return null;
    }
  });
}
exports.addUser = addUser;

//find a user by their email
const getUserWithEmail = function(email) {
  const queryString = `SELECT * FROM users
                        WHERE email = $1;
                      `;

  const queryParams = [email];

  return db.query(queryString, queryParams)
    .then(result => {
      if (result.rows === null) {
        return null;
      } else {
        return result.rows[0];
      }
    });
};
exports.getUserWithEmail = getUserWithEmail;
