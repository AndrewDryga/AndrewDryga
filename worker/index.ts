const MIXPANEL_HOST = "https://api-js.mixpanel.com";

interface Env {
  ASSETS: { fetch: typeof fetch };
  RESEND_API_KEY: string;
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, email, message } = body;
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: "name, email, and message are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return new Response(
      JSON.stringify({ error: "Email service is not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "website@dryga.com",
      to: "andrew@dryga.com",
      reply_to: email,
      subject: `Contact form: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Resend error:", res.status, errorBody);
    return new Response(JSON.stringify({ error: "Failed to send message" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      return handleContact(request, env);
    }

    if (url.pathname.startsWith("/mp/")) {
      const path = url.pathname.replace(/^\/mp\//, "");
      const target = `${MIXPANEL_HOST}/${path}${url.search}`;

      const headers = new Headers(request.headers);
      headers.delete("cookie");
      headers.set(
        "X-Forwarded-For",
        request.headers.get("cf-connecting-ip") ?? "",
      );

      const response = await fetch(target, {
        method: request.method,
        headers,
        body: request.method !== "GET" ? request.body : undefined,
      });

      const respHeaders = new Headers(response.headers);
      respHeaders.set("Access-Control-Allow-Origin", url.origin);

      return new Response(response.body, {
        status: response.status,
        headers: respHeaders,
      });
    }

    // All other requests are served by the static assets binding
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler;
