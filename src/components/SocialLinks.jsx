import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

import { SOCIAL_PROFILES } from '../config/marketing';

const icons = {
  facebook: FaFacebook,
  tiktok: FaTiktok,
  whatsapp: FaWhatsapp,
};

function SocialLinks({
  className = '',
  iconClassName = 'text-xl',
  linkClassName = 'text-sm font-semibold hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
}) {
  return (
    <nav aria-label="Young Eagles on social media" className={className}>
      <ul className="flex flex-wrap items-center gap-3">
        {SOCIAL_PROFILES.map((profile) => {
          const Icon = icons[profile.id];
          return (
            <li key={profile.id}>
              <a
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-full px-2 py-1 transition-colors ${linkClassName}`}
              >
                {Icon ? <Icon aria-hidden="true" className={iconClassName} /> : null}
                <span>{profile.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SocialLinks;
