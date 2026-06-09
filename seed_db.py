import sqlite3
from pathlib import Path

path = Path('prisma') / 'dev.db'
print('DB path:', path)
conn = sqlite3.connect(path)
cur = conn.cursor()
cur.execute("INSERT OR IGNORE INTO Usuario (id, ra, perfil, nome, createdAt) VALUES (hex(randomblob(16)), ?, ?, ?, datetime('now'))", ('1234','COORDENADOR','Coordenador Teste'))
cur.execute("INSERT OR IGNORE INTO Usuario (id, ra, perfil, nome, createdAt) VALUES (hex(randomblob(16)), ?, ?, ?, datetime('now'))", ('123456','PROFESSOR','Professor Teste'))
conn.commit()
cur.execute('SELECT * FROM Usuario')
rows = cur.fetchall()
print('rows:', rows)
conn.close()
