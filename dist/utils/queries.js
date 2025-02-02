"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anilistStaffInfoQuery = exports.kitsuSearchQuery = exports.anilistStaffQuery = exports.anilistCharacterQuery = exports.anilistSiteStatisticsQuery = exports.anilistAiringScheduleQuery = exports.anilistGenresQuery = exports.anilistPopularQuery = exports.anilistTrendingQuery = exports.anilistMediaDetailQuery = exports.anilistSearchQuery = exports.anilistAdvancedQuery = void 0;
const anilistAdvancedQuery = () => `query ($page: Int, $id: Int, $type: MediaType, $isAdult: Boolean = false, $search: String, $format: [MediaFormat], $status: MediaStatus, $size: Int, $countryOfOrigin: CountryCode, $source: MediaSource, $season: MediaSeason, $seasonYear: Int, $year: String, $onList: Boolean, $yearLesser: FuzzyDateInt, $yearGreater: FuzzyDateInt, $episodeLesser: Int, $episodeGreater: Int, $durationLesser: Int, $durationGreater: Int, $chapterLesser: Int, $chapterGreater: Int, $volumeLesser: Int, $volumeGreater: Int, $licensedBy: [String], $isLicensed: Boolean, $genres: [String], $excludedGenres: [String], $tags: [String], $excludedTags: [String], $minimumTagRank: Int, $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]) { Page(page: $page, perPage: $size) { pageInfo { total perPage currentPage lastPage hasNextPage } media(id: $id, type: $type, season: $season, format_in: $format, status: $status, countryOfOrigin: $countryOfOrigin, source: $source, search: $search, onList: $onList, seasonYear: $seasonYear, startDate_like: $year, startDate_lesser: $yearLesser, startDate_greater: $yearGreater, episodes_lesser: $episodeLesser, episodes_greater: $episodeGreater, duration_lesser: $durationLesser, duration_greater: $durationGreater, chapters_lesser: $chapterLesser, chapters_greater: $chapterGreater, volumes_lesser: $volumeLesser, volumes_greater: $volumeGreater, licensedBy_in: $licensedBy, isLicensed: $isLicensed, genre_in: $genres, genre_not_in: $excludedGenres, tag_in: $tags, tag_not_in: $excludedTags, minimumTagRank: $minimumTagRank, sort: $sort, isAdult: $isAdult) {  id idMal status(version: 2) title { userPreferred romaji english native } bannerImage coverImage{ extraLarge large medium color } episodes season popularity description format seasonYear genres averageScore countryOfOrigin nextAiringEpisode { airingAt timeUntilAiring episode }  } } }`;
exports.anilistAdvancedQuery = anilistAdvancedQuery;
const anilistSearchQuery = (query, page, perPage, type = 'ANIME') => `query ($page: Int = ${page}, $id: Int, $type: MediaType = ${type}, $search: String = "${query}", $isAdult: Boolean = false, $size: Int = ${perPage}) { Page(page: $page, perPage: $size) { pageInfo { total perPage currentPage lastPage hasNextPage } media(id: $id, type: $type, search: $search, isAdult: $isAdult) { id idMal status(version: 2) title { userPreferred romaji english native } bannerImage popularity coverImage{ extraLarge large medium color } episodes format season description seasonYear chapters volumes averageScore genres nextAiringEpisode { airingAt timeUntilAiring episode }  } } }`;
exports.anilistSearchQuery = anilistSearchQuery;
const anilistMediaDetailQuery = (id) => `query ($id: Int = ${id}) { Media(id: $id) { id idMal title { english native romaji } synonyms countryOfOrigin isAdult season seasonYear description type format status(version: 2) episodes duration chapters volumes  } }`;
exports.anilistMediaDetailQuery = anilistMediaDetailQuery;
const anilistTrendingQuery = (page = 1, perPage = 20, type = 'ANIME') => `query ($page: Int = ${page}, $id: Int, $type: MediaType = ${type}, $isAdult: Boolean = false, $size: Int = ${perPage}, $sort: [MediaSort] = [TRENDING_DESC, POPULARITY_DESC]) { Page(page: $page, perPage: $size) { pageInfo { total perPage currentPage lastPage hasNextPage } media(id: $id, type: $type, isAdult: $isAdult, sort: $sort) { id idMal status(version: 2) title { userPreferred romaji english native } genres trailer { id site thumbnail } description format bannerImage coverImage{ extraLarge large medium color } episodes meanScore duration season seasonYear averageScore nextAiringEpisode { airingAt timeUntilAiring episode }  } } }`;
exports.anilistTrendingQuery = anilistTrendingQuery;
const anilistPopularQuery = (page = 1, perPage = 20, type = 'ANIME') => `query ($page: Int = ${page}, $id: Int, $type: MediaType = ${type}, $isAdult: Boolean = false, $size: Int = ${perPage}, $sort: [MediaSort] = [POPULARITY_DESC]) { Page(page: $page, perPage: $size) { pageInfo { total perPage currentPage lastPage hasNextPage } media(id: $id, type: $type, isAdult: $isAdult, sort: $sort) { id idMal status(version: 2) title { userPreferred romaji english native } trailer { id site thumbnail } format genres bannerImage description coverImage { extraLarge large medium color } episodes meanScore duration season seasonYear averageScore nextAiringEpisode { airingAt timeUntilAiring episode }  } } }`;
exports.anilistPopularQuery = anilistPopularQuery;
const anilistGenresQuery = (genres, page = 1, perPage = 20) => `query ($genres: [String] = ${JSON.stringify(genres)}, $page: Int = ${page}, $type: MediaType = ANIME, $isAdult: Boolean = false, $size: Int = ${perPage}) {Page(page: $page, perPage: $size) { pageInfo { total perPage currentPage lastPage hasNextPage } media(type: $type, isAdult: $isAdult, genre_in: $genres) { id idMal status(version: 2) title { userPreferred romaji english native } trailer { id site thumbnail } format bannerImage description coverImage { extraLarge large medium color } episodes meanScore duration season seasonYear averageScore nextAiringEpisode { airingAt timeUntilAiring episode }  } } }`;
exports.anilistGenresQuery = anilistGenresQuery;
const anilistAiringScheduleQuery = (page = 1, perPage = 20, weekStart, weekEnd, notYetAired) => `query { Page(page: ${page}, perPage: ${perPage}) { pageInfo { total perPage currentPage lastPage hasNextPage } airingSchedules( notYetAired: ${notYetAired}, airingAt_greater: ${weekStart}, airingAt_lesser: ${weekEnd}) { airingAt episode media { id description idMal title { romaji english userPreferred native } countryOfOrigin description popularity bannerImage coverImage { extraLarge large medium color } genres averageScore seasonYear format } } } }`;
exports.anilistAiringScheduleQuery = anilistAiringScheduleQuery;
const anilistSiteStatisticsQuery = () => `query { SiteStatistics { anime { nodes { count } } } }`;
exports.anilistSiteStatisticsQuery = anilistSiteStatisticsQuery;
const anilistCharacterQuery = () => `query character($id: Int) { Character(id: $id) { id name { first middle last full native userPreferred alternative alternativeSpoiler } image { large medium } description gender dateOfBirth { year month day } bloodType age favourites media { edges { characterRole node { id idMal title { romaji english native userPreferred } coverImage { extraLarge large medium color } averageScore startDate { year month day } episodes format status } } } } }`;
exports.anilistCharacterQuery = anilistCharacterQuery;
const anilistStaffQuery = () => `query staff($id: Int, $sort: [MediaSort], $characterPage: Int, $staffPage: Int, $onList: Boolean, $type: MediaType, $withCharacterRoles: Boolean = false, $withStaffRoles: Boolean = false) { Staff(id: $id) { id name { first middle last full native userPreferred alternative } image { large } description favourites isFavourite isFavouriteBlocked age gender yearsActive homeTown bloodType primaryOccupations dateOfBirth { year month day } dateOfDeath { year month day } language: languageV2 characterMedia(page: $characterPage, sort: $sort, onList: $onList) @include(if: $withCharacterRoles) { pageInfo { total perPage currentPage lastPage hasNextPage } edges { characterRole characterName node { id type bannerImage isAdult title { userPreferred } coverImage { large } startDate { year } mediaListEntry { id status } } characters { id name { userPreferred } image { large } } } } staffMedia(page: $staffPage, type: $type, sort: $sort, onList: $onList) @include(if: $withStaffRoles) { pageInfo { total perPage currentPage lastPage hasNextPage } edges { staffRole node { id type isAdult title { userPreferred } coverImage { large } mediaListEntry { id status } } } } } }`;
exports.anilistStaffQuery = anilistStaffQuery;
const kitsuSearchQuery = (query) => `query{searchAnimeByTitle(first:5, title:"${query}"){ nodes {id season startDate titles { localized } episodes(first: 2000){ nodes { number createdAt titles { canonical } description thumbnail { original { url } } } } } } }`;
exports.kitsuSearchQuery = kitsuSearchQuery;
const anilistStaffInfoQuery = (id) => `query($id: Int = ${id}) { Staff(id: $id) { id name { first last native full } image { large medium } description siteUrl staffMedia { edges { id node { id title { romaji english native } type coverImage { extraLarge large medium color } } } } } }
`;
exports.anilistStaffInfoQuery = anilistStaffInfoQuery;
//# sourceMappingURL=queries.js.map