import { ANIME, META } from '../src/providers';
import type { ITitle } from '../src/models/types';

jest.setTimeout(120000);
console.log('Testing zoro');

const zoro = new ANIME.Zoro('hianime.to');
const anilist = new META.Anilist();
const TestCases: { desc: string; input: number; output: string }[] = [
  {
    desc: 'Fetching Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka',
    input: 20920,
    output: 'is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-1115',
  },
  {
    desc: 'Fetching Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka II',
    input: 101167,
    output: 'is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-ii-2484',
  },
  {
    desc: 'Fetching Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka III',
    input: 112124,
    output: 'is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iii-781',
  },
  {
    desc: 'Fetching Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka IV: Shin Shou Meikyuu-hen',
    input: 129196,
    output: 'is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv-17501',
  },
  {
    desc: 'Fetching Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka IV: Shin Shou Yakusai-hen',
    input: 155211,
    output: 'is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv-part-2-18241',
  },
  {
    desc: 'Fetching Danmachi Season 5',
    input: 170732,
    output: 'is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-v-19323',
  },
  {
    desc: 'Fetching Arifureta Shokugyou de Sekai Saikyou 3rd season',
    input: 154473,
    output: 'arifureta-from-commonplace-to-worlds-strongest-season-3-19321',
  },
  {
    desc: 'Fetching Kimi wa Meido-sama',
    input: 172190,
    output: 'you-are-ms-servant-19331',
  },
  {
    desc: 'Fetching Rurouni Kenshin: Meiji Kenkaku Romantan - Kyoto Douran',
    input: 171637,
    output: 'rurouni-kenshin-kyoto-disturbance-19340',
  },
  {
    desc: 'Fetching Re:Zero kara Hajimeru Isekai Seikatsu 3rd Season',
    input: 163134,
    output: 'rezero-starting-life-in-another-world-season-3-19301',
  },
  {
    desc: 'Fetching Kusuriya no Hitorigoto 2nd Season',
    input: 176301,
    output: 'the-apothecary-diaries-season-2-19429',
  },
  {
    desc: 'Fetching Kusuriya no Hitorigoto 2nd Season',
    input: 176301,
    output: 'the-apothecary-diaries-season-2-19429',
  },
];

//for (const testcase of TestCases) {
//  test(testcase.desc, async () => {
//    const res = await zoro.fetchIdFromAnilistId(`${testcase.input}`);
//    expect(res.id).toEqual(testcase.output);
//  });
//}

const EpisodeTestCases: { desc: string; input: string; output: string }[] = [
  {
    desc: 'Episode 2 of i may be a guild receptionist but ill solo any boss to clock out on time',
    input:
      'i-may-be-a-guild-receptionist-but-ill-solo-any-boss-to-clock-out-on-time-19441$episode$131985$dub',
    output: '',
  },
];

for (const testcase of EpisodeTestCases) {
  test(testcase.desc, async () => {
    debugger;
    const res = await zoro.fetchEpisodeSources(testcase.input);
    expect(res.sources).toEqual(testcase.output);
  });
}
