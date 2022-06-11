export interface CovidData {
    cases: number,
    todayCases: number,
    deaths: number,
    todayDeaths: number,
    recovered: number,
    todayRecovered: number,
    continent?: string,
    country?: string,
    countryInfo: {
        flag: string
    }
}