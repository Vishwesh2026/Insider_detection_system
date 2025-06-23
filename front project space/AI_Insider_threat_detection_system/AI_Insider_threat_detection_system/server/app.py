
from flask import Flask, request, render_template
from datetime import datetime
from rules_engine import run_rules

app = Flask(__name__)
data_store = []
alert_store = []

@app.route('/agent', methods=['POST'])
def receive_data():
    content = request.json
    content['timestamp'] = datetime.utcnow().isoformat()
    alerts = run_rules(content)
    if alerts:
        content["alerts"] = alerts
        alert_store.append({"timestamp": content["timestamp"], "alerts": alerts})
    data_store.append(content)
    return {"status": "received"}, 200

@app.route('/')
def dashboard():
    return render_template('index.html', data=data_store[-10:], alerts=alert_store[-10:])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
