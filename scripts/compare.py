import json
import sys

new = sys.argv[1]
current = sys.argv[2]
output = {}

with open(new, "r") as f1:
    new_file = json.loads(f1.read())
with open(current, "r") as f2:
    current_file = json.loads(f2.read())

# for [new_item_key, new_item_version] in new_file.items():
#     visited = []
#     for [current_item_key, current_item_version] in current_file.items():
#         visited.append(current_item_key)
#         if new_item_key != current_item_key:
#             continue
#         else:
#             if new_item_version != current_item_version:
#                 print(
#                     f"{new_item_key} ({current_item_version}) -> ({new_item_version})"
#                 )
#                 output[new_item_key] = new_item_version
#             else:
#                 break

#     if new_item_key not in visited:
#         print(f"{new_item_key} (null) -> ({new_item_version})")
#         output[new_item_key] = new_item_version

updated = {
    k: {"new": new_file[k], "old": current_file[k]}
    for k in new_file.keys()
    if k in current_file and new_file[k] != current_file[k]
}
added = {
    k: {"new": new_file[k], "old": None}
    for k in new_file.keys()
    if k not in current_file.keys()
}
removed = {
    k: {"new": None, "old": current_file[k]}
    for k in current_file.keys()
    if k not in new_file.keys()
}

output = updated | added

all_changes = updated | added | removed
out_string = "\n".join(
    [f"{k} ({v['old']}) -> ({v['new']})" for k, v in all_changes.items()]
)
if len(all_changes.keys()) > 0:
    print(out_string)
    with open("output.txt", "w") as out_log:
        out_log.write(out_string)
    # New file
    with open("diff.json", "w") as output_file:
        json.dump(output, output_file)
else:
    print("No differences")
    with open("no_diff.txt", "w") as out_log:
        out_log.write("poop")
