# Conversa

Painel pessoal para automatizar comentários, mensagens e links do Instagram.

## Stack

- Next.js com App Router e TypeScript
- CSS próprio, fonte Inter e interface sem gradientes
- Armazenamento em JSON com cache em memória e escrita atômica
- Integração preparada para webhooks e Instagram Graph API

## Desenvolvimento

1. Instale Node.js 20+ e pnpm.
2. Copie `.env.example` para `.env.local`.
3. Defina `APP_ACCESS_KEY` com uma chave longa.
4. Instale as dependências com `pnpm install`.
5. Rode `pnpm dev` e abra `http://localhost:3000`.

O app cria e mantém os dados em `data/db.json`. Esse arquivo é local e não deve ser versionado quando contiver tokens ou dados reais.

Quando `APP_ACCESS_KEY` está definida, as rotas do dashboard e as APIs internas exigem login em `/login`. O webhook e o health check permanecem públicos para atender a integração da Meta.

As rotas operacionais protegidas usam a sessão do painel ou `OPS_ACCESS_KEY`: diagnóstico em `/api/ops/diagnostics`, fila em `/api/ops/queue`, backup em `/api/ops/backup` e solicitações internas de exclusão em `/api/ops/deletion`. O callback público de exclusão de dados da Meta é `/api/data-deletion`.

## Integração Meta

O modo de demonstração funciona sem credenciais e registra os eventos localmente. Para ativar a integração real, configure o app no Meta for Developers, informe as variáveis `META_*` e `INSTAGRAM_*`, publique a URL HTTPS do webhook e conclua as permissões solicitadas pela Meta.

No Meta for Developers, use `https://seu-dominio/api/webhook/instagram` como callback do webhook e `https://seu-dominio/api/data-deletion` como Data Deletion Request Callback URL. Para o fluxo Instagram Login, o token e `INSTAGRAM_APP_SECRET` precisam pertencer ao mesmo Instagram App. O callback de exclusão valida o `signed_request` com `META_APP_SECRET`, registra a solicitação e devolve o código de confirmação e a URL de consulta.

## Operação do JSON

A store mantém os dados mais usados em memória e serializa as alterações em fila, evitando uma leitura do arquivo para cada evento. Cada gravação passa por arquivo temporário e troca atômica. Para o volume pessoal previsto de 3 a 5 mil DMs por mês, isso reduz custo de I/O; recomenda-se manter retenção de eventos e fazer cópia de segurança periódica do diretório `data`.

Os envios da Meta também passam por uma fila separada em `data/operation-queue.json`, com idempotência por evento, limite local configurável, tentativas e backoff. O limite padrão é 30 envios por minuto e pode ser ajustado para o comportamento aprovado pela Meta.
