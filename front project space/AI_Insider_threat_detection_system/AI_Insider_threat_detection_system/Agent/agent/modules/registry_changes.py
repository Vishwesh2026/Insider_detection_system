import winreg
import json
import hashlib
import os

# Registry paths to watch (example: Run key for startup items)
WATCHED_KEYS = [
    (winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Run"),
    (winreg.HKEY_CURRENT_USER, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Run")
]

# Path to store snapshot of previous registry state
SNAPSHOT_FILE = "reg_snapshot.json"

def get_registry_values(hive, path):
    try:
        key = winreg.OpenKey(hive, path, 0, winreg.KEY_READ)
        values = {}
        i = 0
        while True:
            try:
                name, value, _ = winreg.EnumValue(key, i)
                values[name] = value
                i += 1
            except OSError:
                break
        return values
    except Exception as e:
        return {}

def collect():
    current = {}
    changes = []

    for hive, path in WATCHED_KEYS:
        key_id = f"{hive}-{path}"
        values = get_registry_values(hive, path)
        current[key_id] = values

    # Load previous snapshot
    if os.path.exists(SNAPSHOT_FILE):
        with open(SNAPSHOT_FILE, 'r') as f:
            old = json.load(f)
    else:
        old = {}

    # Compare snapshots
    for key_id in current:
        old_vals = old.get(key_id, {})
        new_vals = current[key_id]

        # Check for added or changed values
        for name in new_vals:
            if name not in old_vals:
                changes.append({
                    "registry_hive": key_id.split('-')[0],
                    "key_path": key_id.split('-', 1)[1],
                    "value_name": name,
                    "value_data": str(new_vals[name]),
                    "operation": "create"
                })
            elif old_vals[name] != new_vals[name]:
                changes.append({
                    "registry_hive": key_id.split('-')[0],
                    "key_path": key_id.split('-', 1)[1],
                    "value_name": name,
                    "value_data": str(new_vals[name]),
                    "operation": "modify"
                })

        # Check for deleted values
        for name in old_vals:
            if name not in new_vals:
                changes.append({
                    "registry_hive": key_id.split('-')[0],
                    "key_path": key_id.split('-', 1)[1],
                    "value_name": name,
                    "value_data": str(old_vals[name]),
                    "operation": "delete"
                })

    # Save new snapshot
    with open(SNAPSHOT_FILE, 'w') as f:
        json.dump(current, f)

    return changes
