def run_rules(payload):
    alerts = []

    # 1. Identity & Sessions
    identity = payload.get("identity", {})
    if identity.get("AuthResult") == "failure":
        alerts.append(f"Failed login for user {identity.get('UserID', 'Unknown')} on {identity.get('MachineName', 'Unknown')}")
    if identity.get("MFAUsed") == "no":
        alerts.append(f"MFA not used by {identity.get('UserID', 'Unknown')}")
    if identity.get("LogonType") != "interactive":
        alerts.append(f"Non-interactive logon detected via {identity.get('LogonSource', 'Unknown')}")

    # 2. Process Activity
    for proc in payload.get("processes", []):
        if proc.get("CPUUsage", 0) > 80:
            alerts.append(f"High CPU usage by process {proc.get('ProcessName', 'Unknown')} ({proc.get('PID')})")
        if proc.get("MemoryUsage", 0) > 1000:
            alerts.append(f"High memory usage by {proc.get('ProcessName', 'Unknown')} ({proc.get('PID')})")

    # 3. File Operations
    for f in payload.get("files", []):
        if f.get("SensitivityLabel") == "Confidential" and f.get("AccessResult") == "allowed":
            alerts.append(f"Confidential file accessed: {f.get('FilePath', 'Unknown')}")
        if f.get("OperationType") == "delete" and int(f.get("FileSizeBefore", 0)) > 1e6:
            alerts.append(f"Large file deleted: {f.get('FilePath', 'Unknown')}")

    # 4. Network Connections
    for net in payload.get("network", []):
        if net.get("DestIP") not in ["127.0.0.1", "localhost"] and net.get("BytesSent", 0) > 5000:
            alerts.append(f"Large external connection to {net.get('DestIP', 'Unknown')} (DNS: {net.get('DNSQuery', '')})")

    # 5. Registry & Config Changes
    for reg in payload.get("registry", []):
        if reg.get("OperationType") in ["delete", "modify"]:
            alerts.append(f"Registry {reg.get('OperationType')} on {reg.get('KeyPath', '')}\\{reg.get('ValueName', '')}")

    # 6. Removable Media
    for usb in payload.get("usb", []):
        if usb.get("DataTransferVolume", 0) > 500:
            alerts.append(f"Large data transfer ({usb.get('DataTransferVolume')} MB) to USB {usb.get('USBDeviceID')} ({usb.get('MountPoint')})")

    # 7. Email & Cloud Apps
    for e in payload.get("email_cloud", []):
        if int(e.get("UploadVolume", 0)) > 5000:
            alerts.append(f"Large upload ({e.get('UploadVolume')} KB) via {e.get('ApplicationName', '')}")
        if "confidential" in e.get("EmailSubject", "").lower():
            alerts.append(f"Potential exfiltration of confidential data via email: {e.get('EmailSubject')}")

    # 8. Security Alerts & AV
    for av in payload.get("av_alerts", []):
        if av.get("Severity") == "high":
            alerts.append(f"High severity alert: {av.get('AlertID')} involving {av.get('InvolvedFile')}")

    # 9. Clipboard & Screen Capture
    for clip in payload.get("clipboard_screen", []):
        if clip.get("ClipboardEvent") in ["copy", "cut"]:
            alerts.append(f"Clipboard activity detected: {clip.get('ClipboardEvent')} of {clip.get('ClipboardContentMeta', '')}")
        if clip.get("ScreenCaptureTrigger"):
            alerts.append(f"Screen capture triggered: {clip.get('ScreenCaptureTrigger')}")

    return alerts
