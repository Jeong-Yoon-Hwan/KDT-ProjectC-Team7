from flask import Flask
# from flask_sqlalchemy import SQLAlchemy as mysql
# from flask_migrate import Migrate as migrate

def create_app():
		app=Flask(__name__)
		use=app.register_blueprint
		from router import main, upbit, finance
		use(main.bp)
		use(upbit.bp)
		use(finance.bp)
		return app


