import Image from "next/image";
import React from "react";
import MobileNavSheet from "./MobileNavSheet";

const MobileNav = ({ user }: MobileNavProps) => {
  return (
    <div className="root-layout">
      <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
      <MobileNavSheet user={user} />
    </div>
  );
};

export default MobileNav;
