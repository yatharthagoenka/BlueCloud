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

# gem_size = 1024 * 1024
# num_gems = math.ceil(file_size / gem_size)

MAX = 1024*32						# 1	MB	-	max chapter size
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


# gems = []
# with open(file_path, "rb") as infile:
#         gem_count = 0
#         while True:
#             gem = infile.read(gem_size)
#             if not gem:
#                 break
#             gem_count += 1
#             output_file = os.path.join(output_dir, f"GEM{gem_count}")
#             with open(output_file, "wb") as outfile:
#                 outfile.write(gem)
#             gems.append(f"GEM_{gem_count}")

# gems_json = json.dumps(gems)


