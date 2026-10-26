/* ===== ✏️ عدّل هنا ===== */
const CONFIG = {
  whatsapp: "966564146686",        // رقم واتساب سكون بالصيغة الدولية بدون + أو أصفار
  phoneShow: "0564146686",          // الرقم الظاهر في الصفحة
  cvUrl: "https://6ac117acf54ad5a7e5a4e93e--creative-monstera-9ee509.netlify.app/"                         // رابط موقع السيرة الذاتية (يظهر في أسفل الصفحة)
};

const PRODUCTS = [
  { t: "المراتب", d: "راحة نوم متوازنة تدعم جسمك وتمنحك صباحاً أنشط." },
  { t: "اللحافات", d: "دفء ناعم يرافق نومك في كل الفصول." },
  { t: "المخدات", d: "وسائد مريحة بنقش النجمة الهادئ لتكتمل تفاصيل غرفتك." },
  { t: "المفروشات", d: "مفروشات مختارة بعناية تحوّل غرفة النوم إلى واحة سكينة." }
];

/* ===== الكود ===== */
const msg = (about) => about === "general"
  ? "السلام عليكم، أرغب بالاستفسار عن منتجات سكون."
  : `السلام عليكم، أرغب بالاستفسار عن ${about} من سكون.`;
const wa = (about) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg(about))}`;

document.getElementById("products").innerHTML = PRODUCTS.map((p) =>
  `<article class="card reveal"><i class="star"></i><h3>${p.t}</h3><p>${p.d}</p>
   <a data-wa="${p.t}" target="_blank" rel="noopener">اسأل عنها عبر واتساب</a></article>`).join("");

document.querySelectorAll("[data-wa]").forEach((el) => {
  el.href = wa(el.dataset.wa); el.target = "_blank"; el.rel = "noopener";
});
document.getElementById("phone").textContent = CONFIG.phoneShow;
document.getElementById("year").textContent = new Date().getFullYear();

const header = document.getElementById("header"), nav = document.getElementById("nav");
addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 10), { passive: true });
document.getElementById("burger").onclick = () => nav.classList.toggle("open");
nav.addEventListener("click", () => nav.classList.remove("open"));

const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* حماية: لو الصور أو الشعار ما ظهروا (مجلد assets ناقص) يبقى الموقع مرتباً */
function fixBroken(img) {
  if (img.closest(".logo")) {
    const t = document.createElement("span"); t.className = "logo-text"; t.textContent = "سكون"; img.replaceWith(t);
  } else if (img.closest(".hero-img")) { img.closest(".hero-img").classList.add("no-img"); }
  else img.classList.add("no-img");
}
document.querySelectorAll("img").forEach((img) => {
  if (img.complete && img.naturalWidth === 0) fixBroken(img);
  else img.addEventListener("error", () => fixBroken(img), { once: true });
});

/* رابط الرجوع لموقع السيرة الذاتية */
if (CONFIG.cvUrl) { const c = document.getElementById("credit"); c.href = CONFIG.cvUrl; c.hidden = false; }
