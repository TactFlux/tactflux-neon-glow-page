
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
    document.title = "TactFlux - API für faires Recruiting mit interaktiven Tests";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'TactFlux erweitert Ihr HR-System mit einer API für faire Bewerbungsprozesse. Geben Sie Kandidaten eine Bühne, auf der sie ihr wahres Potential zeigen können.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'TactFlux erweitert Ihr HR-System mit einer API für faire Bewerbungsprozesse. Geben Sie Kandidaten eine Bühne, auf der sie ihr wahres Potential zeigen können.';
      document.head.appendChild(meta);
    }

    // Add Open Graph meta tags for better social sharing
    const updateOrCreateMeta = (property: string, content: string) => {
      const meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        const newMeta = document.createElement('meta');
        newMeta.setAttribute('property', property);
        newMeta.setAttribute('content', content);
        document.head.appendChild(newMeta);
      }
    };

    updateOrCreateMeta('og:title', 'TactFlux - API für faires Recruiting mit interaktiven Tests');
    updateOrCreateMeta('og:description', 'Revolutionieren Sie Ihre HR-Prozesse und bieten Sie Bewerbern eine faire Chance mit TactFlux.');
    updateOrCreateMeta('og:type', 'website');
    updateOrCreateMeta('og:site_name', 'TactFlux');
    
    // Add theme color for mobile browsers
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute('content', '#121212');
    } else {
      const newThemeColor = document.createElement('meta');
      newThemeColor.setAttribute('name', 'theme-color');
      newThemeColor.setAttribute('content', '#121212');
      document.head.appendChild(newThemeColor);
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
