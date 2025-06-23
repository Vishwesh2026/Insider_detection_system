import subprocess
import json
from datetime import datetime

def get_defender_alerts():
    try:
        ps_script = "Get-MpThreatDetection | ConvertTo-Json"
        output = subprocess.check_output(["powershell", "-Command", ps_script], text=True)
        data = json.loads(output)
        if isinstance(data, dict):
            data = [data]

        alerts = []
        for d in data:
            alerts.append({
                "alert_id": d.get("ThreatID"),
                "signature": d.get("ThreatName"),
                "severity": d.get("SeverityID"),
                "involved_file": d.get("InitialDetectionSource"),
                "action_taken": d.get("ActionSuccess"),
                "timestamp": datetime.utcnow().isoformat() + "Z"
            })
        return alerts
    except Exception as e:
        return [{"error": str(e)}]

def collect():
    return get_defender_alerts()
