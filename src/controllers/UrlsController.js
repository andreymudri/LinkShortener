import { nanoid } from "nanoid";
import db from "../config/db.js";

export async function postUrlShortener(req, res) {
  try {
    const userEmail = req.user.email;
    console.log(userEmail);
    const { url } = req.body;
    console.log(url);
    const shortUrl = nanoid(8);
    console.log(shortUrl);
    const result = await db.query(
      "INSERT INTO urls (user_email, link, short_link) VALUES ($1, $2, $3) RETURNING id",
      [userEmail, url, shortUrl]
    );
    const newUrl = {
      id: result.rows[0].id,
      url,
      shortUrl,
      userEmail,
    };

    res.status(201).json({ id: newUrl.id, shortUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

export async function getUrlbyID(req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await db.query("SELECT * FROM urls WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send({ error: "URL not found" });
    }
    const url = result.rows[0];
    res.status(200).send(url);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getShortUrl(req, res) {
  try {
    const { shortUrl } = req.params;

    const result = await db.query("SELECT * FROM urls WHERE short_link = $1", [
      shortUrl,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send({ error: "URL not found" });
    }
    const url = result.rows[0];
    await db.query("UPDATE urls SET views = views + 1 WHERE id = $1", [
      url.id,
    ]);
    res.redirect(url.link);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
