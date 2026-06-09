import sqlite3
from pathlib import Path
path = Path(__file__).parent / 'prisma' / 'dev.db'
print('DB path:', path)
print('exists:', path.exists())
if not path.exists():
    raise SystemExit(1)
conn = sqlite3.connect(path)
cur = conn.cursor()
cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = cur.fetchall()
print('tables =', tables)
for t in tables:
    rows = cur.execute(f"SELECT * FROM {t[0]} LIMIT 10").fetchall()
    print('table', t[0], 'rows', rows)
conn.close()
