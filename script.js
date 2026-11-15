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
   Maps — two real 3D globes drawn on <canvas>. No libraries, no network.
   Surfaces are procedurally generated (stylised, not NASA imagery);
   marker positions use the coordinates stored with each artifact.
   -------------------------------------------------------------------------- */
const M = { size: window.innerWidth < 600 ? 320 : 400, tw: 720, th: 360 };

/* Visual nudges in screen pixels — keeps crowded markers apart. Not geography. */
const NUDGE = { surveyor: { dx: -13, dy: 9 }, sojourner: { dx: 0, dy: 18 } };

const D2R = Math.PI / 180;
const vec = (la, lo) => [Math.cos(la * D2R) * Math.sin(lo * D2R), Math.sin(la * D2R), Math.cos(la * D2R) * Math.cos(lo * D2R)];

/* 3x3 row-major matrices: view = R · body */
const mmul = (a, b) => [
  a[0]*b[0]+a[1]*b[3]+a[2]*b[6], a[0]*b[1]+a[1]*b[4]+a[2]*b[7], a[0]*b[2]+a[1]*b[5]+a[2]*b[8],
  a[3]*b[0]+a[4]*b[3]+a[5]*b[6], a[3]*b[1]+a[4]*b[4]+a[5]*b[7], a[3]*b[2]+a[4]*b[5]+a[5]*b[8],
  a[6]*b[0]+a[7]*b[3]+a[8]*b[6], a[6]*b[1]+a[7]*b[4]+a[8]*b[7], a[6]*b[2]+a[7]*b[5]+a[8]*b[8]];
const rotX = (a) => { const c = Math.cos(a), s = Math.sin(a); return [1,0,0, 0,c,-s, 0,s,c]; };
const rotY = (a) => { const c = Math.cos(a), s = Math.sin(a); return [c,0,s, 0,1,0, -s,0,c]; };
const rotZ = (a) => { const c = Math.cos(a), s = Math.sin(a); return [c,-s,0, s,c,0, 0,0,1]; };
function orthonormal(m) {
  let x = [m[0], m[1], m[2]], y = [m[3], m[4], m[5]];
  const n = (v) => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0]/l, v[1]/l, v[2]/l]; };
  x = n(x);
  const d = x[0]*y[0] + x[1]*y[1] + x[2]*y[2];
  y = n([y[0]-d*x[0], y[1]-d*x[1], y[2]-d*x[2]]);
  return [...x, ...y, x[1]*y[2]-x[2]*y[1], x[2]*y[0]-x[0]*y[2], x[0]*y[1]-x[1]*y[0]];
}

/* --- procedural surface -------------------------------------------------- */
function hash3(x, y, z) { const h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return h - Math.floor(h); }
function vnoise(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const u = (x-xi)**2 * (3-2*(x-xi)), v = (y-yi)**2 * (3-2*(y-yi)), w = (z-zi)**2 * (3-2*(z-zi));
  const l = (a, b, t) => a + (b - a) * t;
  return l(
    l(l(hash3(xi,yi,zi), hash3(xi+1,yi,zi), u), l(hash3(xi,yi+1,zi), hash3(xi+1,yi+1,zi), u), v),
    l(l(hash3(xi,yi,zi+1), hash3(xi+1,yi,zi+1), u), l(hash3(xi,yi+1,zi+1), hash3(xi+1,yi+1,zi+1), u), v), w);
}
function fbm(x, y, z, o) { let s = 0, a = .5, f = 1; for (let i = 0; i < o; i++) { s += a * vnoise(x*f, y*f, z*f); f *= 2.03; a *= .5; } return s; }
const feat = (la, lo, r) => ({ c: vec(la, lo), r, cr: Math.cos(r * D2R) });
function amount(p, f) {
  const dt = p[0]*f.c[0] + p[1]*f.c[1] + p[2]*f.c[2];
  if (dt <= f.cr) return 0;
  const t = 1 - Math.acos(Math.min(1, dt)) / (f.r * D2R);
  return t * t * (3 - 2 * t);
}

const MARIA = [feat(32.8,-15.6,17), feat(28,17.5,10), feat(8.5,31.4,11), feat(-7.8,51.3,10), feat(17,59.1,8), feat(-21,-16.6,10), feat(-24.4,-38.6,8),
  feat(18.4,-57.4,27), feat(56,1,13), feat(-15.2,35.5,6), feat(13.3,3.6,8), feat(-10.5,-23.1,6), feat(-19.4,-92.8,7), feat(27,147,5)];
const MOON_CRATERS = [feat(-43.3,-11.4,3.5), feat(9.6,-20.1,3), feat(8.1,-38,2.6), feat(-47.5,-110,5), feat(-57,2,5)];
const VALLES = [[-9,-85],[-10,-78],[-11,-70],[-12,-62],[-10,-55],[-8,-48]].map(([la, lo]) => feat(la, lo, 4));
const MARS_DARK = [feat(8.4,69.5,13), feat(46.7,-22,16), feat(-20,145,16), feat(-35,-155,15), feat(-5,-10,9), feat(-25,-85,11), ...VALLES];
const MARS_BRIGHT = [feat(-42,70,10), feat(-50,-43,7), feat(1,-110,22), feat(18.6,-133.8,6), feat(-8,-110,10)];

function genTexture(world) {
  const { tw, th } = M, data = new Uint8ClampedArray(tw * th * 3);
  const moon = world === 'moon';
  for (let y = 0; y < th; y++) {
    const la = 90 - (y + .5) * 180 / th;
    for (let x = 0; x < tw; x++) {
      const p = vec(la, -180 + (x + .5) * 360 / tw);
      const n = fbm(p[0]*5 + 9, p[1]*5 + 9, p[2]*5 + 9, 5), i = (y * tw + x) * 3;
      let r, g, b;
      if (moon) {
        let v = .64 + (n - .5) * .30, dark = 0;
        for (const f of MARIA) dark = Math.max(dark, amount(p, f));
        v -= dark * (.30 + (n - .5) * .12);
        for (const f of MOON_CRATERS) { const a = amount(p, f); if (a > 0) v += a * .12; }
        v += (vnoise(p[0]*30, p[1]*30, p[2]*30) - .5) * .10 + (vnoise(p[0]*90, p[1]*90, p[2]*90) - .5) * .06;
        r = v * 255; g = v * 252; b = v * 246;
      } else {
        let k = .55 + (n - .5) * .9, dark = 0, bright = 0;
        for (const f of MARS_DARK) dark = Math.max(dark, amount(p, f));
        for (const f of MARS_BRIGHT) bright = Math.max(bright, amount(p, f));
        r = 196 * k + 40; g = 104 * k + 26; b = 62 * k + 18;
        r += (110 - r) * dark * .8; g += (62 - g) * dark * .8; b += (48 - b) * dark * .8;
        r += (236 - r) * bright * .35; g += (170 - g) * bright * .35; b += (130 - b) * bright * .35;
        const cap = Math.abs(la) - (82 - (n - .5) * 8);
        if (cap > 0) { const c = Math.min(1, cap / 2); r += (240 - r) * c; g += (238 - g) * c; b += (236 - b) * c; }
      }
      data[i] = r; data[i + 1] = g; data[i + 2] = b;
    }
  }
  return data;
}

/* --- the globe ----------------------------------------------------------- */
const globeReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const G = {
  built: false, world: null, R: [1,0,0, 0,1,0, 0,0,1], zoom: 1, spin: !globeReduce,
  vx: 0, vy: 0, down: false, visible: true, raf: 0, last: 0, hover: null, pts: [], tex: {}, anim: null,
  dpr: Math.min(window.devicePixelRatio || 1, 2)
};
const START = { moon: [0, 0], mars: [12, -35] };

function aim(la, lo) { return mmul(rotX(la * D2R), rotY(-lo * D2R)); }
function rotate(ty, tx, tz) { G.R = orthonormal(mmul(mmul(rotX(tx), mmul(rotY(ty), rotZ(tz || 0))), G.R)); }
function wake() { if (!G.raf && G.visible) G.raf = requestAnimationFrame(tick); }
const radiusPx = () => G.ov.getBoundingClientRect().width * .42 * G.zoom;

function paintGlobe() {
  const S = M.size, d = G.img.data, R = G.R, c = S / 2, rad = S * .42 * G.zoom;
  const td = G.tex[G.world], tw = M.tw, th = M.th, moon = G.world === 'moon';
  const rim = moon ? [120, 160, 220] : [255, 140, 90];
  for (let y = 0; y < S; y++) {
    const ny = -(y - c) / rad;
    for (let x = 0; x < S; x++) {
      const nx = (x - c) / rad, q = nx * nx + ny * ny, idx = (y * S + x) * 4;
      if (q >= 1) { d[idx + 3] = 0; continue; }
      const nz = Math.sqrt(1 - q);
      const bx = R[0]*nx + R[3]*ny + R[6]*nz, by = R[1]*nx + R[4]*ny + R[7]*nz, bz = R[2]*nx + R[5]*ny + R[8]*nz;
      let u = ((Math.atan2(bx, bz) + Math.PI) * .15915494 * tw) | 0, v = ((1.5707963 - Math.asin(by < -1 ? -1 : by > 1 ? 1 : by)) * .31830989 * th) | 0;
      if (u >= tw) u = tw - 1; if (v >= th) v = th - 1;
      const ti = (v * tw + u) * 3, lit = Math.max(0, -.45 * nx + .5 * ny + .74 * nz), sh = .3 + .85 * lit, rm = Math.pow(1 - nz, 4) * .28;
      d[idx]     = td[ti]     * sh + rim[0] * rm;
      d[idx + 1] = td[ti + 1] * sh + rim[1] * rm;
      d[idx + 2] = td[ti + 2] * sh + rim[2] * rm;
      d[idx + 3] = q > .985 ? (1 - q) / .015 * 255 : 255;
    }
  }
  G.pxc.putImageData(G.img, 0, 0);
}

function project(v) {
  const R = G.R;
  return [R[0]*v[0] + R[1]*v[1] + R[2]*v[2], R[3]*v[0] + R[4]*v[1] + R[5]*v[2], R[6]*v[0] + R[7]*v[1] + R[8]*v[2]];
}

function paintOverlay() {
  const ctx = G.ovx, W = G.ov.width, rr = W * .42 * G.zoom, c = W / 2, k = G.dpr;
  ctx.clearRect(0, 0, W, W);
  ctx.lineWidth = k; ctx.strokeStyle = 'rgba(255,255,255,.10)';
  const line = (pts) => {
    ctx.beginPath(); let on = false;
    for (const p of pts) {
      const s = project(p);
      if (s[2] > 0) { const X = c + s[0] * rr, Y = c - s[1] * rr; on ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); on = true; } else on = false;
    }
    ctx.stroke();
  };
  for (let lo = -180; lo < 180; lo += 30) { const a = []; for (let la = -90; la <= 90; la += 6) a.push(vec(la, lo)); line(a); }
  for (let la = -60; la <= 60; la += 30) { const a = []; for (let lo = -180; lo <= 180; lo += 6) a.push(vec(la, lo)); line(a); }

  const amber = getComputedStyle(document.documentElement).getPropertyValue('--amber').trim() || '#e6a95a';
  G.pts = [];
  ARTIFACTS.filter((a) => a.world === G.world).forEach((a, i) => {
    const s = project(vec(a.coords.lat, a.coords.lon));
    if (s[2] < .02) return;
    const n = NUDGE[a.id] || { dx: 0, dy: 0 };
    const X = c + s[0] * rr + n.dx * k, Y = c - s[1] * rr + n.dy * k, al = Math.min(1, s[2] / .3);
    G.pts.push({ id: a.id, X, Y, a });
    const hot = G.hover === a.id;
    ctx.globalAlpha = al;
    ctx.beginPath(); ctx.arc(X, Y, (hot ? 13 : 9) * k, 0, 7); ctx.strokeStyle = amber; ctx.lineWidth = k; ctx.stroke();
    ctx.beginPath(); ctx.arc(X, Y, (hot ? 8.5 : 6.5) * k, 0, 7); ctx.fillStyle = amber; ctx.fill();
    ctx.lineWidth = 2 * k; ctx.strokeStyle = '#070a11'; ctx.stroke();
    ctx.font = `700 ${10 * k}px ui-monospace, monospace`; ctx.textAlign = 'center';
    ctx.lineWidth = 2.5 * k; ctx.strokeText(i + 1, X, Y - 14 * k); ctx.fillStyle = amber; ctx.fillText(i + 1, X, Y - 14 * k);
    ctx.globalAlpha = 1;
    if (hot) {
      const name = t(a.name); ctx.font = `600 ${12 * k}px system-ui, sans-serif`;
      const w = ctx.measureText(name).width + 16 * k, bx = Math.min(W - w - 4, Math.max(4, X - w / 2)), by = Y + 18 * k;
      ctx.fillStyle = 'rgba(7,10,17,.92)'; ctx.beginPath(); ctx.roundRect(bx, by, w, 24 * k, 8 * k); ctx.fill();
      ctx.fillStyle = '#eef1f6'; ctx.fillText(name, bx + w / 2, by + 16 * k);
    }
  });
}

function tick(ts) {
  G.raf = 0;
  if (!G.visible) return;
  const dt = Math.min(.05, (ts - G.last) / 1000 || .016); G.last = ts;
  let busy = false;
  if (G.anim) {
    G.anim.t = Math.min(1, G.anim.t + dt / .9);
    const e = G.anim.t * G.anim.t * (3 - 2 * G.anim.t);
    G.R = orthonormal(G.anim.from.map((v, i) => v + (G.anim.to[i] - v) * e));
    if (G.anim.t >= 1) G.anim = null; else busy = true;
  } else if (!G.down) {
    if (Math.abs(G.vx) + Math.abs(G.vy) > .0004) { rotate(G.vx, G.vy); G.vx *= .94; G.vy *= .94; busy = true; }
    else if (G.spin) { rotate(.35 * dt, 0); busy = true; }
  }
  paintGlobe(); paintOverlay();
  if (busy) wake();
}

function hitTest(e) {
  const r = G.ov.getBoundingClientRect(), s = G.ov.width / r.width;
  const X = (e.clientX - r.left) * s, Y = (e.clientY - r.top) * s;
  let best = null, bd = (22 * G.dpr) ** 2;
  for (const p of G.pts) { const d = (p.X - X) ** 2 + (p.Y - Y) ** 2; if (d < bd) { bd = d; best = p; } }
  return best;
}

function setZoom(z) { G.zoom = Math.max(.7, Math.min(3, z)); wake(); }
function resetGlobe() { const s = START[G.world]; G.anim = { from: G.R.slice(), to: aim(s[0], s[1]), t: 0 }; G.zoom = 1; G.vx = G.vy = 0; wake(); }
function focusArtifact(id) {
  const a = ARTIFACTS.find((x) => x.id === id);
  if (!a || a.world !== G.world || !G.built) return;
  G.anim = { from: G.R.slice(), to: aim(a.coords.lat, a.coords.lon), t: 0 }; G.vx = G.vy = 0; wake();
}

function buildGlobe(stage) {
  stage.innerHTML = `
    <canvas class="globe__px" width="${M.size}" height="${M.size}" aria-hidden="true"></canvas>
    <canvas class="globe__ov" tabindex="0" role="application"></canvas>
    <p class="globe__hint"></p>
    <div class="globe__ui" role="group">
      <button type="button" data-g="spin" aria-pressed="${G.spin}"></button>
      <button type="button" data-g="in">+</button>
      <button type="button" data-g="out">−</button>
      <button type="button" data-g="reset"></button>
    </div>`;
  G.px = stage.querySelector('.globe__px'); G.ov = stage.querySelector('.globe__ov');
  G.pxc = G.px.getContext('2d'); G.ovx = G.ov.getContext('2d'); G.img = G.pxc.createImageData(M.size, M.size);

  const fit = () => { const w = Math.round(G.ov.getBoundingClientRect().width * G.dpr) || M.size; if (G.ov.width !== w) { G.ov.width = G.ov.height = w; } wake(); };
  new ResizeObserver(fit).observe(G.ov); fit();
  new IntersectionObserver((en) => { G.visible = en[0].isIntersecting; if (G.visible) wake(); }).observe(stage);

  const ptr = new Map(); let moved = 0, prev = null;
  const pair = () => { const [a, b] = [...ptr.values()]; return { d: Math.hypot(a.x - b.x, a.y - b.y), ang: Math.atan2(b.y - a.y, b.x - a.x) }; };
  G.ov.addEventListener('pointerdown', (e) => {
    G.ov.setPointerCapture(e.pointerId); ptr.set(e.pointerId, { x: e.clientX, y: e.clientY });
    G.down = true; G.anim = null; G.vx = G.vy = 0; moved = 0; G.ov.classList.add('is-grabbing');
    prev = ptr.size === 2 ? pair() : null;
  });
  G.ov.addEventListener('pointermove', (e) => {
    const p = ptr.get(e.pointerId);
    if (!p) { const h = hitTest(e), id = h ? h.id : null; if (id !== G.hover) { G.hover = id; G.ov.style.cursor = id ? 'pointer' : ''; wake(); paintOverlay(); } return; }
    const dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
    if (ptr.size === 1) { const r = radiusPx(); G.vx = dx / r; G.vy = dy / r; rotate(G.vx, G.vy); }
    else if (ptr.size === 2) { const n = pair(); if (prev) { setZoom(G.zoom * n.d / prev.d); rotate(0, 0, -(n.ang - prev.ang)); } prev = n; }
    wake();
  });
  const end = (e) => {
    const was = ptr.has(e.pointerId); ptr.delete(e.pointerId); prev = null;
    if (!ptr.size) { G.down = false; G.ov.classList.remove('is-grabbing'); if (globeReduce) G.vx = G.vy = 0;
      if (was && e.type === 'pointerup' && moved < 6) { const h = hitTest(e); if (h) openArtifact(h.id); } }
    wake();
  };
  G.ov.addEventListener('pointerup', end); G.ov.addEventListener('pointercancel', end);
  G.ov.addEventListener('pointerleave', () => { if (G.hover) { G.hover = null; wake(); } });
  G.ov.addEventListener('wheel', (e) => { e.preventDefault(); setZoom(G.zoom * Math.exp(-e.deltaY * .0015)); }, { passive: false });
  G.ov.addEventListener('keydown', (e) => {
    const k = e.key, s = .14;
    if (k === 'ArrowLeft') rotate(-s, 0); else if (k === 'ArrowRight') rotate(s, 0);
    else if (k === 'ArrowUp') rotate(0, -s); else if (k === 'ArrowDown') rotate(0, s);
    else if (k === 'q' || k === 'Q') rotate(0, 0, s); else if (k === 'e' || k === 'E') rotate(0, 0, -s);
    else if (k === '+' || k === '=') setZoom(G.zoom * 1.2); else if (k === '-') setZoom(G.zoom / 1.2);
    else if (k === ' ') toggleSpin(); else if (k === '0') resetGlobe(); else return;
    e.preventDefault(); wake();
  });
  stage.querySelector('.globe__ui').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.g === 'spin') toggleSpin(); else if (b.dataset.g === 'in') setZoom(G.zoom * 1.25);
    else if (b.dataset.g === 'out') setZoom(G.zoom / 1.25); else resetGlobe();
  });
  G.built = true;
}

function toggleSpin() { G.spin = !G.spin; G.ov.parentNode.querySelector('[data-g="spin"]').setAttribute('aria-pressed', String(G.spin)); wake(); }

function labelGlobe() {
  const ar = state.lang === 'ar', st = G.ov.parentNode, w = state.map === 'moon' ? (ar ? 'القمر' : 'Moon') : (ar ? 'المريخ' : 'Mars');
  G.ov.setAttribute('aria-label', ar
    ? `كرة ثلاثية الأبعاد لـ${w}. اسحب للتدوير، العجلة للتكبير، الأسهم من الكيبورد. المواقع في القايمة جنبها.`
    : `3D globe of ${w}. Drag to rotate, scroll to zoom, arrow keys from the keyboard. All sites are also in the list beside it.`);
  st.querySelector('.globe__hint').textContent = ar
    ? `${w} · اسحب في أي اتجاه · عجلة أو قرصة للزوم · رسم توضيحي`
    : `${w} · drag any direction · wheel or pinch to zoom · illustrative`;
  const L = { spin: ar ? 'لف' : 'Spin', reset: ar ? 'إعادة' : 'Reset' };
  st.querySelector('[data-g="spin"]').textContent = L.spin; st.querySelector('[data-g="reset"]').textContent = L.reset;
  st.querySelector('[data-g="in"]').setAttribute('aria-label', ar ? 'تكبير' : 'Zoom in');
  st.querySelector('[data-g="out"]').setAttribute('aria-label', ar ? 'تصغير' : 'Zoom out');
}

function renderMap() {
  const stage = byId('mapStage');
  if (!G.built) buildGlobe(stage);
  if (G.world !== state.map) {
    if (!G.tex[state.map]) G.tex[state.map] = genTexture(state.map);
    G.world = state.map; G.hover = null; G.vx = G.vy = 0; G.zoom = 1;
    const s = START[state.map]; G.R = aim(s[0], s[1]);
  }
  stage.dataset.world = state.map;
  labelGlobe(); wake();

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
/* --------------------------------------------------------------------------
   3D equipment models — simplified, procedurally built from boxes, cylinders,
   bars and spheres, drawn on <canvas> with a small painter's-algorithm
   renderer. Schematic shapes, not CAD or NASA models.
   -------------------------------------------------------------------------- */
const v3 = {
  sub: (a, b) => [a[0]-b[0], a[1]-b[1], a[2]-b[2]],
  add: (a, b) => [a[0]+b[0], a[1]+b[1], a[2]+b[2]],
  mul: (a, k) => [a[0]*k, a[1]*k, a[2]*k],
  cross: (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]],
  nrm: (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0]/l, a[1]/l, a[2]/l]; }
};

function Builder() {
  const F = [];
  const face = (vs, col, cen, ds, sp) => {
    vs = vs.filter((p, i) => !i || p[0] !== vs[i-1][0] || p[1] !== vs[i-1][1] || p[2] !== vs[i-1][2]);
    if (vs.length < 3) return;
    let n = [0, 0, 0];
    for (let i = 0; i < vs.length; i++) {
      const a = vs[i], b = vs[(i + 1) % vs.length];
      n[0] += (a[1]-b[1]) * (a[2]+b[2]); n[1] += (a[2]-b[2]) * (a[0]+b[0]); n[2] += (a[0]-b[0]) * (a[1]+b[1]);
    }
    n = v3.nrm(n);
    const fc = v3.mul(vs.reduce((s, p) => v3.add(s, p), [0, 0, 0]), 1 / vs.length);
    if (!ds && n[0]*(fc[0]-cen[0]) + n[1]*(fc[1]-cen[1]) + n[2]*(fc[2]-cen[2]) < 0) n = v3.mul(n, -1);
    F.push({ v: vs, n, c: col, ds: !!ds, sp });
  };
  const box = (c, s, col, o = {}) => {
    const h = s.map((x) => x / 2), P = [];
    for (let i = 0; i < 8; i++) P.push([c[0] + (i & 1 ? h[0] : -h[0]), c[1] + (i & 2 ? h[1] : -h[1]), c[2] + (i & 4 ? h[2] : -h[2])]);
    [[0,1,3,2], [4,5,7,6], [0,1,5,4], [2,3,7,6], [0,2,6,4], [1,3,7,5]].forEach((q) => face(q.map((i) => P[i]), col, c, 0, o.sp));
  };
  const cyl = (c, r, h, col, o = {}) => {
    const n = o.seg || 12, r2 = o.r2 === undefined ? r : o.r2, ax = o.ax || 'y';
    const m = (l) => { const p = ax === 'y' ? l : ax === 'x' ? [l[1], l[0], l[2]] : [l[0], l[2], l[1]]; return [c[0]+p[0], c[1]+p[1], c[2]+p[2]]; };
    const B = [], T = [];
    for (let i = 0; i < n; i++) { const a = i / n * 6.2832; B.push(m([r*Math.cos(a), -h/2, r*Math.sin(a)])); T.push(m([r2*Math.cos(a), h/2, r2*Math.sin(a)])); }
    for (let i = 0; i < n; i++) { const j = (i + 1) % n; face([B[i], B[j], T[j], T[i]], col, c, 0, o.sp); }
    if (r > 0) face(B, col, c, 0, o.sp);
    if (r2 > 0) face(T, col, c, 0, o.sp);
  };
  const bar = (p, q, r, col, o = {}) => {
    const d = v3.nrm(v3.sub(q, p));
    let u = v3.cross(d, [0, 1, 0]); if (Math.hypot(u[0], u[1], u[2]) < .1) u = v3.cross(d, [1, 0, 0]);
    u = v3.mul(v3.nrm(u), r); const w = v3.mul(v3.nrm(v3.cross(d, u)), r);
    const k = [[1,1], [-1,1], [-1,-1], [1,-1]];
    const A = k.map(([a, b]) => v3.add(p, v3.add(v3.mul(u, a), v3.mul(w, b))));
    const Z = k.map(([a, b]) => v3.add(q, v3.add(v3.mul(u, a), v3.mul(w, b))));
    const c = v3.mul(v3.add(p, q), .5);
    for (let i = 0; i < 4; i++) { const j = (i + 1) % 4; face([A[i], A[j], Z[j], Z[i]], col, c, 0, o.sp); }
    face(A, col, c, 0, o.sp); face(Z, col, c, 0, o.sp);
  };
  const sph = (c, r, col, o = {}) => {
    const nl = o.lat || 5, nn = o.seg || 10;
    const ring = (j) => { const a = Math.PI * j / nl, y = Math.cos(a), rr = Math.sin(a), pts = [];
      for (let i = 0; i < nn; i++) { const b = i / nn * 6.2832; pts.push([c[0] + r*rr*Math.cos(b), c[1] + r*y, c[2] + r*rr*Math.sin(b)]); } return pts; };
    let prev = ring(0);
    for (let j = 1; j <= nl; j++) { const cur = ring(j); for (let i = 0; i < nn; i++) { const k = (i + 1) % nn; face([prev[i], prev[k], cur[k], cur[i]], col, c, 0); } prev = cur; }
  };
  const quad = (vs, col) => face(vs, col, [0, 0, 0], 1);

  function done(groundCol) {
    const all = F.flatMap((f) => f.v);
    const lo = [0, 1, 2].map((i) => Math.min(...all.map((p) => p[i]))), hi = [0, 1, 2].map((i) => Math.max(...all.map((p) => p[i])));
    const cx = (lo[0] + hi[0]) / 2, cy = (lo[1] + hi[1]) / 2, cz = (lo[2] + hi[2]) / 2;
    F.forEach((f) => { f.v = f.v.map((p) => [p[0]-cx, p[1]-cy, p[2]-cz]); });
    new Set(F.map((f) => f.sp).filter(Boolean)).forEach((s) => { s.x -= cx; s.z -= cz; });
    const rad = Math.max(...F.flatMap((f) => f.v).map((p) => Math.hypot(p[0], p[1], p[2])));
    const reach = Math.max(hi[0] - lo[0], hi[2] - lo[2]) / 2 * 1.12, gy = lo[1] - cy - .03, ground = [];
    for (let i = 0; i < 32; i++) { const a = i / 32 * 6.2832; ground.push([reach * Math.cos(a), gy, reach * Math.sin(a)]); }
    return { F, rad: Math.max(rad, reach), ground, gcol: groundCol, anim: F.some((f) => f.sp) };
  }
  return { box, cyl, bar, sph, quad, done };
}

const MC = { gold: [205,165,78], silv: [196,202,210], dark: [66,70,80], gray: [140,144,152], blue: [40,72,140], dust: [112,92,84], white: [236,236,240] };
const MODELS = {};

MODELS['apollo-lm'] = (b) => {
  b.cyl([0, 0, 0], 2.1, 1.5, MC.gold, { seg: 8 });
  b.cyl([0, -1.1, 0], .9, .75, MC.dark, { r2: .35, seg: 14 });
  for (const [sx, sz] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
    b.bar([sx*1.5, -.5, sz*1.5], [sx*3.3, -1.9, sz*3.3], .07, MC.silv);
    b.bar([sx*1.5, .2, sz*1.5], [sx*2.6, -1.2, sz*2.6], .05, MC.gray);
    b.cyl([sx*3.3, -1.95, sz*3.3], .5, .1, MC.silv, { seg: 10 });
  }
  b.bar([-.25, .1, 2.1], [-.25, -1.9, 2.9], .035, MC.silv); b.bar([.25, .1, 2.1], [.25, -1.9, 2.9], .035, MC.silv);
  for (let i = 0; i < 4; i++) b.bar([-.25, -.1 - i*.5, 2.2 + i*.17], [.25, -.1 - i*.5, 2.2 + i*.17], .03, MC.silv);
};

MODELS.lrv = (b) => {
  b.box([0, 0, 0], [1.5, .18, 2.8], MC.silv);
  for (const x of [-1, 1]) for (const z of [-1, 1]) {
    b.cyl([x*1.05, -.25, z], .42, .2, MC.dark, { ax: 'x', seg: 14 });
    b.cyl([x*1.05, -.25, z], .2, .24, MC.gray, { ax: 'x', seg: 10 });
    b.bar([x*.75, -.05, z], [x*1.0, -.25, z], .05, MC.gray);
  }
  for (const x of [-.35, .35]) { b.box([x, .38, -.15], [.5, .1, .5], MC.gray); b.box([x, .7, -.42], [.5, .55, .08], MC.gray); }
  b.box([0, .4, .85], [.7, .35, .16], MC.dark);
  b.bar([0, .5, .85], [0, 1.0, 1.0], .03, MC.silv);
  b.bar([.7, .1, -1.2], [.7, 1.55, -1.2], .04, MC.silv);
  b.cyl([.7, 1.7, -1.2], .05, .3, MC.silv, { r2: .55, seg: 14 });
  b.box([-.6, .3, 1.3], [.3, .25, .35], MC.gold); b.box([0, .25, -1.2], [1.1, .35, .35], MC.gold);
};

MODELS.alsep = (b) => {
  b.box([0, 0, 0], [.9, .4, .7], MC.gold);
  b.bar([.3, .2, 0], [.3, 1.7, 0], .04, MC.silv);
  b.cyl([.3, 1.85, 0], .05, .3, MC.silv, { r2: .5, seg: 14 });
  b.cyl([2.2, .45, .2], .28, 1.1, MC.dark, { seg: 10 });
  for (const y of [.1, .35, .6, .85]) b.cyl([2.2, y, .2], .4, .04, MC.gray, { seg: 12 });
  b.bar([.45, .1, .05], [1.9, .1, .2], .03, MC.dark);
  b.sph([-1.8, .2, .6], .34, MC.gold, { lat: 4 });
  b.bar([-.45, .1, .2], [-1.5, .1, .5], .02, MC.dark);
  b.box([-1.0, -.12, -1.5], [1.0, .06, .7], MC.silv);
  b.box([1.5, -.1, 1.6], [.5, .08, .4], MC.gray);
};

MODELS.surveyor = (b) => {
  b.cyl([0, .75, 0], .55, .28, MC.silv, { seg: 3 });
  for (let k = 0; k < 3; k++) {
    const x = Math.cos(k * 2.0944), z = Math.sin(k * 2.0944);
    b.bar([x*.45, .7, z*.45], [x*1.8, -.85, z*1.8], .05, MC.silv);
    b.cyl([x*1.85, -.9, z*1.85], .32, .08, MC.gray, { seg: 10 });
  }
  b.bar([0, .9, 0], [0, 2.1, 0], .05, MC.silv);
  b.box([0, 2.2, 0], [1.2, .05, .85], MC.blue);
  b.box([0, 1.55, 0], [.2, .2, .3], MC.dark);
  b.sph([.4, 1.0, -.3], .26, MC.gold); b.sph([-.35, 1.0, .25], .22, MC.white);
  b.bar([.35, .6, .35], [1.1, .2, 1.1], .03, MC.dark); b.box([1.2, .15, 1.2], [.18, .1, .22], MC.gray);
};

MODELS.viking1 = (b) => {
  b.cyl([0, .9, 0], 1.25, .55, MC.silv, { seg: 6 });
  for (let k = 0; k < 3; k++) {
    const a = 1.5708 + k * 2.0944, x = Math.cos(a), z = Math.sin(a);
    b.bar([x*1.0, .75, z*1.0], [x*2.4, -.3, z*2.4], .07, MC.gray);
    b.cyl([x*2.4, -.38, z*2.4], .35, .08, MC.silv, { seg: 10 });
  }
  b.box([-.75, 1.35, -.75], [.55, .4, .7], MC.dark); b.box([.75, 1.35, -.75], [.55, .4, .7], MC.dark);
  b.bar([.6, 1.15, .5], [.6, 2.0, .5], .04, MC.silv); b.box([.6, 2.1, .5], [.32, .18, .18], MC.gray);
  b.bar([-.4, 1.15, .3], [-.4, 1.9, .3], .04, MC.silv); b.cyl([-.4, 2.0, .3], .05, .15, MC.silv, { r2: .45, seg: 14 });
  b.bar([-1.1, 1.0, .5], [-2.4, .9, 1.4], .03, MC.gold); b.box([-2.5, .8, 1.5], [.2, .12, .25], MC.gray);
  b.box([.9, 1.25, .6], [.4, .3, .5], MC.gold);
};
MODELS.viking2 = MODELS.viking1;

MODELS.pathfinder = (b) => {
  const R = 1.2, V = [0, 1, 2].map((k) => [R * Math.cos(k * 2.0944), 0, R * Math.sin(k * 2.0944)]);
  const at = (p, t) => [p[0] * (1 + t), -.7 * t + .02, p[2] * (1 + t)];
  b.cyl([0, -.05, 0], R, .1, MC.gold, { seg: 3 });
  for (let k = 0; k < 3; k++) {
    const p = V[k], q = V[(k + 1) % 3];
    b.quad([p, q, at(q, 1), at(p, 1)], MC.gold);
    b.quad([at(p, .15), at(q, .15), at(q, .88), at(p, .88)], MC.blue);
  }
  b.bar([0, .05, 0], [0, 1.2, 0], .04, MC.silv); b.box([0, 1.3, 0], [.45, .16, .16], MC.dark);
  b.bar([.3, .1, .3], [.3, .8, .3], .03, MC.silv); b.cyl([.3, .9, .3], .05, .1, MC.silv, { r2: .3, seg: 10 });
};

MODELS.sojourner = (b) => {
  b.box([0, .2, 0], [.48, .2, .65], MC.gold); b.box([0, .33, 0], [.5, .03, .67], MC.blue);
  for (const x of [-1, 1]) for (const z of [-.25, 0, .25]) {
    b.cyl([x*.3, 0, z], .13, .09, MC.dark, { ax: 'x', seg: 12 });
    b.bar([x*.3, 0, z], [x*.24, .17, z*.4], .02, MC.silv);
  }
  b.bar([.2, .35, -.22], [.2, .75, -.22], .012, MC.silv); b.box([0, .08, -.4], [.12, .09, .1], MC.dark);
};

const merRover = (b, panel) => {
  b.box([0, .55, 0], [1.3, .42, 1.6], MC.gold); b.box([0, .82, 0], [1.7, .05, 1.5], panel);
  for (const x of [-1, 1]) for (const z of [-.8, 0, .8]) {
    b.cyl([x*1.0, .26, z], .26, .2, MC.dark, { ax: 'x', seg: 14 });
    b.bar([x*1.0, .26, z], [x*.8, .55, z*.5], .05, MC.silv);
  }
  b.bar([0, .85, .5], [0, 1.65, .5], .04, MC.silv); b.box([0, 1.75, .5], [.38, .14, .14], MC.dark);
  b.bar([-.5, .85, -.5], [-.5, 1.15, -.5], .03, MC.silv); b.cyl([-.5, 1.25, -.5], .05, .16, MC.silv, { r2: .3, seg: 12 });
  b.bar([.5, .85, -.55], [.5, 1.4, -.55], .025, MC.silv);
  b.bar([0, .5, .8], [.15, .35, 1.35], .05, MC.gray); b.cyl([.15, .3, 1.45], .16, .2, MC.dark, { ax: 'z', seg: 8 });
};
MODELS.spirit = (b) => merRover(b, MC.blue);
MODELS.opportunity = (b) => merRover(b, MC.dust);

MODELS.phoenix = (b) => {
  b.cyl([0, 1.0, 0], 1.1, .14, MC.silv, { seg: 10 });
  b.cyl([-2.1, 1.1, 0], .95, .04, MC.blue, { seg: 24 }); b.cyl([2.1, 1.1, 0], .95, .04, MC.blue, { seg: 24 });
  b.bar([-1.1, 1.05, 0], [-1.2, 1.1, 0], .04, MC.silv); b.bar([1.1, 1.05, 0], [1.2, 1.1, 0], .04, MC.silv);
  for (let k = 0; k < 3; k++) {
    const a = 1.5708 + k * 2.0944, x = Math.cos(a), z = Math.sin(a);
    b.bar([x*.9, .95, z*.9], [x*1.8, -.1, z*1.8], .06, MC.gray); b.cyl([x*1.8, -.14, z*1.8], .3, .06, MC.silv, { seg: 10 });
  }
  b.bar([-.5, 1.15, .6], [-1.0, 1.8, 1.3], .05, MC.gray); b.bar([-1.0, 1.8, 1.3], [-1.6, .6, 2.0], .05, MC.gray);
  b.box([-1.7, .45, 2.1], [.22, .15, .28], MC.silv);
  b.bar([.6, 1.1, -.5], [.6, 2.2, -.5], .03, MC.silv); b.box([.6, 2.3, -.5], [.35, .16, .16], MC.dark);
  b.box([.3, 1.2, .4], [.4, .28, .4], MC.gold); b.box([-.1, 1.2, -.2], [.35, .25, .35], MC.gray);
};

MODELS.insight = (b) => {
  b.cyl([0, .9, 0], 1.0, .16, MC.silv, { seg: 8 });
  b.cyl([-2.2, 1.05, 0], 1.05, .03, MC.blue, { seg: 24 }); b.cyl([2.2, 1.05, 0], 1.05, .03, MC.blue, { seg: 24 });
  b.bar([-1.0, .95, 0], [-1.15, 1.02, 0], .04, MC.silv); b.bar([1.0, .95, 0], [1.15, 1.02, 0], .04, MC.silv);
  for (let k = 0; k < 3; k++) {
    const a = 1.5708 + k * 2.0944, x = Math.cos(a), z = Math.sin(a);
    b.bar([x*.8, .8, z*.8], [x*1.7, -.1, z*1.7], .06, MC.gray); b.cyl([x*1.7, -.14, z*1.7], .3, .06, MC.silv, { seg: 10 });
  }
  b.bar([.5, 1.05, .4], [.9, 1.6, 1.1], .04, MC.gray); b.bar([.9, 1.6, 1.1], [1.2, .5, 1.6], .04, MC.gray);
  b.cyl([-.3, .2, 2.0], .8, .4, MC.gold, { r2: .6, seg: 16 }); b.sph([-.3, .42, 2.0], .38, MC.silv, { lat: 4 });
  b.cyl([1.3, .2, 1.8], .3, .4, MC.dark, { seg: 8 });
  b.bar([0, 1.0, -.6], [0, 1.8, -.6], .03, MC.silv); b.cyl([0, 1.9, -.6], .05, .1, MC.silv, { r2: .3, seg: 10 });
};

MODELS.ingenuity = (b) => {
  const r1 = { x: 0, z: 0, w: 14 }, r2 = { x: 0, z: 0, w: -14 };
  b.box([0, .55, 0], [.2, .3, .2], MC.gold); b.bar([0, .7, 0], [0, .98, 0], .025, MC.dark);
  b.box([0, 1.05, 0], [.55, .025, .4], MC.blue);
  b.box([0, .8, 0], [1.2, .012, .07], MC.dark, { sp: r1 }); b.box([0, .9, 0], [1.2, .012, .07], MC.silv, { sp: r2 });
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.bar([sx*.1, .42, sz*.1], [sx*.5, -.1, sz*.5], .018, MC.dark);
  b.box([0, .4, .12], [.08, .08, .06], MC.dark);
};

const MODEL_WORLD = { moon: [96, 100, 108], mars: [122, 68, 48] };
const MV = { raf: 0, ro: null, io: null, S: null };

function unmountModel() {
  if (MV.raf) cancelAnimationFrame(MV.raf);
  if (MV.ro) MV.ro.disconnect();
  if (MV.io) MV.io.disconnect();
  MV.raf = 0; MV.ro = MV.io = MV.S = null;
}

function modelHTML(ar) {
  return `<div class="dlg-model">
    <h4>${ar ? 'مجسم ثلاثي الأبعاد' : '3D model'}</h4>
    <div class="model-stage">
      <canvas id="modelCanvas" tabindex="0" role="application"
        aria-label="${ar ? 'مجسم ثلاثي الأبعاد مبسّط. اسحب للتدوير، الأسهم من الكيبورد.' : 'Simplified 3D model. Drag to rotate, arrow keys from the keyboard.'}"></canvas>
      <div class="model-ui" role="group">
        <button type="button" data-m="spin" aria-pressed="true">${ar ? 'لف' : 'Spin'}</button>
        <button type="button" data-m="in" aria-label="${ar ? 'تكبير' : 'Zoom in'}">+</button>
        <button type="button" data-m="out" aria-label="${ar ? 'تصغير' : 'Zoom out'}">−</button>
        <button type="button" data-m="reset">${ar ? 'إعادة' : 'Reset'}</button>
      </div>
    </div>
    <p class="model-note">${ar ? 'اسحب في أي اتجاه · اضغط على المجسم ثم استخدم العجلة للزوم، أو اقرص بإصبعين · شكل مبسّط توضيحي، مش نموذج هندسي رسمي.'
      : 'Drag any direction · click the model, then use the wheel to zoom, or pinch · a simplified illustration, not an official engineering model.'}</p>
  </div>`;
}

function mountModel(a) {
  unmountModel();
  const cv = byId('modelCanvas');
  if (!cv || !MODELS[a.id]) { const m = document.querySelector('.dlg-model'); if (m) m.remove(); return; }
  const b = Builder(); MODELS[a.id](b);
  const mdl = b.done(MODEL_WORLD[a.world]);
  const home = () => orthonormal(mmul(rotX(.5), rotY(-.7)));
  const S = { R: home(), zoom: 1, spin: !globeReduce, down: false, vx: 0, vy: 0, vis: true, last: 0, t: 0, dpr: Math.min(window.devicePixelRatio || 1, 2) };
  MV.S = S;
  const ctx = cv.getContext('2d');
  const L = v3.nrm([-.4, .6, .7]);

  const wake = () => { if (!MV.raf && S.vis) MV.raf = requestAnimationFrame(tick); };
  const fit = () => { const r = cv.getBoundingClientRect(); cv.width = Math.round(r.width * S.dpr) || 300; cv.height = Math.round(r.height * S.dpr) || 300; wake(); };

  function draw() {
    const W = cv.width, H = cv.height, R = S.R, sc = Math.min(W, H) * .52 * S.zoom / mdl.rad;
    ctx.clearRect(0, 0, W, H);
    const tr = (p, sp) => {
      let x = p[0], y = p[1], z = p[2];
      if (sp) { const g = sp.w * S.t, c = Math.cos(g), s = Math.sin(g), dx = x - sp.x, dz = z - sp.z; x = sp.x + dx*c + dz*s; z = sp.z - dx*s + dz*c; }
      return [R[0]*x + R[1]*y + R[2]*z, R[3]*x + R[4]*y + R[5]*z, R[6]*x + R[7]*y + R[8]*z];
    };
    const px = (q) => [W/2 + q[0] * sc, H/2 - q[1] * sc];
    const poly = (pts, fill, stroke) => {
      ctx.beginPath(); pts.forEach((q, i) => { const [X, Y] = px(q); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.closePath();
      ctx.fillStyle = fill; ctx.fill(); if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = S.dpr * .7; ctx.stroke(); }
    };
    const g = mdl.gcol, above = R[7] > 0;
    const drawGround = () => poly(mdl.ground.map((p) => tr(p)), `rgba(${g[0]},${g[1]},${g[2]},.55)`, 'rgba(255,255,255,.12)');
    if (above) drawGround();
    const list = [];
    for (const f of mdl.F) {
      let n = f.n;
      if (f.sp) { const gg = f.sp.w * S.t, c = Math.cos(gg), s = Math.sin(gg); n = [n[0]*c + n[2]*s, n[1], -n[0]*s + n[2]*c]; }
      const nz = R[6]*n[0] + R[7]*n[1] + R[8]*n[2];
      if (!f.ds && nz <= 0) continue;
      const q = f.v.map((p) => tr(p, f.sp));
      list.push({ f, q, z: q.reduce((s, p) => s + p[2], 0) / q.length, n: [R[0]*n[0] + R[1]*n[1] + R[2]*n[2], R[3]*n[0] + R[4]*n[1] + R[5]*n[2], nz] });
    }
    list.sort((a, b2) => a.z - b2.z);
    for (const it of list) {
      const d = it.n[0]*L[0] + it.n[1]*L[1] + it.n[2]*L[2], sh = .3 + .7 * (it.f.ds ? Math.abs(d) : Math.max(0, d)), c = it.f.c;
      poly(it.q, `rgb(${c[0]*sh|0},${c[1]*sh|0},${c[2]*sh|0})`, 'rgba(0,0,0,.28)');
    }
    if (!above) drawGround();
  }

  function tick(ts) {
    MV.raf = 0; if (!S.vis) return;
    const dt = Math.min(.05, (ts - S.last) / 1000 || .016); S.last = ts; S.t += dt;
    let busy = mdl.anim;
    if (!S.down) {
      if (Math.abs(S.vx) + Math.abs(S.vy) > .0004) { S.R = orthonormal(mmul(mmul(rotX(S.vy), rotY(S.vx)), S.R)); S.vx *= .94; S.vy *= .94; busy = true; }
      else if (S.spin) { S.R = orthonormal(mmul(rotY(.5 * dt), S.R)); busy = true; }
    }
    draw(); if (busy) wake();
  }
  const rot = (ty, tx, tz) => { S.R = orthonormal(mmul(mmul(rotX(tx), mmul(rotY(ty), rotZ(tz || 0))), S.R)); wake(); };
  const zoom = (z) => { S.zoom = Math.max(.6, Math.min(3.2, z)); wake(); };
  const setSpin = () => { S.spin = !S.spin; cv.parentNode.querySelector('[data-m="spin"]').setAttribute('aria-pressed', String(S.spin)); wake(); };

  const ptr = new Map(); let moved = 0, prev = null;
  const pair = () => { const [p, q] = [...ptr.values()]; return { d: Math.hypot(p.x - q.x, p.y - q.y), ang: Math.atan2(q.y - p.y, q.x - p.x) }; };
  cv.addEventListener('pointerdown', (e) => { cv.setPointerCapture(e.pointerId); cv.focus({ preventScroll: true }); ptr.set(e.pointerId, { x: e.clientX, y: e.clientY }); S.down = true; S.vx = S.vy = 0; moved = 0; prev = ptr.size === 2 ? pair() : null; });
  cv.addEventListener('pointermove', (e) => {
    const p = ptr.get(e.pointerId); if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y, r = cv.getBoundingClientRect().width * .4 * S.zoom; p.x = e.clientX; p.y = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
    if (ptr.size === 1) { S.vx = dx / r; S.vy = dy / r; rot(S.vx, S.vy); }
    else if (ptr.size === 2) { const n = pair(); if (prev) { zoom(S.zoom * n.d / prev.d); rot(0, 0, -(n.ang - prev.ang)); } prev = n; }
  });
  const end = (e) => { ptr.delete(e.pointerId); prev = null; if (!ptr.size) { S.down = false; if (globeReduce) S.vx = S.vy = 0; } wake(); };
  cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
  cv.addEventListener('wheel', (e) => { if (document.activeElement !== cv) return; e.preventDefault(); zoom(S.zoom * Math.exp(-e.deltaY * .0015)); }, { passive: false });
  cv.addEventListener('keydown', (e) => {
    const k = e.key, s = .14;
    if (k === 'ArrowLeft') rot(-s, 0); else if (k === 'ArrowRight') rot(s, 0); else if (k === 'ArrowUp') rot(0, -s); else if (k === 'ArrowDown') rot(0, s);
    else if (k === 'q' || k === 'Q') rot(0, 0, s); else if (k === 'e' || k === 'E') rot(0, 0, -s);
    else if (k === '+' || k === '=') zoom(S.zoom * 1.2); else if (k === '-') zoom(S.zoom / 1.2);
    else if (k === ' ') setSpin(); else if (k === '0') { S.R = home(); S.zoom = 1; wake(); } else return;
    e.preventDefault();
  });
  cv.parentNode.querySelector('.model-ui').addEventListener('click', (e) => {
    const bt = e.target.closest('button'); if (!bt) return;
    const m = bt.dataset.m;
    if (m === 'spin') setSpin(); else if (m === 'in') zoom(S.zoom * 1.25); else if (m === 'out') zoom(S.zoom / 1.25); else { S.R = home(); S.zoom = 1; S.vx = S.vy = 0; wake(); }
  });
  MV.ro = new ResizeObserver(fit); MV.ro.observe(cv);
  MV.io = new IntersectionObserver((en) => { S.vis = en[0].isIntersecting; if (S.vis) wake(); }); MV.io.observe(cv);
  fit();
  if (!byId('artifactDialog').dataset.mvBound) { byId('artifactDialog').dataset.mvBound = '1'; byId('artifactDialog').addEventListener('close', unmountModel); }
}

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

      ${modelHTML(ar)}

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
  mountModel(a);
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

  byId('mapSites').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-id]');
    if (btn) { focusArtifact(btn.dataset.id); openArtifact(btn.dataset.id); }
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
