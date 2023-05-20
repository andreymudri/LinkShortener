import db from "../config/db.js";

export async function GetUserME(req, res) {
  try {
      const userEmail = req.user.email;
      const user = await db.query(
        `
          SELECT id, name, email, "createdAt", last_login
          FROM users
          WHERE email = $1
        `,
        [userEmail]
      );
    const shortenedUrls = await db.query(
      `
        SELECT id, link, short_link, views
        FROM urls
        WHERE user_email = $1
      `,
      [userEmail]
    );
    const visitCount = shortenedUrls.rows.reduce(
      (sum, url) => sum + url.views,
      0
    );

    res.status(200).send({
      id: user.rows[0].id,
      name: user.rows[0].name,
      email: user.rows[0].email,
      lastLogin: user.rows[0]._login,
      visitCount,
      shortenedUrls: shortenedUrls.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
