# Simulador de Crédito Hack

Projeto Angular para simulação de crédito, cadastro e listagem de produtos, com autenticação e proteção de rotas.

## Funcionalidades

- **Simulador de Crédito:** Simule parcelas, juros e amortização.
- **Cadastro de Produtos:** Adicione e edite produtos (apenas administradores).
- **Listagem de Produtos:** Visualize produtos cadastrados.
- **Listagem de Atividades:** Acompanhe atividades do sistema.
- **Autenticação:** Login e proteção de rotas por perfil (admin/usuário).
- **Guards:** Controle de acesso com `authGuard` e `adminGuard`.
- **Material Design:** Interface moderna com Angular Material.

## Estrutura de Pastas

```
src/app/
  componentes/         # Componentes compartilhados (login, lista-atividades)
  features/
    simulador/         # Simulador e resultado da simulação
    produto/           # Cadastro e listagem de produtos
  guards/              # Proteção de rotas
  service/             # Serviços de dados e autenticação
  types/               # Tipos e interfaces
```

## Instalação

```sh
git clone https://github.com/seu-usuario/simulador-credito-hack.git
cd simulador-credito-hack
npm install
```

## Executando

```sh
ng serve
```
Acesse [http://localhost:4200](http://localhost:4200).

## Executando o Backend Fake (json-server)

1. Instale o json-server (se necessário):
    ```sh
    npm install -g json-server
    ```
2. Crie um arquivo `db.json` na raiz do projeto com seus dados iniciais.
3. Execute:
    ```sh
    npm start
    ```
4. O Angular irá consumir a API em `http://localhost:3000`.

## Tecnologias

- Angular
- Angular Material
- TypeScript

## Login

O usuário e senha estão mockados.

Para admin:
```sh
usuário: admin
senha: 123
```
Para cliente:
```sh
usuário: cliente
senha: 123
```
