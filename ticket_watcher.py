import sqlite3
import time
import sys
import os

def check_db():
    try:
        if not os.path.exists('last_id.txt'):
            with open('last_id.txt', 'w') as f:
                f.write('11')
        with open('last_id.txt', 'r') as f:
            last_id = int(f.read().strip())
    except:
        last_id = 11

    print(f"Watcher listening for tickets > {last_id}...", flush=True)

    while True:
        try:
            conn = sqlite3.connect('reviews.db')
            cursor = conn.cursor()
            cursor.execute('SELECT id, author, text FROM reviews WHERE id > ?', (last_id,))
            rows = cursor.fetchall()
            conn.close()
            
            if rows:
                new_max = last_id
                print("\n[TICKETS DETECTED]", flush=True)
                for r in rows:
                    print(f"ID: {r[0]} | Author: {r[1]} | Task: {r[2]}", flush=True)
                    new_max = max(new_max, r[0])
                
                with open('last_id.txt', 'w') as f:
                    f.write(str(new_max))
                    
                # EXITTING forces the IDE to wake up immediately!
                sys.exit(0)
                
        except Exception as e:
            pass
        
        time.sleep(1)

if __name__ == "__main__":
    check_db()
