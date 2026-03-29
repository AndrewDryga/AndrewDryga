const MIXPANEL_HOST = "https://api-js.mixpanel.com";

interface Env {
  ASSETS: { fetch: typeof fetch };
  POSTMARK_SERVER_API_TOKEN: string;
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

  const res = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": env.POSTMARK_SERVER_API_TOKEN,
    },
    body: JSON.stringify({
      From: "website@dryga.com",
      To: "andrew@dryga.com",
      ReplyTo: email,
      Subject: `Contact form: ${name}`,
      TextBody: `From: ${name} <${email}>\n\n${message}`,
      MessageStream: "outbound",
    }),
  });

  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to send message" }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
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
