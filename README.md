# Popup Notes Studio

Aplicação web minimalista para apoiar a operação de popups físicos com QR Codes e numeração impressa. O protótipo permite gerar notas digitais vinculadas a cada marcador, visualizar um QR Code correspondente e decidir se a anotação ficará pública ou privada.

## Funcionalidades
- Catálogo estático de popups com numeração e localização sugerida.
- Formulário interativo para registrar notas vinculadas a um popup específico.
- Geração de QR Code baseada nos dados da nota, ideal para colar junto ao marcador físico.
- Visual preview com badges que indicam o status de compartilhamento.
- Layout responsivo, leve e sem distrações.

## Tecnologias
- [Next.js 14](https://nextjs.org/) com App Router.
- [React 18](https://react.dev/) e TypeScript.
- [react-qr-code](https://www.npmjs.com/package/react-qr-code) para renderização do QR Code.
- Estilização em CSS puro com enfoque minimalista.
- Docker para desenvolvimento e execução isolados.

## Estrutura de pastas
```
app/
  layout.tsx        # Layout raiz e metadados
  page.tsx          # Página principal com hero, formulário e lista de popups
  globals.css       # Estilos globais
components/
  NoteForm.tsx      # Formulário cliente com geração de QR Code
  PopupList.tsx     # Cartões listando popups disponíveis
data/
  popups.ts         # Conteúdo estático dos popups
public/
  (ativos públicos, como imagens e ícones)
```

## Pré-requisitos
- Node.js 18+
- npm 9+ (ou outro gerenciador compatível)
- Docker 24+ (para utilizar os contêineres fornecidos)

## Instalação
```bash
npm install
```

## Executando em desenvolvimento
```bash
npm run dev
```

O aplicativo ficará disponível em `http://localhost:3000`.

## Build de produção
```bash
npm run build
npm start
```

## Executando com Docker
1. Construa a imagem:
   ```bash
   docker build -t popup-notes-app .
   ```
2. Suba o contêiner mapeando a porta padrão do Next.js:
   ```bash
   docker run --rm -p 3000:3000 popup-notes-app
   ```

Também é possível usar o `docker-compose.yml`:
```bash
docker compose up --build
```

## Variáveis de ambiente
Este protótipo não depende de variáveis de ambiente obrigatórias. Caso deseje customizar, utilize as convenções do Next.js (`.env.local`).

## Testes e lint
A verificação de lint pode ser executada com:
```bash
npm run lint
```

## Próximos passos sugeridos
- Persistir as notas em uma API ou banco de dados real.
- Gerar URLs amigáveis que possam ser escaneadas diretamente do QR Code.
- Criar área administrativa para cadastrar novos popups e acompanhar interações.

## Licença
Distribuído sob a licença MIT.
