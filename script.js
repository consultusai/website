// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");
if (navToggle && mobileMenu) {
  const closeMenu = () => {
    navToggle.classList.remove("open");
    mobileMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };
  navToggle.addEventListener("click", () => {
    const willOpen = !navToggle.classList.contains("open");
    navToggle.classList.toggle("open", willOpen);
    mobileMenu.classList.toggle("open", willOpen);
    navToggle.setAttribute("aria-expanded", String(willOpen));
    document.body.style.overflow = willOpen ? "hidden" : "";
  });
  mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("open")) closeMenu();
  });
}

// Header scroll state
const header = document.querySelector(".site-header");
if (header) {
  const onScroll = () => {
    if (window.scrollY > 10) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));
}

// Terminal typewriter (home page only)
const terminal = document.getElementById("terminal-body");
if (terminal) {
  const script = [
    { type: "prompt", text: "occupancy dropped 3% last week. why?" },
    { type: "wait", ms: 400 },
    { type: "response", tag: "analysis", text: "3 properties underperforming." },
    { type: "response", tag: "root_cause", text: "renewal drop at Maple Court, -11%." },
    { type: "response", tag: "action", text: "outreach draft queued for 14 residents." },
    { type: "wait", ms: 600 },
    { type: "prompt", text: "build a dashboard for delinquency by unit." },
    { type: "wait", ms: 400 },
    { type: "response", tag: "dataform", text: "3_dashboard/delinquency_by_unit.sqlx created." },
    { type: "response", tag: "metabase", text: "dashboard deployed. shared with client." },
    { type: "wait", ms: 800 },
    { type: "prompt", text: "what did we ship today?" },
    { type: "wait", ms: 400 },
    { type: "response", tag: "summary", text: "4 transforms. 2 dashboards. 0 tickets filed." },
  ];

  const typeDelay = 22;
  const lineDelay = 180;

  async function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async function typeLine(el, text) {
    for (let i = 0; i < text.length; i++) {
      el.textContent += text[i];
      await sleep(typeDelay);
    }
  }

  async function run() {
    while (true) {
      terminal.innerHTML = "";
      const cursor = document.createElement("span");
      cursor.className = "cursor";

      for (const step of script) {
        if (step.type === "wait") {
          await sleep(step.ms);
          continue;
        }
        const line = document.createElement("div");
        line.className = "terminal-line " + (step.type === "prompt" ? "prompt-line" : "response-line");

        if (step.type === "prompt") {
          const sigil = document.createElement("span");
          sigil.className = "prompt-sigil";
          sigil.textContent = "›";
          line.appendChild(sigil);
          const textSpan = document.createElement("span");
          line.appendChild(textSpan);
          terminal.appendChild(line);
          terminal.appendChild(cursor);
          await typeLine(textSpan, step.text);
          await sleep(lineDelay);
        } else {
          const tag = document.createElement("span");
          tag.className = "tag";
          tag.textContent = "[" + step.tag + "]";
          line.appendChild(tag);
          const textSpan = document.createElement("span");
          line.appendChild(textSpan);
          terminal.appendChild(line);
          terminal.appendChild(cursor);
          await typeLine(textSpan, step.text);
          await sleep(lineDelay);
        }
      }

      await sleep(2400);
    }
  }

  run();
}
