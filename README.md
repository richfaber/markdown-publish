# MarkDown publish tool

## 소개

마크다운(md) 파일을 로컬에서 편집하고, 블로그에 포스팅 하는 도구. 

## 시작 하기

파일 복제 하기

```command
> git clone https://github.com/richfaber/markdown-puslish.git
```

개발 의존성 모듈 설치하기

```command
> npm install
```

프로그램 구동

```command
> npm run start
```

## 설명서

현재는 Viewer 만 구현되어 있습니다.  
`/document/` 에 파일을 복사하고, `http://localhost:3000/sample` 이라고 하면, 볼 수 있습니다.

## 주요 기능 (로드맵)

- 편집
- 미리보기
- 블로그 포스팅
- 이미지 클라우드 업로더 google photo / 

## 버그 and 기능개선


## 의존성 모듈

- [showdown](https://github.com/showdownjs/showdown)
- [nunjucks](https://mozilla.github.io/nunjucks/)
- [jQuery](https://code.jquery.com/)
