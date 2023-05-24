# Diretrizes de contribuição

Obrigado pelo seu interesse em contribuir com o projeto Backend Builder! Agradecemos imensamente sua ajuda para tornar este projeto melhor!

Há muitas maneiras de contribuir, desde escrever tutoriais e artigos, melhorar a documentação, enviar relatórios de bugs e solicitações de recursos, ou escrever código que pode ser incorporado ao próprio projeto. Para garantir uma experiência de desenvolvimento tranquila e colaborativa, revise e siga as seguintes diretrizes de contribuição:

## Começando

- Familiarize-se com os objetivos, a documentação e a base de código do projeto. É recomendável que você leia o arquivo README e qualquer outra documentação relevante para entender o design, a arquitetura e as convenções existentes.
- Junte-se ao nosso [canal oficial do Discord](https://discord.gg/Pr4NgxMCd8) para se conectar com a comunidade, fazer perguntas e coordenar esforços.
- Explore as *[Issues]()* para encontrar tarefas nas quais você gostaria de trabalhar ou identificar áreas nas quais você pode contribuir. Se você encontrou um bug ou tem uma solicitação de recurso, [crie uma]()! Geralmente, é melhor obter uma confirmação do bug ou aprovação para o recurso dessa maneira antes de começar a codar.
- Se esta é a primeira vez que você contribui para projetos de código aberto, procure *Issues* com a tag '*good first issue*'. Considere também a leitura desta série de [guias](https://opensource.guide/pt/).

## Código de Conduta

- Valorizamos uma comunidade respeitosa e inclusiva. Siga nosso [Código de Conduta]() em todas as interações e discussões dentro do projeto.
- Seja gentil, atencioso e aberto a diversas perspectivas. Divergências podem surgir, mas esperamos que todos os participantes se envolvam em conversas construtivas e profissionais.

## Fazendo Contribuições

- Faça o *fork* no repositório do projeto para sua conta do GitHub.
- Crie uma nova *branch* com um nome que melhor descreva sua contribuição. Isso ajudará outras pessoas a entender o propósito de suas alterações.
- Faça *[atomic commits](https://www.aleksandrhovhannisyan.com/blog/atomic-git-commits/)* com mensagens claras e concisas. Cada *commit* deve representar uma unidade de trabalho única e completa.
- Certifique-se de que seu código esteja em conformidade com o estilo de código existente do projeto, incluindo recuo, convenções de nomenclatura de variáveis e outras diretrizes relevantes.
- Escreva testes abrangentes para cobrir toda a funcionalidade do seu código. Certifique-se de que os testes existentes sejam aprovados e adicione novos quando necessário.
- Atualize a documentação do projeto se suas alterações afetarem a API, interface do usuário ou qualquer outro aspecto relevante. A documentação deve ser clara, concisa e seguir o estilo estabelecido no projeto.

## Abrindo *Pull Requests* (PRs)

- Faça um *push* da sua *branch* e abra um PR apontando para o repositório principal do projeto.
- Forneça um título claro e descritivo resumindo o objetivo de suas alterações.
- Na descrição do PR, forneça contexto sobre o problema que você está abordando ou o recurso que está adicionando. Inclua todas as referências a *Issues* ou *Discussions* relevantes.
- Não se esqueça de [vincular o PR à Issue](https://docs.github.com/pt/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) correspondente, se estiver resolvendo uma.
- Seja receptivo ao *feedback* e interaja em tempo hábil com revisores ou outros colaboradores. Aborde quaisquer alterações solicitadas e busque esclarecimentos, se necessário.

## Convenções

### Nomes de *branchs*

Um nome de *branch* deve ser estruturado da seguinte forma:

tipo/referência-opcional/descrição

**Tipos:**

- `bugfix` é para correção de bugs
- `hotfix` é para alterar o código com uma solução temporária sem seguir o processo usual (geralmente devido a uma emergência)
- `feature` é para adicionar, refatorar ou remover um recurso
- `core` é para gerenciar o processo de build, dependências, CI *workflows* e outras ferramentas e bibliotecas auxiliares
- `tests` é para adicionar testes que faltam ou melhorar os existentes
- `docs` é para trabalhar na documentação
- `merge` é para resolver conflitos de *merge*
- `experimental` é para experimentar fora de uma *Issue*

**Referência:**

O tipo de branch pode ser seguido pela referência à Issue na qual você está trabalhando. Se não houver referência, basta adicionar 'no-ref'.

**Descrição:**

- use nomes descritivos que reflitam o propósito ou recurso da branch
- use letras minúsculas e hífens

A referência é seguida por uma descrição resumindo o objetivo desta branch específica e deve ser curta e em kebab-case.

**Exemplos:**

```
git checkout -b feature/issue-3/create-node-express-boilerplate
git checkout -b bugfix/issue-21/remove-duplicate-boilerplate
git checkout -b hotfix/no-ref/cli-not-working
git checkout -b experimental/cli-in-python
```

### Mensagens de *commit*

A especificação Conventional Commits é uma convenção simples para utilizar nas mensagens de *commit*. Ela fornece um conjunto fácil de regras para criar um histórico de *commit* explícito; o que torna mais fácil a criação de  ferramentas automatizadas, como geradores de changelog. Esta convenção se encaixa com o versionamento semântico ([SemVer](http://semver.org/)), descrevendo nas mensagens de commit os recursos, as correções e as grandes atualizações (*breaking changes*) feitas.

A mensagem de *commit* deve ser estruturada da seguinte forma:

tipo(escopo opcional): descrição

**Tipos:**

- Um *commit* do tipo `fix` corrige um bug na base de código (isso se correlaciona com PATCH em versionamento semântico)
- Um *commit* do tipo `feat` introduz um novo recurso para a base de código (isso se correlaciona com MINOR em versionamento semântico)
- Um *commit* que introduz uma BREAKING CHANGE deve ter um `!` após o tipo/escopo (correlacionado com MAJOR em versionamento semântico). Uma BREAKING CHANGE pode fazer parte de *commits* de qualquer tipo.

Tipos diferentes de `fix` e `feat` não têm efeito implícito no controle de versão (a menos que incluam uma BREAKING CHANGE), mas ainda são muito importantes e podem ser um dos seguintes:

- `perf` é para uma mudança de código que melhora o desempenho
- `refactor` é para melhorias na estrutura, legibilidade ou manutenção do código
- `style` é para alterações que não afetam o significado do código (espaço em branco, formatação, ponto e vírgula, etc)
- `core` é para mudanças em elementos centrais do projeto
- `tests` é para mudanças no conjunto de testes
- `docs` é apenas para alterações na documentação

**Escopo:**

Um escopo pode ser fornecido no tipo de *commit* para fornecer informações contextuais adicionais e é colocado entre parênteses.

**Descrição:**

- use verbos imperativos que descrevam a ação realizada ('add', 'fix', 'update', 'remove')
- não coloque a primeira letra em maiúscula
- sem ponto (.) no final

**Exemplos:**

```
git commit -m fix(node-express): fix incorrect status codes
git commit -m feat(cli): add nested prompts
git commit -m core!: drop support for Node 6
```

Por favor, consulte a [documentação](https://www.conventionalcommits.org/pt-br/v1.0.0/) para mais detalhes.

### Títulos de PR

Qualquer PR que não esteja em modo rascunho deve seguir a convenção Conventional Commits para os títulos.

### Guias de estilo

Na maioria dos casos, seguimos os guias de estilo da Google para:

- [JavaScript](https://google.github.io/styleguide/jsguide.html)
- [TypeScript](https://google.github.io/styleguide/tsguide.html)
- [Python](https://google.github.io/styleguide/pyguide.html)
- [Shell](https://google.github.io/styleguide/shellguide.html)

## Revisando Contribuições (somente mantenedores)

- Os revisores desempenham um papel crucial na manutenção da qualidade do projeto.
- Eles fornecerão *feedback* que ajudará a melhorar o código e alinhá-lo com as metas e diretrizes do projeto.
- O PR será aprovado assim que atender aos requisitos estabelecidos.

## *Merge* de PRs (somente mantenedores)

- Os mantenedores do projeto têm a decisão final sobre o *merge* dos PRs. Eles revisarão sua contribuição, fornecerão feedback e orientarão você durante o processo.
- Depois que seu PR for aprovado, um mantenedor fará o *merge* na base de código principal.
- Agora seu trabalho passa a fazer parte do projeto! Obrigado pela sua valiosa contribuição!

---

Nota: Estas diretrizes de contribuição servem como orientação geral. Para obter instruções específicas relacionadas ao projeto, consulte a documentação, os canais do Discord ou consulte os mantenedores.

Agora divirta-se! Agradecemos sua dedicação e esperamos suas contribuições para o projeto Backend Builder!
