"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const axios_1 = __importDefault(require("axios"));
const crypto_js_1 = __importDefault(require("crypto-js"));
class MegaCloud extends models_1.VideoExtractor {
    constructor() {
        super(...arguments);
        this.serverName = 'MegaCloud';
        this.sources = [];
    }
    async extract(embedIframeURL, referer = 'https://hianime.to') {
        var _a;
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
            const sourceId = match === null || match === void 0 ? void 0 : match[1];
            if (!sourceId)
                throw new Error('Unable to extract sourceId from embed URL');
            const { data: key } = await axios_1.default.get('https://raw.githubusercontent.com/itzzzme/megacloud-keys/refs/heads/main/key.txt');
            const megacloudUrl = `https://megacloud.blog/embed-2/v2/e-1/getSources?id=${sourceId}`;
            const { data: rawSourceData } = await axios_1.default.get(megacloudUrl);
            const encrypted = rawSourceData === null || rawSourceData === void 0 ? void 0 : rawSourceData.sources;
            if (!encrypted)
                throw new Error('No data from src');
            const decrypted = JSON.parse(crypto_js_1.default.AES.decrypt(encrypted, key.trim()).toString(crypto_js_1.default.enc.Utf8));
            if (!decrypted && !Array.isArray(decrypted))
                throw new Error('Decryption Failed');
            extractedData.sources = decrypted.map((s) => ({
                url: s.file,
                isM3U8: s.type === 'hls',
                type: s.type,
            }));
            extractedData.intro = rawSourceData.intro ? rawSourceData.intro : extractedData.intro;
            extractedData.outro = rawSourceData.outro ? rawSourceData.outro : extractedData.outro;
            extractedData.subtitles =
                ((_a = rawSourceData.tracks) === null || _a === void 0 ? void 0 : _a.map((track) => ({
                    url: track.file,
                    lang: track.label ? track.label : track.kind,
                }))) || [];
            return {
                intro: extractedData.intro,
                outro: extractedData.outro,
                sources: extractedData.sources,
                subtitles: extractedData.subtitles,
            };
        }
        catch (err) {
            throw err;
        }
    }
}
exports.default = MegaCloud;
//# sourceMappingURL=index.js.map