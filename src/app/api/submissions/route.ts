import { NextResponse } from "next/server";
import { repositorySubmissionSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = repositorySubmissionSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.issues.map((issue) => issue.message) },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true, data: parsed.data }, { status: 201 });
}
