---
title: "Экспериментальная платформа для тестирования serverless"
date: 2025-06-14
href: "https://github.com/atlz253/serverless-test-platform"
description:
  - "Система для исследования serverless архитектуры в экосистеме Yandex Cloud"
technologies:
  - typescript
  - fastify
  - yandex-cloud
  - mongodb
  - terraform
  - docker
  - vitest
  - k6
---

Экспериментальная backend-система для исследования serverless-подхода на базе Yandex Cloud. Проект собирает события пользовательской активности, сохраняет их в MongoDB, формирует аналитические отчеты по пользователям и типам событий, а также создает ZIP-архивы с выгрузкой данных.

Основной фокус был на backend-архитектуре и инфраструктуре: TypeScript-монорепозиторий, Fastify API, отдельные модули для событий, отчетов и архивов, serverless-функции, очереди сообщений, Object Storage, Terraform-шаблоны, Docker-сборки и скрипт автоматизированного деплоя. Также подготовлены интеграционные и нагрузочные тесты на Vitest и k6 для проверки разных вариантов развертывания.
