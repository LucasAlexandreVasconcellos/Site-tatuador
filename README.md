# Site-tatuador · Edy Alves Tattoo

Plataforma oficial do estúdio **Edy Alves Tattoo** (Ceilândia, Brasília - DF). Desenvolvido com **Next.js 16**, **React 19**, **Tailwind CSS 4** e **Turbopack**.

---

## 🎨 Funcionalidades

- **Design Dark & Atmosférico**: Inspirado no universo da tatuagem, com tipografia de alto impacto (*Oswald*, *Inter*, *Cinzel*), estética refinada e paleta escura com acentos em vermelho vibrante.
- **Hero & Prova Visual**: Layout com emblema do estúdio, badges de confiança (desde 2018, materiais 100% descartáveis e hora marcada) e galeria sobreposta de fotos reais.
- **Catálogo de Serviços**: Black Work, Preto e Cinza (Black & Grey), Projetos Autorais / Cover-up e Retoque/Manutenção.
- **Portfólio Interativo**: Filtros por estilo e região do corpo, com visualizador em Lightbox fullscreen e navegação por teclado.
- **Sistema de Agendamento Online (`/agendar`)**:
  - Assistente em 5 etapas (`BookingStepper`).
  - Escolha de estilo, tamanho, região anatômica e upload de imagens de referência.
  - Seleção de data e horário em tempo real com prevenção de conflitos.
  - Dados do cliente com validação de maioridade e consentimento LGPD.
  - Pagamento de sinal via PIX Copia e Cola e confirmação rápida pelo WhatsApp.
- **Painel Administrativo Privativo (`/admin`)**:
  - Proteção por senha com cookies HTTP-only de sessão segura.
  - Gestão de agendamentos (Pendente, Confirmado, Concluído, Cancelado).
  - Bloqueio de datas e configuração de horários de funcionamento.
  - Anotações internas e link direto para WhatsApp do cliente.
- **Páginas Institucionais & Conformidade**:
  - `/politica-de-privacidade` (LGPD).
  - `/termos-de-agendamento` (Regras de cancelamento, 48h de antecedência e saúde).
- **SEO & Performance**:
  - `sitemap.ts`, `robots.ts`, Open Graph, Twitter Cards e dados estruturados Schema.org (`LocalBusiness` / `TattooParlor`).

---

## 🚀 Como Executar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/LucasAlexandreVasconcellos/Site-tatuador.git
cd Site-tatuador
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## ⚙️ Variáveis de Ambiente (Opcional)

Crie um arquivo `.env.local` na raiz para configurar:
```env
# Senha de acesso ao painel admin /admin (padrão: edyalves2018)
ADMIN_PASSWORD=sua_senha_segura

# URL pública do site para metatags canônicas
NEXT_PUBLIC_SITE_URL=https://edyalvestattoo.com.br

# Google Analytics 4 (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 📦 Build e Produção

Para validar a compilação:
```bash
npm run build
npm run start
```
