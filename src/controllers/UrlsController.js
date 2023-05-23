import { nanoid } from "nanoid";
import db from "../config/db.js";

export async function postUrlShortener(req, res) {
  try {
    const userEmail = req.user.email;
    const { url } = req.body;

    const shortUrl = nanoid(8);
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
    const result = await db.query(`SELECT id, link as url, short_link as "shortUrl", views FROM urls WHERE id = $1`, [id]);

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


export async function deleteUrl(req, res) {
  const urlId = req.params.id; // Obtém o ID da URL a ser excluída

  try {
    const result = await client.query(`SELECT user_email FROM urls WHERE id = $1`, [urlId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'URL não encontrada.' });
    }
    const user_email = result.rows[0].user_email;
    if (user_email !== req.user.email) {
      return res.status(401).json({ error: 'Acesso não autorizado.' });
    }
    await client.query(`DELETE FROM urls WHERE id = $1`, [urlId]);

    return res.status(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};