# 커리큘럼·과목·스케줄 반영 전략

코드 수정 전, **어디를 어떻게 고칠지** 정리한 전략 문서입니다.

---

## 1. 수정 대상 파일

| 파일 | 역할 |
|------|------|
| **`components/Academics.tsx`** | 커리큘럼 전부 담당. `currentPage === 'curriculum-schedule'`일 때 보이는 내용이 모두 여기 있음. |

- **App.tsx**: `curriculum-schedule`이면 `<Academics />`만 렌더링하므로, **커리큘럼 문구/과목/스케줄은 Academics.tsx만 수정**하면 됨.
- **data/academicsData.ts**: 현재 커리큘럼 상세 데이터 없음. 과목 설명·스케줄은 Academics.tsx 내부 객체/배열로 유지.

---

## 2. Academics.tsx 내부 구조 (현재)

- **`courseDescriptions`** (65~92줄): `Record<string, string>` — 과목명 → 설명+단위/시간.
- **`case 'curriculum-schedule'`** (129~404줄):
  1. SubPageHeader "Curriculum and Schedule"
  2. **연도별 과목 목록** (1L~4L): `year` + `courses[]` 문자열 배열. 클릭 없이 과목명만 나열.
  3. **Schedule of Required Courses**: 연도 → 트리메스터 → `{ classNum, className, units, hours }[]` 형태로 하드코딩. 각 과목 클릭 시 `courseDescriptions[className]`으로 모달 표시.
- **`course-desc`** (553~584줄): 별도 “Course Catalog” 페이지로, Torts/Contracts/Criminal Law/Real Property 4개만 간단히 표시. 이번 요청은 **커리큘럼·스케줄** 쪽만 대상으로 두고, 필요하면 나중에 연동.

---

## 3. 새로 넣을 콘텐츠와 위치

제공해 주신 내용을 **curriculum-schedule 페이지 안**에서 아래 순서로 배치하는 것을 권장합니다.

| 순서 | 섹션 | 내용 요약 |
|------|------|-----------|
| 1 | **커리큘럼 개요** | J.D. 커리큘럼은 1L은 FYLSX 기준, 2~4L은 California Bar 시험 기준. 2L/3L/4L elective 설명, 4L Bar Review·$200 setup·commercial bar prep 문구. |
| 2 | **864시간·유닛** | Guidelines §5.3, 5.9 (864시간, 48~52주). PAUSL 20유닛 이상 = 864시간 충족. |
| 3 | **Total Units and Hours** | 1L: 22 units, 990 hrs / 2L: 20-26, 900-1170 / 3L: 20-24, 900-1080 / 4L: 21-25, 945-1125. 박스 또는 테이블로 표시. |
| 4 | **Bar 시험 자격·학년 시작** | 4년 이수, 49주차 완료 가능, 다음 학년은 전 학년 시작 기념일 이후부터. PAUSL 1/5/9월 시작. |
| 5 | **트리메스터** | 4개월·16주, 중간/기말, Spring Break·Independence Day·Thanksgiving 1주 휴식. |
| 6 | **1 unit = 45 hours** | 한 줄 안내. |
| 7 | **Notice Regarding Course Instruction** | 제목 + 제공해 주신 여러 문단 전체 (구조, 수업 방식, 교수-학생 상호작용, 피드백, study log, FYLSX/Bar 준비 등). |
| 8 | **First-Year (1L)** | 제목 + 과목 목록(클릭 시 상세) + 제공해 주신 과목별 설명 텍스트 반영. |
| 9 | **Second-Year (2L)** | Civil Procedure 6, Property 6, Remedies 4, Criminal Procedure 4, Elective(UCC, Law & Motion) + 설명. |
| 10 | **Third-Year (3L)** | Evidence 6, Constitutional Law 6, Business Associations 4, Community Property 4, Elective(ADR, Judicial Decision Making) + 설명. |
| 11 | **Fourth-Year (4L)** | Prof Responsibility 4, Wills & Succession 4, CA Civil Procedure 2, Adv Legal Research 3, CA Evidence 2, Practical Competency 6, Bar Review elective 4 + 설명·노트. |
| 12 | **Schedule of Required Courses** | 제공해 주신 표(Trimester, Course #, Course Name, Units, Study Hours) 기준으로 데이터·테이블 교체. |
| 13 | **Textbooks** | 필수·변경 가능·웹사이트 링크·연간 $200–$1,000 안내. |

---

## 4. 과목명·키 통일 (courseDescriptions vs 스케줄)

- 스케줄에서 **클릭한 과목 이름(`className`)**으로 `courseDescriptions[className]`을 조회하므로, **스케줄에 쓰는 과목명과 `courseDescriptions` 키를 반드시 일치**시켜야 함.
- 변경 방향:
  - **통합**: "Civil Procedure I" / "Civil Procedure II" → **"Civil Procedure"** (6 units) 하나로.
  - "Property I" / "Property II" → **"Property"** (6 units).
  - "Evidence I" / "Evidence II" → **"Evidence"** (6 units). (제공 문구에는 "6 nits" → "6 units"로 정정)
  - "Constitutional Law I" / "Constitutional Law II" → **"Constitutional Law"** (6 units).
  - **신규 키**: "Uniform Commercial Code", "Law & Motion", "Alternative Dispute Resolution", "Judicial Decision Making". (기존 "Bar Review (Elective)" 유지 또는 "Bar Review"로 통일)
- **단위/시간**: 제공해 주신 문구대로 반영. 기본식 **1 unit = 45 hours**로 스케줄 표기와 불일치 나는 곳만 정리 (예: 4 units → 180 hours).

---

## 5. Schedule of Required Courses 테이블

- **현재**: 연도별 → 트리메스터별 → `courses[]` 배열. 각 항목에 `classNum`, `className`, `units`, `hours` 있음.
- **변경**: 제공해 주신 표를 그대로 반영하되,
  - 컬럼: **Trimester** | **Course #** | **Course Name** | **Units** | **Study Hours**
  - 행: 1L(2026 Fall, 2027 Winter, 2027 Spring) → 2L → 3L → 4L 순.
- **정정할 오타/일관성** (코드 반영 시 참고):
  - "L101 Contracts (" → "L101 Contracts I"
  - "L102 Torts I" → "L103 Torts I" (Torts I는 L103으로 통일)
  - "Evidence (6 nits)" → "Evidence (6 units)"
  - "Remedies (4Units)" → "Remedies (4 Units)"
  - Community Property 4 units인 경우 시간은 180 (4×45).
  - Bar Review 4 units → 135/180 중 하나로 통일 (제공 표에서는 135·180 혼재 → 180 권장).
- **중복 행**: 같은 트리메스터에 L100이 여러 번 나오는 등은, 제공 표가 “매 학기 개설”을 나타낸 것으로 해석하고, 표에 나온 대로 행을 두어도 됨. 필요하면 “동일 과목 반복 표시”를 한 번만 두고 단위/시간만 맞추는 방식으로 단순화 가능.

---

## 6. 작업 순서 제안 (Phase)

| Phase | 내용 | 비고 |
|-------|------|------|
| **1** | 커리큘럼 개요 + 864시간 + Total Units/Hours + Bar 자격 + 트리메스터 + "1 unit = 45 hours" | curriculum-schedule 상단, SubPageHeader 바로 아래 블록으로 추가. |
| **2** | Notice Regarding Course Instruction | 제목 + 여러 문단. 접이식 또는 일반 섹션. |
| **3** | `courseDescriptions` 전면 갱신 | 제공 문구로 교체, 단위/시간 통일(1 unit=45), 신규 과목 추가, I/II 통합( Civil Procedure, Property, Evidence, Constitutional Law ). |
| **4** | 1L~4L 연도별 과목 배열 + Elective 표기 | 기존 `year`/`courses[]` 구조 유지하되, 과목명을 새 구조에 맞게 변경하고 2L/3L/4L에 Elective 라벨 또는 하위 목록 추가. |
| **5** | Schedule of Required Courses 데이터 교체 | 제공 표 기준으로 `trimesters`/`courses` 데이터 재정의. 오타·단위/시간 일관성 반영. |
| **6** | Textbooks 섹션 | curriculum-schedule 맨 아래에 제목 + 3문단 (필수·변경 가능·웹사이트·$200–$1,000). |

---

## 7. 주의사항

- **다른 페이지/케이스**: `bar-reg`, `disclosure`, `grad-reqs`, `counseling`, `course-desc` 등은 이번에 **건드리지 않음**. `curriculum-schedule` 블록과 그 안의 데이터만 수정.
- **모달**: 기존처럼 스케줄/과목 목록 클릭 시 `courseDescriptions[className]`으로 모달 표시. 새로 넣은 과목명이 스케줄·목록과 동일한 키로 들어가면 그대로 동작.
- **번역/다국어**: 현재 커리큘럼이 `useTranslation` 등과 묶여 있지 않으면, 이번 작업은 영어 문구만 반영해도 됨. 나중에 다국어 추가 시 이 섹션만 별도 키로 빼면 됨.

이 순서대로 Phase 1부터 적용하면, 기존 동작을 깨지 않으면서 제공해 주신 커리큘럼·시간수·과목·스케줄을 일관되게 반영할 수 있습니다.
