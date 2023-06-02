import pytest
from app.app import app


@pytest.fixture
def client():
    app.testing = True
    client = app.test_client()
    yield client


def test_get_data(client):
    response = client.get('/')

    assert response.status_code == 200
    assert response.get_json() == {'message': 'Hello, world!'}
