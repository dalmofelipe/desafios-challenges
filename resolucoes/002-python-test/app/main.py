from fastapi import FastAPI

from app.core import get_blacklist

api = FastAPI(help='Backlist CPF API')

BLACKLIST = get_blacklist()


@api.get('/')
def get_index():
    return 'RUNNING'


@api.get("/{cpf}")
def get_check_cpf(cpf:str = ''):
    if len(cpf) != 11: return 'RUNNING'
    if cpf in BLACKLIST: return 'BLOCK'
    return 'FREE'
