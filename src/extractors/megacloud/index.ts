import { VideoExtractor } from '../../models';
import axios from 'axios';
import CryptoJS from 'crypto-js';

class MegaCloud extends VideoExtractor {
  serverName = 'MegaCloud';
  sources = [];

  async extract(embedIframeURL: any, referer = 'https://hianime.to') {
    try {
      const extractedData = {
        subtitles: [],
        intro: {
          start: 0,
          end: 0,
        },
        outro: {
          start: 0,
          end: 0,
        },
        sources: [],
      };

      const { data: sourcesData } = await axios.get(
        `https://decrypt.zenime.site/extract?embed_url=${embedIframeURL.href}`
      );

      extractedData.sources = sourcesData.data.sources.map((s: any) => ({
        url: s.file,
        isM3U8: s.type === 'hls',
        type: s.type,
      }));

      extractedData.intro = sourcesData.data.intro ? sourcesData.data.intro : extractedData.intro;
      extractedData.outro = sourcesData.data.outro ? sourcesData.data.outro : extractedData.outro;
      extractedData.subtitles =
        sourcesData.data.tracks?.map((track: any) => ({
          url: track.file,
          lang: track.label ? track.label : track.kind,
        })) || [];

      return {
        intro: extractedData.intro,
        outro: extractedData.outro,
        sources: extractedData.sources,
        subtitles: extractedData.subtitles,
      };
    } catch (err) {
      throw err;
    }
  }
}

export default MegaCloud;
