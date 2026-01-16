# 외부 이미지 파일 저장 가이드

이 문서는 현재 외부 링크로 연결된 이미지들을 로컬 파일로 전환하기 위한 가이드입니다.

## 저장 위치

모든 이미지는 `public/images/` 디렉토리에 저장합니다.

---

## 1. InfoSection 카드 이미지 (6개) ✅ 완료

| 번호 | 원본 URL | 제안 파일명 | 저장 위치 | 사용 위치 | 용도 | 상태 |
|------|----------|------------|----------|----------|------|------|
| 1 | `https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop` | `info-international-business.jpg` | `public/images/` | `components/InfoSection.tsx` (131줄) | International Business 카드 이미지 | ✅ 완료 |
| 2 | `https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop` | `info-corporate-governance.jpg` | `public/images/` | `components/InfoSection.tsx` (142줄) | Corporate Governance 카드 이미지 | ✅ 완료 |
| 3 | `https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop` | `info-legal-consulting.jpg` | `public/images/` | `components/InfoSection.tsx` (153줄) | Legal Consulting 카드 이미지 | ✅ 완료 |
| 4 | `https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop` | `info-cross-border-trade.jpg` | `public/images/` | `components/InfoSection.tsx` (164줄) | Cross-border Trade 카드 이미지 | ✅ 완료 |
| 5 | `https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop` | `info-regulatory-affairs.jpg` | `public/images/` | `components/InfoSection.tsx` (175줄) | Regulatory Affairs 카드 이미지 | ✅ 완료 |
| 6 | `https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop` | `info-graduate-study.jpg` | `public/images/` | `components/InfoSection.tsx` (186줄) | Graduate Study 카드 이미지 | ✅ 완료 |

---

## 2. 기타 이미지 ✅ 완료

| 번호 | 원본 URL | 제안 파일명 | 저장 위치 | 사용 위치 | 용도 | 상태 |
|------|----------|------------|----------|----------|------|------|
| 7 | `https://images.unsplash.com/photo-1550751827-4bd374c3f58b` | `innovation-law.jpg` | `public/images/` | `types.ts` (432줄) | Innovation & Law 관련 이미지 | ✅ 완료 |

---

## 3. 배경 텍스처 패턴 (Transparent Textures) ✅ 완료

| 번호 | 원본 URL | 제안 파일명 | 저장 위치 | 사용 위치 | 용도 | 상태 |
|------|----------|------------|----------|----------|------|------|
| 8 | `https://www.transparenttextures.com/patterns/cubes.png` | `pattern-cubes.png` | `public/images/patterns/` | `App.tsx` (2357, 2468줄)<br>`components/InfoSection.tsx` (296줄) | 배경 텍스처 패턴 (cubes) - 3곳에서 사용 | ✅ 완료 |
| 9 | `https://www.transparenttextures.com/patterns/diamond-upholstery.png` | `pattern-diamond-upholstery.png` | `public/images/patterns/` | `components/Careers.tsx` (23줄) | 배경 텍스처 패턴 (diamond-upholstery) | ✅ 완료 |
| 10 | `https://www.transparenttextures.com/patterns/graphy.png` | `pattern-graphy.png` | `public/images/patterns/` | `components/CampusVisualizer.tsx` (204줄) | 배경 텍스처 패턴 (graphy) | ✅ 완료 |

**참고**: 패턴 파일들은 `public/images/patterns/` 디렉토리를 생성하여 저장합니다.

---

## 4. 확인 필요 (코드에는 있으나 실제로 사용되지 않거나 보이지 않음) ⚠️

다음 이미지들은 코드상으로는 사용되고 있지만, 실제로는 이미지가 보이지 않거나 필요하지 않을 수 있습니다. 확인 후 필요시에만 추가하세요.

| 번호 | 원본 URL | 제안 파일명 | 저장 위치 | 사용 위치 | 용도 | 상태 |
|------|----------|------------|----------|----------|------|------|
| - | `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80` | `admissions-hero-background.jpg` | `public/images/` | `components/Admissions.tsx` (53줄) | Admissions 페이지 헤더 배경 (학생들이 걷는 이미지) | ⚠️ 확인 필요 |
| - | `https://images.unsplash.com/photo-1507842217121-ad763adcd942?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80` | `library-hero-background.jpg` | `public/images/` | `components/Library.tsx` (45줄) | Library 페이지 헤더 배경 (도서관 선반 이미지) | ⚠️ 확인 필요 |
| - | `https://images.unsplash.com/photo-1544928147-79a2e746b531?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80` | `academics-bar-hero-background.jpg` | `public/images/` | `components/Academics.tsx` (780줄) | Academics > The California State Bar 페이지 배경 (법률 도서관 이미지) | ⚠️ 확인 필요 |
| - | `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80` | `student-resources-hero-background.jpg` | `public/images/` | `components/StudentResources.tsx` (36줄) | Student Resources 페이지 배경 패턴 (학생들이 걷는 이미지) | ⚠️ 확인 필요 |
| - | `https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80` | `home-news-background.jpg` | `public/images/` | `components/HomeNews.tsx` (96줄) | HomeNews 컴포넌트 배경 이미지 | ⚠️ 확인 필요 |

---

## 요약

### 완료된 이미지 개수
- **InfoSection 카드 이미지**: 6개 ✅
- **기타 이미지**: 1개 ✅
- **배경 텍스처 패턴**: 3개 ✅
- **합계 완료**: 10개 ✅

### 확인 필요한 이미지
- **페이지 헤더 배경 이미지**: 5개 ⚠️ (코드에는 있으나 실제로 보이지 않거나 필요하지 않을 수 있음)

### 현재 디렉토리 구조
```
public/
  images/
    info-international-business.jpg ✅
    info-corporate-governance.jpg ✅
    info-legal-consulting.jpg ✅
    info-cross-border-trade.jpg ✅
    info-regulatory-affairs.jpg ✅
    info-graduate-study.jpg ✅
    innovation-law.jpg ✅
    patterns/
      pattern-cubes.png ✅
      pattern-diamond-upholstery.png ✅
      pattern-graphy.png ✅
```

---

## 작업 순서

1. 위 표의 원본 URL에서 이미지를 다운로드합니다.
2. 제안된 파일명으로 저장합니다.
3. 지정된 저장 위치에 파일을 배치합니다.
4. 모든 파일이 준비되면 코드 수정 작업을 진행합니다.

---

## 주의사항

- 파일명은 소문자와 하이픈(`-`)만 사용합니다.
- 확장자는 원본 이미지 형식에 맞춰 저장합니다 (JPG, PNG 등).
- 패턴 파일들은 반드시 PNG 형식으로 저장합니다.
- 이미지 파일 크기가 클 경우, 웹 최적화를 고려하세요.
