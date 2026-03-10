const MIXPANEL_HOST = "https://api-js.mixpanel.com";

export const onRequest: PagesFunction = async ({ request, params }) => {
  const path = Array.isArray(params.path) ? params.path.join("/") : params.path;
  const url = new URL(request.url);
  const target = `${MIXPANEL_HOST}/${path}${url.search}`;

  const headers = new Headers(request.headers);
  headers.delete("cookie");
  headers.set("X-Forwarded-For", request.headers.get("cf-connecting-ip") ?? "");

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
};
