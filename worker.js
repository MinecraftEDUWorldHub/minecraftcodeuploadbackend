addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  if (request.method === 'POST' && url.pathname === '/upload') {
    const authHeader = request.headers.get('Authorization') || '';
    if (!authHeader.startsWith('Bearer ')) {
      return new Response('Unauthorized', { status: 401 });
    }
    const token = authHeader.slice(7);

    // Simple token validation (replace with real validation)
    if (!token || token.length < 10) {
      return new Response('Invalid token', { status: 403 });
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return new Response('Invalid JSON', { status: 400 });
    }

    const { name, code } = data;
    if (!name || !code) {
      return new Response('Missing fields', { status: 400 });
    }

    // Ignore role if sent
    // Here you would save to KV or database, e.g.:
    // await WORLDS.put(name, code);

    // Mock success response
    return new Response('Upload saved successfully', { status: 200 });
  }

  return new Response('Not Found', { status: 404 });
}
