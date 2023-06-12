import axios from "axios";

export default async function handler(req, res) {
  const results = await axios
    .get("http://localhost:3001/prices/crypto/prices")
    .then((res) => res.data);
  res.status(200).json(results);
}
