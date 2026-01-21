# syntax=docker/dockerfile:1

ARG PYTHON_VERSION=3.11.6
FROM python:${PYTHON_VERSION}-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Create non-root user
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Switch user
USER appuser

# IMPORTANT: run from backend root
WORKDIR /app/backend

# Expose FastAPI port
EXPOSE 8080

# Start FastAPI correctly
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
