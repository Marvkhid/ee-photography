import type { CategorySlug } from '@/data/categories'

/**
 * Testimonials.
 *
 * Placeholder records below are draft copy used to demonstrate the page layout. Replace them
 * with real client quotes (verified: true) and their approved display names when available.
 * Photographs are gallery or licensed illustrative images; none is presented as the person
 * who wrote a quote.
 */
export type Testimonial = {
  id: string
  quote: string
  /** Display name, initials or anonymous label the client approved to share. */
  name: string
  category?: CategorySlug
  /** A real client's photograph. Only ever set with that person's permission. */
  image?: string
  /** Only set when the client gave a rating. */
  rating?: 1 | 2 | 3 | 4 | 5
  verified: boolean
}

type SampleInput = {
  id: string
  quote: string
  name: string
  category?: CategorySlug
  rating?: 1 | 2 | 3 | 4 | 5
}

const sample = ({ category, id, name, quote, rating }: SampleInput): Testimonial => ({
  id,
  quote,
  name,
  ...(category ? { category } : {}),
  ...(rating ? { rating } : {}),
  verified: false,
})

export const testimonials: readonly Testimonial[] = [
  /* ---------- Birthdays ---------- */
  sample({
    id: 'birthday-01',
    category: 'birthdays',
    rating: 5,
    name: 'Adaeze K.',
    quote:
      'I gave Ebere the idea I had for my birthday shoot — the colours, the mood, the whole thing — and he carried the vision like it was his own birthday. The pictures came out really clean, and they told my story exactly how I wanted it to be told. Every image had something special about it, and I honestly could not have asked for a better experience.',
  }),
  sample({
    id: 'birthday-02',
    category: 'birthdays',
    name: 'Zainab',
    quote: 'Simple studio setup, huge result. I got my whole feed out of one session and I am still not tired of them.',
  }),
  sample({
    id: 'birthday-03',
    category: 'birthdays',
    rating: 5,
    name: 'Uncle Kelechi · 40th',
    quote:
      'For my 40th I wanted something I could hang in the house, not just post and forget. Ebere asked what the day meant to me before he lifted the camera, and you can feel that answer in the portrait. My wife framed it, and it is the first thing you see when you walk into the sitting room.',
  }),
  sample({
    id: 'birthday-04',
    category: 'birthdays',
    name: 'Somto',
    quote:
      'I had three outfit changes and no idea which of them actually worked together. He arranged them, told me why, and the last look — the one I would have dropped — came out the best of the set.',
  }),
  sample({
    id: 'birthday-05',
    category: 'birthdays',
    rating: 5,
    name: 'The Nwosu family',
    quote:
      'Two children under six, a cake that had to survive, and a grandfather who does not do photographs. He still got every laugh, and nobody is crying in a single frame.',
  }),
  sample({
    id: 'birthday-06',
    category: 'birthdays',
    name: 'Blessing O.',
    quote: 'Ten minutes in, I forgot there was a camera. That is the whole review.',
  }),
  sample({
    id: 'birthday-07',
    category: 'birthdays',
    name: 'First-time client · Yaba',
    quote:
      'The enquiry form took two minutes, the price was already on the website, and on the day he had read everything I wrote. No back-and-forth, no surprises, just an easy session.',
  }),

  /* ---------- Weddings ---------- */
  sample({
    id: 'wedding-01',
    category: 'weddings',
    rating: 5,
    name: 'Ifeoma & Emeka',
    quote:
      'Our traditional wedding was in the morning and the white wedding came a month later, and Ebere moved with both as if he had been part of the family for years. He knew exactly when to disappear and when to step in. My mother keeps finding new pictures in the album that nobody told her about — that is how deep the coverage went.',
  }),
  sample({
    id: 'wedding-02',
    category: 'weddings',
    rating: 5,
    name: 'Tunde & Bisi',
    quote:
      'My husband said he would “just stand there”. Ebere spent the first twenty minutes making him laugh instead of posing him, and by the end he was the one suggesting shots. The pre-wedding pictures look like us on our best day, not like two people taking instructions.',
  }),
  sample({
    id: 'wedding-03',
    category: 'weddings',
    name: 'Chidinma & Segun',
    quote: 'The rain started forty minutes before the reception. We panicked. He did not. The wet-ground shots ended up being everybody’s favourite.',
  }),
  sample({
    id: 'wedding-04',
    category: 'weddings',
    rating: 5,
    name: 'A. O. · London',
    quote:
      'I planned my wedding from London and we met Ebere exactly once, on a video call. He took notes about the family I had told him about — who mattered, who hates photographs — and all of it is visible in the gallery. He photographed strangers as if somebody had already told him their names.',
  }),
  sample({
    id: 'wedding-05',
    category: 'weddings',
    name: 'The Adebayo wedding',
    quote: 'Clear quote, clear timeline, no surprises on the day. That alone is rare, and then the pictures arrived and reminded us why we booked.',
  }),
  sample({
    id: 'wedding-06',
    category: 'weddings',
    rating: 5,
    name: 'Nkem & Femi',
    quote:
      'The concept I sent was honestly a bit impossible — night shoot, city lights, no permits secured. He found a location in two days, worked with what was there, and made the whole thing look expensive.',
  }),
  sample({
    id: 'wedding-07',
    category: 'weddings',
    name: 'Ada & Chidi',
    quote:
      'What sold us was the engagement call. He did not talk about packages first; he asked how we met. The pictures from the day sound like that conversation.',
  }),

  /* ---------- Graduations ---------- */
  sample({
    id: 'graduation-01',
    category: 'graduations',
    rating: 5,
    name: 'First-class graduate · UNN',
    quote:
      'I walked in with a borrowed gown and a lot of pride, and walked out with pictures that made my dad cry. He kept saying he did not know I was “this serious”. Ebere even got a frame of my supervisor that looked like a magazine cover.',
  }),
  sample({
    id: 'graduation-02',
    category: 'graduations',
    name: 'Chiamaka',
    quote: 'Parents, siblings, friends — he grouped everybody so smoothly that nobody felt herded, and the whole thing took under an hour.',
  }),
  sample({
    id: 'graduation-03',
    category: 'graduations',
    rating: 5,
    name: 'Mr. & Mrs. Eze · diaspora',
    quote:
      'Our daughter graduated while we were abroad. Ebere handled the family session my wife insisted on and sent everything to me the same week. In a few of those photographs I genuinely feel like I was in the room.',
  }),
  sample({
    id: 'graduation-04',
    category: 'graduations',
    rating: 4,
    name: 'Kelechi J.',
    quote:
      'Good session overall. He was patient while the gown kept slipping and found a light that flattered the colour perfectly. Delivery took a day or two longer than we expected, but the selection made up for it.',
  }),

  /* ---------- Portraits: family, maternity, creative ---------- */
  sample({
    id: 'portrait-01',
    category: 'portraits',
    rating: 5,
    name: 'Family of three generations · Port Harcourt',
    quote:
      'One frame with three generations was my grandmother’s idea, not ours. Ebere managed the seating, the heights and my grandmother’s mood, and nobody looks forced. That photograph now hangs in every home in this family.',
  }),
  sample({
    id: 'portrait-02',
    category: 'portraits',
    rating: 5,
    name: 'First-time mum · Ada',
    quote:
      'I was so sure I would hate maternity pictures. He showed me the back of the camera after one frame and I stopped worrying. Eight months later, I am glad we have them.',
  }),
  sample({
    id: 'portrait-03',
    category: 'portraits',
    name: 'Ifunanya',
    quote: 'The light did most of the work and he still adjusted it every time I moved. Patient is the word I would use.',
  }),
  sample({
    id: 'portrait-04',
    category: 'portraits',
    rating: 5,
    name: 'Baby T’s mum',
    quote:
      'He worked around naps, feeds and one very uncooperative newborn, and nothing about the session felt rushed. The sleeping shots look effortless. They were not.',
  }),
  sample({
    id: 'portrait-05',
    category: 'portraits',
    name: 'Lookbook shoot · Lagos label',
    quote:
      'We needed eight looks for a lookbook in one tight day. He kept his reference board on his phone and checked it between frames — the consistency across the whole set is what our team noticed first.',
  }),
  sample({
    id: 'portrait-06',
    category: 'portraits',
    name: 'Miracle',
    quote: 'I came to fix my profile picture and left with an actual confidence boost.',
  }),
  sample({
    id: 'portrait-07',
    category: 'portraits',
    rating: 5,
    name: 'Dabira',
    quote:
      'He put me in red light I would never have agreed to, and it became my favourite photograph of myself. That is what “creative” should mean — you are shown a version of you that already existed.',
  }),
  sample({
    id: 'portrait-08',
    category: 'portraits',
    name: 'The Obi household',
    quote: 'Sunday afternoon, four people and a dog who does not take direction. He still delivered a clean set by Tuesday.',
  }),

  /* ---------- Headshots & personal branding ---------- */
  sample({
    id: 'headshot-01',
    category: 'headshots',
    rating: 5,
    name: 'Consultant · Lagos',
    quote:
      'I needed headshots that did not look like passport photos. He gave me three variations — warm, neutral, sharp — and my company has used one on the website and another on the pitch deck since.',
  }),
  sample({
    id: 'headshot-02',
    category: 'headshots',
    name: 'Emerging model · Abuja',
    quote:
      'My first proper gallery shoot. He directed every pose, but it never felt like a copied tutorial, and the agency approved the set without a single note.',
  }),
  sample({
    id: 'headshot-03',
    category: 'headshots',
    rating: 5,
    name: 'HR lead · team of twelve',
    quote: 'Twelve people, twelve opinions about their good side. He finished before lunch and nobody asked for a retake.',
  }),
  sample({
    id: 'headshot-04',
    category: 'headshots',
    name: 'Ifeanyi',
    quote: 'Clean, quick, professional. Exactly what a headshot should be.',
  }),

  /* ---------- Events ---------- */
  sample({
    id: 'event-01',
    category: 'events',
    rating: 5,
    name: 'Event organiser · Calabar',
    quote:
      'The drums were loud, the crowd never stopped moving, and he still came back with the faces we wanted — the ones you only notice later, in the album, and then cannot stop looking at.',
  }),
  sample({
    id: 'event-02',
    category: 'events',
    name: 'Aunty Chioma · baby shower',
    quote: 'She caught the surprise on my sister’s face before I had even turned around. How, I still do not know.',
  }),
  sample({
    id: 'event-03',
    category: 'events',
    name: 'Community fundraiser',
    quote: 'A full day with minimal direction from us, and the gallery covered every sponsor and every child there. Solid, unobtrusive work.',
  }),

  /* ---------- Diaspora & remote booking ---------- */
  sample({
    id: 'remote-01',
    category: 'portraits',
    rating: 5,
    name: 'Visiting home · Toronto',
    quote:
      'I had one weekend in Nigeria and a long list of relatives to see. He fitted the shoot in on a Sunday morning, sent a preview that evening, and the full gallery before my flight back.',
  }),
  sample({
    id: 'remote-02',
    category: 'portraits',
    name: 'Remote client · Dubai',
    quote:
      'I sent a mood board at midnight and expected questions the next day. Instead I got a reply with a plan, a location and a weather alternative — everything I had thought of, plus two things I had not.',
  }),
  sample({
    id: 'remote-03',
    category: 'weddings',
    name: 'Booked from Atlanta',
    quote: 'Booking from abroad was simpler than ordering food. Clear prices, a clear form, and delivery through a link that just worked.',
  }),

  /* ---------- Craft: direction, patience, detail, professionalism ---------- */
  sample({
    id: 'craft-01',
    category: 'portraits',
    name: 'Private client',
    quote:
      'I told him I am terrible in front of cameras. He said that is normal, then spent the first ten minutes not photographing me at all. By the time he started, I had forgotten to be awkward.',
  }),
  sample({
    id: 'craft-02',
    category: 'portraits',
    rating: 5,
    name: 'Adaku',
    quote:
      'He straightened a sleeve, moved a chair four inches, waited for the light to come back. Small things I only noticed in the finished pictures — which is exactly the point.',
  }),
  sample({
    id: 'craft-03',
    category: 'portraits',
    name: 'Chinedu',
    quote: 'Every instruction was one sentence, and it always made sense. No standing around wondering what to do with my hands.',
  }),
  sample({
    id: 'craft-04',
    category: 'weddings',
    rating: 5,
    name: 'The Uchendu family',
    quote:
      'Quote the same day, session on Sunday, gallery on Wednesday. He communicated the whole way through, including the parts we got wrong on our side.',
  }),
  sample({
    id: 'craft-05',
    category: 'portraits',
    name: 'Client · creative shoot',
    quote:
      'Ebere hears the vision, repeats it back to you better than you said it, and then hands you exactly that — plus a version you did not know you wanted. Twice now the extra frame has been the one we used.',
  }),
  sample({
    id: 'craft-06',
    category: 'portraits',
    rating: 5,
    name: 'Oge',
    quote: 'Ebere hears you. Then he shoots it.',
  }),
  sample({
    id: 'craft-07',
    category: 'portraits',
    rating: 5,
    name: 'Mother of three',
    quote:
      'Three children, two moods and one very short patience window. He got the shot where everybody looks like they like each other — and somehow it is true.',
  }),
  sample({
    id: 'craft-08',
    category: 'portraits',
    rating: 4,
    name: 'Tolu',
    quote:
      'Great session and I love the pictures. The studio was warmer than expected that afternoon and we ran a little over time, but he made up for it with the selection he gave us in the end.',
  }),
  sample({
    id: 'craft-09',
    category: 'birthdays',
    name: 'Student · anniversary shoot',
    quote:
      'I booked as a student and expected to be treated like one. Nothing about the session felt scaled down — same attention, same light, same delivery as anybody else’s.',
  }),
  sample({
    id: 'craft-10',
    category: 'portraits',
    name: 'Sunday B.',
    quote:
      'What stayed with me is the restraint. He took fewer frames than I expected and every one of them had a reason to exist.',
  }),
]

export const getDisplayTestimonials = (): readonly Testimonial[] => {
  const verified = testimonials.filter((testimonial) => testimonial.verified)

  return verified.length > 0 ? verified : testimonials
}

export const hasVerifiedTestimonials = (): boolean =>
  testimonials.some((testimonial) => testimonial.verified)
