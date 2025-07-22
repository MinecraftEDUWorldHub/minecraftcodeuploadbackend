addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === 'POST' && new URL(request.url).pathname === '/upload') {
    const authHeader = request.headers.get('Authorization') || '';
    if (!authHeader.startsWith('Bearer ')) {
      return new Response('Unauthorized', { status: 401 });
    }
    const token = authHeader.slice(7);

    // TODO: validate token here (mocked for example)
    if (!token || token.length < 10) {
      return new Response('Invalid token', { status: 403 });
    }

    // Parse JSON body
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

    // Ignore role if present
    // e.g., const role = data.role; // not used here

    // Save data to KV or do backend logic here
    // For example, just mock success:
    return new Response('Upload saved', { status: 200 });
  }

  return new Response('Not Found', { status: 404 });
}
