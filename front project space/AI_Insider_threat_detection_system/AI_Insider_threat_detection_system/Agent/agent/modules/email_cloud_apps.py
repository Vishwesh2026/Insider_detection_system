import os, time
from datetime import datetime
import win32com.client

def get_recent_emails(limit=5):
    try:
        outlook = win32com.client.Dispatch("Outlook.Application").GetNamespace("MAPI")
        sent_items = outlook.GetDefaultFolder(5)
        messages = sent_items.Items
        messages.Sort("[SentOn]", True)
        recent = []
        for i in range(min(limit, len(messages))):
            msg = messages[i]
            recent.append({
                "application": "Outlook",
                "email_recipient": msg.To,
                "email_subject": msg.Subject,
                "attachment_details": [{"filename": att.FileName, "size": att.Size} for att in msg.Attachments],
                "cloud_action": "send",
                "timestamp": str(msg.SentOn)
            })
        return recent
    except Exception as e:
        return [{"error": f"Outlook not available: {str(e)}"}]


def get_onedrive_changes():
    onedrive_path = os.path.expanduser("~/OneDrive")
    actions = []
    if os.path.exists(onedrive_path):
        for root, dirs, files in os.walk(onedrive_path):
            for file in files:
                filepath = os.path.join(root, file)
                modified = os.path.getmtime(filepath)
                if time.time() - modified < 60:
                    actions.append({
                        "application": "OneDrive",
                        "filename": file,
                        "cloud_action": "modified",
                        "timestamp": datetime.utcfromtimestamp(modified).isoformat() + "Z"
                    })
    return actions

def collect():
    return get_recent_emails() + get_onedrive_changes()
