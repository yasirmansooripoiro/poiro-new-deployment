import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export const runtime = "nodejs";

const HUBSPOT_PORTAL_ID = "242333258";
const HUBSPOT_FORM_ID = "231a8adc-3fae-4544-8425-4591972488c3";
const HUBSPOT_REGION = "na2";

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

async function saveFiles(files: File[]) {
  if (!files.length) return [] as string[];

  const batchId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "briefs", batchId);
  await fs.mkdir(uploadDir, { recursive: true });

  const fileUrls: string[] = [];

  for (const file of files) {
    const safeName = sanitizeFileName(file.name || "upload.bin");
    const filePath = path.join(uploadDir, safeName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);
    fileUrls.push(`/uploads/briefs/${batchId}/${encodeURIComponent(safeName)}`);
  }

  return fileUrls;
}

async function submitToHubspot(payload: {
  name: string;
  email: string;
  company: string;
  brief: string;
  fileUrls: string[];
}) {
  const nameParts = payload.name.trim().split(/\s+/).filter(Boolean);
  const firstname = nameParts[0] ?? "";
  const lastname = nameParts.slice(1).join(" ");

  const body = {
    submittedAt: Date.now(),
    fields: [
      { name: "firstname", value: firstname },
      { name: "lastname", value: lastname },
      { name: "email", value: payload.email },
      { name: "company", value: payload.company },
      { name: "message", value: payload.brief },
      { name: "brief_text", value: payload.brief },
      { name: "file_count", value: String(payload.fileUrls.length) },
      { name: "file_links", value: payload.fileUrls.join("\n") },
    ],
    context: {
      pageUri: "https://poiroscope.com",
      pageName: "Poiro Upload Brief",
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: "I agree to allow Poiro to store and process my personal data.",
      },
    },
  };

  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HubSpot submit failed: ${response.status} ${text}`);
  }

  return {
    region: HUBSPOT_REGION,
    ok: true,
  };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const brief = String(formData.get("brief") ?? "").trim();

    const files = formData
      .getAll("files")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    if (!brief && files.length === 0) {
      return NextResponse.json(
        { success: false, error: "Please provide a brief or attach files." },
        { status: 400 }
      );
    }

    if (files.length > 12) {
      return NextResponse.json(
        { success: false, error: "Please upload up to 12 files per submission." },
        { status: 400 }
      );
    }

    const fileUrls = await saveFiles(files);

    await submitToHubspot({
      name,
      email,
      company,
      brief,
      fileUrls,
    });

    return NextResponse.json({ success: true, fileUrls }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
