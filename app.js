(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const money = n => "₺" + n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  /* mobil menü */
  const toggle = $(".nav__toggle"), links = $("#navlinks");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", e => { if (e.target.closest("a")) { links.classList.remove("is-open"); toggle.setAttribute("aria-expanded", false); } });

  /* sipariş linkleri */
  $("#lnkTy").href = LINKS.trendyol;
  $("#lnkYs").href = LINKS.yemeksepeti;
  $("#yr").textContent = new Date().getFullYear();

  /* şubeler */
  $("#branchGrid").innerHTML = BRANCHES.map(b =>
    `<li><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("WaffPir Waffle Kumpir " + b)}" target="_blank" rel="noopener"><b>${b}</b><small>Yol tarifi al →</small></a></li>`
  ).join("");

  /* menü sekmeleri */
  const tabs = $("#tabs"), panel = $("#panel");
  tabs.innerHTML = MENU.map((c, i) =>
    `<button class="tab" role="tab" id="tab-${c.id}" aria-selected="${i === 0}" aria-controls="panel" data-id="${c.id}">${c.emoji} ${c.title}</button>`
  ).join("");

  function showCat(id) {
    const c = MENU.find(x => x.id === id);
    tabs.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", t.dataset.id === id));
    const img = CATEGORY_IMAGES[id];
    const cut = img.endsWith(".png");
    panel.setAttribute("aria-labelledby", "tab-" + id);
    panel.innerHTML = `
      <div class="cat">
        <img src="${img}" alt="" class="${cut ? "is-cut" : ""}" loading="lazy">
        <div><h3>${c.title}</h3>${c.note ? `<p>${c.note}</p>` : ""}</div>
      </div>
      <div class="items">${c.items.map(it => `
        <article class="item">
          <div><h4>${it.name}${it.popular ? ' <span class="badge">★ Çok sevilen</span>' : ""}</h4>${it.desc ? `<p>${it.desc}</p>` : ""}</div>
          <div class="item__price">${money(it.price)}</div>
        </article>`).join("")}</div>`;
  }
  tabs.addEventListener("click", e => { const t = e.target.closest(".tab"); if (t) showCat(t.dataset.id); });
  showCat(MENU[0].id);

  /* tasarla */
  const INGR = {
    kumpir: [
      ["Soslar & Peynir", ["Mayonez", "Ketçap", "Acı sos", "Tzatziki", "Ekstra kaşar"]],
      ["Et & Sucuk", ["Sosis", "Sucuk", "Salam", "Ton balığı"]],
      ["Sebze & Turşu", ["Mısır", "Amerikan salata", "Rus salatası", "Jalapeno", "Mantar", "Siyah zeytin", "Yeşil zeytin", "Turşu", "Havuç", "Acılı ezme"]],
    ],
    waffle: [
      ["Çikolata", ["Süt çikolata", "Beyaz çikolata", "Bitter çikolata", "Antep fıstıklı çikolata", "Ahududu çikolata", "Süt drop", "Beyaz drop"]],
      ["Meyve", ["Muz", "Çilek", "Portakal", "Vişne", "Kiraz", "Ahududu"]],
      ["Kuruyemiş & Şeker", ["Fındık", "Yer fıstığı", "Antep fıstığı", "Çakıl şeker", "Minibon"]],
    ],
  };
  const TIERS = [[1, "0-1 Malzemeli Kumpir", 399.99], [3, "3 Malzemeli Kumpir", 479.99], [5, "5 Malzemeli Kumpir", 484.99], [7, "7 Malzemeli Kumpir", 489.99], [10, "10 Malzemeli Full Kumpir", 494.99]];
  const WAFFLE_PRICE = 434.99; // Waffpir My Brüksel

  let mode = "kumpir";
  const picked = { kumpir: new Set(), waffle: new Set() };

  function renderChips() {
    $("#chips").innerHTML = INGR[mode].map(([g, list]) => `
      <div class="group"><h3>${g}</h3><div class="chips">
        ${list.map(n => `<button type="button" class="chip" aria-pressed="${picked[mode].has(n)}" data-n="${n}">${n}</button>`).join("")}
      </div></div>`).join("");
    renderSummary();
  }

  function renderSummary() {
    const s = picked[mode], n = s.size;
    $("#sumTitle").textContent = mode === "kumpir" ? "Kumpirin" : "Waffle'ın";
    $("#sumCount").textContent = n;
    $("#sumList").innerHTML = [...s].map(x => `<li>${x}</li>`).join("");
    if (mode === "kumpir") {
      const t = TIERS.find(t => n <= t[0]) || TIERS[TIERS.length - 1];
      $("#sumTier").textContent = n > 10 ? "En fazla 10 malzeme: Full Kumpir" : t[1];
      $("#sumPrice").textContent = money(t[2]);
    } else {
      $("#sumTier").textContent = "Brüksel Waffle (malzemeni seç)";
      $("#sumPrice").textContent = money(WAFFLE_PRICE);
    }
  }

  $("#chips").addEventListener("click", e => {
    const c = e.target.closest(".chip"); if (!c) return;
    const s = picked[mode], n = c.dataset.n;
    s.has(n) ? s.delete(n) : s.add(n);
    c.setAttribute("aria-pressed", s.has(n));
    renderSummary();
  });
  document.querySelectorAll(".switch__btn").forEach(b => b.addEventListener("click", () => {
    mode = b.dataset.mode;
    document.querySelectorAll(".switch__btn").forEach(x => x.classList.toggle("is-on", x === b));
    renderChips();
  }));
  $("#sumReset").addEventListener("click", () => { picked[mode].clear(); renderChips(); });
  renderChips();

  /* mobil sabit sipariş butonu: sipariş bölümü görünürken gizle */
  const sticky = $("#stickyOrder"), orderSec = $("#siparis");
  if (sticky && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => sticky.classList.toggle("is-hidden", e.isIntersecting), { threshold: 0.25 }).observe(orderSec);
  }
})();
