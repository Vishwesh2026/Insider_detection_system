from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time, os, hashlib

_events = []

class Handler(FileSystemEventHandler):
    def on_any_event(self, e):
        _events.append({
            "path": e.src_path,
            "event": e.event_type,
            "timestamp": time.time(),
            "size_before": None,
            "size_after": os.path.getsize(e.src_path) if os.path.exists(e.src_path) else None,
            "hash": None  # add SHA‑256 if needed
        })

def collect():
    return _events.copy()

def start_monitor(path="."):
    obs = Observer()
    obs.schedule(Handler(), path=path, recursive=True)
    obs.daemon = True
    obs.start()

# Optionally call start_monitor in agent.__main__
