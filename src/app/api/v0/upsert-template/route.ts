import { createClient } from '@/utils/supabase';

type RequestData = {
    id?: string,
    email: string,
    label_id: string,
    template: string
}

export const runtime = 'edge';

async function upsertTemplate(
    { id, template, email, label_id }: RequestData) {

    const dataToInsert = {
        email,
        template,
        label_id,
        ...(id ? { id } : {}), // Include the ID if provided, otherwise leave it undefined so that the database auto-generates it
    };

    const { data, error } = await createClient()
        .from('email_label_template')
        .upsert([dataToInsert], { onConflict: 'id' })
        .select();

    if (error || !data || data.length === 0) {
        throw new Error(error?.message || "Data is null or empty");
    }

    return data[0].id;
}


export async function POST(request: Request) {
    try {
        const requestData = (await request.json()) as RequestData
        const id = await upsertTemplate(requestData);
        return new Response(JSON.stringify({ id }), { status: 200 });
    } catch (error) {
        console.error("An error occurred:", error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
