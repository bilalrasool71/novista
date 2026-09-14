/**
 * INSIGHTS / BLOG
 *
 * Articles are stored as structured blocks rather than raw HTML, so there is
 * no markdown dependency and no way for malformed markup to reach the page.
 *
 * To add an article: copy an entry, change the fields, add it to the top of
 * the array. It appears at /insights, gets a page at /insights/<slug>, enters
 * the sitemap and emits BlogPosting structured data automatically.
 *
 * Block types: p | h2 | h3 | ul | ol | quote | callout
 */

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "quote"; text: string }
  | { t: "callout"; title: string; text: string };

export type Post = {
  slug: string;
  title: string;
  /** Used for cards, meta description and the article summary line. */
  excerpt: string;
  category: "AI" | "Custom Software" | "Digital Transformation" | "Working Together";
  tags: string[];
  /** ISO date, e.g. "2026-04-18". */
  publishedAt: string;
  /** ISO date. Set equal to publishedAt when never revised. */
  updatedAt: string;
  author: { name: string; role: string };
  /** Service slugs this article relates to, used for internal linking. */
  relatedServices: string[];
  body: Block[];
  seo?: { title?: string; description?: string };
};

export const posts: Post[] = [
  {
    slug: "how-ai-automation-reduces-repetitive-business-work",
    title: "How AI Automation Can Reduce Repetitive Business Work",
    excerpt:
      "Most businesses lose more hours to routine work than to anything dramatic. Here is how to find those hours, decide which ones AI can genuinely take back, and avoid the projects that never pay for themselves.",
    category: "AI",
    tags: ["AI automation", "Business process automation", "Operations"],
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    author: { name: "Moin Akmal Khan", role: "Chief Technology Officer" },
    relatedServices: ["ai-solutions", "digital-transformation"],
    body: [
      {
        t: "p",
        text: "Ask a business owner where their team loses time and you will usually hear about a crisis — a bad month, a difficult client, a system outage. Those are memorable, but they are rarely where the hours actually go. The hours go into work that is too routine to be worth complaining about: reading the same form, retyping the same figures, forwarding the same request to the same person, chasing the same missing field.",
      },
      {
        t: "p",
        text: "That work is invisible precisely because it is unremarkable. It is also the work AI is genuinely good at. The difficulty is not the technology — it is identifying which specific tasks are worth automating, and being honest about the ones that are not.",
      },
      { t: "h2", text: "Start by measuring, not by choosing a tool" },
      {
        t: "p",
        text: "The most common way an AI project fails is by starting from the model. Someone sees a capable demo, buys a licence, and then goes looking for somewhere to apply it. The result is a pilot that technically works and changes nothing, because it was never attached to a cost anyone was trying to remove.",
      },
      {
        t: "p",
        text: "The alternative is unglamorous but reliable. Spend a week counting. For each recurring task, record four numbers:",
      },
      {
        t: "ul",
        items: [
          "Volume — how many times a week does this happen?",
          "Handling time — how long does one instance take, honestly, including the interruption cost?",
          "Error rate — how often does it have to be corrected later, and what does the correction cost?",
          "Definition quality — could you write down the rules for doing it correctly, or does it depend on judgement?",
        ],
      },
      {
        t: "p",
        text: "Multiply the first two and you have the annual hours. The third tells you the hidden cost beyond those hours. The fourth is the one most people skip, and it is the one that decides whether an automation project succeeds.",
      },
      { t: "h2", text: "Well-defined beats interesting" },
      {
        t: "p",
        text: "A task with high volume and clear rules is a far better first project than a task that is intellectually interesting but ambiguous. Extracting line items from supplier invoices into your accounting system is a good first project. Deciding which customers to give credit terms to is not — not because AI cannot contribute, but because the rules are contested, the consequences are financial, and you will spend the project arguing about policy rather than shipping anything.",
      },
      {
        t: "p",
        text: "Pick the boring one first. It builds the integration groundwork, gives your team a realistic sense of what these systems do well, and produces a result specific enough that nobody has to take the benefit on faith.",
      },
      { t: "h2", text: "Where AI automation actually earns its keep" },
      { t: "h3", text: "Reading documents" },
      {
        t: "p",
        text: "Invoices, purchase orders, delivery notes, prescriptions, lab reports, application forms. Anything that arrives as a PDF, a scan or a photo and ends up being typed into a system by a person. This is the highest-volume, best-defined category in most businesses, and the one where the before-and-after is easiest to measure.",
      },
      { t: "h3", text: "Routing and triage" },
      {
        t: "p",
        text: "Inbound requests that need to be read, classified and sent somewhere. Support queues, shared inboxes, form submissions. The value is not just the time saved on classification — it is that complex items stop waiting behind trivial ones.",
      },
      { t: "h3", text: "Answering from your own documentation" },
      {
        t: "p",
        text: "Questions whose answers already exist in writing, but are faster to ask a colleague than to find. Retrieval-based assistants handle this well, and crucially they can cite where each answer came from, which means a person can verify it in seconds rather than trusting it blindly.",
      },
      { t: "h3", text: "Summarising long records" },
      {
        t: "p",
        text: "Case histories, ticket threads, account notes. Any situation where somebody has to read six months of context before making a five-minute decision.",
      },
      { t: "h2", text: "Where it does not" },
      {
        t: "p",
        text: "Automation has a floor. If a task happens four times a month, automating it will cost more than it saves regardless of how elegant the solution is. If the underlying data is wrong, automating the process that consumes it just distributes the errors faster. And if the process itself is badly designed, AI will make a bad process quicker, not better.",
      },
      {
        t: "callout",
        title: "Fix the process before you automate it",
        text: "If a workflow exists only because two systems do not talk to each other, the right answer is usually an integration, not an AI agent. Integrations are cheaper, more predictable and easier to maintain. Reach for AI when the task genuinely needs interpretation — reading unstructured text, classifying ambiguous cases, summarising — not as a substitute for plumbing that should exist anyway.",
      },
      { t: "h2", text: "Design for being wrong" },
      {
        t: "p",
        text: "Every one of these systems will be wrong sometimes. That is not a reason to avoid them — humans doing the same task at volume are wrong too, and usually at a higher rate than anyone measures. It is a reason to design for it explicitly.",
      },
      {
        t: "ol",
        items: [
          "Make outputs traceable. Every extracted value or generated answer should point back to its source so it can be checked in seconds.",
          "Set a confidence threshold. Below it, the system should not answer — it should hand the case to a person with what it found so far.",
          "Keep humans on anything consequential. Financial, legal, clinical and contractual decisions get reviewed, always.",
          "Log everything. You want to be able to reconstruct why the system did what it did, months later.",
          "Build an evaluation set. A fixed sample of real cases with known correct answers, so you can tell whether a change improved accuracy or just felt like it did.",
        ],
      },
      { t: "h2", text: "What good looks like after six months" },
      {
        t: "p",
        text: "A successful AI automation programme is rarely one impressive system. It is usually three or four narrow ones, each removing a specific recurring task, each with a measured before-and-after, and each boring enough that nobody talks about it any more. The team has stopped doing the work rather than supervising a tool that does it.",
      },
      {
        t: "p",
        text: "The test is simple: if you switched the system off tomorrow, would anyone notice within a day? If yes, it is doing real work. If not, it was a demo.",
      },
    ],
    seo: {
      title: "How AI Automation Reduces Repetitive Work",
      description:
        "How to find which repetitive workflows AI can genuinely automate, which to start with, and how to design for the times the system gets it wrong.",
    },
  },

  {
    slug: "when-should-a-business-build-custom-software",
    title: "When Should a Business Build Custom Software?",
    excerpt:
      "Custom software is the right answer less often than agencies suggest and more often than cautious finance directors allow. Here is the test we apply before recommending a build.",
    category: "Custom Software",
    tags: ["Custom software", "Build vs buy", "Technology strategy"],
    publishedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    author: { name: "Muhammad Bilal Rasool", role: "Founder" },
    relatedServices: ["web-development", "digital-transformation"],
    body: [
      {
        t: "p",
        text: "Software development companies have an obvious incentive to recommend building software. It is worth being upfront about that, because the honest answer for a large share of the businesses that approach us is that an existing product would serve them better, faster and for less money.",
      },
      {
        t: "p",
        text: "But the opposite mistake is just as expensive, and quieter. Businesses run for years on a tool that does seventy percent of what they need, absorbing the other thirty percent through manual work, spreadsheets and workarounds that nobody ever adds up.",
      },
      { t: "h2", text: "The question is not cost, it is fit" },
      {
        t: "p",
        text: "Comparing a licence fee to a development quote is the wrong comparison, because it prices only one side of the ledger. The real comparison is total cost over three to five years, including the cost of the gap: the hours spent on workarounds, the errors that come from re-keying, the reports that have to be assembled by hand, and the growth you cannot take on because the system will not stretch.",
      },
      {
        t: "p",
        text: "Once the gap is priced, the arithmetic often changes direction. A licence at a few hundred a month plus twenty hours a week of manual reconciliation is not a cheap option.",
      },
      { t: "h2", text: "Five signals that a build is justified" },
      { t: "h3", text: "1. The process is how you compete" },
      {
        t: "p",
        text: "If the way you do something is a genuine advantage — faster fulfilment, a distinctive service model, a scheduling approach competitors cannot match — then off-the-shelf software will flatten it toward the industry average, because that is what it is designed to encode. Build the part that is your advantage. Buy everything around it.",
      },
      { t: "h3", text: "2. You are paying per seat for a fraction of a product" },
      {
        t: "p",
        text: "Enterprise platforms are priced for their full feature set. If you use one module of six and cannot unbundle it, you are subsidising capability you will never touch, permanently, and the cost rises with headcount.",
      },
      { t: "h3", text: "3. The workarounds have become the system" },
      {
        t: "p",
        text: "A spreadsheet that has to be maintained alongside the software, an export-and-reimport step between two tools, a person whose job is partly to move data between systems. These are not inefficiencies. They are an unfunded, undocumented piece of software your business depends on, maintained by whoever built it and unavailable when they are on leave.",
      },
      { t: "h3", text: "4. Integration is the real requirement" },
      {
        t: "p",
        text: "When the actual need is that four systems should share data, custom software is often the cheapest route — not because you are rebuilding those systems, but because the connective layer between them is inherently specific to you and nobody sells it.",
      },
      { t: "h3", text: "5. You have hit a hard ceiling" },
      {
        t: "p",
        text: "Record limits, user limits, no API, a vendor whose roadmap does not include what you need. Once you are waiting on someone else's product decisions to grow, you have lost control of your own timeline.",
      },
      { t: "h2", text: "Five signals that you should buy instead" },
      {
        t: "ul",
        items: [
          "The process is genuinely standard. Payroll, general accounting and email marketing are solved problems, and your version is not meaningfully different.",
          "Regulation changes frequently. Tax and statutory compliance are worth paying a vendor to track on your behalf.",
          "You need it next month. A serious build does not land in four weeks; buy now and revisit later if the fit fails.",
          "Nobody internally owns it. Custom software needs someone on your side who can make decisions about how it should work. Without that, the project drifts.",
          "The requirement is still moving. If the process itself changes every quarter, stabilise it before encoding it.",
        ],
      },
      { t: "h2", text: "The hybrid answer is usually the right one" },
      {
        t: "p",
        text: "The build-versus-buy framing suggests a single decision, when in practice most healthy technology estates are a mix. Buy the commodity layers. Build the workflow that is specific to you. Integrate the two so data flows once.",
      },
      {
        t: "callout",
        title: "A practical first step",
        text: "Before commissioning anything, write down the three most expensive manual processes in the business and estimate the annual hours each consumes. That single page tells you more about whether to build than any feature comparison will, and it is the first thing we ask for when someone approaches us about a project.",
      },
      { t: "h2", text: "Start smaller than feels right" },
      {
        t: "p",
        text: "If a build is justified, the most important decision left is scope. The instinct is to specify everything the system should eventually do, because that feels like diligence. It produces long projects, late feedback and features nobody uses.",
      },
      {
        t: "p",
        text: "A better shape is a first release covering the single most expensive process, in production, being used by real people within a few months. You learn more from eight weeks of actual usage than from eight weeks of requirements workshops, and what you learn usually changes what you would have built next.",
      },
    ],
    seo: {
      description:
        "Five signals that a custom build is justified, five that say buy instead, and why comparing a licence fee to a development quote is the wrong test.",
    },
  },

  {
    slug: "custom-software-vs-off-the-shelf-software",
    title: "Custom Software vs Off-the-Shelf Software: An Honest Comparison",
    excerpt:
      "The trade-offs between building and buying, compared across the factors that actually determine the outcome — cost over time, speed, control, risk and what happens when your needs change.",
    category: "Custom Software",
    tags: ["Custom software", "Build vs buy", "SaaS"],
    publishedAt: "2026-06-30",
    updatedAt: "2026-06-30",
    author: { name: "Muhammad Bilal Rasool", role: "Founder" },
    relatedServices: ["web-development", "digital-transformation"],
    body: [
      {
        t: "p",
        text: "Most comparisons of custom versus off-the-shelf software are written by someone selling one of them. This one is written by a company that builds custom software, so treat the conclusion accordingly — but the trade-offs below are the ones we actually walk clients through, including the cases where we recommend not building.",
      },
      { t: "h2", text: "Upfront cost" },
      {
        t: "p",
        text: "Off-the-shelf wins clearly. A subscription starts at a predictable monthly figure with no capital outlay. Custom software requires meaningful investment before it does anything at all. If cash flow is the binding constraint, this alone can settle the question, and there is no clever argument against it.",
      },
      { t: "h2", text: "Cost over five years" },
      {
        t: "p",
        text: "This is where the picture becomes less obvious. Subscription costs scale with headcount and rarely go down. Custom software has a high initial cost and then a maintenance cost, typically a fraction of the build, that does not rise just because you hired more people.",
      },
      {
        t: "p",
        text: "The factor most businesses leave out is the cost of imperfect fit — the manual work that exists only because the tool does not quite do what you need. It is real spend, it just appears in salaries rather than on a software line, so nobody attributes it to the software decision.",
      },
      { t: "h2", text: "Time to value" },
      {
        t: "p",
        text: "Off-the-shelf wins again, though by less than the marketing suggests. A subscription starts today, but configuration, data migration and training for a serious business system routinely take months. Custom software takes longer to first use, and phased delivery narrows the gap considerably — a first release covering your most expensive process can be live well before a large platform rollout finishes.",
      },
      { t: "h2", text: "Fit" },
      {
        t: "p",
        text: "Custom software wins, by definition. The relevant question is how much the gap costs you. For a standard process, near enough is genuinely fine. For a process that is specific to how you operate, the gap is where your margin quietly goes.",
      },
      { t: "h2", text: "Integration" },
      {
        t: "p",
        text: "This is the factor most often underestimated. Vendor products integrate as far as their API allows and no further. Custom software can integrate with anything you can reach. For a business running several systems that need to share data, integration capability often matters more than any feature list.",
      },
      { t: "h2", text: "Risk" },
      {
        t: "p",
        text: "The risks differ in kind rather than degree, which is why they are hard to compare directly.",
      },
      {
        t: "ul",
        items: [
          "Off-the-shelf risk is external: price rises, a change of ownership, a feature you depend on being deprecated, a roadmap that diverges from your needs, or the product being discontinued.",
          "Custom risk is delivery-side: the project running over, the scope being wrong, or the code being handed over in a state nobody else can maintain.",
        ],
      },
      {
        t: "p",
        text: "Custom risk is largely controllable through how the work is structured — phased delivery, working software at the end of every iteration, conventional architecture, real handover. Vendor risk is not controllable at all. You can only decide how much of it to accept.",
      },
      { t: "h2", text: "Maintenance and support" },
      {
        t: "p",
        text: "Off-the-shelf includes updates, security patches and support in the subscription. Custom software needs someone responsible for the same things. That is a genuine ongoing commitment and should be budgeted from the start, not discovered in year two.",
      },
      { t: "h2", text: "What changes as you grow" },
      {
        t: "p",
        text: "Small businesses should buy nearly everything. The overhead of owning software outweighs the benefit of fit when there are ten people and no internal technical owner.",
      },
      {
        t: "p",
        text: "The picture shifts as scale increases. Per-seat costs compound, processes become more specific, integration needs multiply, and the manual work absorbing the gap becomes a department rather than a person. Somewhere in that transition, building the parts that are genuinely yours starts to pay for itself.",
      },
      {
        t: "callout",
        title: "The pattern that works",
        text: "Buy the commodity — accounting, payroll, email, storage. Build the workflow that is specific to how you compete. Integrate so that data is entered once and agrees everywhere. Almost every well-run technology estate we see looks like this, and almost every struggling one is at an extreme: all vendor products that do not talk to each other, or a single custom system that tried to do everything.",
      },
      { t: "h2", text: "The one question worth asking first" },
      {
        t: "p",
        text: "If a competitor adopted exactly the same software as you, would you lose anything? If the answer is no, buy it — that process is not where you win. If the answer is yes, that part is worth building, and it is probably the only part that is.",
      },
    ],
    seo: {
      title: "Custom Software vs Off-the-Shelf Software",
      description:
        "Build or buy, compared across upfront cost, five-year cost, speed, fit, integration, risk and maintenance — including when buying is the better call.",
    },
  },

  {
    slug: "how-ai-agents-automate-business-workflows",
    title: "How AI Agents Can Automate Business Workflows",
    excerpt:
      "What an AI agent actually is beyond the marketing, which workflows suit one, and the guardrails that separate a system you can trust in production from an impressive demo.",
    category: "AI",
    tags: ["AI agents", "Workflow automation", "LLM"],
    publishedAt: "2026-05-19",
    updatedAt: "2026-05-19",
    author: { name: "Moin Akmal Khan", role: "Chief Technology Officer" },
    relatedServices: ["ai-solutions"],
    body: [
      {
        t: "p",
        text: "The word agent has been applied to enough different things to become close to meaningless. It is worth being precise, because the distinction determines what these systems can and cannot be trusted with.",
      },
      {
        t: "p",
        text: "A chatbot answers a question. An automation runs a fixed sequence of steps. An agent is given a goal and decides which steps to take to reach it, using tools it has access to, adapting when something does not go as expected. That last property is what makes agents useful, and it is also the reason they need more careful design than either of the other two.",
      },
      { t: "h2", text: "What an agent is made of" },
      {
        t: "p",
        text: "Strip away the terminology and there are four parts:",
      },
      {
        t: "ol",
        items: [
          "A model that can reason about what to do next given the current state.",
          "Tools — functions it can call to read data, write records, send messages or query a system. This is where the real work happens.",
          "Context — the instructions, data and history that tell it what it is doing and what constraints apply.",
          "A loop that lets it observe the result of an action and decide on the next one, until the goal is met or it gives up.",
        ],
      },
      {
        t: "p",
        text: "Almost all the engineering effort in a production agent goes into the tools and the context. The model is the part you do not write.",
      },
      { t: "h2", text: "Which workflows suit an agent" },
      {
        t: "p",
        text: "Agents fit a specific shape of problem: multi-step, requiring interpretation, with a variable path but a clearly definable goal. If every instance of the task follows an identical sequence, you want conventional automation instead — it is cheaper, faster and deterministic. If the task is a single lookup, you want a query, not an agent.",
      },
      { t: "p", text: "Workflows where agents genuinely earn their place:" },
      {
        t: "ul",
        items: [
          "Support triage — read the request, look up the account, check order status, resolve or route with context attached.",
          "Document processing with exceptions — extract the data, validate it against existing records, flag mismatches, request the missing piece.",
          "Onboarding checks — gather submitted documents, verify what is present, chase what is not, escalate anything unusual.",
          "Reconciliation — compare two sources, identify discrepancies, explain the likely cause, propose a correction for approval.",
          "Research and preparation — assemble the context a person needs before a decision, from several systems, in the format they actually use.",
        ],
      },
      {
        t: "p",
        text: "The common thread: the goal is clear, the path varies, and a person currently does it by moving between several systems.",
      },
      { t: "h2", text: "The guardrails that make it production-grade" },
      { t: "h3", text: "Scoped tool access" },
      {
        t: "p",
        text: "An agent should have exactly the permissions it needs and no more. Read access to what it must see. Write access only to specific fields or records. It should not hold credentials broader than the task, for the same reason a temporary employee does not get an administrator account.",
      },
      { t: "h3", text: "Human approval on consequential actions" },
      {
        t: "p",
        text: "Anything that moves money, changes a contract, contacts a customer externally or alters a clinical or legal record should be prepared by the agent and approved by a person. This is not a limitation to be engineered away later — it is the design.",
      },
      { t: "h3", text: "Confidence thresholds" },
      {
        t: "p",
        text: "A well-built agent knows when it is out of its depth. Below a defined confidence level it should stop and escalate with what it has gathered, rather than produce a plausible answer. Systems that always answer are more dangerous than systems that sometimes decline.",
      },
      { t: "h3", text: "Complete decision logs" },
      {
        t: "p",
        text: "Every action, every tool call, every piece of retrieved context, stored and reviewable. When something goes wrong — and it will — you need to reconstruct why. This is also what makes improvement possible: patterns in the failures tell you what to fix.",
      },
      { t: "h3", text: "Evaluation before rollout" },
      {
        t: "p",
        text: "A fixed set of real cases with known correct outcomes, run against the agent before every change. Without it you are relying on the impression that a system feels better, which is not a measurement and is frequently wrong.",
      },
      {
        t: "callout",
        title: "Start with a shadow period",
        text: "Run the agent alongside the existing process without letting it act. It proposes, a person decides, and you compare the two. A few weeks of this tells you the real accuracy rate on your actual work, surfaces the edge cases nobody remembered to mention, and builds the team's trust in a way no demo can.",
      },
      { t: "h2", text: "Cost, briefly" },
      {
        t: "p",
        text: "Agents cost more per task than a single model call because they take multiple steps and carry context. That is fine when the task they replace costs twenty minutes of a person's time; it is not fine when it replaces thirty seconds. Model choice, caching and routing simple cases away from the expensive path matter, and cost per completed task is worth monitoring from day one rather than discovering at the end of the first quarter.",
      },
      { t: "h2", text: "The realistic expectation" },
      {
        t: "p",
        text: "A well-scoped agent will handle the routine majority of a workflow and escalate the rest. That is the outcome to aim for. Systems marketed as handling everything without supervision are either operating in a domain with no consequences for error, or the supervision has been quietly moved somewhere less visible.",
      },
    ],
    seo: {
      description:
        "What AI agents actually are, which business workflows suit one, and the guardrails that make them safe in production rather than impressive in a demo.",
    },
  },

  {
    slug: "signs-your-legacy-software-needs-modernization",
    title: "Signs Your Legacy Software Needs Modernisation",
    excerpt:
      "Legacy systems rarely fail outright. They get slowly more expensive until replacing them becomes urgent. Here are the signals worth acting on, and how to modernise without stopping the business.",
    category: "Digital Transformation",
    tags: ["Legacy modernisation", "Technical debt", "Digital transformation"],
    publishedAt: "2026-04-24",
    updatedAt: "2026-04-24",
    author: { name: "Moin Akmal Khan", role: "Chief Technology Officer" },
    relatedServices: ["digital-transformation", "web-development"],
    body: [
      {
        t: "p",
        text: "Legacy software is rarely broken in a way that forces a decision. It keeps working. That is exactly the problem — the cost accumulates in places that do not appear on any line item, and the decision gets deferred until something forces it at the worst possible moment.",
      },
      {
        t: "p",
        text: "Here are the signals that a system has crossed from old to genuinely expensive, in roughly the order they tend to appear.",
      },
      { t: "h2", text: "1. Small changes take disproportionately long" },
      {
        t: "p",
        text: "A change that should take a day takes three weeks. Not because the change is complex, but because nobody is confident about what else it might affect, so most of the time goes into testing by hand. This is usually the first signal, and the easiest to dismiss as normal.",
      },
      { t: "h2", text: "2. One person is the system" },
      {
        t: "p",
        text: "There is someone who understands how it fits together, and changes wait for them. This is a serious business continuity risk that is almost never recorded as one. If that person leaves, the cost of every subsequent change multiplies overnight.",
      },
      { t: "h2", text: "3. You cannot hire for it" },
      {
        t: "p",
        text: "The framework is out of support, the language version is a decade old, or the platform is no longer taught. When the candidate pool shrinks, rates rise and quality falls, and you end up paying a premium for maintenance of something that is not getting better.",
      },
      { t: "h2", text: "4. Security updates have stopped" },
      {
        t: "p",
        text: "The runtime, framework or database version no longer receives security patches. This is the signal that should override the others, because unlike the rest it does not degrade gradually — it sits at low risk until it is suddenly an incident. If a component is past end of life, the timeline is no longer yours to set.",
      },
      { t: "h2", text: "5. It cannot integrate" },
      {
        t: "p",
        text: "No API, no webhooks, no reasonable way to get data in or out except a scheduled export someone processes by hand. Every new tool the business wants to adopt gets harder, and the integration cost is paid again each time.",
      },
      { t: "h2", text: "6. Nobody will touch certain areas" },
      {
        t: "p",
        text: "There is a module everyone routes around. Features get built awkwardly elsewhere to avoid going near it. That area is now setting the architecture of everything else, and the workarounds are compounding.",
      },
      { t: "h2", text: "7. It does not work on a phone" },
      {
        t: "p",
        text: "If staff or customers need it away from a desk and cannot use it there, you are paying for that gap somewhere — in phone calls to the office, in data entered twice, in decisions delayed until someone is back at a computer.",
      },
      { t: "h2", text: "What modernisation actually looks like" },
      {
        t: "p",
        text: "The word suggests replacement, which is what makes it frightening. In practice, the approach that works on systems a business depends on daily is incremental, and the legacy system keeps running throughout.",
      },
      {
        t: "ol",
        items: [
          "Audit honestly. What does the system do, what depends on it, where is the risk, and which parts are actually the expensive ones? Frequently it is one or two modules, not the whole thing.",
          "Put an API layer in front. Give the existing system a modern interface, even if the code behind it does not change. New work can now build against something clean.",
          "Move one capability at a time. Choose by cost and risk. Run old and new in parallel until the replacement is proven on real data.",
          "Migrate data with validation. Reconcile old against new and show the report to the people who know the data, before cutover, not after.",
          "Retire in stages. Decommission each old component only once its replacement has been live and stable for a meaningful period.",
        ],
      },
      {
        t: "callout",
        title: "Why not just rewrite it?",
        text: "Sometimes a rewrite genuinely is cheaper — usually when the system is small, well understood and the business rules are documented. But full rewrites of large operational systems have a poor record, because the original encodes years of edge cases nobody remembers and nobody wrote down. Incremental migration surfaces those edge cases one at a time, while the old system is still there to check against.",
      },
      { t: "h2", text: "Making the case internally" },
      {
        t: "p",
        text: "Modernisation is hard to fund because it produces no new features. The argument that works is not technical, it is arithmetic: what does the current system cost per year in slow changes, manual workarounds, premium contractor rates and risk exposure, versus what phase one costs.",
      },
      {
        t: "p",
        text: "Frame it as a phase rather than a programme. One module, a few weeks, a measurable result. That is a decision a board can approve. A two-year transformation with benefits at the end is not.",
      },
    ],
    seo: {
      description:
        "Seven signals that legacy software has become genuinely expensive, and how to modernise it incrementally without disrupting day-to-day operations.",
    },
  },

  {
    slug: "how-to-choose-a-software-development-partner",
    title: "How to Choose a Software Development Partner",
    excerpt:
      "What to look for beyond a portfolio and a quote — the questions that predict how a project will actually go, and the warning signs worth walking away from.",
    category: "Working Together",
    tags: ["Software agency", "Vendor selection", "Project delivery"],
    publishedAt: "2026-03-17",
    updatedAt: "2026-03-17",
    author: { name: "Muhammad Bilal Rasool", role: "Founder" },
    relatedServices: ["web-development", "digital-transformation"],
    body: [
      {
        t: "p",
        text: "Choosing a development partner is difficult because the things that determine the outcome are mostly invisible during the sales process. Portfolios show finished work, not how it got there. Quotes show a number, not what happens when the scope moves. Everyone is attentive before the contract is signed.",
      },
      {
        t: "p",
        text: "These are the questions that, in our experience, actually predict how a project will go — asked as a client would ask them, not as an agency would like to answer them.",
      },
      { t: "h2", text: "Ask what they would not build" },
      {
        t: "p",
        text: "Describe your project and ask which parts they would cut from a first release, and whether any of it should not be built at all. A partner worth having will have opinions and will tell you when an existing product would serve you better. One that agrees with everything is optimising for signing, and you will meet the disagreement later, during delivery, when it is more expensive.",
      },
      { t: "h2", text: "Ask who will actually do the work" },
      {
        t: "p",
        text: "Meet them. It is common for the people in the sales conversation not to be the people who build the thing. That is not automatically a problem, but you should know it in advance, and you should know whether the team changes halfway through.",
      },
      { t: "h2", text: "Ask how they handle a change in scope" },
      {
        t: "p",
        text: "Scope will change — that is normal and not a failure. What matters is the mechanism. A good answer describes a specific process: how a change is identified, priced, and decided on, and who signs it off. A vague answer about flexibility means you will be negotiating during delivery, under time pressure.",
      },
      { t: "h2", text: "Ask what happens if you stop" },
      {
        t: "p",
        text: "This is the single most revealing question. If you ended the engagement after phase one, what would you have? The answer should be: all the code, in your own repository; all the data; accounts registered in your name; documentation good enough for another developer to continue.",
      },
      {
        t: "p",
        text: "Any hesitation here is disqualifying. Some agencies build dependency deliberately — accounts in their name, undocumented deployment, code that is only deployable by them. You will not notice until you want to leave.",
      },
      { t: "h2", text: "Ask to see something unfinished" },
      {
        t: "p",
        text: "A portfolio shows polished end states. Ask instead how you will see progress during the project. Weekly working software you can click through is a very different proposition from a monthly status report, and the difference shows up in how early problems get caught.",
      },
      { t: "h2", text: "Ask about the project that went wrong" },
      {
        t: "p",
        text: "Everyone with a real track record has one. What you are listening for is whether they can describe it specifically, what they took responsibility for, and what they changed afterwards. An inability to name a single difficult project means either very little experience or a reluctance to be straight with you.",
      },
      { t: "h2", text: "Warning signs" },
      {
        t: "ul",
        items: [
          "A fixed price for a large scope before any discovery work. Either the estimate is padded heavily, or the change requests are the business model.",
          "No questions about your business. If the conversation is entirely about technology, the software will be built around technology rather than around what you need it to do.",
          "Certainty on timelines for work nobody has scoped yet.",
          "Unwillingness to put you in touch with a past client.",
          "Pressure to decide quickly, or a discount that expires. Serious work does not need urgency manufactured around it.",
          "Technology chosen before the problem is understood.",
        ],
      },
      {
        t: "callout",
        title: "Start with a small paid piece of work",
        text: "The most reliable way to evaluate a partner is a small, paid, well-defined first engagement — a discovery phase, an audit, a single module. A few weeks of real work tells you more about communication, quality and honesty than any number of reference calls, and it is a far cheaper mistake to make than a twelve-month commitment.",
      },
      { t: "h2", text: "What good looks like in practice" },
      {
        t: "p",
        text: "A good partnership is quieter than people expect. You know what is being worked on this week. You see it at the end of the week. Problems reach you early, while they are still small. Estimates change and you are told why. Nothing important is decided without you, and nothing trivial requires you.",
      },
      {
        t: "p",
        text: "If you find that, the technology choices matter far less than you would think. If you do not, the best stack in the world will not save the project.",
      },
    ],
    seo: {
      description:
        "The questions that predict how a software project will go — who does the work, how scope changes are handled, and what you keep if you walk away.",
    },
  },
];

export const postSlugs = posts.map((post) => post.slug);

export const postCategories = Array.from(
  new Set(posts.map((post) => post.category)),
);

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/** Newest first. */
export function getPostsSorted(): Post[] {
  return [...posts].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
}

/**
 * Related articles: same category first, then most recent, never the
 * article itself.
 */
export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const current = getPost(slug);
  if (!current) return getPostsSorted().slice(0, limit);

  const others = getPostsSorted().filter((post) => post.slug !== slug);
  const sameCategory = others.filter((post) => post.category === current.category);
  const rest = others.filter((post) => post.category !== current.category);

  return [...sameCategory, ...rest].slice(0, limit);
}

/** Rough reading time from the article body. Keeps itself accurate on edit. */
export function readingMinutes(post: Post): number {
  const words = post.body.reduce((total, block) => {
    if (block.t === "ul" || block.t === "ol") {
      return total + block.items.join(" ").split(/\s+/).length;
    }
    if (block.t === "callout") {
      return total + `${block.title} ${block.text}`.split(/\s+/).length;
    }
    return total + block.text.split(/\s+/).length;
  }, 0);

  return Math.max(1, Math.round(words / 220));
}
