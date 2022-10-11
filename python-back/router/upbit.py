from flask import Blueprint

bp=Blueprint('upbit', __name__, url_prefix='/upbit')

@bp.route('/')
def main():
		return '업비트 메인 페이지'

@bp.route('/inquire')
def inquire():
		return '업비트 시세 조회'