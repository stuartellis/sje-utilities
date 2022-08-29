ARG DOCKER_IMAGE_BASE=python:3.10-slim-bullseye

#============ BASE ===========

FROM ${DOCKER_IMAGE_BASE} as base_python

#========== BUILDER ==========

FROM base_python as builder

ENV PYTHONUNBUFFERED=1
ENV PATH="/opt/venv/bin:$PATH"
RUN python -m venv /opt/venv
COPY ./requirements.txt ./
RUN . /opt/venv/bin/activate && pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

#=========== APP ============

FROM base_python as app

RUN groupadd --gid 1000 appusers \
  && useradd --uid 1000 --gid appusers --shell /bin/bash --create-home appuser

RUN mkdir /app && chown -R appuser:appusers /app

COPY --from=builder --chown=appuser:appusers /opt/venv /opt/venv
COPY --chown=appuser:appusers . /app

WORKDIR /app

USER appuser
ENV PATH="/opt/venv/bin:$PATH"
ENV PYTHONUNBUFFERED 1

CMD . /opt/venv/bin/activate && exec python ./example_app.py
