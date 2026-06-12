/* ===== ARENA INTELLIGENCE — app.js v3 (FIXED) ===== */

/* ---- GLOBAL STATE ---- */
var APP = { geo:'Global', state:'', city:'', brand:'', cat:'', time:'Last 12 months', charts:[] };

/* ---- GEO LOOKUP TABLES ---- */
var GEO_STATES = {
  'Global':              ['North America','Europe','Asia Pacific','Latin America','MEA','Oceania'],
  'North America':       ['California','Texas','New York','Florida','Illinois','Washington','Georgia','Pennsylvania','Ohio','Michigan','Colorado','Arizona','North Carolina','Virginia','Massachusetts'],
  'USA — State level':   ['California','Texas','New York','Florida','Illinois','Washington','Georgia','Pennsylvania','Ohio','Michigan','Colorado','Arizona','North Carolina','Virginia','Massachusetts','Tennessee','Indiana','Missouri','Maryland','Wisconsin'],
  'Europe':              ['United Kingdom','Germany','France','Italy','Spain','Netherlands','Sweden','Poland','Belgium','Switzerland','Denmark','Norway','Austria','Portugal','Finland'],
  'Asia Pacific':        ['China','India','Japan','South Korea','Australia','Indonesia','Thailand','Vietnam','Malaysia','Singapore','Philippines','Taiwan'],
  'India':               ['Maharashtra','Karnataka','Delhi NCR','Tamil Nadu','Gujarat','Rajasthan','Uttar Pradesh','West Bengal','Telangana','Andhra Pradesh','Kerala','Madhya Pradesh','Punjab','Haryana','Bihar'],
  'Latin America':       ['Brazil','Mexico','Argentina','Colombia','Chile','Peru','Venezuela','Ecuador','Bolivia','Uruguay'],
  'Middle East & Africa':['Saudi Arabia','UAE','South Africa','Egypt','Nigeria','Kenya','Israel','Qatar','Kuwait','Morocco','Ethiopia','Ghana']
};

var GEO_CITIES = {
  'California':   ['Los Angeles','San Francisco','San Diego','San Jose','Sacramento','Oakland','Fresno','Long Beach','Anaheim'],
  'Texas':        ['Houston','Dallas','Austin','San Antonio','Fort Worth','El Paso','Arlington','Corpus Christi','Plano'],
  'New York':     ['New York City','Buffalo','Rochester','Albany','Syracuse','Yonkers','White Plains','Ithaca'],
  'Florida':      ['Miami','Orlando','Tampa','Jacksonville','Fort Lauderdale','St. Petersburg','Tallahassee','Boca Raton'],
  'Illinois':     ['Chicago','Aurora','Rockford','Joliet','Naperville','Springfield','Peoria'],
  'Washington':   ['Seattle','Spokane','Tacoma','Bellevue','Olympia','Redmond','Kirkland'],
  'Georgia':      ['Atlanta','Augusta','Columbus','Savannah','Athens','Sandy Springs'],
  'Pennsylvania': ['Philadelphia','Pittsburgh','Allentown','Erie','Reading','Scranton'],
  'Ohio':         ['Columbus','Cleveland','Cincinnati','Toledo','Akron','Dayton'],
  'Michigan':     ['Detroit','Grand Rapids','Warren','Sterling Heights','Ann Arbor','Lansing'],
  'Colorado':     ['Denver','Colorado Springs','Aurora','Fort Collins','Lakewood'],
  'Arizona':      ['Phoenix','Tucson','Mesa','Chandler','Scottsdale','Glendale'],
  'United Kingdom':['London','Manchester','Birmingham','Leeds','Glasgow','Liverpool','Bristol','Edinburgh'],
  'Germany':      ['Berlin','Munich','Hamburg','Frankfurt','Cologne','Stuttgart','Düsseldorf','Leipzig'],
  'France':       ['Paris','Lyon','Marseille','Toulouse','Nice','Nantes','Strasbourg','Bordeaux'],
  'Italy':        ['Rome','Milan','Naples','Turin','Palermo','Florence','Venice','Bologna'],
  'Spain':        ['Madrid','Barcelona','Valencia','Seville','Zaragoza','Málaga','Murcia','Bilbao'],
  'Netherlands':  ['Amsterdam','Rotterdam','The Hague','Utrecht','Eindhoven','Tilburg'],
  'China':        ['Shanghai','Beijing','Shenzhen','Guangzhou','Chengdu','Hangzhou','Wuhan','Tianjin'],
  'India':        ['Mumbai','Delhi','Bengaluru','Chennai','Hyderabad','Kolkata','Pune','Ahmedabad','Jaipur','Surat'],
  'Japan':        ['Tokyo','Osaka','Yokohama','Nagoya','Sapporo','Kobe','Kyoto','Fukuoka'],
  'South Korea':  ['Seoul','Busan','Incheon','Daegu','Daejeon','Gwangju','Suwon'],
  'Australia':    ['Sydney','Melbourne','Brisbane','Perth','Adelaide','Gold Coast','Canberra'],
  'Indonesia':    ['Jakarta','Surabaya','Bandung','Medan','Bekasi','Tangerang'],
  'Maharashtra':  ['Mumbai','Pune','Nagpur','Nashik','Aurangabad','Solapur','Thane','Navi Mumbai'],
  'Karnataka':    ['Bengaluru','Mysore','Hubli','Mangalore','Belgaum','Davangere','Shimoga'],
  'Delhi NCR':    ['New Delhi','Gurugram','Noida','Faridabad','Ghaziabad','Greater Noida'],
  'Tamil Nadu':   ['Chennai','Coimbatore','Madurai','Tiruchirappalli','Salem','Tirunelveli'],
  'Gujarat':      ['Ahmedabad','Surat','Vadodara','Rajkot','Bhavnagar','Jamnagar','Gandhinagar'],
  'Rajasthan':    ['Jaipur','Jodhpur','Udaipur','Kota','Bikaner','Ajmer'],
  'Uttar Pradesh':['Lucknow','Kanpur','Agra','Varanasi','Allahabad','Meerut','Noida'],
  'West Bengal':  ['Kolkata','Howrah','Durgapur','Asansol','Siliguri'],
  'Telangana':    ['Hyderabad','Warangal','Nizamabad','Karimnagar'],
  'Kerala':       ['Kochi','Thiruvananthapuram','Kozhikode','Thrissur','Kollam'],
  'Brazil':       ['São Paulo','Rio de Janeiro','Brasília','Salvador','Fortaleza','Belo Horizonte','Manaus'],
  'Mexico':       ['Mexico City','Guadalajara','Monterrey','Puebla','Tijuana','León'],
  'Saudi Arabia': ['Riyadh','Jeddah','Mecca','Medina','Dammam','Khobar'],
  'UAE':          ['Dubai','Abu Dhabi','Sharjah','Al Ain','Ajman','Ras Al Khaimah'],
  'South Africa': ['Johannesburg','Cape Town','Durban','Pretoria','Port Elizabeth']
};

function getStates(geo) { return GEO_STATES[geo] || []; }
function getCities(state) { return GEO_CITIES[state] || []; }

/* ---- POPULATE SELECT HELPER ---- */
function populateSelect(selId, items, selectedVal, allLabel) {
  var sel = document.getElementById(selId);
  if (!sel) return;
  sel.innerHTML = '<option value="">' + (allLabel || '— All —') + '</option>';
  items.forEach(function(item) {
    var opt = document.createElement('option');
    opt.value = item; opt.textContent = item;
    if (item === selectedVal) opt.selected = true;
    sel.appendChild(opt);
  });
}

/* ============================================================
   MODAL GEO CONTROLS
   ============================================================ */
function modalSelectGeo(el) {
  document.querySelectorAll('.geo-card').forEach(function(c) { c.classList.remove('active'); });
  el.classList.add('active');
  APP.geo = el.dataset.geo;
  populateSelect('modalState', getStates(APP.geo), '', '— All regions —');
  populateSelect('modalCity', [], '', '— All cities —');
}

function modalStateChanged() {
  var state = document.getElementById('modalState').value;
  populateSelect('modalCity', getCities(state), '', '— All cities —');
}

/* ============================================================
   DASHBOARD PERSISTENT DRILL BAR
   ============================================================ */
function drillGeoChanged() {
  var geo = document.getElementById('drillGeo').value;
  populateSelect('drillState', getStates(geo), '', '— All —');
  populateSelect('drillCity', [], '', '— All cities —');
}

function drillStateChanged() {
  var state = document.getElementById('drillState').value;
  populateSelect('drillCity', getCities(state), '', '— All cities —');
}

function syncDrillBar() {
  /* Set drill bar dropdowns to match current APP state */
  var geoSel = document.getElementById('drillGeo');
  if (geoSel) geoSel.value = APP.geo;
  populateSelect('drillState', getStates(APP.geo), APP.state, '— All —');
  populateSelect('drillCity', APP.state ? getCities(APP.state) : [], APP.city, '— All cities —');
}

function applyDrill() {
  if (!APP.brand) return;
  var geo   = document.getElementById('drillGeo').value;
  var state = document.getElementById('drillState').value;
  var city  = document.getElementById('drillCity').value;

  APP.geo   = geo;
  APP.state = state;
  APP.city  = city;

  /* Update nav label */
  var label = city ? (city + ', ' + (state || geo)) : state ? (state + ', ' + geo) : geo;
  document.getElementById('navContext').textContent = APP.brand + ' · ' + APP.cat + ' · ' + label;

  /* Fade + regenerate */
  var dc = document.querySelector('.dash-content');
  if (dc) { dc.style.opacity = '0.25'; dc.style.pointerEvents = 'none'; }
  destroyCharts();

  setTimeout(function() {
    var data = generateIntelligence();
    renderDashboard(data);
  }, 450);
}

/* ============================================================
   CATEGORY DATABASE — real competitor names + strengths
   ============================================================ */
var CAT_DB = {
  default: {
    marketSize:'$48.2B', growth:'+7.4%', category:'Consumer goods',
    rivals:[
      {name:'Leader Corp',    share:34, color:'#ef4444', strength:'Brand equity & distribution'},
      {name:'Rival One',      share:22, color:'#3b82f6', strength:'Price leadership'},
      {name:'Challenger Co',  share:16, color:'#8b5cf6', strength:'Innovation pipeline'},
      {name:'Niche Player',   share:10, color:'#f59e0b', strength:'Channel dominance'},
      {name:'Emerging Brand', share: 7, color:'#06b6d4', strength:'Digital-first model'}
    ],
    trends:['Digital transformation','Sustainability focus','D2C growth','AI personalisation']
  },
  shoe:{
    marketSize:'$83.5B', growth:'+6.1%', category:'Athletic footwear',
    rivals:[
      {name:'Nike',         share:27, color:'#ef4444', strength:'Athlete deals + Jordan brand'},
      {name:'Adidas',       share:22, color:'#3b82f6', strength:'Fashion crossover + Originals'},
      {name:'New Balance',  share:11, color:'#22c55e', strength:'Heritage running + comfort'},
      {name:'Puma',         share: 8, color:'#f59e0b', strength:'Value + celebrity collabs'},
      {name:'Under Armour', share: 6, color:'#8b5cf6', strength:'Performance tech segment'}
    ],
    trends:['Athleisure boom','Sustainable materials','Direct-to-consumer','Metaverse drops']
  },
  footwear:{
    marketSize:'$83.5B', growth:'+6.1%', category:'Athletic footwear',
    rivals:[
      {name:'Nike',         share:27, color:'#ef4444', strength:'Global brand + athlete IP'},
      {name:'Adidas',       share:22, color:'#3b82f6', strength:'Fashion & culture positioning'},
      {name:'New Balance',  share:11, color:'#22c55e', strength:'Heritage + running technology'},
      {name:'Puma',         share: 8, color:'#f59e0b', strength:'Price & lifestyle value'},
      {name:'Under Armour', share: 6, color:'#8b5cf6', strength:'Performance & sports focus'}
    ],
    trends:['Athleisure boom','Sustainable materials','Direct-to-consumer','Metaverse drops']
  },
  sneaker:{
    marketSize:'$83.5B', growth:'+6.1%', category:'Sneakers',
    rivals:[
      {name:'Nike',        share:29, color:'#ef4444', strength:'Jordan + hype culture'},
      {name:'Adidas',      share:21, color:'#3b82f6', strength:'Yeezy legacy + Originals'},
      {name:'New Balance', share:12, color:'#22c55e', strength:'990 series revival'},
      {name:'Puma',        share: 7, color:'#f59e0b', strength:'Celebrity collab strategy'},
      {name:'ASICS',       share: 5, color:'#06b6d4', strength:'Running performance credibility'}
    ],
    trends:['Resell market','Collab culture','Sustainability','Customisation']
  },
  laptop:{
    marketSize:'$171.3B', growth:'+4.8%', category:'Personal computers',
    rivals:[
      {name:'HP',     share:24, color:'#3b82f6', strength:'Enterprise + broad consumer range'},
      {name:'Lenovo', share:23, color:'#ef4444', strength:'ThinkPad enterprise loyalty'},
      {name:'Apple',  share:13, color:'#6b7280', strength:'Premium ASP + macOS ecosystem'},
      {name:'Dell',   share:16, color:'#06b6d4', strength:'B2B direct sales model'},
      {name:'Asus',   share: 8, color:'#f59e0b', strength:'Gaming + thin & light value'}
    ],
    trends:['AI-integrated chips','Ultra-thin form factors','Gaming segment surge','Hybrid work demand']
  },
  computer:{
    marketSize:'$171.3B', growth:'+4.8%', category:'Personal computers',
    rivals:[
      {name:'HP',     share:24, color:'#3b82f6', strength:'Broad portfolio + enterprise'},
      {name:'Lenovo', share:23, color:'#ef4444', strength:'ThinkPad dominance + IdeaPad'},
      {name:'Apple',  share:13, color:'#6b7280', strength:'macOS ecosystem + M-series chip'},
      {name:'Dell',   share:16, color:'#06b6d4', strength:'Direct B2B model + XPS line'},
      {name:'Asus',   share: 8, color:'#f59e0b', strength:'Value + ROG gaming'}
    ],
    trends:['AI-integrated chips','Ultra-thin form factors','Gaming segment surge','Hybrid work demand']
  },
  smartphone:{
    marketSize:'$521.0B', growth:'+5.3%', category:'Smartphones',
    rivals:[
      {name:'Samsung', share:22, color:'#3b82f6', strength:'Android leader + display tech'},
      {name:'Apple',   share:18, color:'#6b7280', strength:'iOS ecosystem + premium ASP'},
      {name:'Xiaomi',  share:13, color:'#ef4444', strength:'Value pricing + flash sales'},
      {name:'Oppo',    share: 9, color:'#22c55e', strength:'Camera innovation + offline India'},
      {name:'Vivo',    share: 8, color:'#8b5cf6', strength:'Youth + selfie segment'}
    ],
    trends:['Foldable displays','5G adoption','AI camera features','Budget segment growth']
  },
  phone:{
    marketSize:'$521.0B', growth:'+5.3%', category:'Smartphones',
    rivals:[
      {name:'Samsung', share:22, color:'#3b82f6', strength:'Android ecosystem + Galaxy S'},
      {name:'Apple',   share:18, color:'#6b7280', strength:'Premium pricing power'},
      {name:'Xiaomi',  share:13, color:'#ef4444', strength:'Aggressive value + MIUI'},
      {name:'Oppo',    share: 9, color:'#22c55e', strength:'Offline distribution strength'},
      {name:'Vivo',    share: 8, color:'#8b5cf6', strength:'Camera differentiation'}
    ],
    trends:['Foldable displays','5G adoption','AI camera features','Budget segment growth']
  },
  beverage:{
    marketSize:'$244.8B', growth:'+5.9%', category:'Beverages',
    rivals:[
      {name:'Coca-Cola',        share:26, color:'#ef4444', strength:'Global distribution moat'},
      {name:'PepsiCo',          share:24, color:'#3b82f6', strength:'Snack + beverage bundle'},
      {name:'Nestlé',           share:12, color:'#22c55e', strength:'Water & nutrition portfolio'},
      {name:'Red Bull',         share: 9, color:'#f59e0b', strength:'Energy + extreme sports brand'},
      {name:'Keurig Dr Pepper', share: 8, color:'#8b5cf6', strength:'Flavour variety + home brew'}
    ],
    trends:['Zero-sugar demand','Functional drinks','Premium water','Energy drink surge']
  },
  drink:{
    marketSize:'$244.8B', growth:'+5.9%', category:'Beverages',
    rivals:[
      {name:'Coca-Cola', share:26, color:'#ef4444', strength:'Brand + global route to market'},
      {name:'PepsiCo',   share:24, color:'#3b82f6', strength:'Portfolio breadth + Frito-Lay'},
      {name:'Nestlé',    share:12, color:'#22c55e', strength:'Health + water positioning'},
      {name:'Red Bull',  share: 9, color:'#f59e0b', strength:'Premium energy + events'},
      {name:'Monster',   share: 7, color:'#06b6d4', strength:'Youth + gaming segment'}
    ],
    trends:['Zero-sugar demand','Functional drinks','Health positioning','Energy drink surge']
  },
  car:{
    marketSize:'$3.1T', growth:'+3.7%', category:'Automotive',
    rivals:[
      {name:'Toyota',      share:12, color:'#ef4444', strength:'Reliability + Hybrid leadership'},
      {name:'Volkswagen',  share:10, color:'#3b82f6', strength:'Europe volume dominance'},
      {name:'Stellantis',  share: 9, color:'#f59e0b', strength:'Multi-brand: Jeep, Ram, Fiat'},
      {name:'Hyundai-Kia', share: 8, color:'#22c55e', strength:'Value + aggressive EV push'},
      {name:'Ford',        share: 7, color:'#8b5cf6', strength:'F-150 dominance + Mustang'}
    ],
    trends:['EV acceleration','Autonomous driving','Connected cars','Shared mobility']
  },
  ev:{
    marketSize:'$623.3B', growth:'+22.6%', category:'Electric vehicles',
    rivals:[
      {name:'Tesla',      share:19, color:'#ef4444', strength:'Supercharger + software OTA'},
      {name:'BYD',        share:17, color:'#22c55e', strength:'Vertical integration + China'},
      {name:'Volkswagen', share: 9, color:'#3b82f6', strength:'ID. platform + EU network'},
      {name:'Hyundai',    share: 7, color:'#06b6d4', strength:'Ioniq 5/6 design + ICCU'},
      {name:'GM',         share: 6, color:'#f59e0b', strength:'Ultium battery + scale'}
    ],
    trends:['Charging infrastructure','Battery range improvement','Government incentives','Chinese brand expansion']
  },
  skincare:{
    marketSize:'$145.3B', growth:'+8.2%', category:'Skincare',
    rivals:[
      {name:"L'Oréal",      share:18, color:'#ef4444', strength:'Derm-backed product lines + R&D'},
      {name:'Estée Lauder', share:14, color:'#8b5cf6', strength:'Prestige + department store counters'},
      {name:'Shiseido',     share: 9, color:'#f59e0b', strength:'J-beauty + Asia luxury positioning'},
      {name:'Unilever',     share:11, color:'#3b82f6', strength:'Mass market scale + Simple brand'},
      {name:'Beiersdorf',   share: 7, color:'#22c55e', strength:'Nivea trust + derma range'}
    ],
    trends:['Clean beauty','Personalisation','K-beauty influence','Science-backed formulas']
  },
  beauty:{
    marketSize:'$572.0B', growth:'+7.7%', category:'Beauty & personal care',
    rivals:[
      {name:"L'Oréal",    share:14, color:'#ef4444', strength:'Omnichannel + derm science R&D'},
      {name:'Unilever',   share:12, color:'#3b82f6', strength:'Emerging market scale'},
      {name:'Estée Lauder',share:10,color:'#8b5cf6', strength:'Prestige portfolio + Travel Retail'},
      {name:'P&G',        share: 9, color:'#f59e0b', strength:'Retail shelf + Olay dominance'},
      {name:'Shiseido',   share: 7, color:'#06b6d4', strength:'Asia luxury positioning'}
    ],
    trends:['Inclusive shade ranges','Influencer commerce','Clean ingredients','Hybrid products']
  },
  food:{
    marketSize:'$8.7T', growth:'+4.2%', category:'Food & FMCG',
    rivals:[
      {name:'Nestlé',      share:10, color:'#22c55e', strength:'Portfolio + emerging markets'},
      {name:'PepsiCo',     share: 8, color:'#3b82f6', strength:'Snack + beverage synergy'},
      {name:'JBS',         share: 7, color:'#ef4444', strength:'Protein + global scale'},
      {name:'Tyson Foods', share: 6, color:'#f59e0b', strength:'US protein market leader'},
      {name:'Unilever',    share: 6, color:'#8b5cf6', strength:'Ice cream + condiments'}
    ],
    trends:['Plant-based alternatives','Sustainable packaging','Functional nutrition','Private label growth']
  },
  fashion:{
    marketSize:'$1.7T', growth:'+5.8%', category:'Apparel & fashion',
    rivals:[
      {name:'Zara (Inditex)', share:12, color:'#3b82f6', strength:'Fast fashion speed-to-market'},
      {name:'H&M Group',      share:10, color:'#ef4444', strength:'Value + sustainability narrative'},
      {name:'Fast Retailing', share: 8, color:'#22c55e', strength:'Uniqlo basics dominance'},
      {name:'PVH Corp',       share: 7, color:'#8b5cf6', strength:'Calvin Klein + Tommy Hilfiger'},
      {name:'Hanesbrands',    share: 5, color:'#f59e0b', strength:'Basics + private label'}
    ],
    trends:['Circular fashion','Rental models','AI design tools','Slow fashion movement']
  },
  apparel:{
    marketSize:'$1.7T', growth:'+5.8%', category:'Apparel',
    rivals:[
      {name:'Zara (Inditex)', share:12, color:'#3b82f6', strength:'Fast fashion + Zara pull'},
      {name:'H&M Group',      share:10, color:'#ef4444', strength:'Affordable trend'},
      {name:'Nike',           share: 9, color:'#22c55e', strength:'Athleisure crossover'},
      {name:'Adidas',         share: 8, color:'#f59e0b', strength:'Sportswear lifestyle'},
      {name:'PVH Corp',       share: 6, color:'#8b5cf6', strength:'Calvin Klein + Tommy'}
    ],
    trends:['Athleisure crossover','Sustainable materials','Resale market boom','Inclusive sizing']
  },
  fintech:{
    marketSize:'$340.1B', growth:'+16.8%', category:'Fintech',
    rivals:[
      {name:'Stripe',        share:18, color:'#8b5cf6', strength:'Developer-first payments API'},
      {name:'PayPal',        share:16, color:'#3b82f6', strength:'Consumer brand + Venmo'},
      {name:'Square (Block)',share:11, color:'#22c55e', strength:'SMB POS + Cash App'},
      {name:'Adyen',         share: 9, color:'#06b6d4', strength:'Enterprise omnichannel'},
      {name:'Klarna',        share: 7, color:'#ef4444', strength:'BNPL + shopping intent data'}
    ],
    trends:['Embedded finance','BNPL regulation','CBDCs','AI fraud detection']
  },
  saas:{
    marketSize:'$317.5B', growth:'+18.3%', category:'SaaS / Cloud software',
    rivals:[
      {name:'Salesforce',  share:19, color:'#3b82f6', strength:'CRM ecosystem lock-in'},
      {name:'Microsoft',   share:17, color:'#6b7280', strength:'M365 + Azure bundle'},
      {name:'ServiceNow',  share:11, color:'#22c55e', strength:'IT workflow dominance'},
      {name:'Workday',     share: 9, color:'#f59e0b', strength:'HR + finance back-office'},
      {name:'HubSpot',     share: 7, color:'#ef4444', strength:'SMB inbound + free tier'}
    ],
    trends:['AI-native features','Vertical SaaS','Usage-based pricing','Platform consolidation']
  },
  streaming:{
    marketSize:'$118.4B', growth:'+12.1%', category:'Streaming & media',
    rivals:[
      {name:'Netflix',      share:29, color:'#ef4444', strength:'Content investment + global reach'},
      {name:'Amazon Prime', share:20, color:'#3b82f6', strength:'Prime bundle + sports rights'},
      {name:'Disney+',      share:16, color:'#8b5cf6', strength:'Marvel + Star Wars IP'},
      {name:'Max (WBD)',    share:11, color:'#06b6d4', strength:'HBO prestige content'},
      {name:'Apple TV+',   share: 6, color:'#6b7280', strength:'Device bundling + prestige'}
    ],
    trends:['Ad-supported tiers','Password sharing crackdown','Live sports rights','Short-form competition']
  },
  insurance:{
    marketSize:'$5.6T', growth:'+3.9%', category:'Insurance',
    rivals:[
      {name:'UnitedHealth',       share:11, color:'#3b82f6', strength:'Health + Optum data'},
      {name:'AXA',                share: 9, color:'#ef4444', strength:'Europe breadth'},
      {name:'Ping An',            share: 8, color:'#22c55e', strength:'China fintech + AI'},
      {name:'Berkshire Hathaway', share: 7, color:'#f59e0b', strength:'GEICO + reinsurance'},
      {name:'Allianz',            share: 7, color:'#8b5cf6', strength:'Asset management bundle'}
    ],
    trends:['Embedded insurance','AI underwriting','Parametric products','Usage-based pricing']
  },
  bank:{
    marketSize:'$7.2T', growth:'+4.5%', category:'Banking',
    rivals:[
      {name:'JPMorgan Chase',  share:14, color:'#3b82f6', strength:'Investment + retail combo'},
      {name:'ICBC',            share:12, color:'#ef4444', strength:'China scale'},
      {name:'Bank of America', share:11, color:'#22c55e', strength:'US consumer depth'},
      {name:'HSBC',            share: 9, color:'#f59e0b', strength:'Global trade finance'},
      {name:'BNP Paribas',     share: 8, color:'#8b5cf6', strength:'European corporate banking'}
    ],
    trends:['Digital banking','Embedded finance','Open banking APIs','BNPL disruption']
  },
  ecommerce:{
    marketSize:'$6.3T', growth:'+10.4%', category:'E-commerce',
    rivals:[
      {name:'Amazon',            share:38, color:'#f59e0b', strength:'Prime + logistics moat'},
      {name:'Alibaba',           share:22, color:'#ef4444', strength:'China + SEA dominance'},
      {name:'JD.com',            share:12, color:'#22c55e', strength:'Direct sourcing + 1P'},
      {name:'Shopify merchants', share: 8, color:'#06b6d4', strength:'SMB D2C enablement'},
      {name:'Pinduoduo',         share: 7, color:'#8b5cf6', strength:'Group buying model'}
    ],
    trends:['Social commerce','Same-day delivery','AI recommendations','Live shopping']
  }
};

function getCatData(cat) {
  var lower = cat.toLowerCase();
  var keys = Object.keys(CAT_DB);
  for (var i = 0; i < keys.length; i++) {
    if (lower.indexOf(keys[i]) !== -1) return CAT_DB[keys[i]];
  }
  return CAT_DB.default;
}

/* ---- SEEDED RANDOM ---- */
function hash(s) {
  var h = 5381;
  for (var i = 0; i < s.length; i++) h = ((h << 5) + h) + s.charCodeAt(i);
  return Math.abs(h >>> 0);
}
function srnd(seed, n) {
  var x = Math.sin(seed * 9301 + n * 49297 + 233) * 93280.332;
  return x - Math.floor(x);
}

/* ============================================================
   GENERATE INTELLIGENCE — core engine
   ============================================================ */
function generateIntelligence() {
  var brand = APP.brand, cat = APP.cat, geo = APP.geo, state = APP.state, city = APP.city;
  var seedStr = (brand + '|' + cat + '|' + geo + '|' + state + '|' + city).toLowerCase();
  var seed = hash(seedStr);

  var catData = getCatData(cat);

  /* 1. Clone rivals with small per-geo share variance */
  var pool = catData.rivals.map(function(r, i) {
    var v = Math.round((srnd(seed, i + 1) - 0.5) * 8);
    return { name: r.name, share: Math.max(3, r.share + v), color: r.color, strength: r.strength, isBrand: false };
  });

  /* 2. Insert / replace the entered brand */
  var brandShare = 8 + Math.round(srnd(seed, 50) * 26); // 8–34%
  var existIdx = pool.findIndex(function(r) { return r.name.toLowerCase() === brand.toLowerCase(); });
  if (existIdx !== -1) {
    pool[existIdx].share = brandShare;
    pool[existIdx].isBrand = true;
  } else {
    pool.push({ name: brand, share: brandShare, color: '#3b82f6', strength: 'Your brand', isBrand: true });
    if (pool.length > 6) pool.splice(5, pool.length - 5); // keep max 6
  }

  /* 3. Sort descending by share */
  pool.sort(function(a, b) { return b.share - a.share; });

  /* 4. Normalise to ~97% total */
  var total = pool.reduce(function(s, r) { return s + r.share; }, 0);
  var scale = 97 / total;
  pool = pool.map(function(r) {
    return { name: r.name, share: parseFloat((r.share * scale).toFixed(1)), color: r.color, strength: r.strength, isBrand: r.isBrand };
  });

  var brandComp  = pool.find(function(r) { return r.isBrand; }) || pool[0];
  var brandRank  = pool.indexOf(brandComp) + 1;
  var topComp    = pool[0].isBrand ? pool[1] : pool[0];
  var thirdComp  = pool[2] || pool[1];
  var deltaSign  = srnd(seed, 77) > 0.42 ? '+' : '-';
  var deltaVal   = (0.2 + Math.round(srnd(seed, 88) * 20) / 10).toFixed(1);
  var brandDelta = deltaSign + deltaVal + 'pp';

  /* 5. Geo breakdown rows */
  var GEO_REGION_LISTS = {
    'Global':              ['North America','Europe','Asia Pacific','Latin America','MEA','Oceania'],
    'North America':       ['United States','Canada','Mexico','Caribbean','Central America'],
    'USA — State level':   ['California','Texas','New York','Florida','Illinois','Washington','Georgia','Ohio','Pennsylvania','Michigan'],
    'Europe':              ['UK & Ireland','DACH','France','Italy','Spain','Nordics','Eastern Europe','Benelux'],
    'Asia Pacific':        ['China','India','Japan','South Korea','SE Asia','Australia','Taiwan','Hong Kong'],
    'India':               ['Maharashtra','Karnataka','Delhi NCR','Tamil Nadu','Gujarat','Rajasthan','UP','West Bengal','Telangana','Kerala'],
    'Latin America':       ['Brazil','Mexico','Argentina','Colombia','Chile','Peru','Ecuador'],
    'Middle East & Africa':['Saudi Arabia','UAE','South Africa','Egypt','Nigeria','Kenya','Israel','Morocco']
  };

  var regions = GEO_REGION_LISTS[geo] || GEO_REGION_LISTS['Global'];
  if (state && getCities(state).length) regions = getCities(state);
  if (city) regions = [city+' Central',city+' North',city+' South',city+' East',city+' West',city+' Suburbs'];

  var momOpts   = ['rising','rising','stable','stable','declining'];
  var shareBase = [30,23,17,13,9,5,3,2];
  var geoRows   = regions.slice(0, 8).map(function(r, i) {
    var v  = Math.round((srnd(seed, 40 + i) - 0.5) * 8);
    var sh = Math.max(1, (shareBase[i] || 3) + v);
    var rv = Math.round((srnd(seed, 80 + i) - 0.5) * 2);
    return {
      region:   r,
      share:    sh + '%',
      rank:     Math.max(1, Math.min(pool.length, brandRank + rv)),
      momentum: momOpts[Math.floor(srnd(seed, 90 + i) * momOpts.length)]
    };
  });

  /* 6. Trend chart */
  var labels = ["Q1'24","Q2'24","Q3'24","Q4'24","Q1'25","Q2'25","Q3'25","Q4'25"];
  var dir = deltaSign === '+' ? 1 : -1;
  var tBrand = [], tLeader = [], tThird = [];
  for (var q = 0; q < 8; q++) {
    var n = function(o) { return (srnd(seed, 200 + q * 3 + o) - 0.5) * 0.7; };
    tBrand.push( parseFloat((brandComp.share  - dir * (7 - q) * 0.38 + n(0)).toFixed(1)));
    tLeader.push(parseFloat((topComp.share   + n(1)).toFixed(1)));
    tThird.push( parseFloat((thirdComp.share + n(2)).toFixed(1)));
  }

  /* 7. Category trends */
  var trendMom = ['+18%','+13%','+9%','-4%'];
  var catTrends = catData.trends.map(function(t, i) {
    return { label: t, momentum: trendMom[i]||'+7%', relevance: i<2?'high':i===2?'medium':'low' };
  });

  /* 8. Geo label */
  var geoLabel = city ? city+', '+(state||geo) : state ? state+', '+geo : geo;

  /* 9. Insights */
  var insights = [
    { type:'threat',      title: topComp.name+' — market leader',
      text: topComp.name+' commands '+topComp.share.toFixed(1)+'% share in '+catData.category+' ('+geoLabel+') and is accelerating in '+catData.trends[0].toLowerCase()+'. Without a differentiated response, '+brand+' risks losing 2–3pp share over the next 3 quarters.' },
    { type:'opportunity', title: 'Geo whitespace — '+(geoRows[2]?geoRows[2].region:'emerging market'),
      text: (geoRows[2]?geoRows[2].region:'Key emerging markets')+' shows rising momentum. '+brand+' is currently ranked #'+(geoRows[2]?geoRows[2].rank:brandRank)+' here — targeted distribution investment could yield +4–6pp share gain with moderate spend.' },
    { type:'trend',       title: catData.trends[0],
      text: catData.trends[0]+' is the fastest-growing force in '+catData.category+' ('+trendMom[0]+' YoY). Brands leading this trend command 15–20% price premium and significantly higher customer lifetime value.' },
    { type:'opportunity', title: 'D2C channel gap',
      text: 'Direct-to-consumer revenue in '+catData.category+' grows at nearly 2× the category average. '+brand+'\'s current channel mix likely leaves meaningful margin and customer data on the table vs digital-native competitors.' },
    { type:'threat',      title: catData.trends[3]||'Structural disruption',
      text: (catData.trends[3]||'Structural market shifts')+' is creating headwinds across '+catData.category+'. Smaller, more agile competitors are adapting faster — '+brand+' should build a response plan within 2 quarters.' }
  ];

  /* 10. Summary */
  var summary = brand+' holds '+brandComp.share.toFixed(1)+'% share in '+catData.category+' ('+geoLabel+'), ranked #'+brandRank+' among '+pool.length+' tracked competitors in a '+catData.marketSize+' market growing at '+catData.growth+'. '
    + (deltaSign==='+'
        ? 'Share is expanding — positive momentum, with the gap to '+topComp.name+' ('+topComp.share.toFixed(1)+'%) narrowing.'
        : 'Share has contracted slightly — competitive pressure from '+topComp.name+' ('+topComp.share.toFixed(1)+'%) warrants a targeted strategic response.');

  return {
    summary:      summary,
    market_size:  catData.marketSize,
    market_growth:catData.growth,
    brand_share:  brandComp.share.toFixed(1)+'%',
    brand_delta:  brandDelta,
    brand_rank:   brandRank,
    total:        pool.length,
    competitors:  pool,
    geo_rows:     geoRows,
    geo_label:    geoLabel,
    t_labels:     labels,
    t_brand:      tBrand,
    t_leader:     tLeader,
    t_third:      tThird,
    cat_trends:   catTrends,
    insights:     insights,
    top_name:     topComp.name
  };
}

/* ============================================================
   PAGE / MODAL NAVIGATION
   ============================================================ */
function showPage(id) {
  document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}
function showSetup() { document.getElementById('setupModal').classList.add('open'); }
function hideSetup() { document.getElementById('setupModal').classList.remove('open'); }
function closeSetupIfOutside(e) { if (e.target===document.getElementById('setupModal')) hideSetup(); }

function quickLaunch(brand, cat, geo) {
  document.getElementById('brandInput').value = brand;
  document.getElementById('catInput').value = cat;
  APP.geo = geo;
  document.querySelectorAll('.geo-card').forEach(function(c){ c.classList.toggle('active', c.dataset.geo===geo); });
  populateSelect('modalState', getStates(geo), '', '— All regions —');
  populateSelect('modalCity', [], '', '— All cities —');
  showSetup();
}

/* ============================================================
   LOADING
   ============================================================ */
var STEPS = ['Identifying competitors in category...','Analysing market share signals...','Processing geographic data...','Generating strategic insights...','Composing executive briefing...'];
function animateLoading() {
  var el = document.getElementById('loadingSteps');
  el.innerHTML = '';
  STEPS.forEach(function(s,i){ var d=document.createElement('div'); d.className='loading-step'; d.id='ls'+i; d.textContent=s; el.appendChild(d); });
  var i=0;
  (function tick(){
    if(i>0){var p=document.getElementById('ls'+(i-1));if(p)p.className='loading-step done';}
    if(i<STEPS.length){var c=document.getElementById('ls'+i);if(c)c.className='loading-step active';i++;setTimeout(tick,700+Math.random()*500);}
  })();
}

/* ============================================================
   RUN ANALYSIS (from modal)
   ============================================================ */
function runAnalysis() {
  var brand = document.getElementById('brandInput').value.trim();
  var cat   = document.getElementById('catInput').value.trim();
  if (!brand || !cat) { alert('Please enter your brand and category.'); return; }

  APP.brand = brand;
  APP.cat   = cat;
  APP.time  = document.getElementById('timeInput').value;
  APP.state = document.getElementById('modalState').value;
  APP.city  = document.getElementById('modalCity').value;

  hideSetup();
  showPage('dashPage');

  /* Show loading, hide drill bar until content is ready */
  document.getElementById('loadingScreen').style.display = 'flex';
  document.getElementById('geoDrillBar').style.display = 'none';

  var label = APP.city ? APP.city+', '+(APP.state||APP.geo) : APP.state ? APP.state+', '+APP.geo : APP.geo;
  document.getElementById('navContext').textContent = brand+' · '+cat+' · '+label;

  animateLoading();
  destroyCharts();

  setTimeout(function() {
    var data = generateIntelligence();
    document.getElementById('loadingScreen').style.display = 'none';
    document.getElementById('geoDrillBar').style.display = 'flex';
    syncDrillBar();
    renderDashboard(data);
  }, 3200 + Math.random() * 1000);
}

/* ============================================================
   RENDER DASHBOARD
   ============================================================ */
function renderDashboard(d) {
  var brand    = APP.brand;
  var maxShare = Math.max.apply(null, d.competitors.map(function(c){ return c.share; }));
  var html     = '<div class="dash-content">';

  /* Header */
  html += '<div class="dash-header">';
  html += '<div class="dash-brand">'+brand+' <span style="color:rgba(255,255,255,0.3);font-weight:400">in</span> '+APP.cat+'</div>';
  html += '<div class="dash-meta">'+d.geo_label+' &nbsp;·&nbsp; '+APP.time+' &nbsp;·&nbsp; Updated '+new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})+'</div>';
  html += '<div class="dash-summary">'+d.summary+'</div>';
  html += '</div>';

  /* KPIs */
  html += '<div class="kpi-row">';
  html += kpiCard('Market size',   d.market_size, '', '');
  html += kpiCard('Market growth', d.market_growth, '', d.market_growth.charAt(0)==='+' ?'pos':'neg');
  html += kpiCard(brand+' share',  d.brand_share, d.brand_delta, d.brand_delta.charAt(0)==='+' ?'pos':'neg');
  html += kpiCard('Market rank',   '#'+d.brand_rank+' of '+d.total, '', 'neu');
  html += kpiCard('Tracked rivals',d.total+' direct', '', 'neu');
  html += '</div>';

  /* Grid: competitors + geo */
  html += '<div class="grid-2">';

  /* ---- COMPETITOR LIST ---- */
  html += '<div class="panel"><div class="panel-title">Rivals — share of market &amp; strength</div>';
  d.competitors.forEach(function(c, i) {
    var pct = Math.round((c.share / (maxShare + 6)) * 100);
    var row = c.isBrand ? 'background:rgba(59,130,246,0.09);border-radius:7px;margin:2px -6px;padding:2px 6px;' : '';
    html += '<div class="comp-item" style="'+row+'">';
    html += '<div class="comp-rank" style="'+(c.isBrand?'color:#60a5fa;font-weight:700':'')+'">'+(c.isBrand?'★':(i+1))+'</div>';
    html += '<div class="comp-name" style="'+(c.isBrand?'color:#60a5fa':'')+';min-width:110px">'+c.name+'</div>';
    html += '<div class="comp-bar-wrap"><div class="comp-bar" style="width:'+pct+'%;background:'+c.color+'"></div></div>';
    html += '<div class="comp-pct">'+c.share.toFixed(1)+'%</div>';
    html += '<div class="comp-strength">'+c.strength+'</div>';
    html += '</div>';
  });
  html += '</div>';

  /* ---- GEO TABLE ---- */
  html += '<div class="panel"><div class="panel-title">Geographic breakdown — '+d.geo_label+'</div>';
  html += '<table class="geo-tbl"><thead><tr><th>Market</th><th>Share</th><th>Brand rank</th><th>Momentum</th></tr></thead><tbody>';
  d.geo_rows.forEach(function(g) {
    html += '<tr>';
    html += '<td style="font-weight:500;color:#fff">'+g.region+'</td>';
    html += '<td>'+g.share+'</td>';
    html += '<td>#'+g.rank+'</td>';
    html += '<td><span class="momentum-dot momentum-'+g.momentum+'"></span>'+g.momentum+'</td>';
    html += '</tr>';
  });
  html += '</tbody></table></div></div>';

  /* Trend chart */
  html += '<div class="panel grid-full"><div class="panel-title">Market share trend — 8 quarters</div>';
  html += '<div style="display:flex;gap:20px;margin-bottom:14px;flex-wrap:wrap">';
  html += legend('#3b82f6','solid',brand);
  html += legend('#ef4444','dashed','Market leader ('+d.top_name+')');
  html += legend('#f59e0b','dotted','#3 competitor');
  html += '</div>';
  html += '<div style="position:relative;height:220px"><canvas id="trendChart" role="img" aria-label="Share trend">Trend.</canvas></div></div>';

  /* Bottom row: donut + trends + bar */
  html += '<div class="grid-3">';

  html += '<div class="panel"><div class="panel-title">Share distribution</div>';
  html += '<div style="position:relative;height:180px"><canvas id="donutChart" role="img" aria-label="Share donut">Donut.</canvas></div>';
  html += '<div id="donutLegend" style="margin-top:10px;display:flex;flex-wrap:wrap;gap:6px"></div></div>';

  html += '<div class="panel"><div class="panel-title">Category trends</div>';
  d.cat_trends.forEach(function(t) {
    var rc = t.relevance==='high'?'#34d399':t.relevance==='medium'?'#fbbf24':'#6b7280';
    var mc = t.momentum.charAt(0)==='+' ?'#34d399':'#f87171';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.05)">';
    html += '<div><div style="font-size:13px;color:#fff;font-weight:500">'+t.label+'</div>';
    html += '<div style="font-size:11px;color:'+rc+';margin-top:2px">'+t.relevance+' relevance</div></div>';
    html += '<div style="font-size:14px;font-weight:600;color:'+mc+'">'+t.momentum+'</div></div>';
  });
  html += '</div>';

  html += '<div class="panel"><div class="panel-title">Share by competitor</div>';
  html += '<div style="position:relative;height:180px"><canvas id="barChart" role="img" aria-label="Bar chart">Bar.</canvas></div></div>';
  html += '</div>';

  /* Insights */
  html += '<div class="panel grid-full"><div class="panel-title">Strategic insights — AI generated</div>';
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
  d.insights.forEach(function(ins) {
    var icon = ins.type==='threat'?'⚠':ins.type==='opportunity'?'◆':'↗';
    html += '<div class="insight-item '+ins.type+'">';
    html += '<div class="insight-icon">'+icon+'</div>';
    html += '<div class="insight-body"><div class="insight-tag">'+ins.type+(ins.title?' — '+ins.title:'')+'</div>';
    html += '<div class="insight-text">'+ins.text+'</div></div></div>';
  });
  html += '</div></div></div>';

  document.getElementById('dashShell').innerHTML = html;

  setTimeout(function() {
    renderTrendChart(d, brand);
    renderDonut(d);
    renderBar(d);
  }, 60);
}

/* ============================================================
   CHARTS
   ============================================================ */
function destroyCharts() {
  APP.charts.forEach(function(c){ try{c.destroy();}catch(e){} });
  APP.charts = [];
}
function renderTrendChart(d, brand) {
  var el = document.getElementById('trendChart'); if(!el) return;
  APP.charts.push(new Chart(el, {
    type:'line',
    data:{ labels:d.t_labels, datasets:[
      {label:brand,       data:d.t_brand,  borderColor:'#3b82f6',backgroundColor:'rgba(59,130,246,0.08)',pointBackgroundColor:'#3b82f6',pointRadius:4,tension:0.4,fill:true, borderWidth:2.5},
      {label:'Leader',    data:d.t_leader, borderColor:'#ef4444',borderDash:[6,4],pointBackgroundColor:'#ef4444',pointStyle:'triangle',pointRadius:4,tension:0.4,fill:false,borderWidth:2},
      {label:'#3',        data:d.t_third,  borderColor:'#f59e0b',borderDash:[2,4],pointBackgroundColor:'#f59e0b',pointStyle:'rect',   pointRadius:3,tension:0.4,fill:false,borderWidth:1.5}
    ]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#1c1c2e',borderColor:'rgba(255,255,255,0.1)',borderWidth:1,callbacks:{label:function(c){return ' '+c.dataset.label+': '+c.parsed.y.toFixed(1)+'%';}}}},scales:{x:{ticks:{color:'#6b7280',font:{size:11}},grid:{color:'rgba(255,255,255,0.04)'}},y:{ticks:{color:'#6b7280',font:{size:11},callback:function(v){return v+'%';}},grid:{color:'rgba(255,255,255,0.04)'}}}}
  }));
}
function renderDonut(d) {
  var el = document.getElementById('donutChart'); if(!el) return;
  APP.charts.push(new Chart(el, {
    type:'doughnut',
    data:{labels:d.competitors.map(function(c){return c.name;}),datasets:[{data:d.competitors.map(function(c){return c.share;}),backgroundColor:d.competitors.map(function(c){return c.color;}),borderWidth:0,hoverOffset:6}]},
    options:{responsive:true,maintainAspectRatio:false,cutout:'62%',plugins:{legend:{display:false},tooltip:{backgroundColor:'#1c1c2e',borderColor:'rgba(255,255,255,0.1)',borderWidth:1,callbacks:{label:function(c){return ' '+c.label+': '+c.parsed.toFixed(1)+'%';}}}}}
  }));
  var leg = document.getElementById('donutLegend');
  if(leg) leg.innerHTML = d.competitors.map(function(c){
    return '<span style="display:flex;align-items:center;gap:4px;font-size:11px;color:rgba(255,255,255,0.6)"><span style="width:8px;height:8px;border-radius:2px;background:'+c.color+'"></span>'+c.name+'</span>';
  }).join('');
}
function renderBar(d) {
  var el = document.getElementById('barChart'); if(!el) return;
  APP.charts.push(new Chart(el, {
    type:'bar',
    data:{labels:d.competitors.map(function(c){return c.name;}),datasets:[{data:d.competitors.map(function(c){return c.share;}),backgroundColor:d.competitors.map(function(c){return c.color;}),borderRadius:4,barPercentage:0.7}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#1c1c2e',borderColor:'rgba(255,255,255,0.1)',borderWidth:1,callbacks:{label:function(c){return ' '+c.parsed.y.toFixed(1)+'%';}}}},scales:{x:{ticks:{color:'#6b7280',font:{size:10},maxRotation:30},grid:{display:false}},y:{ticks:{color:'#6b7280',font:{size:10},callback:function(v){return v+'%';}},grid:{color:'rgba(255,255,255,0.04)'}}}}
  }));
}

/* ============================================================
   HELPERS
   ============================================================ */
function kpiCard(label, value, delta, cls) {
  var d = delta ? '<div class="kpi-delta '+cls+'">'+delta+' vs prior period</div>' : '';
  return '<div class="kpi-card"><div class="kpi-label">'+label+'</div><div class="kpi-value">'+value+'</div>'+d+'</div>';
}
function legend(color, style, label) {
  var border = style==='solid' ? 'background:'+color+';height:3px;' : 'border-top:2px '+style+' '+color+';height:0;';
  return '<span style="display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(255,255,255,0.5)"><span style="width:28px;'+border+'display:inline-block"></span>'+label+'</span>';
}
function exportPDF() { window.print(); }
