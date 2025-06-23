import psutil

def collect():
    conns = []
    for c in psutil.net_connections(kind='inet'):
        l = c.laddr._asdict() if c.laddr else {}
        r = c.raddr._asdict() if c.raddr else {}
        conns.append({
            "source_ip": l.get("ip"), "source_port": l.get("port"),
            "dest_ip": r.get("ip"), "dest_port": r.get("port"),
            "protocol": c.type.name if hasattr(c.type, 'name') else str(c.type),
            "status": c.status
        })
    return conns
