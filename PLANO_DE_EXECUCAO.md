# Plano de execução — Conversa

Este arquivo acompanha a ordem de implementação do produto. Cada fase precisa passar por validação técnica e visual antes da próxima começar.

## Fase 1 — Preview V2

- [x] Extrair o preview do celular em componente reutilizável.
- [x] Implementar abas clicáveis: Publicação, Comentários e DM.
- [x] Criar animações leves, sem gradientes e com redução de movimento.
- [x] Ligar a prévia aos campos do editor em tempo real.
- [x] Validar em navegador, TypeScript e build de produção.

Validação: abas e CTA conferidos no navegador; build passou em 22/09/2026. Edição agora consulta o JSON real, usando os parâmetros assíncronos do Next.

## Fase 2 — Quick Automation

- [x] Seleção de conteúdo: publicação específica, qualquer publicação ou próxima publicação.
- [x] Palavras-chave, resposta pública, DM inicial, CTA, link, e-mail, follow e lembrete.
- [x] Validação antes de ativar e histórico de versão.
- [x] Persistência no esquema JSON.

Validação: typecheck, build de produção e 47 testes de contrato/repositório passaram em 22/09/2026. O editor foi conferido no navegador com template, mídia demonstrativa, as três abas do preview, animação da DM e salvamento de rascunho. A ativação continua bloqueando gatilho de novo seguidor, automações sem link ativo e configurações incompletas.

## Fase 3 — Flow Builder

- [x] Modelo de fluxo serializável em JSON.
- [x] Canvas com nós, conexões, condições, espera e ações.
- [x] Simulador de caminho e validação de nós desconectados.

Validação: 51 testes passaram, build de produção passou e o canvas foi conferido no navegador com adição de nó, simulação, salvamento e reabertura do registro persistido em `data/flows.json` em 22/09/2026. O editor usa rascunho por padrão; ativação exige um gatilho, caminho conectado, ausência de ciclos e uma etapa executável.

## Fase 4 — Inbox e contatos

- [x] Atendimento manual, tags, notas, respostas rápidas e handoff.
- [x] Histórico completo do contato e pausa por conversa.

Validação: typecheck, build de produção e 55 testes passaram em 22/09/2026. No navegador, o Inbox carregou duas conversas, enviou uma mensagem manual em modo mock com retorno de sucesso e pausou a automação da conversa selecionada. As rotas usam idempotência local e persistem as alterações no JSON.

## Fase 5 — Links e analytics

- [x] Catálogo de links, UTMs e redirecionamento rastreável.
- [x] Painel de métricas e funil por automação.

Validação: typecheck, build de produção e 59 testes passaram em 22/09/2026. O catálogo foi conferido no navegador com métricas, dois links reais do JSON e URLs `/r/[slug]`; o redirecionamento local respondeu 302 para o destino configurado e registrou o clique.

## Fase 6 — Operação Meta

- [x] Fila de envio, idempotência, limite e retentativas.
- [x] Webhooks, diagnóstico de conexão, logs e controles globais.
- [x] Exclusão de dados, backup e preparação para publicação.

Validação: typecheck, build de produção e 63 testes passaram em 22/09/2026. A fila usa `data/operation-queue.json`, limite configurável, backoff e deduplicação. O webhook registra fingerprints, valida assinatura e encaminha envios pelo dispatcher. Configurações mostra diagnóstico, exportação de snapshot e solicitação autenticada de exclusão. O callback público `/api/data-deletion` foi testado com `signed_request` assinado e devolveu código e status.

## Fase 7 — Acabamento e lançamento

- [x] Landing page, privacidade e segurança revisadas.
- [x] Acessibilidade, responsividade, testes de carga e QA visual.

Validação: landing, privacidade, segurança e Configurações foram conferidas no navegador; endpoints públicos responderam 200; backup e solicitação de exclusão foram exercitados no localhost. Um teste sintético enfileirou 500 operações em 1,55s usando arquivo temporário. O projeto usa Inter, não possui gradientes, mantém estados de foco, labels acessíveis, `prefers-reduced-motion` e breakpoints para telas menores. Typecheck, build de produção e 63 testes passaram em 22/09/2026.
