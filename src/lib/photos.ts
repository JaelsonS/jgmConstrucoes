const modules = import.meta.glob("../assets/opt/stage-*-*.*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const WIDTHS = [640, 960, 1280, 1600] as const;

export type StagePhoto = {
  avif: string;
  webp: string;
  src: string;
  width: 1600;
  height: 912;
};

function urlFor(stage: number, width: number, ext: "avif" | "webp") {
  const match = Object.entries(modules).find(([key]) => key.endsWith(`stage-${stage}-${width}.${ext}`));
  if (!match?.[1]) throw new Error(`Missing optimized image stage-${stage}-${width}.${ext}`);
  return match[1];
}

function build(stage: number): StagePhoto {
  return {
    avif: WIDTHS.map((width) => `${urlFor(stage, width, "avif")} ${width}w`).join(", "),
    webp: WIDTHS.map((width) => `${urlFor(stage, width, "webp")} ${width}w`).join(", "),
    src: urlFor(stage, 960, "webp"),
    width: 1600,
    height: 912,
  };
}

export const STAGES: [StagePhoto, StagePhoto, StagePhoto, StagePhoto] = [
  build(1),
  build(2),
  build(3),
  build(4),
];
