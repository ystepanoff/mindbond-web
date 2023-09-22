import jwt

class User:
	def __init__(self, _id: int) -> None:
		self.id = _id
		self.handle = ''

	def __str__(self) -> str:
		return f"User(id={self.id}, handle={self.handle})"

	@staticmethod
	def decode_auth_token(auth_token: str) -> str:
		try:
			payload = jwt.decode(auth_token)
			return payload['sub']
		except jwt.ExpiredSignatureError:
			return 'Signature expired'
		except jwt.InvalidTokenError:
			return 'Invalid token'
