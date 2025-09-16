# Organo

Aplicação de gerenciamento do time de suporte, incluindo cargos, horários e escalas.
Desenvolvida com foco em resolver um problema real do time onde trabalho na Anota Ai, priorizando simplicidade e usabilidade.

O **primeiro usuário** registrado na plataforma é automaticamente **Admin**, podendo configurar cargos, squads, supervisores, horários e gerenciar permissões de outros usuários.

🔗 **Deploy**: [organo-two-henna.vercel.app](https://organo-two-henna.vercel.app/)

---

## 🚀 Tecnologias

- **Frontend:** React + Tailwind CSS  
- **Backend:** Node.js + Express  
- **Banco de dados:** MongoDB  
- **Autenticação:** Google OAuth  
- **Hospedagem:** Vercel

---

## ⚙️ Funcionalidades

- 👤 **Gestão de usuários**
  - Cadastro com Google
  - Dashboard com informações (Slack, e-mail, telefone, horário, supervisor etc)

- 🛠️ **Admin**
  - Primeiro usuário = Admin
  - Cadastro de cargos, horários, squads e supervisores
  - Liberação de acesso de Admin para outros usuários

- 📅 **Escala**
  - Cadastro/edição de escalas via **JSON**
  - Estrutura: `{ date, users: [userId, userId, ...] }`
    - Se o `id` está presente → trabalhando  
    - Se o `id` não está presente → folga  
  - Alteração manual da escala pelo dashboard
  - Possibilidade de excluir a escala e subir uma nova escala.

---

## 📦 Instalação local

### Frontend
```bash
# Clonar repositório
git clone https://github.com/leonDenizard/organo.git
cd organo

# Instalar dependências
npm install

# Rodar ambiente local
npm run dev
```

### Backend
```bash
# Entrar na pasta do servidor (separada do front)

# Clonar repositório
git clone https://github.com/leonDenizard/organo-server
cd organo-server

# Instalar dependências
npm install

# Rodar ambiente local
npm run dev
```
## 🔑 Variáveis de ambiente

Frontend (.env)
```bash
VITE_API_URL=http://localhost:3000/api
```

Backend (.env)
```
PORT=3000
MONGO_URI=seu_mongo_uri_aqui
REACT_APP_API_URL=http://localhost:3000/api
```
