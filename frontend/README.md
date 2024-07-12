# CODEBLOG - FRONTEND

## PARA INICIAR A APLICAÇÃO:

* Clone o repositório **git clone https://github.com/davibcavalcante/codeblog.git**
* Para executar o frontend da aplicação, abra o terminal e digite **cd frontend**
* Antes de executar instale os pacotes com **npm install**
* Feito isso, inicie o frontend com **npm run dev**

## ROTAS DESENVOLVIDAS ATÉ - **03/07**

* /login
* /register
* /profile
    * /
    * /posts

## REQUISIÇÕES DESENVOLVIDAS ATÉ **12/07**
* /auth/register => body: 
    ```
    {
        name: typeof STRING,
        username: typeof STRING,
        email: typeof STRING,
        password: typeof STRING,
        bio: typeof STRING,
        office: typeof STRING,
        photo_url: '' (Enviar vazio até configurações posteriores),
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