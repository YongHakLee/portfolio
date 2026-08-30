export interface Publication {
  title: string;
  venue: string;
  year: string;
  authors: string;
  role?: string;
  summary: string;
}

// 연도 역순. authors 문자열 안의 "Lee Y." 은 렌더링 시 강조 처리한다.
// 저자 표기와 연도는 cv.pdf(2026-08-30 갱신본)를 기준으로 맞춘다.
export const publications: Publication[] = [
  {
    title: "Topology-Constrained NeuroB-Rep: Contact-Aware CAD Reconstruction From 3D Point Clouds",
    venue: "IEEE Access",
    year: "2026",
    authors: "Kang J., Lee C., Lee Y. and Yang S.",
    summary:
      "3D 포인트 클라우드에서 CAD 모델을 복원할 때 면 사이의 접촉 관계와 위상(Topology) 제약을 신경망 학습에 반영해, 형상 정합성과 B-Rep 복원 정확도를 높인 연구.",
  },
  {
    title: "A Two-Stage Diffusion Pipeline for Consistent Front-Back Clothing Generation",
    venue: "Quantitative Bio-Science",
    year: "2025",
    authors: "Hwang M., Jeong Y., Kim S., Noh T., Jeong S., Jeong H. and Lee Y.*",
    role: "교신저자",
    summary:
      "확산 모델(Diffusion Model)을 2단계로 적용해 의상의 앞면과 뒷면 디자인이 서로 일관성을 유지하도록 생성하는 기술을 제안한 연구.",
  },
  {
    title:
      "SoulBound Token Recovery Mechanism and the Application of a Customer-Centric Guardian System",
    venue: "Journal of the Korea Institute of Information Security & Cryptology",
    year: "2025",
    authors: "Kim J., Kim N., Lee Y., Yang S. and Kim S.",
    summary:
      "양도 불가능한 토큰인 SBT(SoulBound Token)를 분실했을 때 복구할 수 있도록 사용자 친화적인 '가디언 시스템'을 도입해 보안성과 편의성을 함께 높인 메커니즘 연구.",
  },
  {
    title: "A Mobile LiDAR-Based Deep Learning Approach for Real-Time 3D Body Measurement",
    venue: "Applied Sciences",
    year: "2025",
    authors: "Jeong Y., Noh T., Lee Y., Lee S., Choi K., Jeong S. and Kim S.",
    summary:
      "모바일 기기에 내장된 LiDAR 센서와 딥러닝을 결합해 실시간으로 인체의 3D 치수를 정밀하게 측정하는 방법론.",
  },
  {
    title:
      "Implementation of SoulBound Token Using Economical and Efficient Decentralized File Storage Methods",
    venue: "Journal of the Korea Institute of Information Security & Cryptology",
    year: "2024",
    authors: "Kim J., Lee Y., Yang S. and Kim S.",
    summary:
      "블록체인 온체인 데이터 저장 비용 문제를 해결하기 위해 탈중앙화 파일 저장 방식(IPFS 등)을 활용해 SBT 시스템을 경제적으로 구현하는 방법을 제시한 연구.",
  },
  {
    title: "Automated Technology for Strawberry Size Measurement and Weight Prediction Using AI",
    venue: "IEEE Access",
    year: "2024",
    authors: "Jeong H., Moon H., Jeong Y., Kwon H., Kim C., Lee Y., Yang S. and Kim S.",
    summary:
      "컴퓨터 비전으로 딸기 영상을 분석해 크기를 자동 측정하고 무게를 예측함으로써 농산물 분류와 스마트팜 자동화에 기여하는 기술.",
  },
  {
    title:
      "A Multi-View Integrated Ensemble for the Background Discrimination of Semi-Supervised Semantic Segmentation",
    venue: "Applied Sciences",
    year: "2023",
    authors: "Gwak H., Jeong Y., Kim C., Lee Y., Yang S. and Kim S.",
    summary:
      "다양한 시점의 정보를 결합한 앙상블 기법으로 준지도 영상 분할에서 객체와 배경의 구분 정확도를 향상시킨 연구.",
  },
  {
    title: "Dental Image Data Generation for Instance Segmentation using Generative Adversarial Networks",
    venue: "Quantitative Bio-Science",
    year: "2023",
    authors: "Heo S., Jung S., Kwak H., Jeong Y., Yang S., Lee Y. and Kim S.",
    summary:
      "데이터 확보가 어려운 치과 의료 영상 분야에서 GAN으로 학습 데이터를 생성(증강)해 인스턴스 분할 모델의 성능을 높인 연구.",
  },
  {
    title:
      "An Investment Model Based on a Head-And-Shoulder Pattern with Multiple Moving Average Technical Indicators for Future Markets",
    venue: "Quantitative Bio-Science",
    year: "2022",
    authors: "Oh J., Piao L., Lee Y., Yang S. and Kim S.",
    summary:
      "선물 시장 투자를 위해 전통적인 차트 패턴인 '헤드앤숄더'와 여러 이동평균선 지표를 결합해 매매 시점을 포착하는 알고리즘 모델.",
  },
  {
    title: "Integrated Analytic Methodology Using Visual Image and Meta-Data for Product Recommendation",
    venue: "Quantitative Bio-Science",
    year: "2022",
    authors: "Lee Y., Oh J., Yang S. and Kim S.",
    role: "제1저자",
    summary:
      "제품의 시각 이미지와 텍스트 메타데이터를 통합 분석해 추천 시스템의 정확도와 사용자 만족도를 높이는 방법론.",
  },
  {
    title: "Automatic Measurements of Garment Sizes Using Computer Vision Deep Learning Models and Point Cloud Data",
    venue: "Applied Sciences",
    year: "2022",
    authors: "Kim S., Moon H., Oh J., Lee Y., Kwon H. and Kim S.",
    summary:
      "3D 포인트 클라우드와 딥러닝 비전 모델을 활용해 사람의 개입 없이 의류 각 부위 치수를 자동 측정하는 시스템 연구.",
  },
  {
    title: "Reinforcement Learning Guided by Double Replay Memory",
    venue: "Journal of Sensors",
    year: "2021",
    authors: "Han J., Jo K., Lim W., Lee Y., Ko K., Sim E., Cho J. and Kim S.",
    summary:
      "이중 재생 메모리(Double Replay Memory) 구조를 도입해 강화학습의 학습 효율성과 안정성을 개선한 연구.",
  },
  {
    title: "Estimation of Particulate Levels Using Deep Dehazing Network and Temporal Prior",
    venue: "Journal of Sensors",
    year: "2020",
    authors: "Jung S., Yang S., Lee E., Lee Y., Ko J., Lee S., Cho J., Lee J. and Kim S.",
    summary:
      "안개 제거 딥러닝 네트워크(Dehazing)와 시간적 변화 정보를 활용해 대기 중 미세먼지 농도를 추정하는 기술.",
  },
];

export interface Patent {
  title: string;
  titleEn: string;
  applied: string;
  appliedEn: string;
  registered?: string;
  registeredEn?: string;
  status: "등록" | "출원";
  inventors: string;
  inventorsEn: string;
}

export const patents: Patent[] = [
  {
    title: "영상 데이터 융합을 통한 얼굴의 부위별 주름 검출 장치 및 방법",
    titleEn: "Apparatus and Method for Detecting Regional Wrinkles on a Face Using Image Data Fusion",
    applied: "출원 10-2024-0174052 (2024.11.28)",
    appliedEn: "App. No. 10-2024-0174052, Nov 2024",
    registered: "등록 10-2836534-0000 (2025.07.16)",
    registeredEn: "Reg. No. 10-2836534-0000, July 2025",
    status: "등록",
    inventors: "김성환, 이용학, 노태욱",
    inventorsEn: "Kim S., Lee Y. and Noh T.",
  },
  {
    title: "2D 및 3D 데이터 융합을 통한 신체 둘레 측정 자동화 방법 및 장치",
    titleEn: "Method and Device for Automating Body Circumference Measurement Through 2D and 3D Data Fusion",
    applied: "출원 10-2024-0077839 (2024.06.14)",
    appliedEn: "App. No. 10-2024-0077839, June 2024",
    status: "출원",
    inventors: "김성환, 이용학, 김장환",
    inventorsEn: "Kim S., Lee Y. and Kim J.",
  },
];

export interface RndItem {
  period: string;
  periodEn: string;
  title: string;
  titleEn: string;
}

export const rndProjects: RndItem[] = [
  {
    period: "2025.05 – 2025.12",
    periodEn: "May 2025 – Dec 2025",
    title: "K-뷰티의 초개인 맞춤화 및 고객 유치 경쟁력 강화를 위한 모바일 피부분석 AI 솔루션 개발",
    titleEn:
      "Development of a Mobile Skin Analysis AI Solution for Hyper-Personalization and Customer Acquisition in the K-Beauty Industry",
  },
  {
    period: "2024.11 – 2025.10",
    periodEn: "Nov 2024 – Oct 2025",
    title:
      "소아 청소년 대상 성장 및 건강 솔루션을 제공하는 모바일 헬스케어 앱 개발을 위한 비만 판정 및 자세 교정",
    titleEn:
      "Obesity Assessment and Posture Correction for a Mobile Healthcare Application Providing Growth and Health Solutions for Children and Adolescents",
  },
  {
    period: "2024.10 – 2025.09",
    periodEn: "Oct 2024 – Sep 2025",
    title: "소상공인의 업소용 기자재 중고 거래 활성화를 위한 기자재 사이즈 및 무게 측정 솔루션 고도화",
    titleEn:
      "Advancement of a Size and Weight Measurement Solution for Commercial Equipment to Promote Second-Hand Trading among Small Business Owners",
  },
  {
    period: "2023.09 – 2024.07",
    periodEn: "Sep 2023 – Jul 2024",
    title: "온라인 중고 거래 활성화를 위한 옷 치수 자동 측정 솔루션 고도화",
    titleEn:
      "Advancement of an Automatic Garment Size Measurement Solution for Online Second-Hand Trading",
  },
  {
    period: "2023.03 – 2024.02",
    periodEn: "Mar 2023 – Feb 2024",
    title: "적대적 샘플 공격에 대한 인공지능의 취약점 분석과 대응방안 연구",
    titleEn:
      "Analysis of Artificial Intelligence Vulnerabilities to Adversarial Example Attacks and Countermeasures",
  },
  {
    period: "2021.09 – 2024.02",
    periodEn: "Sep 2021 – Feb 2024",
    title: "3차원 자료를 활용한 영상인식 및 코로나 방역로봇을 위한 자율주행 연구",
    titleEn:
      "Image Recognition Using 3D Data and Autonomous Driving for COVID-19 Disinfection Robots",
  },
  {
    period: "2020.12 – 2021.11",
    periodEn: "Dec 2020 – Nov 2021",
    title: "인공지능 기반의 비대면 비전 솔루션을 활용한 쓰레기 배출 감시 시스템 개발",
    titleEn:
      "Development of a Waste Disposal Monitoring System Using an AI-Based Contactless Vision Solution",
  },
  {
    period: "2019.12 – 2021.01",
    periodEn: "Dec 2019 – Jan 2021",
    title: "딥러닝 기술과 이미지 프로세싱 기술을 활용한 미세먼지 측정기술 개발",
    titleEn:
      "Development of Particulate Matter Measurement Technology Using Deep Learning and Image Processing",
  },
];
