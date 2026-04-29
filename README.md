# Customer Admin

Aplicação administrativa de gestão de clientes desenvolvida como desafio técnico nível pleno.

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

- Listagem de clientes com paginação, ordenação e busca global
- Filtro por status (ativo, inativo, bloqueado)
- Skeleton loading e empty state
- Cadastro e edição de clientes com validação completa
- Exclusão com confirmação via dialog
- Busca de endereço por CEP (ViaCEP)
- Máscaras para CPF, CNPJ, telefone e CEP
- Toasts de feedback em todas as operações
- Layout administrativo responsivo com sidebar

## Melhorias futuras

- Autenticação e controle de sessão
- Paginação server-side
- Exportação para CSV/Excel
- Histórico de alterações por cliente
- Testes unitários e E2E
