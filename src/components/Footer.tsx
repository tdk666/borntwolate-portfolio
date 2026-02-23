import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NewsletterSignup } from './NewsletterSignup';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className="w-full py-8 mt-auto border-t border-white/5 bg-deep-black z-10 relative">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-space-mono text-silver uppercase tracking-widest">

                {/* Newsletter */}
                <div className="order-1 w-full md:w-auto md:order-2">
                    <NewsletterSignup />
                </div>

                {/* Copyright */}
                <div className="order-3 md:order-1 pt-6 md:pt-0">
                    &copy; {new Date().getFullYear()} {t('footer.rights')}
                </div>

                {/* Links */}
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 order-2 md:order-3 pt-6 md:pt-0">
                    <Link to="/legals" className="hover:text-darkroom-red transition-colors">
                        {t('footer.legals')}
                    </Link>

                    <Link to="/photographe-argentique" className="hover:text-darkroom-red transition-colors">
                        <span className="md:hidden">{t('nav.photographer')}</span>
                        <span className="hidden md:inline">Photographe Argentique Paris</span>
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
