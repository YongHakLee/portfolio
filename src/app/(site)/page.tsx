import Link from "next/link";
import { profile } from "@/data/profile";

const entries = [
  {
    href: "/resume",
    label: "이력서",
    labelEn: "Résumé",
    desc: "경력 · 학력 · 연구 · 기술 스택",
  },
  {
    href: "/work",
    label: "포트폴리오",
    labelEn: "Portfolio",
    desc: "프로젝트와 연구 성과의 기록",
  },
  {
    href: "/cv",
    label: "CV",
    labelEn: "Curriculum Vitae",
    desc: "Academic CV (English)",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-[70vh] flex-col justify-center pt-16 pb-16">
      <header>
        <h1 className="text-[40px] font-extrabold leading-none tracking-[-0.03em] sm:text-[52px]">
          {profile.name}
        </h1>
        <p className="mt-2 text-[14px] tracking-[0.08em] text-faint">{profile.nameEn}</p>
        <div className="mt-6 border-t border-ink pt-4 text-[14px] leading-relaxed">
          <p>{profile.role}</p>
          <p className="mt-0.5 text-muted">{profile.focus}</p>
        </div>
      </header>

      <nav className="mt-12">
        <ul className="border-t border-hairline">
          {entries.map((e) => (
            <li key={e.href} className="border-b border-hairline">
              <Link href={e.href} className="group flex items-baseline gap-5 py-6">
                <span className="flex-1">
                  <span className="block text-[22px] font-extrabold tracking-tight group-hover:text-accent sm:text-[24px]">
                    {e.label}
                  </span>
                  <span className="mt-1 block text-[12.5px] text-faint">
                    {e.labelEn} · {e.desc}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="shrink-0 text-[16px] text-hairline transition-colors group-hover:text-accent"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
