import { Request, Response, NextFunction } from "express";

const windowMs = 60_000;
const maxRequests = 30;
const requests = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(req: Request, res: Response, next: NextFunction): void {
  const key = req.ip ?? "unknown";
  const now = Date.now();
  const entry = requests.get(key);

  if (!entry || entry.resetAt < now) {
    requests.set(key, { count: 1, resetAt: now + windowMs });
    next();
    return;
  }

  if (entry.count >= maxRequests) {
    res.status(429).json({ error: "Rate limit exceeded" });
    return;
  }

  entry.count += 1;
  requests.set(key, entry);
  next();
}
