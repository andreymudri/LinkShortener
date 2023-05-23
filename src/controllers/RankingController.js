import db from "../config/db.js";

export async function GetRanking(req, res) {
  try {
    const results = await db.query(`
          SELECT users.id, users.name, COUNT(urls.id) AS linksCount, COALESCE(SUM(urls.views), 0) AS "visitCount"
          FROM users
          LEFT JOIN urls ON users.email = urls.user_email
          GROUP BY users.id
          ORDER BY "visitCount" DESC
          LIMIT 10;
        `);
    res.status(200).json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}
