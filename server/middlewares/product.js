import client from "../redis/client.js";

export const productMiddleware = (key) => async (req, res, next) => {
  let name = await client.get(key);
  if (name) {
    return res.json({
      name: JSON.parse(name),
    });
  }
  next();
};

export const rateLimiter =
  ({ limit, timer, key }) =>
  async (req, res, next) => {
    //Rate Limiting
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const fullKey = `${clientIp}:${key}`;
    const req_count = await client.incr(fullKey);
    if (req_count === limit) {
      await client.expire(fullKey, timer);
    }
    const timeRemaining = await client.ttl(fullKey);
    if (req_count > limit) {
      res
        .status(429)
        .send(`Too Many Request. Try again after ${timeRemaining} seconds.`);
      return;
    }
    next();
  };
