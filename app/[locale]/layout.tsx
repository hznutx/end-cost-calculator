import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import { Prompt } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import { Providers } from './providers';

import { siteConfig } from '@/config/site';
import { fontSans, prompt } from '@/config/fonts';
import { Navbar } from '@/components/navbar';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  // manifest: '/manifest.json',
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

const locales = ['en', 'th'];

export default async function LocaleLayout(props: any) {
  const { children, params } = props;

  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <Toaster position='top-center' containerClassName={clsx(prompt.className)} />
          <div className='relative flex flex-col h-screen'>
            <Navbar />
            <main className={clsx(prompt.className, 'container mx-auto max-w-7xl p-6 flex-grow')}>{children}</main>
            <footer className='w-full flex items-center justify-center py-3'>
              <span className='text-xs text-default-600 pr-2'>Copyright © {new Date().getFullYear()}</span>
              <p className='text-xs text-cyan-700'>hznutx all rights reserved</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
