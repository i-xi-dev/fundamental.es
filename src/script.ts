//

const _scripts = [
  "Adlm",
  "Afak",
  "Aghb",
  "Ahom",
  "Arab",
  "Aran",
  "Armi",
  "Armn",
  "Avst",
  "Bali",
  "Bamu",
  "Bass",
  "Batk",
  "Beng",
  "Bhks",
  "Blis",
  "Bopo",
  "Brah",
  "Brai",
  "Bugi",
  "Buhd",
  "Cakm",
  "Cans",
  "Cari",
  "Cham",
  "Cher",
  "Chrs",
  "Cirt",
  "Copt",
  "Cpmn",
  "Cprt",
  "Cyrl",
  "Cyrs",
  "Deva",
  "Diak",
  "Dogr",
  "Dsrt",
  "Dupl",
  "Egyd",
  "Egyh",
  "Egyp",
  "Elba",
  "Elym",
  "Ethi",
  "Geok",
  "Geor",
  "Glag",
  "Gong",
  "Gonm",
  "Goth",
  "Gran",
  "Grek",
  "Gujr",
  "Guru",
  "Hanb",
  "Hang",
  "Hani",
  "Hano",
  "Hans",
  "Hant",
  "Hatr",
  "Hebr",
  "Hira",
  "Hluw",
  "Hmng",
  "Hmnp",
  "Hrkt",
  "Hung",
  "Inds",
  "Ital",
  "Jamo",
  "Java",
  "Jpan",
  "Jurc",
  "Kali",
  "Kana",
  "Kawi",
  "Khar",
  "Khmr",
  "Khoj",
  "Kitl",
  "Kits",
  "Knda",
  "Kore",
  "Kpel",
  "Kthi",
  "Lana",
  "Laoo",
  "Latf",
  "Latg",
  "Latn",
  "Leke",
  "Lepc",
  "Limb",
  "Lina",
  "Linb",
  "Lisu",
  "Loma",
  "Lyci",
  "Lydi",
  "Mahj",
  "Maka",
  "Mand",
  "Mani",
  "Marc",
  "Maya",
  "Medf",
  "Mend",
  "Merc",
  "Mero",
  "Mlym",
  "Modi",
  "Mong",
  "Moon",
  "Mroo",
  "Mtei",
  "Mult",
  "Mymr",
  "Nagm",
  "Nand",
  "Narb",
  "Nbat",
  "Newa",
  "Nkdb",
  "Nkgb",
  "Nkoo",
  "Nshu",
  "Ogam",
  "Olck",
  "Orkh",
  "Orya",
  "Osge",
  "Osma",
  "Ougr",
  "Palm",
  "Pauc",
  "Pcun",
  "Pelm",
  "Perm",
  "Phag",
  "Phli",
  "Phlp",
  "Phlv",
  "Phnx",
  "Plrd",
  "Piqd",
  "Prti",
  "Psin",
  "Qaaa",
  "Qabx",
  "Ranj",
  "Rjng",
  "Rohg",
  "Roro",
  "Runr",
  "Samr",
  "Sara",
  "Sarb",
  "Saur",
  "Sgnw",
  "Shaw",
  "Shrd",
  "Shui",
  "Sidd",
  "Sind",
  "Sinh",
  "Sogd",
  "Sogo",
  "Sora",
  "Soyo",
  "Sund",
  "Sunu",
  "Sylo",
  "Syrc",
  "Syre",
  "Syrj",
  "Syrn",
  "Tagb",
  "Takr",
  "Tale",
  "Talu",
  "Taml",
  "Tang",
  "Tavt",
  "Telu",
  "Teng",
  "Tfng",
  "Tglg",
  "Thaa",
  "Thai",
  "Tibt",
  "Tirh",
  "Tnsa",
  "Toto",
  "Ugar",
  "Vaii",
  "Visp",
  "Vith",
  "Wara",
  "Wcho",
  "Wole",
  "Xpeo",
  "Xsux",
  "Yezi",
  "Yiii",
  "Zanb",
  "Zinh",
  "Zmth",
  "Zsye",
  "Zsym",
  "Zxxx",
  "Zyyy",
  "Zzzz",
] as const;
type Script = typeof _scripts[number];

const _scriptNames: Record<Script, [ name: string, alias: string ]> = Object.freeze({
  "Adlm": [ "Adlam", "Adlam" ],
  "Afak": [ "Afaka", "" ],
  "Aghb": [ "Caucasian Albanian", "Caucasian_Albanian" ],
  "Ahom": [ "Ahom, Tai Ahom", "Ahom" ],
  "Arab": [ "Arabic", "Arabic" ],
  "Aran": [ "Arabic (Nastaliq variant)", "" ],
  "Armi": [ "Imperial Aramaic", "Imperial_Aramaic" ],
  "Armn": [ "Armenian", "Armenian" ],
  "Avst": [ "Avestan", "Avestan" ],
  "Bali": [ "Balinese", "Balinese" ],
  "Bamu": [ "Bamum", "Bamum" ],
  "Bass": [ "Bassa Vah", "Bassa_Vah" ],
  "Batk": [ "Batak", "Batak" ],
  "Beng": [ "Bengali (Bangla)", "Bengali" ],
  "Bhks": [ "Bhaiksuki", "Bhaiksuki" ],
  "Blis": [ "Blissymbols", "" ],
  "Bopo": [ "Bopomofo", "Bopomofo" ],
  "Brah": [ "Brahmi", "Brahmi" ],
  "Brai": [ "Braille", "Braille" ],
  "Bugi": [ "Buginese", "Buginese" ],
  "Buhd": [ "Buhid", "Buhid" ],
  "Cakm": [ "Chakma", "Chakma" ],
  "Cans": [ "Unified Canadian Aboriginal Syllabics", "Canadian_Aboriginal" ],
  "Cari": [ "Carian", "Carian" ],
  "Cham": [ "Cham", "Cham" ],
  "Cher": [ "Cherokee", "Cherokee" ],
  "Chrs": [ "Chorasmian", "Chorasmian" ],
  "Cirt": [ "Cirth", "" ],
  "Copt": [ "Coptic", "Coptic" ],
  "Cpmn": [ "Cypro-Minoan", "Cypro_Minoan" ],
  "Cprt": [ "Cypriot syllabary", "Cypriot" ],
  "Cyrl": [ "Cyrillic", "Cyrillic" ],
  "Cyrs": [ "Cyrillic (Old Church Slavonic variant)", "" ],
  "Deva": [ "Devanagari (Nagari)", "Devanagari" ],
  "Diak": [ "Dives Akuru", "Dives_Akuru" ],
  "Dogr": [ "Dogra", "Dogra" ],
  "Dsrt": [ "Deseret (Mormon)", "Deseret" ],
  "Dupl": [ "Duployan shorthand, Duployan stenography", "Duployan" ],
  "Egyd": [ "Egyptian demotic", "" ],
  "Egyh": [ "Egyptian hieratic", "" ],
  "Egyp": [ "Egyptian hieroglyphs", "Egyptian_Hieroglyphs" ],
  "Elba": [ "Elbasan", "Elbasan" ],
  "Elym": [ "Elymaic", "Elymaic" ],
  "Ethi": [ "Ethiopic (Geʻez)", "Ethiopic" ],
  "Geok": [ "Khutsuri (Asomtavruli and Nuskhuri)", "Georgian" ],
  "Geor": [ "Georgian (Mkhedruli and Mtavruli)", "Georgian" ],
  "Glag": [ "Glagolitic", "Glagolitic" ],
  "Gong": [ "Gunjala Gondi", "Gunjala_Gondi" ],
  "Gonm": [ "Masaram Gondi", "Masaram_Gondi" ],
  "Goth": [ "Gothic", "Gothic" ],
  "Gran": [ "Grantha", "Grantha" ],
  "Grek": [ "Greek", "Greek" ],
  "Gujr": [ "Gujarati", "Gujarati" ],
  "Guru": [ "Gurmukhi", "Gurmukhi" ],
  "Hanb": [ "Han with Bopomofo (alias for Han + Bopomofo)", "" ],
  "Hang": [ "Hangul (Hangŭl, Hangeul)", "Hangul" ],
  "Hani": [ "Han (Hanzi, Kanji, Hanja)", "Han" ],
  "Hano": [ "Hanunoo (Hanunóo)", "Hanunoo" ],
  "Hans": [ "Han (Simplified variant)", "" ],
  "Hant": [ "Han (Traditional variant)", "" ],
  "Hatr": [ "Hatran", "Hatran" ],
  "Hebr": [ "Hebrew", "Hebrew" ],
  "Hira": [ "Hiragana", "Hiragana" ],
  "Hluw": [ "Anatolian Hieroglyphs (Luwian Hieroglyphs, Hittite Hieroglyphs)", "Anatolian_Hieroglyphs" ],
  "Hmng": [ "Pahawh Hmong", "Pahawh_Hmong" ],
  "Hmnp": [ "Nyiakeng Puachue Hmong", "Nyiakeng_Puachue_Hmong" ],
  "Hrkt": [ "Japanese syllabaries (alias for Hiragana + Katakana)", "Katakana_Or_Hiragana" ],
  "Hung": [ "Old Hungarian (Hungarian Runic)", "Old_Hungarian" ],
  "Inds": [ "Indus (Harappan)", "" ],
  "Ital": [ "Old Italic (Etruscan, Oscan, etc.)", "Old_Italic" ],
  "Jamo": [ "Jamo (alias for Jamo subset of Hangul)", "" ],
  "Java": [ "Javanese", "Javanese" ],
  "Jpan": [ "Japanese (alias for Han + Hiragana + Katakana)", "" ],
  "Jurc": [ "Jurchen", "" ],
  "Kali": [ "Kayah Li", "Kayah_Li" ],
  "Kana": [ "Katakana", "Katakana" ],
  "Kawi": [ "Kawi", "" ],
  "Khar": [ "Kharoshthi", "Kharoshthi" ],
  "Khmr": [ "Khmer", "Khmer" ],
  "Khoj": [ "Khojki", "Khojki" ],
  "Kitl": [ "Khitan large script", "" ],
  "Kits": [ "Khitan small script", "Khitan_Small_Script" ],
  "Knda": [ "Kannada", "Kannada" ],
  "Kore": [ "Korean (alias for Hangul + Han)", "" ],
  "Kpel": [ "Kpelle", "" ],
  "Kthi": [ "Kaithi", "Kaithi" ],
  "Lana": [ "Tai Tham (Lanna)", "Tai_Tham" ],
  "Laoo": [ "Lao", "Lao" ],
  "Latf": [ "Latin (Fraktur variant)", "" ],
  "Latg": [ "Latin (Gaelic variant)", "" ],
  "Latn": [ "Latin", "Latin" ],
  "Leke": [ "Leke", "" ],
  "Lepc": [ "Lepcha (Róng)", "Lepcha" ],
  "Limb": [ "Limbu", "Limbu" ],
  "Lina": [ "Linear A", "Linear_A" ],
  "Linb": [ "Linear B", "Linear_B" ],
  "Lisu": [ "Lisu (Fraser)", "Lisu" ],
  "Loma": [ "Loma", "" ],
  "Lyci": [ "Lycian", "Lycian" ],
  "Lydi": [ "Lydian", "Lydian" ],
  "Mahj": [ "Mahajani", "Mahajani" ],
  "Maka": [ "Makasar", "Makasar" ],
  "Mand": [ "Mandaic, Mandaean", "Mandaic" ],
  "Mani": [ "Manichaean", "Manichaean" ],
  "Marc": [ "Marchen", "Marchen" ],
  "Maya": [ "Mayan hieroglyphs", "" ],
  "Medf": [ "Medefaidrin (Oberi Okaime, Oberi Ɔkaimɛ)", "Medefaidrin" ],
  "Mend": [ "Mende Kikakui", "Mende_Kikakui" ],
  "Merc": [ "Meroitic Cursive", "Meroitic_Cursive" ],
  "Mero": [ "Meroitic Hieroglyphs", "Meroitic_Hieroglyphs" ],
  "Mlym": [ "Malayalam", "Malayalam" ],
  "Modi": [ "Modi, Moḍī", "Modi" ],
  "Mong": [ "Mongolian", "Mongolian" ],
  "Moon": [ "Moon (Moon code, Moon script, Moon type)", "" ],
  "Mroo": [ "Mro, Mru", "Mro" ],
  "Mtei": [ "Meitei Mayek (Meithei, Meetei)", "Meetei_Mayek" ],
  "Mult": [ "Multani", "Multani" ],
  "Mymr": [ "Myanmar (Burmese)", "Myanmar" ],
  "Nagm": [ "Nag Mundari", "" ],
  "Nand": [ "Nandinagari", "Nandinagari" ],
  "Narb": [ "Old North Arabian (Ancient North Arabian)", "Old_North_Arabian" ],
  "Nbat": [ "Nabataean", "Nabataean" ],
  "Newa": [ "Newa, Newar, Newari, Nepāla lipi", "Newa" ],
  "Nkdb": [ "Naxi Dongba (na²¹ɕi³³ to³³ba²¹, Nakhi Tomba)", "" ],
  "Nkgb": [ "Naxi Geba (na²¹ɕi³³ gʌ²¹ba²¹, 'Na-'Khi ²Ggŏ-¹baw, Nakhi Geba)", "" ],
  "Nkoo": [ "N’Ko", "Nko" ],
  "Nshu": [ "Nüshu", "Nushu" ],
  "Ogam": [ "Ogham", "Ogham" ],
  "Olck": [ "Ol Chiki (Ol Cemet’, Ol, Santali)", "Ol_Chiki" ],
  "Orkh": [ "Old Turkic, Orkhon Runic", "Old_Turkic" ],
  "Orya": [ "Oriya (Odia)", "Oriya" ],
  "Osge": [ "Osage", "Osage" ],
  "Osma": [ "Osmanya", "Osmanya" ],
  "Ougr": [ "Old Uyghur", "Old_Uyghur" ],
  "Palm": [ "Palmyrene", "Palmyrene" ],
  "Pauc": [ "Pau Cin Hau", "Pau_Cin_Hau" ],
  "Pcun": [ "Proto-Cuneiform", "" ],
  "Pelm": [ "Proto-Elamite", "" ],
  "Perm": [ "Old Permic", "Old_Permic" ],
  "Phag": [ "Phags-pa", "Phags_Pa" ],
  "Phli": [ "Inscriptional Pahlavi", "Inscriptional_Pahlavi" ],
  "Phlp": [ "Psalter Pahlavi", "Psalter_Pahlavi" ],
  "Phlv": [ "Book Pahlavi", "" ],
  "Phnx": [ "Phoenician", "Phoenician" ],
  "Plrd": [ "Miao (Pollard)", "Miao" ],
  "Piqd": [ "Klingon (KLI pIqaD)", "" ],
  "Prti": [ "Inscriptional Parthian", "Inscriptional_Parthian" ],
  "Psin": [ "Proto-Sinaitic", "" ],
  "Qaaa": [ "Reserved for private use (start)", "" ],
  "Qabx": [ "Reserved for private use (end)", "" ],
  "Ranj": [ "Ranjana", "" ],
  "Rjng": [ "Rejang (Redjang, Kaganga)", "Rejang" ],
  "Rohg": [ "Hanifi Rohingya", "Hanifi_Rohingya" ],
  "Roro": [ "Rongorongo", "" ],
  "Runr": [ "Runic", "Runic" ],
  "Samr": [ "Samaritan", "Samaritan" ],
  "Sara": [ "Sarati", "" ],
  "Sarb": [ "Old South Arabian", "Old_South_Arabian" ],
  "Saur": [ "Saurashtra", "Saurashtra" ],
  "Sgnw": [ "SignWriting", "SignWriting" ],
  "Shaw": [ "Shavian (Shaw)", "Shavian" ],
  "Shrd": [ "Sharada, Śāradā", "Sharada" ],
  "Shui": [ "Shuishu", "" ],
  "Sidd": [ "Siddham, Siddhaṃ, Siddhamātṛkā", "Siddham" ],
  "Sind": [ "Khudawadi, Sindhi", "Khudawadi" ],
  "Sinh": [ "Sinhala", "Sinhala" ],
  "Sogd": [ "Sogdian", "Sogdian" ],
  "Sogo": [ "Old Sogdian", "Old_Sogdian" ],
  "Sora": [ "Sora Sompeng", "Sora_Sompeng" ],
  "Soyo": [ "Soyombo", "Soyombo" ],
  "Sund": [ "Sundanese", "Sundanese" ],
  "Sunu": [ "Sunuwar", "" ],
  "Sylo": [ "Syloti Nagri", "Syloti_Nagri" ],
  "Syrc": [ "Syriac", "Syriac" ],
  "Syre": [ "Syriac (Estrangelo variant)", "" ],
  "Syrj": [ "Syriac (Western variant)", "" ],
  "Syrn": [ "Syriac (Eastern variant)", "" ],
  "Tagb": [ "Tagbanwa", "Tagbanwa" ],
  "Takr": [ "Takri, Ṭākrī, Ṭāṅkrī", "Takri" ],
  "Tale": [ "Tai Le", "Tai_Le" ],
  "Talu": [ "New Tai Lue", "New_Tai_Lue" ],
  "Taml": [ "Tamil", "Tamil" ],
  "Tang": [ "Tangut", "Tangut" ],
  "Tavt": [ "Tai Viet", "Tai_Viet" ],
  "Telu": [ "Telugu", "Telugu" ],
  "Teng": [ "Tengwar", "" ],
  "Tfng": [ "Tifinagh (Berber)", "Tifinagh" ],
  "Tglg": [ "Tagalog (Baybayin, Alibata)", "Tagalog" ],
  "Thaa": [ "Thaana", "Thaana" ],
  "Thai": [ "Thai", "Thai" ],
  "Tibt": [ "Tibetan", "Tibetan" ],
  "Tirh": [ "Tirhuta", "Tirhuta" ],
  "Tnsa": [ "Tangsa", "Tangsa" ],
  "Toto": [ "Toto", "Toto" ],
  "Ugar": [ "Ugaritic", "Ugaritic" ],
  "Vaii": [ "Vai", "Vai" ],
  "Visp": [ "Visible Speech", "" ],
  "Vith": [ "Vithkuqi", "Vithkuqi" ],
  "Wara": [ "Warang Citi (Varang Kshiti)", "Warang_Citi" ],
  "Wcho": [ "Wancho", "Wancho" ],
  "Wole": [ "Woleai", "" ],
  "Xpeo": [ "Old Persian", "Old_Persian" ],
  "Xsux": [ "Cuneiform, Sumero-Akkadian", "Cuneiform" ],
  "Yezi": [ "Yezidi", "Yezidi" ],
  "Yiii": [ "Yi", "Yi" ],
  "Zanb": [ "Zanabazar Square (Zanabazarin Dörböljin Useg, Xewtee Dörböljin Bicig, Horizontal Square Script)", "Zanabazar_Square" ],
  "Zinh": [ "Code for inherited script", "Inherited" ],
  "Zmth": [ "Mathematical notation", "" ],
  "Zsye": [ "Symbols (Emoji variant)", "" ],
  "Zsym": [ "Symbols", "" ],
  "Zxxx": [ "Code for unwritten documents", "" ],
  "Zyyy": [ "Code for undetermined script", "Common" ],
  "Zzzz": [ "Code for uncoded script", "Unknown" ],
});

namespace Script {
  export function nameOf(script: Script): string {
    return _scriptNames[script] ? _scriptNames[script][0] : "";
  }

  export function aliasOf(script: Script): string {
    return _scriptNames[script] ? _scriptNames[script][1] : "";
  }

  export function ofLocale(locale: Intl.Locale): Script | undefined {
    return fromString(locale.script as string);
  }

  export function fromString(script: string): Script | undefined {
    if (typeof script === "string") {
      if (/^[A-Za-z]{4}$/.test(script)) {
        const formatted = script.substring(0, 1).toUpperCase() + script.substring(1).toLowerCase();
        if ((Object.values(_scripts) as string[]).includes(formatted)) {
          return formatted as Script;
        }
      }
    }
    return undefined; // XXX undefinedで良い？
  }

  export const values: Array<Script> = [ ..._scripts ];
}

for (const script of _scripts) {
  Object.defineProperty(Script, script.toUpperCase(), {
    value: script,
  });
}

export {
  Script,
};