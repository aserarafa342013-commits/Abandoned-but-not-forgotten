/* ==========================================================================
   Abandoned but not Forgotten — application
   NASA Space Apps Challenge 2026
   ========================================================================== */
'use strict';

/* --------------------------------------------------------------------------
   State
   -------------------------------------------------------------------------- */
const state = {
  lang: 'en',
  world: 'all',
  query: '',
  map: 'moon',
  story: 0,
  current: 0,
  lastFocus: null
};

const byId = (id) => document.getElementById(id);
const t = (pair) => (pair ? pair[state.lang] : '');

/* --------------------------------------------------------------------------
   The collection — 13 artifacts, Moon and Mars only
   -------------------------------------------------------------------------- */
const ARTIFACTS = [
  /* ------------------------------- MOON ------------------------------- */
  {
    id: 'apollo-lm',
    world: 'moon',
    year: 1969,
    timelineYear: 1969,
    coords: { lat: 0.674, lon: 23.473 },
    type: { en: 'Descent stage', ar: 'مرحلة هبوط' },
    site: { en: 'Tranquility Base, Sea of Tranquility', ar: 'قاعدة الهدوء، بحر السكون' },
    name: { en: 'Apollo Lunar Modules', ar: 'مركبات الهبوط القمرية' },
    sub: { en: 'The descent stages · 1969–1972', ar: 'مراحل الهبوط · ١٩٦٩–١٩٧٢' },
    hook: {
      en: 'Six gold-wrapped platforms are still standing on the Moon — launch pads that were never meant to come home.',
      ar: 'ست منصات ملفوفة بالدهبي لسه واقفة على القمر — منصات إطلاق ماكانش مقدر لها ترجع.'
    },
    what: {
      en: 'The bottom half of the Lunar Module: an octagonal platform with four landing legs, a descent engine, fuel tanks and a ladder. The crew rode the top half home.',
      ar: 'النص السفلي من مركبة الهبوط القمرية: منصة ثمانية الأضلاع بأربع رجلين، ومحرك هبوط، وتانكات وقود، وسلّم. الطاقم رجع في النص العلوي.'
    },
    why: {
      en: 'It did the braking and hovering, then became the launch pad for the ascent stage. Leaving it behind saved the weight needed to get the astronauts back into orbit.',
      ar: 'هي اللي عملت الفرملة والحومان، وبعدين بقت منصة إطلاق لمرحلة الصعود. تركها وفّر الوزن اللازم لرجوع رواد الفضاء للمدار.'
    },
    found: {
      en: 'Every Apollo landing depended on it. Across six missions, crews brought home 382 kilograms of Moon rock and soil — and left behind the platforms that made the landings possible.',
      ar: 'كل هبوط أبولو اعتمد عليها. على مدى ست مهام، الرواد رجّعوا ٣٨٢ كيلوجرام من صخور وتربة القمر — وسابوا وراهم المنصات اللي خلّت الهبوط ممكن.'
    },
    now: {
      en: 'All six descent stages remain where they landed between 1969 and 1972. Lunar Reconnaissance Orbiter cameras can see them, and their long shadows, from orbit.',
      ar: 'الست مراحل لسه في مكانها اللي هبطت فيه بين ١٩٦٩ و١٩٧٢. كاميرات مدار القمر بتصورهم وظلهم الطويل من فوق.'
    },
    fact: {
      en: 'Apollo 11’s descent stage is the famous one: it is the platform Neil Armstrong and Buzz Aldrin stood on when they became the first humans on the Moon.',
      ar: 'مرحلة هبوط أبولو ١١ هي الأشهر: هي المنصة اللي وقف عليها نيل أرمسترونج وباز ألدرين لما بقوا أول بشر على القمر.'
    },
    img: 'images/moon-apollo-lm.jpg',
    source: { label: 'NSSDCA — Apollo 11 Lunar Module', url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C' }
  },
  {
    id: 'lrv',
    world: 'moon',
    year: 1971,
    timelineYear: 1971,
    coords: { lat: 26.132, lon: 3.634 },
    type: { en: 'Electric rover', ar: 'عربة كهربائية' },
    site: { en: 'Hadley–Apennine (Apollo 15)', ar: 'هادلي–أبينين (أبولو ١٥)' },
    name: { en: 'Lunar Roving Vehicles', ar: 'العربات القمرية' },
    sub: { en: 'Three moon buggies · 1971–1972', ar: 'ثلاث عربيات قمرية · ١٩٧١–١٩٧٢' },
    hook: {
      en: 'Three electric buggies folded up like suitcases, drove across the Moon, and parked for good.',
      ar: 'ثلاث عربيات كهربائية اتطوت زي الشنط، مشيت على القمر، وات ركنت للأبد.'
    },
    what: {
      en: 'An open-top electric car with four wheels, each driven by its own motor. It folded into a wedge for the trip and unfolded on the surface. Top speed: about 18 km/h.',
      ar: 'عربية كهربائية مفتوحة بأربع عجلات، كل عجلة ليها موتور. اتطوت على شكل مثلث في الرحلة واتفردت على السطح. أقصى سرعة: حوالي ١٨ كم/س.'
    },
    why: {
      en: 'Apollo 15’s landing site was too large to explore on foot. The rover let astronauts carry tools, samples and each other farther from the lander.',
      ar: 'موقع هبوط أبولو ١٥ كان أكبر من إنه يتمشي على الرجل. العربية خلّت الرواد ياخدوا أدوات وعينات ويبعدوا أكتر عن المركبة.'
    },
    found: {
      en: 'The three rovers covered about 90 kilometres together. They carried astronauts to mountains, craters and valleys, and helped collect the samples that reshaped our picture of the Moon.',
      ar: 'العربيات التلاتة مشيوا حوالي ٩٠ كيلومتر مع بعض. وصلوا الرواد لجبال وفوهات ووديان، وساعدوا في جمع العينات اللي غيّرت صورتنا عن القمر.'
    },
    now: {
      en: 'All three are parked where their missions ended: Apollo 15 at Hadley–Apennine, Apollo 16 in the Descartes highlands, Apollo 17 in the Taurus–Littrow valley. No one has driven one since 1972.',
      ar: 'التلاتة متركنين في مكان نهاية مهامهم: أبولو ١٥ في هادلي–أبينين، أبولو ١٦ في مرتفعات ديكارت، وأبولو ١٧ في وادي تاوروس–ليترو. محدش ساق واحدة منهم من ١٩٧٢.'
    },
    fact: {
      en: 'Each wheel had its own motor, so the rover could keep moving even if one wheel lost traction.',
      ar: 'كل عجلة ليها موتور خاص، فالعربية كانت تقدر تكمل لو عجلة فقدت التماس.'
    },
    img: 'images/moon-lrv.jpg',
    source: { label: 'NSSDCA — Lunar Roving Vehicle', url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C' }
  },
  {
    id: 'alsep',
    world: 'moon',
    year: 1969,
    timelineYear: 1969,
    coords: { lat: -3.012, lon: -23.422 },
    type: { en: 'Science station', ar: 'محطة علمية' },
    site: { en: 'Five sites, 1969–1972', ar: 'خمسة مواقع، ١٩٦٩–١٩٧٢' },
    name: { en: 'ALSEP science packages', ar: 'حزم ALSEP العلمية' },
    sub: { en: 'Apollo Lunar Surface Experiments Package', ar: 'حزمة تجارب سطح القمر' },
    hook: {
      en: 'A science lab left behind: seismometers, magnetometers, and a mirror that still answers today.',
      ar: 'معمل علمي اتساب ورا: سيسمومترات ومغناطيسات ومرآة لسه بترد لحد النهارده.'
    },
    what: {
      en: 'A central station powered by a small nuclear generator, with instruments plugged into it: a seismometer to listen for moonquakes, a magnetometer, a solar-wind detector and more.',
      ar: 'محطة مركزية بتشتغل بمولّد نووي صغير، فيها أدوات موصولة: سيسمومتر يسمع زلازل القمر، ومغناطيس، وكاشف رياح شمسية، وغيرها.'
    },
    why: {
      en: 'The astronauts could only stay a few days. ALSEP let the science keep running for years after they left.',
      ar: 'الرواد كانوا يقعدوا كام يوم بس. ALSEP خلّى العلم يفضل شغال سنين بعد ما يمشوا.'
    },
    found: {
      en: 'It recorded moonquakes and meteorite impacts, measured the Moon’s heat flow, and helped reveal its layered interior. Apollo 11 carried a smaller early version called EASEP.',
      ar: 'سجّل زلازل القمر وارتطامات النيازك، وقاس تدفق حرارة القمر، وساعد يكشف طبقاته الداخلية. أبولو ١١ كان معاها نسخة أبسط اسمها EASEP.'
    },
    now: {
      en: 'The powered instruments were switched off in 1977, but the passive laser retroreflectors need no power. Observatories still bounce laser pulses off them to measure the Moon’s distance.',
      ar: 'الأجهزة اللي محتاجة كهربا اتقفلت سنة ١٩٧٧، لكن عواكس الليزر مش محتاجة طاقة. المراصد لسه بترمي ليزر عليها لقياس بُعد القمر.'
    },
    fact: {
      en: 'Because the Moon has no atmosphere, the mirror arrays have stayed clear for more than 50 years.',
      ar: 'لأن القمر مفيش عليه غلاف جوي، مصفوفات المرايا فضلت نضيفة أكتر من ٥٠ سنة.'
    },
    img: 'images/moon-alsep.jpg',
    source: { label: 'NSSDCA — ALSEP', url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C' }
  },
  {
    id: 'surveyor',
    world: 'moon',
    year: 1967,
    timelineYear: 1967,
    coords: { lat: -3.4, lon: -25.6 },
    type: { en: 'Robotic lander', ar: 'مركبة هبوط روبوتية' },
    site: { en: 'Oceanus Procellarum', ar: 'محيط العواصف' },
    name: { en: 'Surveyor 3', ar: 'سيرفيور ٣' },
    sub: { en: 'The lander humans visited · 1967', ar: 'المركبة اللي زارها البشر · ١٩٦٧' },
    hook: {
      en: 'The only robot on the Moon that humans have ever walked up to.',
      ar: 'الروبوت الوحيد على القمر اللي مشى له البشر.'
    },
    what: {
      en: 'A three-legged robotic lander with a television camera and a scoop. It touched down in April 1967 to prove that a spacecraft could land softly on the Moon.',
      ar: 'مركبة روبوتية بثلاث رجلين، بكاميرا تليفزيون وجاروف. هبطت في أبريل ١٩٦٧ عشان تثبت إن مركبة تقدر تهبط بهدوء على القمر.'
    },
    why: {
      en: 'Apollo needed to know whether the surface could hold a lander. Surveyor 3 was one of seven Surveyor probes sent to test landing and study the soil.',
      ar: 'أبولو كانت محتاجة تعرف إذا كان السطح يشيل مركبة. سيرفيور ٣ كانت واحدة من ٧ مسبارات اتوبعتت تختبر الهبوط وتدرس التربة.'
    },
    found: {
      en: 'It sent back more than 6,000 images and tested the lunar soil. Two and a half years later, the Apollo 12 crew landed nearby, walked over, and brought its camera home.',
      ar: 'بعتت أكتر من ٦٠٠٠ صورة واختبرت تربة القمر. بعدها بسنتين ونص، طاقم أبولو ١٢ هبط قريب، مشى لها، ورجّع كاميرتها الأرض.'
    },
    now: {
      en: 'Surveyor 3 is still in its crater in Oceanus Procellarum, with the footprints of the Apollo 12 astronauts nearby.',
      ar: 'سيرفيور ٣ لسه في فوهتها في محيط العواصف، وقريب منها آثار أقدام طاقم أبولو ١٢.'
    },
    fact: {
      en: 'It is the only off-world robot that people have visited, inspected, and taken pieces from.',
      ar: 'هو الروبوت الوحيد خارج الأرض اللي البشر زاروه وفحصوه وأخدوا منه أجزاء.'
    },
    img: 'images/moon-surveyor.jpg',
    source: { label: 'NASA — Surveyor 3', url: 'https://science.nasa.gov/mission/surveyor-3/' }
  },

  /* ------------------------------- MARS ------------------------------- */
  {
    id: 'viking1',
    world: 'mars',
    year: 1976,
    timelineYear: 1982,
    coords: { lat: 22.27, lon: -49.97 },
    type: { en: 'Stationary lander', ar: 'مركبة هبوط ثابتة' },
    site: { en: 'Chryse Planitia', ar: 'سهل كرايس' },
    name: { en: 'Viking 1 Lander', ar: 'مركبة فايكينج ١' },
    sub: { en: 'The first picture from the surface · 1976', ar: 'أول صورة من السطح · ١٩٧٦' },
    hook: {
      en: 'The first machine to send a photograph from the surface of Mars.',
      ar: 'أول جهاز يبعت صورة من سطح المريخ.'
    },
    what: {
      en: 'A 600-kilogram lander with two cameras, a robotic arm, a weather station and three biology experiments.',
      ar: 'مركبة وزنها ٦٠٠ كيلوجرام، بكاميرتين وذراع روبوتية ومحطة طقس وثلاث تجارب حيوية.'
    },
    why: {
      en: 'Viking went to answer a big question: is there life on Mars? It also studied the soil, atmosphere and weather.',
      ar: 'فايكينج راحت تجاوب سؤال كبير: هل فيه حياة على المريخ؟ ودرست كمان التربة والغلاف الجوي والطقس.'
    },
    found: {
      en: 'It sent back more than a thousand images, measured the Martian atmosphere, and ran the first experiments designed to detect life. The results were puzzling, not conclusive.',
      ar: 'بعتت أكتر من ألف صورة، وقاست الغلاف الجوي للمريخ، وعملت أول تجارب مخصصة لاكتشاف الحياة. النتايج كانت مربكة ومش حاسمة.'
    },
    now: {
      en: 'Viking 1 has been silent since 1982. Its site was renamed the Thomas Mutch Memorial Station, and the lander is still sitting in Chryse Planitia.',
      ar: 'فايكينج ١ ساكتة من ١٩٨٢. موقعها اتسمى محطة توماس ماتش التذكارية، والمركبة لسه قاعدة في سهل كرايس.'
    },
    fact: {
      en: 'Its first picture arrived on 20 July 1976 — exactly seven years after humans first walked on the Moon.',
      ar: 'أول صورة وصلت في ٢٠ يوليو ١٩٧٦ — بالظبط سبع سنين بعد أول مشي للبشر على القمر.'
    },
    img: 'images/mars-viking1.jpg',
    source: { label: 'NASA — Viking 1 & 2', url: 'https://science.nasa.gov/mission/viking-1/' }
  },
  {
    id: 'viking2',
    world: 'mars',
    year: 1976,
    timelineYear: 1980,
    coords: { lat: 48.3, lon: 134.0 },
    type: { en: 'Stationary lander', ar: 'مركبة هبوط ثابتة' },
    site: { en: 'Utopia Planitia', ar: 'سهل يوتوبيا' },
    name: { en: 'Viking 2 Lander', ar: 'مركبة فايكينج ٢' },
    sub: { en: 'The lander that watched frost · 1976', ar: 'المركبة اللي شافت الصقيع · ١٩٧٦' },
    hook: {
      en: 'The lander that watched frost form on Mars.',
      ar: 'المركبة اللي شافت الصقيع بيتكوّن على المريخ.'
    },
    what: {
      en: 'A twin of Viking 1: cameras, a robotic arm, a weather station and biology experiments, lowered onto a colder northern plain.',
      ar: 'توأم فايكينج ١: كاميرات وذراع روبوتية ومحطة طقس وتجارب حيوية، اتحطت في سهل شمالي أبرد.'
    },
    why: {
      en: 'Viking 2 was the second half of the mission, sent to a different kind of landscape so scientists could compare two sites.',
      ar: 'فايكينج ٢ كانت النص التاني من المهمة، اتبعتت لمنظر طبيعي مختلف عشان العلماء يقارنوا موقعين.'
    },
    found: {
      en: 'It photographed frost on the ground, measured very low night temperatures, and sent back hundreds of images of a flat, rocky plain.',
      ar: 'صوّرت الصقيع على الأرض، وقاست حرارة ليل منخفضة جدًا، وبعتت مئات الصور لسهل مستوي وصخري.'
    },
    now: {
      en: 'Silent since 1980, Viking 2 is still in Utopia Planitia. Its site is named the Gerald Soffen Memorial Station.',
      ar: 'ساكتة من ١٩٨٠، وفايكينج ٢ لسه في سهل يوتوبيا. موقعها اسمه محطة جيرالد سوفن التذكارية.'
    },
    fact: {
      en: 'Its landing site was chosen partly because orbiters saw strange patterns in the ground — possibly shaped by ice.',
      ar: 'موقع هبوطها اتختار جزئيًا لأن المدارات شافت أنماط غريبة في الأرض — يمكن تشكّلت بفعل الجليد.'
    },
    img: 'images/mars-viking2.jpg',
    source: { label: 'NASA — Viking 1 & 2', url: 'https://science.nasa.gov/mission/viking-1/' }
  },
  {
    id: 'pathfinder',
    world: 'mars',
    year: 1997,
    timelineYear: 1997,
    coords: { lat: 19.13, lon: -33.22 },
    type: { en: 'Stationary lander', ar: 'مركبة هبوط ثابتة' },
    site: { en: 'Ares Vallis', ar: 'وادي آريس' },
    name: { en: 'Mars Pathfinder Lander', ar: 'مركبة مارس باثفايندر' },
    sub: { en: 'The airbag landing · 1997', ar: 'الهبوط بالأكياس الهوائية · ١٩٩٧' },
    hook: {
      en: 'A lander that bounced across Mars inside airbags, then opened like a metal flower.',
      ar: 'مركبة نطّت على المريخ جوه أكياس هوائية، وبعدين اتفتحت زي وردة معدنية.'
    },
    what: {
      en: 'A stationary lander with cameras, a weather station and a ramp. It carried a small rover named Sojourner.',
      ar: 'مركبة ثابتة بكاميرات ومحطة طقس ومنحدر. كانت شايلة روفر صغير اسمه سوجورنر.'
    },
    why: {
      en: 'NASA wanted to prove that a small, low-cost spacecraft could land on Mars — and that a rover could drive off it.',
      ar: 'ناسا كانت عايزة تثبت إن مركبة صغيرة ورخيصة تقدر تهبط على المريخ — وإن روفر يقدر ينزل منها ويمشي.'
    },
    found: {
      en: 'It returned thousands of images and millions of weather measurements, and its rover analyzed rocks at the edge of an ancient outflow channel.',
      ar: 'رجّعت آلاف الصور وملايين قياسات الطقس، والروفر بتاعها حلّل صخور على حافة قناة قديمة.'
    },
    now: {
      en: 'Silent since September 1997, Pathfinder is still in Ares Vallis. Its site is named the Carl Sagan Memorial Station.',
      ar: 'ساكتة من سبتمبر ١٩٩٧، وباثفايندر لسه في وادي آريس. موقعها اسمه محطة كارل ساجان التذكارية.'
    },
    fact: {
      en: 'It hit the ground at more than 50 km/h and bounced to a stop before opening its petals.',
      ar: 'خبطت الأرض بسرعة أكتر من ٥٠ كم/س ونطّت لحد ما وقفت، وبعدين فتحت بتلاتها.'
    },
    img: 'images/mars-pathfinder.jpg',
    source: { label: 'NASA — Mars Pathfinder', url: 'https://science.nasa.gov/mission/mars-pathfinder/' }
  },
  {
    id: 'sojourner',
    world: 'mars',
    year: 1997,
    timelineYear: 1997,
    coords: { lat: 19.13, lon: -33.22 },
    mapOffset: { x: 10, y: -14 },
    type: { en: 'Rover', ar: 'روفر' },
    site: { en: 'Ares Vallis', ar: 'وادي آريس' },
    name: { en: 'Sojourner', ar: 'سوجورنر' },
    sub: { en: 'The first rover on Mars · 1997', ar: 'أول روفر على المريخ · ١٩٩٧' },
    hook: {
      en: 'A rover the size of a microwave — and the first wheels ever to roll on another planet.',
      ar: 'روفر في حجم الميكروويف — وأول عجلات تمشي على كوكب تاني.'
    },
    what: {
      en: 'A 10.6-kilogram, six-wheeled rover with a solar panel and a spectrometer. It moved slowly and stayed close to the lander.',
      ar: 'روفر وزنه ١٠٫٦ كيلوجرام، بست عجلات ولوح شمسي وجهاز تحليل طيفي. كان بيتحرك ببطء ويفضل قريب من المركبة.'
    },
    why: {
      en: 'It was a test: could a rover drive on Mars at all? Sojourner was built to find out.',
      ar: 'كان اختبار: هل روفر يقدر يمشي على المريخ أصلًا؟ سوجورنر اتبنى عشان يعرف الإجابة.'
    },
    found: {
      en: 'It analyzed more than a dozen rocks and soils, took close-up images, and proved that small rovers could do real science.',
      ar: 'حلّل أكتر من دستة صخور وتربة، صوّر من قريب، وأثبت إن الروفرات الصغيرة تقدر تعمل علم حقيقي.'
    },
    now: {
      en: 'Parked beside Pathfinder in Ares Vallis since 1997.',
      ar: 'متركن جنب باثفايندر في وادي آريس من ١٩٩٧.'
    },
    fact: {
      en: 'It was designed for about a week of driving. It kept working for nearly three months.',
      ar: 'اتصمم لحوالي أسبوع من المشي. فضل شغال تقريبًا تلات شهور.'
    },
    img: 'images/mars-sojourner.jpg',
    source: { label: 'NASA — Mars Pathfinder & Sojourner', url: 'https://science.nasa.gov/mission/mars-pathfinder/' }
  },
  {
    id: 'spirit',
    world: 'mars',
    year: 2004,
    timelineYear: 2010,
    coords: { lat: -14.57, lon: 175.47 },
    type: { en: 'Rover', ar: 'روفر' },
    site: { en: 'Gusev Crater', ar: 'فوهة جوسيف' },
    name: { en: 'Spirit', ar: 'سبيريت' },
    sub: { en: 'The rover that got stuck · 2004–2010', ar: 'الروفر اللي اتزنق · ٢٠٠٤–٢٠١٠' },
    hook: {
      en: 'It got stuck in the sand — and kept doing science anyway.',
      ar: 'اتزنق في الرمل — وفضل يعمل علم برضه.'
    },
    what: {
      en: 'One of two golf-cart-sized rovers, with six wheels, cameras and a tool that could grind into rock.',
      ar: 'واحد من روفرين في حجم عربية جولف، بست عجلات وكاميرات وأداة تقدر تحفر في الصخر.'
    },
    why: {
      en: 'Spirit landed in Gusev Crater to look for signs that water once flowed there.',
      ar: 'سبيريت هبط في فوهة جوسيف عشان يدوّر على آثار مية كانت بتجري هناك.'
    },
    found: {
      en: 'It found silica-rich soil and carbonate minerals — clues to ancient water and hot springs — and drove 7.73 kilometres.',
      ar: 'لقى تربة غنية بالسيليكا ومعادن كربونات — دليل على مية وينابيع قديمة — ومشى ٧٫٧٣ كيلومتر.'
    },
    now: {
      en: 'It became stuck in soft soil in 2009. Its last contact was in March 2010; it is still in Gusev Crater.',
      ar: 'اتزنق في تربة طرية سنة ٢٠٠٩. آخر تواصل كان في مارس ٢٠١٠، ولسه في فوهة جوسيف.'
    },
    fact: {
      en: 'It was built for 90 days. It lasted more than six years.',
      ar: 'اتبنى لـ٩٠ يوم. عاش أكتر من ست سنين.'
    },
    img: 'images/mars-spirit.jpg',
    source: { label: 'NASA — Spirit & Opportunity', url: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/' }
  },
  {
    id: 'opportunity',
    world: 'mars',
    year: 2004,
    timelineYear: 2018,
    coords: { lat: -1.95, lon: -5.53 },
    type: { en: 'Rover', ar: 'روفر' },
    site: { en: 'Meridiani Planum', ar: 'سهل مريدياني' },
    name: { en: 'Opportunity', ar: 'أوبورتيونيتي' },
    sub: { en: 'The marathon rover · 2004–2018', ar: 'روفر الماراثون · ٢٠٠٤–٢٠١٨' },
    hook: {
      en: 'The rover that drove a marathon, then went quiet in a dust storm.',
      ar: 'الروفر اللي مشى ماراثون، وبعدين سكت في عاصفة ترابية.'
    },
    what: {
      en: 'Spirit’s twin, with the same six wheels and tools, sent to the opposite side of Mars.',
      ar: 'توأم سبيريت، بنفس الست عجلات والأدوات، اتبعت للناحية التانية من المريخ.'
    },
    why: {
      en: 'Meridiani Planum was chosen because orbiters detected hematite — a mineral that often forms in water.',
      ar: 'سهل مريدياني اتختار لأن المدارات كشفت هيماتيت — معدن غالبًا بيتكوّن في المية.'
    },
    found: {
      en: 'It found evidence that liquid water once flowed and evaporated there, studied a crater rim for years, and drove 45.16 kilometres.',
      ar: 'لقى دليل إن مية سايلة كانت بتجري وتتبخر هناك، ودرس حافة فوهة لسنين، ومشى ٤٥٫١٦ كيلومتر.'
    },
    now: {
      en: 'Silent since June 2018, after a planet-wide dust storm blocked the Sun. NASA declared the mission over in February 2019.',
      ar: 'ساكت من يونيو ٢٠١٨، بعد عاصفة ترابية غطّت الكوكب وحجبت الشمس. ناسا أعلنت نهاية المهمة في فبراير ٢٠١٩.'
    },
    fact: {
      en: 'The last signal was a flat radio tone. The poetic “last words” people share online were written later by a journalist.',
      ar: 'آخر إشارة كانت نغمة راديو مسطّحة. «كلمات الوداع» الشعرية اللي بتنتشر على النت كتبها صحفي بعدين.'
    },
    img: 'images/mars-opportunity.jpg',
    source: { label: 'NASA — Spirit & Opportunity', url: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/' }
  },
  {
    id: 'phoenix',
    world: 'mars',
    year: 2008,
    timelineYear: 2008,
    coords: { lat: 68.22, lon: -125.75 },
    type: { en: 'Stationary lander', ar: 'مركبة هبوط ثابتة' },
    site: { en: 'Vastitas Borealis', ar: 'السهول الشمالية' },
    name: { en: 'Phoenix', ar: 'فينيكس' },
    sub: { en: 'The digger in the arctic · 2008', ar: 'الحفّار في القطب · ٢٠٠٨' },
    hook: {
      en: 'It dug into the arctic soil, touched water ice — then winter arrived.',
      ar: 'حفر في تربة القطب، لمس مية متجمدة — وبعدين جه الشتا.'
    },
    what: {
      en: 'A stationary lander with a robotic arm, a scoop, cameras and a small chemistry lab.',
      ar: 'مركبة ثابتة بذراع روبوتية وجاروف وكاميرات ومعمل كيمياء صغير.'
    },
    why: {
      en: 'Phoenix was sent to the Martian Arctic to dig for water ice and study the soil.',
      ar: 'فينيكس اتبعتت للقطب الشمالي للمريخ عشان تحفر عن مية متجمدة وتدرس التربة.'
    },
    found: {
      en: 'It confirmed water ice just below the surface, found alkaline soil and perchlorate salts, and watched snow fall from clouds.',
      ar: 'أكدت وجود مية متجمدة تحت السطح، ولقت تربة قلوية وأملاح بيركلورات، وشافت تلج بينزل من السحاب.'
    },
    now: {
      en: 'After the Martian winter, Phoenix stopped answering. It is still in Vastitas Borealis, likely covered in carbon-dioxide frost.',
      ar: 'بعد شتا المريخ، فينيكس بطّلت ترد. لسه في السهول الشمالية، وغالبًا مغطاة بصقيع ثاني أكسيد الكربون.'
    },
    fact: {
      en: 'It was the first mission to touch water ice on Mars.',
      ar: 'كانت أول مهمة تلمس مية متجمدة على المريخ.'
    },
    img: 'images/mars-phoenix.jpg',
    source: { label: 'NASA — Phoenix & InSight landers', url: 'https://science.nasa.gov/mission/insight/' }
  },
  {
    id: 'insight',
    world: 'mars',
    year: 2018,
    timelineYear: 2022,
    coords: { lat: 4.5, lon: 135.62 },
    type: { en: 'Stationary lander', ar: 'مركبة هبوط ثابتة' },
    site: { en: 'Elysium Planitia', ar: 'سهل إليسيوم' },
    name: { en: 'InSight', ar: 'إنسايت' },
    sub: { en: 'The lander that listened · 2018–2022', ar: 'المركبة اللي سمعت · ٢٠١٨–٢٠٢٢' },
    hook: {
      en: 'It put its ear to the ground and listened to Mars.',
      ar: 'حطّ ودنها على الأرض وسمعت المريخ.'
    },
    what: {
      en: 'A lander with a seismometer, a heat probe and a weather station. Its main instrument had to be placed on the ground by a robotic arm.',
      ar: 'مركبة بسيسمومتر ومسبار حراري ومحطة طقس. أداتها الأساسية كان لازم تنزل الأرض بذراع روبوتية.'
    },
    why: {
      en: 'InSight was built to study the inside of Mars — how thick its crust is, what its core is like, and how often it shakes.',
      ar: 'إنسايت اتبنت عشان تدرس جوه المريخ — سمك القشرة، وشكل اللب، وعدد الهزات.'
    },
    found: {
      en: 'It recorded more than 1,300 marsquakes, measured the planet’s layers, and detected the vibrations of wind and dust devils.',
      ar: 'سجّلت أكتر من ١٣٠٠ هزة مريخية، وقاست طبقات الكوكب، وحسّت باهتزازات الرياح والشياطين الترابية.'
    },
    now: {
      en: 'Dust covered its solar panels and cut its power. Its last contact was in December 2022.',
      ar: 'التراب غطّى ألواحها الشمسية وقلّل طاقتها. آخر تواصل كان في ديسمبر ٢٠٢٢.'
    },
    fact: {
      en: 'Its seismometer was so sensitive it could feel a breeze.',
      ar: 'سيسمومترها كان حساس لدرجة إنه كان يحس بهبوب الرياح.'
    },
    img: 'images/mars-insight.jpg',
    source: { label: 'NASA — InSight', url: 'https://science.nasa.gov/mission/insight/' }
  },
  {
    id: 'ingenuity',
    world: 'mars',
    year: 2021,
    timelineYear: 2024,
    coords: { lat: 18.44, lon: 77.45 },
    type: { en: 'Helicopter', ar: 'هليكوبتر' },
    site: { en: 'Jezero Crater, Airfield Beta', ar: 'فوهة جيزيرو، حقل بيتا' },
    name: { en: 'Ingenuity', ar: 'إنجينيويتي' },
    sub: { en: 'The first helicopter on Mars · 2021–2024', ar: 'أول هليكوبتر على المريخ · ٢٠٢١–٢٠٢٤' },
    hook: {
      en: 'A tissue-box helicopter that became the first aircraft on another planet.',
      ar: 'هليكوبتر في حجم علبة مناديل بقت أول طيارة على كوكب تاني.'
    },
    what: {
      en: 'A small solar-powered helicopter with two rotors, four legs and a camera. It traveled to Mars attached to Perseverance.',
      ar: 'هليكوبتر صغيرة بالطاقة الشمسية، بروتورين وأربع رجلين وكاميرا. سافرت للمريخ متثبتة على Perseverance.'
    },
    why: {
      en: 'It was a technology demonstration: could anything fly in Mars’ thin air?',
      ar: 'كانت تجربة تقنية: هل أي حاجة تقدر تطير في هوا المريخ الرقيق؟'
    },
    found: {
      en: 'It flew 72 times, scouted terrain for Perseverance, and proved that powered flight works on Mars.',
      ar: 'طارت ٧٢ مرة، واستكشفت الأرض قدام Perseverance، وأثبتت إن الطيران بمحرك شغال على المريخ.'
    },
    now: {
      en: 'A rotor blade was damaged on its 72nd flight in January 2024. It will never fly again, but it is still sitting at Airfield Beta.',
      ar: 'ريشة اتكسرت في الرحلة ٧٢ في يناير ٢٠٢٤. مش هتطير تاني، لكنها لسه قاعدة في حقل بيتا.'
    },
    fact: {
      en: 'Its blades spun at about 2,400 rpm — roughly five times faster than a helicopter on Earth.',
      ar: 'ريشها كانت بلفّ حوالي ٢٤٠٠ لفة في الدقيقة — تقريبًا خمس مرات أسرع من هليكوبتر على الأرض.'
    },
    img: 'images/mars-ingenuity.jpg',
    source: { label: 'NASA — Ingenuity Mars Helicopter', url: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/' }
  }
];

/* --------------------------------------------------------------------------
   Stories
   -------------------------------------------------------------------------- */
const STORIES = [
  {
    artifact: 'alsep',
    kicker: { en: 'The Moon · 1969', ar: 'القمر · ١٩٦٩' },
    title: { en: 'The mirror that still answers', ar: 'المرآة اللي لسه بترد' },
    paras: [
      {
        en: 'When Apollo 11 landed, the two astronauts had less than three hours outside. They spent part of it unfolding a small package: a seismometer to listen for moonquakes, and a panel of mirrors called a retroreflector.',
        ar: 'لما أبولو ١١ هبطت، الرائدين كان معاهم أقل من ٣ ساعات بره المركبة. صرفوا جزء منها في فك حزمة صغيرة: سيسمومتر يسمع زلازل القمر، ولوح مرايا اسمه عاكس.'
      },
      {
        en: 'The seismometer eventually went quiet. The mirrors never did. They are passive — no batteries, no moving parts — so they still bounce laser pulses back to telescopes on Earth.',
        ar: 'السيسمومتر في الآخر سكت. لكن المرايا لأ. هي سلبية — مفيش بطاريات ولا أجزاء متحركة — فلسه بترجّع نبضات الليزر للتليسكوبات على الأرض.'
      },
      {
        en: 'Observatories fire a laser at the Moon and time the round trip. That number shows the Moon is drifting away from Earth by about 3.8 centimetres a year — roughly how fast your fingernails grow.',
        ar: 'المراصد بتضرب ليزر على القمر وتحسب وقت الرحلة ذهابًا وإيابًا. الرقم ده بيوضّح إن القمر بيبعد عن الأرض بحوالي ٣٫٨ سنتيمتر في السنة — تقريبًا نفس سرعة نمو أظافرك.'
      }
    ],
    quote: { en: 'No power. No crew. Still working.', ar: 'مفيش كهربا. مفيش طاقم. ولسه شغالة.' }
  },
  {
    artifact: 'opportunity',
    kicker: { en: 'Mars · 2004–2018', ar: 'المريخ · ٢٠٠٤–٢٠١٨' },
    title: { en: 'The last message', ar: 'آخر رسالة' },
    paras: [
      {
        en: 'Opportunity was meant to last 90 days. It lasted almost 15 years and drove 45.16 kilometres across Mars — more than a marathon.',
        ar: 'أوبورتيونيتي كان مفروض يعيش ٩٠ يوم. عاش تقريبًا ١٥ سنة ومشى ٤٥٫١٦ كيلومتر على المريخ — أكتر من ماراثون.'
      },
      {
        en: 'In June 2018 a dust storm wrapped the whole planet. Sunlight vanished, the rover’s batteries drained, and it stopped answering. Engineers sent more than a thousand commands. Nothing came back.',
        ar: 'في يونيو ٢٠١٨ عاصفة ترابية غطّت الكوكب كله. ضوء الشمس اختفى، بطارية الروفر فضيت، وبطّل يرد. المهندسين بعتوا أكتر من ألف أمر. مفيش أي رد.'
      },
      {
        en: 'Its final signal was a flat radio tone — not a sentence. The famous line “My battery is low and it’s getting dark” was written by journalist Jacob Margolis to help people feel what the data meant.',
        ar: 'آخر إشارة كانت نغمة راديو مسطّحة — مش جملة. الجملة المشهورة «بطاريتي ضعيفة والدنيا بتظلم» كتبها الصحفي جيكوب مارجوليس عشان يساعد الناس يحسّوا بالبيانات.'
      }
    ],
    quote: { en: 'It did not say goodbye. We said it for it.', ar: 'هو ما قالش وداع. إحنا قلناها عنه.' }
  },
  {
    artifact: 'ingenuity',
    kicker: { en: 'Mars · 2021–2024', ar: 'المريخ · ٢٠٢١–٢٠٢٤' },
    title: { en: 'The helicopter that flew too well', ar: 'الهليكوبتر اللي طارت أحسن من اللازم' },
    paras: [
      {
        en: 'Ingenuity was a tech demo: five flights, a few weeks, then done. It was about the size of a tissue box, with blades that had to spin roughly 2,400 times a minute in air thinner than Earth’s at 30 kilometres up.',
        ar: 'إنجينيويتي كانت تجربة تقنية: خمس رحلات، كام أسبوع، وخلاص. كانت في حجم علبة مناديل، وريشها لازم تلف حوالي ٢٤٠٠ لفة في الدقيقة في هوا أرق من هواء الأرض على ارتفاع ٣٠ كيلومتر.'
      },
      {
        en: 'It flew 72 times. It scouted ahead for Perseverance, climbed hills, and survived a winter it was never designed for. On its 72nd flight, a rotor blade was damaged on landing.',
        ar: 'طارت ٧٢ مرة. استكشفت قدام Perseverance، وطلعت تلال، وعاشت شتا ماكانش متصمم ليه. في الرحلة ٧٢، ريشة اتكسرت وقت الهبوط.'
      },
      {
        en: 'It will never fly again. But it is not junk: NASA still uses it as a stationary test to see how long its parts survive the cold and the dust.',
        ar: 'مش هتطير تاني. لكنها مش زبالة: ناسا لسه بتستخدمها كاختبار ثابت عشان تعرف أجزاءها هتعيش قد إيه في البرد والتراب.'
      }
    ],
    quote: { en: 'First flight on another world. Last landing, too.', ar: 'أول طيران على عالم تاني. وآخر هبوط كمان.' }
  },
  {
    artifact: 'apollo-lm',
    kicker: { en: 'The Moon · 1969–1972', ar: 'القمر · ١٩٦٩–١٩٧٢' },
    title: { en: 'The room left behind', ar: 'الغرفة اللي فضلت ورا' },
    paras: [
      {
        en: 'The Lunar Module had two halves. The top half — the crew cabin — flew home. The bottom half, the descent stage, stayed: a gold-wrapped octagon with four legs, empty tanks and a ladder.',
        ar: 'مركبة الهبوط القمرية كان ليها نصين. النص العلوي — كابينة الطاقم — طار راجع. النص السفلي، مرحلة الهبوط، فضل: ثمانية أضلاع ملفوفة بورق دهبي، أربع رجلين، وتانكات فاضية، وسلّم.'
      },
      {
        en: 'It was not thrown away. Leaving it saved weight, and weight was fuel, and fuel was the difference between coming home and not. The descent stage was a launch pad that could never be reused.',
        ar: 'مش اترمت. تركها وفّر وزن، والوزن كان وقود، والوقود كان الفرق بين الرجوع وعدم الرجوع. مرحلة الهبوط كانت منصة إطلاق مش ممكن تتستخدم تاني.'
      },
      {
        en: 'Six of them are still standing. From orbit you can see their long shadows. Up close you would find a launch platform with empty tanks, four legs in the dust, and a job finished.',
        ar: 'ستة منها لسه واقفين. من المدار تقدر تشوف ظلهم الطويل. من قريب هتلاقي منصة إطلاق بتانكات فاضية، وأربع رجلين في التراب، وشغل خلص.'
      }
    ],
    quote: { en: 'Not abandoned. Parked.', ar: 'مش متروكة. متركنة.' }
  }
];

/* --------------------------------------------------------------------------
   Helpers
   -------------------------------------------------------------------------- */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

const fmtCoords = (c) => {
  if (!c) return '';
  const la = Math.abs(c.lat).toFixed(2) + '°' + (c.lat >= 0 ? 'N' : 'S');
  const lo = Math.abs(c.lon).toFixed(2) + '°' + (c.lon >= 0 ? 'E' : 'W');
  return la + ', ' + lo;
};

const worldName = (w) => (w === 'moon'
  ? { en: 'Moon', ar: 'القمر' }
  : { en: 'Mars', ar: 'المريخ' });

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --------------------------------------------------------------------------
   Language
   -------------------------------------------------------------------------- */
function applyLang() {
  const html = document.documentElement;
  html.dataset.lang = state.lang;
  html.lang = state.lang;
  html.dir = state.lang === 'ar' ? 'rtl' : 'ltr';

  const toggle = byId('langToggle');
  byId('langToggleLabel').textContent = state.lang === 'ar' ? 'English' : 'العربية';
  toggle.setAttribute('aria-label', state.lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');

  byId('searchInput').placeholder = state.lang === 'ar' ? 'ابحث بالاسم…' : 'Search by name…';

  try { localStorage.setItem('anf-lang', state.lang); } catch (e) { /* ignore */ }

  renderAtlas();
  renderMap();
  renderTimeline();
  renderStories();
  renderSources();

  if (byId('artifactDialog').open) renderDialog(state.current);
}

/* --------------------------------------------------------------------------
   Atlas
   -------------------------------------------------------------------------- */
function matches(a) {
  if (state.world !== 'all' && a.world !== state.world) return false;
  const q = state.query.trim().toLowerCase();
  if (!q) return true;
  const hay = [
    a.name.en, a.name.ar, a.sub.en, a.sub.ar, a.site.en, a.site.ar,
    a.hook.en, a.hook.ar, a.type.en, a.type.ar, String(a.year)
  ].join(' ').toLowerCase();
  return hay.includes(q);
}

function cardHTML(a) {
  const w = worldName(a.world);
  const name = t(a.name);
  return `
    <article class="card reveal" data-id="${a.id}" tabindex="0" role="button"
      aria-label="${esc(name)} — ${esc(t(a.hook))}">
      <div class="card__media">
        <img src="${a.img}" alt="${esc(name)}, ${esc(t(a.site))}" loading="lazy" decoding="async">
        <span class="badge badge--${a.world}">
          <span class="badge__dot" aria-hidden="true"></span>${esc(t(w))}
        </span>
      </div>
      <div class="card__body">
        <p class="card__kicker">${a.year} · ${esc(t(a.type))}</p>
        <h3 class="card__title">${esc(name)}</h3>
        <p class="card__hook">${esc(t(a.hook))}</p>
        <span class="card__cta">
          <span>${state.lang === 'ar' ? 'اقرأ الحكاية' : 'Read its story'}</span>
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </article>`;
}

function renderAtlas() {
  const list = ARTIFACTS.filter(matches);
  byId('atlasGrid').innerHTML = list.map(cardHTML).join('');
  const count = state.lang === 'ar'
    ? `${list.length} من ${ARTIFACTS.length} قطعة`
    : `${list.length} of ${ARTIFACTS.length} artifacts`;
  byId('resultCount').textContent = count;
  byId('emptyState').hidden = list.length > 0;
  observeReveals();
  attachImageFallbacks();
}

/* --------------------------------------------------------------------------
   Reveal on scroll
   -------------------------------------------------------------------------- */
let revealObserver = null;

function observeReveals() {
  const items = document.querySelectorAll('.reveal:not(.is-in)');
  if (!items.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }

  items.forEach((el) => revealObserver.observe(el));
}

function attachImageFallbacks() {
  document.querySelectorAll('img').forEach((img) => {
    if (img.dataset.fallback) return;
    img.dataset.fallback = '1';
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const media = img.closest('.card__media, .story__img, .dlg-hero');
      if (media) media.classList.add('media--missing');
    });
  });
}

/* --------------------------------------------------------------------------
   Starfield
   -------------------------------------------------------------------------- */
function initStars() {
  const canvas = byId('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let frame = 0;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.round((window.innerWidth * window.innerHeight) / 9000);
    stars = Array.from({ length: Math.min(count, 240) }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.15 + 0.25,
      a: Math.random() * 0.55 + 0.12,
      speed: Math.random() * 0.015 + 0.004,
      phase: Math.random() * Math.PI * 2
    }));
    draw(0);
  };

  const draw = (time) => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    stars.forEach((s) => {
      const alpha = reduceMotion ? s.a : s.a * (0.62 + 0.38 * Math.sin(time * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(226, 236, 255, ${alpha.toFixed(3)})`;
      ctx.fill();
    });
    if (!reduceMotion) frame = requestAnimationFrame(draw);
  };

  window.addEventListener('resize', resize, { passive: true });
  resize();
  if (reduceMotion) cancelAnimationFrame(frame);
}

/* --------------------------------------------------------------------------
   Maps
   -------------------------------------------------------------------------- */
const M = { size: 640, c: 320, r: 288, w: 900, h: 460 };

/* Visual nudges only — keeps crowded markers apart. Not geography. */
const NUDGE = {
  surveyor: { dx: -13, dy: 9 },
  sojourner: { dx: 0, dy: 18 }
};

function projectMoon(lat, lon) {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  const x = Math.cos(la) * Math.sin(lo);
  const y = Math.sin(la);
  return { x: M.c + M.r * x, y: M.c - M.r * y };
}

function projectMars(lat, lon) {
  return {
    x: ((lon + 180) / 360) * M.w,
    y: ((90 - lat) / 180) * M.h
  };
}

function markerHTML(a, index, point) {
  const n = NUDGE[a.id] || { dx: 0, dy: 0 };
  const x = point.x + n.dx;
  const y = point.y + n.dy;
  const label = t(a.name);
  return `
    <g class="marker" data-id="${a.id}" tabindex="0" role="button"
      aria-label="${esc(label)} — ${esc(t(a.site))}">
      <title>${esc(label)}</title>
      <circle class="marker__hit" cx="${x}" cy="${y}" r="22"></circle>
      <circle class="marker__ring" cx="${x}" cy="${y}" r="9"></circle>
      <circle class="marker__dot" cx="${x}" cy="${y}" r="6.5"></circle>
      <text class="marker__num" x="${x}" y="${y - 14}" text-anchor="middle">${index + 1}</text>
    </g>`;
}

function moonSVG() {
  const items = ARTIFACTS.filter((a) => a.world === 'moon');
  const markers = items.map((a, i) => markerHTML(a, i, projectMoon(a.coords.lat, a.coords.lon))).join('');
  const label = state.lang === 'ar' ? 'خريطة توضيحية للوجه القريب من القمر' : 'Illustrative map of the Moon’s near side';

  const maria = [
    [235, 200, 72, 62], [150, 300, 74, 96], [352, 208, 50, 46],
    [402, 256, 56, 44], [476, 212, 30, 40], [438, 306, 44, 36],
    [288, 372, 46, 34], [236, 392, 35, 30], [330, 266, 26, 22]
  ].map(([cx, cy, rx, ry]) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="rgba(8, 13, 22, .55)"/>`).join('');

  const craters = [[280, 518, 9], [300, 330, 6], [388, 372, 7], [250, 300, 5], [420, 340, 4]]
    .map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,.10)" stroke-width="1.2"/>`).join('');

  return `
  <svg viewBox="0 0 640 640" role="img" aria-label="${esc(label)}">
    <defs>
      <radialGradient id="moonFill" cx="38%" cy="32%" r="78%">
        <stop offset="0%" stop-color="#2b3648"/>
        <stop offset="58%" stop-color="#18202e"/>
        <stop offset="100%" stop-color="#0a0f19"/>
      </radialGradient>
      <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
        <stop offset="70%" stop-color="rgba(142, 202, 230, .10)"/>
        <stop offset="100%" stop-color="rgba(142, 202, 230, 0)"/>
      </radialGradient>
    </defs>
    <circle cx="320" cy="320" r="312" fill="url(#moonGlow)"/>
    <circle class="moon-disk" cx="320" cy="320" r="288" fill="url(#moonFill)" stroke="rgba(255,255,255,.14)" stroke-width="1.2"/>
    <g clip-path="circle(288px at 320px 320px)">
      ${maria}
      ${craters}
    </g>
    <text class="map-label" x="320" y="616" text-anchor="middle">${state.lang === 'ar' ? 'الوجه القريب · رسم توضيحي' : 'Near side · illustrative'}</text>
    ${markers}
  </svg>`;
}

function marsSVG() {
  const items = ARTIFACTS.filter((a) => a.world === 'mars');
  const markers = items.map((a, i) => markerHTML(a, i, projectMars(a.coords.lat, a.coords.lon))).join('');
  const label = state.lang === 'ar' ? 'خريطة توضيحية لكوكب المريخ' : 'Illustrative map of Mars';

  let grid = '';
  for (let lon = -150; lon <= 150; lon += 60) {
    const x = ((lon + 180) / 360) * M.w;
    grid += `<line x1="${x}" y1="0" x2="${x}" y2="${M.h}" stroke="rgba(255,255,255,.06)" stroke-width="1"/>`;
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    const y = ((90 - lat) / 180) * M.h;
    grid += `<line x1="0" y1="${y}" x2="${M.w}" y2="${y}" stroke="rgba(255,255,255,.06)" stroke-width="1"/>`;
  }

  const vm = [[350, 243], [312, 250], [275, 258], [237, 264], [200, 267]]
    .map(([x, y], i) => (i === 0 ? 'M' : 'L') + x + ' ' + y).join(' ');

  return `
  <svg viewBox="0 0 900 460" role="img" aria-label="${esc(label)}">
    <defs>
      <linearGradient id="marsFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2c1a15"/>
        <stop offset="46%" stop-color="#3a2119"/>
        <stop offset="100%" stop-color="#1d110e"/>
      </linearGradient>
      <radialGradient id="marsGlow" cx="50%" cy="50%" r="60%">
        <stop offset="60%" stop-color="rgba(224, 121, 74, .08)"/>
        <stop offset="100%" stop-color="rgba(224, 121, 74, 0)"/>
      </radialGradient>
    </defs>
    <rect width="${M.w}" height="${M.h}" fill="url(#marsGlow)"/>
    <rect x="1" y="1" width="${M.w - 2}" height="${M.h - 2}" rx="14" fill="url(#marsFill)" stroke="rgba(255,255,255,.12)"/>
    <g clip-path="inset(2px round 12px)">
      <path d="${vm}" fill="none" stroke="rgba(120, 58, 40, .55)" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="626" cy="338" rx="52" ry="34" fill="rgba(10, 6, 5, .35)"/>
      <ellipse cx="520" cy="130" rx="60" ry="40" fill="rgba(255, 190, 140, .035)"/>
      <ellipse cx="180" cy="300" rx="70" ry="44" fill="rgba(255, 190, 140, .03)"/>
      <circle cx="116" cy="182" r="26" fill="none" stroke="rgba(255, 160, 110, .16)" stroke-width="1.5"/>
      <circle cx="116" cy="182" r="12" fill="rgba(255, 160, 110, .07)"/>
      ${grid}
    </g>
    <text class="map-label" x="20" y="30">${state.lang === 'ar' ? 'المريخ · رسم توضيحي' : 'Mars · illustrative'}</text>
    <text class="map-label" x="${M.w - 20}" y="${M.h - 16}" text-anchor="end">${state.lang === 'ar' ? 'مش بمقياس رسم' : 'Not to scale'}</text>
    ${markers}
  </svg>`;
}

function renderMap() {
  const stage = byId('mapStage');
  stage.innerHTML = state.map === 'moon' ? moonSVG() : marsSVG();

  document.querySelectorAll('.map-tab').forEach((tab) => {
    const active = tab.dataset.map === state.map;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });

  const items = ARTIFACTS.filter((a) => a.world === state.map);
  byId('mapSites').innerHTML = items.map((a, i) => `
    <li>
      <button type="button" data-id="${a.id}">
        <span class="num">${String(i + 1).padStart(2, '0')}</span>
        <span class="name">${esc(t(a.name))}</span>
        <span class="yr">${a.year}</span>
      </button>
    </li>`).join('');
}

/* --------------------------------------------------------------------------
   Timeline
   -------------------------------------------------------------------------- */
const DECADE_AR = {
  1960: '١٩٦٠–١٩٦٩',
  1970: '١٩٧٠–١٩٧٩',
  1980: '١٩٨٠–١٩٨٩',
  1990: '١٩٩٠–١٩٩٩',
  2000: '٢٠٠٠–٢٠٠٩',
  2010: '٢٠١٠–٢٠١٩',
  2020: '٢٠٢٠–٢٠٢٩'
};

function renderTimeline() {
  const sorted = ARTIFACTS
    .map((a, i) => ({ a, i }))
    .sort((x, y) => x.a.timelineYear - y.a.timelineYear || x.i - y.i);

  const groups = new Map();
  sorted.forEach(({ a }) => {
    const decade = Math.floor(a.timelineYear / 10) * 10;
    if (!groups.has(decade)) groups.set(decade, []);
    groups.get(decade).push(a);
  });

  let html = '';
  groups.forEach((items, decade) => {
    const label = state.lang === 'ar' ? (DECADE_AR[decade] || decade) : `${decade}s`;
    html += `<h3 class="tl-decade">${label}</h3>`;
    items.forEach((a) => {
      html += `
        <button class="tl-item" type="button" data-id="${a.id}">
          <span class="tl-year">${a.timelineYear}</span>
          <span class="tl-name">${esc(t(a.name))}</span>
          <span class="tl-world tl-world--${a.world}">${esc(t(worldName(a.world)))}</span>
        </button>`;
    });
  });

  byId('timelineList').innerHTML = html;
}

/* --------------------------------------------------------------------------
   Stories
   -------------------------------------------------------------------------- */
function renderStories() {
  byId('storyNav').innerHTML = STORIES.map((s, i) => `
    <button class="story-tab${i === state.story ? ' is-active' : ''}" type="button"
      role="tab" aria-selected="${i === state.story}" data-story="${i}">
      ${esc(t(s.title))}
    </button>`).join('');

  const story = STORIES[state.story] || STORIES[0];
  const a = ARTIFACTS.find((x) => x.id === story.artifact);

  byId('storyBody').innerHTML = `
    <div class="story__main">
      <p class="story__kicker">${esc(t(story.kicker))}</p>
      <h3 class="story__title">${esc(t(story.title))}</h3>
      ${story.paras.map((p) => `<p>${esc(t(p))}</p>`).join('')}
      <blockquote>${esc(t(story.quote))}</blockquote>
    </div>
    <aside class="story__aside">
      ${a ? `<div class="story__img"><img src="${a.img}" alt="${esc(t(a.name))}" loading="lazy"></div>
      <button class="story__link" type="button" data-id="${a.id}">
        <span>${state.lang === 'ar' ? 'افتح بطاقة' : 'Open the card for'}</span>
        <strong>${esc(t(a.name))}</strong>
        <span aria-hidden="true">→</span>
      </button>` : ''}
    </aside>`;
  attachImageFallbacks();
}

/* --------------------------------------------------------------------------
   Artifact dialog
   -------------------------------------------------------------------------- */
function sectionHTML(label, body) {
  return `<div class="dlg-section"><h4>${label}</h4><p>${esc(body)}</p></div>`;
}

function renderDialog(idx) {
  const a = ARTIFACTS[idx];
  if (!a) return;
  const w = worldName(a.world);
  const ar = state.lang === 'ar';

  byId('dlgContent').innerHTML = `
    <div class="dlg-hero"><img src="${a.img}" alt="${esc(t(a.name))} — ${esc(t(a.site))}"></div>
    <div class="dlg-body">
      <div class="dlg-tags">
        <span class="dlg-tag dlg-tag--${a.world}">${esc(t(w))}</span>
        <span class="dlg-tag">${esc(t(a.type))}</span>
        <span class="dlg-tag">${a.year}</span>
      </div>
      <h2 class="dlg-title" id="dlgTitle">${esc(t(a.name))}</h2>
      <p class="dlg-sub">${esc(t(a.sub))}</p>

      <dl class="dlg-meta">
        <div><dt>${ar ? 'الموقع' : 'Site'}</dt><dd>${esc(t(a.site))}</dd></div>
        <div><dt>${ar ? 'الإحداثيات' : 'Coordinates'}</dt><dd>${esc(fmtCoords(a.coords))}</dd></div>
        <div><dt>${ar ? 'النوع' : 'Type'}</dt><dd>${esc(t(a.type))}</dd></div>
        <div><dt>${ar ? 'العمر' : 'Left behind'}</dt><dd>${a.year}</dd></div>
      </dl>

      ${sectionHTML(ar ? 'إيه هي' : 'What it is', t(a.what))}
      ${sectionHTML(ar ? 'ليه اتبعتت' : 'Why it went', t(a.why))}
      ${sectionHTML(ar ? 'إيه اللي اكتشفته' : 'What it found', t(a.found))}
      ${sectionHTML(ar ? 'فين دلوقتي' : 'Where it is now', t(a.now))}

      <div class="dlg-fact">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l2.4 5.4 5.6.6-4.2 3.9 1.2 5.7L12 15.8 7 18.6l1.2-5.7L4 9l5.6-.6L12 3z"
            fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
        <p><strong>${ar ? 'حقيقة سريعة' : 'Fast fact'}</strong>${esc(t(a.fact))}</p>
      </div>

      <a class="dlg-source" href="${a.source.url}" target="_blank" rel="noopener noreferrer">
        ${esc(a.source.label)}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
            fill="none" stroke="currentColor" stroke-width="1.8"/>
        </svg>
      </a>
    </div>`;

  const dlg = byId('artifactDialog');
  const shell = dlg.querySelector('.dialog__shell');
  if (shell) shell.scrollTop = 0;
  attachImageFallbacks();
}

function openArtifact(id) {
  const idx = ARTIFACTS.findIndex((a) => a.id === id);
  if (idx < 0) return;
  state.current = idx;
  renderDialog(idx);
  const dlg = byId('artifactDialog');
  if (!dlg.open) dlg.showModal();
}

function stepArtifact(dir) {
  const next = (state.current + dir + ARTIFACTS.length) % ARTIFACTS.length;
  state.current = next;
  renderDialog(next);
}

/* --------------------------------------------------------------------------
   Sources
   -------------------------------------------------------------------------- */
const SOURCES = [
  { label: { en: 'NSSDCA — Apollo Lunar Modules', ar: 'NSSDCA — مركبات الهبوط القمرية' }, url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C' },
  { label: { en: 'NSSDCA — Lunar Roving Vehicles', ar: 'NSSDCA — العربات القمرية' }, url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C' },
  { label: { en: 'NSSDCA — ALSEP', ar: 'NSSDCA — حزم ALSEP' }, url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C' },
  { label: { en: 'NASA — Surveyor 3', ar: 'ناسا — سيرفيور ٣' }, url: 'https://science.nasa.gov/mission/surveyor-3/' },
  { label: { en: 'NASA — Mars Pathfinder & Sojourner', ar: 'ناسا — مارس باثفايندر وسوجورنر' }, url: 'https://science.nasa.gov/mission/mars-pathfinder/' },
  { label: { en: 'NASA — Spirit & Opportunity', ar: 'ناسا — سبيريت وأوبورتيونيتي' }, url: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/' },
  { label: { en: 'NASA — Viking 1 & 2', ar: 'ناسا — فايكينج ١ و٢' }, url: 'https://science.nasa.gov/mission/viking-1/' },
  { label: { en: 'NASA — Phoenix & InSight', ar: 'ناسا — فينيكس وإنسايت' }, url: 'https://science.nasa.gov/mission/insight/' },
  { label: { en: 'NASA — Ingenuity Mars Helicopter', ar: 'ناسا — هليكوبتر إنجينيويتي' }, url: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/' },
  { label: { en: 'NASA Image and Video Library', ar: 'مكتبة صور وفيديو ناسا' }, url: 'https://images.nasa.gov/' }
];

function renderSources() {
  byId('sourceList').innerHTML = SOURCES.map((s, i) => `
    <li>
      <a href="${s.url}" target="_blank" rel="noopener noreferrer">
        <span>${String(i + 1).padStart(2, '0')}</span>
        <span>${esc(t(s.label))}</span>
      </a>
    </li>`).join('');
}

/* --------------------------------------------------------------------------
   Events
   -------------------------------------------------------------------------- */
function initEvents() {
  byId('langToggle').addEventListener('click', () => {
    state.lang = state.lang === 'ar' ? 'en' : 'ar';
    applyLang();
  });

  byId('searchInput').addEventListener('input', (e) => {
    state.query = e.target.value;
    renderAtlas();
  });

  document.querySelectorAll('.chip[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.world = btn.dataset.filter;
      document.querySelectorAll('.chip[data-filter]').forEach((b) => {
        const on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      renderAtlas();
    });
  });

  byId('atlasGrid').addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) openArtifact(card.dataset.id);
  });

  byId('atlasGrid').addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.card');
    if (!card) return;
    e.preventDefault();
    openArtifact(card.dataset.id);
  });

  const stage = byId('mapStage');

  stage.addEventListener('click', (e) => {
    const marker = e.target.closest('.marker');
    if (marker) openArtifact(marker.dataset.id);
  });

  stage.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const marker = e.target.closest('.marker');
    if (!marker) return;
    e.preventDefault();
    openArtifact(marker.dataset.id);
  });

  byId('mapSites').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-id]');
    if (btn) openArtifact(btn.dataset.id);
  });

  document.querySelectorAll('.map-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      state.map = tab.dataset.map;
      renderMap();
    });
  });

  byId('timelineList').addEventListener('click', (e) => {
    const btn = e.target.closest('.tl-item');
    if (btn) openArtifact(btn.dataset.id);
  });

  byId('storyNav').addEventListener('click', (e) => {
    const btn = e.target.closest('.story-tab');
    if (!btn) return;
    state.story = Number(btn.dataset.story);
    renderStories();
  });

  byId('storyBody').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-id]');
    if (btn) openArtifact(btn.dataset.id);
  });

  const dlg = byId('artifactDialog');
  byId('dlgClose').addEventListener('click', () => dlg.close());
  byId('dlgPrev').addEventListener('click', () => stepArtifact(-1));
  byId('dlgNext').addEventListener('click', () => stepArtifact(1));
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) dlg.close();
  });
}

/* --------------------------------------------------------------------------
   Scroll spy
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const links = Array.from(document.querySelectorAll('.site-nav a'));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || !sections.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach((section) => io.observe(section));
}

/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */
function init() {
  try {
    const saved = localStorage.getItem('anf-lang');
    if (saved === 'ar' || saved === 'en') state.lang = saved;
  } catch (e) { /* storage may be unavailable on file:// in some browsers */ }

  document
    .querySelectorAll('.section__head, .about-card, .notes, .sources, .map-side')
    .forEach((el) => el.classList.add('reveal'));

  initStars();
  initEvents();
  applyLang();
  observeReveals();
  initScrollSpy();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
