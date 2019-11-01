declare module varyColor {
  function lighten(colorStr: string, weight: number): string;

  function darken(colorStr: string, weight: number): string;

  function mix(
    color1: string,
    color2: string,
    weight1: number,
    alpha1: number,
    alpha2: number,
  ): string;

  function toNum3(colorStr): number[3];

  function rgba(colorStr: string, alpha: number, bgColorStr: string): string;

  function rgbaToRgb(colorStr: string, alpha: number, bgColorStr: string): string;

  function pad2(num: number): string;
}
