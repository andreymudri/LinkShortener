import { nanoid } from "nanoid";

export async function postUrlShortener(req, res) {
  try {
    const userId = req.user.id;
    const { url } = req.body;
    console.log(url);
    const shortUrl = nanoid();
    const result = await pool.query(
      "INSERT INTO urls (userid, shorturl, url) VALUES ($1, $2, $3) RETURNING id",
      [userId, shortUrl, url]
    );
    const newUrl = {
      id: result.rows[0].id,
      shortUrl,
      url,
      userId,
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
    const result = await pool.query("SELECT * FROM urls WHERE id = $1", [id]);
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

    const result = await pool.query("SELECT * FROM urls WHERE short_url = $1", [
      shortUrl,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send({ error: "URL not found" });
    }
    await pool.query(
        'UPDATE urls SET visits = visits + 1 WHERE id = $1',
        [url.id]
    );
    res.redirect(url.original_url);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
