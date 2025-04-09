import React from "react";

const Footer = () => {
  return (
    <>
      <div>
        <footer className="bg-black text-white text-center">
          <div className="flex justify-around">
            <div>
              <h1 className="text-2xl m-3">Company</h1>
              <ul>
                <li>About</li>
                <li>Blogs</li>
                <li>Jobs</li>
                <li>Press</li>
                <li>Partners</li>
              </ul>
            </div>

            <div>
              <h1 className="text-2xl m-3">Solutions</h1>
              <ul>
                <li>Marketing</li>
                <li>Analytics</li>
                <li>Commerce</li>
                <li>Insights</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h1 className="text-2xl m-3">Documentation</h1>
              <ul>
                <li>Guides</li>
                <li>API Status</li>
              </ul>
            </div>
            <div>
              <h1 className="text-2xl m-3">Legal</h1>
              <ul>
                <li>Claim</li>
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center mt-7">
            © 2023 My Company. All rights reserved
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
