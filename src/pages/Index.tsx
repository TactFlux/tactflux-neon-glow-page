
import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutUsSection from '../components/AboutUsSection';
import FeaturesSection from '../components/FeaturesSection';
import PricingSection from '../components/PricingSection';
import ContactSection from '../components/ContactSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

const Index = () => {
  // Add SEO meta tags dynamically
  useEffect(() => {
    document.title = "TactFlux - Deine Talente. Deine Bühne.";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'TactFlux revolutioniert Bewerbungsprozesse mit spielerischen Tests, die deine kreative Problemlösung und Anpassungsfähigkeit zeigen – unabhängig von Lebenslauf und Zeugnissen.');
    }

    // Add Open Graph meta tags for better social sharing
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', 'TactFlux - Deine Talente. Deine Bühne.');
    }

    const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionMeta) {
      ogDescriptionMeta.setAttribute('content', 'Zeige, was in dir steckt – jenseits von Lebenslauf und Zeugnissen. Die innovative Bewerbungsplattform für deine Zukunft.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-tactflux-dark overflow-x-hidden">
      <Header />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <div id="cta"></div> {/* Scroll anchor for CTA buttons */}
        <AboutUsSection />
        <FeaturesSection />
        <PricingSection />
        <ContactSection />
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
