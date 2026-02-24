'use client';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { IoIosArrowDown } from 'react-icons/io';

export const languages = [
  {
    code: 'en',
    label: 'English',
    flag: '🇺🇸',
  },
  {
    code: 'th',
    label: 'ไทย',
    flag: '🇹🇭',
  },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const segments = String(pathname).split('/');
  const currentLocale = segments[1] || 'th';

  const handleChange = (locale: string) => {
    segments[1] = locale;
    router.push(segments.join('/'));
  };

  const currentLang = languages.find((lang) => lang.code === currentLocale) || languages[1];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant='bordered' endContent={<IoIosArrowDown />}>
          <span className='mr-2'>{currentLang.flag}</span>
          {currentLang.label}
        </Button>
      </DropdownTrigger>

      <DropdownMenu aria-label='Language Switcher' onAction={(key) => handleChange(String(key))}>
        {languages.map((lang) => (
          <DropdownItem key={lang.code}>
            <span className='mr-2'>{lang.flag}</span>
            {lang.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
