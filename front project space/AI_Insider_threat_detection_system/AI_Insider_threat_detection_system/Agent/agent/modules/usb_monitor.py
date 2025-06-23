import psutil
def collect():
    usb_connected = False
    for part in psutil.disk_partitions():
        if 'removable' in part.opts or 'media' in part.device.lower():
            usb_connected = True
            break

    return [{
        "USBDeviceID": "unknown",
        "SerialNumber": "unknown",
        "MountPoint": part.mountpoint if usb_connected else "N/A",
        "DataTransferVolume": 0,  # update if you can track volume
        "FileNamesTransferred": [],
        "AccessOutcome": "allowed" if usb_connected else "denied"
    }] if usb_connected else []
