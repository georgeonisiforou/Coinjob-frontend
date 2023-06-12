import axios from "axios";

export default async function handler(req, res) {
  const results = await axios
    .put("http://localhost:3001/prices/crypto/cronJob/forceRun")
    .then((res) => res.data);
  res.status(200).json(results);
  console.log("Force start");
}

// GET / GET / forceRun;
// GET / startCronJob;
// GET / stopCronJob;
// POST / changeCronJobSchedule;

// // --------------------

// GET / crypto / prices;

// GET / cronJob;
// PUT / cornJob / run;
// PUT / cronJob / start;
// PUT / cronJob / stop;
// POST / cronJob;
