// Page copy, one export per section. Edit text here; components only handle layout.
// All copy comes from the Mehrzun website brief (Google Doc). Items marked IN PROGRESS there are not published.

const brandAltTagline = "Empowering Lives Through Opportunity.";

export const brand = {
  name: "Mehrzun",
  tagline: "No Interest. Just Opportunity.",
  altTagline: brandAltTagline,
  meaning: "Compassion that empowers",
  explanation:
    "“Mehrzun” is inspired by “mehr,” a word associated with kindness and warmth. To us, it stands for compassion that empowers.",
};

export const hero = {
  headline: "Empowering Individuals Through Interest-Free Microfinance",
  /** Words in the headline shown in italic gold. */
  highlight: ["Interest-Free", "Microfinance"],
  sub: "At Mehrzun, we believe everyone deserves a fair opportunity to improve their livelihood. Our focus is on interest-free financial support that helps people pursue small business ideas and work toward long-term financial independence.",
  primary: { label: "Learn About Our Work", href: "#work" },
  secondary: { label: "Support Our Mission", href: "#donate" },
};

export const about = {
  eyebrow: "About Mehrzun",
  title: "A small opportunity can make a meaningful difference",
  body: "Mehrzun is an initiative focused on economic empowerment through interest-free microfinance. We aim to make opportunity more accessible to individuals who face financial barriers, especially those seeking to start or strengthen small businesses. Our approach is rooted in dignity, trust, and the belief that a small opportunity can make a meaningful difference.",
  values: ["Dignity", "Trust", "Opportunity"],
};

export const founder = {
  eyebrow: "Founder’s Message",
  quote: [
    "I started Mehrzun with a simple belief: access to opportunity should not depend on a person’s financial circumstances. For individuals trying to build a business or support their families, even a small amount of financial support can make a difference.",
    "I wanted to create an initiative that focuses on empowerment rather than financial burden, which is why interest-free microfinance is at the center of our work.",
    "My hope is that Mehrzun becomes a platform where people can take meaningful steps toward financial stability while being treated with dignity and respect. We are at the beginning of this journey, and I look forward to building it responsibly and sharing our progress with the community.",
  ],
  signature: "Founder, Mehrzun",
};

export const work = {
  eyebrow: "Our Microfinance Work",
  title: "How Interest-Free Microfinance Works",
  body: "Our mission is to support individuals with access to interest-free financing so they can pursue income-generating opportunities without the additional burden of interest charges. We aim to prioritize practical needs, responsible financing, and long-term economic empowerment.",
  cards: [
    { icon: "hand-coins", title: "Interest-free support", text: "Financial assistance designed without interest charges." },
    { icon: "store", title: "Small-business opportunity", text: "A focus on helping individuals start or develop income-generating activities." },
    { icon: "sprout", title: "Dignity and independence", text: "Encouraging sustainable livelihoods and greater financial confidence." },
  ],
  quote: brandAltTagline,
};

export const supporters = {
  eyebrow: "Our Supporters",
  title: "With gratitude",
  body: "We are grateful to everyone who supports our mission. A donor recognition section will be added as permissions and details are confirmed.",
};

export const donate = {
  eyebrow: "Donate",
  title: "Help Create Opportunities",
  body: [
    "Your support can help us advance a mission centered on interest-free financial opportunity. By contributing to Mehrzun, you can support our efforts to make microfinance more accessible and help individuals pursue greater financial independence.",
    "We believe support should be handled responsibly and communicated transparently. As our programs grow, we aim to share clear information about activities, funding, and outcomes.",
  ],
  cta: "Support the Mission",
};

export const contact = {
  eyebrow: "Contact Us",
  title: "Get in Touch",
  body: "Have a question about Mehrzun, interest-free microfinance, partnerships, or supporting our mission? We would be happy to hear from you.",
};

export const donationForm = {
  title: "Make a Donation",
  intro:
    "Transfer any amount to the account below, then share your details and a screenshot of the transfer so we can confirm your donation.",
  bankHeading: "Mehrzun bank account",
  labels: {
    name: "Full name",
    phone: "Phone number",
    email: "Email (optional)",
    amount: "Donation amount",
    bankDetails: "Your bank details",
    bankDetailsHint: "Bank name and account title you sent the donation from",
    screenshot: "Transfer screenshot",
    screenshotHint: "Drag an image here, or click to choose one",
  },
  submit: "Submit Donation",
  success: {
    title: "Thank you for your support",
    body: "We have received your donation details and will confirm once the transfer is verified.",
  },
  error: "Sorry, your details could not be sent. Please try again.",
};
