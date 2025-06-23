import requests
import json
from datetime import datetime

# Mock data formatted according to your schema
data = {
    "identity": {
        "Timestamp": datetime.utcnow().isoformat(),
        "UserID": "jdoe",
        "SessionID": "SID123456",
        "MachineName": "WORKSTATION-01",
        "LogonType": "remote",
        "AuthResult": "failure",
        "MFAUsed": "no",
        "LogonSource": "RDP"
    },
    "processes": [
        {
            "ProcessName": "malicious.exe",
            "ProcessPath": "C:\\Users\\jdoe\\malicious.exe",
            "PID": 1234,
            "ParentPID": 1,
            "CommandLineArgs": "/silent",
            "ExitCode": 0,
            "ImageHash": "abc123...",
            "CPUUsage": 92,
            "MemoryUsage": 1024
        }
    ],
    "files": [
        {
            "FilePath": "C:\\Secret\\confidential.docx",
            "FileType": ".docx",
            "OperationType": "delete",
            "FileSizeBefore": 2000000,
            "FileSizeAfter": 0,
            "FileHash": "def456...",
            "AccessResult": "allowed",
            "SensitivityLabel": "Confidential"
        }
    ],
    "network": [
        {
            "SourceIP": "192.168.1.10",
            "SourcePort": 4567,
            "DestIP": "8.8.8.8",
            "DestPort": 443,
            "Protocol": "TCP",
            "BytesSent": 6000,
            "BytesReceived": 8000,
            "ConnectionDuration": 10,
            "DNSQuery": "malicious.com",
            "ConnectionStatus": "allowed"
        }
    ],
    "registry": [
        {
            "RegistryHive": "HKEY_LOCAL_MACHINE",
            "KeyPath": "SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters",
            "ValueName": "SearchList",
            "ValueData": "malicious.com",
            "OperationType": "modify"
        }
    ],
    "usb": [
        {
            "USBDeviceID": "USB\\VID_1234&PID_5678",
            "SerialNumber": "ABC123XYZ",
            "MountPoint": "E:\\",
            "DataTransferVolume": 1024,
            "FileNamesTransferred": ["secrets.txt"],
            "AccessOutcome": "allowed"
        }
    ],
    "email_cloud": [
        {
            "ApplicationName": "Email",
            "EmailSender": "jdoe@example.com",
            "EmailRecipient": "unknown@external.com",
            "EmailSubject": "confidential project",
            "AttachmentDetails": "secret.zip (2MB)",
            "UploadVolume": 6000,
            "DownloadVolume": 500,
            "CloudActionType": "write",
            "CloudAPICallDetails": "UploadAttachment"
        }
    ],
    "av_alerts": [
        {
            "AlertID": "AV12345",
            "Severity": "high",
            "InvolvedFile": "C:\\Users\\jdoe\\malicious.exe",
            "ActionTaken": "quarantine"
        }
    ],
    "clipboard_screen": [
        {
            "ClipboardEvent": "copy",
            "ClipboardContentMeta": "text, 200 bytes",
            "ScreenCaptureTrigger": "PrintScreen"
        }
    ]
}

# Send data to server
try:
    print("[+] Sending data to server...")
    response = requests.post("http://localhost:5000/agent", json=data)
    print("[+] Server response:", response.status_code, response.text)
except Exception as e:
    print("[!] Error sending data:", e)
