/* Moura Creations site script */

/* ============================================================
   SETTINGS — put your WhatsApp number here.
   Country code + number, digits only. Example for India: "919876543210"
   While this is empty, WhatsApp buttons fall back to email.
   ============================================================ */
const WHATSAPP_NUMBER = "";
const EMAIL = "mouracreations@gmail.com";

const hasWhatsApp = /^\d{10,15}$/.test(WHATSAPP_NUMBER);
const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const mailLink = (subject, body) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

/* ---------- WhatsApp buttons ---------- */
const greeting = "Hi Moura Creations, I'd like to order bangles.";
document.querySelectorAll("[data-whatsapp]").forEach((a) => {
  if (hasWhatsApp) {
    a.href = waLink(greeting);
    a.target = "_blank";
    a.rel = "noopener";
  } else {
    a.href = mailLink("Bangle order", greeting);
    if (a.textContent.includes("WhatsApp")) a.textContent = "Order by email";
  }
});
if (!hasWhatsApp) {
  ["cfWa", "waItem"].forEach((id) => { const el = document.getElementById(id); if (el) el.hidden = true; });
}

/* ---------- "Ask about this design" links ---------- */
document.querySelectorAll("[data-ask]").forEach((a) => {
  const design = a.dataset.ask;
  const text = `Hi Moura Creations, I'm interested in the "${design}". Could you tell me the price and when it would be ready?`;
  if (hasWhatsApp) {
    a.href = waLink(text);
    a.target = "_blank";
    a.rel = "noopener";
  } else {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const field = document.getElementById("cfDesign");
      if (field) field.value = design;
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
      setTimeout(() => document.getElementById("cfName")?.focus({ preventScroll: true }), 500);
    });
  }
});

/* ---------- Mobile menu ---------- */
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const setMenu = (open) => {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

/* ---------- Highlight the current section in the menu ---------- */
const links = [...nav.querySelectorAll("a")];
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${en.target.id}`));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((l) => { const s = document.querySelector(l.getAttribute("href")); if (s) io.observe(s); });
}

/* ---------- Collection filter ---------- */
const chips = document.querySelectorAll(".chip");
const products = document.querySelectorAll(".product");
chips.forEach((chip) => chip.addEventListener("click", () => {
  const f = chip.dataset.filter;
  chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
  products.forEach((p) => { p.hidden = f !== "all" && p.dataset.cat !== f; });
}));

/* ---------- Lightbox ---------- */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCaption");
document.querySelectorAll(".product-img").forEach((btn) => btn.addEventListener("click", () => {
  const img = btn.querySelector("img");
  lbImg.src = btn.dataset.full;
  lbImg.alt = img.alt;
  lbCap.textContent = btn.closest(".product").querySelector("h3").textContent;
  if (typeof lb.showModal === "function") lb.showModal(); else window.open(btn.dataset.full, "_blank");
}));
document.getElementById("lbClose").addEventListener("click", () => lb.close());
lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });

/* ---------- Size finder ---------- */
const SIZES = [
  { size: "2.2", mm: 54.0 },
  { size: "2.4", mm: 57.2 },
  { size: "2.6", mm: 60.3 },
  { size: "2.8", mm: 63.5 },
  { size: "2.10", mm: 66.7 },
];
const sizeInput = document.getElementById("sizeMm");
const sizeResult = document.getElementById("sizeResult");
const rows = document.querySelectorAll(".size-table tbody tr");
function findSize(mm) {
  // Smallest size that is at least as wide as the measurement (round up when between sizes).
  return SIZES.find((s) => s.mm >= mm - 0.5) || null;
}
sizeInput.addEventListener("input", () => {
  const mm = parseFloat(sizeInput.value);
  rows.forEach((r) => r.classList.remove("match"));
  if (!mm) { sizeResult.textContent = "Your size will appear here."; return; }
  if (mm < 48 || mm > 75) { sizeResult.textContent = "That looks outside the usual range (about 50 to 70 mm). Check the measurement, or message us for a custom size."; return; }
  const s = findSize(mm);
  if (!s) { sizeResult.innerHTML = "Larger than 2.10. Message us and we'll make it to your size."; return; }
  sizeResult.innerHTML = `<strong>${s.size}</strong>is your size (${s.mm} mm inside).`;
  document.querySelector(`.size-table tr[data-size="${s.size}"]`)?.classList.add("match");
});
document.getElementById("sizeForm").addEventListener("submit", (e) => e.preventDefault());

/* ---------- Contact form: opens WhatsApp or email with the message filled in ---------- */
const form = document.getElementById("contactForm");
const errorEl = document.getElementById("cfError");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const via = e.submitter?.dataset.via || (hasWhatsApp ? "whatsapp" : "email");
  const v = (id) => document.getElementById(id).value.trim();
  if (!v("cfName")) { errorEl.textContent = "Please add your name so we know who to reply to."; document.getElementById("cfName").focus(); return; }
  errorEl.textContent = "";
  const lines = [
    `Hi Moura Creations, this is ${v("cfName")}.`,
    v("cfDesign") && `Design: ${v("cfDesign")}`,
    v("cfSize") && `Size: ${v("cfSize")}`,
    v("cfColour") && `Colour: ${v("cfColour")}`,
    v("cfMsg"),
    v("cfPhone") && `My number: ${v("cfPhone")}`,
  ].filter(Boolean);
  const text = lines.join("\n");
  if (via === "whatsapp" && hasWhatsApp) window.open(waLink(text), "_blank", "noopener");
  else window.location.href = mailLink(`Bangle enquiry from ${v("cfName")}`, text);
});

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
