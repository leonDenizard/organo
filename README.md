# 🧭 Organo

**Organo** é uma aplicação web desenvolvida para **gerenciar times internos e escalas de trabalho**, permitindo que administradores configurem cargos, squads, supervisores, horários e status de escala, enquanto os usuários podem registrar seus dados e visualizar informações da equipe de forma dinâmica.

---

## 🚀 Tecnologias utilizadas

**Frontend:** React + Tailwind CSS
**Backend:** Node.js + Express
**Banco de dados:** MongoDB
**Autenticação:** Google OAuth
**Hospedagem:** Vercel

---

## 🎯 Objetivo

Facilitar a gestão de equipes e escalas de trabalho internas, oferecendo uma interface intuitiva e completa tanto para administradores quanto para colaboradores.

---

## ⚙️ Funcionalidades principais

### 👑 Administração

* O **primeiro usuário logado** se torna automaticamente **admin**.
* Criação e gerenciamento de:

  * Cargos
  * Squads
  * Supervisores
  * Horários de turno
  * Status personalizados de escala (com cor e legenda)
  * Liberação de novos administradores

### 🧍 Registro de usuário

* Após login via Google, o usuário acessa a página **Register**, onde:

  * Nome e foto são importados do Google (ambos editáveis)
  * Pode adicionar/editar WhatsApp, Slack, apelido e data de aniversário
  * Upload de nova foto com **conversão em Blob e redimensionamento automático**
  * Seleção de horário de expediente, cargo, gestor, horário de intervalo e se possui filhos

### 🗂️ Dashboard

* Exibição em cards de todos os usuários cadastrados
* Filtros e busca dinâmica:

  * Ordenação A-Z
  * Filtro por cargo, horário, gestor ou squad
* Acesso restrito à **parametrização** (somente para admins)
* Navegação direta para a **escala de trabalho**

### 📅 Escalas de trabalho

* Criação e gerenciamento de escalas mensais (mês atual e próximos)
* Diferentes modos de visualização:

  * 5, 6 ou 7 colunas
  * Escala horizontal (1 a 31 em grid)
  * Escala compacta (sem exibir horários/status)
* Edição rápida de status e horários:

  * Clique direto no dia da escala
  * Seleção múltipla via calendário auxiliar
* Filtro de usuários e remoção de colaboradores da escala

### 🧠 Recursos técnicos

* Uso da **Context API** para gerenciamento global de estado
* Hooks principais:

  * `useMemo`, `useRef`, `useState`, `useEffect`
* Arquitetura modular com separação de responsabilidades

---

## 🧩 Estrutura de pastas

```
organo/
├── public/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── context/        # Contextos globais da aplicação
│   ├── functions/      # Funções utilitárias
│   ├── hooks/          # Hooks personalizados
│   ├── mockup/         # Dados e simulações
│   ├── pages/          # Páginas principais (Register, Dashboard, Escala, etc.)
│   └── services/       # Comunicação com a API
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .env.production
├── package.json
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

---

## 🧰 Configuração e execução local

### 1. Clone o repositório frontend

```bash
git clone https://github.com/leonDenizard/organo.git
cd organo
```

### 2. Clone o backend

> O backend é necessário para o funcionamento do projeto

```bash
git clone https://github.com/leonDenizard/organo-server.git
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Crie o arquivo `.env`

Exemplo de configuração local:

```env
# Ambiente de desenvolvimento (local)
VITE_API_URL=http://localhost:3000/api
```

### 5. Execute o projeto

```bash
npm run dev
```

A aplicação estará disponível em:
👉 [http://localhost:5173](http://localhost:5173)

---

## 🌐 Deploy

A versão em produção está hospedada na **Vercel**:
🔗 [https://organo-two-henna.vercel.app/](https://organo-two-henna.vercel.app/)

---

## 📚 Observações

* Projeto desenvolvido com foco em aprendizado e estudo de arquitetura front-end + back-end integrado.
* Código aberto para consulta e aprimoramento.

---

## 🧾 Licença

Este é um **projeto de estudo** e não possui uma licença comercial.

---

## 💡 Ideias futuras

* Área de relatórios e métricas de desempenho por usuário
* Envio de lembrete para o WhatsApp cadastrado atualizações da escala como horário caso seja plantão ou trocas de escala
* Integração com notificações via Slack
* Dashboard  de produtividade
* Troca de escala com polling ou messageria

---

✨ Desenvolvido com React, Tailwind e uma boa dose de curiosidade.