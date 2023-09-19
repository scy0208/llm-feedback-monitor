// src/app/api/v0/get-daily-session/[project_id]/route.ts 
import { createClient } from '@/utils/supabase';

export const runtime = 'edge';

async function getDailyCSAT(projectId: string, config_name?: string) {
    const client = createClient()

    let params: { project: string; config?: string } = { project: projectId };
    if (config_name) {
        params.config = config_name;
    }

    console.log(`params: ${JSON.stringify(params)}`);

    let response = await client.rpc("get_daily_csat_with_content_timestamp", params);

    console.log(`response: ${JSON.stringify(response)}`);
    return response.data;
}

export async function GET(req: Request, res: Response) {
    try {
        // Extract project ID from the request URL parameters.

        const url = new URL(req.url);
        const query = Object.fromEntries(url.searchParams);

        const pathSegments = url.pathname.split('/');
        const projectId = pathSegments[pathSegments.length - 1];

        // Extract optional config_name from the request query parameters.

        console.log(`projectId: ${projectId}`);

        const data = query.config_name ? await getDailyCSAT(projectId, query.config_name) : await getDailyCSAT(projectId);

        if (data) {
            return new Response(JSON.stringify(data), { status: 200 });
        } else {
            return new Response(JSON.stringify(data), { status: 200 });
        }
    } catch (error) {
        console.error("Server error:", error);
        return new Response(JSON.stringify({ error }), { status: 500 });
    }
}