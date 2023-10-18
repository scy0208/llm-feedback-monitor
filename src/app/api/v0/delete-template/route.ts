import { createClient } from '@/utils/supabase';

type RequestData = {
    id: string,
}

export const runtime = 'edge';

async function deleteTemplate({ id }: RequestData) {

    const { data, error } = await createClient()
        .from('email_label_template')
        .delete()
        .eq('id', id)
        .select();

    if (error || !data || data.length === 0) {
        throw new Error(error?.message || "Data is null or empty");
    }

    return data[0].id;
}

export async function POST(request: Request) {
    try {
        const requestData = (await request.json()) as RequestData;
        const id = await deleteTemplate(requestData);
        return new Response(JSON.stringify({ id }), { status: 200 });
    } catch (error) {
        console.error("An error occurred:", error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
