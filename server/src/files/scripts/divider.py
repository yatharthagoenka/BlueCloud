import sys
import os
import math
import json

if len(sys.argv) < 3:
    print('Usage: python divider.py <fileName> <extension>')
    sys.exit(1)

file_name = sys.argv[1]
extension = sys.argv[2]
file_size = os.path.getsize(os.path.join('uploads', os.path.basename(file_name)))
file_path = os.path.join('uploads', file_name)

gem_size = 1024 * 1024
num_gems = math.ceil(file_size / gem_size)
output_dir = os.path.join('uploads', os.path.basename(file_name + extension))

os.makedirs(output_dir, exist_ok=True)

gems = []
with open(file_path, "rb") as infile:
        gem_count = 0
        while True:
            gem = infile.read(gem_size)
            if not gem:
                break
            gem_count += 1
            output_file = os.path.join(output_dir, f"{gem_count}-gem")
            with open(output_file, "wb") as outfile:
                outfile.write(gem)
            gems.append(f"{gem_count}-gem")

gems_json = json.dumps(gems)
print(gems_json)
