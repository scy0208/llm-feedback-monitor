import { createClient } from '@/utils/supabase';

type RequestData = {
    config: string,
    project_id: string,
    id: string
}

export const runtime = 'edge';

export async function insertConfig(
    { config, project_id, id }: RequestData) {

    if (!id) {
        throw new Error("Id is required");
    }

    if (!config) {
        throw new Error("Content is required");
    }
    if (!project_id) {
        throw new Error("project_id is required");
    }

    const dataToInsert = {
        config,
        project_id,
        ...(id ? { id } : {}), // Include the ID if provided, otherwise leave it undefined so that the database auto-generates it
    };

    const { data, error } = await createClient()
        .from('LLMConfig')
        .upsert([dataToInsert])
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
        if (!requestData.id) {
            return new Response(JSON.stringify({ message: 'Id in uuid format is required ' }), { status: 400 });
        }
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
        if (!uuidRegex.test(requestData.id)) {
            return new Response(JSON.stringify({ message: 'Invalid UUID format in id' }), { status: 400 });
        }

        if (!requestData.config) {
            return new Response(JSON.stringify({ message: 'Config is required' }), { status: 400 });
        }

        try {
            JSON.parse(requestData.config);
        } catch (e) {
            return new Response(JSON.stringify({ message: 'Invalid JSON content in config' }), { status: 400 });
        }

        if (!requestData.project_id) {
            return new Response(JSON.stringify({ message: 'project_id is required' }), { status: 400 });
        }

        const id = await insertConfig(requestData);
        return new Response(JSON.stringify({ id }), { status: 200 });
    } catch (error) {
        console.error("An error occurred:", error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
