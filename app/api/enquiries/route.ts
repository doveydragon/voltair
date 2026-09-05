import { appendFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { z } from "zod";
const enquirySchema = z.object({ name: z.string().trim().min(2).max(100), email: z.string().trim().email().max(200), phone: z.string().trim().min(7).max(40), service: z.enum(["Electrical", "Air conditioning", "Property maintenance", "Maintenance plan"]), suburb: z.string().trim().max(100).optional().default(""), message: z.string().trim().min(5).max(2000), consent: z.literal("yes") });

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const parsed = enquirySchema.safeParse(await request.json());
    if (!parsed.success) {
      return Response.json({ error: "Please check the details and try again." }, { status: 400 });
    }

    const { consent: _consent, ...data } = parsed.data;
    const id = crypto.randomUUID();
    const record = { id, ...data, createdAt: new Date().toISOString() };
    const dataFile = process.env.ENQUIRY_DATA_FILE ?? "/data/enquiries.ndjson";

    await mkdir(dirname(dataFile), { recursive: true });
    await appendFile(dataFile, `${JSON.stringify(record)}\n`, { encoding: "utf8", mode: 0o600 });

    return Response.json({ id }, { status: 201 });
  } catch {
    return Response.json({ error: "We could not save your enquiry. Please try again shortly." }, { status: 500 });
  }
}
