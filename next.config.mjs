// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,

//   // Image optimization
//   images: {
//     domains: [
//       'via.placeholder.com',
//       'localhost',
//     ],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**',
//       },
//     ],
//   },

//   // Environment variables available on client side
//   env: {
//     NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
//   },

//   // If you need Turbopack-specific config, add `turbopack` here:
//   turbopack: {
//     // e.g. resolveAlias, resolveExtensions
//     // resolveAlias: { underscore: 'lodash' }
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image optimization
  images: {
    domains: [
      'via.placeholder.com',
      'localhost',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Environment variables available on client side
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // If you need Turbopack-specific config, add `turbopack` here:
  turbopack: {
    // e.g. resolveAlias, resolveExtensions
    // resolveAlias: { underscore: 'lodash' }
  },
};

export default nextConfig;
