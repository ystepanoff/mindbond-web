proto:
	python -m grpc_tools.protoc -Iapp/pb/ --python_out=app/pb/. --pyi_out=app/pb/. --grpc_python_out=app/pb/. app/pb/*.proto

web:
	source venv/bin/activate && FLASK_APP=app FLASK_RUN_PORT=5050 flask run
