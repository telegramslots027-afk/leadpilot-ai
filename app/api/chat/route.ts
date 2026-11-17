import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatMessage = { role: "assistant" | "user"; content: string };

const systemPrompt = `You are ChatBoost AI's friendly product demonstration assistant.
Explain that ChatBoost AI helps businesses answer common website questions, capture leads,
and route interested visitors toward a human follow-up. Do not claim features are already
available if they are not. The current MVP is an early-access demo. Do not invent prices,
integrations, customer counts, guarantees, or launch dates. If asked about pricing, say
plans are being finalized and invite the visitor to request early access. Keep replies
helpful, concise, and honest.`;

function demoReply(message: string) {
  const text = message.toLowerCase();
  if (text.includes("price") || text.includes("cost") || text.includes("plan")) {
    return "We're preparing simple subscription plans for businesses of different sizes. Pricing is still being finalized. Use the early-access form and tell us about your business so we can keep you informed.";
  }
  if (text.includes("business") || text.includes("help") || text.includes("benefit")) {
    return "ChatBoost AI is designed to help your business respond to common website questions, collect interested visitors' contact details, and give your team a clearer path to follow up. You can request early access below.";
  }
  if (text.includes("what") || text.includes("chatboost") || text.includes("do")) {
    return "ChatBoost AI is an early-stage customer conversation assistant. The goal is to help businesses answer FAQs and capture leads from their websites. This demo currently uses a starter knowledge base; custom business training and account features are still being developed.";
  }
  if (text.includes("human") || text.includes("person") || text.includes("support")) {
    return "The goal is to make it easy for visitors to reach your team when a question needs a human. You can leave your details in the early-access form and our team can follow up.";
  }
  return "Thanks for your question. I'm the ChatBoost AI demo assistant, so my knowledge is limited to the product overview. Leave your business details in the early-access form and our team can follow up with you.";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const history = Array.isArray(body.history) ? (body.history as ChatMessage[]) : [];

    if (!message || message.length > 1500) {
      return NextResponse.json({ error: "Enter a message under 1,500 characters." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: demoReply(message), mode: "demo" });
    }

    const safeHistory = history
      .filter((item) =>
        item &&
        (item.role === "assistant" || item.role === "user") &&
        typeof item.content === "string"
      )
      .slice(-8)
      .map((item) => ({ role: item.role, content: item.content.slice(0, 1500) }));

    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...safeHistory,
          { role: "user", content: message }
        ],
        temperature: 0.4,
        max_tokens: 350
      }),
      signal: AbortSignal.timeout(20000)
    });

    if (!upstream.ok) {
      return NextResponse.json({ reply: demoReply(message), mode: "fallback" });
    }

    const data = await upstream.json();
    const reply = data.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      return NextResponse.json({ reply: demoReply(message), mode: "fallback" });
    }
    return NextResponse.json({ reply: reply.trim(), mode: "ai" });
  } catch {
    return NextResponse.json({ error: "Unable to process that message right now." }, { status: 500 });
  }
}
