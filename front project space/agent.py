import time, json, requests
from modules import (
    identity_session, process_activity, file_operations,
    network_monitor, registry_changes, usb_monitor,
    email_cloud_apps, av_alerts, clipboard_screen
)

SERVER_URL = "http://localhost:5000/agent"

def collect_all():
    return {
        "identity": identity_session.collect() or {},
        "processes": process_activity.collect() or [],
        "files": file_operations.collect() or [],
        "network": network_monitor.collect() or [],
        "registry": registry_changes.collect() or [],
        "usb": usb_monitor.collect() or [],
        "email_cloud": email_cloud_apps.collect() or [],
        "av_alerts": av_alerts.collect() or [],
        "clipboard_screen": clipboard_screen.collect() or []
    }

def main():
    while True:
        payload = collect_all()
        try:
            print("\n[+] Sending data to server...")
            response = requests.post(
                SERVER_URL,
                json=payload,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            print("[+] Server response:", response.status_code, response.text)
        except Exception as e:
            print("[-] Error sending data:", e)
        time.sleep(10)

if __name__ == "__main__":
    main()
