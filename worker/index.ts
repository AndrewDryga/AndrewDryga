const MIXPANEL_HOST = "https://api-js.mixpanel.com";

export default {
  async fetch(request: Request, env: Record<string, unknown>) {
    const url = new URL(request.url);

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
    return (env.ASSETS as { fetch: typeof fetch }).fetch(request);
  },
} satisfies ExportedHandler;
