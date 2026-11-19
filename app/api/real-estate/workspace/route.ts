import { NextResponse } from "next/server";
import { adminHeaders, hasServerConfig, restUrl } from "@/lib/real-estate-server";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    if (!hasServerConfig()) return NextResponse.json({ error: "Supabase is not configured yet." }, { status: 503 });
    const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (!token) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
    const url = process.env.SUPABASE_URL!.replace(/\/$/, "");
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const auth = await fetch(url + "/auth/v1/user", { headers: { apikey: anon, Authorization: "Bearer " + token }, cache: "no-store" });
    if (!auth.ok) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
    const user = await auth.json() as { id?: string };
    if (!user.id) return NextResponse.json({ error: "Unable to verify your account." }, { status: 401 });
    const membership = await fetch(restUrl("workspace_members?select=workspace_id&user_id=eq." + encodeURIComponent(user.id) + "&limit=1"), { headers: adminHeaders(), cache: "no-store" });
    if (!membership.ok) return NextResponse.json({ error: "Unable to check workspace." }, { status: 502 });
    const existing = await membership.json() as Array<{ workspace_id: string }>; 
    if (existing.length) return NextResponse.json({ ok: true, workspaceId: existing[0].workspace_id });
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
    if (name.length < 2) return NextResponse.json({ error: "Enter your agency or business name." }, { status: 400 });
    const slug = "re-" + crypto.randomUUID().replace(/-/g, "").slice(0, 18);
    const createWorkspace = await fetch(restUrl("workspaces"), { method: "POST", headers: { ...adminHeaders(), Prefer: "return=representation" }, body: JSON.stringify({ name, slug, country_code: "US", default_currency: "USD", timezone: "America/New_York" }), cache: "no-store" });
    if (!createWorkspace.ok) return NextResponse.json({ error: "Could not create your workspace. Check that the platform and real-estate SQL migrations have been applied." }, { status: 502 });
    const rows = await createWorkspace.json() as Array<{ id: string }>; const workspaceId = rows[0]?.id;
    if (!workspaceId) return NextResponse.json({ error: "Workspace creation did not return an ID." }, { status: 502 });
    const addMember = await fetch(restUrl("workspace_members"), { method: "POST", headers: { ...adminHeaders(), Prefer: "return=minimal" }, body: JSON.stringify({ workspace_id: workspaceId, user_id: user.id, role: "owner" }), cache: "no-store" });
    if (!addMember.ok) return NextResponse.json({ error: "Workspace created but owner membership could not be added. Contact support before retrying." }, { status: 502 });
    return NextResponse.json({ ok: true, workspaceId });
  } catch { return NextResponse.json({ error: "Unable to create your workspace right now." }, { status: 500 }); }
}