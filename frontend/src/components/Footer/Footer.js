import React from "react";
import * as style from "./style";

const Footer = () => {
  return (
    <style.Footer>
      <style.FooterLists>
        <style.FooterListItem>
          <style.FooterListHeader>Contact</style.FooterListHeader>
          <ul>
            <li>hello@riceevng.com</li>
          </ul>
        </style.FooterListItem>
        <style.FooterListItem>
          <style.FooterListHeader>Company</style.FooterListHeader>
          <ul>
            <li>About</li>
            <li>Mission</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </style.FooterListItem>
        <style.FooterListItem>
          <style.FooterListHeader>Resources</style.FooterListHeader>
          <ul>
            <li>Help & Support</li>
            <li>User protection</li>
            <li>Developer API</li>
          </ul>
        </style.FooterListItem>
        <style.FooterListItem>
          <style.FooterListHeader>Downloads</style.FooterListHeader>
          <ul>
            <li>Birthdays for iOS</li>
            <li>Birthdays for Android</li>
          </ul>
        </style.FooterListItem>
      </style.FooterLists>
      <style.FooterBase>
        <p>&copy; 2021 Riceev</p>
        <ul>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Cookie Policy</li>
        </ul>
      </style.FooterBase>
    </style.Footer>
  );
};

export default Footer;
