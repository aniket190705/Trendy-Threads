"use client";

import { Fragment, useMemo, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SmartImage from "@/components/common/SmartImage";
import { useAuth } from "../../../Context/AuthContext";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [{ name: "Dress" }, { name: "Tops" }, { name: "Browse All" }],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with line drawing on front.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [{ name: "mens_kurta" }, { name: "T-Shirts" }, { name: "Browse All" }],
        },
      ],
    },
  ],
};

export default function Navigation({ notification, setNotification }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, isSignedIn, cartItems } = useAuth();

  const itemCount = useMemo(
    () => (cartItems || []).reduce((count, item) => count + (item.quantity || 1), 0),
    [cartItems],
  );

  const handleCategoryClick = (category, section, item) => {
    router.push(`/${category.id}/${section.id}/${item.name.toLowerCase()}`);
    setOpen(false);
  };

  const handleOrdersClick = () => {
    if (isSignedIn) {
      router.push("/account/order");
      return;
    }

    setNotification("Please sign in to view your orders");
  };

  const handleCartClick = () => {
    if (!isSignedIn) {
      setNotification("Please sign in to see your cart items");
      return;
    }

    router.push("/cart");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="sticky top-0 z-40 border-b border-white/40 bg-white/85 backdrop-blur-xl">
      {notification && (
        <div className="border-b border-amber-200 bg-amber-50">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 text-sm text-amber-900 sm:px-6 lg:px-8">
            <p className="font-medium">{notification}</p>
            <button
              type="button"
              onClick={() => {
                setNotification("");
                if (!isSignedIn) {
                  router.push("/account/signin");
                }
              }}
              className="rounded-full bg-amber-200 px-3 py-1 font-semibold transition hover:bg-amber-300"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

      <p className="flex h-10 items-center justify-center bg-brand-800 px-4 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white sm:text-sm">
        Get free delivery on orders over Rs.500
      </p>

      <Dialog open={open} onClose={setOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 z-50 flex">
          <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-2xl">
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-2 text-stone-500"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <TabGroup className="mt-2">
              <div className="border-b border-stone-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-stone-900 data-[selected]:border-brand-600 data-[selected]:text-brand-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <div className="relative aspect-square overflow-hidden rounded-3xl bg-stone-100">
                            <SmartImage
                              alt={item.imageAlt}
                              src={item.imageSrc}
                              fill
                              sizes="40vw"
                              className="object-cover"
                            />
                          </div>
                          <p className="mt-4 font-medium text-stone-900">{item.name}</p>
                          <p className="mt-1 text-stone-500">Shop now</p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p className="font-medium text-stone-900">{section.name}</p>
                        <ul className="mt-6 flex flex-col space-y-4">
                          {section.items.map((item) => (
                            <li key={item.name}>
                              <button
                                type="button"
                                className="text-stone-500 transition hover:text-brand-700"
                                onClick={() =>
                                  handleCategoryClick(category, section, item)
                                }
                              >
                                {item.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-4 border-t border-stone-200 px-4 py-6">
              {!isSignedIn && (
                <>
                  <Link href="/account/signin" className="block font-medium text-stone-900">
                    Sign in
                  </Link>
                  <Link href="/account/signup" className="block font-medium text-stone-900">
                    Create account
                  </Link>
                </>
              )}
              {isSignedIn && (
                <button
                  type="button"
                  className="font-medium text-stone-900"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Top" className="py-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-md bg-white p-2 text-stone-500 lg:hidden"
            >
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" />
            </button>

            <Link href="/" className="flex items-center gap-3">
              <SmartImage
                src="/assets/logo.png"
                alt="Trendy Threads logo"
                width={56}
                height={56}
                className="h-12 w-auto"
              />
              <div className="hidden sm:block">
                <p className="font-serif text-2xl text-brand-900">Trendy Threads</p>
                <p className="text-xs uppercase tracking-[0.28em] text-stone-400">
                  Curated fashion
                </p>
              </div>
            </Link>

            <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:gap-5">
              {!isSignedIn && pathname !== "/account/signin" && (
                <Link
                  href="/account/signin"
                  className="hidden rounded-full px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 lg:inline-flex"
                >
                  Sign in
                </Link>
              )}
              {!isSignedIn && pathname !== "/account/signup" && (
                <Link
                  href="/account/signup"
                  className="hidden rounded-full bg-brand-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-900 lg:inline-flex"
                >
                  Create Account
                </Link>
              )}
              {isSignedIn && (
                <button
                  type="button"
                  className="hidden rounded-full px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 lg:inline-flex"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              )}

              <button
                type="button"
                className="rounded-full p-2 text-stone-500 transition hover:bg-stone-100"
                aria-label="Search"
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>

              <button
                type="button"
                className="rounded-full p-2 text-stone-500 transition hover:bg-stone-100"
                onClick={handleOrdersClick}
                aria-label="View order history"
              >
                <ClipboardDocumentListIcon className="h-6 w-6" />
              </button>

              <button
                type="button"
                className="hidden items-center gap-3 rounded-full border border-stone-200 bg-white px-3 py-2 shadow-sm transition hover:border-brand-200 hover:shadow md:flex"
                onClick={handleOrdersClick}
              >
                <SmartImage
                  src="/assets/avatar.png"
                  alt="Account avatar"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span className="text-sm font-medium text-stone-700">
                  {isSignedIn ? user?.firstName : "user"}
                </span>
              </button>

              <button
                type="button"
                className="relative flex items-center rounded-full border border-stone-200 bg-white px-3 py-2 shadow-sm transition hover:border-brand-200 hover:shadow"
                onClick={handleCartClick}
              >
                <ShoppingBagIcon className="h-6 w-6 text-stone-500" />
                <span className="ml-2 text-sm font-semibold text-stone-700">
                  {itemCount}
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
