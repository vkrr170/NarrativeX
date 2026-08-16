import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import * as dotenv from "dotenv";
dotenv.config();

async function test() {
  try {
    const result = await generateObject({
      model: google("gemini-3.7-flash"),
      schema: z.object({ msg: z.string() }),
      prompt: "say hello",
    });
    console.log("SUCCESS:", result.object);
  } catch (err: any) {
    console.error("FAILED:", err.message);
  }
}
test();
