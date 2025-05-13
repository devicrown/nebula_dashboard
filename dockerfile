
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY app.py ./
COPY config/ ./config/
COPY static/ ./static/

RUN pip install flask

EXPOSE 5000

CMD ["python", "app.py"]
