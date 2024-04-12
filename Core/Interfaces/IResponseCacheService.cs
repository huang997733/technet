namespace Core;

public interface IResponseCacheService
{
    Task CachResponseAsync(string cacheKey, object response, TimeSpan timeToLive);
    Task<string> GetCachedResponseAsync(string cacheKey);
}
