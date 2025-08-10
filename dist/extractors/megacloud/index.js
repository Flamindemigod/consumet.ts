"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const axios_1 = __importDefault(require("axios"));
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
            const { data: sourcesData } = await axios_1.default.get(`https://decrypt.zenime.site/extract?embed_url=${embedIframeURL.href}`);
            extractedData.sources = sourcesData.data.sources.map((s) => ({
                url: s.file,
                isM3U8: s.type === 'hls',
                type: s.type,
            }));
            extractedData.intro = sourcesData.data.intro ? sourcesData.data.intro : extractedData.intro;
            extractedData.outro = sourcesData.data.outro ? sourcesData.data.outro : extractedData.outro;
            extractedData.subtitles =
                ((_a = sourcesData.data.tracks) === null || _a === void 0 ? void 0 : _a.map((track) => ({
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