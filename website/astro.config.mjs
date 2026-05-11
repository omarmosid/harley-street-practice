// @ts-check
import {
  defineConfig,
  fontProviders,
} from "astro/config";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: "https://londonhealthcheck.uk",
  integrations: [mdx(), sitemap()],

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: [
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "sans-serif",
      ],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Fraunces",
      cssVariable: "--font-fraunces",
      weights: [400, 500, 600],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"],
    },
  ],

  adapter: cloudflare({
    imageService: "compile",
  }),

  vite: {
    plugins: [tailwindcss()],
  },
});
