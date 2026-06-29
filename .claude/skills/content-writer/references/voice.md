# Voice reference — study these, don't reuse them

Real lines from Andrew's published posts. They're here so you can hear the
texture - first person, concrete, warm, dry, no fluff - and work out *why* each
one lands.

**They are burned. Do not copy or reskin them.** Every metaphor, opener, and
punchline below is already in print. Swapping a noun ("cosplaying as Google" ->
"cosplaying as Stripe"), or filing the serial numbers off the "I've been hired to
clean up a mess" opener, produces an obvious knockoff - a reader who knows the
blog feels the echo instantly. Study the mechanism, then write a *new* line of
your own, or use none. If the best you can do is reskin one of these, cut it.

---

## Openings that hook (steal these shapes)

Lead with lived pain, a confession, a "you" scenario, or a flat claim. The thesis
is in the first sentence or two.

- Confession / war-weary: *"Too many times in my career, I've been the person
  hired to clean up a mess someone else left behind. You walk in, the previous
  team is gone, everything is on fire, and now somehow you're holding the
  extinguisher."*
- Confession: *"I was a vibe-coding skeptic for a long time. Recently the models
  got good enough that I actually trust them to do what I want - under pretty
  pedantic supervision, but still."*
- Premise + stakes: *"I gave my AI coding agents three complaints and one
  demand."*
- "You" scenario: *"You've been building your product for a year. Most of the
  time you had 4 active users, but then ThePrimeagen tweeted about it and
  suddenly you have this new cool problem - how do you handle all this traffic?"*
- Deadpan setup: *"While working on a new project we faced a task where end-user
  needs to upload a file with the sensitive data (eg. national ID of most people
  in a country, yay)."*

Avoid: definitions, background, "In this article we'll cover...".

## I vs we vs you

- **I = opinion / stake / confession.** *"In my opinion..."*, *"I believe code
  gets worse because..."*, *"I genuinely don't enjoy the little adrenaline hit I
  get every time I let even the best model run unattended."*, *"the part I'm
  quietly smug about"*, *"This is the part I'll happily bore you about at
  parties."*
- **we = the team (literal) or shared reasoning.** *"Since we are running our
  projects on Google Container Engine, we decided..."*, *"So we close it
  ourselves."*, *"Let's go through a few cases to make sure this would work."*
- **you = instruct / put in the scene / predict the objection.** *"You'd think
  there's a setting for this. There isn't."*, *"You review the branch like a
  contractor's PR, merge what's good, and delete the directory."*

## The objection-in-quotes move

Voice the reader's pushback, then answer it.

- *"'But don't the CLIs sandbox themselves now?' They do, and the built-in
  sandboxes are genuinely useful..."*
- *"my app is Elixir, it talks to Postgres and Redis, that box can't run a
  thing. So can't the agent just install what it needs? It can try, and you
  shouldn't let it."*
- One-line bridges: *"Can we do better?"*, *"This code looks too complex, isn't
  it?"*

## Reframe the question

- *"Some people frame this as a trust problem: can I trust the model? Wrong
  question."*
- *"So stop asking 'can I trust the agent?' and start asking 'what's the worst
  this system lets it do?'."*
- *"Stop thinking 'What JSON is convenient to return?' and start asking 'What
  shape of API lets the CDN do the most work?'."*
- Pattern: **"Wrong question. [the right one]."** / **"Stop [naive thing]. Start
  [right thing]."**

## Self-deprecation and honesty about feelings

- *"This part looks obvious, but we managed to screw with it."*
- *"the bit that took me embarrassingly long to figure out..."*
- *"The agent wasn't forgetting my rules. I'd put the rules in a file that
  doesn't survive."*
- *"For the first few days, I felt like 'this stuff is bad, why do I even
  consider it?'. Later - 'ok, this stuff is great, but I'm not smart enough to
  use it'. In a week functional programming broke my mind and I was in love with
  Elixir."*
- *"the fear just goes away, and you've got a box that's safe to walk away
  from."*

## Honesty about tradeoffs (never a silver bullet)

- *"I do not think that this is the only right approach, there is always a
  tradeoff. This solution was the best for our use case."*
- *"Elixir is not a silver bullet and it does not fit any project."*
- *"What are the tradeoffs? With Saga you tradeoff atomicity for availability."*
- *"And one disclaimer - honestly the most important paragraph in this article: a
  sandbox limits blast radius, it doesn't guarantee containment."*

## Bold punchlines (one per section, the line to remember)

- *"**The real cost of software is maintenance.**"*
- *"**Trust is not a property of the model. It's a property of the system around
  it.**"*
- *"It's **safe but useless, or useful but terrifying.** At least for me."*
- *"**Context is scratch space. The filesystem is the memory.**"*
- *"**Don't fight context rot - make sessions disposable.**"*
- *"**Commit the knowledge, git-ignore the state.**"*

## Italic pivots (italicize the one contrasting word)

- *"masking secrets **inside** the working tree"* (italics on *inside*)
- *"it can't see a secret that shows up **later**"*
- *"the stuff that **should** happen goes in markdown, and the stuff that
  **must** happen goes in hooks"*
- *"a checklist tells a recovering agent **what's** left; the log tells it
  **why**"*

## Metaphors (vivid, everyday, a little irreverent — one per article)

*These are spent. Don't reuse or reskin them - they're here to show you the kind
of image he reaches for (concrete, mechanical, slightly absurd) so you can invent
a fresh one.*

- *"And Formula 1 teams also use carbon fiber steering wheels. That does not mean
  your family hatchback needs one."*
- *"Stop cosplaying as Google. Use first principles."*
- *"A small sharp team is a speedboat. A large organization is a cruise ship.
  Cruise ships are impressive, but they do not turn quickly."*
- *"The mounts are the lock; the deny rules are the 'please don't' sign you put
  up anyway."*
- *"you spend the day as a human OK-button"*
- *"Keeping it alive is where the bill arrives. Slowly, repeatedly, and with
  interest."* (the maintenance-as-a-tax frame; also the "hype tax")

## Rhythm: long setup, short payoff; anaphora

- *"Writing code is usually the cheap part. Keeping it alive is where the bill
  arrives. Slowly, repeatedly, and with interest."*
- *"Memory drifts. A static-analysis rule doesn't."*
- Mounting-pain staccato: *"The payloads are huge. One tiny update invalidates an
  entire response. ... Origin load stays high. Database utilization keeps
  creeping up. And you start thinking about adding one more Redis cache layer."*
- Anaphora: *"Talk to customers. Talk to support. Talk to sales. ... Look at the
  product. Look at the market. ... Look at what keeps breaking."*
- Anaphora to a turn: *"The container doesn't trust it with your machine. The
  mounts don't trust it with your secrets. The clone doesn't trust it with your
  remotes. And precisely because nothing trusts it, you can finally stop
  hovering."*

## Endings (epigram tagline and/or call-to-next)

- *"Not 10x more code. 10x better decisions. That's the real multiplier."*
  (italicized last line)
- *"It's file-based and almost entirely made of markdown. It's simple - that's
  exactly why it works."*
- Call-to-next: *"Turning this safe box into something that runs your repo for
  eight hours straight... is the next article."*
- Older posts also close with a named **Thanks** crediting collaborators - a warm
  signature worth bringing back.

---

# The anti-AI-slop list

These are usually evidence a sentence is dodging the real claim. When one shows
up, replace it with the mechanism, the consequence, or the proof.

**Words to distrust** (from the Emisar tone rules - they apply to the blog too):
unlock, unleash, empower, elevate, supercharge, seamless, robust, cutting-edge,
game-changing, transformative, revolutionary, "comprehensive solution",
"streamline your workflow", "in today's fast-paced world", "designed to help
teams", "leverage the power of", "take control of", delve, utilize.

**Throat-clearing openers to cut:** "With X,", "By leveraging", "In order to",
"When it comes to", "It's worth noting that", "Needless to say".

**Sentence rules:**
- Put the concrete noun before the abstraction.
- Prefer active verbs: checks, blocks, records, shadows, dispatches, breaks.
- Short sentences for real emphasis, not as a style tic.
- One hard idea per sentence.
- Don't stack modifiers ("secure, scalable, seamless, enterprise-grade").
- If a paragraph makes three claims, at least one needs proof.

---

# Before / after

The slop version, then the rewrite. The fix is almost always: cut the adjective,
add the mechanism or the number, switch to first person, swap "—" for " - ".

**Before:** In today's fast-paced world, AI agents are a game-changer, but
security remains a critical concern. Our robust solution empowers you to
seamlessly leverage autonomous agents with confidence.
**After:** I want an agent to run all day without me babysitting it. But I work
on sensitive infra, so I can't run it in YOLO mode either. So I put it in a box
where the worst it can do is trash one repo I can rebuild in a minute.

**Before:** This powerful approach streamlines your workflow and unlocks
significant productivity gains across your entire engineering organization.
**After:** One commit per task does double duty: it keeps the evening review to
small diffs, and it caps the blast radius if the agent goes sideways.

**Before:** It's important to note that proper secret management is essential for
maintaining a secure posture.
**After:** A deny rule stops the `Read` tool, not a creative shell command. If
the bytes are in the mount and only a deny rule guards them, assume a long enough
session finds them.

(For the marketing register specifically - product pages, not the blog - Emisar's
own before/after pairs live in `../emisar/.claude/skills/content-director/references/tone-rules.md`.)
