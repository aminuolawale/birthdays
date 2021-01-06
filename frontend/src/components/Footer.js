import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__lists">
        <div className="footer__lists__item">
          <p className="footer__lists__item__header">Contact</p>
          <ul>
            <li>hello@riceevng.com</li>
          </ul>
        </div>
        <div className="footer__lists__item">
          <p className="footer__lists__item__header">Company</p>
          <ul>
            <li>About</li>
            <li>Mission</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="footer__lists__item">
          <p className="footer__lists__item__header">Resources</p>
          <ul>
            <li>Help & Support</li>
            <li>User protection</li>
            <li>Developer API</li>
          </ul>
        </div>
        <div className="footer__lists__item">
          <p className="footer__lists__item__header">Downloads</p>
          <ul>
            <li>Birthdays for iOS</li>
            <li>Birthdays for Android</li>
          </ul>
        </div>
      </div>
      <div className="footer__base">
        <p>&copy; 2021 Riceev</p>
        <ul>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Cookie Policy</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
