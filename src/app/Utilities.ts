const platform:string  = 'SAI_GRACE_ACADEMY'
export class Utilities
{
    public static getPlatform(): string
    {
        if(platform)
        {
            return platform
        }
        else
        {
            throw new TypeError("Platform id is not set")
        }
        return ""
    }
}