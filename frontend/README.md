# CODEBLOG - FRONTEND

## PARA INICIAR A APLICAÇÃO:

* Clone o repositório **git clone https://github.com/davibcavalcante/codeblog.git**
* Para executar o frontend da aplicação, abra o terminal e digite **cd frontend**
* Antes de executar instale os pacotes com **npm install**
* Feito isso, inicie o frontend com **npm run dev**

## ROTAS DESENVOLVIDAS ATÉ - **18/07**

* / => Home => Formulário de envio de posts
* /login => Formulário de Login
* /register => Formulário de Registro
* /profile
    * / => Resumo do perfil do usuário
    * /posts => Todas as publicações do usuário

## REQUISIÇÕES DESENVOLVIDAS ATÉ **18/07**
* /auth/register => body: 
    ```
    {
        name: typeof STRING,
        username: typeof STRING,
        email: typeof STRING,
        password: typeof STRING,
        bio: typeof STRING,
        office: typeof STRING,
        photo_url: '' => (Enviar vazio),
        skills: typeof ARRAY DE STRINGS,
        likes: typeof ARRAY DE STRINGS
    }
    ```
* /auth/login => body:
    ```
    {
        email: typeof STRING,
        password: typeof STRING
    }
    ```
* /api/posts/userId => body typeof form-data:
    ```
    {
        photoUrl: typeof ARRAY DE ARQUIVOS image/* (MAX: 4),
        post: JSON.stringfy({
            title: "Título de post",
            content: "Conteúdo do post"
        })
    }
    ```

* /api/posts/user/userId => GET => Todos os posts do usuário

* /api/profiles/userId => GET => Informações de perfil do usuário

* /api/profiles/userId/image => body typeof form-data:
    ```
    {
        photoUrl: typeof ARQUIVO image/*
    }
    ```