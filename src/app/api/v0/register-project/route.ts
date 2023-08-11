import { createClient } from '@/app/utils/supabase'
import { nanoid } from 'nanoid'

type RequestData = {
    name: string
}

export const runtime = 'edge';

export async function insertProject(
    { name }: RequestData) {
    if (!name) {
        throw new Error("Name is required");
    }

    const id = 'proj_' + nanoid()

    const dataToInsert = {
        id,
        name
    };

    const { data, error } = await createClient()
        .from('Project')
        .insert([dataToInsert])
        .select();

    if (error || !data || data.length === 0) {
        throw new Error(error?.message || "Data is null or empty");
    }

    return data[0].id;
}

export async function PUT(req: Request) {
    if(req.method == 'OPTIONS') {
        return new Response(null, { status: 200 });
    }
    
    try {
        const requestData = (await req.json()) as RequestData;
        if (!requestData.name) {
            return new Response(JSON.stringify({ message: 'Name is required' }), { status: 400 });
        }
        const id = await insertProject(requestData);
        return new Response(JSON.stringify({ id }), { status: 200 });
    } catch (error) {
        console.error("An error occurred:", error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
