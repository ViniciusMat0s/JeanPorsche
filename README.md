# Jean Porsche — Arquitectura + Interiores

Homepage editorial criada em React, TypeScript e Vite para Jean Porsche. A implementação preserva a identidade cromática e os conteúdos públicos do site atual, com uma nova composição responsiva, acessível e orientada ao portfólio.

## Executar localmente

```bash
npm install
npm run dev
```

Validação de produção:

```bash
npm run lint
npm run build
npm run preview
```

## Estrutura

- `src/components`: seções e componentes reutilizáveis.
- `src/data/site.ts`: navegação, serviços, princípios, projetos e galeria.
- `src/hooks/useGsapPage.ts`: animações GSAP/ScrollTrigger e tratamento de movimento reduzido.
- `src/styles/global.css`: tokens, layout, responsividade, estados e scrollbar.
- `public/images`: imagens públicas do próprio portfólio do cliente, otimizadas para a nova homepage.
- `public/robots.txt` e `public/sitemap.xml`: arquivos básicos de indexação.
- `.audit-tools/output/local-qa.json`: último resultado da validação local automatizada.

## Notas de integração

- As categorias `/residencial`, `/restaurantes` e `/casa-decor` possuem páginas internas e entradas HTML próprias no build de produção.
- Os seis projetos destacados da homepage possuem páginas internas em `/proyectos/:slug/`, galerias próprias e entradas HTML individuais no build.
- O formulário prepara um e-mail para `info@xsche.es` e não armazena dados. A integração com backend/CRM deve ser definida antes da publicação definitiva.
- URLs canônicas, Open Graph e schema usam o domínio público atual; devem acompanhar a estratégia final de implantação caso o domínio mude.
