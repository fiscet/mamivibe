# Visual Editing Setup - Mamivibe

Questa documentazione descrive come è stato implementato il Visual Editing (modifica live) per il sito Mamivibe usando Sanity Presentation Tool.

## Panoramica

Il Visual Editing permette agli editor di modificare i contenuti direttamente dal sito web, vedendo le modifiche in tempo reale. Funziona attraverso:

1. **Presentation Tool** nello Studio Sanity - mostra il sito in un iframe
2. **Draft Mode** di Next.js - permette di vedere le bozze non pubblicate
3. **Stega Encoding** - rende i campi cliccabili per l'editing

## File Creati/Modificati

### Frontend (Next.js)

| File | Descrizione |
|------|-------------|
| `src/lib/sanity.config.ts` | Configurazione condivisa Sanity |
| `src/lib/sanity.client.ts` | Client con supporto preview e stega |
| `src/app/api/draft/route.ts` | API per attivare Draft Mode |
| `src/app/api/disable-draft/route.ts` | API per disattivare Draft Mode |
| `src/components/VisualEditing.tsx` | Componente per overlay editing |
| `src/app/layout.tsx` | Modificato per includere VisualEditing |

### Studio Sanity

| File | Descrizione |
|------|-------------|
| `studio/sanity.config.ts` | Aggiunto presentationTool |
| `studio/.env.example` | Variabili d'ambiente esempio |

## Configurazione Richiesta

### 1. Creare un Token API Sanity

1. Vai su [Sanity Manage](https://www.sanity.io/manage)
2. Seleziona il progetto `mamivibe`
3. Vai su **API** → **Tokens**
4. Crea un nuovo token con permessi **Viewer** (lettura bozze)
5. Copia il token

### 2. Configurare le Variabili d'Ambiente

**Frontend (.env.local):**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=2ta16y4a
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<il-tuo-token>
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333
```

**Studio (studio/.env.local):**
```env
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000
```

### 3. Avviare i Server

In due terminali separati:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Studio
cd studio && npm run dev
```

## Come Usare il Visual Editing

1. Apri lo Studio Sanity (http://localhost:3333)
2. Clicca su **"Presentation"** nella barra laterale
3. Il sito verrà caricato in un iframe
4. Clicca su qualsiasi testo per modificarlo
5. Le modifiche appariranno in tempo reale

## Architettura

```
┌─────────────────────────────────────────────────────────────┐
│                    Sanity Studio                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Presentation Tool                       │    │
│  │  ┌───────────────────────────────────────────────┐  │    │
│  │  │                                               │  │    │
│  │  │           Next.js Site (iframe)               │  │    │
│  │  │                                               │  │    │
│  │  │   [Click su testo] ──────────────────────┐   │  │    │
│  │  │                                          │   │  │    │
│  │  └──────────────────────────────────────────│───┘  │    │
│  │                                             │       │    │
│  │  ┌──────────────────────────────────────────▼───┐  │    │
│  │  │           Editor Panel                       │  │    │
│  │  │   Modifica il campo selezionato             │  │    │
│  │  └──────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Flusso di Dati

```
1. Editor clicca "Presentation" nello Studio
   │
   ▼
2. Studio chiama /api/draft per attivare Draft Mode
   │
   ▼
3. Next.js imposta cookie __prerender_bypass
   │
   ▼
4. Tutte le query usano perspective: 'previewDrafts'
   │
   ▼
5. I dati includono stega encoding (metadati invisibili)
   │
   ▼
6. VisualEditing component legge stega e mostra overlay
   │
   ▼
7. Click su elemento → Studio apre editor per quel campo
   │
   ▼
8. Modifica salvata → Listener aggiorna iframe in real-time
```

## Limitazioni

- Solo i contenuti gestiti da Sanity sono editabili
- Non è possibile modificare layout, CSS o logica
- Richiede connessione internet (per comunicare con Sanity)
- Le immagini richiedono upload separato

## Troubleshooting

### Il sito non si carica nell'iframe

1. Verifica che il frontend sia in esecuzione su `localhost:3000`
2. Controlla la console del browser per errori CORS
3. Verifica che `SANITY_STUDIO_PREVIEW_URL` sia corretto

### I campi non sono cliccabili

1. Verifica che `SANITY_API_READ_TOKEN` sia configurato
2. Controlla che il token abbia permessi di lettura
3. Verifica che Draft Mode sia attivo (controlla i cookie)

### Le modifiche non appaiono in tempo reale

1. Verifica la connessione internet
2. Controlla la console per errori WebSocket
3. Ricarica la pagina nello Studio

## Produzione e Studio Online

### Configurazione per Studio Deployato

Lo Studio può essere deployato su Sanity con `sanity deploy`. Per farlo funzionare con il Visual Editing:

1. **Deploy dello Studio:**
```bash
cd studio
sanity deploy
```
Scegli un nome (es: `mamivibe`) → Lo studio sarà su `https://mamivibe.sanity.studio`

2. **Configura CORS su Sanity:**
   - Vai su https://www.sanity.io/manage/project/2ta16y4a/api
   - Sezione **CORS origins**
   - Aggiungi: `https://www.mamivibe.hu` con credenziali abilitate

3. **Variabili d'ambiente in produzione (Vercel/hosting):**
```env
SANITY_API_TOKEN=<il-tuo-token>
NEXT_PUBLIC_SANITY_STUDIO_URL=https://mamivibe.sanity.studio
```

### Come Funziona

```
┌─────────────────────────────────────────────────────────────┐
│           Studio Online (mamivibe.sanity.studio)            │
│                                                             │
│   Presentation Tool carica:                                 │
│   https://www.mamivibe.hu in iframe                        │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                                                     │  │
│   │     www.mamivibe.hu (in Draft Mode)                │  │
│   │                                                     │  │
│   └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Sviluppo Locale vs Produzione

| Ambiente | Studio URL | Frontend URL |
|----------|------------|--------------|
| Locale | http://localhost:3333 | http://localhost:3000 |
| Produzione | https://mamivibe.sanity.studio | https://www.mamivibe.hu |

Per sviluppo locale, crea `studio/.env.local`:
```env
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000
```

In produzione (Studio deployato), il default è già `https://www.mamivibe.hu`.

## Pacchetti Installati

**Frontend:**
- `@sanity/visual-editing` - Overlay per editing
- `@sanity/preview-url-secret` - Validazione URL preview

**Studio:**
- `sanity/presentation` - Presentation Tool (incluso in sanity v5)
