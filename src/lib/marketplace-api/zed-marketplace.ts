export interface ZedMarketplaceExtension {
  id: string;
  name: string;
  description?: string;
  version?: string;
  category?: string;
  downloadUrl?: string;
}

export async function fetchZedMarketplaceExtensions(): Promise<ZedMarketplaceExtension[]> { return []; }
export function searchExtensions(exts: ZedMarketplaceExtension[], query: string): ZedMarketplaceExtension[] { return exts; }
export function filterExtensionsByCategory(exts: ZedMarketplaceExtension[], category: string): ZedMarketplaceExtension[] { return exts; }
export async function getExtensionDetails(id: string): Promise<ZedMarketplaceExtension | null> { return null; }
export function isExtensionCompatible(ext: ZedMarketplaceExtension): boolean { return true; }
export async function resolveExtensionManifest(ext: ZedMarketplaceExtension): Promise<unknown> { return null; }
export function getExtensionDownloadUrl(ext: ZedMarketplaceExtension): string { return ext.downloadUrl ?? ""; }
