// @splidejs/react-splide ships its types in dist/types but its package.json "exports" map does not
// point at them, so TypeScript's "bundler" resolution cannot find them. Re-declare the module from
// those bundled types (types only; the runtime import is untouched).
declare module "@splidejs/react-splide" {
  type T = typeof import("../node_modules/@splidejs/react-splide/dist/types/index");
  export const Splide: T["Splide"];
  export const SplideSlide: T["SplideSlide"];
  export const SplideTrack: T["SplideTrack"];
}
