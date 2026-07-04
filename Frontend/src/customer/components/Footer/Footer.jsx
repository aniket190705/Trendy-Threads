"use client";

const Footer = () => {
  return (
    <footer className="border-t border-stone-200 bg-brand-900 px-4 py-12 text-stone-200 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl text-white">Trendy Threads</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-stone-300">
            A modern storefront experience layered on top of your existing MERN
            backend, with the same checkout and account flows customers already use.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-white">Company</h2>
          <ul className="mt-4 space-y-2 text-sm text-stone-300">
            <li>About</li>
            <li>Blogs</li>
            <li>Jobs</li>
            <li>Press</li>
            <li>Partners</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-white">Solutions</h2>
          <ul className="mt-4 space-y-2 text-sm text-stone-300">
            <li>Marketing</li>
            <li>Analytics</li>
            <li>Commerce</li>
            <li>Insights</li>
            <li>Support</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-white">Documentation</h2>
          <ul className="mt-4 space-y-2 text-sm text-stone-300">
            <li>Guides</li>
            <li>API Status</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-white">Legal</h2>
          <ul className="mt-4 space-y-2 text-sm text-stone-300">
            <li>Claim</li>
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-stone-400">
        Copyright 2023 My Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
