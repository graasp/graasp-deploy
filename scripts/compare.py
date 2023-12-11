import json
import sys

new = sys.argv[1]
current = sys.argv[2]
output = {}


def format_output(dictionary):
    return "\n".join(
        [f"{k} ({v['old']}) -> ({v['new']})" for k, v in dictionary.items()]
    )


with open(new, "r") as f1:
    new_file = json.loads(f1.read())
with open(current, "r") as f2:
    current_file = json.loads(f2.read())

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

output = [{"repository": k, "tag": v["new"]} for k, v in (updated | added).items()]

all_changes = updated | added | removed
updated_f = f"## :up: Will be updated\n{format_output(updated)}"
added_f = f"## :sparkles: Will be created\n{format_output(added)}"
removed_f = f"## :no_entry: Has been discontinued (ignored)\n{format_output(removed)}"
out_string = "\n\n".join([updated_f, added_f, removed_f])

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
