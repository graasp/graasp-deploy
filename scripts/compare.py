import json
import sys
new = sys.argv[1]
current = sys.argv[2]
output = {"include": []}

with open(new, "r") as f1:
    new_file = json.loads(f1.read())
with open(current, "r") as f2:
    current_file = json.loads(f2.read())

for current_item in current_file['include']:
    for new_item in new_file['include']:
        if new_item['repository'] != current_item['repository']:
            continue
        else:
            if new_item['tag'] != current_item['tag']:
                print(f"Found difference: {new_item['repository']}")
                print('Old tag')
                print(current_item['tag'])
                print('New tag')
                print(new_item['tag'])
                output['include'].append(new_item)

# New file
output_file = open("diff.json", "w")
json.dump(output, output_file, indent=2)
