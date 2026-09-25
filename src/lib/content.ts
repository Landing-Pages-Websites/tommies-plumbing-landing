import { OFFER_EXPIRY, PHONE_DISPLAY } from "@/lib/site-config";

export interface ServiceItem {
  id: string;
  tag: string;
  title: string;
  body: string;
  points: string[];
  image: { src: string; alt: string };
}

export const SERVICES: ServiceItem[] = [
  {
    id: "water-heaters",
    tag: "Tank & tankless",
    title: "Water heaters and tankless heaters",
    body: "Reliable hot water starts with the right plumber. Tommie's services all makes and models — gas and electric standard tank units — and installs and services tankless water heaters.",
    points: ["Replacement and new installation", "Gas and electric tank units", "Tankless installation and service"],
    image: {
      src: "/brand/photos/water-heater-install.jpg",
      alt: "Plumber connecting copper supply lines to a new tank water heater in a home utility room",
    },
  },
  {
    id: "repipes",
    tag: "Whole-home",
    title: "Whole-home repipes",
    body: "When aging supply lines keep causing trouble, replacing the piping throughout the house can stop the cycle of patch-and-repeat repairs.",
    points: ["Pipe replacement throughout the home", "Clear explanation before work starts"],
    image: {
      src: "/brand/photos/repipe-rough-in.jpg",
      alt: "New red and blue water supply lines run through open wall framing during a repipe",
    },
  },
  {
    id: "busted-pipes",
    tag: "Urgent repairs",
    title: "Busted-pipe and emergency repairs",
    body: "A burst or leaking pipe needs a plumber, not a guess. Call the office or send a request and tell us what's going on.",
    points: ["Burst and leaking supply lines", "Call now or book online"],
    image: {
      src: "/brand/photos/burst-pipe-repair.jpg",
      alt: "Plumber's gloved hands cutting out a damaged copper pipe section under a home",
    },
  },
];

export const CITIES = [
  "Morristown",
  "Greeneville",
  "Fall Branch",
  "Johnson City",
  "Kingsport",
  "Bristol",
  "Elizabethton",
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "What plumbing services does this page cover?",
    answer:
      "This page is for three kinds of work: water heaters and tankless water heaters, whole-home repipes, and busted-pipe or emergency plumbing repairs. If your problem is something else, give the office a call and ask.",
  },
  {
    question: "Do you install and service tankless water heaters?",
    answer:
      "Yes. Tommie's Plumbing offers tankless water heater service and installation, along with gas and electric standard tank units across all makes and models.",
  },
  {
    question: "Who should fill out the form?",
    answer:
      "The form is for homeowners and property owners, which is why it asks, \"Are you the homeowner or property owner?\" If you rent, the best next step is to have the owner reach out so the work can be approved.",
  },
  {
    question: "Where does Tommie's Plumbing serve?",
    answer:
      "Northeast Tennessee from Morristown to Bristol, including Greeneville, Fall Branch, Johnson City, Kingsport, Elizabethton, and the communities in between.",
  },
  {
    question: "How do the current offers work?",
    answer: `Take $100 off water heater installation or $50 off any plumbing service over $250. Both offers expire ${OFFER_EXPIRY} and cannot be combined with any other offer — contact the office for details. Club members also have the service fee waived when they proceed with the work.`,
  },
  {
    question: "What happens after I book?",
    answer: `Your service request is sent with the details you shared, and the phone number or email you provided is used to follow up, talk through the problem, and set up a visit. If you'd rather talk now, call ${PHONE_DISPLAY}.`,
  },
];
