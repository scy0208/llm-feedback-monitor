import { createClient } from '@/utils/supabase';

type RequestData = {
    email: string,
    labels: string[]
}

export const runtime = 'edge';

async function get_templates(email: string, labelIds: string[]): Promise<any> {
    let queryBuilder = createClient()
        .from('email_label_template')
        .select('label_id, id, template')
        .eq('email', email)
        .in('label_id', labelIds);

    const { data, error } = await queryBuilder;
    
    if (!data) return {};

    // Aggregating results by 'label_id'
    let groupedTemplates: { [labelId: string]: { id: string, template: string | null }[] } = {};
    for (const entry of data) {
        if (entry.template !== null) { 
            if (!groupedTemplates[entry.label_id]) {
                groupedTemplates[entry.label_id] = [];
            }
            groupedTemplates[entry.label_id].push({ id: entry.id, template: entry.template });
        }
    }

    console.log(groupedTemplates);
    return groupedTemplates;
}

export async function POST(request: Request) {
    const { email, labels } = (await request.json()) as RequestData
    const templates = await get_templates(email, labels)
    if (!templates || Object.keys(templates).length === 0) {
        return new Response(JSON.stringify({}), { status: 200 })
    }
    return new Response(JSON.stringify(templates), { status: 200 })
}
