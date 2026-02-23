import { FaPhoneVolume } from 'react-icons/fa6';

export type ISiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Numerologyx',
  description: 'เบอร์มงคลที่ช่วยให้คุณประสบความสำเร็จ',
  navItems: [
    {
      label: 'Variable Cost',
      href: '/',
      type: 'menu',
    },
    {
      label: 'Numerologyx',
      href: '/check',
      type: 'dropdown',
    },
  ],
  navMenuItems: [
    {
      label: 'วิเคราะห์เบอร์ของคุณ',
      href: '/',
      key: 'Numerologyx',
      icon: FaPhoneVolume,
    },

    {
      label: 'เบอร์มงคล',
      href: '/projects',
      key: 'Numerologyx',
      icon: FaPhoneVolume,
    },
  ],
  links: {
    github: 'https://github.com/hznutx',
    twitter: 'https://twitter.com/hznutx',
    discord: 'https://discord.gg/ZVkpqCWX',
    sponsor: 'https://i.ibb.co/8LhJnyht/image0.jpg',
  },
};
