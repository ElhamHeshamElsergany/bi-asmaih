import { normalizeArabic } from "@/lib/arabic";

export type ListedName = {
  name: string;
  dorarId: string | null;
  lessonSlug: string | null;
};

export const dorarNameList = {
  title: "أسماء أحصتها الدرر السنية من الكتاب والسنة",
  sourceTitle: "الموسوعة العقدية — أسماء الله الحسنى",
  url: "https://dorar.net/aqeeda/459",
  statement:
    "هذه قائمة بأسماء الله الحسنى التي تم إحصاؤها من كتاب الله تعالى وسنة رسوله، وهي هنا مسرودة بحسب الترتيب الهجائي.",
  citation: "يُنظر: ((صفات الله عز وجل الواردة في الكتاب والسنة وإحصاء أسمائه تعالى)) لعلوي السقاف (ص: 438).",
  names: [
  {
    "name": "الآخِرُ",
    "dorarId": "513",
    "lessonSlug": null
  },
  {
    "name": "الأحَدُ",
    "dorarId": "521",
    "lessonSlug": null
  },
  {
    "name": "الأعزُّ",
    "dorarId": "737",
    "lessonSlug": null
  },
  {
    "name": "الأعلى",
    "dorarId": "749",
    "lessonSlug": null
  },
  {
    "name": "الأكرَمُ",
    "dorarId": "801",
    "lessonSlug": null
  },
  {
    "name": "الأوَّلُ",
    "dorarId": "561",
    "lessonSlug": null
  },
  {
    "name": "الإلهُ",
    "dorarId": "551",
    "lessonSlug": null
  },
  {
    "name": "البارئُ",
    "dorarId": "567",
    "lessonSlug": null
  },
  {
    "name": "الباسِطُ",
    "dorarId": "577",
    "lessonSlug": null
  },
  {
    "name": "الباطِنُ",
    "dorarId": "569",
    "lessonSlug": null
  },
  {
    "name": "البَرُّ",
    "dorarId": "573",
    "lessonSlug": null
  },
  {
    "name": "البصيرُ",
    "dorarId": "581",
    "lessonSlug": null
  },
  {
    "name": "التَّوابُ",
    "dorarId": "601",
    "lessonSlug": null
  },
  {
    "name": "الجَبَّارُ",
    "dorarId": "603",
    "lessonSlug": null
  },
  {
    "name": "الجميلُ",
    "dorarId": "607",
    "lessonSlug": null
  },
  {
    "name": "الحافِظُ",
    "dorarId": "623",
    "lessonSlug": null
  },
  {
    "name": "الحَسيبُ",
    "dorarId": "621",
    "lessonSlug": null
  },
  {
    "name": "الحفيظُ",
    "dorarId": "623",
    "lessonSlug": null
  },
  {
    "name": "الحَقُّ",
    "dorarId": "627",
    "lessonSlug": null
  },
  {
    "name": "الحَكَمُ",
    "dorarId": "611",
    "lessonSlug": null
  },
  {
    "name": "الحكيمُ",
    "dorarId": "629",
    "lessonSlug": null
  },
  {
    "name": "الحليمُ",
    "dorarId": "631",
    "lessonSlug": null
  },
  {
    "name": "الحميدُ",
    "dorarId": "633",
    "lessonSlug": null
  },
  {
    "name": "الحيُّ",
    "dorarId": "641",
    "lessonSlug": "al-hayy"
  },
  {
    "name": "الحَيِيُّ",
    "dorarId": "639",
    "lessonSlug": null
  },
  {
    "name": "الخالِقُ",
    "dorarId": null,
    "lessonSlug": null
  },
  {
    "name": "الخبيرُ",
    "dorarId": "643",
    "lessonSlug": null
  },
  {
    "name": "الخلَّاقُ",
    "dorarId": null,
    "lessonSlug": null
  },
  {
    "name": "الدَّيَّانُ",
    "dorarId": "651",
    "lessonSlug": null
  },
  {
    "name": "الرَّؤوفُ",
    "dorarId": "657",
    "lessonSlug": null
  },
  {
    "name": "الرَّازقُ",
    "dorarId": "669",
    "lessonSlug": null
  },
  {
    "name": "الرَّبُّ",
    "dorarId": "663",
    "lessonSlug": null
  },
  {
    "name": "الرَّحمنُ",
    "dorarId": "667",
    "lessonSlug": "ar-rahman-rahim"
  },
  {
    "name": "الرَّحيمُ",
    "dorarId": "667",
    "lessonSlug": "ar-rahman-rahim"
  },
  {
    "name": "الرَّزَّاقُ",
    "dorarId": "669",
    "lessonSlug": null
  },
  {
    "name": "الرَّفيقُ",
    "dorarId": "673",
    "lessonSlug": null
  },
  {
    "name": "الرَّقيبُ",
    "dorarId": "675",
    "lessonSlug": null
  },
  {
    "name": "السُّبُّوحُ",
    "dorarId": "685",
    "lessonSlug": null
  },
  {
    "name": "السَّتِيرُ",
    "dorarId": "687",
    "lessonSlug": null
  },
  {
    "name": "السَّلامُ",
    "dorarId": "697",
    "lessonSlug": null
  },
  {
    "name": "السَّميعُ",
    "dorarId": "701",
    "lessonSlug": "as-sami"
  },
  {
    "name": "السَّيِّدُ",
    "dorarId": "703",
    "lessonSlug": null
  },
  {
    "name": "الشَّافي",
    "dorarId": "705",
    "lessonSlug": null
  },
  {
    "name": "الشَّاكِرُ",
    "dorarId": "709",
    "lessonSlug": null
  },
  {
    "name": "الشَّكورُ",
    "dorarId": "709",
    "lessonSlug": null
  },
  {
    "name": "الشَّهيدُ",
    "dorarId": "711",
    "lessonSlug": null
  },
  {
    "name": "الصَّمَدُ",
    "dorarId": "717",
    "lessonSlug": null
  },
  {
    "name": "الطَّيِّبُ",
    "dorarId": "727",
    "lessonSlug": null
  },
  {
    "name": "الظَّاهِرُ",
    "dorarId": "729",
    "lessonSlug": null
  },
  {
    "name": "العزيزُ",
    "dorarId": "737",
    "lessonSlug": null
  },
  {
    "name": "العظيمُ",
    "dorarId": "743",
    "lessonSlug": null
  },
  {
    "name": "العَفُوُّ",
    "dorarId": "745",
    "lessonSlug": null
  },
  {
    "name": "العَلِيُّ",
    "dorarId": "749",
    "lessonSlug": null
  },
  {
    "name": "العليمُ",
    "dorarId": "747",
    "lessonSlug": "al-alim"
  },
  {
    "name": "الغفَّارُ",
    "dorarId": "841",
    "lessonSlug": null
  },
  {
    "name": "الغَفورُ",
    "dorarId": "841",
    "lessonSlug": null
  },
  {
    "name": "الغَنيُّ",
    "dorarId": "763",
    "lessonSlug": null
  },
  {
    "name": "الفَتَّاحُ",
    "dorarId": "769",
    "lessonSlug": null
  },
  {
    "name": "القابِضُ",
    "dorarId": "777",
    "lessonSlug": null
  },
  {
    "name": "القادِرُ",
    "dorarId": "779",
    "lessonSlug": "al-qudra"
  },
  {
    "name": "القاهِرُ",
    "dorarId": "785",
    "lessonSlug": null
  },
  {
    "name": "القُدُّوسُ",
    "dorarId": "781",
    "lessonSlug": null
  },
  {
    "name": "القديرُ",
    "dorarId": "779",
    "lessonSlug": "al-qudra"
  },
  {
    "name": "القريبُ",
    "dorarId": "599",
    "lessonSlug": null
  },
  {
    "name": "القهَّارُ",
    "dorarId": "785",
    "lessonSlug": null
  },
  {
    "name": "القويُّ",
    "dorarId": "789",
    "lessonSlug": null
  },
  {
    "name": "القيُّومُ",
    "dorarId": "791",
    "lessonSlug": "al-qayyum"
  },
  {
    "name": "الكبيرُ",
    "dorarId": "797",
    "lessonSlug": null
  },
  {
    "name": "الكريمُ",
    "dorarId": "801",
    "lessonSlug": null
  },
  {
    "name": "اللَّطيفُ",
    "dorarId": "815",
    "lessonSlug": null
  },
  {
    "name": "اللهُ",
    "dorarId": "551",
    "lessonSlug": null
  },
  {
    "name": "المؤَخِّرُ",
    "dorarId": "597",
    "lessonSlug": null
  },
  {
    "name": "المؤمِنُ",
    "dorarId": "819",
    "lessonSlug": null
  },
  {
    "name": "المُبِينُ",
    "dorarId": "823",
    "lessonSlug": null
  },
  {
    "name": "المتعالي",
    "dorarId": "749",
    "lessonSlug": null
  },
  {
    "name": "المتكَبِّرُ",
    "dorarId": "795",
    "lessonSlug": null
  },
  {
    "name": "المتينُ",
    "dorarId": "825",
    "lessonSlug": null
  },
  {
    "name": "المجيبُ",
    "dorarId": "519",
    "lessonSlug": null
  },
  {
    "name": "المَجِيدُ",
    "dorarId": "827",
    "lessonSlug": null
  },
  {
    "name": "المحيطُ",
    "dorarId": "829",
    "lessonSlug": null
  },
  {
    "name": "المصَوِّرُ",
    "dorarId": "837",
    "lessonSlug": null
  },
  {
    "name": "المُعطِي",
    "dorarId": "741",
    "lessonSlug": null
  },
  {
    "name": "المُقتَدِرُ",
    "dorarId": "779",
    "lessonSlug": "al-qudra"
  },
  {
    "name": "المقَدِّمُ",
    "dorarId": "597",
    "lessonSlug": null
  },
  {
    "name": "الْمُقِيتُ",
    "dorarId": "845",
    "lessonSlug": null
  },
  {
    "name": "المَلِكُ",
    "dorarId": "849",
    "lessonSlug": null
  },
  {
    "name": "المَلِيكُ",
    "dorarId": "849",
    "lessonSlug": null
  },
  {
    "name": "المنَّانُ",
    "dorarId": "855",
    "lessonSlug": null
  },
  {
    "name": "المُهِيمنُ",
    "dorarId": "875",
    "lessonSlug": null
  },
  {
    "name": "المولى",
    "dorarId": "893",
    "lessonSlug": null
  },
  {
    "name": "النَّصيرُ",
    "dorarId": "857",
    "lessonSlug": null
  },
  {
    "name": "الهادي",
    "dorarId": "871",
    "lessonSlug": null
  },
  {
    "name": "الواحِدُ",
    "dorarId": "877",
    "lessonSlug": null
  },
  {
    "name": "الواسِعُ",
    "dorarId": "881",
    "lessonSlug": null
  },
  {
    "name": "الوِتْرُ",
    "dorarId": "883",
    "lessonSlug": null
  },
  {
    "name": "الوَدودُ",
    "dorarId": "887",
    "lessonSlug": null
  },
  {
    "name": "الوكيلُ",
    "dorarId": "891",
    "lessonSlug": null
  },
  {
    "name": "الوَليُّ",
    "dorarId": "893",
    "lessonSlug": null
  },
  {
    "name": "الوَهَّابُ",
    "dorarId": "895",
    "lessonSlug": null
  }
] as ListedName[],
};

export function filterListedNames(query: string): ListedName[] {
  const normalized = normalizeArabic(query);
  if (normalized.length < 2) return dorarNameList.names;
  return dorarNameList.names.filter((item) => normalizeArabic(item.name).includes(normalized));
}
