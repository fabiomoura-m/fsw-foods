# FSW Foods

Um sistema completo de delivery para restaurantes (estilo iFood) com tela de restaurantes, gerenciamento de pedidos, restaurantes favoritos, carrinho de compras, autenticação com o Google (OAuth).

Este projeto foi feito durante a 4ª edição da Full Stack Week, um evento organizado pelo Felipe Rocha (@dicasparadevs). Você pode encontrar mais informações sobre o evento no [YouTube](https://www.youtube.com/@dicasparadevs).

No evento foi realizado a versão mobile do projeto. Desenvolvi a versão desktop de acordo com o figma proposto, e adicionei o login com o Github.

<img src="https://i.imgur.com/YhUgPtM.png" width="1920"/>

## 🗒️ Diagrama ERD

<img src="https://i.imgur.com/btI7FA5.png" width="1920"/>


## 💡 Tecnologias:

- `Typescript`
- `React`
- `Next - 14`
- `PostgresSQL`
- `Prisma`
- `Tailwind CSS`

## ⚙️ Como rodar o Projeto Localmente:

-Clone o repositório

```
$ git clone https://github.com/fabiomoura-m/fsw-foods.git
```

-Para instalar todas as bibliotecas usadas no projeto rode o comando:

```
npm install
```

-Crie e configure as variáveis de ambiente no arquivo .env

```
DATABASE_URL=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""
NEXTAUTH_SECRET=""
```

-Para inicializar o prisma: (Após conectar com o Banco)

```
npx prisma db push
```

-Rodar arquivo seed:

```
npx prisma db seed
```

-Para rodar o app:

```
npm run dev
```

## 🔗 Link do Projeto:

[fsw-foods.app](https://fsw-foods-pi.vercel.app/)

