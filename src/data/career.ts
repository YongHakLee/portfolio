export interface CareerItem {
  company: string;
  period: string;
  position: string;
  tasks: string[];
}

export const careers: CareerItem[] = [
  {
    company: "주식회사 머스트리",
    period: "2023.03 – 2026.06",
    position: "기술개발팀 연구원",
    tasks: [
      "데이터 수집 및 정제",
      "3D Point Cloud 기반 치수 측정 알고리즘 연구",
      "AI 모델 연구 개발 / 자동화 및 API 구현",
      "국가 R&D 과제 제안 및 수행",
      "특허 관리",
    ],
  },
];

export interface EducationItem {
  school: string;
  period: string;
  degree: string;
  thesis?: string;
}

export const educations: EducationItem[] = [
  {
    school: "건국대학교 일반대학원",
    period: "2022.03 – 2026.08",
    degree: "응용통계학과 박사",
    thesis: "모바일 LiDAR와 딥러닝 통합을 통한 3D 생체 인식 및 자동화 정밀 측정 연구",
  },
  {
    school: "건국대학교 일반대학원",
    period: "2020.03 – 2022.02",
    degree: "응용통계학과 석사",
    thesis: "상품 추천을 위한 시각 이미지와 메타데이터 통합 분석 방법론",
  },
  {
    school: "건국대학교",
    period: "2010.03 – 2020.02",
    degree: "응용통계학과 학사",
  },
];

export interface SkillCategory {
  label: string;
  items: string[];
}

// 세 줄로 끝나도록 유지한다. 항목을 늘리기보다 대표적인 것만 남긴다.
export const skills: SkillCategory[] = [
  { label: "언어", items: ["Python", "R", "SQL"] },
  {
    label: "딥러닝 · 비전",
    items: ["PyTorch", "YOLO", "HRNet", "Segmentation", "GAN · Diffusion"],
  },
  {
    label: "3D · 인프라",
    items: ["Mobile LiDAR", "Point Cloud", "Open3D", "OpenCV", "FastAPI", "Docker"],
  },
];

export interface CertItem {
  name: string;
  date: string;
  org: string;
}

export const certificates: CertItem[] = [
  { name: "AI 바우처 우수사례 선정 (공급기업 수행)", date: "2025.12", org: "정보통신산업진흥원" },
  { name: "SQLD", date: "2025.12", org: "한국데이터산업진흥원" },
  { name: "ADsP", date: "2025.11", org: "한국데이터산업진흥원" },
  { name: "한국사능력검정시험 1급", date: "2019.08", org: "국사편찬위원회" },
  { name: "컴퓨터활용능력 1급", date: "2015.08", org: "대한상공회의소" },
];
