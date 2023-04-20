import sys
import os
import math
import json
import encrypter as enc
import decrypter as dec

def encrypt(uuid, file_path):
    os.makedirs(os.path.join('store/files', os.path.basename(uuid)), exist_ok=True)
    MAX = 1024*32						# 1	MB	-	max gem size
    BUF = 50*1024*1024*1024  			# 50GB	-	memory buffer size
    gems_total = 0
    uglybuf = ''
    with open(file_path, "rb") as src:
        while True:
            target_file = open(os.path.join('store/files', uuid, os.path.basename('GEM' + '%07d' % gems_total)), 'wb')
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
    os.remove(os.path.join('store/uploads', uuid))
    enc.encrypter(uuid)

def decrypt(uuid, pub_key):
    os.makedirs(os.path.join('store/files', uuid, 'dec'), exist_ok=True)
    dec.decrypter(uuid, pub_key)
    address = os.path.join('store/uploads', os.path.basename(uuid))
    gems = sorted(os.listdir(os.path.join('store/files', uuid, 'dec')))
    with open(address, 'w+b') as writer:
        for file in gems:
            with open(os.path.join('store/files', uuid, 'dec', file), 'rb') as reader:
                for line in reader:
                    writer.write(line)
                reader.close()
        writer.close()

if len(sys.argv) < 3:
    print('Usage: python <path_to_file> <function> <uuid> **<pub_key>')
    sys.exit(1)

exec_func = sys.argv[1]
uuid = sys.argv[2]
pub_key = ''
if len(sys.argv) > 3:
    pub_key = sys.argv[3]
file_path = os.path.join('store/uploads', uuid)

if exec_func == 'enc':
    encrypt(uuid, file_path)
elif exec_func == 'dec':
    decrypt(uuid, pub_key)
