import express from "express";
import cors from "cors";
import helmet from "helmet";
import { portfolioRouter } from "./routes/portfolio.js";
import { rateLimit } from "./middleware/rateLimit.js";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(rateLimit);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/portfolio", portfolioRouter);

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
