export const INTRO_EVENTS = {
  /** Fired by the footer button to replay the curtain reveal. */
  replay: 'ee:intro-replay',
  /** Fired when an intro run begins, so the hero can hide its elements. */
  start: 'ee:intro-start',
  /** Fired when the hero should animate in (the curtains are opening). */
  heroIn: 'ee:hero-in',
  /** Fired when the intro has fully finished or was skipped. */
  done: 'ee:intro-done',
} as const

const STORAGE_KEY = 'ee-intro-seen'

export type IntroState = 'pending' | 'done'

export const hasSeenIntro = (): boolean => {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export const markIntroSeen = (): void => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* storage can be unavailable in private modes; the intro simply replays next visit */
  }
}

export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const setIntroState = (state: IntroState): void => {
  document.documentElement.dataset.intro = state
}

export const getIntroState = (): string | undefined => document.documentElement.dataset.intro

/** Runs before first paint (inline in <head>) so the homepage never flashes before the curtain. */
export const INTRO_BOOT_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');try{var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var s=window.sessionStorage.getItem('${STORAGE_KEY}')==='1';if(!r&&!s){d.setAttribute('data-intro','pending');if('scrollRestoration' in history){history.scrollRestoration='manual'}window.scrollTo(0,0);setTimeout(function(){if(d.getAttribute('data-intro')==='pending'&&d.getAttribute('data-intro-started')!=='1'){d.setAttribute('data-intro','done')}},20000)}}catch(e){}setTimeout(function(){if(d.getAttribute('data-motion')!=='ready'){d.classList.remove('js')}},6000)})();`
