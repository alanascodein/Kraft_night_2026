# 🌾 KrishiSahayak AI

> **One Farmer's Problem, Everyone's Protection.**

KrishiSahayak AI is a cooperative AI-powered agricultural platform
designed to connect farmers, cooperative/FPO groups, agricultural
officers, shared resources, an open global community chat, and
community knowledge.

Instead of treating every farmer's problem as an isolated incident,
KrishiSahayak turns individual needs and reports into **collective
action, shared resources, early risk signals, verified decisions, and
reusable agricultural knowledge**.

------------------------------------------------------------------------

## 🚜 The Problem

Agricultural communities often work in isolation:

-   Farmers face common resource and crop-related problems
    independently.
-   Nearby farmers may need the same machinery, irrigation equipment,
    inputs, or transport.
-   Agricultural officers may receive multiple similar reports without
    an easy way to see the regional pattern.
-   Group-level subsidy opportunities can be difficult to organize.
-   Important information is often scattered between farmers and
    officers.
-   Successful farmer practices may remain local instead of becoming
    organized community knowledge.
-   Farmers have no open, shared place to ask questions, discuss
    problems, and learn from farmers and officers beyond their own
    group or locality.

### Core Problem

> **Farmers have information and resources around them, but the
> connections between those resources are weak.**

KrishiSahayak AI creates a cooperative intelligence layer that helps
those connections happen.

------------------------------------------------------------------------

# 💡 Our Solution

KrishiSahayak AI combines **AI + farmer cooperation + human
verification**.

``` text
                FARMERS
                   │
                   ▼
          Cooperative Groups
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
 Shared Resources  Risks    Knowledge
        │          │          │
        └──────────┼──────────┘
                   ▼
     Smart Layer (rules + AI extraction)
                   │
                   ▼
           Agricultural Officer
                   │
             Verify / Decide
                   │
                   ▼
          Community / Group
```

AI reads photos and messy text and turns them into structured data.
Simple rules and database queries handle matching and pattern
detection.

**Human agricultural officers remain responsible for verification and
official decisions.**

------------------------------------------------------------------------

# 🌱 Key Features

## 1. Cooperative Farm Groups

Farmers can form or join **FPO/cooperative groups**.

Groups provide a common space for farmers with shared crops, locations,
needs, or agricultural activities.

### Group capabilities

-   Create a cooperative/FPO group
-   Join an existing group
-   View group members
-   Identify shared requirements
-   Coordinate resources
-   Collaborate on cases and applications
-   Share useful farming knowledge

### Example

``` text
Farmer A ─┐
Farmer B ─┤
Farmer C ─┼── Local Farmer Cooperative
Farmer D ─┤
Farmer E ─┘
```

------------------------------------------------------------------------

# 🤝 2. Shared Resource Matching

The platform identifies farmers who need similar resources by grouping
open needs by resource type and area. No AI is needed, because farmers
pick the resource type from a list.

Resources can include:

-   Irrigation equipment
-   Agricultural machinery
-   Seeds
-   Fertilizers and inputs
-   Transport
-   Other shared farm resources

### Example

``` text
Farmer A → Needs irrigation equipment
Farmer B → Needs irrigation equipment
Farmer C → Needs irrigation equipment
Farmer D → Needs irrigation equipment
Farmer E → Needs irrigation equipment

                    ↓

           System detects match

                    ↓

"5 nearby farmers have a
similar irrigation requirement."

                    ↓

Suggested coordinated
procurement / shared usage
```

The goal is to turn separate requirements into a coordinated community
opportunity.

------------------------------------------------------------------------

# 💰 3. Cooperative Subsidy Management

KrishiSahayak extends subsidy assistance from individual farmers to
cooperative groups.

The system matches groups to relevant schemes using **authoritative,
officer-managed scheme data** and eligibility rules checked in code.

### Group subsidy workflow

``` text
Farmer Group
     ↓
Group Profile
     ↓
Official Scheme Data
     ↓
Eligibility / Rule Matching
     ↓
Potential Group Subsidies
     ↓
Required Documents
     ↓
Combined Application Checklist
```

### System responsibilities

The system (rules and stored scheme data, not AI) can:

-   Check group eligibility against officer-entered rules
-   Build the document checklist from each scheme's stored required
    documents
-   List the application steps

AI is optional here, only to explain official scheme text in plain
language.

Neither the system nor AI should **invent eligibility rules, subsidy
amounts, or deadlines**.

Official scheme information remains authoritative.

------------------------------------------------------------------------

# 👨‍🌾 4. Officer ↔ Farmer Collaboration

KrishiSahayak creates a structured collaboration loop between
agricultural officers and farmer groups.

### Workflow

``` text
Officer creates case
        ↓
Farmers provide information
        ↓
Structured responses are collected and organized
        ↓
Officer reviews information
        ↓
Officer verifies
        ↓
Decision / guidance shared with group
```

This reduces repetitive information gathering while keeping the final
decision with the authorized officer.

### Officer capabilities

-   Create cases
-   Request information
-   Review farmer responses
-   View organized farmer responses
-   Verify information
-   Add official guidance
-   Close or escalate cases

------------------------------------------------------------------------

# 📸 5. Photo-Based Crop Reports

This is the main place KrishiSahayak uses AI.

A farmer uploads a photo of a crop problem. The AI reads the photo and
extracts the visible details, so the farmer does not have to fill in a
long form.

### Flow

``` text
Farmer uploads photo → Supabase Storage
        ↓
Server-side call to OpenAI (vision) with the image + a prompt
        ↓
Structured details: crop, affected part, visible symptoms,
severity, photo quality
        ↓
Report form is pre-filled
        ↓
Farmer confirms or edits
        ↓
Saved to Supabase as an unverified, AI-extracted report
        ↓
Rule-based similar-report matching (see Collective Farm Risk Alerts)
```

### What the AI extracts

-   Crop
-   Affected plant part
-   Visible symptoms
-   Approximate severity
-   Whether the photo is clear enough (or "unclear")

Farmers can also describe the problem in their own words. The AI turns
that text into the same structured fields.

### Principles

-   **Extract, don't diagnose.** The AI describes what is visible and
    does not name a disease with certainty.
-   The farmer always confirms or edits before saving.
-   Saved reports are labeled AI-extracted and unverified until an
    officer reviews them.
-   If the AI fails or the photo is unclear, the farmer fills in the
    form manually.
-   GPS/EXIF data is removed from photos. Only an approximate area is
    used.
-   No training is needed. It uses the hosted OpenAI API with a prompt.

------------------------------------------------------------------------

# 🚨 6. Collective Farm Risk Alerts

One of the most important intelligence features is **community-level
risk detection**.

If several nearby farmers report similar crop problems, KrishiSahayak
can identify a potential regional pattern. Report details come from
Photo-Based Crop Reports, and the pattern is found with a simple rule,
not AI.

### Example

``` text
Farm 1 ─┐
Farm 2 ─┤
Farm 3 ─┤
Farm 4 ─┼── Similar crop problem
Farm 5 ─┤
Farm 6 ─┘
          │
          ▼
  Rule-based Pattern Detection
          │
          ▼
   Potential regional issue
          │
          ▼
 Agricultural Officer
          │
          ▼
   Human verification
          │
          ▼
     Community alert
```

The system can compare:

-   Crop
-   Symptoms
-   Location
-   Time period
-   Similar reported problems
-   Repeated occurrences

### How the rule works

When the number of reports with the same crop and symptom in the same
area within a set time window reaches a threshold, the system sends a
signal to the officer. For example: 6 reports of leaf spots on paddy in
one panchayat within 5 days. The officer can see the exact rule that
fired.

### Important principle

A detected pattern is a **signal**, not a confirmed outbreak.

The relevant officer verifies the situation before an official warning
is treated as authoritative.

------------------------------------------------------------------------

# 📚 7. Knowledge Sharing

Farmers can share successful practices and experiences with the
community.

Examples:

-   A treatment that appeared effective
-   Irrigation practices
-   Pest-management practices
-   Crop-specific techniques
-   Local farming solutions
-   Resource-sharing experiences

Contributions are organized by (chosen on the post form):

-   Crop
-   Location
-   Problem
-   Practice
-   Topic

### Verified vs. Experience

KrishiSahayak clearly distinguishes:

**Farmer Experience**

> "This worked for my farm."

from

**Verified Agricultural Guidance**

> Information reviewed or provided by an authorized agricultural
> officer/expert.

This prevents community experiences from being presented as official
agricultural advice.

------------------------------------------------------------------------

# 💬 8. Global Community Chat

KrishiSahayak includes an open, **Reddit-style community space** where
every farmer, officer, and expert on the platform can ask questions,
start discussions, share experiences, and learn from each other, beyond
their own cooperative group.

Cooperative groups are focused spaces for local coordination. The
Global Community Chat is the open town square of the platform.

### Structure

``` text
Global Community Chat
        │
        ├── Boards (like subreddits)
        │      ├── Crops    → Paddy, Coconut, Banana, Pepper ...
        │      ├── Topics   → Pests & Disease, Irrigation,
        │      │              Machinery, Subsidies ...
        │      └── Regions  → District / Panchayat boards
        │
        └── Posts
               ├── Threaded comments
               ├── Upvotes / downvotes
               └── Flairs (Question, Experience, Alert ...)
```

### Community capabilities

-   Browse boards by crop, topic, or region
-   Create posts with text and optional images
-   Reply in threaded comments
-   Upvote or downvote posts and comments
-   Sort by Hot, New, Top, or Verified
-   Search and filter by crop, topic, or flair
-   Follow boards and save useful posts
-   See new posts and replies appear live
-   Report posts that are spam, unsafe, or misleading

### Post flairs

Flairs keep the community organized and make the difference between
opinion and official guidance obvious.

| Flair | Meaning | Who can use it |
|---|---|---|
| Question | Farmer asking for help | Everyone |
| Farmer Experience | "This worked for my farm" | Everyone |
| Crop Problem | Symptoms or crop issue report | Everyone |
| Resource Need / Offer | Looking for or offering shared equipment | Everyone |
| Discussion | General conversation | Everyone |
| Verified Guidance | Reviewed by an authorized officer or expert | Officers / Experts |
| Official Announcement | Scheme or advisory updates from official information | Officers |

### Group vs. Global Chat

| | Cooperative Group | Global Community Chat |
|---|---|---|
| Access | Members of the group | All platform users |
| Purpose | Local coordination, shared resources, group subsidies | Open questions, discussion, learning |
| Style | Focused workspace | Reddit-style boards and threads |

### Verified vs. community replies

The same principle as Knowledge Sharing applies here.

-   Replies from officers and experts carry a **Verified** badge and can
    be pinned above other replies.
-   Everyone else's replies appear as community replies.
-   Upvotes show popularity, **not correctness**. A highly upvoted
    farmer reply does not become official guidance.

### Moderation

Reported posts go to officers or designated moderators for review.
People decide what is removed, corrected, or verified.

### No AI in the Global Chat

The Global Community Chat is a space for people to talk to each other.
It contains no AI features. Search and filtering use normal database
queries.

### Global chat flow

``` text
Farmer asks / posts
        ↓
Community replies and votes
        ↓
Officer or expert replies (Verified badge)
        ↓
Verified reply pinned for everyone
```

------------------------------------------------------------------------

# 🔄 The KrishiSahayak Cooperative Loop

The platform is built around a continuous cycle:

``` text
             FARMER
                │
                ▼
        Need / Problem / Idea
                │
                ▼
            System
                │
       ┌────────┼────────┐
       ▼        ▼        ▼
    Matching  Pattern  Organizing
       │        │        │
       └────────┼────────┘
                ▼
           COMMUNITY
                │
                ▼
            OFFICER
                │
          Verify / Decide
                │
                ▼
        Group / Farmers
                │
                ▼
       Shared Knowledge
```

### Core philosophy

> **One farmer's contribution can become another farmer's solution.**

------------------------------------------------------------------------

# 🧠 AI Responsibilities

KrishiSahayak does not use AI as a replacement for agricultural
professionals.

AI is used narrowly, where the input is messy and simple code cannot
handle it: **reading photos and free text and turning them into
structured data**.

### AI is used for

-   Extracting crop details from uploaded photos
-   Turning free-text problem descriptions into structured fields
-   Explaining official scheme text in plain language (optional)

### Rules and database queries handle

-   Resource matching (grouping needs by resource type and area)
-   Similar-report and regional risk pattern detection (same crop,
    symptom, and area within a time window)
-   Subsidy eligibility checks and document checklists
-   Organizing farmer responses to officer cases
-   Knowledge categorization (chosen on the post form)
-   Global chat search and filtering

### AI should not

-   Make final agricultural decisions
-   Diagnose a crop disease with certainty from a photo
-   Invent subsidy rules
-   Invent official deadlines
-   Present unverified farmer experiences as official guidance
-   Replace agricultural officers or experts

------------------------------------------------------------------------

# 🏗️ Technology Stack

This project is intentionally built using the technologies permitted for
the hackathon.

  -----------------------------------------------------------------------
  Technology                          Purpose
  ----------------------------------- -----------------------------------
  **HTML5**                           Frontend structure

  **CSS3**                            Responsive UI and styling

  **JavaScript**                      Frontend logic and interactions

  **Supabase**                        Database, authentication, storage,
                                      realtime features

  **OpenAI**                          AI photo and text extraction
                                      into structured data
  -----------------------------------------------------------------------

### Architecture

``` text
                 Web Browser
                     │
              HTML / CSS / JS
                     │
                     ▼
                 Supabase
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       Auth       Database    Storage
          │          │
          └──────────┼──────────┘
                     │
                     ▼
                  OpenAI
                     │
              AI Processing
                     │
                     ▼
            Structured Results
                     │
                     ▼
              Supabase / UI
```

**Security principle:** the OpenAI API key must never be exposed in
client-side JavaScript.

### Global Community Chat on the existing stack

The Global Community Chat uses only the technologies already listed
above. No new technology is added, and the chat uses no AI.

| Chat need | Existing technology |
|---|---|
| Sign-in, roles, and Verified badges | Supabase Auth |
| Boards, posts, comments, votes, reports | Supabase database (PostgreSQL) |
| New posts and replies appearing live | Supabase Realtime |
| Post images | Supabase Storage |
| Search and filtering | Supabase database (PostgreSQL full-text search) |
| Feed, threads, voting, and forms | HTML5, CSS3, JavaScript |

------------------------------------------------------------------------

# 🗄️ Planned Data Model

The platform can use Supabase/PostgreSQL for the following entities:

``` text
profiles
    │
    ├── farmer profiles
    ├── officer profiles
    └── expert profiles

farm_groups
    │
    └── group_members

resource_needs
    │
    └── resource_matches

farmer_reports  (photo, AI-extracted fields, confirmed fields, status)
    │
    └── risk_patterns  (rule-based report counts)

officer_cases
    │
    └── case_responses

subsidy_schemes
    │
    └── cooperative_applications

knowledge_posts
    │
    └── verified_guidance

community_boards
    │
    └── community_posts
            │
            ├── post_comments
            ├── post_votes
            ├── post_reports
            └── board_follows

notifications
```

The exact schema can evolve during implementation.

------------------------------------------------------------------------

# 👥 User Roles

## Farmer

Farmers can:

-   Create a profile
-   Create/join cooperative groups
-   Submit crop problems with a photo
-   Report resource requirements
-   View resource matches
-   Participate in officer cases
-   View community risk alerts
-   Share farming experiences
-   View organized agricultural knowledge
-   Participate in group subsidy workflows
-   Post, comment, and vote in the Global Community Chat
-   Follow boards and save useful posts

## Agricultural Officer

Officers can:

-   View farmer reports
-   Review potential regional patterns flagged by the system
-   Create collaboration cases
-   Request information
-   Review organized farmer responses
-   Verify information
-   Publish official guidance
-   Confirm or reject risk signals
-   Manage authoritative subsidy information
-   Reply with verified answers and pin verified guidance in the Global
    Community Chat
-   Review reported posts and turn relevant posts into cases

## Expert / Specialist

Experts can support escalated or specialized agricultural cases where
additional expertise is required. They can also give expert-badged
replies in the Global Community Chat.

------------------------------------------------------------------------

# 🔐 Human-in-the-Loop Design

KrishiSahayak follows a human-in-the-loop model.

``` text
System Signal / AI Extraction
     ↓
Human Review
     ↓
Verification
     ↓
Official Guidance
```

This is particularly important for:

-   Crop disease/risk alerts
-   Agricultural recommendations
-   Subsidy information
-   Group decisions
-   Global chat verified replies and moderation

AI and simple rules help people make sense of information, while
authorized humans
remain responsible for decisions requiring professional or official
judgment.

------------------------------------------------------------------------

# 📍 Privacy & Location

Location can be useful for identifying nearby resource needs and
potential crop-risk patterns.

However, the platform should avoid exposing unnecessary exact farmer
locations.

Where possible, community-level information should be presented using:

-   Panchayat
-   Locality
-   Approximate area
-   Aggregated cluster information

rather than unnecessarily exposing individual farm coordinates.

The same applies to the Global Community Chat: posts show a display name
and, at most, an approximate area. Users should not need to share exact
farm locations to take part, and image uploads should not expose precise
location data.

------------------------------------------------------------------------

# 🧪 Example End-to-End Scenario

### Scenario: Shared Irrigation Requirement

Five nearby farmers are independently looking for irrigation equipment.

``` text
Farmer A → Irrigation pump
Farmer B → Irrigation pump
Farmer C → Irrigation pump
Farmer D → Irrigation pump
Farmer E → Irrigation pump
```

KrishiSahayak identifies the common requirement.

``` text
Matching query
 ↓
5 similar resource needs
 ↓
Nearby farmers
 ↓
Suggested cooperative procurement/shared use
 ↓
Farmer group coordinates
```

### Scenario: Collective Crop Risk

Several farmers report similar symptoms on the same crop.

``` text
Multiple photo reports
(AI extracts details)
       ↓
Rule detects similarity
       ↓
Potential local pattern
       ↓
Officer receives signal
       ↓
Officer verifies
       ↓
Verified community warning
```

### Scenario: Global Community Discussion

A farmer asks a question in a crop board of the Global Community Chat.

``` text
Farmer posts in the Paddy board
"Brown spots on leaves after heavy rain"
       ↓
Other farmers reply and upvote
       ↓
Officer replies with verified guidance
       ↓
Reply is pinned for everyone
```

This shows how open discussion can reach verified guidance, with no AI
involved.

This demonstrates the central idea of KrishiSahayak:

> **Individual information becomes collective protection.**

------------------------------------------------------------------------

# 🚀 MVP / Hackathon Implementation

The project is being developed as a focused hackathon prototype.

### Core demonstration

``` text
1. Farmer creates/joins group
             ↓
2. Farmers submit shared needs
             ↓
3. System identifies common requirements
             ↓
4. Farmers submit photo crop reports (AI extracts details)
             ↓
5. Rules detect similar reports
             ↓
6. Officer reviews the signal
             ↓
7. Officer verifies
             ↓
8. Community receives the verified result
             ↓
9. Knowledge can be shared back into the network
             ↓
10. Farmers discuss in the Global Community Chat
             ↓
11. Officer adds a verified reply
```

### Feature Priority

#### Core

-   [x] Initial responsive landing page
-   [x] Cooperative agriculture concept
-   [x] Cooperative farm groups
-   [x] Shared resource matching concept
-   [x] Collective farm risk alerts
-   [x] Officer ↔ Farmer collaboration concept
-   [x] Cooperative subsidy workflow
-   [x] Knowledge sharing workflow
-   [x] Global community chat (Reddit-style) concept
-   [x] Photo-based crop report concept

#### Integration

-   [ ] Supabase authentication
-   [ ] Supabase database
-   [ ] Farmer/group data
-   [ ] Resource-needs matching
-   [ ] OpenAI integration
-   [ ] Photo-based report extraction (OpenAI vision)
-   [ ] Rule-based similar-report detection
-   [ ] Officer dashboard
-   [ ] Verification workflow
-   [ ] Risk notifications
-   [ ] Global chat boards, posts, and threaded comments
-   [ ] Upvote/downvote and Hot/New/Top sorting
-   [ ] Realtime posts and replies
-   [ ] Verified badge and pinned verified replies
-   [ ] Post reporting and moderation queue

#### Extended

-   [ ] Expert escalation
-   [ ] Advanced cooperative subsidy management
-   [ ] Treatment/outcome tracking
-   [ ] Advanced analytics
-   [ ] Malayalam language support
-   [ ] Advanced location visualization
-   [ ] Image attachments on posts
-   [ ] Board following and reply notifications
-   [ ] Optional AI case summaries and plain-language scheme explanations

------------------------------------------------------------------------

# 📁 Current Frontend Structure

``` text
KrishiSahayak/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
└── assets/
```

### `index.html`

Contains:

-   Navigation
-   Hero section
-   Feature cards
-   Cooperative workflow
-   About section
-   Footer

### `style.css`

Contains:

-   Responsive layout
-   Navigation styling
-   Hero design
-   Feature cards
-   Buttons
-   Cooperative workflow styling
-   Mobile responsiveness

### `app.js`

Currently handles:

-   Smooth scrolling
-   Get Started interaction
-   Feature navigation
-   Login placeholder interaction
-   Feature-card interaction
-   Frontend initialization

### Planned: Global Community Chat UI

The Global Community Chat will be added as a new section of the same
frontend, using the existing HTML, CSS, and JavaScript files. No new
frameworks or technologies are introduced.

------------------------------------------------------------------------

# 🔒 Environment Variables

Never commit secrets to GitHub.

When the AI and Supabase integrations are connected, sensitive
credentials should be stored securely.

Example:

``` env
SUPABASE_URL=
SUPABASE_ANON_KEY=
OPENAI_API_KEY=
```

The **OpenAI API key must remain server-side** and must not be placed
directly in `index.html` or `app.js`.

------------------------------------------------------------------------

# ⚠️ Limitations

KrishiSahayak is designed as a decision-support and coordination
platform.

### AI limitations

AI is used only to extract details from photos and text. Extracted
details can be incorrect or incomplete, so the farmer confirms them and
important agricultural decisions require human verification.

### Subsidy limitations

Subsidy information should come from authoritative scheme data. AI
should explain that information rather than invent policy details.

### Risk detection limitations

A cluster detected by the system is only a potential signal until an authorized
agricultural officer verifies it.

### Community knowledge limitations

Farmer experiences are valuable but should remain clearly separated from
verified agricultural guidance.

### Global chat limitations

Posts and comments are user-generated and unverified unless marked by an
officer or expert. Upvotes do not prove correctness, and moderation decisions require
human review.

------------------------------------------------------------------------

# 🎯 Impact

KrishiSahayak aims to create value at three levels.

### For Farmers

-   Easier access to agricultural support
-   Better cooperation with nearby farmers
-   Shared access to resources
-   Group-level opportunities
-   Faster awareness of local risks
-   Organized community knowledge
-   An open place to ask questions and learn from other farmers

### For Agricultural Officers

-   Less repetitive information gathering
-   Better visibility into regional patterns
-   Structured farmer responses
-   Photo reports with structured details
-   Human-controlled decision making
-   Visibility into common questions and emerging concerns in open
    discussions

### For the Agricultural Community

-   Shared resources
-   Collective risk awareness
-   Reusable knowledge
-   Stronger cooperation
-   Better information flow between farmers and institutions
-   Searchable, organized public discussions

------------------------------------------------------------------------

# 🌍 Vision

KrishiSahayak AI is not intended to replace farmers, agricultural
officers, or agricultural experts.

It is designed to **connect them**.

``` text
        FARMERS
           │
           ▼
   Shared Experiences
           │
           ▼
        System
           │
    ┌──────┼──────┐
    ▼      ▼      ▼
Resources Risks Knowledge
    │      │      │
    └──────┼──────┘
           ▼
        OFFICERS
           │
           ▼
       Verification
           │
           ▼
        COMMUNITY
```

> **One farmer's need can connect with another farmer's need.\
> One report can become a community warning.\
> One verified decision can help many farmers.\
> One shared experience can become useful knowledge.**

------------------------------------------------------------------------

# 🏆 Hackathon Pitch

### KrishiSahayak AI

**"We don't just solve a farmer's problem. We make the solution useful
for the farming community."**

The platform transforms agriculture from isolated problem-solving into
**cooperative intelligence** --- connecting farmers, resources, AI, and
agricultural officers in one shared ecosystem.

------------------------------------------------------------------------

## 📜 License

This project is developed as a hackathon prototype.
