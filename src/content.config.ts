import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/data/articles",
  }),

  schema: z.object({
    title: z.string(),

    category: z.enum([
      "History",
      "Stories",
      "Events",
      "Etiquette",
      "Deaf Culture",
      "Deaf World",
      "Learn Sign",
      "Advocacy",
    ]).optional(),

    topic: z.string(),

    excerpt: z.string(),

    author: z.string(),

    publishedDate: z.coerce.date(),

    updatedDate: z.coerce.date().optional(),

    readTime: z.number().int().positive(),

    featured: z.boolean().default(false),

    homepageFeatured: z.boolean().default(false),

    featuredImage: z.object({
      src: z.string(),
      alt: z.string(),
    }),

    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
      })
      .nullable()
      .optional(),
  }),
});

const myths = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/data/myths",
    }),

    schema: z.object({
        title: z.string(),

        myth: z.string(),

        fact: z.string(),

        category: z.enum([
            "Language",
            "Communication",
            "Culture",
            "Education",
            "Accessibility",
            "Interpreters",
            "Technology",
        ]),

        publishedDate: z.coerce.date(),

        featured: z.boolean().default(false),
    }),
});

const etiquette = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/data/etiquette",
    }),

    schema: z.object({
        title: z.string(),

        description: z.string(),

        type: z.enum(["do", "dont"]),

        category: z.string(),

        publishedDate: z.coerce.date(),

        featured: z.boolean().default(false),
    }),
});

const quotes = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/data/quotes",
    }),

    schema: z.object({
        quote: z.string(),

        author: z.string(),

        publishedDate: z.coerce.date(),

        featured: z.boolean().default(false),
    }),
});

const videos = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/data/videos",
    }),

    schema: z.object({
        title: z.string(),

        description: z.string(),

        topic: z.string(),

        publishedDate: z.coerce.date(),

        duration: z.string(),

        // Image displayed as the thumbnail on Learn Sign pages
        thumbnail: z.string(),

        sign: z.string(),

        youtubeUrl: z.string().url(),

        difficulty: z.string(),

        // Controls whether this tutorial can become
        // the homepage "Sign of the Week"
        featured: z.boolean().default(false),

        // Optional promotional media used ONLY
        // by the homepage Sign of the Week
        featuredMedia: z.string().optional(),

        featuredMediaType: z
            .enum(["image", "gif", "video"])
            .optional(),
    }),
});

const settings = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/data/settings",
    }),

    schema: z.object({

        // =========================================
        // HERO SETTINGS
        // =========================================

        heroes: z.object({

            // Deaf Culture 101
            deafCulture: z.object({
                label: z.string(),
                title: z.string(),
                description: z.string(),

                image: z.object({
                    src: z.string(),
                    alt: z.string(),
                }),
            }),

            // Deaf World
            deafWorld: z.object({
                label: z.string(),
                title: z.string(),
                description: z.string(),

                image: z.object({
                    src: z.string(),
                    alt: z.string(),
                }),
            }),

            // Learn Sign
            learnSign: z.object({
                label: z.string(),
                title: z.string(),
                description: z.string(),

                image: z.object({
                    src: z.string(),
                    alt: z.string(),
                }),
            }),

            // Connect
            connect: z.object({
                label: z.string(),
                title: z.string(),
                description: z.string(),

                backgroundImage: z.object({
                    src: z.string(),
                    alt: z.string(),
                }),

                welcomeVideo: z.object({
                    video: z.string(),
                    poster: z.string(),
                    captions: z.string(),
                }),
            }),

        }),


        // =========================================
        // NEWSLETTER
        // =========================================

        newsletter: z.object({
            title: z.string(),
            description: z.string(),
            buttonText: z.string(),
            privacyText: z.string(),
        }),


        // =========================================
        // FOOTER
        // =========================================

        footer: z.object({
            description: z.string(),
            tagline: z.string(),
            copyright: z.string(),
        }),


        // =========================================
        // SOCIAL LINKS
        // =========================================

        social: z.object({
            facebook: z.string(),
            instagram: z.string(),
            youtube: z.string(),
            tiktok: z.string(),
        }),


        // =========================================
        // CONTACT
        // =========================================

        contact: z.object({
            email: z.string(),
            phone: z.string(),
            location: z.string(),
        }),


        // =========================================
        // HEADER
        // =========================================

        header: z.object({
            logo: z.object({
                src: z.string(),
                alt: z.string(),
            }),
            siteName: z.string(),
            tagline: z.string(),
        }),
        //===========================================
        //DEAF CULTURE ETIQUETTE SECTION
        //===========================================
        deafCultureSections: z.object({
            etiquette: z.object({
                eyebrow: z.string(),
                title: z.string(),
                intro: z.string(),
            }),
        }),

    }),
});

const events = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/data/events",
    }),

    schema: z.object({

        // =========================================
        // BASIC EVENT INFORMATION
        // =========================================

        title: z.string(),

        excerpt: z.string(),

        // =========================================
        // DATE & TIME
        // =========================================

        eventDate: z.coerce.date(),

        startTime: z.string(),

        endTime: z.string(),

        // =========================================
        // LOCATION
        // =========================================

        location: z.string(),

        venue: z.string().optional(),

        // =========================================
        // ORGANIZER
        // =========================================

        organizer: z.string(),

        // =========================================
        // EVENT CLASSIFICATION
        // =========================================

        category: z.enum([
            "Workshop",
            "Conference",
            "Festival",
            "Community",
            "Training",
            "Advocacy",
            "Other",
        ]),

        eventType: z.enum([
            "physical",
            "virtual",
        ]),

        // =========================================
        // FEATURED IMAGE
        // =========================================

        featuredImage: z.object({
            src: z.string(),
            alt: z.string(),
        }),

        // =========================================
        // EVENT STATUS
        // =========================================

        status: z.enum([
            "upcoming",
            "completed",
        ]).default("upcoming"),

        // =========================================
        // EVENT SUMMARY
        // =========================================

        attendance: z.string().optional(),

        summary: z.string().optional(),

        // =========================================
        // EVENT HIGHLIGHTS
        // =========================================

        highlights: z.array(
            z.string()
        ).default([]),

        // =========================================
        // EVENT OUTCOMES
        // =========================================

        outcomes: z.array(
            z.string()
        ).default([]),

        // =========================================
        // EVENT REPORT
        // =========================================

        eventReport: z.string().optional(),

        // =========================================
        // EVENT GALLERY
        // =========================================

        gallery: z.array(
            z.object({

                src: z.string(),

                alt: z.string(),

            })
        ).default([]),

        // =========================================
        // TAGS
        // =========================================

        tags: z.array(
            z.string()
        ).default([]),

        // =========================================
        // REGISTRATION
        // =========================================

        registrationUrl: z.string().url().optional(),

        registrationLabel: z.string()
            .default("Register Now"),

        // =========================================
        // ACCESSIBILITY
        // =========================================

        accessibility: z.object({

            signLanguageInterpretation:
                z.boolean().default(false),

            captions:
                z.boolean().default(false),

            wheelchairAccessible:
                z.boolean().default(false),

            hearingLoop:
                z.boolean().default(false),

            accessibleMaterials:
                z.boolean().default(false),

            notes:
                z.string().optional(),

        }).optional(),

        // =========================================
        // DOWNLOADABLE RESOURCES
        // =========================================

        resources: z.array(
            z.object({

                title: z.string(),

                url: z.string(),

                type: z.enum([
                    "pdf",
                    "document",
                    "link",
                ]),

            })
        ).default([]),

        // =========================================
        // HOMEPAGE FEATURE
        // =========================================

        featured:
            z.boolean().default(false),

        // =========================================
        // PUBLISHING
        // =========================================

        published:
            z.boolean().default(true),

    }),
});

const advocacy = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/data/advocacy",
    }),

    schema: z.object({

        // =========================================
        // BASIC ADVOCACY INFORMATION
        // =========================================

        title: z.string(),

        excerpt: z.string(),

        // =========================================
        // CLASSIFICATION
        // =========================================

        category: z.string(),

        type: z.enum([
            "campaign",
            "resource",
            "initiative",
        ]),

        // =========================================
        // STATUS
        // =========================================

        status: z.string().optional(),

        // =========================================
        // FEATURED IMAGE
        // =========================================

        featuredImage: z.object({

            src: z.string(),

            alt: z.string(),

        }).optional(),

        // =========================================
        // CAMPAIGN PROGRESS
        // =========================================

        progress: z.number()
            .int()
            .min(0)
            .max(100)
            .optional(),

        progressLabel: z.string().optional(),

        // =========================================
        // ADVOCACY OVERVIEW
        // =========================================

        summary: z.string().optional(),

        whyItMatters: z.string().optional(),

        currentSituation: z.string().optional(),

        target: z.string().optional(),

        // =========================================
        // OBJECTIVES
        // =========================================

        objectives: z.array(
            z.string()
        ).default([]),

        // =========================================
        // ACTIONS
        // =========================================

        actions: z.array(
            z.string()
        ).default([]),

        // =========================================
        // CALL TO ACTION
        // =========================================

        ctaLabel: z.string().optional(),

        ctaUrl: z.string().optional(),

        // =========================================
        // RESOURCES
        // =========================================

        resources: z.array(
            z.object({

                title: z.string(),

                url: z.string(),

                type: z.enum([
                    "pdf",
                    "document",
                    "link",
                ]),

            })
        ).default([]),

        // =========================================
        // HOMEPAGE FEATURE
        // =========================================

        featured:
            z.boolean().default(false),

        // =========================================
        // PUBLISHING
        // =========================================

        published:
            z.boolean().default(true),

        publishedDate:
            z.coerce.date(),

        updatedDate:
            z.coerce.date().optional(),

    }),
});

const signs = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/data/signs",
    }),

    schema: z.object({

        // =========================================
        // CHARACTER
        // =========================================

        character: z.string(),

        characterType: z.enum([
            "letter",
            "number",
        ]),

        // =========================================
        // SIGN LANGUAGE
        // =========================================

        signLanguage: z.string(),

        country: z.string().optional(),

        // =========================================
        // SIGN INFORMATION
        // =========================================

        title: z.string(),

        description: z.string(),

        tips: z.array(
            z.string()
        ).default([]),

        // =========================================
        // PUBLISHING
        // =========================================

        published: z.boolean().default(true),

        featured: z.boolean().default(false),

    }),
});

const connect = defineCollection({

    loader: glob({
        pattern: "connect-page.md",
        base: "./src/data/connect",
    }),

    schema: z.object({

        // =========================================
        // ABOUT ME
        // =========================================

        about: z.object({

            eyebrow: z.string(),

            title: z.string(),

            paragraphs: z.array(
                z.string()
            ),

            image: z.object({

                src: z.string(),

                alt: z.string(),

            }),

        }),


        // =========================================
        // MISSION
        // =========================================

        mission: z.object({

            eyebrow: z.string(),

            heading: z.string(),

        }),


        // =========================================
        // VALUES
        // =========================================

        values: z.array(

            z.object({

                title: z.string(),

                description: z.string(),

            })

        ),


        // =========================================
        // CONTACT
        // =========================================

        contact: z.object({

            eyebrow: z.string(),

            title: z.string(),

            description: z.string(),

            phone: z.string(),

            email: z.string(),

            socialLinks: z.array(

                z.object({

                    platform: z.string(),

                    url: z.string(),

                    label: z.string(),

                })

            ),

        }),


        // =========================================
        // FAQ
        // =========================================

        faq: z.object({

            eyebrow: z.string(),

            title: z.string(),

            questions: z.array(

                z.object({

                    question: z.string(),

                    answer: z.string(),

                })

            ),

        }),

    }),

});

export const collections = {
  articles,
  myths,
  etiquette,
  quotes,
  videos,
  events,
  advocacy,
  signs,
  settings,
  connect,
};