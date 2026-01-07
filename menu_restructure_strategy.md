# 메뉴 구조 재구성 전략

## 목표
제공된 메뉴 구조와 정확히 일치하도록 변경

## 주요 변경사항

### 1. About PAUSL 섹션
**현재**: 3개 컬럼으로 그룹화 (Our Identity, Governance & Compliance, Our People, Resources)
**변경**: 단순 리스트로 변경, 제공된 순서대로

**순서**:
1. History and Mission
2. California State Bar Registration
3. Disclosure Statement
4. President's Welcome
5. Message from the Dean
6. Administration Staffs
7. Faculty
8. Catalog
9. School Form
10. FAQs

**변경 작업**:
- `Navbar.tsx`의 About 드롭다운을 단일 컬럼 리스트로 변경
- 그룹화 헤더 제거
- 순서 재배치

### 2. Academics 섹션
**현재**: "Bar Info"
**변경**: "The California State Bar"

**변경 작업**:
- `types.ts`의 `barInfo` 라벨을 "The California State Bar"로 변경
- 또는 `shared.nav.barInfo` 대신 직접 텍스트 사용

### 3. My PAUSL 섹션
**현재**: 4개 카테고리로 그룹화 (Student Life, Records, Legal Tools, Marketplace)
**변경**: 단순 리스트로 변경, 제공된 순서대로

**순서**:
1. Weekly Dicta
2. Populi
3. Westlaw
4. CALI
5. ExamSoft
6. Transcripts
7. Finance Office
8. Course Enrollment
9. Student Store (PAUSL Gear)

**변경 작업**:
- `Navbar.tsx`의 My PAUSL 드롭다운을 단일 컬럼 리스트로 변경
- 그룹화 헤더 제거
- 순서 재배치

### 4. Contact 섹션
**현재**: "Contact Info"
**변경**: "Contact Information"

**변경 작업**:
- `types.ts`의 `contactInfo` 라벨을 "Contact Information"으로 변경

## 구현 단계

### Phase 1: 라벨 업데이트
1. `types.ts`에서 라벨 변경
   - `barInfo: "The California State Bar"`
   - `contactInfo: "Contact Information"`

### Phase 2: About PAUSL 재구성
1. `Navbar.tsx`의 About 드롭다운 수정
   - 그리드 레이아웃 제거
   - 단일 컬럼 리스트로 변경
   - 순서 재배치

### Phase 3: My PAUSL 재구성
1. `Navbar.tsx`의 My PAUSL 드롭다운 수정
   - 그리드 레이아웃 제거
   - 단일 컬럼 리스트로 변경
   - 순서 재배치

### Phase 4: 모바일 메뉴 동기화
1. 모바일 메뉴도 동일한 순서로 변경

## 주의사항
- 드롭다운 너비 조정 필요 (단일 컬럼이므로 더 좁게 가능)
- 모바일 메뉴도 동일하게 변경
- 모든 external 링크는 유지

## 예상 결과
- About PAUSL: 10개 항목 단일 리스트
- Academics: 6개 항목 (라벨 변경)
- Admissions: 5개 항목 (변경 없음)
- Tuition: 3개 항목 (변경 없음)
- My PAUSL: 9개 항목 단일 리스트
- Contact: 3개 항목 (라벨 변경)







