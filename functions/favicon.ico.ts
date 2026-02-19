interface Env {
    CLOUDNAV_KV: any;
}

const DEFAULT_FAVICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIsIGhlaWdodD0iNjQiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzYjgyZjYiIHJ4PSIxOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTIlIiBkeT0iLjMyZW0iIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIzMiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TjwvdGV4dD48L3N2Zz4=';

export const onRequestGet = async (context: { env: Env; request: Request }) => {
    const { env } = context;

    const serveDataUrl = (dataUrl: string) => {
        const parts = dataUrl.split(',');
        if (parts.length < 2) return null;
        const header = parts[0];
        const base64Data = parts[1];
        const mimeType = header.split(':')[1].split(';')[0];
        const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        return new Response(binaryData, {
            headers: {
                'Content-Type': mimeType,
                'Cache-Control': 'public, max-age=3600',
            },
        });
    };

    try {
        const websiteConfigStr = await env.CLOUDNAV_KV.get('website_config');
        if (websiteConfigStr) {
            const websiteConfig = JSON.parse(websiteConfigStr);
            const favicon = websiteConfig.favicon;

            if (favicon) {
                if (favicon.startsWith('data:')) {
                    const res = serveDataUrl(favicon);
                    if (res) return res;
                } else {
                    return Response.redirect(favicon, 302);
                }
            }
        }
    } catch (e) { }

    // 默认兜底图标
    return serveDataUrl(DEFAULT_FAVICON) || new Response(null, { status: 404 });
};
