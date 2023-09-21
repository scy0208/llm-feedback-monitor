import { createClient } from '@/utils/supabase'
import { v4 as uuidv4 } from 'uuid';
import * as Sentry from "@sentry/nextjs";

type RequestData = {
    instruction: string;
    response: string;
    project_id: string;
    id?: string; // Allow ID to be optionally provided
    group_id?: string;
    created_by?: string;
    config_name?: string
}

export const runtime = 'edge';

async function insertContent(
    { instruction, response, project_id, created_by, group_id, config_name, id=uuidv4() }: RequestData) {
    if (!instruction || !response) {
        throw new Error("instruction and response are required");
    }
    if (!project_id) {
        throw new Error("project_id is required");
    }

    const instructionToInsert = {
        content: instruction,
        project_id,
        id,
        group_id,
        created_by,
        config_name,
    };
    const responseToInsert = {
        content: response,
        project_id,
        id: id+"-response",
        group_id,
        created_by: "assistant",
        config_name,
    };

    const { data, error } = await createClient()
        .from('content')
        .insert([instructionToInsert, responseToInsert])
        .select();

    if (error || !data || data.length === 0) {
        throw new Error(error?.message || "Data is null or empty");
    }

    return id;
}

export async function OPTIONS(req: Request) {
    return new Response(null, { status: 200 });
}

export async function PUT(req: Request) {    
    try {
        const requestData = (await req.json()) as RequestData;
        if (!requestData.instruction || !requestData.response) {
            return new Response(JSON.stringify({ message: 'Instruction and Response are required' }), { status: 400 });
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
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 })
    }
}
