# Документация проекта Лендинга

## Описание проекта

Это персональная страница, демонстрирующая профессиональные навыки, проекты и опыт в качестве веб-разработчика. Создано с использованием Astro (статический сайт-генератор) и развернуто на Yandex Cloud.

## Структура проекта

```
collections/
├── musicNews/                 # Markdown-файлы музыкальных новостей + изображения
└── portfolio/                 # Markdown-файлы проектов портфолио + изображения
src/
├── components/
│   ├── Card.astro             # Универсальный компонент карточки
│   ├── Favicon/               # Favicon-иконки разных размеров
│   ├── Fireworks/             # Эффект фейерверков (index.astro + fireworks.ts)
│   ├── FirstScreen/           # Начальный раздел с личной информацией
│   ├── Footer.astro           # Футер страницы
│   ├── GoogleFonts.astro      # Подключение Google Fonts (IBM Plex Sans)
│   ├── Head.astro             # SEO-компонент с мета-тегами
│   ├── Header.astro           # Навигационная панель
│   ├── Layout.astro           # Основная структура страницы
│   ├── Lightbox/              # Компонент лайтбокса для изображений
│   ├── Link.astro             # Компонент ссылки
│   ├── List.astro             # Компонент списка
│   ├── Portfolio/             # Раздел с показом проектов
│   ├── PrettyParagraph.astro  # Компонент форматированного абзаца
│   ├── SocialMediaLinks/      # Ссылки на социальные сети
│   └── Yandex/                # Компоненты для аналитики Yandex
├── features/
│   ├── viewNews/              # Фича отображения музыкальных новостей
│   │   ├── collections/       # Утилиты для загрузки изображений новостей
│   │   ├── components/        # NewsCard и утилиты определения типа превью
│   │   └── schemas/           # Zod-схема новости (title, date, images, yandexVideos, vkVideos)
│   └── viewPortfolio/         # Фича отображения проектов портфолио
│       ├── collections/       # Утилиты для загрузки изображений проектов
│       └── schemas/           # Zod-схема проекта (title, date, href, description, items, code)
├── integrations/
│   ├── vk/                    # Интеграция VK (VKVideo.astro)
│   └── yandexCloud/           # Интеграция Yandex Cloud (YandexCloudVideo.astro)
├── pages/
│   ├── 404.astro              # Страница 404
│   ├── index.astro            # Главная лендинг страница
│   ├── music.astro            # Листинг музыкальных новостей
│   ├── music/[newsId].astro   # Детальная страница новости
│   └── portfolio/[projectId].astro # Детальная страница проекта
├── styles/
│   ├── index.css              # Дизайн-система (CSS-переменные, @layer ui, сброс)
│   ├── button.css             # Стили кнопок
│   └── constants/             # Константы стилей (BUTTON_SIZE_TO_CLASS)
├── ui/
│   └── components/            # UI-компоненты с Astrobook-сториз
│       ├── Button/            # Компонент кнопки + story
│       ├── ButtonLink/        # Компонент ссылки-кнопки + story
│       └── Typography/        # Сториз типографики
└── utils/
    ├── css.ts                 # CSS-утилиты (url helper)
    └── number/                # Утилиты для работы с числами (foldStringToNumber)
```

## Используемые технологии

- **Astro**: Статический сайт-генератор для создания быстрых, контент-ориентированных веб-сайтов
- **Yandex Cloud**: Облачная инфраструктура для развертывания
- **GitHub Actions**: CI/CD пайплайн для автоматических деплоев

### Дизайн-система проекта

Все компоненты должны использовать общую дизайн-систему, определенную в `src/styles/index.css`.
Если в системе не хватает необходимых переменных — развивай её, а не придумывай решение на месте.

#### Рекомендации по анимациям

- Используйте только `transform` и `opacity` для анимаций (GPU-акселерация, без reflow)
- Длительность анимации выбирайте из шкалы: 75ms, 150ms, 300ms
- Пример: `transition: transform var(--transition-duration-2) ease`

### Текущие CSS переменные:

- **Шкала отступов**: `--space-1` до `--space-9`
- **Цветовые палитры**:
  - Желтая (`yellow-1..10`) — выделения и акценты
  - Красная (`red-1..10`) — ошибки и предупреждения
  - Серая (`grey-1..10`) — текст и фоны
  - Синяя (`blue-1..10`) — основные действия и ссылки
  - Базовые цвета: `--color-white`, `--color-black`
- **Шкала теней**: `--box-shadow-1` до `--box-shadow-4` (от карточек до всплывающих элементов)
- **z-index**: `--z-index-1` до `--z-index-6`
- **transition-анимации**: `--transition-duration-1` (75ms), `--transition-duration-2` (150ms), `--transition-duration-3` (300ms)
- **Типографика**: `--font-family-sans: "IBM Plex Sans", sans-serif`, `--font-size-1` до `--font-size-5` с соответствующими line-height
- **Макет**: `--content-width-max: 1440px`
- **Слои каскада**: `@layer ui` — все компонентные стили в слое `ui`

### Astro

- Тебе доступен MCP документации Astro, используй его для получения дополнительной информации когда сталкиваешься с его сущностями
- Также у Astro есть специальный файл для контекста, можешь его использовать когда решение задачи связано с применением возможностей данного фреймворка: https://docs.astro.build/llms.txt

#### Content Collections

Проект использует Markdown-файлы для управления контентом новостей:

- **Схемы валидации**: Zod-схемы (`src/features/viewNews/schemas/`) определяют структуру данных
- **Конфигурация коллекций**: `src/content.config.ts` определяет коллекции через `defineCollection` с `glob`-загрузчиком
- **Загрузка коллекций**: `getCollection("musicNews")` загружает Markdown-файлы из `collections/musicNews/`
- **Динамическая генерация страниц**: `getStaticPaths()` создаёт отдельные страницы для каждой новости

Пример структуры Markdown-новости:

```markdown
---
title: "Отчетный концерт клуба «Живой звук» 2025"
date: 06-07-2025
images:
  - /collections/musicNews/отчетный-концерт-жз-2025.jpg
yandexVideos:
  - https://runtime.video.cloud.yandex.net/player/video/vplvrcab7dowsinl4v5m?autoplay=1&mute=1
vkVideos:
  - https://vk.com/video_ext.php?oid=-37156927&id=456239314&autoplay=1
---

Текст новости с поддержкой Markdown и HTML.
```

## Процесс развертывания

Сайт автоматически разворачивается на Yandex Cloud при пушах в тегированные коммиты:

1. Сборка сайта с использованием Astro
2. Создание временного бакета в Yandex Object Storage
3. Обновление API Gateway для указания нового бакета
4. Удаление предыдущей версии бакета

## Основные особенности

- Адаптивный дизайн с использованием согласованной дизайн-системы (CSS переменные)
- Показ проектов с детальной информацией
- Интеграция ссылок на социальные сети
- Аналитика Yandex Metrika
- Эффект фейерверков в специальные дни
- Отображение кода проектов (с использованием компонента Astro Code)
- Музыкальный раздел с отображением новостей (видео и изображения)

## Процесс развертывания (.github/workflows/deploy.yml)

Процесс деплоя включает:

- Получение репозитория
- Настройка среды Node.js
- Установка зависимостей с помощью npm ci
- Сборка сайта с использованием Astro
- Установка и вход в Yandex Cloud CLI
- Генерация уникального имени бакета с таймстампом
- Создание нового хранилища объектов
- Загрузка собранных файлов в Object Storage
- Настройка API Gateway с использованием envsubst
- Обновление спецификации API Gateway
- Удаление предыдущей версии бакета

## Настройка разработки

Для запуска проекта локально:

1. Установить зависимости: `npm install`
2. Запустить сервер разработки: `npm start`
3. Собрать для продакшена: `npm run build`

### Линтинг

- `npm run lint` — полная проверка ESLint + Stylelint
- `npm run lint:fix` — автофикс ESLint + Stylelint
- `npm run lint:js` — только ESLint
- `npm run lint:css` — только Stylelint для `.css` и `.astro`

### Типизация

- `npm run typecheck` — проверка типов через `astro check`

### Тестирование деплоя

- `npm run workflows.deploy.test` — локальный тест CI/CD через act-cli (требует `.github/.secrets.local`)

## Конфигурационные файлы

- `astro.config.mjs`: Конфигурация Astro с настройками отзывчивых изображений, сервера и интеграцией astrobook (`/astrobook`)
- `src/pages/music.astro`: Листинг музыкальных новостей с сортировкой по дате
- `src/pages/music/[newsId].astro`: Детальная страница отдельной новости
- `.github/.secrets.local`: Локальные секреты для тестирования CI/CD с act-cli
- `src/pages/index.astro`: Главная страница с приветствием и портфолио
- `src/components/Head.astro`: SEO-компонент с поддержкой динамического заголовка
- `src/styles/index.css`: Централизованная дизайн-система (переменные, стили по умолчанию)
- `package.json`: Зависимости проекта и скрипты
- `eslint.config.ts`: Конфигурация ESLint (flat config с type-aware правилами TypeScript + Astro + jsx-a11y)
- `stylelint.config.mjs`: Конфигурация Stylelint для CSS в `.css` и `<style>` блоках `.astro` файлов
- `vite.config.ts`: Конфигурация Vite (terser-минификация, HTML-минификация)
- `src/content.config.ts`: Конфигурация коллекций контента (musicNews + portfolio)
