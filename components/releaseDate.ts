type ReleaseDates = {
    certification: string;
    note: string;
    release_date: string
};

type region = {
    iso_3166_1: string;
    release_dates: ReleaseDates[];
};

export function getReleaseInfo(releaseDates: region[]){
    const usRelease = releaseDates?.find((region) => region.iso_3166_1 === 'US');
  
    const certifiedRelease = usRelease?.release_dates.find(
    (entry) => entry.certification?.trim() !== '' && entry.note?.trim() === ""
    );
    const fallbackRelease = usRelease?.release_dates[0];

    const usReleaseDate = (certifiedRelease || fallbackRelease)?.release_date;
    const usCertification = certifiedRelease?.certification || 'Unrated';

    return {
        usReleaseDate,
        usCertification,
    }
}


