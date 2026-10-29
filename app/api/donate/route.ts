import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/utils";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Card donations are not set up yet." },
      { status: 501 }
    );
  }

  let amount = 0;
  try {
    const body = await req.json();
    amount = Number(body.amount);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!Number.isInteger(amount) || amount < 1 || amount > 500) {
    return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
  }

  const params = new URLSearchParams({
    mode: "payment",
    success_url: `${SITE_URL}/?thanks=1`,
    cancel_url: SITE_URL,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": String(amount * 100),
    "line_items[0][price_data][product_data][name]": "Support Christian Names",
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const data = await res.json();
  if (!res.ok || !data.url) {
    return NextResponse.json(
      { error: "Could not start checkout." },
      { status: 502 }
    );
  }

  return NextResponse.json({ url: data.url });
}