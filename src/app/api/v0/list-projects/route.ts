import { createClient } from '@/utils/supabase';

export const runtime = 'edge';

export async function GET(req: Request, res: Response) {
    if (req.method == 'OPTIONS') {
        return new Response(null, { status: 200 });
    }
    let queryBuilder = createClient()
        .from('project')
        .select(`*`)

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