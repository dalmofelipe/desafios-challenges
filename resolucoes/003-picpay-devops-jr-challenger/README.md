## PicPay DevOps JR Challenger

- [ENUNCIADO](https://github.com/dalmofelipe/PicPayDevOpsJrChallenger/blob/master/CHALLENGER.md)
- [COMMIT #1 - RECONHECENDO O PROJETO](#commit-1---reconhecendo-o-projeto)
- [COMMIT #2 - FIX BUGS](#commit-2---fix-bugs)
- [COMMIT #3 - REFATORANDO O WRITER](#commit-3---refatorando-o-writer)
- [COMMIT #4 - REAFATORANDO O READER](#commit-4---refatorando-o-reader)


## COMMIT #1 - RECONHECENDO O PROJETO

Desde que o clonamos o projeto a propria IDE já indica a falta das dependências nos códigos e manifestos `go.mod` ou `requirement.txt`, em suas respectivas pastas. E também não foram descritas nos dockerfiles.

### READER em Golang

Para o serviço READER foi gerado o `go.mod` que indicará as dependências a serem instaladas. Este arquivo será copiado no processo de build.

O dockerfile foi ajustado, para instalar as depedências com `RUN go mod tidy` durante o build.

Fiz por esta abordagem, pois até onde sei, cada comando RUN no dockerfile gera uma nova layer no processo de build. Desta forma, crio apenas um camada dedicada as depedências do projeto, deixando o build mais limpo e agil, além do dockerfile ficar mais legivel.

Modifiquei a versão da imagem golang somente por compatibilidade com a versão do meu computador.

### WRITER em Python

Não foi gerado o `requirements.txt` para WRITER, somente adicionado o comando `RUN pip install redis` no dockerfile para instalar dependência do redis, com objetivo de ilustrar os passos realizados com READER.

Dockerfile foi modificado os valores do ENTRYPOINT para "python" e CMD passando o argumento "main.py" como parametro para o ENTRYPOINT. 

### DOCKER-COMPOSE

#### PORTAS

Todas portas descritas no docker-compose foram verificadas nos códigos e dockerfiles dos serviços. Assim foi modificadas, como:

1.  `service.writer.ports:"8080:8080"` >>> `service.writer.ports:"8081:8081"`
2.  `service.reader.ports:"8081:8081"` >>> `service.reader.ports:"8080:8080"`

#### NETWORK

1. Criada rede do frontend
2. Substituida a rede frontend do READER pela backend
3. Adicionado a rede backend no serviço do "reids" 
4. Frontend mantido nas duas redes

#### SERVICE NAME

Nome do serviço do "reids" foi mofidicado para "redis", passo importante pois os serviços usam o hostname para conectar ao container do redis.

### FRONTEND em JavaScript

Ajuste realizado no `CMD` do dockerfile, configurado para executar o script 'start' do packege.json

```dockerfile
CMD ["npm", "start"]
```

<br>

PRIMERIO COMPOSE UP!!!

```dockerfile
docker compose up
```


### RESULTADO

FRONTEND ouvindo a porta 3000; webapp não abre na porta 3000 e nem na 5000

READER muitos parametros para a função client.Get; healthcheck não responde

WRITE OK repondendo o healthcheck

```bash
picpaydevopsjrchallenger-web-1     | INFO: Accepting connections at http://localhost:3000.
picpaydevopsjrchallenger-reader-1  | # command-line-arguments
picpaydevopsjrchallenger-reader-1  | ./main.go:27:39: too many arguments in call to client.Get
picpaydevopsjrchallenger-reader-1  |    have (context.Context, string)
picpaydevopsjrchallenger-reader-1  |    want (string)
```

<br>


## COMMIT #2 - FIX BUGS

### CORREÇÃO NO CÓDIGO DO READER 

No serviço READER, foi mantido somente a "chave" de armazenamento do redis, como parâmetro da função client.Get()

```golang
key := client.Get("SHAREDKEY")
```

```dockerfile
docker compose build
docker compose up
```

### RESULTADO

READER respondeu ao healthcheck sem erros

```bash
### READER GOLANG 8080
GET http://localhost:8080/health HTTP/1.1

HTTP/1.1 200 OK
Vary: Origin
Date: Tue, 11 Oct 2022 02:34:22 GMT
Content-Length: 2
Content-Type: text/plain; charset=utf-8
Connection: close

up
```
<br>

### PORTAS DO FRONTEND

No 'help' do da lib 'serve', informa que por padrão o 'serve' sobe o projeto na porta 3000.

> By default, serve will listen on 0.0.0.0:3000 and serve the
> 
> current working directory on that address.


Também é possível observar a option `-p [NUMERO PORTA]` onde podemos espeficar uma porta para o serve. Assim, foi adicionado o parâmetro `-p 5000` no script 'start' do `package.json`.


```dockerfile
docker compose build
docker compose up
```

### RESULTADO

TUDO FUNCIONANDO, ao acessar raiz do localhost:5000 é exibido um status "UP" em verde dos healthchecks. Também é possível publicar uma mensagem no menu WRITER, e apos realizar o reload da página, a mensagem pode ser lida no menu READER

```bash
picpaydevopsjrchallenger-web-1     | INFO: Accepting connections at http://localhost:5000.
picpaydevopsjrchallenger-writer-1  | 172.18.0.1 - - [11/Oct/2022 02:49:32] "OPTIONS /health HTTP/1.1" 200 -
up
```

## COMMIT #3 - REFATORANDO O WRITER

#### DOCKERFILE

Modifiquei o dockerfile do WRITE para utilizar a imagem python versão do alpine. 

Utilizei o atalho ponto '.' do WORKDIR no comando ADD

Gerado o manifesto de depedências `requirements.txt` para build. No build o pip é atualizado, instala as dependências e limpa o cache dessas operações.

Build da imagem do WRITE com a tag dalmofelipe/alpyne-writer enviada para o docker hub, para futuros deploys.


## COMMIT #4 - REFATORANDO O READER

#### DOCKERFILE

Por meio da técnica multistage build, foi utilizado a imagem do golang-alpine, para realizar o build do executável do projeto e alpine pura para servir o serviço de READER. 

A imagem final ficou com 6MB de tamanho, gerando containers que ocupam 12MB. 

Também foi armazenada no docker hub com a tag `dalmofelipe/algone-reader:1.0.0`  

<br>

---

**LIMPANDO TUDO CONTAINERS E IMAGENS**

```bash
docker container rm picpaydevopsjrchallenger-web-1 picpaydevopsjrchallenger-redis-1 picpaydevopsjrchallenger-reader-1 picpaydevopsjrchallenger-writer-1 && docker image rm picpaydevopsjrchallenger-web:latest picpaydevopsjrchallenger-reader:latest picpaydevopsjrchallenger-writer:latest
```
