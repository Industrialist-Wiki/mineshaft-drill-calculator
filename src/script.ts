import {
  Resources,
  DrillHeads,
  Acids,
  Oils,
  Depths,
  type DrillheadId,
  type AcidId,
  type OilId,
  type DepthId,
  type DepthYield,
} from "./data";

const Dropdowns = {
  drillHeadDropdown: {
    button: document.getElementById("drill-head-button")!,
    content: document.getElementById("drill-head-content")!,
  },
  acidDropdown: {
    button: document.getElementById("acid-button")!,
    content: document.getElementById("acid-content")!,
  },
  oilDropdown: {
    button: document.getElementById("oil-button")!,
    content: document.getElementById("oil-content")!,
  },
  depthDropdown: {
    button: document.getElementById("depth-button")!,
    content: document.getElementById("depth-content")!,
  },
} as const satisfies Record<
  string,
  { button: HTMLElement; content: HTMLElement }
>;

type DropdownId = keyof typeof Dropdowns;

const Labels = {
  deteriorationLabel: document.getElementById("deterioration-label")!,
  lifetimeLabel: document.getElementById("lifetime-label")!,
  replacementLabel: document.getElementById("replacement-label")!,
  cycleLabel: document.getElementById("cycle-label")!,
  efficiencyLabel: document.getElementById("efficiency-label")!,

  drillHeadLabel: document.getElementById("drill-head-label")!,
  materialsLabel: document.getElementById("materials-label")!,
  acidLabel: document.getElementById("acid-label")!,
  oilLabel: document.getElementById("oil-label")!,
  powerLabel: document.getElementById("power-label")!,

  outputLabel1: document.getElementById("output-label-1")!,
  outputLabel2: document.getElementById("output-label-2")!,
  outputLabel3: document.getElementById("output-label-3")!,
  outputLabel4: document.getElementById("output-label-4")!,
} as const satisfies Record<string, HTMLElement>;

function simplifyTime(time: number): string {
  let unit = "s";

  if (time > 60) {
    time /= 60;
    unit = "m";
    if (time > 60) {
      time /= 60;
      unit = "h";
      if (time > 24) {
        time /= 24;
        unit = "d";
      }
    }
  }
  return truncate(time) + unit;
}

function truncate(number: number): number {
  if (number == 0) return 0;
  const scale = 10 ** (SIG_FIGS - 1 - Math.floor(Math.log10(Math.abs(number))));
  return Math.round(number * scale) / scale;
}

function dropdownButton(
  className: string,
  innerText: string,
  onClick: () => any
) {
  const button = document.createElement("button");
  if (className) button.classList.add(className);
  button.innerText = innerText;
  button.addEventListener("click", onClick);
  return button;
}

function changeDropdownShow(id: DropdownId, change: "hide" | "toggle") {
  (Object.keys(Dropdowns) as DropdownId[]).forEach((dropdownId) => {
    if (dropdownId === id && change === "toggle")
      Dropdowns[dropdownId].content.classList.toggle("show");
    else Dropdowns[dropdownId].content.classList.remove("show");
  });
}

function swapDrillHead(newDrillHead: DrillheadId) {
  selectedDrillHead = newDrillHead;
  const button = Dropdowns.drillHeadDropdown.button;
  button.classList = "dropdown-button " + DrillHeads[newDrillHead].className;
  button.innerText = "Drillhead — " + DrillHeads[newDrillHead].dropdownText;
  changeDropdownShow("drillHeadDropdown", "hide");
}

function swapAcid(newAcid: AcidId) {
  selectedAcid = newAcid;
  const button = Dropdowns.acidDropdown.button;
  button.classList = "dropdown-button " + Acids[newAcid].className;
  button.innerText = "Acid — " + Acids[newAcid].dropdownText;
  changeDropdownShow("acidDropdown", "hide");
}

function swapOil(newOil: OilId) {
  selectedOil = newOil;
  const button = Dropdowns.oilDropdown.button;
  button.classList = "dropdown-button " + Oils[newOil].className;
  button.innerText = "Oil — " + Oils[newOil].dropdownText;
  changeDropdownShow("oilDropdown", "hide");
}

function swapDepth(newDepth: DepthId) {
  selectedDepth = newDepth;
  const button = Dropdowns.depthDropdown.button;
  button.classList = "dropdown-button depth" + newDepth;
  button.innerText = "Depth — " + newDepth + "m";
  changeDropdownShow("depthDropdown", "hide");
}

function recalculateYields() {
  const drillHead = DrillHeads[selectedDrillHead];
  const acid = Acids[selectedAcid];
  const oil = Oils[selectedOil];
  const depth = Depths[selectedDepth];

  const depthForMultis = selectedDepth === 100 ? 300 : selectedDepth;
  const drillHeadMulti = drillHead.getMulti(depthForMultis);
  const acidMulti = acid.getMulti(depthForMultis);
  const machineOil = selectedOil === "machineOil";

  const deteriorationRate =
    0.5 * drillHeadMulti * acidMulti * (machineOil ? 1.1 : 1);
  const replacementTime = 12;
  const travelTime = (2 * selectedDepth) / (machineOil ? 100 : 50);
  const lifeTime = Math.ceil(100 / deteriorationRate);
  const cycleTime = replacementTime + travelTime + lifeTime;
  const efficiency = lifeTime / cycleTime;

  Labels.deteriorationLabel.innerHTML =
    "⛓️‍💥 Deterioration Rate: " + truncate(deteriorationRate) + "%/s";
  Labels.lifetimeLabel.innerHTML = "🕗 Lifetime: " + simplifyTime(lifeTime);
  Labels.replacementLabel.innerHTML =
    "🔄 Replacement Time: " + simplifyTime(replacementTime + travelTime);
  Labels.cycleLabel.innerHTML = "⏳ Cycle Time: " + simplifyTime(cycleTime);
  Labels.efficiencyLabel.innerHTML = `🔧 Efficiency: <b style='color: rgb(${
    (1 - efficiency) * 255
  }, ${efficiency * 255}, 0);'>${truncate(efficiency * 100)}%</b>`;

  Labels.drillHeadLabel.innerHTML = `<div class='${
    drillHead.className
  } squareDisplay drill'></div>${drillHead.infoText}: ${truncate(
    1 / cycleTime
  )}u/s (average), ${truncate(1 / lifeTime)}u/s (active)`;
  Labels.materialsLabel.innerHTML = `<div class='${
    drillHead.className
  } squareDisplay ingot'></div>${drillHead.materialInfoText}: ${truncate(
    drillHead.materialAmount / cycleTime
  )}u/s (average), ${truncate(
    drillHead.materialAmount / lifeTime
  )}u/s (active)`;
  Labels.acidLabel.innerHTML = `${acid.infoText}: ${truncate(
    acid.rate * efficiency
  )}L/s (average), ${acid.rate}L/s (active)`;
  Labels.oilLabel.innerHTML = `${oil.infoText}: ${truncate(
    oil.rate * (1 - replacementTime / cycleTime)
  )}L/s (average), ${oil.rate}L/s (active)`;
  Labels.powerLabel.innerHTML = `⚡ Power: ${truncate(
    3 * efficiency + 0.1
  )}MMF/s (average), 3.1MMF/s (active)`;

  function getInnerText(dy: DepthYield): string {
    const amount = dy.amount * (machineOil ? 1.1 : 1);
    return `${Resources[dy.resourceId]}: ${truncate(
      amount * efficiency
    )}u/s (average), ${truncate(amount)}u/s (active)`;
  }

  Labels.outputLabel1.innerHTML = depth[0] ? getInnerText(depth[0]) : "";
  Labels.outputLabel2.innerHTML = depth[1] ? getInnerText(depth[1]) : "";
  Labels.outputLabel3.innerHTML = depth[2] ? getInnerText(depth[2]) : "";
  Labels.outputLabel4.innerHTML = depth[3] ? getInnerText(depth[3]) : "";

  console.log("Done calculating yields!");
}

const SIG_FIGS = 3;

let selectedDrillHead: DrillheadId;
let selectedAcid: AcidId;
let selectedOil: OilId;
let selectedDepth: DepthId;

(Object.keys(DrillHeads) as DrillheadId[]).forEach((drillHeadId) => {
  const drillHead = DrillHeads[drillHeadId];
  Dropdowns.drillHeadDropdown.content.appendChild(
    dropdownButton(drillHead.className, drillHead.dropdownText, () => {
      swapDrillHead(drillHeadId);
      recalculateYields();
    })
  );
});
(Object.keys(Acids) as AcidId[]).forEach((acidId) => {
  const acid = Acids[acidId];
  Dropdowns.acidDropdown.content.appendChild(
    dropdownButton(acid.className, acid.dropdownText, () => {
      swapAcid(acidId);
      recalculateYields();
    })
  );
});
(Object.keys(Oils) as OilId[]).forEach((oilId) => {
  const oil = Oils[oilId];
  Dropdowns.oilDropdown.content.appendChild(
    dropdownButton(oil.className, oil.dropdownText, () => {
      swapOil(oilId);
      recalculateYields();
    })
  );
});
Object.keys(Depths).forEach((depthId) => {
  Dropdowns.depthDropdown.content.appendChild(
    dropdownButton("", depthId, () => {
      swapDepth(Number(depthId) as DepthId);
      recalculateYields();
    })
  );
});

Dropdowns.drillHeadDropdown.button.addEventListener("click", () => {
  changeDropdownShow("drillHeadDropdown", "toggle");
});
Dropdowns.acidDropdown.button.addEventListener("click", () =>
  changeDropdownShow("acidDropdown", "toggle")
);
Dropdowns.oilDropdown.button.addEventListener("click", () =>
  changeDropdownShow("oilDropdown", "toggle")
);
Dropdowns.depthDropdown.button.addEventListener("click", () =>
  changeDropdownShow("depthDropdown", "toggle")
);

swapDrillHead("copper");
swapAcid("none");
swapOil("none");
swapDepth(100);
recalculateYields();
