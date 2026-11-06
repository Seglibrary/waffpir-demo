// WaffPir menü verisi — fiyatları ve ürünleri buradan düzenle.
// Kaynak: Trendyol Yemek (liste fiyatları). Fiyatlar henüz işletmeyle doğrulanmadı.

const LINKS = {
  // Uber Eats (eski Trendyol Go) — link eski tgoyemek.com adresi; yönlendirme çalışmıyorsa güncelle
  trendyol: "https://tgoyemek.com/restoranlar/474288",
  yemeksepeti: "https://www.yemeksepeti.com/restaurant/awpz/waffpir-waffle-and-kumpir-awpz?lat=41.033859&lng=29.170872",
};

const BRANCHES = ["Ümraniye", "Ataşehir", "Maltepe", "Çekmeköy", "Esatpaşa", "K. Bakkalköy", "Kartal"];

const MENU = [
  {
    id: "kumpir", title: "Kumpir", emoji: "🥔",
    note: "Her kumpirde tereyağı ve kaşar var, gerisi senin seçimin.",
    items: [
      { name: "0-1 Malzemeli Kumpir", desc: "Kaşar, tereyağı", price: 399.99 },
      { name: "3 Malzemeli Kumpir", desc: "Tereyağı, kaşar + 3 malzeme", price: 479.99 },
      { name: "5 Malzemeli Kumpir", desc: "Tereyağı, kaşar + 5 malzeme", price: 484.99, popular: true },
      { name: "7 Malzemeli Kumpir", desc: "Tereyağı, kaşar + 7 malzeme", price: 489.99 },
      { name: "10 Malzemeli Full Kumpir", desc: "Tereyağı, kaşar + 10 malzeme", price: 494.99 },
    ],
  },
  {
    id: "gurme", title: "Gurme Kumpirler", emoji: "🔥",
    note: "Hazır tarifler, seçmek zorunda değilsin.",
    items: [
      { name: "Gamer Kumpir", desc: "Çift kaşar, amerikan salata, sosis, mısır", price: 484.99 },
      { name: "Maxicano Kumpir", desc: "Jalapeno, sosis, acılı ezme, mantar, amerikan salata, mısır, siyah zeytin", price: 479.99 },
      { name: "Max Doy Kumpir", desc: "Çift patates iç, çift kaşar, 5 malzeme", price: 524.99 },
    ],
  },
  {
    id: "waffle", title: "Waffle", emoji: "🧇",
    note: "Belçika'dan gelen lezzet, malzemeni sen seç.",
    items: [
      { name: "Waffle (Sandviç)", desc: "Malzemeni seç", price: 429.99, popular: true },
      { name: "Waffle (Tabakta Papatya)", desc: "Malzemeni seç", price: 484.99 },
      { name: "Katlı Waffle", desc: "İki kat hamur, malzemeni seç", price: 524.99 },
    ],
  },
  {
    id: "bruksel", title: "Brüksel Waffle", emoji: "🍫",
    note: "Günlük hamur, hazır tariflerle.",
    items: [
      { name: "Special Brüksel", desc: "Süt, beyaz, süt-drop, beyaz-drop çikolata; muz, çilek, portakal, fındık, fıstık", price: 429.99 },
      { name: "Waffpir Bar Brüksel", desc: "Süt, beyaz, antep fıstıklı, süt-drop, beyaz-drop çikolata; muz, çilek, fındık, yer fıstığı, antep fıstığı", price: 449.99 },
      { name: "Waffpir Dark Brüksel", desc: "Bitter çikolata, muz, bitter-drop, fındık, yer fıstığı, antep fıstığı", price: 429.99 },
      { name: "Waffpir Tutku Brüksel", desc: "Süt, beyaz, ahududu, ahududu-drop, süt-drop çikolata; çilek, muz, portakal, vişne", price: 429.99 },
      { name: "Waffpir Delicios Premium Brüksel", desc: "Süt ve antep fıstıklı çikolata, muz, çilek, kiraz, ahududu-drop, antep fıstığı", price: 439.99 },
      { name: "Çocuk Brüksel", desc: "Süt ve ahududu çikolata, muz, çilek, çakıl şeker, minibon", price: 399.99 },
      { name: "Waffpir My Brüksel", desc: "Günlük hamur, malzemeni seç", price: 434.99 },
    ],
  },
  {
    id: "bowl", title: "Bowl Waffle", emoji: "🥣",
    note: "Brüksel tariflerinin kasede hali.",
    items: [
      { name: "Special Bowl", desc: "Special Brüksel malzemeleriyle", price: 449.99 },
      { name: "Bar Bowl", desc: "Bar Brüksel malzemeleriyle", price: 489.99, popular: true },
      { name: "Dark Bowl", desc: "Dark Brüksel malzemeleriyle", price: 449.99 },
      { name: "Tutku Bowl", desc: "Tutku Brüksel malzemeleriyle", price: 449.99 },
      { name: "Delicios Premium Bowl", desc: "Delicios Premium malzemeleriyle", price: 469.99 },
      { name: "Çocuk Bowl", desc: "Çocuk Brüksel malzemeleriyle", price: 439.99 },
      { name: "My Bowl", desc: "Günlük hamur, malzemeni seç", price: 479.99 },
    ],
  },
  {
    id: "cup", title: "Bardak Waffle", emoji: "🥤",
    note: "Yürürken yemelik, en uygun fiyatlı seçenek.",
    items: [
      { name: "Special Cup", desc: "Special Brüksel malzemeleriyle", price: 299.99 },
      { name: "Bar Cup", desc: "Bar Brüksel malzemeleriyle", price: 299.99 },
      { name: "Dark Cup", desc: "Dark Brüksel malzemeleriyle", price: 299.99 },
      { name: "Tutku Cup", desc: "Tutku Brüksel malzemeleriyle", price: 299.99 },
      { name: "Delicios Premium Cup", desc: "Delicios Premium malzemeleriyle", price: 339.99 },
      { name: "Çocuk Cup", desc: "Çocuk Brüksel malzemeleriyle", price: 289.99 },
      { name: "My Cup", desc: "Günlük hamur, malzemeni seç", price: 309.99 },
    ],
  },
  {
    id: "icecek", title: "İçecekler", emoji: "🥤",
    note: "",
    items: [
      { name: "Pepsi / Pepsi Zero 330 ml", desc: "Kutu", price: 80 },
      { name: "Yedigün / 7UP 330 ml", desc: "Kutu", price: 80 },
      { name: "Lipton Ice Tea (Şeftali, Limon) 330 ml", desc: "Kutu", price: 80 },
      { name: "Lipton Sparkling 330 ml", desc: "Tropikal meyve", price: 80 },
      { name: "Tropicana (Karışık, Şeftali, Vişne) 330 ml", desc: "Kutu", price: 80 },
      { name: "Pepsi 1 Lt", desc: "", price: 130 },
      { name: "Yedigün 1 Lt", desc: "", price: 80 },
      { name: "Soda Limon", desc: "", price: 60 },
      { name: "Soda 20 cl", desc: "Cam şişe", price: 40 },
      { name: "Su 50 cl", desc: "", price: 30 },
    ],
  },
];

// Menüdeki hazır tariflerin görsel temsili (ürün fotoğrafı olmayan kategoriler için)
const CATEGORY_IMAGES = {
  kumpir: "assets/kumpir-bowl.png",
  gurme: "assets/post-kumpir-lezzet.jpg",
  waffle: "assets/sandwich.jpg",
  bruksel: "assets/waffle-plate.png",
  bowl: "assets/post-mola.jpg",
  cup: "assets/post-katli.jpg",
  icecek: "assets/post-paket.jpg",
};
