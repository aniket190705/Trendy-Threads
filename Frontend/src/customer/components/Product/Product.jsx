"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { storefrontCatalog } from "@/lib/catalog";
import { filters, singleFilter } from "./filterData";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sortOptions = [
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

export default function Product({ params }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleParams = (value, sectionId) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    let filterValue = nextParams.getAll(sectionId);

    if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
      filterValue = filterValue[0].split(",").filter((item) => item !== value);

      if (filterValue.length === 0) {
        nextParams.delete(sectionId);
      } else {
        nextParams.set(sectionId, filterValue.join(","));
      }
    } else {
      filterValue = filterValue.length > 0 ? filterValue[0].split(",") : [];
      filterValue.push(value);
      nextParams.set(sectionId, filterValue.join(","));
    }

    const query = nextParams.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="bg-transparent px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <main className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-[36px] border border-white/70 bg-white/80 px-6 pb-6 pt-10 shadow-soft backdrop-blur sm:px-8">
          <div className="flex items-baseline justify-between border-b border-stone-200 pb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-stone-400">
                {params?.levelOne || "Men"}
              </p>
              <h1 className="mt-2 font-serif text-4xl tracking-tight text-brand-900">
                New Arrivals
              </h1>
            </div>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-stone-700 hover:text-stone-900">
                  Sort
                  <ChevronDownIcon className="-mr-1 ml-1 h-5 w-5 text-stone-400 group-hover:text-stone-500" />
                </MenuButton>

                <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-stone-900"
                              : "text-stone-500",
                            "block rounded-xl px-4 py-2 text-sm data-[focus]:bg-stone-100",
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-stone-400 hover:text-stone-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-stone-400 hover:text-stone-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-stone-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-stone-400 hover:text-stone-500">
                        <span className="font-medium text-stone-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon className="h-5 w-5 group-data-[open]:hidden" />
                          <MinusIcon className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              onChange={() => handleParams(option.value, section.id)}
                              className="h-4 w-4 rounded border-stone-300 text-brand-700 focus:ring-brand-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-stone-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
                {singleFilter.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-stone-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-stone-400 hover:text-stone-500">
                        <span className="font-medium text-stone-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon className="h-5 w-5 group-data-[open]:hidden" />
                          <MinusIcon className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <FormControl>
                        <RadioGroup
                          value={currentValue}
                          onChange={(event) => setCurrentValue(event.target.value)}
                          name="radio-buttons-group"
                        >
                          {section.options.map((option, index) => (
                            <FormControlLabel
                              key={option.id || index}
                              value={option.value}
                              control={<Radio />}
                              label={option.label}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              <div className="lg:col-span-4">
                <div className="flex w-full flex-wrap justify-center gap-4 bg-transparent">
                  {storefrontCatalog.map((item, index) => (
                    <ProductCard
                      key={`${item.productId ?? "product"}-${item.title}-${index}`}
                      product={item}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-stone-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-stone-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form className="mt-4 border-t border-stone-200">
              {filters.map((section) => (
                <Disclosure key={section.id} as="div" className="border-t border-stone-200 px-4 py-6">
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-stone-400 hover:text-stone-500">
                      <span className="font-medium text-stone-900">{section.name}</span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon className="h-5 w-5 group-data-[open]:hidden" />
                        <MinusIcon className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            defaultValue={option.value}
                            defaultChecked={option.checked}
                            id={`filter-mobile-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-stone-300 text-brand-700 focus:ring-brand-500"
                          />
                          <label
                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                            className="ml-3 min-w-0 flex-1 text-stone-500"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
