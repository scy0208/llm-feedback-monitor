import { createClient } from '@/utils/supabase'
import { nanoid } from 'nanoid'

type RequestData = {
    name: string
    user_id: string
}

export const runtime = 'edge';

async function insertProject(
    { name, user_id }: RequestData) {
    if (!name) {
        throw new Error("Name is required");
    }

    const id = 'proj_' + nanoid()

    const dataToInsert = {
        id,
        name,
        user_id
    };

    const { data, error } = await createClient()
        .from('project')
        .insert([dataToInsert])
        .select();

    if (error || !data || data.length === 0) {
        throw new Error(error?.message || "Data is null or empty");
    }

    return data[0].id;
}

export async function PUT(req: Request) {
    
    try {
        const requestData = (await req.json()) as RequestData;
        if (!requestData.name) {
            return new Response(JSON.stringify({ message: 'Name is required' }), { status: 400 });
        }
        if (!requestData.user_id) {
            return new Response(JSON.stringify({ message: 'User ID is required' }), { status: 400 });
        }
        const id = await insertProject(requestData);
        return new Response(JSON.stringify({ id }), { status: 200 });
    } catch (error) {
        console.error("An error occurred:", error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
