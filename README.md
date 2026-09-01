# 이용학 · 이력서 · 포트폴리오 · CV

AI 엔지니어 · 응용통계학 박사. 컴퓨터 비전과 3D 계측을 다룹니다.
이력서 · 포트폴리오 · 영문 CV를 담은 개인 웹사이트입니다.

**https://yonghaklee.github.io/portfolio/**

| 링크 | 내용 |
|---|---|
| [이력서](https://yonghaklee.github.io/portfolio/resume) | 소개 · 경력 · 학력 · 기술 스택 · 연구 · 프로젝트 |
| [포트폴리오](https://yonghaklee.github.io/portfolio/work) | 프로젝트 · 연구 성과 · 기타 활동 |
| [CV](https://yonghaklee.github.io/portfolio/cv) | 영문 학술 CV (`cv/cv.pdf`와 같은 내용) |

세 페이지 모두 `Ctrl/⌘ + P` → **PDF로 저장**으로 인쇄용 레이아웃이 적용된 PDF가 됩니다.

## 기술 스택

Next.js 16 (App Router · 정적 export) · React 19 · TypeScript · Tailwind CSS 4 · GitHub Pages

## 개발

```bash
npm install
npm run dev    # http://localhost:3000/portfolio
```

`next.config.ts`의 `basePath`가 `/portfolio`라 개발 서버에서도 경로 앞에 `/portfolio`가 붙습니다.
`basePath`는 `src/lib/paths.ts`의 `BASE_PATH` 한 곳에서 관리합니다.
