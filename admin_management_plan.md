# Admin 페이지 관리 항목 계획서

## 📋 현재 관리 중인 항목 (이미 구현됨)

### 1. Site Settings (일반 설정)
- ✅ Global Alert (긴급 알림 배너)
  - 활성화/비활성화
  - 메시지 내용
  - 타입 (info/warning/emergency)
- ✅ Homepage Hero
  - Hero Headline
  - Hero Subtitle

### 2. Admissions (입학 관리)
- ✅ Tuition Control
  - Annual Tuition Cost
  - Tuition Info Blurb
- ✅ Application Deadlines
  - Term, Date, Type 관리

### 3. Latest News (최신 뉴스)
- ✅ 뉴스 아이템 CRUD
  - 제목, 날짜, 본문
  - 이미지 첨부 (다중)
  - Rich Text Editor
  - Pin 기능

### 4. Notice Board (공지사항)
- ✅ 공지사항 CRUD
  - 제목, 날짜, 본문
  - Rich Text Editor
  - Pin 기능

### 5. Weekly Dicta (주간 뉴스레터)
- ✅ Weekly Dicta CRUD
  - Title, Intro
  - Notices (NewsItem 배열)
  - 제목, 날짜, 본문
  - Rich Text Editor
  - Pin 기능
  - Category (Newsletter)

### 6. Faculty Profiles (교수진 관리)
- ✅ 교수진 프로필 CRUD
  - 이름, 직함, 학력
  - Biography
  - Expertise Areas

### 7. Curriculum (학사 과정)
- ✅ Programs & Descriptions
- ✅ Area Concentrations

---

## 🚀 추가 관리가 필요한 항목

### 8. Home Page Content (홈페이지 콘텐츠 관리)

#### 8.1 Vision & Mission Section
- **Vision Statement** (현재 하드코딩됨)
  - 인용문 텍스트
  - 작성자 (Office of the President)
- **Mission Section**
  - Mission Title
  - Mission Description
  - Mission Points (3개)
    - 각 포인트: Title, Description, Icon

#### 8.2 Intro Section
- **Intro Title**
- **Intro Text**

#### 8.3 Features Section
- **Features** (3개)
  - 각 Feature: Title, Description, Icon

#### 8.4 Success Section
- **Success Title**
- **Success Text**
- **Statistics** (4개)
  - 각 Stat: Label, Value

#### 8.5 Global Future Section
- **Global Future Title**
- **Global Future Intro**
- **Global Future List** (여러 항목)
  - 각 항목: Title, Description, Detail Title, Detail Body, Image, Stats, Related Pathways
- **Global Future Closing**

#### 8.6 Clinics Section
- **Clinics Title**
- **Clinics Intro**
- **Clinics List**
  - 각 Clinic: ID, Title, Description, Body

---

### 9. Calendar Management (학사일정 관리)

#### 9.1 Events by Cohort
- **1L Cohort Events**
  - Start Dates (January, April, September)
  - Key Events (FYLSX 등)
- **2L-3L Cohort Events**
  - Start Dates (March, July, November)
  - Key Events
- **4L Cohort Events**
  - Start Dates (January, July, November)
  - Key Events (Graduation 등)

#### 9.2 Event Management
- 각 이벤트: Date, Event Name, Type (Academic/Exam/Event)

**우선순위: 중**

---

### 10. Careers Page (취업 지원 관리)

#### 10.1 Statistics
- **Career Stats** (3개)
  - 각 Stat: Label, Value

#### 10.2 Services
- **Student Services** (여러 개)
  - 각 Service: Title, Description

**우선순위: 중**

---

### 11. Library Page (도서관 관리)

#### 11.1 Library Sections
- **Sections** (3개)
  - 각 Section: Title, Content

**우선순위: 낮음**

---

### 12. Consumer Info Page (소비자 정보 관리)

#### 12.1 Consumer Info Sections
- **Sections** (여러 개)
  - 각 Section:
    - ID
    - Title
    - Subtitle (선택)
    - Content (선택)
    - Table Data (선택) - Label, Value 쌍
    - Download Button (선택)

**우선순위: 중**

---

### 13. Centers/Clinics Management (센터/클리닉 관리)

#### 13.1 Clinic Details
- **Clinic List** (Centers 페이지용)
  - 각 Clinic: ID, Title, Description, Body
  - 이미지 관리
  - 연락처 정보

**우선순위: 중**

---

**참고:** Weekly Dicta는 이미 구현되어 있지만, Admin 페이지에서 관리 기능이 아직 추가되지 않았습니다. Notice Board와 유사한 구조이므로 동일한 방식으로 관리할 수 있습니다.

---

## 📊 우선순위별 구현 계획

### Phase 1: 핵심 콘텐츠 관리 (높은 우선순위)
1. **Weekly Dicta Management** (이미 데이터 구조는 있음, Admin UI만 추가 필요)
   - Weekly Dicta 아이템 CRUD
   - Notice Board와 유사한 관리 인터페이스

2. **Home Page Content Management**
   - Vision & Mission
   - Features
   - Statistics
   - Clinics Section
   - Global Future Section

### Phase 2: 학사 운영 관리 (중간 우선순위)
2. **Calendar Management**
   - Cohort별 이벤트 관리
   - 학사일정 CRUD

3. **Careers Page Management**
   - Stats 관리
   - Services 관리

4. **Consumer Info Management**
   - Sections 관리
   - Table Data 관리

### Phase 3: 추가 기능 (낮은 우선순위)
5. **Library Management**
   - Sections 관리

6. **Centers/Clinics Detail Management**
   - Clinic 상세 정보 관리

---

## 🎨 UI/UX 개선 제안

### 1. 탭 구조 개선
현재 Admin 페이지의 탭 구조:
```
- Site Settings
- Admissions Data
- Latest News
- Notice Board
- Faculty Profiles
- Curriculum
```

**추가할 탭:**
```
- Weekly Dicta (새로 추가 - 높은 우선순위)
- Home Content (새로 추가)
- Calendar (새로 추가)
- Careers (새로 추가)
- Library (새로 추가)
- Consumer Info (새로 추가)
- Centers (새로 추가)
```

### 2. 데이터 저장 방식
- 현재: 메모리 상태 관리
- 제안: localStorage 또는 백엔드 API 연동
- 백업/복원 기능

### 3. 권한 관리
- Admin 로그인 시스템
- 역할 기반 접근 제어 (RBAC)
- 변경 이력 추적

### 4. 미리보기 기능
- 변경사항 실시간 미리보기
- 페이지별 미리보기 모드

---

## 🔧 기술적 고려사항

### 1. 데이터 구조
- `types.ts`에 새로운 인터페이스 추가 필요
- `CalendarContent`, `CareersContent`, `LibraryContent`, `ConsumerInfoContent` 확장

### 2. 상태 관리
- App.tsx에서 모든 콘텐츠 상태 관리
- Admin 컴포넌트에 props로 전달

### 3. 이미지 관리
- 현재: Base64 인코딩 (로컬)
- 제안: 이미지 업로드 서비스 연동 (Cloudinary, AWS S3 등)

### 4. Rich Text Editor
- 현재: 기본 contentEditable
- 제안: 더 강력한 에디터 (TinyMCE, Quill 등)

---

## 📝 구현 체크리스트

### Phase 1 체크리스트
- [ ] Weekly Dicta 탭 추가
  - [ ] Weekly Dicta 아이템 CRUD
  - [ ] Rich Text Editor
  - [ ] Pin 기능
  - [ ] 이미지 첨부 (선택)
  
- [ ] Home Content 탭 추가
  - [ ] Vision & Mission 섹션 관리
  - [ ] Features 섹션 관리
  - [ ] Statistics 관리
  - [ ] Clinics 섹션 관리
  - [ ] Global Future 섹션 관리

### Phase 2 체크리스트
- [ ] Calendar 탭 추가
  - [ ] Cohort별 이벤트 관리
  - [ ] 이벤트 CRUD 기능
- [ ] Careers 탭 추가
  - [ ] Stats 관리
  - [ ] Services 관리
- [ ] Consumer Info 탭 추가
  - [ ] Sections 관리
  - [ ] Table Data 관리

### Phase 3 체크리스트
- [ ] Library 탭 추가
- [ ] Centers 탭 추가

---

## 💡 추가 기능 제안

1. **번역 관리**
   - 다국어 콘텐츠 관리
   - Gemini API를 통한 자동 번역

2. **SEO 관리**
   - 메타 태그 관리
   - Open Graph 이미지

3. **알림 시스템**
   - 변경사항 알림
   - 승인 워크플로우

4. **통계 대시보드**
   - 페이지 뷰 통계
   - 콘텐츠 조회수

---

## 🎯 다음 단계

1. **즉시 시작 가능한 작업:**
   - Home Content Management 구현
   - Calendar Management 기본 구조

2. **데이터 구조 설계:**
   - types.ts 확장
   - App.tsx 상태 관리 구조 개선

3. **UI 컴포넌트 개발:**
   - 재사용 가능한 관리 컴포넌트
   - 폼 검증 로직

이 계획서를 바탕으로 단계적으로 구현을 진행하시면 됩니다!

