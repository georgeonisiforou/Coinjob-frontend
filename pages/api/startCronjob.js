import axios from "axios";

export default async function handler(req, res) {
  const results = await axios
    .put("http://localhost:3001/prices/crypto/cronJob/start")
    .then((res) => res.data);
  res.status(200).json(results);
  console.log("started");
}
