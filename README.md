# Customer Admin

Aplicação administrativa de gestão de clientes desenvolvida como desafio técnico nível pleno.

## Acesso

- **E-mail:** admin@email.com
- **Senha:** admin123

## Stack

- Vue 3 + TypeScript + Composition API
- PrimeVue (UI components)
- TailwindCSS (layout e responsividade)
- VeeValidate + Yup (validação de formulários)
- Pinia (estado global)
- Vue Router (navegação)

## Instalação

```bash
npm install
```

## Rodando localmente

```bash
npm run dev
```

## Funcionalidades

- Autenticação com controle de sessão
- Listagem de clientes com paginação, ordenação e busca global
- Filtro por status (ativo, inativo, bloqueado)
- Skeleton loading e empty state
- Cadastro e edição de clientes com validação completa (CPF, CNPJ, telefone, CEP)
- Exclusão com confirmação via dialog
- Busca de endereço por CEP (ViaCEP)
- Máscaras para CPF, CNPJ, telefone e CEP
- Persistência de dados via localStorage
- Toasts de feedback em todas as operações
- Dark mode
- Layout administrativo responsivo com sidebar

## Melhorias futuras

- Paginação server-side
- Exportação para CSV/Excel
- Histórico de alterações por cliente
- Testes unitários e E2E
