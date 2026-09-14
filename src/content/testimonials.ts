/**
 * TESTIMONIALS
 *
 * Intentionally empty. We do not publish testimonials we have not been given.
 *
 * The section is already built and wired up: add a real, approved quote to
 * the array below and the testimonial block appears on the homepage and the
 * about page automatically. While the array is empty, the section is not
 * rendered at all — visitors never see an empty shell.
 *
 * Before adding one:
 *   - Get written permission to publish the quote, name, role and company.
 *   - Quote them accurately. Do not tidy up what they said into marketing copy.
 *   - `logo` is optional: a path under /public (e.g. "/logos/acme.svg").
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Path under /public, or null. */
  logo: string | null;
  /** Optional link to the related case study slug. */
  caseStudy?: string;
};

export const testimonials: Testimonial[] = [
  // Example of the expected shape — uncomment and replace with a real,
  // approved quote. Do not ship this example as-is.
  //
  // {
  //   quote:
  //     "They spent the first week understanding how we actually work before writing any code, and it showed in what they built.",
  //   name: "Full Name",
  //   role: "Operations Director",
  //   company: "Company Name",
  //   logo: null,
  //   caseStudy: "multi-campus-school-operations",
  // },
];

export const hasTestimonials = testimonials.length > 0;
