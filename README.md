# 💅 NailVibe

**NailVibe** é uma aplicação web progressiva (PWA) inteligente, moderna e responsiva projetada para o gerenciamento de coleções de esmaltes e artes de unhas (Nail Art). Ideal para colecionadores, manicures ou qualquer pessoa apaixonada por manter suas cores organizadas.

## ✨ Recursos Principais

### 📦 Catálogo (A Gaveta Virtual)
- Adicione esmaltes detalhando a marca, cor, acabamento e família da cor.
- **Color Picker Inteligente:** Escolha visualmente o tom hexadecimal puro do esmalte para preencher dinamicamente os cards na falta de uma foto do vidro fisíco.
- Adicione fotos reais da embalagem/vidro pela câmera ou galeria.
- Previsão de Vencimento e alertas de quantidade volumétrica restante.
- Busca unificada e filtros avançados (por acabamento ou família de cor).

### 📸 Inspirações (Diário de Esmaltação)
- Monte seu *book* fotográfico! Registre todas as vezes que pintar as unhas.
- Tire uma foto das unhas prontas, descreva as técnicas ou adesivos usados, e marque **quais esmaltes exatos** da sua coleção foram combinados naquela unha.
- Acompanhamento automático da contagem de usos por esmalte.

### 📊 Dashboard Analítico (Estatísticas)
- **Top 3 do Ano:** Descubra visualmente (via gráficos Chart.js) quais tons você mais usou na temporada atual.
- **Relógio Guardião:** Acompanhe há quantos dias exatos suas unhas estão sem pintura.
- **Domínio das Marcas:** Um gráfico de pizza revelando quais empresas dominam o seu acervo pessoal.
- **Rastreador de Encalhados:** Veja quais esmaltes estão descansando no fundo da gaveta há meses sem jamais terem sido usados.

### 💖 Lista de Desejos (Wishlist)
- Controle suas metas de compras futuras e converta os desejos em esmaltes adquiridos no catálogo com um simples toque de botão.

### 🔒 Nuvem & Sistema Multi-Usuário
- Backend estruturado com **Supabase** garantindo que as tabelas de Catálogo, Inspirações e Desejos fiquem permanentemente seguras na nuvem.
- Tela de Autenticação para Múltiplas Contas. Faça login com Username ou Email. Com isso, os esmaltes que aparecem na tela pertencem restritamente a quem fez o login!

### 📱 Experiência de Aplicativo Nativo (PWA)
- Suporte total a Instalação via **Progressive Web App**. Adicione o NailVibe à tela inicial do Android/iOS e ele abrirá em tela cheia (Full Screen), operando como um App real sem a necessidade de lojas de aplicativos padrão, mantendo cachê local ultra-rápido via Service Workers (VitePWA).

---

## 💻 Stack de Tecnologias

- **Vue.js 3** (Framework Base)
- **Vite** (Build Tool super rápida e otimizada)
- **Vuetify 3** (Design System & UI Components Premium)
- **Vuex 4** (Gerenciamento de Estado Centralizado)
- **Vue Router 4** (Navegação dinâmica e Guardas de Rota/Proteção)
- **Supabase** (Banco de Dados em Nuvem & Autenticação Segura)
- **Chart.js & Vue-ChartJS** (Visualização e Renderização Dinâmica de Dados)

## 🚀 Como Executar Localmente

Se você quiser baixar e rodar este projeto na sua própria máquina de desenvolvimento:

1. Clone o repositório ou baixe o código.
2. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
3. No terminal (na pasta raiz), instale os pacotes:
   ```bash
   yarn install
   # ou
   npm install
   ```
4. Crie um arquivo `.env` na raiz informando as credenciais de leitura do seu Supabase (`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`).
5. Execute o ambiente de desenvolvimento:
   ```bash
   yarn dev
   # ou
   npm run dev
   ```
6. Acesse a URL que aparecerá no terminal, geralmente em `http://localhost:8080`.
