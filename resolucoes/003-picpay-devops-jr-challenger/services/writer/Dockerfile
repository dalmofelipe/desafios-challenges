FROM python:3.9.14-alpine3.16
WORKDIR /app
ADD . .
RUN /usr/local/bin/python -m pip install --upgrade pip \
    && pip install -r requirements.txt --no-cache-dir \
    && pip cache purge
EXPOSE 8081
ENTRYPOINT ["python"]
CMD ["main.py"]