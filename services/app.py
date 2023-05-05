import os
from flask import Flask, request
import encrypter as enc
import decrypter as dec

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Flask service online'

@app.route('/encrypt', methods=['POST'])
def encrypt_file():
    uuid = request.json['uuid']
    store_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'store'))
    file_path = os.path.join(store_dir, 'uploads', uuid)
    os.makedirs(os.path.join(store_dir, 'files', os.path.basename(uuid)), exist_ok=True)        # output dir
    MAX = 1024*32						# 1	MB	-	max gem size
    BUF = 50*1024*1024*1024  			# 50GB	-	memory buffer size
    gems_total = 0
    uglybuf = ''
    with open(file_path, "rb") as src:
        while True:
            target_file = open(os.path.join(store_dir, 'files', uuid, os.path.basename('GEM' + '%07d' % gems_total)), 'wb')
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
    os.remove(os.path.join(store_dir, 'uploads', uuid))
    return enc.encrypter(uuid)

@app.route('/decrypt', methods=['POST'])
def decrypt_file():
    uuid = request.json['uuid']
    pub_key = request.json['pub_key']
    store_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'store'))
    os.makedirs(os.path.join(store_dir, 'files', uuid, 'dec'), exist_ok=True)
    dec.decrypter(uuid, pub_key)
    address = os.path.join(store_dir, 'uploads', os.path.basename(uuid))
    gems = sorted(os.listdir(os.path.join(store_dir, 'files', uuid, 'dec')))
    with open(address, 'w+b') as writer:
        for file in gems:
            with open(os.path.join(store_dir, 'files', uuid, 'dec', file), 'rb') as reader:
                for line in reader:
                    writer.write(line)
                reader.close()
        writer.close()
    return ''

if __name__ == '__main__':
    app.run(port=80, host='0.0.0.0')
