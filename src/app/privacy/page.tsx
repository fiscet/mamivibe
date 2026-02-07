import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adatvédelmi nyilatkozat | Mamivibe',
  description:
    'A Mamivibe adatvédelmi nyilatkozata és tájékoztatója a személyes adatok kezeléséről.'
};

export default function PrivacyPolicyPage() {
  const lastUpdated = '2026. január 24.';

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/50 to-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Adatvédelmi nyilatkozat
          </h1>
          <p className="text-gray-500 mb-8">Utolsó frissítés: {lastUpdated}</p>

          <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-pink-500 hover:prose-a:text-pink-600">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                1. Adatkezelő adatai
              </h2>
              <p>
                <strong>Név:</strong> Könyves Ildikó
                <br />
                <strong>Székhely:</strong> 8900 Zalaegerszeg, Göcseji út 4-6.
                <br />
                <strong>E-mail:</strong> mamivibezala@gmail.com
                <br />
                <strong>Telefon:</strong> +36 30 385 2881
              </p>
              <p>
                Az adatkezelő a GDPR (az Európai Parlament és a Tanács (EU)
                2016/679 rendelete) és az információs önrendelkezési jogról és
                az információszabadságról szóló 2011. évi CXII. törvény
                (Infotv.) előírásainak megfelelően kezeli az Ön személyes
                adatait.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                2. Kezelt személyes adatok és az adatkezelés célja
              </h2>

              <h3 className="text-lg font-medium mt-6 mb-3">
                2.1. Időpontfoglalás
              </h3>
              <p>
                <strong>Kezelt adatok:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Teljes név</li>
                <li>E-mail cím</li>
                <li>Telefonszám</li>
                <li>Választott szolgáltatás</li>
                <li>Választott időpont</li>
                <li>Megjegyzés (opcionális)</li>
              </ul>
              <p>
                <strong>Adatkezelés célja:</strong> A szoptatási tanácsadás
                szolgáltatás nyújtása, időpontegyeztetés, kapcsolattartás.
              </p>
              <p>
                <strong>Jogalap:</strong> Az Ön hozzájárulása (GDPR 6. cikk (1)
                bekezdés a) pont) és a szerződés teljesítése (GDPR 6. cikk (1)
                bekezdés b) pont).
              </p>
              <p>
                <strong>Megőrzési idő:</strong> A foglalástól számított 1 év,
                vagy az Ön törlési kérelméig.
              </p>

              <h3 className="text-lg font-medium mt-6 mb-3">
                2.2. Kapcsolatfelvételi űrlap
              </h3>
              <p>
                <strong>Kezelt adatok:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Teljes név</li>
                <li>E-mail cím</li>
                <li>Üzenet tartalma</li>
              </ul>
              <p>
                <strong>Adatkezelés célja:</strong> Kapcsolatfelvétel, kérdések
                megválaszolása, tájékoztatás nyújtása.
              </p>
              <p>
                <strong>Jogalap:</strong> Az Ön hozzájárulása (GDPR 6. cikk (1)
                bekezdés a) pont).
              </p>
              <p>
                <strong>Megőrzési idő:</strong> Az üzenet beérkezésétől
                számított 1 év, vagy az Ön törlési kérelméig.
              </p>

              <h3 className="text-lg font-medium mt-6 mb-3">
                2.3. Értékelések
              </h3>
              <p>
                <strong>Kezelt adatok:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Név (vagy becenév)</li>
                <li>Értékelés szövege</li>
              </ul>
              <p>
                <strong>Adatkezelés célja:</strong> Visszajelzések gyűjtése,
                szolgáltatás minőségének javítása, referenciák megjelenítése.
              </p>
              <p>
                <strong>Jogalap:</strong> Az Ön hozzájárulása (GDPR 6. cikk (1)
                bekezdés a) pont).
              </p>
              <p>
                <strong>Megőrzési idő:</strong> Az értékelés beküldésétől
                számított 1 év, vagy az Ön törlési kérelméig.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. Adatfeldolgozók</h2>
              <p>Az adatkezelő az alábbi adatfeldolgozókat veszi igénybe:</p>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200 my-4">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Adatfeldolgozó
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Tevékenység
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Székhely
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">
                        Vercel Inc.
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        Tárhelyszolgáltatás
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        USA (EU-US Data Privacy Framework)
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">
                        Sanity AS
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        Tartalomkezelő rendszer, adattárolás
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        Norvégia (EGT)
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">
                        Google LLC (Gmail)
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        E-mail szolgáltatás
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        USA (EU-US Data Privacy Framework)
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">
                        Google LLC (Google Analytics 4)
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        Webanalitika
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        USA (EU-US Data Privacy Framework)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                4. Cookie-k (sütik)
              </h2>
              <p>
                A weboldal cookie-kat (sütiket) használ a megfelelő működés
                biztosítása és a látogatottsági statisztikák gyűjtése érdekében.
              </p>

              <h3 className="text-lg font-medium mt-6 mb-3">
                4.1. Szükséges cookie-k
              </h3>
              <p>
                Ezek a cookie-k elengedhetetlenek a weboldal működéséhez, és nem
                kapcsolhatók ki. Nem gyűjtenek személyes adatokat.
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Sanity.io technikai cookie-k:</strong> A
                  tartalomkezelő rendszer működéséhez szükséges sütik.
                </li>
                <li>
                  <strong>Munkamenet cookie-k:</strong> A weboldal biztonságos
                  működéséhez szükséges ideiglenes sütik, amelyek a böngésző
                  bezárásakor törlődnek.
                </li>
                <li>
                  <strong>Cookie hozzájárulás:</strong> Az Ön cookie
                  beállításainak tárolására szolgáló süti.
                </li>
              </ul>

              <h3 className="text-lg font-medium mt-6 mb-3">
                4.2. Analitikai cookie-k (Google Analytics 4)
              </h3>
              <p>
                A weboldal Google Analytics 4 (GA4) szolgáltatást használ a
                látogatottsági statisztikák gyűjtésére. Ezek a cookie-k
                segítenek megérteni, hogyan használják a látogatók a weboldalt.
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>_ga:</strong> A felhasználók megkülönböztetésére
                  szolgál. Lejárat: 2 év.
                </li>
                <li>
                  <strong>_ga_*:</strong> A munkamenet állapotának fenntartására
                  szolgál. Lejárat: 2 év.
                </li>
              </ul>
              <p>
                A Google Analytics által gyűjtött adatok anonimizáltak, és nem
                alkalmasak az Ön személyes azonosítására. Az IP-címek
                anonimizálva vannak. A Google adatvédelmi irányelvei elérhetők:{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-600"
                >
                  https://policies.google.com/privacy
                </a>
              </p>
              <p className="mt-4">
                <strong>Cookie-k kezelése:</strong> Ön bármikor módosíthatja
                vagy visszavonhatja hozzájárulását a cookie-k használatához a
                böngészője beállításaiban. Az analitikai cookie-k letiltása nem
                befolyásolja a weboldal működését.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">5. Az Ön jogai</h2>
              <p>A GDPR alapján Önt az alábbi jogok illetik meg:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Hozzáférési jog:</strong> Tájékoztatást kérhet arról,
                  hogy milyen személyes adatait kezeljük.
                </li>
                <li>
                  <strong>Helyesbítéshez való jog:</strong> Kérheti pontatlan
                  adatai helyesbítését.
                </li>
                <li>
                  <strong>
                    Törléshez való jog (&quot;elfeledtetéshez való jog&quot;):
                  </strong>{' '}
                  Kérheti személyes adatai törlését.
                </li>
                <li>
                  <strong>Adatkezelés korlátozásához való jog:</strong> Kérheti
                  az adatkezelés korlátozását.
                </li>
                <li>
                  <strong>Adathordozhatósághoz való jog:</strong> Kérheti adatai
                  géppel olvasható formátumban történő kiadását.
                </li>
                <li>
                  <strong>Tiltakozáshoz való jog:</strong> Tiltakozhat személyes
                  adatai kezelése ellen.
                </li>
                <li>
                  <strong>Hozzájárulás visszavonásának joga:</strong> Bármikor
                  visszavonhatja hozzájárulását.
                </li>
              </ul>
              <p>
                Jogai gyakorlásához kérjük, vegye fel velünk a kapcsolatot a{' '}
                <a href="mailto:mamivibezala@gmail.com">
                  mamivibezala@gmail.com
                </a>{' '}
                e-mail címen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">6. Adatbiztonság</h2>
              <p>
                Az adatkezelő megfelelő technikai és szervezési intézkedéseket
                alkalmaz a személyes adatok védelme érdekében, beleértve:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>SSL/TLS titkosítás az adatátvitel során</li>
                <li>Biztonságos jelszókezelés</li>
                <li>Rendszeres biztonsági mentések</li>
                <li>Hozzáférés-korlátozás</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                7. Jogorvoslati lehetőségek
              </h2>
              <p>
                Ha úgy érzi, hogy személyes adatai kezelésével kapcsolatban
                jogsérelem érte, panaszt tehet a Nemzeti Adatvédelmi és
                Információszabadság Hatóságnál (NAIH):
              </p>
              <p>
                <strong>
                  Nemzeti Adatvédelmi és Információszabadság Hatóság
                </strong>
                <br />
                Cím: 1055 Budapest, Falk Miksa utca 9-11.
                <br />
                Postacím: 1363 Budapest, Pf. 9.
                <br />
                Telefon: +36 1 391 1400
                <br />
                E-mail: ugyfelszolgalat@naih.hu
                <br />
                Weboldal:{' '}
                <a
                  href="https://naih.hu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://naih.hu
                </a>
              </p>
              <p>
                Továbbá bírósághoz is fordulhat. A per az Ön választása szerint
                a lakóhelye vagy tartózkodási helye szerinti törvényszék előtt
                is megindítható.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                8. Az adatvédelmi nyilatkozat módosítása
              </h2>
              <p>
                Az adatkezelő fenntartja a jogot, hogy jelen adatvédelmi
                nyilatkozatot egyoldalúan módosítsa. A módosításokról a
                weboldalon keresztül tájékoztatjuk a felhasználókat. A módosítás
                hatálybalépését követően a weboldal használatával Ön elfogadja a
                módosított adatvédelmi nyilatkozatot.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">9. Kapcsolat</h2>
              <p>
                Adatvédelmi kérdéseivel, kéréseivel forduljon hozzánk
                bizalommal:
              </p>
              <p>
                <strong>E-mail:</strong>{' '}
                <a href="mailto:mamivibezala@gmail.com">
                  mamivibezala@gmail.com
                </a>
                <br />
                <strong>Telefon:</strong> +36 30 385 2881
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
