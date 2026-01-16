import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className="w-full py-8 mt-auto border-t border-white/5 bg-deep-black z-10 relative">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-space-mono text-silver/60 uppercase tracking-widest">

                {/* Copyright */}
                <div className="order-2 md:order-1">
                    &copy; {new Date().getFullYear()} {t('footer.rights')}
                </div>

                {/* Links */}
                <div className="flex items-center gap-8 order-1 md:order-2">
                    <Link to="/legals" className="hover:text-darkroom-red transition-colors">
                        {t('footer.legals')}
                    </Link>

                    <Link to="/photographe-argentique" className="hover:text-darkroom-red transition-colors hidden md:block">
                        Photographe Argentique Paris
                    </Link>


                    <a
                        href="https://instagram.com/borntwolate"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t('footer.instagram_aria')}
                        className="hover:text-darkroom-red transition-colors flex items-center gap-2"
                    >
                        <span>Instagram</span>
                        <Instagram size={12} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
