import { labRequestSchema } from "../schemas/labRequestSchema.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REQUESTS_DIR = path.join(__dirname, "../../requests");

export default async function labRoutes(app, opts) {
  // ensure requests dir exists
  try {
    await fs.mkdir(REQUESTS_DIR, { recursive: true });
  } catch (err) {
    app.log.error("Failed to create requests dir", err);
  }

  app.post("/request", {
    schema: {
      body: labRequestSchema,
      response: {
        200: {
          type: "object",
          properties: {
            status: { type: "string" },
            id: { type: "string" }
          }
        }
      }
    }
  }, async (req, reply) => {
    const payload = req.body;
    const id = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    const filename = path.join(REQUESTS_DIR, `${id}.json`);
    try {
      await fs.writeFile(filename, JSON.stringify(payload, null, 2), "utf8");
      req.log.info({ id, file: filename }, "Lab request saved");
      return reply.send({ status: "ok", id });
    } catch (err) {
      req.log.error(err);
      reply.code(500).send({ status: "error", message: "Cannot save request" });
    }
  });

  // simple healthcheck
  app.get("/health", async (req, reply) => {
    return { status: "ok", uptime: process.uptime() };
  });
}
