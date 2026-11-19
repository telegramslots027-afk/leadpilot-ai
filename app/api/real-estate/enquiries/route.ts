import { NextResponse } from "next/server";
import { adminHeaders, hasServerConfig, restUrl } from "@/lib/real-estate-server";
export const runtime = "nodejs";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request: Request) {
  if (!hasServerConfig()) return NextResponse.json({ error: "Enquiry capture is not configured yet." }, { status: 503 });
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 12000) return NextResponse.json({ error: "Enquiry is too large." }, { status: 413 });
  try {
    const body = await request.json();
    if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true });
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const intent = typeof body.intent === "string" ? body.intent : "";
    const preferredArea = typeof body.preferred_area === "string" ? body.preferred_area.trim() : "";
    const budgetRange = typeof body.budget_range === "string" ? body.budget_range.trim() : "";
    const timeline = typeof body.timeline === "string" ? body.timeline.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const propertySlug = typeof body.property_slug === "string" ? body.property_slug.trim() : "";
    const publicKey = typeof body.public_key === "string" ? body.public_key.trim() : "";
    if (name.length < 2 || name.length > 100 || !emailPattern.test(email) || email.length > 254) return NextResponse.json({ error: "Enter a valid name and email address." }, { status: 400 });
    if (phone.length > 40 || preferredArea.length > 160 || budgetRange.length > 80 || timeline.length > 80 || message.length > 2000) return NextResponse.json({ error: "One of the enquiry fields is too long." }, { status: 400 });
    if (!["buyer","seller","renter","property_management"].includes(intent)) return NextResponse.json({ error: "Choose what kind of property help you need." }, { status: 400 });
    if (body.consent !== true) return NextResponse.json({ error: "Please agree to be contacted about this enquiry." }, { status: 400 });
    if (!propertySlug && !/^[0-9a-f-]{36}$/i.test(publicKey)) return NextResponse.json({ error: "This enquiry link is not configured correctly." }, { status: 400 });
    let workspaceId = ""; let propertyId: string | null = null;
    if (propertySlug) {
      const propertyResponse = await fetch(restUrl("real_estate_properties?select=id,workspace_id&public_slug=eq." + encodeURIComponent(propertySlug) + "&status=eq.published&limit=1"), { headers: adminHeaders(), cache: "no-store" });
      if (!propertyResponse.ok) return NextResponse.json({ error: "Unable to verify this property." }, { status: 502 });
      const properties = await propertyResponse.json() as Array<{ id: string; workspace_id: string }>;
      if (!properties.length) return NextResponse.json({ error: "This property is not currently accepting enquiries." }, { status: 404 });
      propertyId = properties[0].id; workspaceId = properties[0].workspace_id;
    }
    if (publicKey) {
      const workspaceResponse = await fetch(restUrl("workspaces?select=id&real_estate_public_key=eq." + encodeURIComponent(publicKey) + "&limit=1"), { headers: adminHeaders(), cache: "no-store" });
      if (!workspaceResponse.ok) return NextResponse.json({ error: "Unable to verify the agent enquiry link." }, { status: 502 });
      const workspaces = await workspaceResponse.json() as Array<{ id: string }>;
      if (!workspaces.length || (workspaceId && workspaceId !== workspaces[0].id)) return NextResponse.json({ error: "This enquiry link is invalid." }, { status: 404 });
      workspaceId = workspaces[0].id;
    }
    const consentText = "I agree that this real-estate business may contact me about the enquiry I submitted.";
    const response = await fetch(restUrl("real_estate_leads"), { method: "POST", headers: { ...adminHeaders(), Prefer: "return=minimal" }, body: JSON.stringify({ workspace_id: workspaceId, property_id: propertyId, name, email, phone: phone || null, intent, preferred_area: preferredArea || null, budget_range: budgetRange || null, timeline: timeline || null, message: message || null, consent_at: new Date().toISOString(), consent_text: consentText, source: "website" }), cache: "no-store" });
    if (!response.ok) return NextResponse.json({ error: "We could not save your enquiry. Please try again later." }, { status: 502 });
    return NextResponse.json({ ok: true, message: "Your enquiry has been sent to the agent." });
  } catch { return NextResponse.json({ error: "Unable to submit your enquiry right now." }, { status: 500 }); }
}