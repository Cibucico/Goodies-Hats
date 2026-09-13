export type Hat = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: "wedding" | "funeral" | "fascinator" | "church" | "custom";
  occasion: "wedding" | "funeral" | "both";
  colors: string[];
  description: string;
  image: string;
  images: string[];
  sizes: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  source?: string;
  rating: number;
  reviews: number;
};

export type Order = {
  id: string;
  date: string;
  status: "received" | "in_production" | "quality_check" | "shipped" | "out_for_delivery" | "delivered";
  items: { hat: Hat; qty: number; color: string; size: string }[];
  total: number;
  estimatedDelivery: string;
  trackingNumber: string;
  address: string;
};

export const hats: Hat[] = [
  // ── WEDDING HATS ──────────────────────────────────────────
  {
    id: "wh-001",
    name: "Royal Blue Sinamay Wide-Brim",
    price: 850,
    originalPrice: 1100,
    category: "wedding",
    occasion: "wedding",
    colors: ["Royal Blue", "Cobalt", "Navy"],
    description:
      "Stunning wide-brim sinamay hat perfect for bridesmaids and mother of the bride. Features bold blue weave with floral accent and ribbon trim. A signature SA church wedding look.",
    image:
      "https://images.unsplash.com/photo-1633677263781-610f76009206?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1633677263781-610f76009206?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1633677263253-6d61486a34e8?w=600&h=600&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviews: 87,
    source: "Goodies Hats",
  },
  {
    id: "wh-002",
    name: "Hot Pink Floral Statement Hat",
    price: 920,
    category: "wedding",
    occasion: "wedding",
    colors: ["Hot Pink", "Rose", "Fuchsia"],
    description:
      "Eye-catching wide-brim hat adorned with 3D floral embellishments. Perfect for the mother of the bride or wedding guest who wants to turn heads. Pure SA fashion royalty.",
    image:
      "https://images.unsplash.com/photo-1601980265524-04468b355ac3?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1601980265524-04468b355ac3?w=600&h=600&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L"],
    inStock: true,
    isBestseller: true,
    rating: 4.8,
    reviews: 64,
    source: "Goodies Hats",
  },
  {
    id: "wh-003",
    name: "Blush Pink Bridal Fascinator Set",
    price: 680,
    originalPrice: 780,
    category: "fascinator",
    occasion: "wedding",
    colors: ["Blush Pink", "Champagne", "Ivory"],
    description:
      "Elegant bridal fascinator with delicate lace netting and feather trim. Available as matching sets for bridal parties of 4–10. Handcrafted in South Africa.",
    image:
      "https://images.unsplash.com/photo-1580973618808-4c024bd76d70?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1580973618808-4c024bd76d70?w=600&h=600&fit=crop&q=80",
    ],
    sizes: ["One Size"],
    inStock: true,
    isNew: true,
    rating: 4.7,
    reviews: 43,
    source: "Goodies Hats",
  },
  {
    id: "wh-004",
    name: "Sunshine Yellow Wide Brim",
    price: 795,
    category: "wedding",
    occasion: "wedding",
    colors: ["Sunshine Yellow", "Gold", "Mustard"],
    description:
      "Bold yellow sinamay hat with sculptured brim and sunflower accent. Makes any wedding guest unforgettable. A true Mzansi statement piece.",
    image:
      "https://images.unsplash.com/photo-1686562376391-966faa514647?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1686562376391-966faa514647?w=600&h=600&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    rating: 4.6,
    reviews: 31,
    source: "Goodies Hats",
  },
  {
    id: "wh-005",
    name: "Ivory & Gold Church Brim",
    price: 1050,
    category: "wedding",
    occasion: "both",
    colors: ["Ivory", "Cream", "Champagne Gold"],
    description:
      "Sophisticated ivory sinamay with gold trim detailing. Wide brim for maximum elegance at weddings and upmarket church events. The classic choice for mothers.",
    image:
      "https://images.unsplash.com/photo-1633677263253-6d61486a34e8?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1633677263253-6d61486a34e8?w=600&h=600&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    isBestseller: true,
    rating: 4.9,
    reviews: 102,
    source: "Goodies Hats",
  },
  {
    id: "wh-006",
    name: "Lavender Purple Pillbox Hat",
    price: 620,
    category: "church",
    occasion: "both",
    colors: ["Lavender", "Purple", "Mauve"],
    description:
      "Structured pillbox sinamay hat in rich lavender with purple floral corsage. Lightweight and comfortable for all-day wear at weddings and church services.",
    image:
      "https://images.unsplash.com/photo-1784725557358-d58d0d4c1baf?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1784725557358-d58d0d4c1baf?w=600&h=600&fit=crop&q=80",
    ],
    sizes: ["One Size", "S", "M"],
    inStock: true,
    rating: 4.5,
    reviews: 28,
    source: "Goodies Hats",
  },
  // ── FUNERAL HATS ──────────────────────────────────────────
  {
    id: "fh-001",
    name: "Classic Black Wide Brim Mourning Hat",
    price: 750,
    category: "funeral",
    occasion: "funeral",
    colors: ["Jet Black", "Charcoal"],
    description:
      "Dignified wide-brim sinamay in deep black with black satin bow. The respectful choice for funeral services, memorial services and umngcwabo. Timeless SA elegance.",
    image:
      "https://images.unsplash.com/photo-1779447810263-9ac2da5cf6f9?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1779447810263-9ac2da5cf6f9?w=600&h=600&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    isBestseller: true,
    rating: 4.9,
    reviews: 156,
    source: "Goodies Hats",
  },
  {
    id: "fh-002",
    name: "Navy Blue Funeral Fascinator",
    price: 490,
    originalPrice: 590,
    category: "funeral",
    occasion: "funeral",
    colors: ["Navy Blue", "Midnight Blue"],
    description:
      "Modest navy fascinator with veil netting and feather accent. Understated and respectful. Perfect for church funerals and formal memorial services.",
    image:
      "https://images.unsplash.com/photo-1595968314106-3decaba30aad?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1595968314106-3decaba30aad?w=600&h=600&fit=crop&q=80",
    ],
    sizes: ["One Size"],
    inStock: true,
    rating: 4.7,
    reviews: 89,
    source: "Goodies Hats",
  },
  {
    id: "fh-003",
    name: "Deep Maroon Structured Brim",
    price: 820,
    category: "funeral",
    occasion: "funeral",
    colors: ["Maroon", "Burgundy", "Wine"],
    description:
      "Rich maroon sinamay hat with gold trim detail — a respectful yet dignified choice. Ideal for church funeral services. Velvet inner band for comfort.",
    image:
      "https://images.unsplash.com/photo-1585643481460-8152d117b787?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1585643481460-8152d117b787?w=600&h=600&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L"],
    inStock: true,
    isNew: true,
    rating: 4.6,
    reviews: 44,
    source: "Goodies Hats",
  },
  {
    id: "fh-004",
    name: "Black Lace Mourning Fascinator",
    price: 420,
    category: "funeral",
    occasion: "funeral",
    colors: ["Black"],
    description:
      "Delicate black lace fascinator with veil and black rose detail. A refined, respectful piece for funeral services. Lightweight and easy to wear all day.",
    image:
      "https://images.unsplash.com/photo-1615120982490-c5b7cf8b3fe1?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1615120982490-c5b7cf8b3fe1?w=600&h=600&fit=crop&q=80",
    ],
    sizes: ["One Size"],
    inStock: true,
    rating: 4.8,
    reviews: 72,
    source: "Goodies Hats",
  },
  {
    id: "fh-005",
    name: "Dark Forest Green Mourning Brim",
    price: 760,
    category: "funeral",
    occasion: "funeral",
    colors: ["Forest Green", "Dark Green"],
    description:
      "Deep forest green sinamay wide brim with black trim — appropriate for church and traditional funeral ceremonies. A respectful alternative to black.",
    image:
      "https://images.unsplash.com/photo-1620686847763-2e234d23e825?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1620686847763-2e234d23e825?w=600&h=600&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    rating: 4.5,
    reviews: 33,
    source: "Goodies Hats",
  },
  // ── CHURCH/MULTI-OCCASION ─────────────────────────────────
  {
    id: "ch-001",
    name: "Teal & Gold Sinamay Showstopper",
    price: 990,
    category: "church",
    occasion: "wedding",
    colors: ["Teal", "Turquoise", "Gold"],
    description:
      "Extraordinary teal wide-brim sinamay with gold embroidery accents. Perfect for weddings, Easter Sunday, graduation church services. Pure Mzansi head fashion.",
    image:
      "https://images.unsplash.com/photo-1603645108226-7e6d971ffb53?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1603645108226-7e6d971ffb53?w=600&h=600&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L"],
    inStock: true,
    isBestseller: true,
    rating: 4.9,
    reviews: 118,
    source: "Goodies Hats",
  },
  {
    id: "ch-002",
    name: "Candy Pink Matching Bridal Set (×6)",
    price: 4200,
    originalPrice: 5100,
    category: "wedding",
    occasion: "wedding",
    colors: ["Candy Pink", "Blush", "Rose"],
    description:
      "Complete set of 6 matching candy pink wide-brim sinamay hats. Perfect for bridesmaids — all made to match your exact colour code. Delivery 14–21 days.",
    image:
      "https://images.unsplash.com/photo-1633677264398-8fbedfe2cccd?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1633677264398-8fbedfe2cccd?w=600&h=600&fit=crop&q=80",
    ],
    sizes: ["Set of 6"],
    inStock: true,
    isNew: true,
    rating: 5.0,
    reviews: 19,
    source: "Goodies Hats",
  },
];

export const mockOrders: Order[] = [
  {
    id: "GH-2024-0892",
    date: "2024-11-28",
    status: "shipped",
    items: [
      {
        hat: hats[0],
        qty: 1,
        color: "Royal Blue",
        size: "M",
      },
    ],
    total: 850,
    estimatedDelivery: "2024-12-05",
    trackingNumber: "SA-TRK-9923811",
    address: "45 Tshwane Drive, Pretoria, 0001",
  },
  {
    id: "GH-2024-0763",
    date: "2024-11-20",
    status: "delivered",
    items: [
      {
        hat: hats[6],
        qty: 1,
        color: "Jet Black",
        size: "L",
      },
    ],
    total: 750,
    estimatedDelivery: "2024-11-27",
    trackingNumber: "SA-TRK-8812634",
    address: "12 Mandela Street, Soweto, 1804",
  },
];

export const STATUS_STEPS = [
  { key: "received", label: "Order Received", icon: "📦" },
  { key: "in_production", label: "Being Handcrafted", icon: "🪡" },
  { key: "quality_check", label: "Quality Check", icon: "✅" },
  { key: "shipped", label: "Shipped", icon: "🚚" },
  { key: "out_for_delivery", label: "Out for Delivery", icon: "📍" },
  { key: "delivered", label: "Delivered", icon: "🎉" },
] as const;
