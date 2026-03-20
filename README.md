# 🏥 CareLink
[cite_start]**AI 기반 건강검진 분석 및 개인 맞춤형 건강 관리 플랫폼** [cite: 2, 3]

> [cite_start]복잡한 의학 데이터를 일상의 언어로 번역하다 [cite: 4]

## 🌐 배포 URL
* [cite_start]**Demo Website:** [carelinkhuman.netlify.app](https://carelinkhuman.netlify.app) [cite: 454]

## 📢 프로젝트 소개
[cite_start]현대인들은 매년 건강검진을 받지만 전문 의학 용어와 수치 중심의 결과표로 인해 정확한 건강 상태를 이해하기 어렵고, 데이터가 파편화되는 문제를 겪습니다[cite: 38, 39]. [cite_start]**CareLink**는 이러한 해석의 장벽을 허물고 [cite: 38][cite_start], AI가 일상 언어로 번역한 직관적인 리포트와 개인 맞춤형 액션 플랜(식단/운동)을 제공하여 실질적인 건강 관리를 돕는 서비스입니다[cite: 82, 85].

## [cite_start]👥 팀원 소개 (AI 심화과정 3팀) [cite: 5]
| 이름 | 역할 | 담당 기능 |
| :--- | :--- | :--- |
| **유세현** | PM | [cite_start]**LogIn/SignUp:** 서버 사이드 세션 및 비밀번호 보안 관리, OTP 메일 발송 [cite: 91, 97, 108, 109] |
| **김선익** | PL | [cite_start]**HealthReport:** 장기별 상태 시각화 (Human Body SVG), 정상/주의/위험 상태 시각화 [cite: 94, 100, 119] |
| **이승연** | Team | [cite_start]**HomePage:** 동적 네비게이션 바, 상태 관리, 비동기 문의하기 폼 [cite: 90, 96, 104, 105] |
| **권우영** | Team | [cite_start]**Upload:** Vision OCR 기반 자동 추출 엔진 설계, 다국어 전환 시스템 구축 [cite: 92, 98, 112, 114] |
| **이동규** | Team | [cite_start]**MyPage:** 마이페이지 건강 분석 대시보드 정밀 설계, UI/UX 최적화 [cite: 93, 99, 116, 117] |
| **변호준** | Team | [cite_start]**ChatBot:** Gemini API 연동 지능형 챗봇, 개인화된 건강 액션 플랜 생성 [cite: 95, 101, 124] |

## 🛠 1. 개발 환경
* [cite_start]**빌드 도구:** Vite [cite: 246]
* [cite_start]**배포 환경:** Netlify Functions (Serverless) [cite: 250]
* [cite_start]**버전 관리 및 협업:** Git, GitHub [cite: 593]

## 💻 2. 기술 스택
* [cite_start]**Frontend:** React, Tailwind CSS, Framer Motion, Recharts, React Router [cite: 246]
* [cite_start]**Backend:** Node.js, Express [cite: 250]
* [cite_start]**Database:** PostgreSQL (Supabase), MariaDB [cite: 250, 267]
* [cite_start]**Auth & Security:** Supabase Auth, JWT, Bcryptjs [cite: 250]
* [cite_start]**AI & API:** Google Generative AI (Gemini 1.5 Pro / 3 Flash), Google Vision API, Axios [cite: 254, 265, 273, 283]

## 🏗 3. 프로젝트 구조
[cite_start]**모던 하이브리드 클라우드 구조** [cite: 257]
* [cite_start]**Frontend:** React SPA 기반 모바일 반응형 및 터치 최적화 UI [cite: 262, 264, 272]
* [cite_start]**AI & Processing:** Gemini 기반 코어 분석 및 Google Vision API 활용 지능형 OCR [cite: 265, 268, 273]
* [cite_start]**Backend & Auth:** Node.js/Express 환경, JWT (Access 1h/Refresh 30d) 및 Bcrypt 암호화 [cite: 266, 269, 270, 271]
* [cite_start]**Database:** users, health_data, ai_reports 등 핵심 스키마 기반 데이터 무결성 확보 [cite: 275, 665]

## 📋 4. 작업 관리
* [cite_start]**GitHub:** 파트별 브랜치 관리 및 PR을 통한 코드 리뷰, 대규모 코드 병합(Merge) 진행 [cite: 589, 593, 683]

## 🚀 5. 주요 구현 화면 및 기능
* [cite_start]**홈페이지:** 건강 인사이트 및 사용자 후기 제공 [cite: 419, 420]
* [cite_start]**로그인/회원가입:** 이메일 주소를 통한 OTP 인증 및 2차 보안 적용 [cite: 443, 444, 670]
* [cite_start]**스마트 업로드:** 건강검진 결과지(PDF, JPG) 업로드 시 Vision API가 10대 핵심 지표를 자동 추출 (하이브리드 OCR) [cite: 144, 145, 148, 150]
* [cite_start]**마이페이지:** AI 건강 코멘트 및 연도별 건강 지수 추이 선형 차트 시각화 [cite: 168, 175, 540]
* [cite_start]**AI 정밀 분석 리포트:** 5대 장기(심장, 간, 췌장, 혈관, 복부) 매핑 모델을 통해 건강 상태를 직관적인 3색(정상/주의/위험)으로 시각화 [cite: 209, 219, 285]
* [cite_start]**실시간 AI 챗봇:** 사용자 건강 데이터를 인지한 Gemini 기반 챗봇이 주간 식단 및 운동 액션 플랜 제공 [cite: 139, 140, 223, 224]

## 🔧 6. 트러블 슈팅
* [cite_start]**코드 병합 (Code Merge) 충돌:** 파트별 코드 대조를 통해 오류 원인을 규명하고 실행 가능한 해결 방안 모색 [cite: 589, 592]
* [cite_start]**OCR API 토큰 소모 문제:** 호환 API 키 교체 및 3개 키 분산 활용 시스템을 구축하여 토큰 최적화 달성 [cite: 598, 599, 601, 602]
* [cite_start]**SVG 시각적 불일치:** Human Body SVG 경로 재설계를 통해 시각적 일관성을 확보하고 장기 지표 매핑 정교화 [cite: 609, 611, 612]
* [cite_start]**데이터 과부하 UI 문제:** AI 분석 결과를 팝업으로 분류하는 2단계 UI를 구축하여, 전체 지표 파악과 상세 정보 조회를 분리함 [cite: 636, 637, 640, 641]

## 🎯 7. 향후 계획
* [cite_start]**Step 1 (데이터 연동):** Apple Health, Samsung Health 등 실시간 웨어러블 데이터 통합 [cite: 645, 646]
* [cite_start]**Step 2 (예측 모델):** 누적된 시계열 데이터를 활용하여 대사증후군 발병 위험 예측 ML 모델 도입 [cite: 648, 649]
* [cite_start]**Step 3 (의료 연결):** 위험 소견 발생 시 병원 예약 시스템 자동 연동 및 소셜 커뮤니티 건강 경험 공유 [cite: 650]

## 💡 8. 프로젝트 후기
* [cite_start]**이승연:** 협업 시 사전 규칙 및 구조 확립의 중요성을 확실하게 인지할 수 있었습니다. [cite: 674]
* [cite_start]**유세현:** 팀 프로젝트를 통해 기술적 부족함과 나의 약점(소통·우선순위·시간 관리)을 명확히 깨달았습니다. [cite: 678, 679]
* [cite_start]**권우영:** 대규모 코드 병합 과정에서의 충돌 해결을 통해 협업 Git 워크플로우의 중요성을 깊이 체감했습니다. [cite: 683]
* [cite_start]**이동규:** 다양한 AI 툴을 활용해 개발 속도 향상을 체감하였고, 실제 협업 환경에서의 프로세스를 이해할 수 있었습니다. [cite: 687, 688]
* [cite_start]**김선익:** AI에게 많은 도움을 받았지만, 여전히 구조와 기술에 대한 이해의 중요성을 체감할 수 있었습니다. [cite: 691]
* [cite_start]**변호준:** 제미나이 API 연동 시 문제가 많았지만, 스스로 코드를 수정하고 해결할 생각을 기르게 되었습니다. [cite: 695, 696]
