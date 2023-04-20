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

gem_size = 1024 * 1024
num_gems = math.ceil(file_size / gem_size)
output_dir = os.path.join('store/files', os.path.basename(file_name))

os.makedirs(output_dir, exist_ok=True)

gems = []
with open(file_path, "rb") as infile:
        gem_count = 0
        while True:
            gem = infile.read(gem_size)
            if not gem:
                break
            gem_count += 1
            output_file = os.path.join(output_dir, f"GEM{gem_count}")
            with open(output_file, "wb") as outfile:
                outfile.write(gem)
            gems.append(f"GEM_{gem_count}")

gems_json = json.dumps(gems)
print("testing")
os.remove(os.path.join('store/uploads', file_name))
enc.encrypter(file_name)


