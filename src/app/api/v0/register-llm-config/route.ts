import { createClient } from '@/utils/supabase';

type JSONType = { [key: string]: any };

type RequestData = {
    config: JSONType,
    project_id: string,
    name: string,
}

export const runtime = 'edge';

async function insertConfig(
    { config, project_id, name }: RequestData) {

    if (!name) {
        throw new Error("Config name is required");
    }

    if (!config) {
        throw new Error("Config content is required");
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
        .from('model_config')
        .upsert([dataToInsert])
        .select();

    if (error || !data || data.length === 0) {
        throw new Error(error?.message || "Data is null or empty");
    }

    return data[0].name;
}

export async function OPTIONS(req: Request) {
    return new Response(null, { status: 200 });
}

export async function PUT(req: Request) {
    
    try {
        let requestData: RequestData;

        try {
            requestData = await req.json();
        } catch (parseError) {
            return new Response(JSON.stringify({ message: 'Invalid JSON payload' }), { status: 400 });
        }

        if (!requestData.project_id) {
            return new Response(JSON.stringify({ message: 'project_id is required' }), { status: 400 });
        }

        if (!requestData.name) {
            return new Response(JSON.stringify({ message: 'Config Name is required ' }), { status: 400 });
        }

        if (!requestData.config) {
            return new Response(JSON.stringify({ message: 'Config is required' }), { status: 400 });
        }

        if (typeof requestData.config !== "object" ) {
            return new Response(JSON.stringify({ message: 'Config must be a valid JSON object' }), { status: 400 });
        }

        const name = await insertConfig(requestData);
        return new Response(JSON.stringify({ name }), { status: 200 });
    } catch (error) {
        console.error("An error occurred:", error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
