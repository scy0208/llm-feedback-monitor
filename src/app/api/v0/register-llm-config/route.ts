import { createClient } from '@/utils/supabase';

type RequestData = {
    config: string,
    project_id: string,
    name: string
}

export const runtime = 'edge';

async function insertConfig(
    { config, project_id, name }: RequestData) {

    if (!name) {
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
        ...(name ? { name } : {}), // Include the ID if provided, otherwise leave it undefined so that the database auto-generates it
    };

    const { data, error } = await createClient()
        .from('llm_Config')
        .upsert([dataToInsert])
        .select();

    if (error || !data || data.length === 0) {
        throw new Error(error?.message || "Data is null or empty");
    }

    return data[0].id;
}

export async function OPTIONS(req: Request) {
    return new Response(null, { status: 200 });
}

export async function PUT(req: Request) {
    
    try {
        const requestData = (await req.json()) as RequestData;
        if (!requestData.project_id) {
            return new Response(JSON.stringify({ message: 'project_id is required' }), { status: 400 });
        }

        if (!requestData.name) {
            return new Response(JSON.stringify({ message: 'Config Name is required ' }), { status: 400 });
        }

        if (!requestData.config) {
            return new Response(JSON.stringify({ message: 'Config is required' }), { status: 400 });
        }

        try {
            JSON.parse(requestData.config);
        } catch (e) {
            return new Response(JSON.stringify({ message: 'Invalid JSON content in config' }), { status: 400 });
        }

        const id = await insertConfig(requestData);
        return new Response(JSON.stringify({ id }), { status: 200 });
    } catch (error) {
        console.error("An error occurred:", error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
