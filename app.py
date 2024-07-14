from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import numpy as np

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///assets.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Asset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    purchase_date = db.Column(db.DateTime, nullable=False)
    lifecycle_stage = db.Column(db.String(20), nullable=False)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

@app.route('/assets', methods=['GET'])
def get_assets():
    assets = Asset.query.all()
    return jsonify([asset.as_dict() for asset in assets])

@app.route('/assets', methods=['POST'])
def add_asset():
    data = request.get_json()
    new_asset = Asset(
        name=data['name'],
        type=data['type'],
        status=data['status'],
        purchase_date=datetime.strptime(data['purchase_date'], '%Y-%m-%d'),
        lifecycle_stage=data['lifecycle_stage']
    )
    db.session.add(new_asset)
    db.session.commit()
    return jsonify(new_asset.as_dict()), 201

@app.route('/assets/<int:asset_id>', methods=['PUT'])
def update_asset(asset_id):
    data = request.get_json()
    asset = Asset.query.get(asset_id)
    if asset:
        asset.name = data['name']
        asset.type = data['type']
        asset.status = data['status']
        asset.purchase_date = datetime.strptime(data['purchase_date'], '%Y-%m-%d')
        asset.lifecycle_stage = data['lifecycle_stage']
        db.session.commit()
        return jsonify(asset.as_dict())
    return jsonify({'message': 'Asset not found'}), 404

@app.route('/assets/<int:asset_id>', methods=['DELETE'])
def delete_asset(asset_id):
    asset = Asset.query.get(asset_id)
    if asset:
        db.session.delete(asset)
        db.session.commit()
        return jsonify({'message': 'Asset deleted'})
    return jsonify({'message': 'Asset not found'}), 404

@app.route('/assets/optimize', methods=['GET'])
def optimize_assets():
    assets = Asset.query.all()
    asset_data = [asset.as_dict() for asset in assets]
    optimized_assets = ai_optimize(asset_data)
    return jsonify({'message': 'Optimization complete', 'optimized_assets': optimized_assets})

def ai_optimize(asset_data):
    from datetime import datetime, timedelta

    for asset in asset_data:
        purchase_date = datetime.strptime(asset['purchase_date'], '%Y-%m-%d')
        if purchase_date < datetime.now() - timedelta(days=3*365):
            asset['lifecycle_stage'] = 'replacement_needed'

        usage_factor = np.random.uniform(0, 1)
        if usage_factor < 0.2:
            asset['status'] = 'underutilized'

    return asset_data

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
