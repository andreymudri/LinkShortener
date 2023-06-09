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
        SELECT id, link as url, short_link as "shortUrl", views as "visitCount"
        FROM urls
        WHERE user_email = $1
      `,
      [userEmail]
    );
    let visitCount = shortenedUrls.rows.reduce(
      (sum, url) => sum + url.visitCount,
      0
    );
    console.log(visitCount);
      console.log(shortenedUrls.rows)
    visitCount = visitCount === null ? 0 : visitCount;

    res.status(200).send({
      id: user.rows[0].id,
      name: user.rows[0].name,
      email: user.rows[0].email,
      visitCount: visitCount,
      shortenedUrls: shortenedUrls.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
