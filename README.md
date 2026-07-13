# Ludoom.com — фирмен сайт (React + Tailwind)

## Локално
```bash
npm install
npm run dev
```

## Редакция на съдържанието
- **Проекти по години** → `src/projects.js` (само този файл). Снимки: сложи
  jpg/png в `public/projects/` и напиши името на файла в полето `image`.
  Без снимка картата показва цветен placeholder.
- **Текстове EN/BG** → константата `T` в `src/App.jsx`
- **Линкове и имейл** → константата `LINKS` в `src/App.jsx`

## Подготвено за фаза 2
- **Rive анимация**: hero елементът има `id="rive-slot"` — по-късно
  инсталираме `@rive-app/react-canvas` и заменяме съдържанието му с
  <RiveComponent>. Нищо друго по структурата не се пипа.
- **Чатбот (Claude)**: ще добавим `api/chat.js` (Vercel serverless
  функция с Anthropic API ключ като environment variable) + widget
  компонент. Изисква API ключ от console.anthropic.com.

## Deploy във Vercel
`npm i -g vercel && vercel --prod` от папката, или GitHub import.
Build: `npm run build`, Output: `dist` (Vercel ги открива сам).
Домейн: Settings → Domains → ludoom.com.
