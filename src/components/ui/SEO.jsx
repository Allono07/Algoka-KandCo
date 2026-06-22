import { Helmet } from 'react-helmet-async'

export default function SEO({
  title       = 'Kalp & Co — Creative & Marketing Agency | Bengaluru',
  description = 'Kalp & Co is a growth-focused creative and marketing agency in Bengaluru helping brands scale through strategy, branding, digital marketing, AI-led solutions, and performance campaigns.',
  url         = 'https://www.kalpandco.com',
  image       = '/og-image.webp',
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description"             content={description} />
      <meta name="keywords"                content="creative agency bengaluru, branding agency bangalore, digital marketing agency india, performance marketing, social media marketing, AI marketing, brand strategy" />
      <meta name="robots"                  content="index, follow" />
      <link rel="canonical"                href={url} />

      {/* Open Graph */}
      <meta property="og:type"             content="website" />
      <meta property="og:title"            content={title} />
      <meta property="og:description"      content={description} />
      <meta property="og:url"              content={url} />
      <meta property="og:image"            content={image} />
      <meta property="og:site_name"        content="Kalp & Co" />

      {/* Twitter */}
      <meta name="twitter:card"            content="summary_large_image" />
      <meta name="twitter:title"           content={title} />
      <meta name="twitter:description"     content={description} />
      <meta name="twitter:image"           content={image} />

      {/* Local Business Schema */}
      <script type="application/ld+json">{JSON.stringify({
        "@context":    "https://schema.org",
        "@type":       "MarketingAgency",
        "name":        "Kalp & Co",
        "url":         url,
        "logo":        `${url}/logo.svg`,
        "description": description,
        "telephone":   "+91 94822 12222",
        "email":       "contact@kalpandco.com",
        "address": {
          "@type":           "PostalAddress",
          "streetAddress":   "4th Floor, No.33/1, Vittal Mallya Rd",
          "addressLocality": "Bengaluru",
          "addressRegion":   "Karnataka",
          "postalCode":      "560001",
          "addressCountry":  "IN"
        },
        "sameAs": ["https://www.instagram.com/kalpandco"]
      })}</script>
    </Helmet>
  )
}