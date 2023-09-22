proto:
	python -m grpc_tools.protoc -Iapp/pb/ --python_out=app/pb/. --pyi_out=app/pb/. --grpc_python_out=app/pb/. app/pb/*.proto

web:
	FLASK_APP=app flask run
