import win32clipboard
from datetime import datetime
from PIL import ImageGrab
import os

def get_clipboard_event():
    try:
        win32clipboard.OpenClipboard()
        data = win32clipboard.GetClipboardData()
        size = len(data.encode()) if isinstance(data, str) else len(data)
        win32clipboard.CloseClipboard()
        return {
            "event": "copy",
            "content_meta": {"size": size, "type": type(data).__name__},
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }
    except Exception:
        return {}

def get_screen_capture_event():
    try:
        img = ImageGrab.grab()
        width, height = img.size
        return {
            "event": "PrintScreen",
            "dimensions": {"width": width, "height": height},
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }
    except Exception:
        return {}

def collect():
    return [get_clipboard_event(), get_screen_capture_event()]
