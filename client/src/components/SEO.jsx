import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
}) {
  const siteTitle = "Lix Portfolio";
  const siteDescription =
    "Portfolio of Malik, a passionate Full Stack Developer specializing in MERN stack, React Native, and modern web technologies.";
  const siteKeywords =
    "Front End Developer, Malik, Abdul Malik Matoha, Malik Matoha, Lix Portfolio, Portfolio Abdul Malik Matoha, Portfolio Malik, Portfolio Lix, MERN Stack, React, Node.js, Web Developer, Motion Graphic, Video Editor, UI/UX Designer, Graphic Designer, Logo Designer";
  const siteUrl = "https://lixportfolio.vercel.app/"; // Update with actual URL if known
  const siteImage = "/Frame 24d.png"; // Update with actual default image

  const ogTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const finalDescription = description || siteDescription;
  const finalKeywords = keywords || siteKeywords;
  const finalUrl = url ? `${siteUrl}${url}` : siteUrl;
  const finalImage = image || siteImage;

  return (
    <Helmet>
      {/* Standard Metadata — NO <title> tag, keep browser tab as "Lix Portfolio" from index.html */}
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph / Facebook (uses contextual title for social sharing) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={finalImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
    </Helmet>
  );
}
