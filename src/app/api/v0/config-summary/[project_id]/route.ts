import { createClient } from '@/utils/supabase';

export const runtime = 'edge';

export async function GET(req: Request, res: Response) {
    if (req.method == 'OPTIONS') {
        return new Response(null, { status: 200 });
    }

    // Retrieve the query parameters
    const url = new URL(req.url);
    const query = Object.fromEntries(url.searchParams);

    // Get the project_id from the URL path
    const pathSegments = url.pathname.split('/');
    const projectId = pathSegments[pathSegments.length - 1];

    // Construct the query, adding filters for the project_id and all other query parameters
    let queryBuilder = createClient()
        .from('model_config_summary_view')
        .select('*')
        .eq('project_id', projectId);

    for (const [key, value] of Object.entries(query)) {
        queryBuilder = queryBuilder.eq(key, value);
    }

    try {
        const { data, error } = await queryBuilder;

        if (error) {
            return new Response(JSON.stringify({ error }), { status: 500 });
        }

        return new Response(JSON.stringify({ data }), { status: 200 });
    } catch (error) {
        console.error("An error occurred:", error);
        return new Response(JSON.stringify({ error }), { status: 500 });
    }
}