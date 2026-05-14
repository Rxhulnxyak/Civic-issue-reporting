import Head from "next/head";

export default function Seo({
  title = "Civic Issue Reporting & Resolution | Smart City Platform",
  description = "A crowdsourced platform for reporting and resolving civic issues like potholes, streetlights, and waste management. Built for Smart India Hackathon 2025.",
  url = "https://yourdomain.com/",
  image = "https://yourdomain.com/og-image.jpg"
}) {
  const pageTitle = title ? title.charAt(0).toUpperCase() + title.slice(1) : title;
  return (
    <Head>
      {/* Basic Meta Tags (title is controlled by App Router metadata) */}
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="SIH 2025 Team" />
      <meta name="keywords" content="civic issues, community reporting, infrastructure problems, potholes, streetlights, waste management, smart city, crowdsourcing, SIH project for government of jharkhand"  />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Civic Reporter" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1f2937" />

      {/* Links */}
      <link rel="canonical" href={url} />

      {/* Basic Website Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Civic Issue Reporting Platform",
            "url": url,
            "description": description,
            "applicationCategory": "GovernmentApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "featureList": [
              "Report Civic Issues",
              "Track Issue Status", 
              "Community Engagement",
              "Real-time Updates"
            ]
          }),
        }}
      />

      {/* FAQ Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I report a civic issue?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Click on 'Report Issue', provide location details, add a description and photo of the problem. Your report will be submitted to relevant authorities."
                }
              },
              {
                "@type": "Question", 
                "name": "What types of issues can I report?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can report potholes, broken streetlights, overflowing trash bins, water supply issues, drainage problems, and other infrastructure issues."
                }
              },
              {
                "@type": "Question",
                "name": "Can I track my reported issue?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! After reporting, you'll get a tracking ID to monitor the progress and resolution status of your issue."
                }
              },
              {
                "@type": "Question",
                "name": "Is this platform free to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, this platform is completely free for all citizens to report and track civic issues."
                }
              }
            ]
          }),
        }}
      />

      {/* Organization Structured Data - Generic */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Civic Reporter Platform",
            "url": url,
            "description": "Smart city solution for civic issue reporting and resolution",
            "foundingDate": "2025",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "support"
            }
          }),
        }}
      />
    </Head>
  );
}