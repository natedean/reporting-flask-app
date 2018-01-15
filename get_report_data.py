import psycopg2
import psycopg2.extras
import decimal
import datetime
from time_util import human_delta

CONN_URL = """host=postgres.cvlhol1iwi8w.us-east-2.rds.amazonaws.com
                dbname=test user=nate password=asdfasdf"""

QUERIES = [
    ("gps_message_count", "SELECT count(*) FROM gps_messages;",),
    ("can_message_count", "SELECT count(*) FROM can_messages;"),
    ("can_message_unique_count", "SELECT count(DISTINCT message_id) from can_messages;"),
    (
    "avg_can_messages_per_sec", 
    """
    select avg(count) 
    from (select ts, count(*) from can_messages GROUP BY ts) as q;
    """
    ),
    ("avg_gps_messages_per_sec", 
    """
    select avg(count) 
    from (select ts, count(*) from gps_messages GROUP BY ts) as q;
    """
    ),
    (
    "first_can_ts_with_most_messages",
    """
    WITH ts_counts as (
    select ts, count(*) from can_messages GROUP BY ts
    )
    select ts, count from ts_counts 
    where count = (select max(count) from ts_counts) ORDER BY ts limit 1;
    """
    ),
    (
    "first_can_ts_with_least_messages",
    """
    WITH ts_counts as (
        select ts, count(*) from can_messages GROUP BY ts
    )
    select ts, count from ts_counts
    where count = (select min(count) from ts_counts) ORDER BY ts limit 1;
    """
    )
]

def get_total_run_time():
    timestamps = []
    with psycopg2.connect(CONN_URL) as conn:
        with conn.cursor() as cur:
            cur.execute('SELECT min(ts) from gps_messages')
            timestamps.append(cur.fetchone()[0])
            cur.execute('SELECT max(ts) from gps_messages')
            timestamps.append(cur.fetchone()[0])
            cur.execute('SELECT min(ts) from can_messages')
            timestamps.append(cur.fetchone()[0])
            cur.execute('SELECT max(ts) from can_messages')
            timestamps.append(cur.fetchone()[0])
    conn.close()
    min_ts = min(timestamps)
    max_ts = max(timestamps)
    return human_delta(max_ts - min_ts)

def get_report_data():
    data = {}
    with psycopg2.connect(CONN_URL) as conn:
        with conn.cursor() as cur:
            for query in QUERIES:
                datum_name = query[0]
                sql = query[1]
                cur.execute(sql)
                result = cur.fetchone()[0]
                if isinstance(result, decimal.Decimal):
                    result = float(result)
                if isinstance(result, datetime.datetime):
                    result = str(result)
                print(type(result), result)
                data[datum_name] = result
    conn.close()
    data["total_run_time"] = get_total_run_time()
    return data
