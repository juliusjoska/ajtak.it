# Servisní list ajtak.it — Dokumentace

## Vytvořené soubory

| Soubor | Popis |
|--------|-------|
| `SERVISNI_LIST_VZOR.html` | Plně interaktivní servisní list v Matrix designu |

## Nové funkce (v2.0)

### Toolbar s akcemi
- **Přidat řádek** — rychlé přidání řádku do vyúčtování
- **Duplikovat** — vytvoří kopii s novým číslem a datem
- **Nastavení** — otevře panel nastavení
- **Uložit** — export do JSON souboru
- **Reset** — vymaže vše a začne znovu
- **Vytisknout** — optimalizovaný tisk

### Panel nastavení (vysouvací)
- **Firemní údaje** — jednou nastavíš, trvale se uloží
- **Výchozí záruky** — přednastavené záruční doby
- **Zobrazení sekcí** — skrýt/zobrazit fotodokumentaci, poznámky, podpisy
- **Vlastní text do zápatí** — např. "Děkujeme za důvěru!"

### Interaktivní tabulky
- **Přidávání řádků** — tlačítko + u každé tabulky
- **Mazání řádků** — tlačítko × (zobrazí se při najetí)
- **Přesouvání řádků** — šipky ↑↓ pro změnu pořadí
- **Automatický výpočet** — množství × cena = celkem
- **Přepočet součtů** — tlačítko ∑ nebo automaticky

### Typ dokumentu
- **Servisní list** — výchozí
- **Prodejní doklad** — pro prodej HW/SW
- **Protokol konzultace** — pro konzultační služby

### Stavy zakázky (barevně odlišené)
- **Přijato** — zelená
- **V opravě** — oranžová
- **Hotovo** — cyan
- **Vydáno** — fialová

### Digitální podpisy
- Podpisová pole s canvas — můžeš podepsat myší nebo prstem
- Podpisy se tisknou

### Klávesové zkratky
| Zkratka | Akce |
|---------|------|
| `Ctrl+P` | Tisk |
| `Ctrl+S` | Uložit do souboru |
| `Ctrl+E` | Otevřít e-mail dialog |
| `Ctrl+N` | Přidat řádek |
| `Esc` | Zavřít modální okno |

### Odesílání e-mailem
- **E-mailový klient** — otevře výchozí e-mail (Outlook, Thunderbird, Mail...)
- **Kopírovat obsah** — pro webové e-maily (Gmail, Outlook.com...)
- **Předpřipravené šablony:**
  - Přijato do servisu
  - Oprava hotová
  - Vydáno
  - Vlastní text
- Automatické předvyplnění:
  - E-mail zákazníka z formuláře
  - Číslo zakázky do předmětu
  - Údaje o zařízení a ceně do textu
- Po odeslání nabídne vytvoření PDF přílohy

### Další vylepšení
- **Interní poznámky** — sekce, která se netiskne
- **Toast notifikace** — potvrzení akcí
- **Auto-save** — každých 10 sekund
- **Responzivní design** — funguje i na tabletu
- **Lepší tisk** — optimalizované barvy pro tisk

## Design

## Právní pokrytí

Servisní list splňuje požadavky následujících českých zákonů:

### 1. Občanský zákoník (zákon č. 89/2012 Sb.)
- **§ 2586–2619** — Smlouva o dílo
- **§ 2165–2174** — Práva z vadného plnění (reklamace)
- **§ 2428** — Nevyzvednuté věci (prodej po 6 měsících)
- Identifikace smluvních stran
- Popis předmětu díla
- Cena a způsob úhrady

### 2. Zákon o ochraně spotřebitele (zákon č. 634/1992 Sb.)
- **§ 13** — Informační povinnost
- **§ 19** — Reklamační řád
- Rozlišení spotřebitel vs. podnikatel
- 24měsíční záruční doba pro spotřebitele
- Informace o právech spotřebitele

### 3. Zákon o DPH (zákon č. 235/2004 Sb.)
- Náležitosti daňového dokladu
- Vyčíslení DPH
- IČ a DIČ

### 4. GDPR (Nařízení EU 2016/679)
- Identifikace správce údajů
- Účel zpracování
- Doba uchování
- Práva subjektu údajů
- Kontakt pro uplatnění práv

### 5. Zákon o účetnictví (zákon č. 563/1991 Sb.)
- Archivace dokladů 10 let

## Obsah servisního listu

### Povinné náležitosti
- [x] Identifikace poskytovatele (IČ, DIČ, adresa, kontakt)
- [x] Identifikace zákazníka
- [x] Typ zákazníka (spotřebitel/podnikatel/právnická osoba)
- [x] Číslo zakázky
- [x] Datum přijetí/vydání
- [x] Popis zařízení (typ, výrobce, S/N, heslo)
- [x] Stav zařízení při převzetí + fotodokumentace
- [x] Popis závady/požadavku
- [x] Provedené práce
- [x] Itemizovaný ceník
- [x] Celková cena vč. DPH
- [x] Způsob úhrady
- [x] Záruční podmínky
- [x] Obchodní podmínky
- [x] GDPR informace
- [x] Podpisy obou stran (přijetí i vydání)

### Právní ochrana poskytovatele
- [x] Omezení odpovědnosti za data
- [x] Ustanovení o nevyzvednutých zakázkách
- [x] Souhlas s diagnostikou předáním zařízení
- [x] Dokumentace stavu při převzetí

### Právní ochrana zákazníka
- [x] Jasné záruční podmínky
- [x] Reklamační poučení
- [x] GDPR práva
- [x] Lhůta pro vyřízení (30 dnů)

## Jak používat

### Spuštění
1. Otevřete `SERVISNI_LIST_VZOR.html` v prohlížeči (Chrome, Firefox, Edge)
2. Vyplňte pole přímo v prohlížeči
3. Nahrajte fotografie kliknutím na sloty

### Tisk
1. Klikněte na zelené tlačítko **„Vytisknout"** vpravo nahoře
2. Nebo použijte klávesovou zkratku `Ctrl + P`
3. Doporučené nastavení:
   - Formát: A4
   - Okraje: Minimální
   - Pozadí: Zapnuto (pro zachování barev)

### Před prvním použitím
1. Otevřete soubor v textovém editoru
2. Doplňte své údaje v sekci header:
   - IČ a DIČ
   - Adresu sídla
   - Telefonní číslo
3. Uložte jako svou verzi

### Workflow
1. **Příjem zakázky:**
   - Vyplnit údaje zákazníka
   - Vybrat typ zákazníka
   - Popsat zařízení a příslušenství
   - Vyfotit zařízení (4 sloty)
   - Zaznamenat viditelné poškození
   - Popsat požadavek zákazníka
   - Podpis zákazníka + zhotovitele
   - Vytisknout 2× (pro zákazníka + archiv)

2. **Po opravě:**
   - Přepnout stav na „Hotovo"
   - Popsat provedené práce
   - Vyplnit vyúčtování
   - Vyplnit záruční doby
   - Zákazník podepíše převzetí
   - Přepnout stav na „Vydáno"

3. **Archivace:**
   - Kopie pro zákazníka
   - Kopie pro poskytovatele (archiv 10 let)

## Číslování zakázek

Doporučený formát: `SL-RRRRMM-XXX`
- SL = Servisní List
- RRRRMM = Rok a měsíc (např. 202411)
- XXX = Pořadové číslo (001, 002, ...)

Příklad: `SL-202411-001`

## Záruční doby

### Doporučené standardy
| Typ zákazníka | Práce | Nové díly | Repasované díly |
|---------------|-------|-----------|-----------------|
| Spotřebitel   | 24 měs | 24 měs   | 12 měs          |
| Podnikatel    | 6 měs  | 12 měs   | 6 měs           |

## Tipy

- **Fotodokumentace** — Vždy foťte zařízení při převzetí, chrání vás i zákazníka
- **Heslo** — Pokud potřebujete heslo k zařízení, zapište ho (pole je volitelné)
- **Typ zákazníka** — Důležité pro určení záruční doby
- **Auto-save** — Data se ukládají automaticky, ale pro jistotu tiskněte hned po vyplnění

## Kontakt

**ajtak.it**
- Web: https://ajtak.it
- Email: info@ajtak.it
- Autor: Julius Joska

---

*Dokument vytvořen v souladu s českou legislativou platnou k roku 2024.*
