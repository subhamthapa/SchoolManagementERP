export interface GeneralConfigAttribute
{
    website_name: string
    website_theme: string
    navbar_theme: string
}

export interface SocialMediaAttributes
{
    id: number
    name: string
    url: string
}

export interface SetGeneralConfig
{
    platform: string
    attributes: GeneralConfigAttribute
    social_media: SocialMediaAttributes[]
}
