import axios from "axios";

export default async function handler(req, res) {
  const results = await axios
    .post("http://localhost:3001/prices/crypto/cronJob/custom", req.body)
    .then((res) => res.data);
  res.status(200).json(results);
}
