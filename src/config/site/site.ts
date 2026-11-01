// Every business detail lives here. Change it once and every page follows.
// Anything marked PLACEHOLDER was not supplied for the build and must be replaced before launch.

export type ServiceCategory = "Repairs" | "Fitting" | "Heating";

type Service = {
  id: string;
  title: string;
  label: string;
  category: ServiceCategory;
  short: string;
  detail: string;
  jobs: string[];
  image: string;
  alt: string;
};

// Only add real reviews, used with the customer's permission. The section stays hidden while this is empty.
type Review = { quote: string; name: string; place: string };

// Only add schemes the business really belongs to, with a registration number where there is one.
// The section stays hidden while this is empty. Never list Gas Safe, WaterSafe, CIPHE and so on unless it's true.
type Accreditation = { name: string; number?: string; href: string };

// PLACEHOLDER: yes or no. Set to true if you take emergency call-outs, and the wording across the site changes to match.
const emergency: boolean = false;

export const site = {
  name: "Your Plumbing Co", // PLACEHOLDER
  legalName: "Your Plumbing Co", // PLACEHOLDER: the trading or company name for the footer and privacy policy
  copyrightYear: 2026,
  area: "your area", // PLACEHOLDER: reads in a sentence, for example "South Manchester"
  areas: [] as string[], // PLACEHOLDER: towns or postcodes, for example ["Didsbury", "Chorlton", "Sale"]
  locale: "en_GB",
  url: "http://localhost:3000", // TODO: real link

  emergency,

  phone: {
    display: "020 7946 0123", // PLACEHOLDER: from Ofcom's range reserved for fiction, so it reaches nobody
    href: "#", // TODO: real link, for example tel:+442079460123. Every call button on the site uses this.
  },

  email: {
    display: "hello@your-plumbing-co.example", // PLACEHOLDER
    href: "#", // TODO: real link, for example mailto:hello@yourdomain.co.uk
  },

  hours: [] as { days: string; time: string }[], // PLACEHOLDER: for example [{ days: "Mon to Fri", time: "08:00 to 18:00" }]. Hidden while empty.

  social: [
    { label: "Facebook", href: "#" }, // TODO: real link
    { label: "Instagram", href: "#" }, // TODO: real link
  ],

  reviews: [] as Review[],
  accreditations: [] as Accreditation[],

  nav: [
    { label: "Services", href: "/services" },
    { label: "How we work", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  quoteHref: "/quote",

  // PLACEHOLDER: a typical domestic list, to be checked against what the business really does.
  // Boilers and gas appliances are left out on purpose, because that work legally requires Gas Safe registration.
  services: [
    {
      id: "leaks",
      title: "Leaks and repairs",
      label: "A leak",
      category: "Repairs",
      short: "Drips, damp patches and pipes that have started misbehaving.",
      detail:
        "We find where the water is really coming from, which isn't always where the stain is, then fix the cause rather than the symptom.",
      jobs: ["Leaking pipes and joints", "Dripping taps", "Stuck or seized stopcocks", "Overflows that won't stop running"],
      image: "/images/tap-drip.jpg",
      alt: "A tap with a drop of water falling from the spout",
    },
    {
      id: "blockages",
      title: "Blocked sinks and toilets",
      label: "A blockage",
      category: "Repairs",
      short: "Slow plugholes, gurgling waste pipes and toilets that won't clear.",
      detail:
        "A blockage rarely gets better by itself. We clear it, check the waste pipe is running properly, and tell you if something is likely to cause it again.",
      jobs: ["Kitchen and bathroom sinks", "Baths and showers", "Toilets", "Waste pipes and traps"],
      image: "/images/sink-steel.jpg",
      alt: "A stainless steel sink and plughole seen from above",
    },
    {
      id: "taps-toilets",
      title: "Taps, toilets and sinks",
      label: "Taps and toilets",
      category: "Fitting",
      short: "Swapping the old one out, or fixing it if that makes more sense.",
      detail:
        "Bought your own tap or want a recommendation? Either works. If a repair is the better value, we'll say so before you buy anything new.",
      jobs: ["New taps and mixers", "Toilet repairs and replacements", "Sinks and basins", "Washing machines and dishwashers plumbed in"],
      image: "/images/tap-kitchen.jpg",
      alt: "A curved steel tap over a double kitchen sink",
    },
    {
      id: "bathrooms",
      title: "Bathrooms and showers",
      label: "A bathroom or shower",
      category: "Fitting",
      short: "The plumbing for a new bathroom, or just a shower that works.",
      detail:
        "From one new shower to a full suite, we plan the pipework first so everything ends up where you actually want it.",
      jobs: ["Bathroom suites", "Showers and shower valves", "Baths and basins", "Moving pipework for a new layout"],
      image: "/images/bathroom-bright.jpg",
      alt: "A bright bathroom with a glass shower and a long vanity unit",
    },
    {
      id: "radiators",
      title: "Radiators and towel rails",
      label: "Radiators",
      category: "Heating",
      short: "Cold spots, noisy pipes and radiators in the wrong place.",
      detail:
        "We work on the radiators and the pipes that feed them. If a room never quite warms up, it's often a simple fix.",
      jobs: ["New and replacement radiators", "Moving a radiator", "Towel rails", "Valves, bleeding and balancing"],
      image: "/images/radiator-green.jpg",
      alt: "A white column radiator on a pale green wall",
    },
    {
      id: "pipework",
      title: "Pipework and water supply",
      label: "Pipes and pressure",
      category: "Repairs",
      short: "New pipes, outside taps and anything to do with the water coming in.",
      detail:
        "Tidy, properly clipped pipework that you won't hear knocking at night, whether it's one outside tap or a run through the whole house.",
      jobs: ["New and replacement pipework", "Outside taps", "New stopcocks", "Low water pressure checks"],
      image: "/images/copper-pipes.jpg",
      alt: "Two copper pipes running up an open wall",
    },
  ] satisfies Service[],

  // PLACEHOLDER: promises the business has to be happy to keep. Change or remove any that aren't true.
  promises: [
    {
      title: "You see the price first",
      text: "We agree the price before any work starts. If something changes once the floor's up, we stop and talk to you.",
    },
    {
      title: "We tell you when we're coming",
      text: "You get a time to expect us, and a call if we're running late, so you don't lose a whole day waiting in.",
    },
    {
      title: "We explain it in plain English",
      text: "You'll know what went wrong, what we did about it and whether anything else needs watching.",
    },
    {
      title: "We clean up after ourselves",
      text: "Dust sheets go down first, old parts leave with us, and the room is left the way we found it.",
    },
  ],

  // PLACEHOLDER: the practical answers describe how a business like this usually works, so check them.
  faqs: [
    {
      question: "Where's my stopcock?",
      answer:
        "Usually under the kitchen sink, where the mains pipe comes into the house. If it isn't there, try a downstairs toilet, an airing cupboard or under the stairs. Turn it clockwise to shut off the water. It's worth finding before you need it.",
    },
    {
      question: "I can smell gas. Can you help?",
      answer:
        "Don't call a plumber for this. Open the windows, don't touch any switches, leave the building and call the National Gas Emergency Service straight away on 0800 111 999. It's free and open all day and night.",
    },
    {
      question: "Do you work on boilers?",
      answer:
        "Not at the moment. Boilers and gas appliances can legally only be worked on by a Gas Safe registered engineer, so that's who you need for those jobs. We can look after the radiators and pipework.",
    },
    {
      question: emergency ? "Do you take emergency call-outs?" : "Can you come out in an emergency?",
      answer: emergency
        ? "Yes. Call us rather than using the form, turn off your stopcock if you can, and we'll tell you when we can be with you."
        : "We don't run an emergency call-out service, but do call us. If we can't get to you quickly, we'll say so straight away, so you can ring someone who can.",
    },
    {
      question: "How do I get a price?",
      answer:
        "Fill in the quote form or give us a call. We can often give you a rough idea for a simple job over the phone. Bigger jobs usually need a quick look first.",
    },
    {
      question: "Do I need to be at home?",
      answer:
        "Someone over 18 should be there when we arrive so we can agree the work. After that, it depends on the job, and we can talk it through.",
    },
  ],
};

export type Site = typeof site;
