import { VideoExtractor } from '../../models';
declare class MegaCloud extends VideoExtractor {
    serverName: string;
    sources: never[];
    extract(embedIframeURL: URL, referer?: string): Promise<{
        intro: {
            start: number;
            end: number;
        };
        outro: {
            start: number;
            end: number;
        };
        sources: never[];
        subtitles: never[];
    }>;
}
export default MegaCloud;
