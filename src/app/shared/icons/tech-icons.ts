import {
  siAndroidstudio,
  siAngular,
  siBootstrap,
  siCss,
  siDocker,
  siExpo,
  siExpress,
  siFastapi,
  siFirebase,
  siGooglemaps,
  siGsap,
  siHtml5,
  siJavascript,
  siKeycloak,
  siLaravel,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPrimeng,
  siPrisma,
  siPython,
  siReact,
  siSpringboot,
  siSqlalchemy,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVite,
  type SimpleIcon
} from 'simple-icons';
import {
  LOCAL_ADOBEILLUSTRATOR,
  LOCAL_ADOBEPHOTOSHOP,
  LOCAL_CANVA,
  LOCAL_OPENAI,
  LOCAL_REACTIVEX
} from './local-brand-icons';

export interface TechBadgeIcon {
  /** Display label — always the original technology string from data. */
  label: string;
  /** SVG path data for a 24×24 viewBox. */
  path: string;
  /** Brand or semantic hex without `#`. */
  hex: string;
  /** True when the fill is too dark for dark-mode backgrounds. */
  isDarkLogo: boolean;
  /**
   * True only for the last-resort code glyph.
   * Semantic capability icons are not treated as broken fallbacks.
   */
  isFallback: boolean;
}

type IconSource = Pick<SimpleIcon, 'path' | 'hex' | 'title'>;

/** Last-resort code brackets — should not appear once mapping is complete. */
const FALLBACK: IconSource = {
  title: 'Fallback',
  hex: '64748B',
  path: 'M8.5 6.5 3.75 12 8.5 17.5M15.5 6.5 20.25 12 15.5 17.5M13.25 4.5 10.75 19.5'
};

/** Semantic server-stack glyph for REST / HTTP integrations. */
const REST_API_ICON: IconSource = {
  title: 'REST API',
  hex: '0F766E',
  path:
    'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm0 5.75A2 2 0 0 1 6 9.75h12a2 2 0 0 1 2 2v1.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.5zM4 17.5A2 2 0 0 1 6 15.5h8a2 2 0 0 1 2 2V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 4 19v-1.5z'
};

/** Location-pin glyph for live geolocation features. */
const LIVE_LOCATION_ICON: IconSource = {
  title: 'Live Location',
  hex: 'E11D48',
  path:
    'M12 2.25c-3.728 0-6.75 2.94-6.75 6.563 0 4.922 6.75 12.937 6.75 12.937s6.75-8.015 6.75-12.937C18.75 5.19 15.728 2.25 12 2.25zm0 8.813a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5z'
};

/**
 * Shield + checkmark for Google reCAPTCHA / bot protection.
 * Brand mark is not redistributed; this is a deliberate semantic security icon.
 */
const RECAPTCHA_ICON: IconSource = {
  title: 'reCAPTCHA',
  hex: '1A73E8',
  path:
    'M12 2.25 4.5 5.25v5.4c0 4.65 3.15 8.99 7.5 10.1 4.35-1.11 7.5-5.45 7.5-10.1v-5.4L12 2.25zm-1.05 12.3-2.7-2.7 1.27-1.28 1.43 1.43 3.53-3.53 1.27 1.28-4.8 4.8z'
};

/**
 * Semantic migration glyph for Alembic (SQLAlchemy migrations).
 * No Simple Icons entry — layered DB + upward path.
 */
const ALEMBIC_ICON: IconSource = {
  title: 'Alembic',
  hex: 'D71F00',
  path:
    'M5 18.5c0-1.1 3.13-2 7-2s7 .9 7 2-3.13 2-7 2-7-.9-7-2zm0-4.25c0-1.1 3.13-2 7-2s7 .9 7 2v1.15c-1.55-.55-4-.9-7-.9s-5.45.35-7 .9V14.25zm7-9.5L8.2 9.6c-.55.65-.2 1.65.65 1.9H15.15c.85-.25 1.2-1.25.65-1.9L12 4.75zm0 1.85 1.55 1.85h-3.1L12 6.6zM6.5 12.1c.85-.35 2.7-.7 5.5-.7s4.65.35 5.5.7c-.4-.95-2.55-1.6-5.5-1.6s-5.1.65-5.5 1.6z'
};

function fromLocal(icon: { path: string; hex: string; title: string }): IconSource {
  return { path: icon.path, hex: icon.hex, title: icon.title };
}

/**
 * Canonical normalized key → icon source.
 * Keys must already be output from {@link normalizeTechKey}.
 */
const ICON_BY_KEY: Record<string, IconSource> = {
  // Frameworks / languages
  angular: siAngular,
  react: siReact,
  'react.js': siReact,
  'react js': siReact,
  'react native': siReact,
  reactnative: siReact,
  typescript: siTypescript,
  javascript: siJavascript,
  java: siOpenjdk,
  python: siPython,
  html: siHtml5,
  html5: siHtml5,
  css: siCss,

  // CSS / UI
  tailwind: siTailwindcss,
  'tailwind css': siTailwindcss,
  'tailwind css v4': siTailwindcss,
  'tailwindcss': siTailwindcss,
  'tailwindcss v4': siTailwindcss,
  bootstrap: siBootstrap,
  primeng: siPrimeng,

  // Runtime / backend
  node: siNodedotjs,
  'node.js': siNodedotjs,
  nodejs: siNodedotjs,
  'node js': siNodedotjs,
  express: siExpress,
  'express.js': siExpress,
  expressjs: siExpress,
  'express js': siExpress,
  nestjs: siNestjs,
  'nest.js': siNestjs,
  'spring boot': siSpringboot,
  springboot: siSpringboot,
  laravel: siLaravel,
  firebase: siFirebase,
  fastapi: siFastapi,
  'fast api': siFastapi,
  expo: siExpo,

  // Data
  postgresql: siPostgresql,
  postgres: siPostgresql,
  mysql: siMysql,
  prisma: siPrisma,
  prismaorm: siPrisma,
  'prisma orm': siPrisma,
  supabase: siSupabase,
  sqlalchemy: siSqlalchemy,
  'sql alchemy': siSqlalchemy,
  alembic: ALEMBIC_ICON,

  // Tooling
  docker: siDocker,
  vite: siVite,
  next: siNextdotjs,
  'next.js': siNextdotjs,
  nextjs: siNextdotjs,
  'next js': siNextdotjs,
  gsap: siGsap,
  greensock: siGsap,
  'android studio': siAndroidstudio,
  androidstudio: siAndroidstudio,
  keycloak: siKeycloak,

  // Maps / location
  'google maps': siGooglemaps,
  'google maps api': siGooglemaps,
  googlemaps: siGooglemaps,
  'live location': LIVE_LOCATION_ICON,
  livelocation: LIVE_LOCATION_ICON,
  geolocation: LIVE_LOCATION_ICON,

  // APIs / auth UX
  'rest api': REST_API_ICON,
  'rest apis': REST_API_ICON,
  'rest api integration': REST_API_ICON,
  rest: REST_API_ICON,
  restapi: REST_API_ICON,
  recaptcha: RECAPTCHA_ICON,
  'google recaptcha': RECAPTCHA_ICON,
  'google recaptcha api': RECAPTCHA_ICON,

  // Design / AI (local brand assets)
  canva: fromLocal(LOCAL_CANVA),
  illustrator: fromLocal(LOCAL_ADOBEILLUSTRATOR),
  'adobe illustrator': fromLocal(LOCAL_ADOBEILLUSTRATOR),
  photoshop: fromLocal(LOCAL_ADOBEPHOTOSHOP),
  'adobe photoshop': fromLocal(LOCAL_ADOBEPHOTOSHOP),
  rxjs: fromLocal(LOCAL_REACTIVEX),
  reactivex: fromLocal(LOCAL_REACTIVEX),
  'reactive x': fromLocal(LOCAL_REACTIVEX),
  openai: fromLocal(LOCAL_OPENAI),
  'openai chat api': fromLocal(LOCAL_OPENAI),
  'openai api': fromLocal(LOCAL_OPENAI),
  chatgpt: fromLocal(LOCAL_OPENAI)
};

/** Normalize casing, punctuation, and common aliases from projects.json. */
export function normalizeTechKey(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[_/+,]+/g, ' ')
    .replace(/\.(js|ts)$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function luminance(hex: string): number {
  const raw = hex.replace('#', '');
  const value =
    raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw;
  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function toBadge(label: string, source: IconSource, isFallback = false): TechBadgeIcon {
  const hex = source.hex.replace('#', '').toUpperCase();
  return {
    label,
    path: source.path,
    hex,
    isDarkLogo: luminance(hex) < 0.35,
    isFallback
  };
}

/**
 * Resolve a technology label from project data to a badge icon.
 * Unknown technologies receive the last-resort code glyph.
 */
export function resolveTechIcon(name: string): TechBadgeIcon {
  const label = name?.trim() || 'Technology';
  const key = normalizeTechKey(label);
  const source = ICON_BY_KEY[key];

  if (source) {
    return toBadge(label, source);
  }

  // Soft alias: strip trailing "api" / "integration" words once.
  const softened = key
    .replace(/\bintegration\b/g, '')
    .replace(/\bapis?\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (softened && softened !== key && ICON_BY_KEY[softened]) {
    return toBadge(label, ICON_BY_KEY[softened]);
  }

  return toBadge(label, FALLBACK, true);
}

/** Map a full technology list to badge icons (stable order preserved). */
export function resolveTechIcons(names: string[] | undefined | null): TechBadgeIcon[] {
  return (names || []).filter(Boolean).map((name) => resolveTechIcon(name));
}
