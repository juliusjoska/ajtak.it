# ajtak.it - Správa obsahu

Obsah webu lze upravovat bez zásahu do kódu pomocí JSON souborů ve složce `data/`.

## Struktura souborů

```
ajtak.it/
├── data/
│   ├── blog.json      # Články na blogu
│   ├── pricing.json   # Ceník služeb
│   ├── portfolio.json # Portfolio ukázky
│   └── config.json    # Obecné nastavení webu
├── media/
│   └── portfolio/     # Obrázky a videa pro portfolio
└── ...
```

---

## Blog - `data/blog.json`

### Přidání nového článku

Otevři `data/blog.json` a přidej nový objekt do pole `posts`:

```json
{
  "id": "muj-novy-clanek",
  "title": "Název článku",
  "date": "2025-01-15",
  "category": "Hardware",
  "readTime": 5,
  "excerpt": "Krátký popis článku pro náhled...",
  "content": [
    {
      "type": "paragraph",
      "text": "Úvodní odstavec článku."
    },
    {
      "type": "heading",
      "text": "Nadpis sekce"
    },
    {
      "type": "list",
      "items": [
        "První položka seznamu",
        "Druhá položka seznamu",
        "Třetí položka seznamu"
      ]
    },
    {
      "type": "paragraph",
      "text": "Další odstavec textu..."
    }
  ]
}
```

### Typy obsahu v článku

| Typ | Popis | Příklad |
|-----|-------|---------|
| `paragraph` | Běžný odstavec | `{"type": "paragraph", "text": "Text..."}` |
| `heading` | Nadpis sekce | `{"type": "heading", "text": "Nadpis"}` |
| `list` | Seznam odrážek | `{"type": "list", "items": ["a", "b", "c"]}` |

### Kategorie článků

Doporučené kategorie: `Bezpečnost`, `Hardware`, `Sítě`, `Tipy`, `Software`, `Windows`, `Linux`

---

## Ceník - `data/pricing.json`

### Struktura

```json
{
  "hourlyRates": {
    "title": "HODINOVÁ_SAZBA",
    "items": [
      { "name": "Popis služby", "price": "850 Kč/h" },
      { "name": "Urgentní zásah", "price": "1 800 Kč/h", "highlight": true }
    ]
  },
  "travel": {
    "title": "VÝJEZDY",
    "baseLocation": "Příbram",
    "items": [...]
  },
  "subscriptions": {...},
  "services": {
    "opravy": {
      "title": "opravy_servis.sh",
      "cardTitle": "OPRAVY_&_SERVIS",
      "icon": "🔧",
      "startingPrice": "600 Kč",
      "priceLabel": "od",
      "features": ["Feature 1", "Feature 2"],
      "pricing": [
        { "name": "Služba", "price": "600 Kč" },
        { "name": "Služba zdarma", "price": "ZDARMA", "free": true }
      ]
    }
  }
}
```

### Speciální příznaky položek

| Příznak | Efekt |
|---------|-------|
| `"highlight": true` | Zvýrazní položku (cyan barva) |
| `"free": true` | Zelená barva pro ZDARMA položky |
| `"bonus": true` | Bonus položka (kurzíva) |

---

## Portfolio - `data/portfolio.json`

### Přidání nové ukázky

```json
{
  "id": "unikatni-id",
  "title": "Název projektu",
  "description": "Krátký popis projektu",
  "category": "hardware",
  "mediaType": "image",
  "mediaUrl": "media/portfolio/obrazek.jpg",
  "placeholderIcon": "💻",
  "year": 2024
}
```

### Kategorie

Definované v poli `categories`:
- `hardware` - Hardware projekty
- `network` - Síťové projekty
- `cctv` - Kamerové systémy
- `software` - Software projekty

### Typy médií

| Typ | Popis |
|-----|-------|
| `image` | Obrázek (jpg, png, webp) |
| `video` | Video (mp4) |

### Nahrání obrázků/videí

1. Nahraj soubor do `media/portfolio/`
2. Nastav `mediaUrl` na správnou cestu

---

## Konfigurace - `data/config.json`

### Základní nastavení

```json
{
  "site": {
    "name": "ajtak.it",
    "email": "info@ajtak.it",
    "phone": "na vyžádání"
  },
  "location": {
    "city": "Příbram",
    "country": "Česká republika"
  },
  "hero": {
    "roles": ["Role 1", "Role 2"],
    "status": "AVAILABLE"
  }
}
```

### Hero texty (animované role)

Uprav pole `hero.roles` pro změnu rotujících textů na hlavní stránce:

```json
"roles": [
  "Opravy PC & notebooků",
  "Sítě & WiFi instalace",
  "Váš osobní ajťák"
]
```

### Statistiky

```json
"stats": {
  "yearsInIT": 6,
  "clients": 50,
  "certifications": 10
}
```

---

## Časté operace

### Změna ceny služby

1. Otevři `data/pricing.json`
2. Najdi službu v `services.NAZEV.pricing`
3. Uprav `price` hodnotu
4. Ulož soubor

### Přidání článku na blog

1. Otevři `data/blog.json`
2. Přidej nový objekt do pole `posts`
3. Nastav unikátní `id` (použije se v URL)
4. Ulož soubor

### Aktualizace kontaktních údajů

1. Otevři `data/config.json`
2. Uprav sekci `site`
3. Ulož soubor

---

## Poznámky

- Po úpravě JSON souboru stačí obnovit stránku (F5)
- JSON musí být validní - používej [jsonlint.com](https://jsonlint.com) pro kontrolu
- Obrázky pro portfolio: doporučený poměr stran 16:10
- Datumy ve formátu: `YYYY-MM-DD` (např. `2025-01-15`)

---

## Příklad: Přidání nového článku

```json
// V data/blog.json, do pole "posts" přidej:
{
  "id": "jak-zrychlit-pocitac",
  "title": "5 způsobů jak zrychlit starý počítač",
  "date": "2025-01-20",
  "category": "Tipy",
  "readTime": 6,
  "excerpt": "Nemáte na nový počítač? Vyzkoušejte těchto 5 tipů, které vám pomohou zrychlit ten stávající...",
  "content": [
    {
      "type": "paragraph",
      "text": "Starý počítač nemusí znamenat pomalý počítač. S pár jednoduchými úpravami můžete dramaticky zlepšit jeho výkon."
    },
    {
      "type": "heading",
      "text": "1. Vyměňte HDD za SSD"
    },
    {
      "type": "paragraph",
      "text": "Nejefektivnější upgrade vůbec. Rozdíl poznáte okamžitě."
    },
    {
      "type": "heading",
      "text": "2. Přidejte RAM"
    },
    {
      "type": "paragraph",
      "text": "8 GB je dnes minimum, 16 GB ideál pro běžnou práci."
    },
    {
      "type": "heading",
      "text": "Potřebujete pomoct?"
    },
    {
      "type": "paragraph",
      "text": "Ozvěte se mi, poradím vám co přesně váš počítač potřebuje."
    }
  ]
}
```
