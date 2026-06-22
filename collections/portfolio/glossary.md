---
title: "API глоссария"
date: 2025-10-16
href: "https://github.com/atlz253/glossary"
description:
  - "API глоссария для хранения терминов и их определений c поддержкой REST API, gRPC и socketio"
---

Проект построен вокруг общей бизнес-логики и PostgreSQL-хранилища, а доступ к данным реализован сразу через несколько интерфейсов: REST API на FastAPI, gRPC-сервис и Socket.IO/WebSocket.

Основной фокус был на backend-архитектуре и инфраструктуре: CRUD-операциях для терминов, валидации данных, обработке ошибок, proto-контрактах, Docker-развертывании для development/production-режимов, мониторинге через Prometheus и Grafana, а также нагрузочных сценариях на k6 для REST, gRPC и WebSocket.
