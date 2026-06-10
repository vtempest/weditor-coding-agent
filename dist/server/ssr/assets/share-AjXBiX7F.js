const MAX_SHARE_LENGTH = 32e3;
async function compressToBase64(data) {
  await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));
  const json = JSON.stringify(data);
  const bytes = new TextEncoder().encode(json);
  const cs = new CompressionStream("gzip");
  const writer = cs.writable.getWriter();
  writer.write(bytes);
  writer.close();
  const chunks = [];
  const reader = cs.readable.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const compressed = new Uint8Array(
    chunks.reduce((acc, c) => acc + c.length, 0)
  );
  let offset = 0;
  for (const chunk of chunks) {
    compressed.set(chunk, offset);
    offset += chunk.length;
  }
  let binary = "";
  for (let i = 0; i < compressed.length; i += 8192) {
    binary += String.fromCharCode(...compressed.subarray(i, i + 8192));
  }
  const b64 = btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return b64;
}
async function decompressFromBase64(b64) {
  const padded = b64.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  const ds = new DecompressionStream("gzip");
  const writer = ds.writable.getWriter();
  writer.write(bytes);
  writer.close();
  const chunks = [];
  const reader = ds.readable.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const decompressed = new Uint8Array(
    chunks.reduce((acc, c) => acc + c.length, 0)
  );
  let offset = 0;
  for (const chunk of chunks) {
    decompressed.set(chunk, offset);
    offset += chunk.length;
  }
  const json = new TextDecoder().decode(decompressed);
  return JSON.parse(json);
}
async function createShareUrl(name, templateId, snapshot) {
  const payload = {
    version: 1,
    name,
    templateId,
    snapshot
  };
  const encoded = await compressToBase64(payload);
  if (encoded.length > MAX_SHARE_LENGTH) {
    const sizeKB = Math.round(encoded.length / 1024);
    return {
      error: `Project is too large to share via URL (${sizeKB}KB compressed, max ${Math.round(MAX_SHARE_LENGTH / 1024)}KB). Try removing unnecessary files.`
    };
  }
  const base = window.location.origin + window.location.pathname;
  return { url: `${base}?share=${encoded}` };
}
async function parseShareParam() {
  const params = new URLSearchParams(window.location.search);
  const data = params.get("share");
  if (!data) return null;
  try {
    const payload = await decompressFromBase64(data);
    if (!payload || typeof payload !== "object" || payload.version !== 1 || typeof payload.name !== "string" || typeof payload.templateId !== "string" || !payload.snapshot) return null;
    return payload;
  } catch {
    return null;
  }
}
export {
  compressToBase64,
  createShareUrl,
  decompressFromBase64,
  parseShareParam
};
