import Link from 'next/link';
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/config';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-gray-500 leading-relaxed">
              Professzionális szoptatási tanácsadás és támogatás az anyaság
              útján.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Navigáció</h4>
            <ul className="space-y-3">
              {NAV_ITEMS.slice(0, 3).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-pink-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Kapcsolat</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-500 gap-3">
                <FaEnvelope className="text-pink-500" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-pink-500 transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-center text-gray-500 gap-3">
                <FaPhone className="text-pink-500" />
                <a
                  href="tel:+36301234567"
                  className="hover:text-pink-500 transition-colors"
                >
                  +36 30 123 4567
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Kövess minket</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-pink-500 hover:shadow-md transition-all"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-pink-500 hover:shadow-md transition-all"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Minden jog
            fenntartva.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
