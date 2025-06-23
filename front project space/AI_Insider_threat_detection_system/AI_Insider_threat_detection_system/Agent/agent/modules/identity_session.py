import win32evtlog
import win32con
from datetime import datetime

LOG_TYPE = 'Security'
EVENT_ID_LOGON_SUCCESS = 4624
MAX_EVENTS = 1  # Return only the most recent logon

LOGON_TYPE_MAP = {
    '2': 'interactive',
    '3': 'network',
    '4': 'batch',
    '5': 'service',
    '7': 'unlock',
    '10': 'remote interactive (RDP)',
    '11': 'cached interactive'
}

def get_latest_logon_event():
    server = 'localhost'
    handle = win32evtlog.OpenEventLog(server, LOG_TYPE)
    flags = win32evtlog.EVENTLOG_BACKWARDS_READ | win32evtlog.EVENTLOG_SEQUENTIAL_READ

    while True:
        records = win32evtlog.ReadEventLog(handle, flags, 0)
        if not records:
            break

        for event in records:
            if event.EventID == EVENT_ID_LOGON_SUCCESS and event.EventType == win32con.EVENTLOG_AUDIT_SUCCESS:
                try:
                    inserts = event.StringInserts
                    if inserts is None or len(inserts) < 12:
                        continue

                    logon_type_code = inserts[8]

                    win32evtlog.CloseEventLog(handle)
                    return {
                        "Timestamp": event.TimeGenerated.Format(),
                        "UserID": inserts[5],
                        "SessionID": str(event.RecordNumber),
                        "MachineName": inserts[11],
                        "LogonType": LOGON_TYPE_MAP.get(logon_type_code, logon_type_code),
                        "AuthResult": "success",
                        "MFAUsed": "no",  # Placeholder
                        "LogonSource": inserts[10]
                    }

                except Exception:
                    continue

    win32evtlog.CloseEventLog(handle)
    return {}  # Return empty if no valid event found

def collect():
    return get_latest_logon_event()
