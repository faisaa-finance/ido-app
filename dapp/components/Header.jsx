import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import logo from "../public/assets/logo-square.png";

function Header() {
  const [openMenu, setopenMenu] = useState(false);
  //handling the hamburger menu
  const handleMenu = () => {
    setopenMenu(!openMenu);
  };
  const menuItems = (
    <div className="menu_items">
      <Link href="/join">
        <a>IDO</a>
      </Link>
      <div className="connect">
        <ConnectButton />
      </div>
    </div>
  );
  return (
    <>
      <div className="navbar-container">
        <nav>
          <div className="nav-container">
            <div className="nav-logo">
              <Link href="/">
              <Image src={logo} height={60} width={60}></Image>
              </Link>
            </div>
            <div className="menu">{menuItems}</div>
            <button
              className={openMenu ? "hamburger active-hamburger" : "hamburger"}
              onClick={handleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
        {openMenu && <div className="nav-dropdown">{menuItems}</div>}
      </div>
    </>
  );
}

export default Header;
