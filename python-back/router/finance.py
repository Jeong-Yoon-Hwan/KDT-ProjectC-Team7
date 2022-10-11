from flask import Blueprint

bp=Blueprint('finance', __name__, url_prefix='/finance')

@bp.route('/')
def main():
		return '금융 메인 페이지'

@bp.route('/inquire')
def inquire():
		return '금융 시세 조회'