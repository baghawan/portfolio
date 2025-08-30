export type HomeIntro = Readonly<{
  title: string;
  description: string;
}>;

export type Home = Readonly<{
  intro: HomeIntro;
}>;
