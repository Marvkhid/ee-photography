export type FeaturedSlide = { src: string; alt: string }

/** Photographs in the "Moments That Matter" carousel. The third entry opens as the active slide. */
export const featuredSlides: readonly FeaturedSlide[] = [
  { src: '/images/featured/featured-01.jpg', alt: 'Wedding couple standing forehead to forehead' },
  { src: '/images/featured/featured-02.jpg', alt: 'Smiling couple in traditional wedding attire' },
  { src: '/images/featured/featured-03.jpg', alt: 'Portrait of a man in blue and red studio light' },
  { src: '/images/featured/featured-04.jpg', alt: 'Smiling woman in front of a pink backdrop' },
  { src: '/images/featured/featured-05.jpg', alt: 'Woman seated on a dark studio floor' },
  { src: '/images/featured/featured-06.jpg', alt: 'Portrait of a woman in warm golden studio light' },
  { src: '/images/featured/featured-07.jpg', alt: 'Three generations of a family smiling together' },
]

export const FEATURED_START_INDEX = 2

export type Project = {
  id: string
  title: string
  category: string
  cover: string
  alt: string
  href: string
}

export const projects: readonly Project[] = [  { id: 'project-01',
    title: 'Project 01',
    category: 'Portrait photography',
    cover: '/images/projects/project-01.jpg',
    alt: 'Three generations of a family smiling together in black and white',
    href: '/contact',
  },
  {
    id: 'project-02',
    title: 'Project 02',
    category: 'Wedding photography',
    cover: '/images/projects/project-02.jpg',
    alt: 'Wedding couple standing forehead to forehead',
    href: '/contact',
  },
  {
    id: 'project-03',
    title: 'Project 03',
    category: 'Birthday portrait',
    cover: '/images/projects/project-03.jpg',
    alt: 'Birthday portrait of a smiling girl on patterned fabric',
    href: '/contact',
  },
]

export type Step = { title: string; description: string }

/** The intended client journey, shown as a numbered sequence. */
export const experienceSteps: readonly Step[] = [
  { title: 'Share your vision', description: 'Tell me about the moment and what matters to you.' },
  { title: 'Choose the style', description: 'Pick the look and approach that suits your story.' },
  { title: 'Plan the session', description: 'Agree the date, place and shape of the day.' },
  { title: 'The shoot', description: 'Relaxed direction, natural light and real emotion.' },
  { title: 'The delivery', description: 'Your finished photographs, ready to keep.' },
]

export type Reason = { title: string; description: string }

export const reasons: readonly Reason[] = [
  { title: 'A personal approach', description: 'Your vision leads every session.' },
  { title: 'Real moments, real emotion', description: 'Naturality with creative flair.' },
  { title: 'Considered light and composition', description: 'Clarity in every frame.' },
  { title: 'Explore before you enquire', description: 'Browse relevant work by category.' },
  { title: 'A clear enquiry process', description: 'One simple form, or WhatsApp.' },
]

export type Faq = { question: string; answer: string }

export const faqs: readonly Faq[] = [
  {
    question: 'How do I book a session?',
    answer: 'Use the enquiry form on the Contact page, or message on WhatsApp.',
  },
  {
    question: 'What do you photograph?',
    answer: 'Portraits, weddings and birthdays. More categories appear as they are confirmed.',
  },
  {
    question: 'How can I share my ideas?',
    answer: 'Describe them in the enquiry form, or send a message on WhatsApp.',
  },
  {
    question: 'Can I ask about a particular date?',
    answer: 'Yes. Add your preferred date to the enquiry form.',
  },
  {
    question: 'How do I contact the studio?',
    answer: 'By WhatsApp, Instagram, phone or email. All are listed on the Contact page.',
  },
]
