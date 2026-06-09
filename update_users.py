import sqlite3

conn = sqlite3.connect('prisma/dev.db')
cur = conn.cursor()
cur.execute('DELETE FROM Usuario')
cur.execute("INSERT INTO Usuario (id, ra, perfil, nome, createdAt) VALUES (hex(randomblob(16)), ?, ?, ?, datetime('now'))", ('1234','COORDENADOR','Coordenador Teste'))
cur.execute("INSERT INTO Usuario (id, ra, perfil, nome, createdAt) VALUES (hex(randomblob(16)), ?, ?, ?, datetime('now'))", ('123456','PROFESSOR','Professor Teste'))
conn.commit()
cur.execute('SELECT ra, perfil FROM Usuario')
rows = cur.fetchall()
print('Updated records:')
for r in rows:
    print(f'  RA={r[0]}, Perfil={r[1]}')
conn.close()
