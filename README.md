# Next.js, GraphQL, Nexus, Prisma를 활용한 Sample To-Do Application

Next.js / Typescript / GraphQL / Nexus / Prisma / PostgreSQL을 이용한 full-stack To-Do Application 입니다.
위 기술스택에 대한 연습용으로 사용하시면 됩니다.

## Getting Started

1. 의존 패키지 설치:

```bash
yarn install
```

2. PostgreSQL DB 기동

```bash
docker compose up -d
```

3. DB Push

DB에 prisma 코드로 정의 된 DB Schema 반영

```bash
npx prisma db push
```

4. DB Seeding

DB 샘플 데이터 주입

```bash
npx prisma db seed
```

5. GraphQL schema, resolver, type generate

Nexus로 정의 된 코드를 이용하여 GraphQL 스키마, 리졸버, 타입을 자동 생성

```bash
yarn generate
```

6. 서버 기동

```bash
yarn generate
```
