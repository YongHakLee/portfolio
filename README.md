# 이용학 — 이력서 · 포트폴리오

AI 엔지니어 · 응용통계학 박사과정. 이력서와 포트폴리오를 담은 개인 웹사이트입니다.

**https://yonghaklee.github.io/portfolio/**

| 링크 | 내용 |
|---|---|
| [이력서](https://yonghaklee.github.io/portfolio/resume) | 소개 · 경력 · 학력 · 연구 · 기술 스택 |
| [포트폴리오](https://yonghaklee.github.io/portfolio/work) | 교육 콘텐츠 · 프로젝트 · 연구 성과 |

## 기술 스택

Next.js 16 (App Router · 정적 export) · React 19 · TypeScript · Tailwind CSS 4 · GitHub Pages

## 개발

```bash
npm install
npm run dev    # http://localhost:3000/portfolio
```

`next.config.ts`의 `basePath`가 `/portfolio`라 개발 서버에서도 경로 앞에 `/portfolio`가 붙습니다.
`basePath`는 `src/lib/paths.ts`의 `BASE_PATH` 한 곳에서 관리합니다.

관리 절차(이미지 가공, 배포, 이력서 PDF)는 [운영 메모](docs/운영메모.md)에 있습니다.
