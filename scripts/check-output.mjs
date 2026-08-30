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
const all = index + resume + work;

const lectureThumbs = await readdir("out/images/lectures");

// <script> 안에는 RSC 페이로드와 Turbopack이 만든 청크 경로·모듈 id가 들어있는데,
// 여기엔 빌드 머신의 디렉터리 이름 같은 게 그대로 새어 들어간다.
// 금지어 검사는 이걸 페이지 콘텐츠로 착각하면 안 되므로 <script> 블록을 지우고 본다.
const pageOnly = all.replace(/<script[\s\S]*?<\/script>/gi, "");

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
  ["논문 9편", publicationCount === 9, `실제 ${publicationCount}편, 기대 9편`],
  ["프로젝트 6건", projectCount === 6, `실제 ${projectCount}건, 기대 6건`],
  ["프로필 사진 basePath 경로", resume.includes("/portfolio/images/yonghaklee.jpg")],
  [
    "강의 썸네일 12장",
    lectureThumbs.length === 12,
    `실제 ${lectureThumbs.length}장, 기대 12장`,
  ],
  ["랜딩 헤드라인", index.includes("따라 할 수 있게")],
  [
    "포트폴리오 앵커 3개",
    work.includes('id="lectures"') &&
      work.includes('id="projects"') &&
      work.includes('id="research"'),
  ],
  [
    "헤더 링크 2개",
    resume.includes('href="/portfolio/resume"') && resume.includes('href="/portfolio/work"'),
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
