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

      const match = /\/([^\/\?]+)\?/.exec(embedIframeURL.href);
      const sourceId = match?.[1];
      if (!sourceId) throw new Error('Unable to extract sourceId from embed URL');
      const { data: key } = await axios.get(
        'https://raw.githubusercontent.com/itzzzme/megacloud-keys/refs/heads/main/key.txt'
      );
      const megacloudUrl = `https://megacloud.blog/embed-2/v2/e-1/getSources?id=${sourceId}`;

      const { data: rawSourceData } = await axios.get(megacloudUrl);
      const encrypted = rawSourceData?.sources;
      if (!encrypted) throw new Error('No data from src');
      const decrypted = JSON.parse(CryptoJS.AES.decrypt(encrypted, key.trim()).toString(CryptoJS.enc.Utf8));
      if (!decrypted && !Array.isArray(decrypted)) throw new Error('Decryption Failed');

      extractedData.sources = decrypted.map((s: any) => ({
        url: s.file,
        isM3U8: s.type === 'hls',
        type: s.type,
      }));

      extractedData.intro = rawSourceData.intro ? rawSourceData.intro : extractedData.intro;
      extractedData.outro = rawSourceData.outro ? rawSourceData.outro : extractedData.outro;
      extractedData.subtitles =
        rawSourceData.tracks?.map((track: any) => ({
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
