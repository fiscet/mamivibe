import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Általános Szerződési Feltételek | Mamivibe',
  description:
    'A Mamivibe általános szerződési feltételei a szoptatási tanácsadás szolgáltatáshoz.'
};

export default function TermsOfServicePage() {
  const lastUpdated = '2026. január 24.';

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/50 to-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Általános Szerződési Feltételek
          </h1>
          <p className="text-gray-500 mb-8">Utolsó frissítés: {lastUpdated}</p>

          <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-pink-500 hover:prose-a:text-pink-600">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                1. Szolgáltató adatai
              </h2>
              <p>
                <strong>Név:</strong> Könyves Ildikó
                <br />
                <strong>Székhely:</strong> 8900 Zalaegerszeg, Göcseji út 4-6.
                <br />
                <strong>E-mail:</strong> mamivibezala@gmail.com
                <br />
                <strong>Telefon:</strong> +36 30 385 2881
                <br />
                <strong>Weboldal:</strong> mamivibe.hu
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                2. Általános rendelkezések
              </h2>
              <p>
                Jelen Általános Szerződési Feltételek (továbbiakban: ÁSZF) a
                Mamivibe (továbbiakban: Szolgáltató) által nyújtott szoptatási
                tanácsadás szolgáltatásokra vonatkoznak. A weboldalon történő
                időpontfoglalással, illetve a szolgáltatás igénybevételével Ön
                (továbbiakban: Ügyfél) elfogadja jelen ÁSZF rendelkezéseit.
              </p>
              <p>
                A Szolgáltató fenntartja a jogot, hogy az ÁSZF-et egyoldalúan
                módosítsa. A módosításokról a weboldalon keresztül tájékoztatja
                az Ügyfeleket.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. Szolgáltatások</h2>
              <p>
                A Szolgáltató szoptatási tanácsadás szolgáltatásokat nyújt,
                amelyek magukban foglalhatják, de nem korlátozódnak az
                alábbiakra:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Személyes konzultáció</li>
                <li>Online konzultáció (videóhívás)</li>
                <li>Telefonos tanácsadás</li>
                <li>Otthoni látogatás</li>
              </ul>
              <p>
                A szolgáltatások pontos leírása, időtartama és díjszabása a
                weboldalon található.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                4. Időpontfoglalás és lemondás
              </h2>

              <h3 className="text-lg font-medium mt-6 mb-3">
                4.1. Időpontfoglalás
              </h3>
              <p>
                Az időpontfoglalás a weboldalon keresztül, telefonon vagy
                e-mailben történhet. A foglalás akkor válik érvényessé, amikor a
                Szolgáltató visszaigazolja azt.
              </p>

              <h3 className="text-lg font-medium mt-6 mb-3">
                4.2. Lemondás az Ügyfél részéről
              </h3>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>24 órával a konzultáció előtt:</strong> Ingyenes
                  lemondás vagy időpont módosítás lehetséges.
                </li>
                <li>
                  <strong>24 órán belül:</strong> A Szolgáltató fenntartja a
                  jogot, hogy a szolgáltatás díjának 50%-át felszámítsa.
                </li>
                <li>
                  <strong>Meg nem jelenés:</strong> A teljes szolgáltatási díj
                  felszámításra kerülhet.
                </li>
              </ul>

              <h3 className="text-lg font-medium mt-6 mb-3">
                4.3. Lemondás a Szolgáltató részéről
              </h3>
              <p>
                A Szolgáltató vis maior esetén (betegség, rendkívüli
                körülmények) jogosult lemondani vagy átütemezni a konzultációt.
                Ilyen esetben az Ügyfél választhat új időpontot, vagy
                visszakapja a már befizetett díjat.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                5. Fizetési feltételek
              </h2>
              <p>
                A szolgáltatás díja a konzultáció időpontjában, készpénzben vagy
                átutalással fizetendő, a Szolgáltató és az Ügyfél megállapodása
                szerint.
              </p>
              <p>
                A Szolgáltató a szolgáltatásról számlát állít ki az Ügyfél
                részére.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                6. A szolgáltatás jellege és korlátai
              </h2>
              <p>
                <strong>Fontos figyelmeztetés:</strong> A szoptatási tanácsadás
                nem helyettesíti az orvosi ellátást. A Szolgáltató által
                nyújtott tanácsok és információk kizárólag tájékoztató
                jellegűek.
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  A Szolgáltató nem orvos, és nem jogosult orvosi diagnózis
                  felállítására vagy kezelés előírására.
                </li>
                <li>
                  Egészségügyi probléma esetén az Ügyfélnek orvoshoz kell
                  fordulnia.
                </li>
                <li>
                  A Szolgáltató nem vállal felelősséget az Ügyfél által hozott
                  döntésekért és azok következményeiért.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">7. Titoktartás</h2>
              <p>
                A Szolgáltató a konzultáció során tudomására jutott
                információkat bizalmasan kezeli, és harmadik félnek nem adja ki,
                kivéve:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Ha az Ügyfél ehhez kifejezetten hozzájárul</li>
                <li>
                  Ha jogszabály kötelezi a Szolgáltatót az adatok kiadására
                </li>
                <li>
                  Ha az Ügyfél vagy más személy élete, testi épsége veszélyben
                  van
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                8. Szellemi tulajdon
              </h2>
              <p>
                A weboldalon található tartalmak (szövegek, képek, logók,
                grafikai elemek) a Szolgáltató szellemi tulajdonát képezik, és
                szerzői jogi védelem alatt állnak. Ezek felhasználása a
                Szolgáltató előzetes írásbeli engedélye nélkül tilos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                9. Felelősségkorlátozás
              </h2>
              <p>
                A Szolgáltató mindent megtesz a szolgáltatás magas színvonalú
                nyújtása érdekében, azonban nem vállal felelősséget:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>A weboldal esetleges technikai hibáiból eredő károkért</li>
                <li>
                  Az Ügyfél által megadott hibás adatokból eredő problémákért
                </li>
                <li>Vis maior eseményekből eredő károkért</li>
                <li>Az Ügyfél által hozott döntések következményeiért</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">10. Panaszkezelés</h2>
              <p>Panaszát az alábbi elérhetőségeken jelezheti:</p>
              <p>
                <strong>E-mail:</strong> mamivibezala@gmail.com
                <br />
                <strong>Telefon:</strong> +36 30 385 2881
              </p>
              <p>
                A Szolgáltató a panaszokat 30 napon belül kivizsgálja és írásban
                válaszol.
              </p>
              <p>
                Amennyiben a panasz elutasításra kerül, vagy a panaszkezelési
                határidő eredménytelenül telt el, az Ügyfél az alábbi szervekhez
                fordulhat:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Zala Vármegyei Békéltető Testület</strong>
                  <br />
                  Cím: 8900 Zalaegerszeg, Petőfi utca 24.
                  <br />
                  Telefon: +36 92 550 513
                  <br />
                  E-mail: zmbekelteto@zmkik.hu
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                11. Alkalmazandó jog és jogviták
              </h2>
              <p>
                Jelen ÁSZF-re a magyar jog az irányadó. A felek a vitás
                kérdéseket elsősorban békés úton kísérlik meg rendezni. Ennek
                sikertelensége esetén a jogviták eldöntésére a Szolgáltató
                székhelye szerinti bíróság illetékes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">12. Kapcsolat</h2>
              <p>Kérdéseivel, észrevételeivel forduljon hozzánk bizalommal:</p>
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
