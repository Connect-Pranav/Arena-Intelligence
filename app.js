/* ===== ARENA INTELLIGENCE — app.js (Demo Mode — no API key required) ===== */

var selectedGeo = 'Global';
var chartRefs = [];

/* ===== NAVIGATION ===== */
function showPage(id) {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}
function showSetup() { document.getElementById('setupModal').classList.add('open'); }
function hideSetup() { document.getElementById('setupModal').classList.remove('open'); }
function closeSetupIfOutside(e) { if (e.target === document.getElementById('setupModal')) hideSetup(); }

function quickLaunch(brand, cat, geo) {
  document.getElementById('brandInput').value = brand;
  document.getElementById('catInput').value = cat;
  document.querySelectorAll('.geo-card').forEach(function(c) {
    c.classList.toggle('active', c.dataset.geo === geo);
  });
  selectedGeo = geo;
  showSetup();
}
function selectGeo(el) {
  document.querySelectorAll('.geo-card').forEach(function(c) { c.classList.remove('active'); });
  el.classList.add('active');
  selectedGeo = el.dataset.geo;
}

/* ===== LOADING ===== */
var loadSteps = [
  'Identifying competitors in category...',
  'Analysing market share signals...',
  'Processing geographic data...',
  'Generating strategic insights...',
  'Composing executive briefing...'
];
function animateLoading() {
  var el = document.getElementById('loadingSteps');
  el.innerHTML = '';
  loadSteps.forEach(function(s, i) {
    var div = document.createElement('div');
    div.className = 'loading-step';
    div.id = 'lstep' + i;
    div.textContent = s;
    el.appendChild(div);
  });
  var i = 0;
  function tick() {
    if (i > 0) { var prev = document.getElementById('lstep' + (i-1)); if (prev) prev.className = 'loading-step done'; }
    if (i < loadSteps.length) {
      var cur = document.getElementById('lstep' + i); if (cur) cur.className = 'loading-step active';
      i++; setTimeout(tick, 800 + Math.random() * 500);
    }
  }
  tick();
}

/* ===== MOCK INTELLIGENCE ENGINE ===== */

var CATEGORY_DB = {
  // FORMAT: keyword → { marketSize, growth, competitors[], trends[], insights[] }
  default: {
    marketSize: '$48.2B', growth: '+7.4%',
    competitors: ['Leader Corp','Rival One','Challenger','Niche Player','Emerging Co'],
    colors: ['#ef4444','#3b82f6','#8b5cf6','#f59e0b','#06b6d4'],
    trends: ['Digital transformation','Sustainability focus','D2C growth','AI personalisation'],
    category: 'Consumer goods'
  },
  shoe: {
    marketSize: '$83.5B', growth: '+6.1%',
    competitors: ['Nike','Adidas','New Balance','Puma','Under Armour'],
    colors: ['#ef4444','#3b82f6','#22c55e','#f59e0b','#8b5cf6'],
    trends: ['Athleisure boom','Sustainable materials','Direct-to-consumer','Metaverse drops'],
    category: 'Athletic footwear'
  },
  footwear: {
    marketSize: '$83.5B', growth: '+6.1%',
    competitors: ['Nike','Adidas','New Balance','Puma','Under Armour'],
    colors: ['#ef4444','#3b82f6','#22c55e','#f59e0b','#8b5cf6'],
    trends: ['Athleisure boom','Sustainable materials','Direct-to-consumer','Metaverse drops'],
    category: 'Athletic footwear'
  },
  sneaker: {
    marketSize: '$83.5B', growth: '+6.1%',
    competitors: ['Nike','Adidas','New Balance','Puma','ASICS'],
    colors: ['#ef4444','#3b82f6','#22c55e','#f59e0b','#06b6d4'],
    trends: ['Resell market growth','Collab culture','Sustainability','Customisation'],
    category: 'Sneakers'
  },
  laptop: {
    marketSize: '$171.3B', growth: '+4.8%',
    competitors: ['HP','Lenovo','Apple','Dell','Asus'],
    colors: ['#3b82f6','#ef4444','#6b7280','#06b6d4','#f59e0b'],
    trends: ['AI-integrated chips','Ultra-thin form factors','Gaming segment surge','Hybrid work demand'],
    category: 'Personal computers'
  },
  computer: {
    marketSize: '$171.3B', growth: '+4.8%',
    competitors: ['HP','Lenovo','Apple','Dell','Asus'],
    colors: ['#3b82f6','#ef4444','#6b7280','#06b6d4','#f59e0b'],
    trends: ['AI-integrated chips','Ultra-thin form factors','Gaming segment surge','Hybrid work demand'],
    category: 'Personal computers'
  },
  smartphone: {
    marketSize: '$521.0B', growth: '+5.3%',
    competitors: ['Samsung','Apple','Xiaomi','Oppo','Vivo'],
    colors: ['#3b82f6','#6b7280','#ef4444','#22c55e','#8b5cf6'],
    trends: ['Foldable displays','5G adoption','AI camera features','Budget segment growth'],
    category: 'Smartphones'
  },
  phone: {
    marketSize: '$521.0B', growth: '+5.3%',
    competitors: ['Samsung','Apple','Xiaomi','Oppo','Vivo'],
    colors: ['#3b82f6','#6b7280','#ef4444','#22c55e','#8b5cf6'],
    trends: ['Foldable displays','5G adoption','AI camera features','Budget segment growth'],
    category: 'Smartphones'
  },
  beverage: {
    marketSize: '$244.8B', growth: '+5.9%',
    competitors: ['Coca-Cola','PepsiCo','Nestlé','Red Bull','Keurig Dr Pepper'],
    colors: ['#ef4444','#3b82f6','#22c55e','#8b5cf6','#f59e0b'],
    trends: ['Zero-sugar demand','Functional drinks','Premium water','Energy drink surge'],
    category: 'Beverages'
  },
  drink: {
    marketSize: '$244.8B', growth: '+5.9%',
    competitors: ['Coca-Cola','PepsiCo','Nestlé','Red Bull','Monster'],
    colors: ['#ef4444','#3b82f6','#22c55e','#8b5cf6','#f59e0b'],
    trends: ['Zero-sugar demand','Functional drinks','Health positioning','Energy drink surge'],
    category: 'Beverages'
  },
  car: {
    marketSize: '$3.1T', growth: '+3.7%',
    competitors: ['Toyota','Volkswagen','Stellantis','Hyundai-Kia','Ford'],
    colors: ['#ef4444','#3b82f6','#f59e0b','#22c55e','#8b5cf6'],
    trends: ['EV acceleration','Autonomous driving','Connected cars','Shared mobility'],
    category: 'Automotive'
  },
  automobile: {
    marketSize: '$3.1T', growth: '+3.7%',
    competitors: ['Toyota','Volkswagen','Stellantis','Hyundai-Kia','Ford'],
    colors: ['#ef4444','#3b82f6','#f59e0b','#22c55e','#8b5cf6'],
    trends: ['EV acceleration','Autonomous driving','Connected cars','Software-defined vehicles'],
    category: 'Automotive'
  },
  ev: {
    marketSize: '$623.3B', growth: '+22.6%',
    competitors: ['Tesla','BYD','Volkswagen','Hyundai','GM'],
    colors: ['#ef4444','#22c55e','#3b82f6','#06b6d4','#f59e0b'],
    trends: ['Charging infrastructure','Battery range anxiety','Government incentives','Chinese EV brands'],
    category: 'Electric vehicles'
  },
  skincare: {
    marketSize: '$145.3B', growth: '+8.2%',
    competitors: ["L'Oréal",'Estée Lauder','Shiseido','Unilever','Beiersdorf'],
    colors: ['#ef4444','#8b5cf6','#f59e0b','#3b82f6','#22c55e'],
    trends: ['Clean beauty','Personalisation','K-beauty influence','Science-backed formulas'],
    category: 'Skincare'
  },
  beauty: {
    marketSize: '$572.0B', growth: '+7.7%',
    competitors: ["L'Oréal",'Unilever','Estée Lauder','P&G','Shiseido'],
    colors: ['#ef4444','#3b82f6','#8b5cf6','#f59e0b','#06b6d4'],
    trends: ['Inclusive shade ranges','Influencer commerce','Clean ingredients','Hybrid products'],
    category: 'Beauty & personal care'
  },
  ecommerce: {
    marketSize: '$6.3T', growth: '+10.4%',
    competitors: ['Amazon','Alibaba','JD.com','Shopify merchants','Pinduoduo'],
    colors: ['#f59e0b','#ef4444','#22c55e','#06b6d4','#8b5cf6'],
    trends: ['Social commerce','Same-day delivery','AI recommendations','Live shopping'],
    category: 'E-commerce'
  },
  food: {
    marketSize: '$8.7T', growth: '+4.2%',
    competitors: ['Nestlé','PepsiCo','JBS','Tyson Foods','Unilever'],
    colors: ['#22c55e','#3b82f6','#ef4444','#f59e0b','#8b5cf6'],
    trends: ['Plant-based alternatives','Sustainable packaging','Functional nutrition','Private label growth'],
    category: 'Food & FMCG'
  },
  fashion: {
    marketSize: '$1.7T', growth: '+5.8%',
    competitors: ['Zara (Inditex)','H&M Group','Fast Retailing','PVH Corp','Hanesbrands'],
    colors: ['#3b82f6','#ef4444','#f59e0b','#8b5cf6','#22c55e'],
    trends: ['Circular fashion','Rental models','AI design tools','Slow fashion movement'],
    category: 'Apparel & fashion'
  },
  apparel: {
    marketSize: '$1.7T', growth: '+5.8%',
    competitors: ['Zara (Inditex)','H&M Group','Nike','Adidas','PVH Corp'],
    colors: ['#3b82f6','#ef4444','#f59e0b','#8b5cf6','#22c55e'],
    trends: ['Athleisure crossover','Sustainable materials','Resale market boom','Inclusive sizing'],
    category: 'Apparel'
  },
  insurance: {
    marketSize: '$5.6T', growth: '+3.9%',
    competitors: ['UnitedHealth','AXA','Ping An','Berkshire Hathaway','Allianz'],
    colors: ['#3b82f6','#ef4444','#22c55e','#f59e0b','#8b5cf6'],
    trends: ['Embedded insurance','AI underwriting','Parametric products','Usage-based pricing'],
    category: 'Insurance'
  },
  bank: {
    marketSize: '$7.2T', growth: '+4.5%',
    competitors: ['JPMorgan Chase','ICBC','Bank of America','HSBC','BNP Paribas'],
    colors: ['#3b82f6','#ef4444','#f59e0b','#22c55e','#8b5cf6'],
    trends: ['Digital banking','Embedded finance','Open banking APIs','BNPL disruption'],
    category: 'Banking & financial services'
  },
  fintech: {
    marketSize: '$340.1B', growth: '+16.8%',
    competitors: ['Stripe','PayPal','Square (Block)','Adyen','Klarna'],
    colors: ['#8b5cf6','#3b82f6','#22c55e','#06b6d4','#ef4444'],
    trends: ['Embedded finance','BNPL regulation','CBDCs','AI fraud detection'],
    category: 'Fintech'
  },
  saas: {
    marketSize: '$317.5B', growth: '+18.3%',
    competitors: ['Salesforce','Microsoft','ServiceNow','Workday','HubSpot'],
    colors: ['#3b82f6','#6b7280','#22c55e','#f59e0b','#ef4444'],
    trends: ['AI-native features','Vertical SaaS','Usage-based pricing','Platform consolidation'],
    category: 'SaaS / Cloud software'
  },
  streaming: {
    marketSize: '$118.4B', growth: '+12.1%',
    competitors: ['Netflix','Amazon Prime','Disney+','Max (WBD)','Apple TV+'],
    colors: ['#ef4444','#3b82f6','#8b5cf6','#06b6d4','#6b7280'],
    trends: ['Ad-supported tiers','Password sharing crackdown','Live sports rights','Short-form competition'],
    category: 'Streaming & media'
  }
};

function getCategoryData(catStr) {
  var lower = catStr.toLowerCase();
  var keys = Object.keys(CATEGORY_DB);
  for (var i = 0; i < keys.length; i++) {
    if (lower.indexOf(keys[i]) !== -1) return CATEGORY_DB[keys[i]];
  }
  return CATEGORY_DB.default;
}

/* Deterministic-ish seeded random so same brand+cat always gives same numbers */
function seededRand(seed) {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
function strHash(s) {
  var h = 0;
  for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) & 0xffffffff;
  return Math.abs(h);
}

function generateIntelligence(brand, cat, geo, time) {
  var seed = strHash(brand + cat + geo);
  var rnd = function(offset) { return seededRand(seed + offset); };

  var catData = getCategoryData(cat);

  /* --- Build competitor list, injecting brand into right position --- */
  var competitorPool = catData.competitors.slice();
  var brandIdx = competitorPool.findIndex(function(c) { return c.toLowerCase() === brand.toLowerCase(); });
  if (brandIdx !== -1) competitorPool.splice(brandIdx, 1); // remove if already there

  /* Brand share: 10–38% based on seed */
  var brandShare = 10 + Math.round(rnd(1) * 28);
  /* Brand rank: 1–4 */
  var brandRank = 1 + Math.floor(rnd(2) * 3);
  var brandDelta = (rnd(3) > 0.5 ? '+' : '-') + (0.3 + Math.round(rnd(4) * 18) / 10).toFixed(1) + 'pp';

  /* Build 5 competitors with shares summing sensibly */
  var compShares = [];
  var remaining = 100 - brandShare;
  for (var i = 0; i < 4; i++) {
    var s = Math.round(remaining * (0.15 + rnd(10 + i) * 0.35));
    if (i === 3) s = remaining - compShares.reduce(function(a,b){return a+b;},0);
    if (s < 3) s = 3;
    compShares.push(s);
  }
  // Insert brand at rank position
  var allShares = compShares.slice();
  allShares.splice(brandRank - 1, 0, brandShare);
  var allNames = competitorPool.slice(0, 4);
  allNames.splice(brandRank - 1, 0, brand);
  var allColors = catData.colors.slice(0, 5);

  var competitors = allNames.map(function(name, i) {
    var delta = (rnd(20 + i) > 0.5 ? '+' : '-') + (0.1 + Math.round(rnd(21 + i) * 15) / 10).toFixed(1) + 'pp';
    var strengths = ['Price leadership','Brand loyalty','Innovation pipeline','Channel dominance','Digital-first model','Global distribution','Premium positioning','Speed to market'];
    return {
      name: name,
      share: allShares[i],
      trend: name === brand ? brandDelta : delta,
      color: allColors[i],
      strength: strengths[Math.floor(rnd(30 + i) * strengths.length)]
    };
  });

  /* --- Geo breakdown --- */
  var geoRegions = {
    'Global':              ['North America','Europe','Asia Pacific','Latin America','MEA','Rest of World'],
    'North America':       ['United States','Canada','Mexico','Caribbean','Central America','Other'],
    'Europe':              ['Western Europe','DACH','UK & Ireland','Nordics','Southern Europe','Eastern Europe'],
    'Asia Pacific':        ['China','India','Japan','SE Asia','ANZ','Korea'],
    'India':               ['Maharashtra','Karnataka','Delhi NCR','Tamil Nadu','Gujarat','UP & Bihar'],
    'USA — State level':   ['California','Texas','New York','Florida','Illinois','Other States'],
    'Latin America':       ['Brazil','Mexico','Argentina','Colombia','Chile','Other'],
    'Middle East & Africa':['Saudi Arabia','UAE','South Africa','Egypt','Nigeria','Other']
  };
  var regions = geoRegions[geo] || geoRegions['Global'];
  var momenta = ['rising','stable','declining','rising','stable','declining'];
  var keyCities = {
    'North America':'New York','Europe':'London','Asia Pacific':'Singapore','Latin America':'São Paulo',
    'MEA':'Dubai','Rest of World':'Sydney','United States':'New York','Canada':'Toronto',
    'Mexico':'Mexico City','China':'Shanghai','India':'Mumbai','Japan':'Tokyo',
    'SE Asia':'Singapore','ANZ':'Sydney','Korea':'Seoul','Maharashtra':'Mumbai',
    'Karnataka':'Bengaluru','Delhi NCR':'New Delhi','Tamil Nadu':'Chennai','Gujarat':'Ahmedabad',
    'UP & Bihar':'Lucknow','California':'Los Angeles','Texas':'Houston','New York':'New York City',
    'Florida':'Miami','Illinois':'Chicago','Other States':'Dallas','Brazil':'São Paulo',
    'Argentina':'Buenos Aires','Colombia':'Bogotá','Chile':'Santiago',
    'Saudi Arabia':'Riyadh','UAE':'Dubai','South Africa':'Johannesburg',
    'UK & Ireland':'London','DACH':'Frankfurt','Nordics':'Stockholm',
    'Western Europe':'Paris','Southern Europe':'Madrid','Eastern Europe':'Warsaw',
    'Caribbean':'San Juan','Central America':'Panama City','Other':'—'
  };
  var geoSharePool = [32,24,19,13,8,4];
  var geo_breakdown = regions.map(function(r, i) {
    var shareVariance = Math.round((rnd(40 + i) - 0.5) * 6);
    var share = Math.max(2, geoSharePool[i] + shareVariance);
    return {
      region: r,
      share: share + '%',
      rank: brandRank,
      momentum: momenta[i % momenta.length],
      key_city: keyCities[r] || r
    };
  });

  /* --- Trend chart data (8 quarters) --- */
  var trendLabels = ["Q1'24","Q2'24","Q3'24","Q4'24","Q1'25","Q2'25","Q3'25","Q4'25"];
  var trendBrand = [], trendLeader = [], trendThird = [];
  var leaderShare = allShares[0] === brandShare ? allShares[1] : allShares[0];
  var thirdShare  = allShares[2] || 12;
  for (var q = 0; q < 8; q++) {
    var growthFactor = brandDelta.charAt(0) === '+' ? 1 : -1;
    trendBrand.push(parseFloat((brandShare - growthFactor * (7 - q) * 0.35 + (rnd(50 + q) - 0.5) * 0.4).toFixed(1)));
    trendLeader.push(parseFloat((leaderShare + (rnd(60 + q) - 0.5) * 0.6).toFixed(1)));
    trendThird.push(parseFloat((thirdShare - (rnd(70 + q) - 0.5) * 0.3).toFixed(1)));
  }

  /* --- Category trends --- */
  var trendMomenta = ['+18%','+13%','+9%','-4%'];
  var category_trends = catData.trends.map(function(t, i) {
    return { label: t, momentum: trendMomenta[i] || '+7%', relevance: i < 2 ? 'high' : i === 2 ? 'medium' : 'low' };
  });

  /* --- Strategic insights (brand-aware) --- */
  var topComp = competitors.filter(function(c){return c.name !== brand;})[0] || {name:'Market leader'};
  var insights = [
    {
      type: 'threat',
      title: topComp.name + ' gaining ground',
      text: topComp.name + ' holds ' + topComp.share + '% share and is investing heavily in ' + catData.trends[0].toLowerCase() + '. Without a differentiated response, ' + brand + ' risks losing 2–4pp share in the next 12 months.'
    },
    {
      type: 'opportunity',
      title: geo + ' expansion window',
      text: geo_breakdown[2] && geo_breakdown[2].momentum === 'rising'
        ? geo_breakdown[2].region + ' is showing rising momentum — ' + brand + ' is currently ranked #' + brandRank + ' there with room to invest in distribution and localised campaigns.'
        : 'Category growth in ' + (geo_breakdown[1] ? geo_breakdown[1].region : 'key markets') + ' (+' + catData.growth + ') creates a window for ' + brand + ' to increase share before competitors consolidate.'
    },
    {
      type: 'trend',
      title: catData.trends[0],
      text: catData.trends[0] + ' is the fastest-growing segment in ' + catData.category + ' (' + trendMomenta[0] + ' YoY). Brands that lead here typically command 15–20% price premium and higher repeat purchase rates.'
    },
    {
      type: 'opportunity',
      title: 'D2C channel underutilised',
      text: 'Direct-to-consumer revenue in ' + catData.category + ' is growing at nearly double the category average. ' + brand + '\'s current channel mix leaves margin on the table vs digital-native competitors.'
    },
    {
      type: 'threat',
      title: catData.trends[3] || 'Regulatory risk',
      text: (catData.trends[3] || 'Emerging regulatory pressure') + ' represents a structural shift that smaller, more agile competitors are better positioned to navigate. ' + brand + ' should monitor and plan a response within 2 quarters.'
    }
  ];

  /* --- Summary --- */
  var summaries = [
    brand + ' holds ' + brandShare + '% share in ' + catData.category + ' (' + geo + '), ranking #' + brandRank + ' of ' + competitors.length + ' tracked competitors in a ' + catData.marketSize + ' market growing at ' + catData.growth + '. ' + (brandDelta.charAt(0) === '+' ? 'Share is expanding — momentum is positive heading into the next cycle.' : 'Share has contracted slightly — competitive pressure from ' + topComp.name + ' warrants strategic attention.'),
  ];

  return {
    summary: summaries[0],
    market_size: catData.marketSize,
    market_growth: catData.growth,
    brand_share: brandShare + '%',
    brand_share_delta: brandDelta,
    brand_rank: brandRank,
    total_competitors: competitors.length,
    competitors: competitors,
    geo_breakdown: geo_breakdown,
    trend_labels: trendLabels,
    trend_brand: trendBrand,
    trend_leader: trendLeader,
    trend_third: trendThird,
    category_trends: category_trends,
    insights: insights
  };
}

/* ===== MAIN ANALYSIS ===== */
function runAnalysis() {
  var brand = document.getElementById('brandInput').value.trim();
  var cat = document.getElementById('catInput').value.trim();
  var timeWindow = document.getElementById('timeInput').value;

  if (!brand || !cat) { alert('Please enter your brand and category.'); return; }

  hideSetup();
  showPage('dashPage');
  document.getElementById('loadingScreen').style.display = 'flex';
  document.getElementById('navContext').textContent = brand + '  ·  ' + cat + '  ·  ' + selectedGeo;
  animateLoading();
  destroyCharts();

  /* Simulate research delay — realistic feel */
  var totalDelay = 3800 + Math.random() * 1200;
  setTimeout(function() {
    var data = generateIntelligence(brand, cat, selectedGeo, timeWindow);
    document.getElementById('loadingScreen').style.display = 'none';
    renderDashboard(brand, cat, selectedGeo, timeWindow, data);
  }, totalDelay);
}

/* ===== RENDER DASHBOARD ===== */
function renderDashboard(brand, cat, geo, time, d) {
  var maxShare = Math.max.apply(null, d.competitors.map(function(c) { return c.share; }));
  var html = '<div class="dash-content">';

  html += '<div class="dash-header">';
  html += '<div class="dash-brand">' + brand + ' <span style="color:rgba(255,255,255,0.3);font-weight:400">in</span> ' + cat + '</div>';
  html += '<div class="dash-meta">' + geo + '  ·  ' + time + '  ·  Generated ' + new Date().toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'}) + '</div>';
  html += '<div class="dash-summary">' + d.summary + '</div>';
  html += '</div>';

  html += '<div class="kpi-row">';
  html += kpiCard('Market size', d.market_size, '', '');
  html += kpiCard('Market growth', d.market_growth, '', d.market_growth.charAt(0) === '+' ? 'pos' : 'neg');
  html += kpiCard(brand + ' share', d.brand_share, d.brand_share_delta, d.brand_share_delta && d.brand_share_delta.charAt(0) === '+' ? 'pos' : 'neg');
  html += kpiCard('Market rank', '#' + d.brand_rank + ' of ' + d.total_competitors, '', 'neu');
  html += kpiCard('Competitors tracked', d.competitors.length + ' direct', '', 'neu');
  html += '</div>';

  html += '<div class="grid-2">';
  html += '<div class="panel"><div class="panel-title">Competitor share of market</div>';
  d.competitors.forEach(function(c, i) {
    var pct = Math.round((c.share / (maxShare + 8)) * 100);
    var dClass = c.trend && c.trend.charAt(0) === '+' ? 'pos' : 'neg';
    html += '<div class="comp-item">';
    html += '<div class="comp-rank">' + (i+1) + '</div>';
    html += '<div class="comp-name">' + c.name + '</div>';
    html += '<div class="comp-bar-wrap"><div class="comp-bar" style="width:' + pct + '%;background:' + (c.color||'#3b82f6') + '"></div></div>';
    html += '<div class="comp-pct">' + c.share.toFixed(1) + '%</div>';
    html += '<div class="comp-delta ' + dClass + '">' + c.trend + '</div>';
    html += '<div class="comp-strength">' + (c.strength||'') + '</div>';
    html += '</div>';
  });
  html += '</div>';

  html += '<div class="panel"><div class="panel-title">Geographic breakdown — ' + geo + '</div>';
  html += '<table class="geo-tbl"><thead><tr><th>Region / Market</th><th>Share</th><th>Brand Rank</th><th>Key City</th><th>Momentum</th></tr></thead><tbody>';
  d.geo_breakdown.forEach(function(g) {
    var mClass = 'momentum-' + g.momentum;
    html += '<tr><td style="font-weight:500;color:#fff">' + g.region + '</td>';
    html += '<td>' + g.share + '</td>';
    html += '<td>#' + g.rank + '</td>';
    html += '<td style="color:rgba(255,255,255,0.4)">' + (g.key_city||'—') + '</td>';
    html += '<td><span class="momentum-dot ' + mClass + '"></span>' + g.momentum + '</td></tr>';
  });
  html += '</tbody></table></div></div>';

  html += '<div class="panel grid-full"><div class="panel-title">Market share trend — 8 quarters</div>';
  html += '<div style="display:flex;gap:20px;margin-bottom:14px;flex-wrap:wrap">';
  html += '<span style="display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(255,255,255,0.5)"><span style="width:28px;height:3px;background:#3b82f6;display:inline-block;border-radius:2px"></span>' + brand + '</span>';
  html += '<span style="display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(255,255,255,0.5)"><span style="width:28px;height:2px;border-top:2px dashed #ef4444;display:inline-block"></span>Market leader</span>';
  html += '<span style="display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(255,255,255,0.5)"><span style="width:28px;height:2px;border-top:2px dotted #f59e0b;display:inline-block"></span>#3 competitor</span>';
  html += '</div>';
  html += '<div class="chart-wrap" style="height:220px"><canvas id="trendChart" role="img" aria-label="Market share trend for ' + brand + ' vs competitors">Trend data.</canvas></div></div>';

  html += '<div class="grid-3">';
  html += '<div class="panel"><div class="panel-title">Share distribution</div>';
  html += '<div class="chart-wrap" style="height:180px"><canvas id="donutChart" role="img" aria-label="Market share donut chart">Share distribution.</canvas></div>';
  html += '<div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:6px" id="donutLegend"></div></div>';

  html += '<div class="panel"><div class="panel-title">Category trends</div>';
  d.category_trends.forEach(function(t) {
    var relColor = t.relevance==='high'?'#34d399':t.relevance==='medium'?'#fbbf24':'#6b7280';
    var momColor = t.momentum && t.momentum.charAt(0)==='+' ? '#34d399':'#f87171';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.05)">';
    html += '<div><div style="font-size:13px;color:#fff;font-weight:500">' + t.label + '</div>';
    html += '<div style="font-size:11px;color:' + relColor + ';margin-top:2px">' + t.relevance + ' relevance</div></div>';
    html += '<div style="font-size:14px;font-weight:600;color:' + momColor + '">' + t.momentum + '</div></div>';
  });
  html += '</div>';

  html += '<div class="panel"><div class="panel-title">Share by competitor</div>';
  html += '<div class="chart-wrap" style="height:180px"><canvas id="barChart" role="img" aria-label="Competitor share bar chart">Bar data.</canvas></div></div>';
  html += '</div>';

  html += '<div class="panel grid-full"><div class="panel-title">AI strategic insights</div>';
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
  d.insights.forEach(function(ins) {
    var icon = ins.type==='threat'?'⚠':ins.type==='opportunity'?'◆':'↗';
    html += '<div class="insight-item ' + ins.type + '">';
    html += '<div class="insight-icon">' + icon + '</div>';
    html += '<div class="insight-body"><div class="insight-tag">' + ins.type + (ins.title?' — '+ins.title:'') + '</div>';
    html += '<div class="insight-text">' + ins.text + '</div></div></div>';
  });
  html += '</div></div></div>';

  document.getElementById('dashShell').innerHTML = html;

  setTimeout(function() {
    renderTrendChart(d, brand);
    renderDonut(d);
    renderBar(d);
  }, 50);
}

/* ===== CHARTS ===== */
function destroyCharts() {
  chartRefs.forEach(function(c) { try { c.destroy(); } catch(e) {} });
  chartRefs = [];
}

function renderTrendChart(d, brand) {
  var ctx = document.getElementById('trendChart');
  if (!ctx) return;
  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.trend_labels,
      datasets: [
        { label: brand, data: d.trend_brand, borderColor:'#3b82f6', backgroundColor:'rgba(59,130,246,0.08)', pointBackgroundColor:'#3b82f6', pointRadius:4, pointHoverRadius:6, tension:0.4, fill:true, borderWidth:2.5 },
        { label:'Market leader', data:d.trend_leader, borderColor:'#ef4444', borderDash:[6,4], pointBackgroundColor:'#ef4444', pointStyle:'triangle', pointRadius:4, tension:0.4, fill:false, borderWidth:2 },
        { label:'#3 competitor', data:d.trend_third, borderColor:'#f59e0b', borderDash:[2,4], pointBackgroundColor:'#f59e0b', pointStyle:'rect', pointRadius:3, tension:0.4, fill:false, borderWidth:1.5 }
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins: { legend:{display:false}, tooltip:{ backgroundColor:'#1c1c2e', borderColor:'rgba(255,255,255,0.1)', borderWidth:1, callbacks:{ label:function(ctx){ return ' '+ctx.dataset.label+': '+ctx.parsed.y.toFixed(1)+'%'; } } } },
      scales: {
        x:{ ticks:{color:'#6b7280',font:{size:11}}, grid:{color:'rgba(255,255,255,0.04)'} },
        y:{ ticks:{color:'#6b7280',font:{size:11},callback:function(v){return v+'%';}}, grid:{color:'rgba(255,255,255,0.04)'} }
      }
    }
  });
  chartRefs.push(chart);
}

function renderDonut(d) {
  var ctx = document.getElementById('donutChart');
  if (!ctx) return;
  var chart = new Chart(ctx, {
    type:'doughnut',
    data:{ labels:d.competitors.map(function(c){return c.name;}), datasets:[{ data:d.competitors.map(function(c){return c.share;}), backgroundColor:d.competitors.map(function(c){return c.color||'#3b82f6';}), borderWidth:0, hoverOffset:6 }] },
    options:{ responsive:true, maintainAspectRatio:false, cutout:'62%', plugins:{ legend:{display:false}, tooltip:{ backgroundColor:'#1c1c2e', borderColor:'rgba(255,255,255,0.1)', borderWidth:1, callbacks:{label:function(ctx){return ' '+ctx.label+': '+ctx.parsed.toFixed(1)+'%';}} } } }
  });
  chartRefs.push(chart);
  var leg = document.getElementById('donutLegend');
  if (leg) leg.innerHTML = d.competitors.map(function(c){ return '<span style="display:flex;align-items:center;gap:4px;font-size:11px;color:rgba(255,255,255,0.5)"><span style="width:8px;height:8px;border-radius:2px;background:'+( c.color||'#3b82f6')+'"></span>'+c.name+'</span>'; }).join('');
}

function renderBar(d) {
  var ctx = document.getElementById('barChart');
  if (!ctx) return;
  var chart = new Chart(ctx, {
    type:'bar',
    data:{ labels:d.competitors.map(function(c){return c.name;}), datasets:[{ data:d.competitors.map(function(c){return c.share;}), backgroundColor:d.competitors.map(function(c){return c.color||'#3b82f6';}), borderRadius:4, barPercentage:0.7 }] },
    options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false}, tooltip:{ backgroundColor:'#1c1c2e', borderColor:'rgba(255,255,255,0.1)', borderWidth:1, callbacks:{label:function(ctx){return ' '+ctx.parsed.y.toFixed(1)+'%';}} } }, scales:{ x:{ticks:{color:'#6b7280',font:{size:10},maxRotation:35},grid:{display:false}}, y:{ticks:{color:'#6b7280',font:{size:10},callback:function(v){return v+'%';}},grid:{color:'rgba(255,255,255,0.04)'}} } }
  });
  chartRefs.push(chart);
}

/* ===== HELPERS ===== */
function kpiCard(label, value, delta, deltaClass) {
  var dHtml = delta ? '<div class="kpi-delta ' + deltaClass + '">' + delta + ' vs prior period</div>' : '';
  return '<div class="kpi-card"><div class="kpi-label">'+label+'</div><div class="kpi-value">'+value+'</div>'+dHtml+'</div>';
}
function exportPDF() { window.print(); }
