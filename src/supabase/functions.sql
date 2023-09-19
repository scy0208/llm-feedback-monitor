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
