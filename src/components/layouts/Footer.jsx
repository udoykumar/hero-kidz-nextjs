import React from "react";
import Logo from "./Logo";
import NavLink from "./buttons/NavLink";

const Footer = () => {
  const nav = (
    <>
      <li>
        <NavLink href={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink href={"/products"}>Products</NavLink>
      </li>
      <li>
        <NavLink href={"/blog"}>Blog</NavLink>
      </li>
      <li>
        <NavLink href={"/contact"}>Contact</NavLink>
      </li>
    </>
  );
  return (
    <div className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <aside>
        <Logo />
      </aside>
      <div>
        <ul>{nav}</ul>
      </div>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </div>
  );
};

export default Footer;
