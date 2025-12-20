import React from 'react';
import QuickOrderTopBar from '../components/QuickOrderTopBar';
import Header from '../components/Header';
import ModernHero from '../components/ModernHero';
import PremiumSaladMenu from '../components/PremiumSaladMenu';
import MembershipPreview from '../components/MembershipPreview';
import CustomisedPlan from '../components/CustomisedPlan';
import NewsletterSignup from '../components/NewsletterSignup';
import ModernFooter from '../components/ModernFooter';
import FloatingControls from '../components/FloatingControls';
import AdminAccessButton from '../components/AdminAccessButton';

const ModernIndex = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Quick Order Top Bar */}
      <QuickOrderTopBar />
      {/* Header */}
      <Header />
      <main>
        {/* Modern Hero Section */}
        <ModernHero />
        {/* Enhanced Fresh Salad Menu */}
        <PremiumSaladMenu />
        {/* Membership Preview */}
        <MembershipPreview />
        {/* Customised Plan Section */}
        <CustomisedPlan />
        {/* Newsletter Signup */}
        <NewsletterSignup />
      </main>
      {/* Modern Footer */}
      <ModernFooter />
      {/* Floating Controls (WhatsApp + Back to Top) */}
      <FloatingControls />
      {/* Admin Access Button (only shows for admins) */}
      <AdminAccessButton />
    </div>
  );
};

export default ModernIndex;