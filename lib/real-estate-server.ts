import { NextResponse } from "next/server";
const supabaseUrl = () => process.env.SUPABASE_URL?.replace(/\/$/, "");
const serviceKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export type RealEstateSession = { userId: string; workspaceId: string; role: string };
export async function requireRealEstateSession(request: Request): Promise<RealEstateSession | NextResponse> {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const url = supabaseUrl(); const service = serviceKey(); const anon = anonKey();
  if (!url || !service || !anon) return NextResponse.json({ error: "Supabase is not configured. Add the project URL, anon key and server-only service key." }, { status: 503 });
  if (!token || token.length > 5000) return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
  const authResponse = await fetch(url + "/auth/v1/user", { headers: { apikey: anon, Authorization: "Bearer " + token }, cache: "no-store" });
  if (!authResponse.ok) return NextResponse.json({ error: "Your session has expired. Please sign in again." }, { status: 401 });
  const user = await authResponse.json() as { id?: string };
  if (!user.id) return NextResponse.json({ error: "Unable to verify your account." }, { status: 401 });
  const memberUrl = url + "/rest/v1/workspace_members?select=workspace_id,role&user_id=eq." + encodeURIComponent(user.id) + "&order=created_at.asc&limit=1";
  const membershipResponse = await fetch(memberUrl, { headers: { apikey: service!, Authorization: "Bearer " + service! }, cache: "no-store" });
  if (!membershipResponse.ok) return NextResponse.json({ error: "Unable to load your workspace membership." }, { status: 502 });
  const memberships = await membershipResponse.json() as Array<{ workspace_id: string; role: string }>;
  if (!memberships.length) return NextResponse.json({ error: "Create your real-estate workspace to continue." }, { status: 409 });
  return { userId: user.id, workspaceId: memberships[0].workspace_id, role: memberships[0].role };
}
export function isSessionError(value: RealEstateSession | NextResponse): value is NextResponse { return value instanceof NextResponse; }
export function adminHeaders() { const key = serviceKey()!; return { apikey: key, Authorization: "Bearer " + key, "Content-Type": "application/json" }; }
export function restUrl(path: string) { return supabaseUrl() + "/rest/v1/" + path; }
export function hasServerConfig() { return Boolean(supabaseUrl() && serviceKey() && anonKey()); }