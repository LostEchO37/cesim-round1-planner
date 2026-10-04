(function () {
  const REGIONS = [
    { id: "usa", name: "美国", en: "USA", cur: "美元" },
    { id: "china", name: "中国", en: "China", cur: "元" },
    { id: "europe", name: "欧洲", en: "Europe", cur: "欧元" },
  ];
  const TECHS = [
    { id: "comb", name: "燃油车", en: "Combustion" },
    { id: "hybrid", name: "混动", en: "Hybrid" },
    { id: "ev", name: "电动", en: "Electric" },
    { id: "h2", name: "氢能", en: "Hydrogen" },
  ];
  const TEAMS = [
    { id: "us", name: "Ryan United", ours: true },
    { id: "ryan", name: "Ryan" },
    { id: "ltd", name: "Ryan Ltd." },
    { id: "znzh", name: "Z.N.Z.H" },
    { id: "kang", name: "Kang-Tao" },
  ];
  const FOCI = [
    ["balanced", "均衡", "Balanced"],
    ["low", "低价", "Low price"],
    ["feat", "功能", "Features"],
    ["foot", "足迹", "Footprint"],
    ["brand", "品牌", "Brand"],
  ];
  const ASSUMPTIONS = {
    baseUnits: { usa: 3595000, china: 2565000, europe: 3990000 },
    outlook: { usa: 0.05, china: 0.05, europe: 0.05 },
    defaultPrice: { usa: 18500, china: 125000, europe: 20000 },
    fx: { usa: 1, china: 0.145, europe: 1.175 },
    featureCost: { usa: 700, china: 650, europe: 750 },
    defaultPromo: { usa: 600000, china: 300000, europe: 700000 },
    mktPriceE: { usa: -0.35, china: -0.6, europe: -0.2 },
    mktPromoE: { usa: 0.12, china: 0.08, europe: 0.05 },
    shPriceE: { usa: 1.3, china: 1.8, europe: 0.7 },
    shFeatE: { usa: 0.9, china: 1.4, europe: 0.55 },
    shPromoE: { usa: 0.65, china: 0.45, europe: 0.35 },
    techBase: { comb: 0.84, hybrid: 0.14, ev: 0.015, h2: 0.005 },
    techPriceRef: { comb: 1, hybrid: 1.35, ev: 1.7, h2: 1.9 },
    capacity: { usa: 1400000, china: 500000 },
    baseCost: {
      usa: { comb: 13870, hybrid: 20000, ev: 28000, h2: 34000 },
      china: { comb: 11800, hybrid: 17500, ev: 25000, h2: 31000 },
    },
    scrap: { comb: 1, hybrid: 1.25, ev: 1.45, h2: 1.65 },
    contractCost: { comb: 11700, hybrid: 18050, ev: 26000, h2: 32000 },
    freight: { usa: { china: 350, europe: 200 }, china: { usa: 300, europe: 250 } },
    tariff: { usa: { china: 0.2, europe: 0.1 }, china: { usa: 0.025, europe: 0.1 } },
    holdRate: 0.09,
  };

  function blankTeam() {
    const price = {}, features = {}, promo = {}, focus = {};
    TECHS.forEach(function (t) {
      price[t.id] = { usa: 18500, china: 125000, europe: 20000 };
      features[t.id] = { usa: 3, china: 4, europe: 2 };
      promo[t.id] = { usa: 0, china: 0, europe: 0 };
      focus[t.id] = { usa: "balanced", china: "balanced", europe: "balanced" };
    });
    return {
      sell: { comb: true, hybrid: false, ev: false, h2: false },
      price: price, features: features, promo: promo, focus: focus,
      alloc: { usa: { comb: 80, hybrid: 0, ev: 0, h2: 0 }, china: { comb: 75, hybrid: 0, ev: 0, h2: 0 } },
      contract: { usa: { comb: 0, hybrid: 0, ev: 0, h2: 0 }, china: { comb: 0, hybrid: 0, ev: 0, h2: 0 } },
      transfer: { usaChina: 1, usaEurope: 1, chinaUsa: 1, chinaEurope: 1 },
      growth: { usa: 2, china: 0, europe: 4 },
      share: {
        comb: { usa: 18, china: 18, europe: 18 },
        hybrid: { usa: 0, china: 0, europe: 0 },
        ev: { usa: 0, china: 0, europe: 0 },
        h2: { usa: 0, china: 0, europe: 0 },
      },
      hr: { headcount: 5000, wage: 5000, training: 500 },
      extraK: 0,
    };
  }

  function setProduct(team, tech, spec) {
    REGIONS.forEach(function (r) {
      if (spec.price) team.price[tech][r.id] = spec.price[r.id];
      if (spec.features) team.features[tech][r.id] = spec.features[r.id];
      if (spec.promo) team.promo[tech][r.id] = spec.promo[r.id];
      if (spec.focus) team.focus[tech][r.id] = spec.focus[r.id];
    });
  }

  function recommended() {
    const t = blankTeam();
    t.sell.hybrid = true;
    t.growth = { usa: 2, china: 0, europe: 4 };
    t.share.comb = { usa: 15, china: 17, europe: 16 };
    t.share.hybrid = { usa: 5, china: 2, europe: 3 };
    setProduct(t, "comb", {
      price: { usa: 19000, china: 125000, europe: 20500 },
      features: { usa: 3, china: 4, europe: 2 },
      promo: { usa: 500000, china: 280000, europe: 550000 },
      focus: { usa: "balanced", china: "balanced", europe: "balanced" },
    });
    setProduct(t, "hybrid", {
      price: { usa: 26000, china: 155000, europe: 25000 },
      features: { usa: 3, china: 3, europe: 3 },
      promo: { usa: 600000, china: 200000, europe: 400000 },
      focus: { usa: "brand", china: "brand", europe: "brand" },
    });
    t.alloc = {
      usa: { comb: 70, hybrid: 10, ev: 0, h2: 0 },
      china: { comb: 65, hybrid: 10, ev: 0, h2: 0 },
    };
    t.contract = {
      usa: { comb: 80, hybrid: 150, ev: 0, h2: 0 },
      china: { comb: 100, hybrid: 50, ev: 0, h2: 0 },
    };
    t.hr = { headcount: 5000, wage: 6000, training: 700 };
    return t;
  }

  function conservative() {
    const t = recommended();
    t.growth = { usa: 1, china: -2, europe: 3 };
    t.share.comb = { usa: 16, china: 18, europe: 17 };
    t.share.hybrid = { usa: 3, china: 1, europe: 2 };
    setProduct(t, "hybrid", {
      price: { usa: 25000, china: 150000, europe: 24500 },
      promo: { usa: 300000, china: 100000, europe: 200000 },
    });
    setProduct(t, "comb", { promo: { usa: 450000, china: 250000, europe: 500000 } });
    t.alloc.usa = { comb: 75, hybrid: 5, ev: 0, h2: 0 };
    t.alloc.china = { comb: 70, hybrid: 5, ev: 0, h2: 0 };
    t.contract = {
      usa: { comb: 60, hybrid: 80, ev: 0, h2: 0 },
      china: { comb: 80, hybrid: 20, ev: 0, h2: 0 },
    };
    return t;
  }

  function aggressive() {
    const t = recommended();
    t.growth = { usa: 3, china: 2, europe: 5 };
    t.share.comb = { usa: 14, china: 15, europe: 14 };
    t.share.hybrid = { usa: 7, china: 3, europe: 5 };
    setProduct(t, "comb", {
      price: { usa: 18500, china: 122000, europe: 20000 },
      promo: { usa: 800000, china: 400000, europe: 700000 },
      focus: { usa: "balanced", china: "low", europe: "balanced" },
    });
    setProduct(t, "hybrid", {
      price: { usa: 24000, china: 150000, europe: 24000 },
      promo: { usa: 700000, china: 300000, europe: 500000 },
      focus: { usa: "low", china: "low", europe: "balanced" },
    });
    t.alloc.usa = { comb: 60, hybrid: 15, ev: 0, h2: 0 };
    t.alloc.china = { comb: 55, hybrid: 15, ev: 0, h2: 0 };
    t.contract = {
      usa: { comb: 100, hybrid: 200, ev: 0, h2: 0 },
      china: { comb: 80, hybrid: 80, ev: 0, h2: 0 },
    };
    return t;
  }

  function borrowed() {
    const t = blankTeam();
    t.sell.hybrid = true;
    t.growth = { usa: 2, china: 0, europe: 4 };
    t.share.comb = { usa: 16, china: 17, europe: 16 };
    t.share.hybrid = { usa: 4, china: 2, europe: 3 };
    setProduct(t, "comb", {
      price: { usa: 19000, china: 125000, europe: 20500 },
      features: { usa: 3, china: 4, europe: 2 },
      promo: { usa: 500000, china: 250000, europe: 550000 },
      focus: { usa: "balanced", china: "balanced", europe: "balanced" },
    });
    setProduct(t, "hybrid", {
      price: { usa: 34000, china: 200000, europe: 32000 },
      features: { usa: 2, china: 2, europe: 2 },
      promo: { usa: 800000, china: 250000, europe: 700000 },
      focus: { usa: "foot", china: "brand", europe: "foot" },
    });
    t.alloc = {
      usa: { comb: 75, hybrid: 8, ev: 0, h2: 0 },
      china: { comb: 72, hybrid: 8, ev: 0, h2: 0 },
    };
    t.contract = {
      usa: { comb: 40, hybrid: 60, ev: 0, h2: 0 },
      china: { comb: 50, hybrid: 20, ev: 0, h2: 0 },
    };
    t.hr = { headcount: 5000, wage: 6000, training: 700 };
    return t;
  }

  function combustionOnly() {
    const t = recommended();
    t.sell.hybrid = false;
    t.share.comb = { usa: 18, china: 18, europe: 18 };
    t.share.hybrid = { usa: 0, china: 0, europe: 0 };
    setProduct(t, "hybrid", { promo: { usa: 0, china: 0, europe: 0 } });
    setProduct(t, "comb", { promo: { usa: 600000, china: 300000, europe: 700000 } });
    t.alloc.usa = { comb: 80, hybrid: 0, ev: 0, h2: 0 };
    t.alloc.china = { comb: 75, hybrid: 0, ev: 0, h2: 0 };
    t.contract = {
      usa: { comb: 80, hybrid: 0, ev: 0, h2: 0 },
      china: { comb: 80, hybrid: 0, ev: 0, h2: 0 },
    };
    return t;
  }

  function rivalInertia() {
    const ryan = blankTeam();
    ryan.sell.hybrid = true;
    ryan.extraK = 550000;
    setProduct(ryan, "comb", {
      price: { usa: 18500, china: 125000, europe: 20000 },
      features: { usa: 3, china: 6, europe: 2 },
      promo: { usa: 600000, china: 300000, europe: 700000 },
      focus: { usa: "balanced", china: "balanced", europe: "balanced" },
    });
    setProduct(ryan, "hybrid", {
      price: { usa: 35000, china: 275862, europe: 40000 },
      features: { usa: 1, china: 1, europe: 1 },
      promo: { usa: 800000, china: 300000, europe: 1000000 },
      focus: { usa: "foot", china: "balanced", europe: "foot" },
    });
    ryan.alloc = { usa: { comb: 69, hybrid: 0, ev: 0, h2: 0 }, china: { comb: 100, hybrid: 0, ev: 0, h2: 0 } };
    ryan.contract = { usa: { comb: 917, hybrid: 0, ev: 0, h2: 0 }, china: { comb: 0, hybrid: 968, ev: 0, h2: 0 } };
    ryan.hr = { headcount: 6000, wage: 5000, training: 500 };

    const ltd = blankTeam();
    ltd.sell.hybrid = true;
    ltd.extraK = 2850000;
    setProduct(ltd, "comb", {
      price: { usa: 27800, china: 198000, europe: 25800 },
      features: { usa: 11, china: 10, europe: 11 },
      promo: { usa: 2000000, china: 300000, europe: 2000000 },
      focus: { usa: "feat", china: "brand", europe: "brand" },
    });
    setProduct(ltd, "hybrid", {
      price: { usa: 39800, china: 198000, europe: 37000 },
      features: { usa: 5, china: 5, europe: 5 },
      promo: { usa: 2000000, china: 300000, europe: 2000000 },
      focus: { usa: "foot", china: "balanced", europe: "brand" },
    });
    ltd.alloc = { usa: { comb: 25, hybrid: 0, ev: 0, h2: 0 }, china: { comb: 100, hybrid: 0, ev: 0, h2: 0 } };
    ltd.contract = { usa: { comb: 167, hybrid: 750, ev: 0, h2: 0 }, china: { comb: 968, hybrid: 0, ev: 0, h2: 0 } };
    ltd.hr = { headcount: 5000, wage: 7000, training: 1000 };

    const znzh = blankTeam();
    znzh.extraK = 1800000;
    setProduct(znzh, "comb", {
      price: { usa: 18500, china: 125000, europe: 20000 },
      features: { usa: 5, china: 2, europe: 4 },
      promo: { usa: 600000, china: 300000, europe: 700000 },
      focus: { usa: "feat", china: "low", europe: "brand" },
    });
    znzh.alloc = { usa: { comb: 75, hybrid: 0, ev: 0, h2: 0 }, china: { comb: 65, hybrid: 0, ev: 0, h2: 0 } };
    znzh.contract = { usa: { comb: 917, hybrid: 0, ev: 0, h2: 0 }, china: { comb: 968, hybrid: 0, ev: 0, h2: 0 } };
    znzh.hr = { headcount: 5050, wage: 4500, training: 550 };

    const kang = blankTeam();
    setProduct(kang, "comb", {
      price: { usa: 18500, china: 125000, europe: 20000 },
      features: { usa: 3, china: 4, europe: 2 },
      promo: { usa: 600000, china: 300000, europe: 700000 },
    });
    kang.alloc = { usa: { comb: 85, hybrid: 0, ev: 0, h2: 0 }, china: { comb: 85, hybrid: 0, ev: 0, h2: 0 } };
    kang.contract = { usa: { comb: 250, hybrid: 0, ev: 0, h2: 0 }, china: { comb: 470, hybrid: 0, ev: 0, h2: 0 } };
    return { ryan: ryan, ltd: ltd, znzh: znzh, kang: kang };
  }

  function mean(xs) {
    return xs.reduce(function (a, b) { return a + b; }, 0) / xs.length;
  }
  function clampAlloc(team) {
    ["usa", "china"].forEach(function (origin) {
      let sum = 0;
      TECHS.forEach(function (t) { sum += Number(team.alloc[origin][t.id]) || 0; });
      if (sum > 100) {
        TECHS.forEach(function (t) {
          team.alloc[origin][t.id] = (Number(team.alloc[origin][t.id]) || 0) * 100 / sum;
        });
      }
    });
  }
  function unitCost(origin, tech, util) {
    const d = util - 0.8;
    const mult = 1 + 2.2 * d * d + (util > 0.97 ? 0.08 : 0);
    return ASSUMPTIONS.baseCost[origin][tech] * mult * ASSUMPTIONS.scrap[tech];
  }
  function countryUtil(team, origin) {
    let sum = 0;
    TECHS.forEach(function (t) { sum += Number(team.alloc[origin][t.id]) || 0; });
    return Math.max(0, Math.min(1.05, sum / 100));
  }
  function transferMult(team, origin, market) {
    if (origin === "usa" && market === "china") return team.transfer.usaChina;
    if (origin === "usa" && market === "europe") return team.transfer.usaEurope;
    if (origin === "china" && market === "usa") return team.transfer.chinaUsa;
    if (origin === "china" && market === "europe") return team.transfer.chinaEurope;
    return 1;
  }
  function landed(team, origin, market, tech, cost) {
    const feat = ASSUMPTIONS.featureCost[market] * (Number(team.features[tech][market]) || 0);
    if (origin === market) return cost + feat;
    const freight = ASSUMPTIONS.freight[origin][market];
    const rate = ASSUMPTIONS.tariff[origin][market];
    const mult = Math.min(2, Math.max(1, Number(transferMult(team, origin, market)) || 1));
    return cost + feat + freight + rate * (mult * cost + feat);
  }
  function focusFactor(focus, relPrice, relFeat, relPromo, isNew) {
    if (focus === "low") return relPrice < 0.98 ? 1.12 : relPrice > 1.02 ? 0.86 : 1;
    if (focus === "feat") return relFeat > 1.05 ? 1.12 : relFeat < 0.95 ? 0.86 : 1;
    if (focus === "foot") return relPromo >= 1.2 ? 1.15 : (isNew ? 0.85 : (relPromo >= 1 ? 1.08 : 0.88));
    if (focus === "brand") return 1.04;
    return 1;
  }

  function compute(rawTeams) {
    const teams = {};
    TEAMS.forEach(function (meta) {
      teams[meta.id] = JSON.parse(JSON.stringify(rawTeams[meta.id]));
      clampAlloc(teams[meta.id]);
    });
    const marketUnits = {};
    const techShare = {};
    REGIONS.forEach(function (r) {
      let wSum = 0, pSum = 0, promoSum = 0;
      TECHS.forEach(function (tech) {
        const sellers = TEAMS.filter(function (m) { return teams[m.id].sell[tech.id]; });
        if (!sellers.length) return;
        const ref = ASSUMPTIONS.defaultPrice[r.id] * ASSUMPTIONS.techPriceRef[tech.id];
        const avgP = mean(sellers.map(function (m) { return Number(teams[m.id].price[tech.id][r.id]) || ref; }));
        const w = ASSUMPTIONS.techBase[tech.id];
        pSum += w * (avgP / ref);
        wSum += w;
        sellers.forEach(function (m) { promoSum += Number(teams[m.id].promo[tech.id][r.id]) || 0; });
      });
      const priceIndex = wSum ? pSum / wSum : 1;
      const promoIndex = promoSum / (5 * ASSUMPTIONS.defaultPromo[r.id]);
      marketUnits[r.id] = ASSUMPTIONS.baseUnits[r.id]
        * (1 + ASSUMPTIONS.outlook[r.id])
        * Math.pow(Math.max(priceIndex, 0.4), ASSUMPTIONS.mktPriceE[r.id])
        * Math.pow(Math.max(promoIndex, 0.2), ASSUMPTIONS.mktPromoE[r.id]);
      const weights = {};
      let totalW = 0;
      TECHS.forEach(function (tech) {
        const sellers = TEAMS.filter(function (m) { return teams[m.id].sell[tech.id]; });
        if (!sellers.length) { weights[tech.id] = 0; return; }
        const ref = ASSUMPTIONS.defaultPrice[r.id] * ASSUMPTIONS.techPriceRef[tech.id];
        const avgP = mean(sellers.map(function (m) { return Number(teams[m.id].price[tech.id][r.id]) || ref; }));
        const offer = 0.45 + 0.55 * (sellers.length / TEAMS.length);
        const appeal = Math.pow(ref / Math.max(avgP, 1), 0.45);
        const avgF = mean(sellers.map(function (m) { return Number(teams[m.id].features[tech.id][r.id]) || 0; }));
        const featAppeal = Math.pow((avgF + 1) / 4, 0.25);
        weights[tech.id] = ASSUMPTIONS.techBase[tech.id] * offer * appeal * featAppeal;
        totalW += weights[tech.id];
      });
      techShare[r.id] = {};
      TECHS.forEach(function (tech) {
        techShare[r.id][tech.id] = totalW ? weights[tech.id] / totalW : 0;
      });
    });

    const demand = {};
    TEAMS.forEach(function (m) { demand[m.id] = {}; });
    REGIONS.forEach(function (r) {
      TECHS.forEach(function (tech) {
        const sellers = TEAMS.filter(function (m) { return teams[m.id].sell[tech.id]; });
        const shares = {};
        if (!sellers.length) {
          TEAMS.forEach(function (m) { shares[m.id] = 0; });
        } else if (sellers.length === 1) {
          TEAMS.forEach(function (m) { shares[m.id] = m.id === sellers[0].id ? 1 : 0; });
        } else {
          const avgP = mean(sellers.map(function (m) { return Number(teams[m.id].price[tech.id][r.id]) || 1; }));
          const avgF = mean(sellers.map(function (m) { return Number(teams[m.id].features[tech.id][r.id]) || 0; }));
          const avgR = mean(sellers.map(function (m) { return Number(teams[m.id].promo[tech.id][r.id]) || 0; }));
          const scores = {};
          let total = 0;
          sellers.forEach(function (m) {
            const d = teams[m.id];
            const price = Number(d.price[tech.id][r.id]) || avgP;
            const feat = Number(d.features[tech.id][r.id]) || 0;
            const promo = Number(d.promo[tech.id][r.id]) || 0;
            let s = Math.pow(avgP / price, ASSUMPTIONS.shPriceE[r.id])
              * Math.pow((feat + 1) / (avgF + 1), ASSUMPTIONS.shFeatE[r.id])
              * Math.pow((promo + 1) / (avgR + 1), ASSUMPTIONS.shPromoE[r.id]);
            s *= focusFactor(d.focus[tech.id][r.id], price / avgP, (feat + 1) / (avgF + 1), (promo + 1) / (avgR + 1), tech.id !== "comb");
            scores[m.id] = Math.max(s, 0.0001);
            total += scores[m.id];
          });
          TEAMS.forEach(function (m) { shares[m.id] = scores[m.id] ? scores[m.id] / total : 0; });
        }
        const slice = marketUnits[r.id] * techShare[r.id][tech.id];
        TEAMS.forEach(function (m) {
          if (!demand[m.id][tech.id]) demand[m.id][tech.id] = {};
          demand[m.id][tech.id][r.id] = slice * (shares[m.id] || 0);
        });
      });
    });

    const out = { marketUnits: marketUnits, techShare: techShare, teams: {} };
    TEAMS.forEach(function (meta) {
      const d = teams[meta.id];
      const report = {
        revenue: 0, cogs: 0, promo: 0, hr: 0, inventoryPenalty: 0, extra: 0, profit: 0,
        sales: 0, inventory: 0, unmet: 0, supply: 0, forecast: 0, byMarket: {}, byTech: {},
      };
      REGIONS.forEach(function (r) {
        report.byMarket[r.id] = { revenue: 0, cogs: 0, promo: 0, sales: 0, unmet: 0, profit: 0 };
      });
      TECHS.forEach(function (tech) {
        const own = {
          usa: ASSUMPTIONS.capacity.usa * ((Number(d.alloc.usa[tech.id]) || 0) / 100),
          china: ASSUMPTIONS.capacity.china * ((Number(d.alloc.china[tech.id]) || 0) / 100),
        };
        const contract = {
          usa: (Number(d.contract.usa[tech.id]) || 0) * 1000,
          china: (Number(d.contract.china[tech.id]) || 0) * 1000,
        };
        const costOwn = {
          usa: unitCost("usa", tech.id, countryUtil(d, "usa") || 0.8),
          china: unitCost("china", tech.id, countryUtil(d, "china") || 0.8),
        };
        const supply = { usa: own.usa + contract.usa, china: own.china + contract.china };
        const blended = {
          usa: supply.usa ? (own.usa * costOwn.usa + contract.usa * ASSUMPTIONS.contractCost[tech.id]) / supply.usa : costOwn.usa,
          china: supply.china ? (own.china * costOwn.china + contract.china * ASSUMPTIONS.contractCost[tech.id]) / supply.china : costOwn.china,
        };
        report.supply += supply.usa + supply.china;
        const leftS = { usa: supply.usa, china: supply.china };
        const salesBefore = report.sales;
        const leftD = {
          usa: d.sell[tech.id] ? demand[meta.id][tech.id].usa : 0,
          china: d.sell[tech.id] ? demand[meta.id][tech.id].china : 0,
          europe: d.sell[tech.id] ? demand[meta.id][tech.id].europe : 0,
        };
        ["usa", "china"].forEach(function (origin) {
          const take = Math.min(leftS[origin], leftD[origin]);
          if (take > 0) {
            const px = (Number(d.price[tech.id][origin]) || 0) * ASSUMPTIONS.fx[origin];
            const land = landed(d, origin, origin, tech.id, blended[origin]);
            report.sales += take;
            report.revenue += take * px;
            report.cogs += take * land;
            report.byMarket[origin].sales += take;
            report.byMarket[origin].revenue += take * px;
            report.byMarket[origin].cogs += take * land;
            leftS[origin] -= take;
            leftD[origin] -= take;
          }
        });
        const markets = REGIONS.slice().sort(function (a, b) {
          const pa = (Number(d.price[tech.id][a.id]) || 0) * ASSUMPTIONS.fx[a.id];
          const pb = (Number(d.price[tech.id][b.id]) || 0) * ASSUMPTIONS.fx[b.id];
          return pb - pa;
        });
        markets.forEach(function (r) {
          while (leftD[r.id] > 1) {
            let best = null;
            ["usa", "china"].forEach(function (origin) {
              if (leftS[origin] <= 1) return;
              const land = landed(d, origin, r.id, tech.id, blended[origin]);
              if (!best || land < best.land) best = { origin: origin, land: land };
            });
            if (!best) break;
            const take = Math.min(leftS[best.origin], leftD[r.id]);
            const px = (Number(d.price[tech.id][r.id]) || 0) * ASSUMPTIONS.fx[r.id];
            report.sales += take;
            report.revenue += take * px;
            report.cogs += take * best.land;
            report.byMarket[r.id].sales += take;
            report.byMarket[r.id].revenue += take * px;
            report.byMarket[r.id].cogs += take * best.land;
            leftS[best.origin] -= take;
            leftD[r.id] -= take;
          }
        });
        const invQty = leftS.usa + leftS.china;
        const invVal = leftS.usa * blended.usa + leftS.china * blended.china;
        report.inventory += invQty;
        report.inventoryPenalty += leftS.usa * 800 + leftS.china * 650;
        report.unmet += leftD.usa + leftD.china + leftD.europe;
        REGIONS.forEach(function (r) { report.byMarket[r.id].unmet += leftD[r.id]; });
        report.byTech[tech.id] = { sales: report.sales - salesBefore, supply: supply.usa + supply.china, inventory: invQty };
        REGIONS.forEach(function (r) {
          report.forecast += ASSUMPTIONS.baseUnits[r.id] * (1 + (Number(d.growth[r.id]) || 0) / 100) * ((Number(d.share[tech.id][r.id]) || 0) / 100);
        });
      });
      REGIONS.forEach(function (r) {
        TECHS.forEach(function (tech) {
          if (!d.sell[tech.id]) return;
          const promo = (Number(d.promo[tech.id][r.id]) || 0) * 1000;
          report.promo += promo;
          report.byMarket[r.id].promo += promo;
        });
        const mkt = report.byMarket[r.id];
        mkt.profit = mkt.revenue - mkt.cogs - mkt.promo;
      });
      report.hr = (Number(d.hr.headcount) || 0) * ((Number(d.hr.wage) || 0) / 0.7 + (Number(d.hr.training) || 0)) * 12;
      report.extra = (Number(d.extraK) || 0) * 1000;
      report.profit = report.revenue - report.cogs - report.promo - report.hr - report.inventoryPenalty - report.extra;
      out.teams[meta.id] = report;
    });
    return out;
  }

  function yi(usd) {
    const n = usd / 1e8;
    return (n < 0 ? "-" : "") + Math.abs(n).toFixed(1) + " 亿美元";
  }
  function wan(units) { return (units / 10000).toFixed(1) + " 万辆"; }

  const OURS_PRESETS = {
    borrowed: { name: bi("借鉴", "Borrowed"), build: borrowed },
    recommended: { name: bi("建议", "Recommended"), build: recommended },
    conservative: { name: bi("保守", "Conservative"), build: conservative },
    aggressive: { name: bi("激进", "Aggressive"), build: aggressive },
    combustion: { name: bi("只卖燃油", "Combustion only"), build: combustionOnly },
  };
  let state = null;
  function freshState() {
    const rivals = rivalInertia();
    return {
      teams: { us: recommended(), ryan: rivals.ryan, ltd: rivals.ltd, znzh: rivals.znzh, kang: rivals.kang },
      tab: "ours",
      rival: "ryan",
    };
  }
  function load() {
    try {
      const saved = localStorage.getItem("cesim-planner-v3");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.teams && parsed.teams.us && parsed.teams.us.sell) return parsed;
      }
    } catch (e) {}
    return freshState();
  }
  function save() {
    try { localStorage.setItem("cesim-planner-v3", JSON.stringify(state)); } catch (e) {}
  }
  function bi(zh, en) {
    return zh + '<span class="en">' + en + "</span>";
  }
  function field(path, value, step, label) {
    return '<label class="field">' + label + '<input type="number" step="' + step + '" data-path="' + path + '" value="' + value + '"></label>';
  }
  function regionHeads() {
    return '<div class="grid3"><span></span>' + REGIONS.map(function (r) { return '<span class="h">' + bi(r.name, r.en) + "</span>"; }).join("") + "</div>";
  }
  function teamFields(id) {
    const t = state.teams[id];
    let html = '<div class="checks">';
    TECHS.forEach(function (tech) {
      html += '<label><input type="checkbox" data-path="teams.' + id + ".sell." + tech.id + '"' + (t.sell[tech.id] ? " checked" : "") + ">" + bi(tech.name, tech.en) + "</label>";
    });
    html += "</div><p class=\"note\">没勾选的车不会进入销售。电动和氢能保持不勾。</p><h3>" + bi("价格（当地货币）", "Selling price, local currency") + "</h3>";
    TECHS.forEach(function (tech) {
      html += regionHeads() + '<div class="grid3"><span>' + bi(tech.name, tech.en) + "</span>";
      REGIONS.forEach(function (r) {
        html += '<input type="number" step="100" data-path="teams.' + id + ".price." + tech.id + "." + r.id + '" value="' + t.price[tech.id][r.id] + '">';
      });
      html += "</div>";
    });
    html += "<h3>" + bi("功能个数", "Number of features") + "</h3>";
    TECHS.forEach(function (tech) {
      html += '<div class="grid3"><span>' + bi(tech.name, tech.en) + "</span>";
      REGIONS.forEach(function (r) {
        html += '<input type="number" step="1" min="0" data-path="teams.' + id + ".features." + tech.id + "." + r.id + '" value="' + t.features[tech.id][r.id] + '">';
      });
      html += "</div>";
    });
    html += "<h3>" + bi("侧重点", "Marketing focus") + "</h3>";
    TECHS.forEach(function (tech) {
      html += '<div class="grid3"><span>' + bi(tech.name, tech.en) + "</span>";
      REGIONS.forEach(function (r) {
        html += '<select data-path="teams.' + id + ".focus." + tech.id + "." + r.id + '">';
        FOCI.forEach(function (f) {
          html += '<option value="' + f[0] + '"' + (t.focus[tech.id][r.id] === f[0] ? " selected" : "") + ">" + f[1] + " " + f[2] + "</option>";
        });
        html += "</select>";
      });
      html += "</div>";
    });
    html += "<h3>" + bi("推广", "Promotion") + "（Cesim 格子，单位千美元。600000 = 6 亿美元 / k USD, 600000 = USD 600 million）</h3>";
    TECHS.forEach(function (tech) {
      html += '<div class="grid3"><span>' + bi(tech.name, tech.en) + "</span>";
      REGIONS.forEach(function (r) {
        html += '<input type="number" step="10000" data-path="teams.' + id + ".promo." + tech.id + "." + r.id + '" value="' + t.promo[tech.id][r.id] + '">';
      });
      html += "</div>";
    });
    html += "<h3>" + bi("自产占比", "In-house allocation") + "（一国两条加起来不要超过 100 / two lines in one country ≤ 100）</h3>";
    [["usa", "美国工厂", "USA plant"], ["china", "中国工厂", "China plant"]].forEach(function (pair) {
      html += '<div class="grid2">';
      TECHS.slice(0, 2).forEach(function (tech) {
        html += field("teams." + id + ".alloc." + pair[0] + "." + tech.id, t.alloc[pair[0]][tech.id], "1", bi(pair[1] + " " + tech.name + " %", pair[2] + " " + tech.en));
      });
      html += "</div>";
    });
    html += "<h3>" + bi("外包（千辆）", "Contract manufacturing, thousand units") + "</h3>";
    [["usa", "美国外包", "USA contract"], ["china", "中国外包", "China contract"]].forEach(function (pair) {
      html += '<div class="grid2">';
      TECHS.slice(0, 2).forEach(function (tech) {
        html += field("teams." + id + ".contract." + pair[0] + "." + tech.id, t.contract[pair[0]][tech.id], "10", bi(pair[1] + " " + tech.name, pair[2] + " " + tech.en));
      });
      html += "</div>";
    });
    html += "<h3>" + bi("转移价格乘数（1 到 2）", "Transfer price multiplier, 1 to 2") + "</h3><div class=\"grid2\">";
    html += field("teams." + id + ".transfer.usaChina", t.transfer.usaChina, "0.05", bi("美国到中国", "USA → China"));
    html += field("teams." + id + ".transfer.usaEurope", t.transfer.usaEurope, "0.05", bi("美国到欧洲", "USA → Europe"));
    html += field("teams." + id + ".transfer.chinaUsa", t.transfer.chinaUsa, "0.05", bi("中国到美国", "China → USA"));
    html += field("teams." + id + ".transfer.chinaEurope", t.transfer.chinaEurope, "0.05", bi("中国到欧洲", "China → Europe"));
    html += "</div><h3>" + bi("人员和额外开支", "HR and extra cost") + "</h3><div class=\"grid2\">";
    html += field("teams." + id + ".hr.headcount", t.hr.headcount, "100", bi("人数", "Headcount"));
    html += field("teams." + id + ".hr.wage", t.hr.wage, "100", bi("月薪", "Wage / month"));
    html += field("teams." + id + ".hr.training", t.hr.training, "50", bi("月培训", "Training / month"));
    html += field("teams." + id + ".extraK", t.extraK, "1000", bi("许可等额外开支（千美元）", "License and other extra cost, k USD"));
    html += "</div>";
    if (id === "us") {
      html += "<h3>" + bi("需求预测", "Demand forecast") + "。这只决定预测产量，不等于卖出。</h3>" + regionHeads();
      html += '<div class="grid3"><span>' + bi("增长率 %", "Demand growth %") + "</span>";
      REGIONS.forEach(function (r) {
        html += '<input type="number" step="1" data-path="teams.us.growth.' + r.id + '" value="' + t.growth[r.id] + '">';
      });
      html += "</div>";
      TECHS.slice(0, 2).forEach(function (tech) {
        html += '<div class="grid3"><span>' + bi(tech.name + "份额 %", tech.en + " share %") + "</span>";
        REGIONS.forEach(function (r) {
          html += '<input type="number" step="0.5" data-path="teams.us.share.' + tech.id + "." + r.id + '" value="' + t.share[tech.id][r.id] + '">';
        });
        html += "</div>";
      });
    }
    return html;
  }
  function sheetRows() {
    const t = state.teams.us;
    const rows = [
      [bi("市场增长，美 / 中 / 欧", "Demand growth, USA / China / Europe"), t.growth.usa + " / " + t.growth.china + " / " + t.growth.europe],
      [bi("份额，美国燃油 / 混动", "USA share, combustion / hybrid"), t.share.comb.usa + " / " + t.share.hybrid.usa],
      [bi("份额，中国燃油 / 混动", "China share, combustion / hybrid"), t.share.comb.china + " / " + t.share.hybrid.china],
      [bi("份额，欧洲燃油 / 混动", "Europe share, combustion / hybrid"), t.share.comb.europe + " / " + t.share.hybrid.europe],
      [bi("电动、氢能", "Electric, hydrogen"), (t.sell.ev || t.sell.h2) ? "已勾选。第一轮仍不建议" : "不销售"],
      [bi("价格，美国", "USA price"), "燃油 Combustion " + t.price.comb.usa + "，混动 Hybrid " + t.price.hybrid.usa],
      [bi("价格，中国", "China price"), "燃油 Combustion " + t.price.comb.china + "，混动 Hybrid " + t.price.hybrid.china],
      [bi("价格，欧洲", "Europe price"), "燃油 Combustion " + t.price.comb.europe + "，混动 Hybrid " + t.price.hybrid.europe],
      [bi("功能", "Features"), "燃油 Combustion " + t.features.comb.usa + "/" + t.features.comb.china + "/" + t.features.comb.europe],
      [bi("推广", "Promotion"), "美 USA " + t.promo.comb.usa + "/" + t.promo.hybrid.usa + "；中 China " + t.promo.comb.china + "/" + t.promo.hybrid.china + "；欧 Europe " + t.promo.comb.europe + "/" + t.promo.hybrid.europe],
      [bi("产线", "In-house allocation"), "美 USA " + t.alloc.usa.comb + "/" + t.alloc.usa.hybrid + "；中 China " + t.alloc.china.comb + "/" + t.alloc.china.hybrid],
      [bi("外包千辆", "Contract, thousand units"), "美 USA " + t.contract.usa.comb + "/" + t.contract.usa.hybrid + "；中 China " + t.contract.china.comb + "/" + t.contract.china.hybrid],
      [bi("转移价格", "Transfer price"), [t.transfer.usaChina, t.transfer.usaEurope, t.transfer.chinaUsa, t.transfer.chinaEurope].join("，")],
      [bi("人员", "HR"), t.hr.headcount + " 人，月薪 wage " + t.hr.wage + "，培训 training " + t.hr.training],
    ];
    return rows.map(function (row) { return "<tr><td>" + row[0] + "</td><td>" + row[1] + "</td></tr>"; }).join("");
  }
  function guideHtml() {
    return '<div class="prose">'
      + "<h2>这个页面在算什么</h2>"
      + "<p>五队同时出价。市场规模看全市场的价格和广告。每种车先分一块市场，再在卖这款车的队伍之间分。谁更便宜、功能更多、广告更高，谁分到的多。侧重点会把差距放大。品牌只加一点，没有惩罚。新车用足迹会吃亏，因为上轮份额是 0。</p>"
      + "<p>你填的增长率和份额，只用来算预测产量。真正卖多少，看这场比较。供给是自产加外包。卖不掉的算库存，美国每辆扣 800 美元、中国每辆扣 650 美元的库存费用。货不够就是缺货。</p>"
      + "<h2>硬界限</h2>"
      + "<p>一个市场最多两款车。一国两条产线加起来不超过 100%。转移价格只能在 1 到 2。功能不能超过已经解锁的个数。外包必须先占自己的一条产线。全公司同时能做的技术最多 4 种。</p>"
      + "<h2>这一轮怎么选</h2>"
      + "<p>前两轮只做燃油车和混动。燃油车自己造，混动以外包为主，自己的线上留大约 10%。电动和氢能先不买。转移价格四条都用 1.00。关税按转移价格算，抬高乘数省下的税补不回关税。</p>"
      + "<p>方案不按这一轮毛利排第一。毛利、混动有没有座位、库存、后面几轮能不能接着卖，要一起看。只卖燃油往往这一轮更高，但混动份额是 0。</p>"
      + "<p>练习轮里利润最高的 Ryan，燃油车价格几乎没动，混动卖得很贵，功能只有 1 个。Ryan Ltd. 把功能堆到 11，广告花了 86 亿美元，利润反而少一截。借鉴方案学的是前一种：燃油当现金牛，混动当利润款。广告集中在美国和欧洲混动，中国混动少打。第一轮不盖新厂。</p>"
      + "<p>推广大约花掉这款车毛利的 10%，新车可以再多一点。份额格子是占整个市场的比例。混动不要填 20。</p>"
      + "<h2>模型的起点</h2>"
      + "<p>市场基数用练习轮开局：美国 359.5 万辆，中国 256.5 万辆，欧洲 399 万辆。每队产能先按美国 140 万辆、中国 50 万辆。练习轮报表里美国 7 座厂、中国 2 座厂，满产就是这个数。自产燃油开局大约 13,870 美元，第一轮从这里重开，不用练习轮结束时大约 11,600 的成本。外包单价用的是成本报告：燃油大约 11,700 美元，混动大约 18,050 美元。这是对照模型，不是 Cesim 内部公式。交卷以系统预测页为准。</p>"
      + "</div>";
  }
  function renderEditor() {
    const root = document.getElementById("editor");
    const tabs = [["ours", bi("我们的决策", "Our decisions")], ["rivals", bi("其他四队", "Other teams")], ["sheet", bi("录入单", "Entry sheet")], ["guide", bi("依据", "Basis")]];
    let html = '<div class="tabs">';
    tabs.forEach(function (tab) {
      html += '<button type="button" data-tab="' + tab[0] + '"' + (state.tab === tab[0] ? ' class="on"' : "") + ">" + tab[1] + "</button>";
    });
    html += "</div>";
    html += '<section class="panel' + (state.tab === "ours" ? " on" : "") + '">';
    html += '<p class="note">这是 Ryan United 要填的数。右边的“现在这套”跟着这里变。</p><div class="preset">';
    Object.keys(OURS_PRESETS).forEach(function (key) {
      html += '<button type="button" data-preset="' + key + '">' + OURS_PRESETS[key].name + "</button>";
    });
    html += '<button type="button" data-reset="1">恢复全部预设</button></div>' + teamFields("us") + "</section>";
    html += '<section class="panel' + (state.tab === "rivals" ? " on" : "") + '">';
    html += '<p class="note">这是另外四队这一轮可能怎么填。练习轮不带进第一轮。改完以后，右边会按新的对手重排。</p>';
    html += '<div class="rowbtns"><button type="button" data-rivals="inertia">恢复四队预设</button></div>';
    html += '<div class="teampick"><select id="rival-pick">';
    TEAMS.filter(function (m) { return !m.ours; }).forEach(function (m) {
      html += '<option value="' + m.id + '"' + (state.rival === m.id ? " selected" : "") + ">" + m.name + "</option>";
    });
    html += '</select></div><div id="rival-fields">' + teamFields(state.rival) + "</div></section>";
    html += '<section class="panel' + (state.tab === "sheet" ? " on" : "") + '" id="panel-sheet">';
    html += '<p class="note">这张表跟着决策变，可以照着填进 Cesim。推广的单位是千美元。</p>';
    html += '<table class="sheet"><tbody>' + sheetRows() + "</tbody></table></section>";
    html += '<section class="panel' + (state.tab === "guide" ? " on" : "") + '">' + guideHtml() + "</section>";
    root.innerHTML = html;
  }
  const PATHS = {
    borrowed: {
      title: "借鉴 · 燃油现金牛，混动卖高价",
      aim: "燃油保持普通价、功能少。混动学练习轮里更赚的那队：价格高、功能只留 2 个、广告集中在美国和欧洲。不学 11 个功能，也不学每个市场 20 亿广告。",
    },
    recommended: {
      title: "建议 · 先占混动座位",
      aim: "混动价格更稳。这一轮利润和座位都有，但混动一台车赚得少。",
    },
    conservative: {
      title: "保守 · 先稳住燃油",
      aim: "混动少做，广告和库存都小。这一轮更稳，下一轮座位薄。",
    },
    aggressive: {
      title: "激进 · 这一轮多做混动",
      aim: "广告和外包加大。下一轮位置更好，这一轮利润和库存风险都更大。",
    },
    combustion: {
      title: "只卖燃油 · 这一轮利润最高",
      aim: "不做混动。这一轮最干净，下一轮混动要从零买许可。",
    },
  };
  function lookAt(team, report) {
    const hy = report.byTech.hybrid ? report.byTech.hybrid.sales : 0;
    const line = (Number(team.alloc.usa.hybrid) || 0) + (Number(team.alloc.china.hybrid) || 0);
    let future;
    let rivals;
    if (!team.sell.hybrid) {
      future = "混动份额是 0。许可下一轮才买的话，车还要再等一轮。";
      rivals = "混动市场留给别人。";
    } else if (line >= 25) {
      future = "自己的混动产线很多，学习快，这一轮成本也高。";
      rivals = "混动上我们更显眼，容易变成广告和价格的消耗。";
    } else if (line >= 16) {
      future = "产线上有混动，学习从这一轮开始。外包补销量，下一轮已经有座位。";
      rivals = "混动里有我们一份。不跟某一队压价。";
    } else {
      future = "混动做了，但自己的线很薄，学习慢。";
      rivals = "有一点混动，对别人影响不大。";
    }
    const inv = report.sales ? report.inventory / report.sales : 0;
    const risk = inv > 0.15 ? "库存偏高" : inv > 0.08 ? "库存略高" : "库存还可接受";
    return { hy: hy, future: future, rivals: rivals, risk: risk };
  }
  function renderResults() {
    const result = compute(state.teams);
    const ours = result.teams.us;
    const ranked = TEAMS.map(function (m) {
      return { id: m.id, name: m.name, ours: !!m.ours, profit: result.teams[m.id].profit };
    }).sort(function (a, b) { return b.profit - a.profit; });
    const maxAbs = Math.max.apply(null, ranked.map(function (row) { return Math.abs(row.profit); }).concat([1]));
    const schemes = Object.keys(OURS_PRESETS).map(function (key) {
      const alt = JSON.parse(JSON.stringify(state.teams));
      alt.us = OURS_PRESETS[key].build();
      return { key: key, name: OURS_PRESETS[key].name, team: alt.us, report: compute(alt).teams.us };
    });
    schemes.push({ key: "now", name: "现在这套", team: state.teams.us, report: ours });
    const warnings = [];
    ["usa", "china"].forEach(function (origin) {
      let sum = 0;
      TECHS.forEach(function (t) { sum += Number(state.teams.us.alloc[origin][t.id]) || 0; });
      if (sum > 100.1) warnings.push((origin === "usa" ? "美国" : "中国") + "产线加起来超过 100%，模型已按比例压回 100%。");
    });
    REGIONS.forEach(function (r) {
      const s = (Number(state.teams.us.share.comb[r.id]) || 0) + (Number(state.teams.us.share.hybrid[r.id]) || 0);
      if (s > 22) warnings.push(r.name + "两款份额加起来是 " + s + "%。五队市场里超过大约 22% 容易积压。");
    });
    if (ours.sales > 0 && ours.inventory > ours.sales * 0.08) {
      warnings.push("库存大约是销量的 " + Math.round(ours.inventory / ours.sales * 100) + "%。目标大约 5%。先减外包。");
    }
    if (ours.unmet > ours.sales * 0.03) warnings.push("还有大约 " + wan(ours.unmet) + " 没货。只加对应车型的外包。");
    const oursLook = lookAt(state.teams.us, ours);
    let html = '<p class="kpi">' + bi("这一轮毛利近似", "Gross profit this round, approx.") + '<b class="' + (ours.profit < 0 ? "neg" : "") + '">' + yi(ours.profit) + "</b></p>";
    html += '<p class="note">毛利只是一项。右边同时看混动卖出、库存、后面几轮，以及混动市场里有没有我们。收入减去生产成本、运费、关税、功能、推广、人员、库存费用。没扣所得税。自研要到下一轮才出车。</p>';
    html += '<div class="subkpis">';
    [[bi("混动实销", "Hybrid sales"), wan(oursLook.hy)], [bi("收入", "Revenue"), yi(ours.revenue)], [bi("实销", "Sales"), wan(ours.sales)], [bi("库存", "Inventory"), wan(ours.inventory)], [bi("缺货", "Unmet demand"), wan(ours.unmet)], [bi("排产供给", "Supply"), wan(ours.supply)]].forEach(function (pair) {
      html += "<div>" + pair[0] + "<strong>" + pair[1] + "</strong></div>";
    });
    html += "</div>";
    warnings.forEach(function (w) { html += '<div class="warnbox">' + w + "</div>"; });
    html += "<h2>" + bi("五队毛利近似", "Five-team gross profit, approx.") + "</h2>";
    ranked.forEach(function (row) {
      const width = Math.max(2, Math.abs(row.profit) / maxAbs * 100);
      html += '<div class="barline"><span>' + row.name + '</span><div class="track"><span class="' + (row.ours ? "ours" : "") + '" style="width:' + width + '%"></span></div><em>' + (row.profit / 1e8).toFixed(1) + "</em></div>";
    });
    html += '<p class="note">单位是亿美元。这是近似模型，不是 Cesim 公式。默认对手用的是练习轮报表里的真实填法：高价、很多功能、很大的广告。以前 Ryan Ltd. 出现负 100，是因为价格被填成了低价，广告却按他们的大额来扣。练习轮他们的利润是正的 93.8 亿美元。</p>';
    html += "<h2>" + bi("练习轮实际利润", "Practice-round profit, actual") + "</h2><table><thead><tr><th>" + bi("队", "Team") + "</th><th>" + bi("利润", "Profit") + "</th><th>" + bi("股东回报", "Shareholder return") + "</th></tr></thead><tbody>";
    [["Kang-Tao", "40.6", "3.3%"], ["Ryan Ltd.", "93.8", "102.7%"], ["Ryan", "151.7", "99.7%"], ["Z.N.Z.H", "16.8", "-23.8%"], ["Ryan United", "41.2", "8.3%"]].forEach(function (row) {
      html += "<tr><td>" + row[0] + "</td><td>" + row[1] + " 亿美元</td><td>" + row[2] + "</td></tr>";
    });
    html += '</tbody></table><p class="note">这是练习轮财报，单位亿美元。第一轮会清零。Ryan Ltd. 中国只亏了大约 0.3 亿美元，美国混动贡献大约 108 亿美元。赚得最多的两队都卖了混动，而且分红都是 0，股东回报来自股价。</p>';
    html += "<h2>四条路，不按毛利排第一</h2>";
    html += '<p class="note">值得先看的是「借鉴」。它学的是练习轮里利润更高的 Ryan：燃油不抬价，混动敢标高价，功能不堆。只卖燃油这一轮可以更高一点，但混动座位是 0。改左边的数，「现在这套」会跟着变。</p>';
    html += '<div class="plans">';
    schemes.forEach(function (s) {
      const view = lookAt(s.team, s.report);
      const path = PATHS[s.key];
      const title = path ? path.title : s.name;
      const aim = path ? path.aim : "左边现在填的这套。";
      html += '<article class="plan' + (s.key === "borrowed" ? " main" : "") + '"><h3>' + title + "</h3><p class=\"aim\">" + aim + "</p>";
      html += '<div class="nums"><div>' + bi("这一轮毛利", "Gross profit") + "<strong>" + yi(s.report.profit) + "</strong></div>";
      html += "<div>" + bi("混动卖出", "Hybrid sales") + "<strong>" + wan(view.hy) + "</strong></div>";
      html += "<div>" + bi("库存", "Inventory") + "<strong>" + view.risk + "</strong></div></div>";
      html += "<p>" + bi("后面几轮", "Later rounds") + "：" + view.future + "</p>";
      html += "<p>" + bi("和其他队", "Other teams") + "：" + view.rivals + "</p></article>";
    });
    html += "</div>";
    html += '<p class="note">许可费以研发页上的数字为准，填进「许可等额外开支」。填上以后这一轮毛利会下降，混动下一轮才能卖。这里还没替你填那个费用。</p>';
    html += "<h2>" + bi("我们各市场", "Our markets") + "</h2><table><thead><tr><th>" + bi("市场", "Market") + "</th><th>" + bi("实销", "Sales") + "</th><th>" + bi("缺货", "Unmet") + "</th><th>" + bi("毛利近似", "Gross profit, approx.") + "</th></tr></thead><tbody>";
    REGIONS.forEach(function (r) {
      const m = ours.byMarket[r.id];
      html += "<tr><td>" + r.name + "</td><td>" + wan(m.sales) + "</td><td>" + wan(m.unmet) + "</td><td>" + yi(m.profit) + "</td></tr>";
    });
    html += "</tbody></table><p class=\"note\">市场毛利没分摊人员工资。工资在总毛利里一次扣掉。</p>";
    html += "<h2>" + bi("模型看到的市场", "Market in the model") + "</h2><table><thead><tr><th>" + bi("市场", "Market") + "</th><th>" + bi("总辆数", "Total units") + "</th><th>" + bi("燃油占比", "Combustion share") + "</th><th>" + bi("混动占比", "Hybrid share") + "</th></tr></thead><tbody>";
    REGIONS.forEach(function (r) {
      html += "<tr><td>" + r.name + "</td><td>" + wan(result.marketUnits[r.id]) + "</td><td>" + Math.round(result.techShare[r.id].comb * 100) + "%</td><td>" + Math.round(result.techShare[r.id].hybrid * 100) + "%</td></tr>";
    });
    html += "</tbody></table>";
    document.getElementById("results").innerHTML = html;
  }
  function setPath(obj, path, value) {
    const parts = path.split(".");
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
    cur[parts[parts.length - 1]] = value;
  }
  function onInput(e) {
    const el = e.target;
    if (!el.dataset || !el.dataset.path) return;
    let value;
    if (el.type === "checkbox") value = el.checked;
    else if (el.type === "number") value = el.value === "" ? 0 : Number(el.value);
    else value = el.value;
    setPath(state, el.dataset.path, value);
    save();
    renderResults();
    const body = document.querySelector("#panel-sheet tbody");
    if (body) body.innerHTML = sheetRows();
  }
  function boot() {
    state = load();
    renderEditor();
    renderResults();
    const editor = document.getElementById("editor");
    editor.addEventListener("input", onInput);
    editor.addEventListener("change", function (e) {
      onInput(e);
      if (e.target.id === "rival-pick") {
        state.rival = e.target.value;
        save();
        document.getElementById("rival-fields").innerHTML = teamFields(state.rival);
      }
    });
    editor.addEventListener("click", function (e) {
      const tab = e.target.dataset.tab;
      if (tab) { state.tab = tab; save(); renderEditor(); return; }
      const preset = e.target.dataset.preset;
      if (preset && OURS_PRESETS[preset]) {
        state.teams.us = OURS_PRESETS[preset].build();
        save(); renderEditor(); renderResults(); return;
      }
      if (e.target.dataset.reset) {
        localStorage.removeItem("cesim-planner-v3");
        state = freshState();
        renderEditor(); renderResults(); return;
      }
      if (e.target.dataset.rivals === "inertia") {
        const rivals = rivalInertia();
        state.teams.ryan = rivals.ryan;
        state.teams.ltd = rivals.ltd;
        state.teams.znzh = rivals.znzh;
        state.teams.kang = rivals.kang;
        save(); renderEditor(); renderResults();
      }
    });
  }
  const api = { compute: compute, recommended: recommended, borrowed: borrowed, conservative: conservative, aggressive: aggressive, combustionOnly: combustionOnly, rivalInertia: rivalInertia, freshTeams: function () { return freshState().teams; } };
  if (typeof window !== "undefined") {
    window.CesimPlanner = api;
    if (document.getElementById("editor")) boot();
  }
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})();
