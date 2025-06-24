import express, { Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logger for /api routes
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: any;

  const originalResJson = res.json.bind(res);
  res.json = (body: any, ...args: any[]) => {
    capturedJsonResponse = body;
    return originalResJson(body, ...args);
  };

  res.on("finish", () => {
    if (!path.startsWith("/api")) return;
    const duration = Date.now() - start;

    let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
    if (capturedJsonResponse) {
      logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
    }
    if (logLine.length > 80) {
      logLine = logLine.slice(0, 79) + "…";
    }

    log(logLine);
  });

  next();
});

(async () => {
  try {
    // Register API or other routes
    const server = await registerRoutes(app);

    // Global error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
      log(`❌ Error ${status}: ${message}`);
    });

    // Vite dev server or serve static build
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Use PORT from env or fallback to 5000 (good for Vercel, Docker, Railway)
    const port = Number(process.env.PORT) || 5000;

    server.listen(
      {
        port,
        host: "0.0.0.0",
        reusePort: true,
      },
      () => {
        log(`✅ Server is running on http://localhost:${port}`);
      }
    );
  } catch (err) {
    console.error("Server startup failed:", err);
    process.exit(1); // fail gracefully
  }
})();
