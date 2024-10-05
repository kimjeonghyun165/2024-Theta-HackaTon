import countryList from "react-select-country-list";

export enum Occupation {
    ARTIST_3D = '3D Artist',
    ASSET_DESIGNER = '3D Asset Designer',
    TECHNICAL_ARTIST = 'Technical Artist',
    GRAPHIC_DESIGNER = 'Graphic Designer',
    CONCEPT_ARTIST = 'Concept Artist',
    GAME_DESIGNER = 'Game Designer',
    DEVELOPER = 'Developer',
    TEACHER = 'Teacher, Educator',
    STUDENT = 'Student',
    HOBBYIST = 'Hobbyist',
    CONTENT_CREATOR = 'Contents Creator (Youtuber, Virtuber, Blogger, BJ, etc.)',
    ARCHITECT = 'Architect / Interior Designer',
    OTHER = 'Other',
}

export enum Industry {
    GAMING = 'Gaming',
    ENTERTAINMENT = 'Entertainment, Film',
    AR_VR = 'AR/VR',
    SOFTWARE = 'Software, Online Service',
    PRINTING = '3D Printing',
    ARCHITECTURE = 'Architecture, Construction',
    EDUCATION = 'Education, Training',
    MANUFACTURING = 'Manufacturing, Product Design',
    MEDIA = 'News, Media, Press',
    OTHER = 'Other',
}

export enum CompanySize {
    ONLY_ME = 'Only me',
    TWO_TO_TEN = '2-10',
    ELEVEN_TO_FIFTY = '11-50',
    FIFTY_ONE_TO_TWO_HUNDRED = '51-200',
    TWO_HUNDRED_ONE_TO_THOUSAND = '201-1000',
    THOUSAND_PLUS = '1000+',
}

export enum TeamSize {
    ONLY_ME = '1',
    TWO_TO_FIVE = '2-5',
    SIX_TO_TEN = '6-10',
    ELEVEN_TO_FIFTY = '11-50',
    FIFTY_ONE_TO_TWO_HUNDRED = '51-200',
    TWO_HUNDRED_ONE_TO_THOUSAND = '201-1000',
    THOUSAND_PLUS = '1000+',
}

export enum UsageOfAnvilAI {
    ASSET_DESIGN = '3D Asset Design & Merchandise',
    NFT_CREATION = 'NFT Creation',
    GAME_DESIGN = 'Game Design',
    GAME_DEVELOPMENT = 'Game Development',
    PRINTING = '3D Printing',
    GAME_CONCEPT_DESIGN = 'Game Concept Design',
    ANIMATION = 'Animation',
    MOVIE = 'Movie',
    YOUTUBE_CONTENTS = 'Youtube Contents',
    EDUCATION = 'Education',
    OTHER = 'Other',
}

export const surveyQuestions = [
    {
        subtitle: "Country",
        options: countryList().getData().map((country) => country.label),
        placeHolder: "Select Country",
        isSearch: true,
        isMulti: false,
    },
    {
        subtitle: "Occupation",
        options: Object.values(Occupation),
        placeHolder: "Select Your Occupation(s)",
        isSearch: true,
        isMulti: true,
    },
    {
        subtitle: "Company Industry",
        options: Object.values(Industry),
        placeHolder: "Select Industry",
        isSearch: true,
        isMulti: true,
    },
    {
        subtitle: "Usage of ANVIL AI",
        options: Object.values(UsageOfAnvilAI),
        placeHolder: "Select Your Usage of ANVIL AI",
        isSearch: true,
        isMulti: true,
    },
    {
        subtitle: "Company Size",
        options: Object.values(CompanySize),
        placeHolder: "Select Number of Employee",
        isSearch: false,
        isMulti: false,
    },
    {
        subtitle: "Size of your Team",
        options: Object.values(TeamSize),
        placeHolder: "Select Number of your Team",
        isSearch: false,
        isMulti: false,
        condition: "Company Size",
    },
    {
        subtitle: "Do your team shares this account?",
        options: ["Yes", "No"],
        placeHolder: "Yes, we share this account",
        isSearch: false,
        isMulti: false,
        condition: "Company Size",
    },
];