'use client'
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function Navigation() {
  const currentRoute = usePathname()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Lessons Navigation Item */}
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} `}
            >
             <div className={ ` ${ currentRoute === "/" ? "text-sky-500 " : "" }`}>
              Lessons
             </div>
             
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* Tutorials Navigation Item */}
        <NavigationMenuItem>
          <Link href="/tutorials" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()}`}
            >
              <div className={ ` ${ currentRoute === "/tutorials" ? "text-sky-500 " : "" }`}>
              Tutorials
             </div>
              
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
