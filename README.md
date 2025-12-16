# LP CRC Optimized v2.0

Landing Page otimizada para performance - CRC que Converte

## 🎯 Objetivo

Versão ultra-otimizada da LP usando HTML/CSS/Vanilla TypeScript para máxima performance no Lighthouse.

## 📊 Metas de Performance

- **Performance Score**: 90+
- **FCP (First Contentful Paint)**: < 1.0s
- **LCP (Largest Contentful Paint)**: < 1.5s
- **TTI (Time to Interactive)**: < 3.0s
- **TBT (Total Blocking Time)**: < 600ms
- **CLS (Cumulative Layout Shift)**: 0

## 🚀 Stack Técnica

- **HTML5** - Semântico e otimizado para SEO
- **CSS3** - Moderno com Grid/Flexbox
- **TypeScript** - Vanilla (sem frameworks)
- **Build Tool** - esbuild (ultra-rápido)
- **Bundle Size** - ~100KB total (vs 558KB React)

## 📦 Estrutura do Projeto

```
lp-crc-optimized/
├── src/
│   ├── index.html                 # HTML principal
│   ├── styles/
│   │   └── main.css              # CSS principal
│   └── scripts/
│       ├── main.ts               # Entry point
│       ├── components/
│       │   ├── accordion.ts      # FAQ accordion
│       │   ├── lazy-load.ts      # Lazy loading
│       │   └── chatbot.ts        # Botpress integration
│       └── utils/
│           └── utm-tracker.ts    # UTM tracking
├── public/                        # Assets estáticos
│   ├── f5-logo.png
│   └── robots.txt
└── dist/                          # Build output
```

## 🛠️ Comandos

```bash
# Instalar dependências
npm install

# Desenvolvimento (build dev)
npm run dev

# Build produção
npm run build

# Preview do build
npm run preview
```

## ⚡ Otimizações Implementadas

### HTML/CSS
- ✅ Critical CSS inline no `<head>`
- ✅ CSS não-crítico carregado async
- ✅ HTML semântico para SEO
- ✅ Aspect ratio fixo no vídeo (prevenir CLS)

### JavaScript
- ✅ Vanilla TypeScript (sem React, -87% bundle)
- ✅ Code splitting com esbuild
- ✅ ES2020 target (navegadores modernos)
- ✅ Lazy loading de seções
- ✅ Accordion nativo (~800 bytes vs Radix UI)

### Third-Party Scripts
- ✅ VTurb player v4 mantido (essencial)
- ✅ Botpress lazy load on-demand
- ✅ Clarity/Hotmart defer com `requestIdleCallback`
- ✅ Preconnects para domínios críticos

### Performance
- ✅ Intersection Observer para lazy load
- ✅ `content-visibility: auto` em seções
- ✅ Fonts preload
- ✅ DNS prefetch para recursos defer

## 🎨 Funcionalidades Mantidas

- ✅ VSL VTurb 2 minutos
- ✅ Todas as copys originais
- ✅ Funil de consciência correto
- ✅ Depoimentos e cases
- ✅ FAQ accordion
- ✅ Chatbot Botpress
- ✅ Tracking UTM/Facebook/Clarity
- ✅ Design glassmorphism
- ✅ Responsivo mobile-first

## 📈 Comparação com Versão Anterior

| Métrica | React/Vite | HTML/Vanilla | Melhoria |
|---------|------------|--------------|----------|
| Bundle JS | ~120KB | ~15KB | **-87%** |
| Bundle Total | 558KB | ~100KB | **-82%** |
| TTI | 7.9s | ~2.5s | **-68%** |
| FCP | 2.6s | ~0.8s | **-69%** |
| Score | 63 | 90+ | **+43%** |

## 🔧 Build Process

O build usa esbuild para:
1. Compilar TypeScript → JavaScript ES2020
2. Minificar JS/CSS
3. Code splitting automático
4. Copiar assets para `dist/`

## 🚀 Deploy

Após build, a pasta `dist/` contém tudo necessário para deploy:

```bash
npm run build
# Upload dist/ para seu hosting
```

## 📝 Notas Técnicas

### VTurb Integration
O player VTurb v4 é carregado via script externo:
```html
<vturb-smartplayer id="vid-..."></vturb-smartplayer>
```

### UTM Tracking
Todos os CTAs automaticamente capturam e propagam UTM params:
```typescript
const url = buildURLWithUTM("https://pay.hotmart.com/...");
```

### Chatbot On-Demand
Botpress só carrega quando:
- Usuário chega na seção FAQ, OU
- 7 segundos após page load

---

**Desenvolvido para máxima performance** 🚀
