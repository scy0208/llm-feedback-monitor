create table
  public.content (
    id text not null,
    created_by text null,
    created_at timestamp with time zone null default now(),
    content text null,
    group_id text null,
    project_id text null,
    config_name text null,
    constraint content_duplicate_pkey primary key (id)
  ) tablespace pg_default;

create table
  public.model_config (
    name text not null,
    created_at timestamp with time zone not null default now(),
    project_id text not null,
    config json null,
    constraint model_config_pkey primary key (name, project_id),
    constraint constraint_name unique (name, project_id),
    constraint model_config_project_id_fkey foreign key (project_id) references project (id)
  ) tablespace pg_default;

create table
  public.project (
    id text not null,
    created_at timestamp with time zone null default now(),
    name text null,
    user_id text null,
    constraint Project_pkey primary key (id)
  ) tablespace pg_default;

create table
  public.user_feedback (
    id uuid not null default gen_random_uuid (),
    feedback_source text null,
    comment text null,
    content_id text null,
    key text null,
    score numeric null,
    "user" text null,
    created_at timestamp with time zone null default now(),
    constraint user_feedback_duplicate_pkey primary key (id),
    constraint user_feedback_duplicate_user_content_id_key unique ("user", content_id)
  ) tablespace pg_default;

create view
  public.model_config_summary_view as
select
  model_config.name,
  model_config.config::text as config,
  model_config.project_id,
  user_feedback.key,
  sum(user_feedback.score) as total_score
from
  user_feedback
  join content on user_feedback.content_id = content.id
  join model_config on content.config_name = model_config.name
  and content.project_id = model_config.project_id
  join project on model_config.project_id = project.id
group by
  model_config.name,
  (model_config.config::text),
  model_config.project_id,
  user_feedback.key;

create view
  public.user_feedback_by_project as
select
  user_feedback.id,
  user_feedback.feedback_source,
  user_feedback.comment,
  user_feedback.key,
  user_feedback.score,
  user_feedback."user",
  user_feedback.created_at,
  project.user_id,
  content.project_id,
  content.group_id,
  content.content,
  model_config.config
from
  user_feedback
  join content on user_feedback.content_id = content.id
  join project on content.project_id = project.id
  join model_config on content.config_name = model_config.name
  and content.project_id = model_config.project_id;

DROP FUNCTION IF EXISTS get_total_sessions;
CREATE OR REPLACE FUNCTION get_total_sessions(project text)
RETURNS bigint AS $$
DECLARE
    total_sessions_count bigint;
BEGIN
    SELECT COUNT(DISTINCT group_id) INTO total_sessions_count
    FROM public.content
    WHERE project_id = project;
    
    RETURN total_sessions_count;
END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS daily_active_sessions;
CREATE OR REPLACE FUNCTION daily_active_sessions(
    project text,
    start_date date DEFAULT NULL,
    end_date date DEFAULT NULL,
    config text DEFAULT NULL
)
RETURNS TABLE(day date, daily_active_sessions bigint) AS $$
BEGIN
    IF start_date IS NULL AND end_date IS NULL THEN
        RETURN QUERY
        SELECT created_at::date AS day, COUNT(DISTINCT group_id) AS daily_active_sessions
        FROM public.content
        WHERE project_id = project 
        AND (config IS NULL OR config_name = config) -- Here's the new condition
        GROUP BY created_at::date
        ORDER BY day;
    ELSE
        RETURN QUERY
        SELECT created_at::date AS day, COUNT(DISTINCT group_id) AS daily_active_sessions
        FROM public.content
        WHERE project_id = project 
        AND created_at::date BETWEEN COALESCE(start_date, created_at::date) AND COALESCE(end_date, created_at::date)
        AND (config IS NULL OR config_name = config) -- Here's the new condition
        GROUP BY created_at::date
        ORDER BY day;
    END IF;
END;
$$ LANGUAGE plpgsql;



DROP FUNCTION IF EXISTS get_total_users;
CREATE OR REPLACE FUNCTION get_total_users(project text)
RETURNS bigint AS $$
DECLARE
    total_creators_count bigint;
BEGIN
    SELECT COUNT(DISTINCT created_by) INTO total_creators_count
    FROM public.content
    WHERE project_id = project;
    
    RETURN total_creators_count;
END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS get_avg_words_per_group;
CREATE OR REPLACE FUNCTION get_avg_words_per_group(project text)
RETURNS numeric AS $$
DECLARE
    avg_word_count numeric;
BEGIN
    WITH WordCounts AS (
        SELECT
            group_id,
            SUM(LENGTH(content) - LENGTH(REPLACE(content, ' ', '')) + 1) AS total_words
        FROM
            public.content
        WHERE 
            project_id = project
        GROUP BY
            group_id
    )

    SELECT 
        AVG(total_words) INTO avg_word_count
    FROM 
        WordCounts;

    RETURN avg_word_count;
END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS get_daily_csat;
CREATE OR REPLACE FUNCTION get_daily_csat(project text, config text DEFAULT NULL)
RETURNS TABLE(day date, daily_CSAT_percentage numeric) AS $$
BEGIN
    RETURN QUERY
    WITH RelevantContent AS (
        SELECT id 
        FROM public.content
        WHERE 
            project_id = project AND
            (config_name = COALESCE(config, config_name) OR config IS NULL)
    )

    SELECT 
        created_at::date, 
        AVG(score) * 100
    FROM 
        public.user_feedback
    WHERE 
        content_id IN (SELECT id FROM RelevantContent)
    GROUP BY 
        created_at::date
    ORDER BY 
        created_at::date;
END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS get_daily_csat_with_content_timestamp;
CREATE OR REPLACE FUNCTION get_daily_csat_with_content_timestamp(project text, config text DEFAULT NULL)
RETURNS TABLE(day date, daily_CSAT_percentage numeric) AS $$
BEGIN
    RETURN QUERY
    WITH RelevantContent AS (
        SELECT c.id, c.created_at::date AS content_day
        FROM public.content c
        WHERE 
            c.project_id = project AND
            (c.config_name = COALESCE(config, c.config_name) OR config IS NULL)
    )

    SELECT 
        rc.content_day, 
        AVG(uf.score) * 100
    FROM 
        RelevantContent rc
    JOIN
        public.user_feedback uf ON rc.id = uf.content_id
    GROUP BY 
        rc.content_day
    ORDER BY 
        rc.content_day;
END;
$$ LANGUAGE plpgsql;
