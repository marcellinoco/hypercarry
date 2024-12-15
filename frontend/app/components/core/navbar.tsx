"use client";

import { FC } from "react";

const Navbar: FC = () => {
  return (
    <div className="flex w-full justify-end p-3">
      <appkit-button />
    </div>
  );
};

Navbar.displayName = "Navbar";

export { Navbar };
