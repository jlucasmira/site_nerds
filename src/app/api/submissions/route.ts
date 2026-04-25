import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { repositorySubmissionSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfter ?? 60),
        },
      },
    );
  }

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
