import rateLimit from "express-rate-limit";

export const limiter = ({ waitingMinute, maxRequest }) => {
  const rateLimiter = rateLimit({
    windowMs: waitingMinute * 60 * 1000,
    max: maxRequest,
    handler: (req, res, next) => {
      const currentTime = Date.now();
      const resetTime = req.rateLimit.resetTime;
      const remainingTime = Math.ceil((resetTime - currentTime) / 1000);
      res.setHeader("Retry-After", remainingTime);
      res.status(429).json({
        message: `Too many requests from this IP. Please try again after ${remainingTime} seconds.`,
      });
    },
  });

  return (req, res, next) => {
    rateLimiter(req, res, next);
  };
};
