const animatedItems = document.querySelectorAll(
  ".section, .metric, .capability, .visual-band, .figure-card, .task-panel, .dataset-card, .task-card, .taxonomy-card"
);
const contact = document.querySelector(".contact");
const contactButton = document.querySelector(".button--contact");
const eventPreviewImg = document.querySelector("#event-preview-img");
const eventPreviewType = document.querySelector("#event-preview-type");
const eventPreviewName = document.querySelector("#event-preview-name");
const eventPreviewCopy = document.querySelector("#event-preview-copy");
const eventChips = document.querySelectorAll(".event-chip");
const taxonomyChart = document.querySelector("#taxonomy-chart");
const taxonomyHover = document.querySelector("#taxonomy-hover");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  animatedItems.forEach((item) => {
    item.classList.add("reveal");
    observer.observe(item);
  });
} else {
  animatedItems.forEach((item) => item.classList.add("is-visible"));
}

if (contact && contactButton) {
  contactButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = contact.classList.toggle("is-open");
    contactButton.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!contact.contains(event.target)) {
      contact.classList.remove("is-open");
      contactButton.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      contact.classList.remove("is-open");
      contactButton.setAttribute("aria-expanded", "false");
    }
  });
}

function setEventPreview(chip) {
  eventChips.forEach((item) => item.classList.remove("is-active"));
  chip.classList.add("is-active");
  eventPreviewImg.src = chip.dataset.image;
  eventPreviewImg.alt = `${chip.dataset.name} tactical event thumbnail`;
  eventPreviewType.textContent = chip.dataset.type;
  eventPreviewName.textContent = chip.dataset.name;
  eventPreviewCopy.textContent = chip.dataset.copy;
}

eventChips.forEach((chip) => {
  chip.addEventListener("mouseenter", () => setEventPreview(chip));
  chip.addEventListener("focus", () => setEventPreview(chip));
  chip.addEventListener("click", () => setEventPreview(chip));
});

const taxonomyData = [
  {
    type: "Build-up",
    color: "#b482de",
    items: [{ name: "Build", count: 472 }],
  },
  {
    type: "Transition",
    color: "#d9a640",
    items: [
      { name: "Ball Win", count: 1566 },
      { name: "Progression", count: 898 },
    ],
  },
  {
    type: "Threat",
    color: "#d94a38",
    items: [
      { name: "Goal", count: 33 },
      { name: "Shot Off Target", count: 117 },
      { name: "Shot Saved", count: 70 },
      { name: "Clearance", count: 119 },
      { name: "Defended", count: 84 },
    ],
  },
  {
    type: "Set Piece",
    color: "#2185b6",
    items: [
      { name: "Corner", count: 85 },
      { name: "Free Kick", count: 173 },
      { name: "Penalty", count: 6 },
      { name: "Throw-in", count: 408 },
      { name: "Kick-off", count: 24 },
      { name: "Goal Kick", count: 38 },
    ],
  },
  {
    type: "Interruption",
    color: "#2f8f46",
    items: [{ name: "Stoppage", count: 191 }],
  },
];

function polarToCartesian(cx, cy, radius, angle) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function arcPath(cx, cy, innerRadius, outerRadius, startAngle, endAngle) {
  const outerStart = polarToCartesian(cx, cy, outerRadius, endAngle);
  const outerEnd = polarToCartesian(cx, cy, outerRadius, startAngle);
  const innerStart = polarToCartesian(cx, cy, innerRadius, startAngle);
  const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", outerStart.x, outerStart.y,
    "A", outerRadius, outerRadius, 0, largeArc, 0, outerEnd.x, outerEnd.y,
    "L", innerStart.x, innerStart.y,
    "A", innerRadius, innerRadius, 0, largeArc, 1, innerEnd.x, innerEnd.y,
    "Z",
  ].join(" ");
}

function tint(hex, amount) {
  const clean = hex.replace("#", "");
  const num = Number.parseInt(clean, 16);
  const r = Math.min(255, Math.round((num >> 16) + (255 - (num >> 16)) * amount));
  const g = Math.min(255, Math.round(((num >> 8) & 255) + (255 - ((num >> 8) & 255)) * amount));
  const b = Math.min(255, Math.round((num & 255) + (255 - (num & 255)) * amount));
  return `rgb(${r}, ${g}, ${b})`;
}

function makeSvgElement(name, attrs = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function setTaxonomyHover(label, detail) {
  if (!taxonomyHover) return;
  taxonomyHover.querySelector("span").textContent = label;
  taxonomyHover.querySelector("strong").textContent = detail;
}

function buildTaxonomyChart() {
  if (!taxonomyChart) return;

  const total = taxonomyData.reduce(
    (sum, group) => sum + group.items.reduce((inner, item) => inner + item.count, 0),
    0
  );
  const cx = 340;
  const cy = 340;
  const gap = 1.2;
  let angle = -126;

  const layer = makeSvgElement("g", { class: "taxonomy-layer" });
  taxonomyChart.appendChild(layer);

  taxonomyData.forEach((group) => {
    const groupTotal = group.items.reduce((sum, item) => sum + item.count, 0);
    const groupStart = angle;
    const groupEnd = angle + (groupTotal / total) * 360;

    const groupPath = makeSvgElement("path", {
      class: "segment",
      d: arcPath(cx, cy, 92, 174, groupStart + gap, groupEnd - gap),
      fill: group.color,
      opacity: "0.9",
    });
    groupPath.addEventListener("mouseenter", () => {
      setTaxonomyHover(group.type, `${groupTotal.toLocaleString()} event labels`);
    });
    groupPath.addEventListener("focus", () => {
      setTaxonomyHover(group.type, `${groupTotal.toLocaleString()} event labels`);
    });
    const groupTitle = makeSvgElement("title");
    groupTitle.textContent = `${group.type}: ${groupTotal.toLocaleString()}`;
    groupPath.appendChild(groupTitle);
    layer.appendChild(groupPath);

    const groupMid = (groupStart + groupEnd) / 2;
    if (groupEnd - groupStart > 20) {
      const groupPoint = polarToCartesian(cx, cy, 133, groupMid);
      const groupLabel = makeSvgElement("text", {
        class: "taxonomy-label",
        x: groupPoint.x,
        y: groupPoint.y - 4,
        "text-anchor": "middle",
        "dominant-baseline": "middle",
      });
      groupLabel.textContent = group.type;
      layer.appendChild(groupLabel);

      const groupCount = makeSvgElement("text", {
        class: "taxonomy-count",
        x: groupPoint.x,
        y: groupPoint.y + 16,
        "text-anchor": "middle",
        "dominant-baseline": "middle",
      });
      groupCount.textContent = groupTotal.toLocaleString();
      layer.appendChild(groupCount);
    }

    let itemAngle = groupStart;
    group.items.forEach((item, index) => {
      const itemStart = itemAngle;
      const itemEnd = itemAngle + (item.count / total) * 360;
      const itemMid = (itemStart + itemEnd) / 2;
      const color = tint(group.color, index * 0.06);
      const path = makeSvgElement("path", {
        class: "segment",
        d: arcPath(cx, cy, 188, 288, itemStart + gap, itemEnd - gap),
        fill: color,
        tabindex: "0",
      });
      path.addEventListener("mouseenter", () => {
        setTaxonomyHover(`${group.type} · ${item.name}`, `${item.count.toLocaleString()} event labels`);
      });
      path.addEventListener("focus", () => {
        setTaxonomyHover(`${group.type} · ${item.name}`, `${item.count.toLocaleString()} event labels`);
      });
      const title = makeSvgElement("title");
      title.textContent = `${group.type} · ${item.name}: ${item.count.toLocaleString()}`;
      path.appendChild(title);
      layer.appendChild(path);

      itemAngle = itemEnd;
    });

    angle = groupEnd;
  });

  const center = makeSvgElement("circle", {
    cx,
    cy,
    r: 80,
    fill: "#ffffff",
    stroke: "#dfe5dc",
    "stroke-width": "1",
  });
  taxonomyChart.appendChild(center);

  const totalText = makeSvgElement("text", {
    class: "taxonomy-center-total",
    x: cx,
    y: cy - 4,
    "text-anchor": "middle",
    "dominant-baseline": "middle",
  });
  totalText.textContent = total.toLocaleString();
  taxonomyChart.appendChild(totalText);

  const labelText = makeSvgElement("text", {
    class: "taxonomy-center-label",
    x: cx,
    y: cy + 34,
    "text-anchor": "middle",
    "dominant-baseline": "middle",
  });
  labelText.textContent = "event labels";
  taxonomyChart.appendChild(labelText);
}

function updateChartGrowth() {
  if (!taxonomyChart) return;

  const layer = taxonomyChart.querySelector(".taxonomy-layer");
  if (!layer) return;

  const rect = taxonomyChart.getBoundingClientRect();
  const start = window.innerHeight * 0.9;
  const end = window.innerHeight * 0.18;
  const progress = (start - rect.top) / (start - end);
  const clamped = Math.max(0, Math.min(1, progress));

  const eased = 1 - Math.pow(1 - clamped, 3);
  layer.setAttribute(
    "transform",
    `translate(340 340) scale(${eased.toFixed(3)}) translate(-340 -340)`
  );
  layer.setAttribute("opacity", String(Math.max(0.2, eased).toFixed(3)));
}

buildTaxonomyChart();
updateChartGrowth();
window.addEventListener("scroll", updateChartGrowth, { passive: true });
window.addEventListener("resize", updateChartGrowth);
