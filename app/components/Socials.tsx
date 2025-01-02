import Link from "next/link"



import {FaGithub , FaLinkedinIn , FaInstagram} from "react-icons/fa"

type SocialProps = {
    containerStyles?: string; // Optional string type
    iconStyles?: string;      // Optional string type
  };

  const socials: { icon: JSX.Element; path: string }[] = [
    { icon: <FaGithub />, path: 'https://github.com/muhammadmoin14' },
    { icon: <FaLinkedinIn />, path: 'https://linkedin.com/in/themoin' },
    { icon: <FaInstagram />, path: 'https://instagram.com/muhammadmoin14' },
  ];
  
  const Social: React.FC<SocialProps> = ({ containerStyles, iconStyles }) => {
    return (
      <div className={containerStyles}>
        {socials.map((item, index) => (
          <Link           
          href={item.path}
          key={index}
          className={iconStyles}
          target="_blank"
          rel="noopener noreferrer">
              {item.icon}

          </Link>
        ))}
      </div>
    );
  }

export default Social