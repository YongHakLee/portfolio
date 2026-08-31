import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { asset } from "@/lib/paths";
import { certificates } from "@/data/career";
import { lectureSeries, videoUrl } from "@/data/lectures";
import { projects, type Project, type ProjectPoint } from "@/data/projects";
import { publications, patents, rndProjects } from "@/data/research";

export const metadata: Metadata = {
  title: "포트폴리오",
  description: "프로젝트와 연구 성과로 정리한 이용학의 포트폴리오",
};

/* authors 문자열에서 본인(Lee Y. / Lee Y.*)만 굵게 표시 */
function Authors({ text }: { text: string }) {
  const parts = text.split(/(Lee Y\.\*?)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("Lee Y.") ? (
          <strong key={i} className="font-bold text-ink">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/* 문제 상황 / 해결과 성과 / 수행 내용 — 리드 문구 + 설명 목록 (공통 모양) */
function Points({ title, items }: { title: string; items: ProjectPoint[] }) {
  return (
    <div className="print-avoid-break">
      <h4 className="text-[12px] font-bold tracking-[0.12em] text-faint">{title}</h4>
      <ul className="mt-2 space-y-2 text-[13.5px] leading-[1.65]">
        {items.map((pt) => (
          <li key={pt.lead}>
            <span className="font-bold">{pt.lead}</span>
            <span className="text-muted"> — {pt.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 공통 머리(번호·제목·기간·역할·기술)와 이미지 그리드는 모든 프로젝트가 같고,
   가운데 2열 본문만 항목이 가진 블록에 따라 달라진다. */
function ProjectCard({ p }: { p: Project }) {
  return (
    <article data-project={p.no}>
      {/* 제목·기간·역할·기술은 인쇄에서 갈라지지 않게 한 덩어리로 묶는다 */}
      <div className="print-avoid-break">
        <div className="flex items-baseline gap-4">
          <span className="text-[13px] font-bold text-accent tabular-nums">{p.no}</span>
          <div className="flex-1">
            <h3 className="text-[17px] font-extrabold leading-[1.4] tracking-tight">{p.title}</h3>
            <p className="mt-1 text-[12.5px] text-faint tabular-nums">{p.period}</p>
          </div>
        </div>

        <div className="mt-3 space-y-1 text-[13px] text-muted">
          <p>
            <span className="text-faint">역할 </span>
            {p.role}
          </p>
          <p>
            <span className="text-faint">기술 </span>
            {p.tech.join(" · ")}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-8 sm:grid-cols-2">
        {p.works && <Points title="수행 내용" items={p.works} />}
        {p.results && (
          <div className="print-avoid-break">
            <h4 className="text-[12px] font-bold tracking-[0.12em] text-faint">결과</h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {p.results.map((r) => (
                <li key={r} className="border border-hairline px-2.5 py-1 text-[12.5px]">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}
        {p.problems && <Points title="문제 상황" items={p.problems} />}
        {p.solutions && <Points title="해결과 성과" items={p.solutions} />}
      </div>

      {p.images && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 print-avoid-break">
          {p.images.map((img) => (
            <img
              key={img.src}
              src={asset(img.src)}
              alt={img.alt}
              className="w-full border border-hairline bg-white"
              loading="lazy"
            />
          ))}
        </div>
      )}
    </article>
  );
}

export default function WorkPage() {
  return (
    <div className="pt-14 pb-6">
      {/* 인트로 */}
      <header>
        <h1 className="text-[28px] font-extrabold leading-[1.3] tracking-[-0.02em]">
          프로젝트와 연구
        </h1>
        <p className="mt-4 max-w-xl text-[14.5px] leading-[1.75] text-muted">
          미세먼지 측정부터 모바일 LiDAR 3D 계측, 3D 역설계까지 — 문제를 정의하고 데이터를 모아
          모델을 만들어 검증한 뒤, 그 결과를 논문과 특허로 남겨온 기록입니다.
        </p>
      </header>

      {/* 01 프로젝트 */}
      <section id="projects" className="mt-16 scroll-mt-8">
        <SectionHeading no="01" title="프로젝트" />
        <div className="mt-6 space-y-16">
          {projects.map((p) => (
            <ProjectCard key={p.no} p={p} />
          ))}
        </div>
      </section>

      {/* 02 연구 성과 */}
      <section id="research" className="mt-20 scroll-mt-8">
        <SectionHeading no="02" title="연구 성과" />

        <h3 className="mt-6 text-[12px] font-bold tracking-[0.12em] text-faint">
          논문 참여 {publications.length}편
        </h3>
        <ul className="mt-2 border-t border-ink">
          {publications.map((pub) => (
            <li key={pub.title} data-pub className="border-b border-hairline py-4">
              <div className="flex items-baseline gap-3">
                <span className="shrink-0 text-[12px] text-faint tabular-nums">{pub.year}</span>
                <div className="flex-1">
                  <p className="text-[14px] font-bold leading-snug">{pub.title}</p>
                  <p className="mt-1 text-[12.5px] text-accent">
                    {pub.venue}
                    {pub.role ? ` · ${pub.role}` : ""}
                  </p>
                  <p className="mt-1 text-[12.5px] text-faint">
                    <Authors text={pub.authors} />
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{pub.summary}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="mt-10 text-[12px] font-bold tracking-[0.12em] text-faint">
          특허 {patents.length}건
        </h3>
        <ul className="mt-2 border-t border-ink">
          {patents.map((pt) => (
            <li key={pt.title} className="border-b border-hairline py-4 print-avoid-break">
              <div className="flex items-baseline gap-3">
                <span className="shrink-0 text-[12px] font-bold text-accent">{pt.status}</span>
                <div className="flex-1">
                  <p className="text-[14px] font-bold leading-snug">{pt.title}</p>
                  <p className="mt-1 text-[12px] italic text-faint">{pt.titleEn}</p>
                  <p className="mt-1.5 text-[13px] text-muted">
                    {pt.applied}
                    {pt.registered ? ` · ${pt.registered}` : ""}
                  </p>
                  <p className="mt-1 text-[12.5px] text-faint">발명자 {pt.inventors}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="mt-10 text-[12px] font-bold tracking-[0.12em] text-faint">
          국가 R&D 참여 {rndProjects.length}건
        </h3>
        <ul className="mt-2 border-t border-ink">
          {rndProjects.map((r) => (
            <li
              key={r.title}
              className="flex items-baseline gap-3 border-b border-hairline py-3 text-[13.5px]"
            >
              <span className="shrink-0 text-[12px] text-faint tabular-nums">{r.period}</span>
              <span className="flex-1 font-semibold leading-snug">{r.title}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 03 자격증 */}
      <section className="mt-20 print-avoid-break">
        <SectionHeading no="03" title="자격증" />
        <ul className="mt-4 space-y-2">
          {certificates.map((c) => (
            <li key={c.name} className="flex items-baseline gap-3 text-[13.5px]">
              <span className="flex-1">{c.name}</span>
              <span className="text-[12px] text-muted">{c.org}</span>
              <span className="text-[12px] text-faint tabular-nums">{c.date}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 04 기타 활동 — 강의는 목록만 간단히 */}
      <section id="lectures" className="mt-20 scroll-mt-8 print-avoid-break">
        <SectionHeading no="04" title="기타 활동" />
        <p className="mt-4 text-[13.5px] leading-relaxed text-muted">
          딥러닝 실습 환경 구축과 파이썬 기초를 다룬 유튜브 강의 12편을 제작했습니다.
        </p>
        <div className="mt-5 space-y-6">
          {lectureSeries.map((s) => (
            <div key={s.id} className="print-avoid-break">
              <div className="flex items-baseline justify-between border-b border-hairline pb-1.5">
                <h3 className="text-[14px] font-bold">
                  {s.title}
                  <span className="ml-2 text-[12px] font-normal text-faint">{s.count}편</span>
                </h3>
                <a
                  href={s.playlistUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[12px] font-semibold text-accent"
                >
                  재생목록 ↗
                </a>
              </div>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-muted">
                {s.lectures.map((l) => (
                  <li key={l.videoId}>
                    <a
                      href={videoUrl(l.videoId)}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-accent"
                    >
                      <span className="text-faint tabular-nums">{l.no}</span> {l.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
