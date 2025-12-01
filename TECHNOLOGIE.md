# ajtak.it - Technická dokumentace

## O projektu

Web pro **ajtak.it** - IT služby na míru pro firmy i domácnosti. Matrix/Cyberpunk terminal design s důrazem na profesionalitu a čitelnost.

**Cílovka:**
- Malé firmy (1-20 lidí)
- OSVČ a drobné provozovny
- Domácnosti
- Airbnb / pronajímatelé

---

## Struktura webu

### Sekce
1. **Hero** - Terminálový úvod s typing efektem služeb
2. **Služby** - 6 kategorií + kompletní ceník + paušály
3. **O mně** - Profil, zkušenosti, proč ajtak.it
4. **Reference** - Projekty a případové studie
5. **Tech Stack** - Technologie a nástroje
6. **Kontakt** - Formulář s výběrem služby + kontaktní údaje

---

## Použité technologie

### Frontend
| Technologie | Použití |
|-------------|---------|
| **HTML5** | Sémantická struktura, canvas elementy |
| **CSS3** | Custom properties, Grid, Flexbox, animace, glassmorphism |
| **Vanilla JavaScript (ES6+)** | OOP přístup, Canvas API, Intersection Observer |
| **Google Fonts** | JetBrains Mono |

### Žádné frameworky
- ❌ Bez React/Vue/Angular
- ❌ Bez jQuery
- ❌ Bez CSS frameworků
- ✅ 100% vlastní kód

---

## Vizuální efekty

- **Matrix Rain Spotlight** - kód viditelný v okruhu kolem kurzoru
- **Glitch efekt** - CSS pseudo-elementy s clip-path
- **CRT Scanlines** - retro monitor vzhled
- **Boot Screen** - fake systémový boot
- **Command Palette** - Ctrl+K pro rychlou navigaci
- **Custom kurzor** - zelený dot + ring
- **Typing efekt** - rotace služeb
- **3D Tilt** - perspective efekt na kartách
- **Konami kód** - ↑↑↓↓←→←→BA easter egg
- **Hack Mode** - fake terminálové výpisy

---

## Ceník

### Hodinové sazby
| Služba | Cena |
|--------|------|
| Běžná práce (opravy, instalace) | 750 Kč/h |
| Sítě, servery, pokročilé | 950 Kč/h |
| Konzultace, analýza | 900 Kč/h |
| Urgentní zásah 24/7 | 1 500 Kč/h |

### Výjezdy
| Vzdálenost | Cena |
|------------|------|
| Do 10 km | ZDARMA |
| 10-25 km | 150 Kč |
| Nad 25 km | 10 Kč/km |
| Vzdálená podpora | ZDARMA |

### Paušály pro firmy
| Balíček | Zařízení | Cena |
|---------|----------|------|
| MINI | do 5 | 1 990 Kč/měs |
| STANDARD | do 15 | 3 990 Kč/měs |
| PREMIUM | 15+ | od 5 990 Kč/měs |

---

## SEO & Performance

- Meta tagy (description, keywords, author)
- Open Graph pro sociální sítě
- Twitter Card meta tagy
- Strukturovaná data (JSON-LD) - LocalBusiness
- Favicon (SVG + PNG fallback)
- Canonical URL
- Připraveno pro analytics:
  - Plausible (GDPR friendly)
  - Umami (self-hosted)
  - Google Analytics 4

---

## Struktura souborů

```
ajtak.it/
├── index.html      # Hlavní HTML (~600 řádků)
├── style.css       # Všechny styly (~1900 řádků)
├── script.js       # JavaScript (~900 řádků)
├── favicon.svg     # SVG favicon
└── TECHNOLOGIE.md  # Tato dokumentace
```

---

## Spuštění lokálně

```bash
cd ajtak.it
python3 -m http.server 8080
# Otevřít http://localhost:8080
```

---

## Deployment

Web je statický, lze nasadit na:
- **GitHub Pages** - zdarma, jednoduché
- **Netlify** - zdarma, automatický deploy z Gitu
- **Vercel** - zdarma, rychlé
- **Vlastní hosting** - plná kontrola

---

## Barevná paleta

| Barva | Hex | Použití |
|-------|-----|---------|
| Matrix Green | `#00ff41` | Primární akcent |
| Cyan | `#00d4ff` | Sekundární akcent |
| Background | `#0a0a0a` | Hlavní pozadí |
| Terminal BG | `#0c0c0c` | Pozadí terminálů |

---

## Kontakt

- **Web:** https://ajtak.it
- **Email:** info@ajtak.it
- **Autor:** Julius Joska
- **LinkedIn:** [/in/julius-joska](https://www.linkedin.com/in/julius-joska/)
- **GitHub:** [github.com/juliusjoska](https://github.com/juliusjoska)

---

*Vytvořeno v roce 2024 s pomocí Claude AI (Anthropic)*
