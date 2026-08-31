// out/ 산출물이 스펙의 불변 조건을 지키는지 검사한다.
// 사용법: npm run build 후 `node scripts/check-output.mjs`
//
// 이 저장소는 NFS 마운트라 로컬에서 `next build`가 막힌다(access(W_OK) 오보고).
// 그래서 이 검사는 실질적으로 GitHub Actions에서만 돈다 — deploy.yml의 빌드 다음 단계다.
import { readFile, readdir } from "node:fs/promises";

async function readPage(name) {
  for (const p of [`out/${name}.html`, `out/${name}/index.html`]) {
    try {
      return await readFile(p, "utf8");
    } catch {
      /* 다음 후보 */
    }
  }
  throw new Error(`페이지 없음: ${name}`);
}

const index = await readPage("index");
const resume = await readPage("resume");
const work = await readPage("work");
const cv = await readPage("cv");
const deck = await readPage("deck");
const all = index + resume + work + cv;

const lectureThumbs = await readdir("out/images/lectures");

// <script> 안에는 RSC 페이로드와 Turbopack이 만든 청크 경로·모듈 id가 들어있는데,
// 여기엔 빌드 머신의 디렉터리 이름 같은 게 그대로 새어 들어간다.
// 문자열 유무 검사는 이걸 페이지 콘텐츠로 착각하면 안 되므로 <script> 블록을 지우고 본다.
const stripScripts = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, "");
const pageOnly = stripScripts(all);
const resumeOnly = stripScripts(resume);

// 2026-08 정리에서 지운 것들. 산출물에 다시 나타나면 정리가 되감긴 것이다.
// (저장소 옛 이름 · 덱 라우트 · 시연 앱 · 덱에서만 쓰던 가상 상호명)
const FORBIDDEN = [
  "teamsparta",
  "스파르타",
  "sparta",
  "portfolio/ax",
  "ai-engineering",
];

// HTML에는 DOM과 RSC 페이로드가 함께 들어가 단순 문자열 검색이 2배로 잡히므로,
// 링크·속성은 DOM에만 나타나는 형태(href="…", data-pub="true")로 센다.
const youtubeLinkCount = (work.match(/href="https:\/\/www\.youtube\.com\/watch\?v=/g) || [])
  .length;
const publicationCount = (work.match(/data-pub="true"/g) || []).length;
const projectCount = (work.match(/data-project="/g) || []).length;

const checks = [
  ["전화번호 미노출", !/[-\s]8295/.test(all)],
  ["이력서에 이메일 노출", resume.includes("feint225@gmail.com")],
  [
    "유튜브 강의 링크 12건",
    youtubeLinkCount === 12,
    `실제 ${youtubeLinkCount}건, 기대 12건`,
  ],
  ["논문 13편", publicationCount === 13, `실제 ${publicationCount}편, 기대 13편`],
  ["프로젝트 6건", projectCount === 6, `실제 ${projectCount}건, 기대 6건`],
  ["특허 2건 모두 노출", work.includes("10-2836534-0000") && work.includes("10-2024-0077839")],
  ["국가 R&D 8건 (최신·최초 과제)", work.includes("K-뷰티") && work.includes("미세먼지 측정기술")],
  ["프로필 사진 basePath 경로", resume.includes("/portfolio/images/yonghaklee.jpg")],
  [
    "강의 썸네일 12장",
    lectureThumbs.length === 12,
    `실제 ${lectureThumbs.length}장, 기대 12장`,
  ],
  // 홈은 세 페이지 안내만 한다 (2026-08 개편).
  [
    "홈 진입 링크 3개",
    index.includes('href="/portfolio/resume"') &&
      index.includes('href="/portfolio/work"') &&
      index.includes('href="/portfolio/cv"'),
  ],
  ["홈에 이름 노출", index.includes("YongHak Lee")],
  // 강의는 포트폴리오 '기타 활동'에만 남기고 이력서에서는 뺐다.
  ["이력서에 강의 섹션 없음", !resumeOnly.includes("도커로 딥러닝 따라하기")],
  ["포트폴리오 기타 활동에 강의 유지", work.includes("도커로 딥러닝 따라하기")],
  [
    "포트폴리오 앵커 3개",
    work.includes('id="lectures"') &&
      work.includes('id="projects"') &&
      work.includes('id="research"'),
  ],
  [
    "헤더 링크 3개",
    resume.includes('href="/portfolio/resume"') &&
      resume.includes('href="/portfolio/work"') &&
      resume.includes('href="/portfolio/cv"'),
  ],
  // CV는 cv.pdf(영문 LaTeX)를 그대로 옮긴 페이지다.
  [
    "CV 페이지 구성",
    cv.includes("Publications") &&
      cv.includes("Patents") &&
      cv.includes("Research Projects") &&
      cv.includes("Technical Skills") &&
      cv.includes("References"),
  ],
  // 덱은 (deck) 라우트 그룹이라 사이트 헤더·푸터가 붙지 않는다.
  // 헤더 링크가 산출물에 보이면 (site) 레이아웃이 잘못 적용된 것이다.
  [
    "덱에 사이트 헤더 없음",
    !deck.includes('href="/portfolio/resume"') &&
      !deck.includes('href="/portfolio/work"') &&
      !deck.includes('href="/portfolio/cv"'),
  ],
  // PDF 저장은 브라우저 인쇄(Ctrl/⌘ + P)로만 한다 — 페이지 안에 인쇄 버튼을 두지 않는다.
  ["인쇄 버튼 없음", !/<button/i.test(all)],
  ["연락 CTA 없음", !pageOnly.includes("함께 일할 이야기가 있다면")],
  // 저자 기여를 과장하지 않는 표기.
  // HTML에서 &는 &amp;로 이스케이프되므로 정규식으로 양쪽을 다 받는다.
  [
    "'참여' 표기",
    work.includes("논문 참여") &&
      /국가 R&(amp;)?D 참여/.test(work) &&
      resume.includes("대표 참여 논문"),
  ],
  ...FORBIDDEN.map((word) => [`잔재 미포함: ${word}`, !pageOnly.includes(word)]),
];

let failed = 0;
for (const [name, ok, detail] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
  if (!ok) {
    failed += 1;
    if (detail) console.log(`      ${detail}`);
  }
}

if (failed > 0) {
  console.error(`\n${failed}개 검사 실패`);
  process.exit(1);
}
console.log("\nALL CHECKS PASSED");
