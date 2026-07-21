import sqlite3
import json

conn = sqlite3.connect('reviews.db')
cursor = conn.cursor()
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
res_all = {}
for table_name in tables:
    table = table_name[0]
    cursor.execute(f"SELECT * FROM {table}")
    rows = cursor.fetchall()
    columns = [description[0] for description in cursor.description]
    res_all[table] = [dict(zip(columns, row)) for row in rows]

print(json.dumps(res_all, indent=2))
