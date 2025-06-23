import psutil, hashlib

def collect():
    procs = []
    for p in psutil.process_iter(attrs=["pid", "ppid", "name", "exe", "cmdline", "memory_info", "cpu_percent"]):
        info = p.info
        h = ""
        try:
            with open(info["exe"], "rb") as f:
                h = hashlib.sha256(f.read()).hexdigest()
        except:
            pass
        procs.append({
            "pid": info["pid"], "ppid": info["ppid"],
            "name": info["name"], "path": info["exe"],
            "cmdline": " ".join(info["cmdline"]) if info["cmdline"] else "",
            "exit_code": None,  # You'll need process completion tracking
            "hash": h,
            "cpu": info["cpu_percent"],
            "memory": info["memory_info"].rss if info["memory_info"] else 0
        })
    return procs
