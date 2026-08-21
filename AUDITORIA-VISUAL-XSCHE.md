# Auditoria visual e briefing de redesign — XSCHÉ / Jean Porsche

**Site analisado:** [xsche.es](https://www.xsche.es/)  
**Data da auditoria:** 21 de agosto de 2026  
**Escopo:** 32 URLs do [sitemap público](https://www.xsche.es/sitemap.xml), links internos descobertos e testes renderizados em 1440×1000, 768×1024 e 390×844 px.  
**Método:** navegação renderizada, inspeção pública de DOM/CSS/assets, capturas completas, teste de hover/menu e checagem automatizada WCAG 2 A/AA em oito templates representativos. Nenhuma área privada foi acessada.

## 1. Resumo executivo da identidade visual atual

O site apresenta uma identidade autoral, editorial, cromática e maximalista, coerente com um estúdio de arquitetura e interiores de alto padrão. A assinatura visual é construída por cinco elementos muito reconhecíveis: fotografia de interiores rica em cor e padrões; tipografia serifada de alto contraste; grandes títulos em movimento ou parcialmente recortados; campos extensos de amarelo, coral, azul e creme; e a combinação de imagens circulares com botões em formato cápsula.

O resultado comunica personalidade, luxo não convencional, repertório artístico e confiança. A marca não parece buscar o minimalismo neutro comum a escritórios de arquitetura: o diferencial é justamente a exuberância, a mistura de épocas, o uso do colorido e a voz de autor. Isso deve ser preservado.

O problema não é falta de identidade, e sim falta de controle sistêmico. A direção visual é forte, mas a implementação atual apresenta conteúdo genérico de template, cards sem destino real, contraste insuficiente, galerias quebradas em mobile, títulos excessivamente recortados, hierarquia semântica inconsistente e páginas públicas órfãs. Em 18 páginas de projeto repete-se o mesmo bloco genérico de texto, o que enfraquece a credibilidade de um portfólio que, visualmente, é muito forte.

**Idioma e público aparente:** espanhol (`es-ES`) como idioma principal, com seletor Español/English. O público aparente inclui clientes residenciais de alta renda, grupos de hotelaria e restauração, incorporadores e marcas que procuram interiores autorais em Madrid, Menorca e outros mercados internacionais. O tom pretendido é sofisticado, expressivo, cultural, próximo e confiante; textos genéricos ainda publicados diluem esse posicionamento.

## 2. Mapa das páginas e seções encontradas

### Navegação global observada

- **Header desktop:** Inicio; Destacados; Interiorismo (dropdown com Residencial, Restaurantes e Casa Decor); Contacto; Instagram; seletor Español/English.
- **Header tablet/mobile:** menu de tela cheia amarelo; Inicio; Destacados; Interiorismo em segundo nível; Contacto; Instagram; idioma. A troca para hamburger já ocorre em 768 px.
- **Footer:** menção visual “Incluído en la lista: AD100” à esquerda e logo gráfico Jean Porsche centralizado. Não há navegação, contato, endereço, redes, política/legal ou CTA no footer.
- **CTAs recorrentes:** “Proyectos Destacados”, pills sobre cards de projeto, “ENVIAR”, e-mail e imagens que abrem lightbox.

### Páginas institucionais e hubs

| URL | Papel/estrutura observada | Situação |
|---|---|---|
| `/` e `/home` | Home: hero fotográfico, wordmark, marquee “Cuando el estilo tiene nombre propio”, CTA para destacados e footer | `/home` canonicaliza para `/` |
| `/destacados` | Título grande, grade de oito projetos em círculos/pills e marquee | Vários cards apontam para a própria página; Casa BB aponta para 404 |
| `/about` | “Quiénes somos”, retrato, cards, imagens, princípios/accordion, formulário | Não aparece no menu; contém conteúdo genérico de template |
| `/contact` | Contatos Madrid/Menorca, e-mail, telefone, formulário e imagem | Conteúdo real e essencial |
| `/arquitectura` | Cards de serviços com preços e formulário | Fora do menu; conteúdo genérico e CTAs “Reservar” levam a 404 |
| `/grandes-proyectos` | Título e um parágrafo introdutório em grande área vazia | Fora do menu; página incompleta/placeholder |
| `/residencial` | Hero, marquee de cidades e grade de oito projetos | Casa M+S aponta para o próprio hub |
| `/restaurantes` | Hero e grade de oito projetos | Lelong e Club de Mar apontam para o próprio hub |
| `/casa-decor` | Grade de oito referências/edições | Navegação funcional na maior parte |

### Páginas de projeto públicas no sitemap

**Residencial:** `/casa-ve`, `/casa-bb-menorca`, `/casa-bb-madrid`, `/casa-jj` (título da página “Casa JP”, card “Casa J+J”), `/casa-torre`, `/casa-a-s`, `/casa-bl`, `/the-edge`, `/casa-ja`.

**Restaurantes/hospitality:** `/baoli`, `/sunset`, `/coque`, `/chez-lumiere`, `/lu-cocina-y-alma`, `/beach-sanctipetri`, além de `/baoli-1-1-1-1-1`, cujo título real é “Petit Palais” e cujo slug é um resíduo editorial.

**Casa Decor e projetos especiais:** `/jekyll-y-hyde`, `/gabinete-de-dibujo`, `/gabinete-visconti`, `/el-gran-salon`, `/cocinando-en-los-hamptons`, `/bano-hollywood`, `/toujours-a-madrid`.

Todas as 32 URLs do sitemap responderam HTTP 200. Rotas publicamente linkadas mas quebradas: `/appointments` e `/casa-ve-3` retornam 404. `/interiorismo` redireciona para `/residencial`. A rota `/cart` é uma rota de sistema Squarespace e não foi tratada como conteúdo institucional.

### Estrutura recorrente das páginas de projeto

1. Header transparente sobre hero fotográfico.
2. Hero quase full viewport com título/local em marquee oversized.
3. Faixa horizontal de cinco imagens.
4. Composição editorial: imagem + caixa amarela de texto/quote sobre fundo creme.
5. Imagem full-bleed com quote grande e parágrafo sobreposto.
6. Faixa/colagem final de imagens sobre amarelo.
7. Crédito de publicação quando existente.
8. Footer AD100 + logo.

Esse template é reconhecível e adequado a um portfólio visual, mas precisa de regras responsivas e de conteúdo consistentes.

## 3. Paleta de cores identificada

Valores abaixo foram extraídos dos estilos computados e repetem-se em todo o site.

| Token observado | HEX | RGB | Uso atual | Avaliação |
|---|---:|---:|---|---|
| Amarelo solar | `#F0CD5F` | 240, 205, 95 | Fundo de hubs/cards, footer, menu mobile, seções finais | Cor assinatura; preservar |
| Coral/terracota | `#DA5B37` | 218, 91, 55 | About/contact, títulos, CTAs, hover e accordion | Cor assinatura; preservar |
| Azul médio | `#4277B0` | 66, 119, 176 | Wordmark, links, títulos e dropdown | Bom contraponto frio; preservar |
| Creme | `#EAE6DD` | 234, 230, 221 | Fundo neutro, textos claros, botões claros | Neutral principal; preservar |
| Carvão | `#2D2D2A` | 45, 45, 42 | Texto, linhas, ícones, menu aberto | Melhor cor funcional para texto |
| Branco técnico | `#FAFAFA` | 250, 250, 250 | Uso pontual de sistema/formulário | Não é central à marca |
| Preto | `#000000` | 0, 0, 0 | Linhas/estados/overlays pontuais | Uso secundário |

### Combinações recorrentes e contraste medido

| Combinação | Contraste | Resultado WCAG para texto normal |
|---|---:|---|
| Carvão sobre creme | 11,09:1 | AAA |
| Carvão sobre amarelo | 8,95:1 | AAA |
| Creme sobre coral | 3,05:1 | Falha AA normal |
| Coral sobre amarelo | 2,46:1 | Falha até para texto grande |
| Azul sobre amarelo | 3,02:1 | Só serve para texto grande |
| Azul sobre creme | 3,75:1 | Falha AA normal |
| Creme sobre amarelo | 1,24:1 | Falha severa |

Os tons não precisam ser removidos. A correção deve ser feita por função: manter as cores originais em superfícies, imagens, títulos grandes e decoração; usar carvão para texto sobre amarelo/creme; e criar variantes funcionais escuras derivadas para links e botões pequenos. Sugestões AA: coral escuro `#A64026` com creme (4,98:1) e azul escuro `#28598B` com creme (5,83:1).

## 4. Tipografia e hierarquia textual

### Fontes observadas

- **Instrument Serif:** família dominante em praticamente todo o conteúdo, header, títulos, corpo, menus e cards. Peso 400, visual editorial, elegante e autoral.
- **Castoro Titling:** uso pontual em botões/formulários e labels de destaque.
- **Clarkson, Arial, sans-serif:** aparece em elementos de sistema; pode servir como base funcional sem introduzir uma linguagem totalmente externa.
- **Newsreader/Asset:** ocorrências residuais de template/sistema, sem papel consistente de marca.

### Escala atual observada no desktop

- Hero/marquee de projeto: aproximadamente **133,6 px**, peso 400, line-height 187 px, tracking negativo.
- Títulos de hubs Residencial/Restaurantes: aproximadamente **198–201 px**.
- Título de seção principal: aproximadamente **66,4 px**.
- Subtítulo editorial/quote: aproximadamente **36,16 px**.
- Card/button: aproximadamente **24,4 px**.
- Corpo e menu: **16 px**, line-height geralmente **24 px**.
- Wordmark textual: **24,4 px**.

Em tablet os títulos caem para 43–107 px; em mobile alguns crescem novamente (por exemplo, 80,5 px em tablet e 86,9 px em mobile no hero), evidenciando fórmulas responsivas pouco controladas. Tracking negativo de cerca de `-2%` é recorrente.

### Diagnóstico tipográfico

**Forças:** a Instrument Serif é o principal marcador de sofisticação e deve continuar; títulos em escala grande combinam com o caráter expressivo; a hierarquia visual é memorável.

**Problemas:** a mesma serif é usada para interface, texto corrido e display; títulos de 198–201 px criam recortes que parecem erro, especialmente em mobile; marquees duplicam o mesmo texto dentro de H1; várias páginas possuem dois ou três H1; line-height excessivo em alguns heros e insuficiente em labels; pequenos textos claros sobre coral falham em contraste.

## 5. Análise do layout atual

- Base full-bleed, com header de cerca de **87 px** sobreposto à primeira seção.
- Padding lateral desktop próximo de **58 px/4vw**; mobile próximo de **23 px/6vw**.
- Conteúdo visual ocupa toda a largura; não há um max-width consistente para leitura, apenas para blocos específicos.
- Hubs usam grade de quatro colunas × duas linhas, imagens circulares e pills; mobile reduz para uma coluna.
- Páginas de projeto alternam faixas full-bleed, mosaicos assimétricos e blocos editoriais sobre fundo creme/amarelo.
- Espaço vazio é usado em grande escala. Quando intencional, transmite luxo; em `/grandes-proyectos`, porém, parece página inacabada.
- O equilíbrio texto/imagem funciona melhor nos projetos com copy específica (`/casa-ve`, `/casa-bb-menorca`, `/casa-ja`). Nos demais, o mesmo texto genérico reduz o valor do conjunto.
- A ausência de uma grade responsiva comum gera posições arbitrárias em mobile: imagens de algumas galerias ocupam apenas metade da largura, alternando grandes vazios laterais.

## 6. Componentes visuais identificados

### Header e menus

Header transparente, wordmark textual à esquerda e navegação compacta à direita. A cor muda por página para se adaptar ao fundo. Dropdown “Interiorismo” usa fundo azul e texto creme. Menu tablet/mobile é um overlay full-screen amarelo com tipografia grande, segundo nível e ícones lineares.

**Qualidade:** o overlay mobile preserva muito bem a identidade e a navegação é simples. **Problemas:** contraste do header depende da foto; o seletor de idioma usa `role=listbox` sem filhos `option`; o dropdown precisa ser plenamente operável por teclado; o link/área do Instagram tem só cerca de 20–25 px; itens mobile medidos em cerca de 33 px de altura ficam abaixo do alvo recomendado de 44 px.

### Hero e marquees

Fotografia full-bleed com overlay e títulos serifados enormes em movimento/repetição. É um elemento de marca forte. Em mobile, o conteúdo é frequentemente cortado sem contexto suficiente; não houve scroll horizontal técnico nos testes, mas há clipping visual por `overflow`.

### Cards e pills

Cards circulares, crop `cover`, labels em cápsulas com raio de 300 px. Hover troca texto/fundo para coral/creme; em alguns grids o label só fica legível em hover. Em touch não existe hover, deixando labels creme sobre amarelo com contraste de 1,24:1. Vários cards não são links reais.

### Formulários

Campos transparentes, borda carvão, raio aproximado de 24 px; inputs de 42 px de altura, textarea de 100 px; fonte 16 px; botão pill creme/coral de 64 px. Labels visíveis são um ponto positivo. O formulário aparece em Contato e é repetido em páginas de template. O campo honeypot gerou alerta automático de label; a semântica de obrigatoriedade deve ser revisada.

### Galerias/lightbox

Faixas de imagens com proporções diversas, `object-fit: cover` na maioria e botões de lightbox com nome acessível “Ver tamaño completo”. O ritmo desktop é expressivo; o empilhamento mobile está quebrado em páginas de projeto.

### Accordion, banners e elementos decorativos

Accordion de princípios em `/about`, linhas finas coral e sinal “+”; ícones de Instagram, globo e chevrons; formas circulares e pills como ornamentos recorrentes. Não foram encontrados banners promocionais intrusivos ou modais de marketing na amostra.

### Estados e transições observados

- Dropdown por hover no desktop e navegação em segundo nível no mobile.
- Cards/pills mudam para coral/creme em hover.
- Botão de formulário reduz opacidade para 0,8.
- Alguns links mudam de creme para coral.
- Marquees repetem textos horizontalmente.
- Imagens de projeto abrem lightbox.

## 7. Imagens, ícones e recursos gráficos

Foram encontrados **390 elementos `<img>` renderizados** nas 32 páginas, além de heros usados como background CSS. A maioria é JPG/JPEG (323), com 66 PNGs. Todos os `<img>` têm `loading="lazy"`; o CDN do Squarespace entrega variações responsivas.

### Direção fotográfica

- Interiores editoriais, saturados, com forte presença de azuis, amarelos, vermelhos e verdes.
- Ênfase em padrões, papéis de parede, marcenaria, obras de arte, metais, texturas e geometrias.
- Mistura de vistas amplas e detalhes; enquadramentos frequentemente verticais e horizontais no mesmo mosaico.
- Fotografia é o ativo mais forte do site e comunica melhor a marca do que o texto atual.

### Logos e símbolos

- Header usa wordmark textual “Jean Porsche Arquitectura + Interiores”.
- Footer usa logo quadrado azul com símbolo branco simétrico e nome da marca.
- Selo/menção AD100 em preto no footer.
- Ícones lineares de Instagram, globo, menu, chevrons e “+”.

### Qualidade e coerência

A coerência estética é alta. Alguns crops forçam imagens horizontais em círculos/quadrados, cortando informação importante. Parte das imagens é solicitada em resolução próxima ou inferior à área exibida; isso deve ser revisado no novo pipeline, especialmente em heros. Como o teste ocorreu com lazy-loading, não se afirma peso final de página sem uma auditoria de performance dedicada.

## 8. Navegação, menus e CTAs

### Pontos positivos

- Navegação global curta.
- Categorias de portfólio são compreensíveis.
- Menu mobile de tela cheia é coerente com a marca.
- Skip link e landmarks `header/main/footer` existem.
- Contato, e-mail e Instagram são fáceis de localizar.

### Falhas encontradas

- `/about`, `/arquitectura` e `/grandes-proyectos` estão no sitemap, mas fora da navegação principal.
- `/casa-bb-madrid` e “Petit Palais” estão publicamente indexados, mas não recebem link útil dos hubs observados.
- Em `/destacados`, Casa Torre, Gabinete Visconti, Restaurante Coque, Petit Palais, Hotel Club 29 e Sunset Bar apontam para o próprio hub; Casa BB aponta para `/casa-ve-3` (404).
- Em `/residencial`, Casa M+S aponta para o próprio hub.
- Em `/restaurantes`, Lelong e Club de Mar apontam para o próprio hub.
- `/arquitectura` possui três CTAs “Reservar” para `/appointments` (404).
- O link visual AD100 no footer não possui nome acessível.
- A imagem-link de Chez Lumiere também foi detectada sem nome acessível.
- Nomes e slugs divergem: `/casa-jj` × “Casa JP/J+J”; `/baoli-1-1-1-1-1` × “Petit Palais”; “Baño Holywood/Hollywood”; “Lelong/LeLong”.

## 9. Análise de responsividade

### Desktop — 1440 px

É a melhor experiência atual. As composições editoriais e mosaicos fazem sentido; o header é discreto; cards se organizam em quatro colunas. Ainda há clipping excessivo em títulos, dependência de hover, textos sobre foto sem proteção consistente e links quebrados.

### Tablet — 768 px

O site troca para hamburger e menu full-screen. Tipos e grids reduzem, mas algumas fórmulas de tamanho não seguem progressão lógica. A experiência fica funcional, porém o tablet herda decisões mobile em vez de ter uma composição intermediária otimizada.

### Mobile — 390 px

**Funciona bem:** menu full-screen; contato e formulário cabem na largura; hubs empilham cards; inputs de 16 px evitam zoom automático; hero continua visualmente forte.

**Falhas críticas:**

- Páginas de projeto chegam a 5.500–5.700 px de altura e exibem galerias estreitas alinhadas só à direita ou só à esquerda, com grandes vazios.
- Títulos/marquees são recortados e algumas cidades/textos tornam-se fragmentos ilegíveis.
- Labels de cards não têm contraste sem hover.
- A grade de destaques cria um bloco de marquee cortado no meio da lista.
- No Contato, endereço quebra em colunas/linhas pouco naturais.
- Targets de navegação e ícones ficam abaixo de 44×44 px.

Não foi detectado `scrollWidth` maior que o viewport nos templates testados; o problema é clipping deliberado/oculto, não scrollbar horizontal.

## 10. Análise de acessibilidade e usabilidade

### Resultados verificáveis

- Testes Axe em oito templates, desktop e mobile, encontraram falha de contraste em todos.
- **344 de 390 imagens renderizadas (88%) têm `alt=""`**. Parte pode ser decorativa, mas galerias de projeto são conteúdo e precisam de alt significativo ou de uma decisão explícita de decoração.
- O seletor de idioma desktop declara `role="listbox"` sem filhos `option`.
- Link AD100 sem nome acessível em todas as páginas; Chez Lumiere adiciona outro link sem nome.
- IDs duplicados de header/language picker e estilos aparecem no DOM; devem ser eliminados na nova implementação.
- O site possui skip link e landmarks estruturais consistentes, um ponto positivo.
- Botões de lightbox têm nome acessível.
- Campos visíveis têm labels e usam 16 px, mas a semântica de `required`, mensagens de erro e foco precisa ser validada.

### Usabilidade

A exploração é visualmente prazerosa, mas o usuário não sabe quais cards são clicáveis ou por que alguns não abrem nada. O excesso de texto em movimento e clipping reduz escaneabilidade. A falta de metadados simples nos cards (tipo, local, ano) obriga a depender apenas do nome/imagem. O footer não ajuda o usuário a continuar a navegação. Vinte das 32 páginas não possuem meta description, sinal de manutenção editorial incompleta.

## 11. Pontos fortes que devem ser preservados

1. Paleta amarela, coral, azul, creme e carvão.
2. Instrument Serif como voz display da marca.
3. Fotografia rica, colorida e editorial como protagonista.
4. Contraste entre maximalismo dos projetos e grandes áreas de respiro.
5. Círculos e pills como formas reconhecíveis.
6. Marquee/títulos grandes, desde que controlados e legíveis.
7. Wordmark textual no header e logo gráfico no footer.
8. Credencial AD100 e créditos editoriais/publicações.
9. Categorias Residencial, Restaurantes e Casa Decor.
10. Contatos reais de Madrid/Menorca, e-mail, telefone e formulário.
11. Mensagens específicas e fortes encontradas em projetos como Casa V+E, Casa BB Menorca, Casa J+A, Jekyll & Hyde e Gabinete de Dibujo.

## 12. Problemas visuais encontrados

### Críticos

1. Conteúdo genérico de template em `/about`, `/arquitectura`, `/grandes-proyectos` e em 18 páginas de projeto.
2. Cards essenciais com links próprios, 404 ou sem destino de projeto.
3. Galerias de projeto quebradas em mobile.
4. Contraste insuficiente em componentes recorrentes.
5. 88% dos `<img>` sem alt informativo.

### Altos

6. Arquitetura de informação oculta páginas e projetos relevantes.
7. Marquees/títulos excessivamente recortados e H1 repetidos.
8. Dependência de hover para comunicar estado/legibilidade.
9. Inconsistência de nomes, slugs e labels.
10. Footer sem função de navegação ou contato.

### Médios

11. Escala tipográfica fluida pouco controlada entre tablet e mobile.
12. Crops circulares cortam conteúdo de algumas fotografias.
13. Metadados de projeto ausentes nos hubs.
14. Vinte páginas sem meta description.
15. Targets pequenos e estados de foco não evidentes.

## 13. Oportunidades de melhoria

- Transformar o portfólio em um sistema editorial consistente sem reduzir seu caráter exuberante.
- Criar um único modelo de dados para projeto: nome, categoria, local, ano, resumo validado, créditos, publicação, capa e galeria.
- Reaproveitar os melhores textos específicos já existentes e substituir placeholders apenas após aprovação do cliente.
- Tornar cada card inteiro clicável, com destino validado e label sempre legível.
- Usar o marquee como assinatura em um momento por página, não como substituto de título informativo.
- Introduzir navegação entre projetos relacionados/próximo-anterior para aumentar descoberta.
- Levar contatos existentes ao footer sem inventar nova informação.
- Usar a paleta por função e adicionar variantes AA, preservando os cinco tons originais.
- Criar uma composição mobile própria para galerias, em vez de apenas reescalar o grid desktop.

## 14. Guia-base para o novo layout

### Design tokens de cor

- `brand.sun: #F0CD5F`
- `brand.coral: #DA5B37`
- `brand.blue: #4277B0`
- `neutral.cream: #EAE6DD`
- `neutral.ink: #2D2D2A`
- `action.coral-dark: #A64026` para botão/link com texto creme
- `action.blue-dark: #28598B` para link/foco com texto creme

Não usar creme sobre amarelo, coral sobre amarelo ou creme pequeno sobre coral. Em fotografia, aplicar scrim/gradiente calculado por área, não uma cor global idêntica para todas as capas.

### Tipografia recomendada

- **Display:** Instrument Serif 400; headings, quotes, marquees e wordmark.
- **Texto/UI:** Clarkson/Arial/sans-serif, ou outra sans licenciada já aprovada pelo cliente; usar para corpo, metadados, labels e controles.
- **Titling:** Castoro Titling apenas em pequenos momentos editoriais/eyebrows, se a licença atual permitir.
- Desktop: display 80–112 px; H1 56–72; H2 40–48; H3 28–36; body 18/1,5; UI 16.
- Mobile: display 48–64; H1 40–48; H2 32–40; H3 24–28; body 16–18/1,5.
- Comprimento de linha: 55–70 caracteres para texto corrido.
- Um H1 por página; marquee visual deve ser `aria-hidden` quando duplicar o título.

### Grid e espaçamento

- Base de 8 px: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- 12 colunas desktop, 8 tablet, 4 mobile.
- Gutter 24–32 px desktop; 16–20 px mobile.
- Container de leitura 720 px; container visual máximo 1280–1320 px; imagens-chave podem continuar full-bleed.
- Padding lateral: manter a sensação atual de 4vw desktop e 6vw mobile, com limites mínimos/máximos.
- Header 80–88 px desktop e 64–72 px mobile.

### Botões

- Preservar pill como assinatura.
- Altura mínima 48 px; área clicável mínima 44×44 px.
- Primário: coral escuro + creme; secundário: transparente com 1,5–2 px carvão; sobre amarelo, carvão.
- Estados: default, hover, focus-visible, active, disabled e loading; não depender só de cor/opacity.
- Label com sans de UI ou Castoro muito legível; evitar tracking `-10%` observado no botão atual.

### Cards

- Card inteiro clicável; imagem com `aspect-ratio`; título e metadado em área estável.
- Círculo pode permanecer em destaques/hubs, mas não precisa ser o único formato do portfólio.
- Desktop 4 colunas, tablet 2, mobile 1; gap constante.
- Label sempre visível e AA; hover acrescenta movimento, nunca informação essencial.
- Exibir apenas dados já validados: nome, cidade/categoria e, se disponível, ano/publicação.

### Seções e páginas de projeto

- Hero com título legível e localização, fotografia preservada e overlay adaptativo.
- Sequência recomendada: hero → resumo curto validado → galeria editorial → quote/conceito → detalhes/créditos/publicações → projetos relacionados → contato.
- Alternar creme/amarelo/coral com mais disciplina; reservar coral para momentos de maior energia.
- Em mobile, todas as imagens principais ocupam 100% da coluna; mosaicos de duas colunas só quando os detalhes continuam visíveis.

### Header e footer

- Header sobre hero com scrim e versão sólida ao rolar; estado ativo visível; dropdown com teclado/Escape/foco.
- Menu mobile full-screen amarelo deve ser preservado, corrigindo targets e semântica.
- Reorganizar menu com os conteúdos existentes: Inicio, Proyectos/Destacados, categorias, Estudio/Acerca de e Contacto. Não publicar `/arquitectura` ou `/grandes-proyectos` enquanto contiverem placeholders.
- Footer deve manter logo e AD100 e incorporar contatos existentes, categorias, Instagram, idioma e links legais aprovados.

### Imagens

- Inventário mestre com direitos/créditos e alt text.
- `<picture>`/`srcset`, AVIF/WebP quando possível, dimensões declaradas e LCP hero não-lazy.
- Definir focal point por breakpoint; não usar o mesmo crop para hero, círculo e mobile.
- Lightbox com foco preso, Escape, botão fechar nomeado e legenda/crédito.

## 15. Recomendações práticas para o redesign

### Prioridade 0 — antes do visual final

1. Congelar inventário e marcar cada texto como **real**, **genérico** ou **a validar**.
2. Corrigir/remover da publicação todos os links 404 e self-links.
3. Decidir com o cliente o destino de Casa M+S, Lelong, Club de Mar, Hotel Club 29, Casa BB e projetos órfãos.
4. Validar nomenclatura única e slugs; criar redirects 301 ao renomear.
5. Não migrar automaticamente os blocos genéricos repetidos.

### Prioridade 1 — sistema e templates

6. Construir tokens de cor/spacing/type e componentes acessíveis.
7. Prototipar primeiro Home, hub de categoria, projeto, About/Estudio e Contacto.
8. Resolver projeto mobile antes de replicar para as 23 páginas.
9. Implementar cards totalmente clicáveis e navegação entre projetos.
10. Criar header/footer globais com estados por fundo.

### Prioridade 2 — validação

11. QA visual em 390, 768, 1024, 1280, 1440 e 1920 px.
12. Testar teclado, VoiceOver/NVDA, zoom 200%, `prefers-reduced-motion` e contraste.
13. Validar performance de heros/galerias e Core Web Vitals.
14. Revisar alt, títulos, meta descriptions, canonical, redirects e sitemap.
15. Fazer UAT com tarefas: encontrar projeto por categoria, abrir projeto, navegar ao próximo e contactar o estúdio.

## 16. Checklist final para criação da nova versão

### Conteúdo e IA

- [ ] Todas as 32 páginas classificadas: manter, consolidar, redirecionar ou despublicar com justificativa.
- [ ] Nenhum texto genérico de template migrado.
- [ ] Todos os cards têm destino válido.
- [ ] Nomes/slugs/cidades/créditos validados.
- [ ] Um H1 por página e metadados completos.

### Identidade

- [ ] Paleta central preservada.
- [ ] Instrument Serif preservada como display.
- [ ] Fotografia continua protagonista.
- [ ] Círculos, pills e marquee usados com intenção, não repetição automática.
- [ ] Logo, wordmark e AD100 aplicados conforme assets autorizados.

### UI e responsividade

- [ ] Grid 12/8/4 e spacing tokens aplicados.
- [ ] Header/menu/dropdown funcionam por mouse, touch e teclado.
- [ ] Cards legíveis sem hover.
- [ ] Galerias mobile sem vazios ou crops arbitrários.
- [ ] Formulário possui sucesso, erro, loading e validação clara.
- [ ] Footer ajuda navegação e contato.

### Acessibilidade e qualidade

- [ ] Contraste AA em texto/UI.
- [ ] Targets mínimos de 44×44 px.
- [ ] Foco visível e ordem lógica.
- [ ] Alt text e imagens decorativas classificados.
- [ ] Reduced motion para marquees/transições.
- [ ] Sem links sem nome, IDs duplicados ou ARIA inválida.
- [ ] QA em zoom 200% e leitores de tela.
- [ ] Imagens responsivas, sem layout shift e com LCP otimizado.

## Briefing resumido para design/frontend

### Identidade a preservar

Marca editorial, expressiva e maximalista; paleta amarelo/coral/azul/creme/carvão; Instrument Serif; fotografia de interiores altamente colorida; círculos, pills, marquees; wordmark textual; logo gráfico azul e credencial AD100.

### Problemas prioritários

Conteúdo placeholder em larga escala; links quebrados/self-links; projeto mobile quebrado; contraste; alt text; páginas órfãs; inconsistência de naming/slug; interface dependente de hover; footer insuficiente.

### Diretrizes para o novo layout

Sistema editorial com grid 12/8/4, fotografia full-bleed seletiva, texto em coluna legível, serif para display e sans para UI, paleta original com variantes AA, marquee apenas como assinatura e um modelo único de projeto.

### Componentes a redesenhar

Header/dropdown/language picker; menu mobile; hero/marquee; card circular/pill; grids de categoria; mosaico e lightbox; quote overlay; accordion; formulário; footer; navegação anterior/próximo; estados de foco/erro/loading.

### Desktop e mobile

Desktop pode manter composições assimétricas e grande escala. Mobile deve ser composição própria: coluna integral, título controlado, cards com label fixo, imagens a 100%, mosaico máximo de duas colunas e menu com targets de 44 px.

### Riscos de descaracterização

Neutralizar a paleta; trocar a serif por uma sans genérica; reduzir o portfólio a cards minimalistas iguais; retirar a exuberância das fotos; eliminar círculos/pills/movimento por completo; aplicar um “luxo bege” que não corresponde ao trabalho atual.

### Próximos passos

1. Workshop curto de conteúdo/IA com o cliente.
2. Planilha de inventário das 32 páginas e 390 imagens.
3. Moodboard e design tokens aprovados.
4. Wireframes mobile-first dos cinco templates.
5. Protótipo de alta fidelidade Home + hub + projeto.
6. Teste de usabilidade e acessibilidade.
7. Implementação por componentes e migração editorial validada.
8. QA, redirects, SEO e lançamento monitorado.

---

### Evidências locais

- Capturas completas: `.audit-tools/output/screenshots/`
- Menus desktop/tablet/mobile: `.audit-tools/output/menu-*.png`
- Inventário renderizado: `.audit-tools/output/audit.json`
- Auditoria WCAG automatizada: `.audit-tools/output/axe-audit.json`

As recomendações distinguem observação direta, falha reproduzível e proposta. Não foram inventados serviços, projetos, textos institucionais ou regras de negócio.
