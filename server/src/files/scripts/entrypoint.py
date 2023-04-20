import sys
import os
import math
import json
import encrypter as enc

if len(sys.argv) < 2:
    print('Usage: python divider.py <fileName>')
    sys.exit(1)

file_name = sys.argv[1]
file_size = os.path.getsize(os.path.join('store/uploads', os.path.basename(file_name)))
file_path = os.path.join('store/uploads', file_name)
os.makedirs(os.path.join('store/files', os.path.basename(file_name)), exist_ok=True)

MAX = 1024*32						# 1	MB	-	max gem size
BUF = 50*1024*1024*1024  			# 50GB	-	memory buffer size

gems_total = 0
uglybuf = ''
with open(file_path, "rb") as src:
    while True:
        target_file = open(os.path.join('store/files', file_name, os.path.basename('GEM' + '%07d' % gems_total)), 'wb')
        written = 0
        while written < MAX:
            if len(uglybuf) > 0:
                target_file.write(uglybuf)
            target_file.write(src.read(min(BUF, MAX - written)))
            written += min(BUF, MAX - written)
            uglybuf = src.read(1)
            if len(uglybuf) == 0:
                break
        target_file.close()
        if len(uglybuf) == 0:
            break
        gems_total += 1
os.remove(os.path.join('store/uploads', file_name))
enc.encrypter(file_name)
