//

// 2022-03時点
const _scripts = {
  ADLM: "Adlm", // Adlam // Adlam
  AFAK: "Afak", // Afaka // 
  AGHB: "Aghb", // Caucasian Albanian // Caucasian_Albanian
  AHOM: "Ahom", // Ahom, Tai Ahom // Ahom
  ARAB: "Arab", // Arabic // Arabic
  ARAN: "Aran", // Arabic (Nastaliq variant) // 
  ARMI: "Armi", // Imperial Aramaic // Imperial_Aramaic
  ARMN: "Armn", // Armenian // Armenian
  AVST: "Avst", // Avestan // Avestan
  BALI: "Bali", // Balinese // Balinese
  BAMU: "Bamu", // Bamum // Bamum
  BASS: "Bass", // Bassa Vah // Bassa_Vah
  BATK: "Batk", // Batak // Batak
  BENG: "Beng", // Bengali (Bangla) // Bengali
  BHKS: "Bhks", // Bhaiksuki // Bhaiksuki
  BLIS: "Blis", // Blissymbols // 
  BOPO: "Bopo", // Bopomofo // Bopomofo
  BRAH: "Brah", // Brahmi // Brahmi
  BRAI: "Brai", // Braille // Braille
  BUGI: "Bugi", // Buginese // Buginese
  BUHD: "Buhd", // Buhid // Buhid
  CAKM: "Cakm", // Chakma // Chakma
  CANS: "Cans", // Unified Canadian Aboriginal Syllabics // Canadian_Aboriginal
  CARI: "Cari", // Carian // Carian
  CHAM: "Cham", // Cham // Cham
  CHER: "Cher", // Cherokee // Cherokee
  CHRS: "Chrs", // Chorasmian // Chorasmian
  CIRT: "Cirt", // Cirth // 
  COPT: "Copt", // Coptic // Coptic
  CPMN: "Cpmn", // Cypro-Minoan // Cypro_Minoan
  CPRT: "Cprt", // Cypriot syllabary // Cypriot
  CYRL: "Cyrl", // Cyrillic // Cyrillic
  CYRS: "Cyrs", // Cyrillic (Old Church Slavonic variant) // 
  DEVA: "Deva", // Devanagari (Nagari) // Devanagari
  DIAK: "Diak", // Dives Akuru // Dives_Akuru
  DOGR: "Dogr", // Dogra // Dogra
  DSRT: "Dsrt", // Deseret (Mormon) // Deseret
  DUPL: "Dupl", // Duployan shorthand, Duployan stenography // Duployan
  EGYD: "Egyd", // Egyptian demotic // 
  EGYH: "Egyh", // Egyptian hieratic // 
  EGYP: "Egyp", // Egyptian hieroglyphs // Egyptian_Hieroglyphs
  ELBA: "Elba", // Elbasan // Elbasan
  ELYM: "Elym", // Elymaic // Elymaic
  ETHI: "Ethi", // Ethiopic (Geʻez) // Ethiopic
  GEOK: "Geok", // Khutsuri (Asomtavruli and Nuskhuri) // Georgian
  GEOR: "Geor", // Georgian (Mkhedruli and Mtavruli) // Georgian
  GLAG: "Glag", // Glagolitic // Glagolitic
  GONG: "Gong", // Gunjala Gondi // Gunjala_Gondi
  GONM: "Gonm", // Masaram Gondi // Masaram_Gondi
  GOTH: "Goth", // Gothic // Gothic
  GRAN: "Gran", // Grantha // Grantha
  GREK: "Grek", // Greek // Greek
  GUJR: "Gujr", // Gujarati // Gujarati
  GURU: "Guru", // Gurmukhi // Gurmukhi
  HANB: "Hanb", // Han with Bopomofo (alias for Han + Bopomofo) // 
  HANG: "Hang", // Hangul (Hangŭl, Hangeul) // Hangul
  HANI: "Hani", // Han (Hanzi, Kanji, Hanja) // Han
  HANO: "Hano", // Hanunoo (Hanunóo) // Hanunoo
  HANS: "Hans", // Han (Simplified variant) // 
  HANT: "Hant", // Han (Traditional variant) // 
  HATR: "Hatr", // Hatran // Hatran
  HEBR: "Hebr", // Hebrew // Hebrew
  HIRA: "Hira", // Hiragana // Hiragana
  HLUW: "Hluw", // Anatolian Hieroglyphs (Luwian Hieroglyphs, Hittite Hieroglyphs) // Anatolian_Hieroglyphs
  HMNG: "Hmng", // Pahawh Hmong // Pahawh_Hmong
  HMNP: "Hmnp", // Nyiakeng Puachue Hmong // Nyiakeng_Puachue_Hmong
  HRKT: "Hrkt", // Japanese syllabaries (alias for Hiragana + Katakana) // Katakana_Or_Hiragana
  HUNG: "Hung", // Old Hungarian (Hungarian Runic) // Old_Hungarian
  INDS: "Inds", // Indus (Harappan) // 
  ITAL: "Ital", // Old Italic (Etruscan, Oscan, etc.) // Old_Italic
  JAMO: "Jamo", // Jamo (alias for Jamo subset of Hangul) // 
  JAVA: "Java", // Javanese // Javanese
  JPAN: "Jpan", // Japanese (alias for Han + Hiragana + Katakana) // 
  JURC: "Jurc", // Jurchen // 
  KALI: "Kali", // Kayah Li // Kayah_Li
  KANA: "Kana", // Katakana // Katakana
  KAWI: "Kawi", // Kawi // 
  KHAR: "Khar", // Kharoshthi // Kharoshthi
  KHMR: "Khmr", // Khmer // Khmer
  KHOJ: "Khoj", // Khojki // Khojki
  KITL: "Kitl", // Khitan large script // 
  KITS: "Kits", // Khitan small script // Khitan_Small_Script
  KNDA: "Knda", // Kannada // Kannada
  KORE: "Kore", // Korean (alias for Hangul + Han) // 
  KPEL: "Kpel", // Kpelle // 
  KTHI: "Kthi", // Kaithi // Kaithi
  LANA: "Lana", // Tai Tham (Lanna) // Tai_Tham
  LAOO: "Laoo", // Lao // Lao
  LATF: "Latf", // Latin (Fraktur variant) // 
  LATG: "Latg", // Latin (Gaelic variant) // 
  LATN: "Latn", // Latin // Latin
  LEKE: "Leke", // Leke // 
  LEPC: "Lepc", // Lepcha (Róng) // Lepcha
  LIMB: "Limb", // Limbu // Limbu
  LINA: "Lina", // Linear A // Linear_A
  LINB: "Linb", // Linear B // Linear_B
  LISU: "Lisu", // Lisu (Fraser) // Lisu
  LOMA: "Loma", // Loma // 
  LYCI: "Lyci", // Lycian // Lycian
  LYDI: "Lydi", // Lydian // Lydian
  MAHJ: "Mahj", // Mahajani // Mahajani
  MAKA: "Maka", // Makasar // Makasar
  MAND: "Mand", // Mandaic, Mandaean // Mandaic
  MANI: "Mani", // Manichaean // Manichaean
  MARC: "Marc", // Marchen // Marchen
  MAYA: "Maya", // Mayan hieroglyphs // 
  MEDF: "Medf", // Medefaidrin (Oberi Okaime, Oberi Ɔkaimɛ) // Medefaidrin
  MEND: "Mend", // Mende Kikakui // Mende_Kikakui
  MERC: "Merc", // Meroitic Cursive // Meroitic_Cursive
  MERO: "Mero", // Meroitic Hieroglyphs // Meroitic_Hieroglyphs
  MLYM: "Mlym", // Malayalam // Malayalam
  MODI: "Modi", // Modi, Moḍī // Modi
  MONG: "Mong", // Mongolian // Mongolian
  MOON: "Moon", // Moon (Moon code, Moon script, Moon type) // 
  MROO: "Mroo", // Mro, Mru // Mro
  MTEI: "Mtei", // Meitei Mayek (Meithei, Meetei) // Meetei_Mayek
  MULT: "Mult", // Multani // Multani
  MYMR: "Mymr", // Myanmar (Burmese) // Myanmar
  NAGM: "Nagm", // Nag Mundari // 
  NAND: "Nand", // Nandinagari // Nandinagari
  NARB: "Narb", // Old North Arabian (Ancient North Arabian) // Old_North_Arabian
  NBAT: "Nbat", // Nabataean // Nabataean
  NEWA: "Newa", // Newa, Newar, Newari, Nepāla lipi // Newa
  NKDB: "Nkdb", // Naxi Dongba (na²¹ɕi³³ to³³ba²¹, Nakhi Tomba) // 
  NKGB: "Nkgb", // Naxi Geba (na²¹ɕi³³ gʌ²¹ba²¹, 'Na-'Khi ²Ggŏ-¹baw, Nakhi Geba) // 
  NKOO: "Nkoo", // N’Ko // Nko
  NSHU: "Nshu", // Nüshu // Nushu
  OGAM: "Ogam", // Ogham // Ogham
  OLCK: "Olck", // Ol Chiki (Ol Cemet’, Ol, Santali) // Ol_Chiki
  ORKH: "Orkh", // Old Turkic, Orkhon Runic // Old_Turkic
  ORYA: "Orya", // Oriya (Odia) // Oriya
  OSGE: "Osge", // Osage // Osage
  OSMA: "Osma", // Osmanya // Osmanya
  OUGR: "Ougr", // Old Uyghur // Old_Uyghur
  PALM: "Palm", // Palmyrene // Palmyrene
  PAUC: "Pauc", // Pau Cin Hau // Pau_Cin_Hau
  PCUN: "Pcun", // Proto-Cuneiform // 
  PELM: "Pelm", // Proto-Elamite // 
  PERM: "Perm", // Old Permic // Old_Permic
  PHAG: "Phag", // Phags-pa // Phags_Pa
  PHLI: "Phli", // Inscriptional Pahlavi // Inscriptional_Pahlavi
  PHLP: "Phlp", // Psalter Pahlavi // Psalter_Pahlavi
  PHLV: "Phlv", // Book Pahlavi // 
  PHNX: "Phnx", // Phoenician // Phoenician
  PLRD: "Plrd", // Miao (Pollard) // Miao
  PIQD: "Piqd", // Klingon (KLI pIqaD) // 
  PRTI: "Prti", // Inscriptional Parthian // Inscriptional_Parthian
  PSIN: "Psin", // Proto-Sinaitic // 
  QAAA: "Qaaa", // Reserved for private use (start) // 
  QAAB: "Qaab", //  // 
  QAAC: "Qaac", //  // 
  QAAD: "Qaad", //  // 
  QAAE: "Qaae", //  // 
  QAAF: "Qaaf", //  // 
  QAAG: "Qaag", //  // 
  QAAH: "Qaah", //  // 
  QAAI: "Qaai", //  // 
  QAAJ: "Qaaj", //  // 
  QAAK: "Qaak", //  // 
  QAAL: "Qaal", //  // 
  QAAM: "Qaam", //  // 
  QAAN: "Qaan", //  // 
  QAAO: "Qaao", //  // 
  QAAP: "Qaap", //  // 
  QAAQ: "Qaaq", //  // 
  QAAR: "Qaar", //  // 
  QAAS: "Qaas", //  // 
  QAAT: "Qaat", //  // 
  QAAU: "Qaau", //  // 
  QAAV: "Qaav", //  // 
  QAAW: "Qaaw", //  // 
  QAAX: "Qaax", //  // 
  QAAY: "Qaay", //  // 
  QAAZ: "Qaaz", //  // 
  QABA: "Qaba", //  // 
  QABB: "Qabb", //  // 
  QABC: "Qabc", //  // 
  QABD: "Qabd", //  // 
  QABE: "Qabe", //  // 
  QABF: "Qabf", //  // 
  QABG: "Qabg", //  // 
  QABH: "Qabh", //  // 
  QABI: "Qabi", //  // 
  QABJ: "Qabj", //  // 
  QABK: "Qabk", //  // 
  QABL: "Qabl", //  // 
  QABM: "Qabm", //  // 
  QABN: "Qabn", //  // 
  QABO: "Qabo", //  // 
  QABP: "Qabp", //  // 
  QABQ: "Qabq", //  // 
  QABR: "Qabr", //  // 
  QABS: "Qabs", //  // 
  QABT: "Qabt", //  // 
  QABU: "Qabu", //  // 
  QABV: "Qabv", //  // 
  QABW: "Qabw", //  // 
  QABX: "Qabx", // Reserved for private use (end) // 
  RANJ: "Ranj", // Ranjana // 
  RJNG: "Rjng", // Rejang (Redjang, Kaganga) // Rejang
  ROHG: "Rohg", // Hanifi Rohingya // Hanifi_Rohingya
  RORO: "Roro", // Rongorongo // 
  RUNR: "Runr", // Runic // Runic
  SAMR: "Samr", // Samaritan // Samaritan
  SARA: "Sara", // Sarati // 
  SARB: "Sarb", // Old South Arabian // Old_South_Arabian
  SAUR: "Saur", // Saurashtra // Saurashtra
  SGNW: "Sgnw", // SignWriting // SignWriting
  SHAW: "Shaw", // Shavian (Shaw) // Shavian
  SHRD: "Shrd", // Sharada, Śāradā // Sharada
  SHUI: "Shui", // Shuishu // 
  SIDD: "Sidd", // Siddham, Siddhaṃ, Siddhamātṛkā // Siddham
  SIND: "Sind", // Khudawadi, Sindhi // Khudawadi
  SINH: "Sinh", // Sinhala // Sinhala
  SOGD: "Sogd", // Sogdian // Sogdian
  SOGO: "Sogo", // Old Sogdian // Old_Sogdian
  SORA: "Sora", // Sora Sompeng // Sora_Sompeng
  SOYO: "Soyo", // Soyombo // Soyombo
  SUND: "Sund", // Sundanese // Sundanese
  SUNU: "Sunu", // Sunuwar // 
  SYLO: "Sylo", // Syloti Nagri // Syloti_Nagri
  SYRC: "Syrc", // Syriac // Syriac
  SYRE: "Syre", // Syriac (Estrangelo variant) // 
  SYRJ: "Syrj", // Syriac (Western variant) // 
  SYRN: "Syrn", // Syriac (Eastern variant) // 
  TAGB: "Tagb", // Tagbanwa // Tagbanwa
  TAKR: "Takr", // Takri, Ṭākrī, Ṭāṅkrī // Takri
  TALE: "Tale", // Tai Le // Tai_Le
  TALU: "Talu", // New Tai Lue // New_Tai_Lue
  TAML: "Taml", // Tamil // Tamil
  TANG: "Tang", // Tangut // Tangut
  TAVT: "Tavt", // Tai Viet // Tai_Viet
  TELU: "Telu", // Telugu // Telugu
  TENG: "Teng", // Tengwar // 
  TFNG: "Tfng", // Tifinagh (Berber) // Tifinagh
  TGLG: "Tglg", // Tagalog (Baybayin, Alibata) // Tagalog
  THAA: "Thaa", // Thaana // Thaana
  THAI: "Thai", // Thai // Thai
  TIBT: "Tibt", // Tibetan // Tibetan
  TIRH: "Tirh", // Tirhuta // Tirhuta
  TNSA: "Tnsa", // Tangsa // Tangsa
  TOTO: "Toto", // Toto // Toto
  UGAR: "Ugar", // Ugaritic // Ugaritic
  VAII: "Vaii", // Vai // Vai
  VISP: "Visp", // Visible Speech // 
  VITH: "Vith", // Vithkuqi // Vithkuqi
  WARA: "Wara", // Warang Citi (Varang Kshiti) // Warang_Citi
  WCHO: "Wcho", // Wancho // Wancho
  WOLE: "Wole", // Woleai // 
  XPEO: "Xpeo", // Old Persian // Old_Persian
  XSUX: "Xsux", // Cuneiform, Sumero-Akkadian // Cuneiform
  YEZI: "Yezi", // Yezidi // Yezidi
  YIII: "Yiii", // Yi // Yi
  ZANB: "Zanb", // Zanabazar Square (Zanabazarin Dörböljin Useg, Xewtee Dörböljin Bicig, Horizontal Square Script) // Zanabazar_Square
  ZINH: "Zinh", // Code for inherited script // Inherited
  ZMTH: "Zmth", // Mathematical notation // 
  ZSYE: "Zsye", // Symbols (Emoji variant) // 
  ZSYM: "Zsym", // Symbols // 
  ZXXX: "Zxxx", // Code for unwritten documents // 
  ZYYY: "Zyyy", // Code for undetermined script // Common
  ZZZZ: "Zzzz", // Code for uncoded script // Unknown
} as const;
type script = typeof _scripts[keyof typeof _scripts];

/**
 * Scriptの集合であるScript
 * 
 * - キー: 集合であるScriptのコード
 * - 値: キーの集合を構成するScriptのコードの配列
 *    - キーのScriptに含まれている文字は、値のいずれか（基本的には1つ）のScriptに含まれる
 * 
 * /\p{sc=****}/u で使えないので分解するため用
 */
const _unionScripts: Map<script, Array<script>> = new Map([
  [ "Hanb", [ "Bopo", "Hani" ] ],
  [ "Jpan", [ "Hani", "Hira", "Kana" ] ],
  [ "Kore", [ "Hang", "Hani" ] ],

  [ "Hrkt", [ "Hira", "Kana" ] ],
]);

// /**
//  * あるScriptの部分集合であるScript
//  * 
//  * - キー: 部分集合であるScriptのコード
//  * - 値: キーに対するスーパーセットであるScriptのコード
//  *    - キーのScriptに含まれている文字は、値のScriptに含まれる
//  *    - 値を同じくするどのキーのScriptに含まれておらず、値のScriptに含まれる文字は
//  *        値のScriptのみに含まれる（固有のコード割り当ては無い）
//  * 
//  * Unicode的には、スーパーセットのScriptになるので、/\p{sc=****}/u では使えない
//  * （CJK統合漢字の場合、HansとHantは同じ符号位置の文字に対する書体の違いになる）
//  * （ハングル字母の場合、固有の符号位置を持つ文字だがscはHang）
//  */
// const _subsetScripts: Map<script, script> = new Map([
//   [ "Hans", "Hani" ],
//   [ "Hant", "Hani" ],
//   [ "Jamo", "Hang" ],
// ]);

// /**
//  * あるScriptのtypographic variantであるScript
//  * 
//  * - キー: typographic variantであるScriptのコード
//  * - 値: キーに対する正字体であるScriptのコード
//  * 
//  * Unicode的には、正字体のScriptになるので、/\p{sc=****}/u では使えない
//  * （同じ符号位置の文字に対する書体の違いになる）
//  */
// const _typographicVariantScripts: Map<script, script> = new Map([
//   [ "Aran", "Arab" ],
//   [ "Cyrs", "Cyrl" ],
//   [ "Latf", "Latn" ],
//   [ "Latg", "Latn" ],
//   [ "Syre", "Syrc" ],
//   [ "Syrj", "Syrc" ],
//   [ "Syrn", "Syrc" ],
// ]);

// XXX 使いみちあるか？
// ・/\p{sc=****}/u では使えない
// const _nonUnicodeScripts: ReadonlyArray<Script> = Object.freeze([
//   "Afak",
//   "Blis",
//   "Cirt",
//   "Egyd",
//   "Egyh",
//   "Geok", // 一部がGeorとして収録
//   "Inds",
//   "Jurc",
//   "Kawi",
//   "Kitl",
//   "Kpel",
//   "Leke",
//   "Loma",
//   "Maya",
//   "Moon",
//   "Nagm",
//   "Nkdb",
//   "Nkgb",
//   "Pcun",
//   "Pelm",
//   "Phlv",
//   "Piqd",
//   "Psin",
//   "Qaaa",
//   "Qaab",
//   "Qaac",
//   "Qaad",
//   "Qaae",
//   "Qaaf",
//   "Qaag",
//   "Qaah",
//   "Qaai",
//   "Qaaj",
//   "Qaak",
//   "Qaal",
//   "Qaam",
//   "Qaan",
//   "Qaao",
//   "Qaap",
//   "Qaaq",
//   "Qaar",
//   "Qaas",
//   "Qaat",
//   "Qaau",
//   "Qaav",
//   "Qaaw",
//   "Qaax",
//   "Qaay",
//   "Qaaz",
//   "Qaba",
//   "Qabb",
//   "Qabc",
//   "Qabd",
//   "Qabe",
//   "Qabf",
//   "Qabg",
//   "Qabh",
//   "Qabi",
//   "Qabj",
//   "Qabk",
//   "Qabl",
//   "Qabm",
//   "Qabn",
//   "Qabo",
//   "Qabp",
//   "Qabq",
//   "Qabr",
//   "Qabs",
//   "Qabt",
//   "Qabu",
//   "Qabv",
//   "Qabw",
//   "Qabx",
//   "Ranj",
//   "Roro",
//   "Sara",
//   "Shui",
//   "Sunu",
//   "Teng",
//   "Visp",
//   "Wole",
//   "Zmth",
//   "Zsym",
//   "Zsye",
//   "Zxxx",
// ]);

function _format(script: string): string {
  return script.substring(0, 1).toUpperCase() + script.substring(1).toLowerCase();
}

function _isScript(value: unknown): value is script {
  if (typeof value === "string") {
    if (/^[A-Za-z]{4}$/.test(value)) {
      const formatted = _format(value);
      if ((Object.values(_scripts) as Array<string>).includes(formatted)) {
        return true;
      }
    }
  }
  return false;
}

function _normalize(script: string): script {
  if (_isScript(script)) {
    return _format(script) as script;
  }
  throw new TypeError("script");
}

const Script = Object.assign({
  isScript: _isScript,
  normalize: _normalize,
}, _scripts);
Object.freeze(Script);

function _decompose(script: script): Array<script> {
  const subsets = _unionScripts.get(script);
  if (Array.isArray(subsets)) {
    return subsets;
  }
  return [ script ];
}

// function _resolve(script: script): script {
//   const supersetScript = _subsetScripts.get(script);
//   if (supersetScript) {
//     return supersetScript;
//   }
//   return script;
// }

// function _resolve(script: script): script {
//   const orthographicScript = _typographicVariantScripts.get(script);
//   if (orthographicScript) {
//     return orthographicScript;
//   }
//   return script;
// }

function _normalizeSet(sources: Iterable<script>, options: ScriptSet.NormalizeOptions = {}): Iterable<script> {
  const sourceSet: Set<script> = new Set(sources);

  const work: Array<Array<script>> = [];
  let composedOrDecomposed: Array<script>;
  if (options.compose === "composition") {
    for (const [ union, subsets ] of _unionScripts.entries()) {
      let x = true;
      for (const subset of subsets) {
        x = x && sourceSet.has(subset);
        if (x !== true) {
          break;
        }
      }

      if (x === true) {
        for (const subset of subsets) {
          sourceSet.delete(subset);
        }
        work.push([ union ]);
      }
    }
    for (const source of sourceSet) {
      work.push([ source ]);
    }
    composedOrDecomposed = work.flat();
  }
  else if (options.compose === "decomposition") {
    for (const source of sourceSet) {
      work.push(_decompose(source));
    }
    composedOrDecomposed = work.flat();
  }
  else {
    composedOrDecomposed = [ ...sourceSet.values() ];
  }

  return composedOrDecomposed.sort();
}

class ScriptSet extends Set<script> {
  private constructor(scripts?: Iterable<script>) {
    super(scripts);
  }

  static fromArray(scripts: Array<string>, options?: ScriptSet.NormalizeOptions): ScriptSet {
    const src: Array<script> = [];
    if (Array.isArray(scripts)) {
      for (const script of scripts) {
        if (Script.isScript(script)) {
          src.push(Script.normalize(script));
        }
      }
    }
    return new this(_normalizeSet(src, options));
  }

  static fromLocale(locale: Intl.Locale, options?: ScriptSet.NormalizeOptions): ScriptSet {
    const src: Array<script> = [];
    if (Script.isScript(locale?.script)) {
      src.push(Script.normalize(locale.script));
    }
    return new this(_normalizeSet(src, options));
  }

  override add(script: script): this {
    if (_isScript(script)) {
      const normalized = _normalize(script);
      return super.add(normalized);
    }
    throw new TypeError("script");
  }

  normalize(options?: ScriptSet.NormalizeOptions): this {
    const scripts = _normalizeSet(this.values(), options);
    this.clear();
    for (const script of scripts) {
      super.add(script);
    }
    return this;
  }
}

namespace ScriptSet {
  export type NormalizeOptions = {
    compose?: "composition" | "decomposition" | "none",
    // TODO サブセットをスーパーセットに解決する、異体字を正字に解決する、・・・
  };
}

export {
  type script,
  Script,
  ScriptSet,
};
