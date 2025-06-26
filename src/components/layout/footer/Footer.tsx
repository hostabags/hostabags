import React from "react";
import { FooterDetails, FooterLinks, FooterResources } from ".";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-4 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <FooterDetails />
        <FooterLinks />
        <FooterResources />
      </div>
    </footer>
  );
}
