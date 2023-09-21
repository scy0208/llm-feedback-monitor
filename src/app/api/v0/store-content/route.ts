import { createClient } from '@/utils/supabase';
import { sendEtagResponse } from 'next/dist/server/send-payload';
import * as Sentry from "@sentry/nextjs";
import { v4 as uuidv4 } from 'uuid';

type RequestData = {
    content: string;
    project_id: string;
    group_id?: string;
    created_by?: string;
    id?: string; // Allow ID to be optionally provided
    config_name?: string
}

export const runtime = 'edge';

async function insertContent(
    { content, project_id, created_by, group_id, config_name, id }: RequestData) {
    if (!content) {
        throw new Error("Content is required");
    }
    if (!project_id) {
        throw new Error("project_id is required");
    }

    const dataToInsert = {
        content,
        project_id,
        group_id,
        created_by,
        config_name,
        ...(id ? { id } : {}), // Include the ID if provided, otherwise leave it undefined so that the database auto-generates it
    };

    const { data, error } = await createClient()
        .from('content')
        .insert([dataToInsert])
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
        if (!requestData.content) {
            return new Response(JSON.stringify({ message: 'Content is required' }), { status: 400 });
        }

        if (!requestData.project_id) {
            return new Response(JSON.stringify({ message: 'project_id is required' }), { status: 400 });
        }

        if (!requestData.id) {
            requestData.id = uuidv4();
        }

        insertContent(requestData);
        return new Response(JSON.stringify({ id: requestData.id }), { status: 200 });
    } catch (error) {
        console.error("An error occurred:", error);
        Sentry.captureException(error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
