import { createClient } from '@/utils/supabase';

export const runtime = 'edge';


export async function OPTIONS(req: Request) {
    return new Response(null, { status: 200 });
}

export async function GET(req: Request, res: Response) {

    // Retrieve the query parameters
    const url = new URL(req.url);
    const query = Object.fromEntries(url.searchParams);

    // Get the project_id from the URL path
    const pathSegments = url.pathname.split('/');
    const groupID = pathSegments[pathSegments.length - 1];

    let queryBuilder = createClient()
        .from('content')
        .select(`*`)
        .eq('group_id', groupID)
        .order('created_at', {
            ascending: true
        });

    try {
        const { data, error } = await queryBuilder;

        if (error) {
            throw error;
        }

        return new Response(JSON.stringify({ data }), { status: 200 });
    } catch (error) {
        console.error("An error occurred:", error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }

}