import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MAX_BIO = 500;
const MAX_LINK = 500;
const MAX_EMAIL = 255;

function isValidUrl(v: string): boolean {
  if (!v) return true;
  try {
    const u = new URL(v);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

function isValidEmail(v: string): boolean {
  if (!v) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function sanitize(v: string): string {
  return v.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const token = authHeader.replace("Bearer ", "");
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
  if (claimsError || !claimsData?.claims) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const userId = claimsData.claims.sub;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { linkedin_bio, outreach_email, deck_link, profile_link, blog_link } = body as Record<string, string>;
  const errors: Record<string, string> = {};

  // Validate bio
  if (linkedin_bio != null) {
    if (typeof linkedin_bio !== "string") errors.linkedin_bio = "Must be a string";
    else if (linkedin_bio.length > MAX_BIO) errors.linkedin_bio = `Max ${MAX_BIO} characters`;
  }

  // Validate email
  if (outreach_email != null) {
    if (typeof outreach_email !== "string") errors.outreach_email = "Must be a string";
    else if (outreach_email.length > MAX_EMAIL) errors.outreach_email = `Max ${MAX_EMAIL} characters`;
    else if (!isValidEmail(outreach_email)) errors.outreach_email = "Invalid email format";
  }

  // Validate URLs
  for (const [key, max] of [["deck_link", MAX_LINK], ["profile_link", MAX_LINK], ["blog_link", MAX_LINK]] as const) {
    const val = body[key];
    if (val != null) {
      if (typeof val !== "string") errors[key] = "Must be a string";
      else if ((val as string).length > (max as number)) errors[key] = `Max ${max} characters`;
      else if (!isValidUrl(val as string)) errors[key] = "Must be a valid http(s) URL";
    }
  }

  if (Object.keys(errors).length > 0) {
    return new Response(JSON.stringify({ error: "Validation failed", details: errors }), {
      status: 422,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Sanitize and update
  const updates: Record<string, string> = {};
  if (linkedin_bio != null) updates.linkedin_bio = sanitize((linkedin_bio as string).trim());
  if (outreach_email != null) updates.outreach_email = (outreach_email as string).trim();
  if (deck_link != null) updates.deck_link = (deck_link as string).trim();
  if (profile_link != null) updates.profile_link = (profile_link as string).trim();
  if (blog_link != null) updates.blog_link = (blog_link as string).trim();

  const { error: updateError } = await supabase
    .from("user_profiles")
    .update(updates)
    .eq("user_id", userId);

  if (updateError) {
    return new Response(JSON.stringify({ error: updateError.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
