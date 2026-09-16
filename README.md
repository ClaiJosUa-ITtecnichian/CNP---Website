# Ciência no Ponto — Website Institucional

Website completo para o canal e centro de explicações **Ciência no Ponto**.

---

## Estrutura de ficheiros

```
/
├── index.html              ← Página principal (única página, estilo SPA)
├── styles.css              ← Todos os estilos (paleta azul, responsivo)
├── script.js               ← Interatividade (menu, formulário, animações)
├── README.md               ← Este ficheiro
└── assets/
    ├── images/
    │   ├── hero/           ← Imagem principal do topo (hero)
    │   └── team/           ← Fotos dos professores
    └── icons/              ← Favicon e ícones da app
```

---

## Personalização obrigatória antes de publicar

### 1. Número de WhatsApp
Substitui **todas** as ocorrências de `244000000000` pelo número real (incluindo código do país, sem espaços ou sinais):
```
Busca: 244000000000
Substitui por: 258XXXXXXXXX  (ou o número correto)
```
Afeta: `index.html` e `script.js`

### 2. Links do YouTube
- Canal: substitui `https://www.youtube.com/@CiencianoPonto` pelo URL real do canal.
- Playlist embed: no `index.html`, encontra `PLxxxxxxxxxxxxxxxxxxxxxx` e substitui pelo ID real da playlist (ou vídeo).
  - Para um vídeo único: `https://www.youtube.com/embed/VIDEO_ID`
  - Para uma playlist: `https://www.youtube.com/embed/videoseries?list=PLAYLIST_ID`

### 3. Redes sociais
No `index.html`, atualiza os `href` das redes sociais:
- Instagram: `https://www.instagram.com/ciencianoponto`
- Facebook: `https://www.facebook.com/ciencianoponto`
- TikTok: `https://www.tiktok.com/@ciencianoponto`

### 4. E-mail de contacto
Substitui `geral@ciencianoponto.com` pelo e-mail real.

### 5. Morada / localização
Pesquisa `[Endereço` e substitui pelos dados reais do centro.

### 6. Mapa do Google Maps
No bloco `.map-placeholder` do index.html, substitui pelo iframe do Google Maps:
1. Vai a [maps.google.com](https://maps.google.com) e pesquisa a morada.
2. Clica em **Partilhar → Incorporar um mapa** e copia o `<iframe>`.
3. Substitui o `<div class="map-placeholder">...</div>` pelo iframe copiado.
   Adiciona `class="horarios__map"` ao iframe para herdar os estilos de rounded corners.

### 7. Fotos dos professores
- Adiciona as fotos em `assets/images/team/` (formato JPG/WebP, ~400×400 px).
- Atualiza os nomes, disciplinas e biografias nos cartões `.team-card` do index.html.
- Ver instruções detalhadas em `assets/images/team/COLOCAR_FOTOS_AQUI.txt`.

### 8. Imagem principal (Hero)
- Adiciona a imagem em `assets/images/hero/` (~840×630 px).
- Ver instruções em `assets/images/hero/COLOCAR_IMAGEM_AQUI.txt`.

### 9. Favicon
- Gera o favicon em [realfavicongenerator.net](https://realfavicongenerator.net).
- Coloca os ficheiros em `assets/icons/`.
- Adiciona as tags `<link>` no `<head>` do index.html (instruções em `assets/icons/COLOCAR_FAVICON_AQUI.txt`).

### 10. Horários reais
Atualiza a tabela de horários na secção `#horarios` com os horários reais de disponibilidade.
- Slots disponíveis: `class="slot slot--available"`
- Slots indisponíveis: `class="slot slot--closed"`

### 11. Preços
Nos cartões `.plano-card`, substitui os textos `Consultar` pela informação real de preços, se aplicável.

---

## Publicação no GitHub Pages

1. Cria um repositório no GitHub (pode ser público ou privado com Pages ativo).
2. Faz upload de todos os ficheiros para a raiz do repositório (`index.html` na raiz).
3. Vai a **Settings → Pages → Source → Deploy from branch → main → / (root)**.
4. O site fica disponível em `https://<utilizador>.github.io/<repositório>/`.

> **Nota:** todos os caminhos de ficheiros usam caminhos relativos (`assets/...`), compatíveis com GitHub Pages.

---

## Funcionalidades incluídas

| Funcionalidade | Detalhes |
|---|---|
| Menu fixo responsivo | Desktop + hamburger mobile |
| Secção Hero | Gradiente azul, estatísticas, cards flutuantes animados |
| Sobre Nós | Missão, pilares, grelha de professores |
| Serviços | Cards por disciplina + tabela de planos/preços |
| Horários | Tabela semanal com destaque do dia atual |
| Redes Sociais | Cards coloridos + embed YouTube lazy-loaded |
| Formulário de contacto | Validação em tempo real + envio via WhatsApp |
| Botão flutuante WhatsApp | Visível em todas as páginas, com tooltip |
| Scroll suave | Entre todas as secções |
| Animações de entrada | Elementos animam ao entrar no viewport |
| Back-to-top | Botão fixo aparece após scroll |
| Responsivo | Mobile, tablet e desktop |
| Acessibilidade | ARIA labels, focus management, contraste adequado |
| Performance | Lazy loading de imagens e do embed YouTube |

---

## Suporte

Para alterações ao design ou funcionalidades, edita diretamente:
- Cores e espaçamentos: variáveis CSS no topo do `styles.css` (secção `:root`)
- Conteúdo: `index.html`
- Comportamento: `script.js`
