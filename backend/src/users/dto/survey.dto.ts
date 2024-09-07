import { IsEnum, IsNotEmpty, IsOptional, IsString, IsArray, IsBoolean, ArrayNotEmpty } from 'class-validator';

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
    CONCEPT_DESIGN = 'Game Concept Design',
    ANIMATION = 'Animation',
    MOVIE = 'Movie',
    YOUTUBE = 'Youtube Contents',
    EDUCATION = 'Education',
    OTHER = 'Other'
}

export class SurveyDto {
    @IsString()
    @IsNotEmpty()
    readonly country: string;

    @IsArray()
    @IsEnum(Occupation, { each: true })
    @ArrayNotEmpty()
    readonly occupation: Occupation[];

    @IsOptional()
    @IsString()
    readonly otherOccupation?: string;

    @IsArray()
    @IsEnum(Industry, { each: true })
    @IsNotEmpty()
    readonly companyIndustry: Industry[];

    @IsOptional()
    @IsString()
    readonly otherIndustry?: string;

    @IsEnum(CompanySize)
    @IsNotEmpty()
    readonly companySize: CompanySize;

    @IsEnum(TeamSize)
    @IsOptional()
    readonly teamSize?: TeamSize;

    @IsOptional()
    @IsBoolean()
    readonly teamSharesAccount?: boolean;

    @IsArray()
    @IsString({ each: true })
    @ArrayNotEmpty()
    readonly usageOfAnvilAI: UsageOfAnvilAI[];

    @IsOptional()
    @IsString()
    readonly otherUsageOfAnvilAI?: string;
}
