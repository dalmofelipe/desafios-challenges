import re


def clear_cpf(cpf:str) -> str:
    """ Remove todos pontos e hifen de um CPF """
    return re.sub('[.-]', '', cpf.strip())


def get_blacklist() -> list[str]:
    """ Retorna lista com todos CPFs da backlist """
    blacklist = []
    with open('./app/blacklist.txt', 'r') as file:
        blacklist = file.readlines()
        blacklist = list(map(clear_cpf, blacklist))
    return blacklist
