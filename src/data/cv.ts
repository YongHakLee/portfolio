// cv/cv.pdf(LaTeX 원본, 2026-08-30 갱신)와 같은 내용을 웹으로 옮긴 것.
// 논문·특허·국가 R&D는 research.ts를 그대로 쓰고, 영문 CV에만 있는 항목만 여기 둔다.
//
// 원본 PDF의 연락처 블록에는 휴대전화 번호가, References에는 지도교수의 사무실 전화가
// 들어 있지만 공개 웹페이지에는 싣지 않는다(이력서·포트폴리오와 같은 기준).

export interface CvEducation {
  degree: string;
  institution: string;
  date: string;
}

export const cvEducations: CvEducation[] = [
  { degree: "Ph.D. Applied Statistics", institution: "Konkuk University, Seoul", date: "Aug 2026" },
  { degree: "M.S. Applied Statistics", institution: "Konkuk University, Seoul", date: "Feb 2022" },
  { degree: "B.A. Applied Statistics", institution: "Konkuk University, Seoul", date: "Feb 2020" },
];

export interface CvExperience {
  position: string;
  organization: string;
  date: string;
}

export const cvExperiences: CvExperience[] = [
  { position: "Research Engineer", organization: "Mustree, Seoul", date: "2023 – 2026" },
];

export interface CvSkill {
  label: string;
  detail: string;
}

export const cvSkills: CvSkill[] = [
  { label: "Programming", detail: "Python, R." },
  {
    label: "Deep learning",
    detail:
      "PyTorch; object detection (YOLO), keypoint detection (HRNet), semantic segmentation, generative models (GAN, diffusion).",
  },
  {
    label: "3D and sensing",
    detail: "Mobile LiDAR, point cloud processing, depth-map-based measurement.",
  },
];

export const cvReference = {
  name: "SungHwan Kim, Ph.D.",
  note: "Academic advisor in M.S. and Ph.D. program",
  lines: [
    "Associate Professor of Statistics",
    "Department of Applied Statistics",
    "Konkuk University",
    "120, Neungdong-ro, Gwangjin-gu, Seoul, South Korea",
  ],
  email: "shkim1213@konkuk.ac.kr",
};

export const cvLastUpdated = "August 30, 2026";
