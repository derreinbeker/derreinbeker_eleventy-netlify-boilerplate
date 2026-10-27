# Der Reinbeker – Hinweise zum Erstellen von Artikeln

Eleventy-Website (Nunjucks + markdown-it mit `html: true`), gepflegt über Decap CMS (`admin/`).

## Artikel (Posts)

- Ablage: `posts/JJJJ-MM-TT_slug.md` (Muster wie im CMS, Umlaute im Slug sind üblich).
- Front Matter, Reihenfolge wie im CMS:
  ```yaml
  ---
  titleintro: Kurze Dachzeile
  title: Überschrift
  description: Kurzbeschreibung (ca. 200 Zeichen)
  authorname: Leif Sandtner
  date: 2026-10-27T09:45:00.000Z
  category: Politik   # Panorama | Kultur | Politik | Meinung
  tags:
    - Senioren
  ---
  ```
- URL ergibt sich automatisch aus `posts/posts.json`: `/{category}/{JJJJ}/{MM}/{title}/` (slugified).

## Bilder: Shortcode `imageWithCaption`

```
{% imageWithCaption "media/uploads/datei.jpg" "Alt-Text" "Bildunterschrift" %}
```

- Bilddateien nach `media/uploads/` legen, mit eindeutigem Präfix (z. B. `seniorenbeirat-2026-…`), damit vorhandene Dateien nicht überschrieben werden.
- Pfad ohne führenden Schrägstrich angeben.
- Bildunterschrift (3. Parameter) ist optional; ohne sie entsteht kein `<figcaption>`.
- **Immer eine Leerzeile vor dem Shortcode**, sonst erkennt das CMS ihn im Modus „Markdown“ nicht.
- **Leerzeile nach dem Shortcode**, wenn danach normaler Markdown-Text folgt (sonst wird der Text als Teil des HTML-Blocks nicht umgewandelt). Folgt direkt eine HTML-Zeile, ist das unkritisch.

## HTML in Posts

- HTML ist erlaubt. Zeilen **nicht einrücken** (4 Leerzeichen = Codeblock in Markdown).
- Leerzeilen innerhalb von HTML sind nur unkritisch, wenn die folgende Zeile wieder mit einem Block-Tag (`<div>`, `<li>`, `<p>`, `<h3>` …) beginnt.
- Eigenes CSS als `<style>`-Block im Post, Klassen mit post-spezifischem Präfix (z. B. `sbw-`), damit nichts anderes beeinflusst wird.
- Globale Regeln beachten (`_includes/assets/css/inline.css`): `article img` ist randabfallend (100vw, negative Ränder), `article figure` hat `display: table`, `article h2` ist rot und nicht fett – bei Bedarf im Post gezielt überschreiben.
- Farben über die vorhandenen CSS-Variablen (`--text-color`, `--red`, `--lightred`, `--border-color`), damit der Dunkelmodus funktioniert.
- Interne Links relativ (`/politik/…`), nicht mit `https://www.derreinbeker.de`.

## CMS-Hinweis

- Posts mit viel HTML im CMS im Modus „Markdown“ einfügen und speichern. Der Modus „Rich Text“ schreibt beim Speichern das gesamte Markdown neu und kann HTML verändern.
- Das CMS schreibt Shortcodes beim Speichern immer mit drei Parametern (ggf. `""`) – das ist in Ordnung.

## Prüfen

- Lokal: `npm run serve` (Bildverarbeitung über `sharp`, läuft nur mit den lokal installierten `node_modules`).
- Commits/Deploys nur auf ausdrückliche Anweisung.
