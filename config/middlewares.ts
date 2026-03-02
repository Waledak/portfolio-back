module.exports = ({ env }) => {
  const bucket = env("AWS_BUCKET");
  const region = env("AWS_REGION");

  return [
    "strapi::errors",

    {
      name: "strapi::security",
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            "connect-src": ["'self'", "https:"],

            "img-src": [
              "'self'",
              "data:",
              "blob:",

              `https://s3.${region}.amazonaws.com`,
              `https://${bucket}.s3.${region}.amazonaws.com`,
              "https://*.amazonaws.com",
            ],

            "media-src": [
              "'self'",
              "data:",
              "blob:",
              `https://s3.${region}.amazonaws.com`,
              `https://${bucket}.s3.${region}.amazonaws.com`,
              "https://*.amazonaws.com",
            ],

            upgradeInsecureRequests: null,
          },
        },
      },
    },

    {
      name: "strapi::cors",
      config: {
        enabled: true,
        origin: [
          "https://tanguycirillo.fr",
          "https://www.tanguycirillo.fr",
          "https://api.tanguycirillo.fr",

          "http://localhost:3000",
          "http://localhost:1337",
        ],
        headers: ["Content-Type", "Authorization", "Origin", "Accept"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      },
    },

    "strapi::poweredBy",
    "strapi::logger",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
  ];
};