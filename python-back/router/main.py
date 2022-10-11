from flask import Blueprint, jsonify, request

bp=Blueprint('main', __name__, url_prefix='/')

@bp.route('/')
def main():
		return '환영합니다!!'

@bp.route('/node', methods=['GET'])
def nodeget():
				return jsonify({"message" : "파이썬과 get 연동됐습니다."})

@bp.route('/node', methods=['POST'])
def nodepost():
				return jsonify({"message" : "파이썬과 post 연동됐습니다."})
