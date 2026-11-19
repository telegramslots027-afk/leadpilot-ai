import { NextResponse } from "next/server";
import { adminHeaders, hasServerConfig, isSessionError, requireRealEstateSession, restUrl } from "@/lib/real-estate-server";
export const runtime = "nodejs";
const jsonHeaders = { ...adminHeaders(), "Content-Type": "application/json" };
export async function GET(request: Request) {
  if (!hasServerConfig()) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  const session = await requireRealEstateSession(request); if (isSessionError(session)) return session;
  try {
    const base = "workspace_id=eq." + encodeURIComponent(session.workspaceId);
    const [propertiesResponse, leadsResponse, workspaceResponse] = await Promise.all([
      fetch(restUrl("real_estate_properties?select=*&" + base + "&order=created_at.desc"), { headers: adminHeaders(), cache: "no-store" }),
      fetch(restUrl("real_estate_leads?select=*&" + base + "&order=created_at.desc&limit=200"), { headers: adminHeaders(), cache: "no-store" }),
      fetch(restUrl("workspaces?select=name,real_estate_public_key&id=eq." + encodeURIComponent(session.workspaceId) + "&limit=1"), { headers: adminHeaders(), cache: "no-store" })
    ]);
    if (!propertiesResponse.ok || !leadsResponse.ok || !workspaceResponse.ok) return NextResponse.json({ error: "Unable to load your workspace data. Confirm the real-estate SQL migration is installed." }, { status: 502 });
    const [properties, leads, workspaces] = await Promise.all([propertiesResponse.json(), leadsResponse.json(), workspaceResponse.json()]);
    return NextResponse.json({ properties, leads, workspace: workspaces[0] || null });
  } catch { return NextResponse.json({ error: "Unable to load workspace data." }, { status: 500 }); }
}
export async function POST(request: Request) {
  if (!hasServerConfig()) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  const session = await requireRealEstateSession(request); if (isSessionError(session)) return session;
  try {
    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const city = typeof body.city === "string" ? body.city.trim() : "";
    const state = typeof body.state_code === "string" ? body.state_code.trim().toUpperCase() : "";
    const price = Number(body.price); const bedrooms = Number(body.bedrooms ?? 0); const bathrooms = Number(body.bathrooms ?? 0);
    const squareFeet = body.square_feet === "" || body.square_feet == null ? null : Number(body.square_feet);
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const status = body.status === "published" ? "published" : "draft";
    if (title.length < 3 || title.length > 160 || city.length < 2 || city.length > 100 || !/^[A-Z]{2}$/.test(state)) return NextResponse.json({ error: "Enter a property title, city and valid two-letter US state code." }, { status: 400 });
    if (!Number.isFinite(price) || price < 0 || !Number.isFinite(bedrooms) || bedrooms < 0 || !Number.isFinite(bathrooms) || bathrooms < 0 || (squareFeet !== null && (!Number.isInteger(squareFeet) || squareFeet < 0)) || description.length > 4000) return NextResponse.json({ error: "Check the property price, beds, baths, square footage and description." }, { status: 400 });
    const publicSlug = "home-" + crypto.randomUUID().replace(/-/g, "").slice(0, 20);
    const response = await fetch(restUrl("real_estate_properties"), { method: "POST", headers: { ...jsonHeaders, Prefer: "return=representation" }, body: JSON.stringify({ workspace_id: session.workspaceId, public_slug: publicSlug, title, city, state_code: state, price, bedrooms, bathrooms, square_feet: squareFeet, description, status }), cache: "no-store" });
    if (!response.ok) return NextResponse.json({ error: "Could not save property. Confirm the real-estate SQL migration is installed." }, { status: 502 });
    const rows = await response.json(); return NextResponse.json({ property: rows[0] }, { status: 201 });
  } catch { return NextResponse.json({ error: "Unable to save this property." }, { status: 500 }); }
}
export async function PATCH(request: Request) {
  if (!hasServerConfig()) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  const session = await requireRealEstateSession(request); if (isSessionError(session)) return session;
  try {
    const body = await request.json(); const id = typeof body.id === "string" ? body.id : ""; const status = typeof body.status === "string" ? body.status : "";
    if (!/^[0-9a-f-]{36}$/i.test(id) || !["new","contacted","qualified","closed","archived"].includes(status)) return NextResponse.json({ error: "Invalid lead update." }, { status: 400 });
    const response = await fetch(restUrl("real_estate_leads?id=eq." + encodeURIComponent(id) + "&workspace_id=eq." + encodeURIComponent(session.workspaceId)), { method: "PATCH", headers: { ...jsonHeaders, Prefer: "return=representation" }, body: JSON.stringify({ status, updated_at: new Date().toISOString() }), cache: "no-store" });
    if (!response.ok) return NextResponse.json({ error: "Could not update this lead." }, { status: 502 });
    const rows = await response.json(); if (!rows.length) return NextResponse.json({ error: "Lead not found in your workspace." }, { status: 404 });
    return NextResponse.json({ lead: rows[0] });
  } catch { return NextResponse.json({ error: "Unable to update this lead." }, { status: 500 }); }
}