/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // The /oneroof artifact deliberately lives outside public/ so no URL reaches
    // the raw file. It is read from disk by src/app/oneroof/route.js only after a
    // session check passes, which means Next's file tracer has to be told to ship
    // it with that function. Without this the route builds fine and then 500s in
    // production on a missing file.
    outputFileTracingIncludes: {
      '/oneroof': ['./private/oneroof/**'],
    },
  },
}
