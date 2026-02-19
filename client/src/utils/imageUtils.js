export const getOptimizedImageUrl = (url) => {
    if (!url) return null;

    // Handle Google Drive links
    if (url.includes('drive.google.com') || url.includes('docs.google.com')) {
        // If it's already optimized, return as is
        if (url.includes('export=view') || url.includes('export=download') || url.includes('thumbnail?id=')) return url;

        // Extract ID using robust patterns
        const idExtractPatterns = [
            /\/file\/d\/([a-zA-Z0-9_-]+)/, // /file/d/ID
            /id=([a-zA-Z0-9_-]+)/,         // id=ID
            /\/open\?id=([a-zA-Z0-9_-]+)/, // /open?id=ID
            /\/uc\?id=([a-zA-Z0-9_-]+)/    // /uc?id=ID
        ];

        for (const pattern of idExtractPatterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                // Use uc?export=view which serves the raw file
                return `https://drive.google.com/uc?export=view&id=${match[1]}`;
            }
        }
    }

    // Handle Dropbox links (dl=0 -> dl=1)
    if (url.includes('dropbox.com') && url.includes('dl=0')) {
        return url.replace('dl=0', 'dl=1');
    }

    // Return original URL if no optimization needed
    return url;
};

/**
 * Get a fallback URL for Google Drive images if the primary method fails.
 */
export const getGDriveFallbackUrl = (url) => {
    if (!url) return null;

    const idExtractPatterns = [
        /\/file\/d\/([a-zA-Z0-9_-]+)/,
        /id=([a-zA-Z0-9_-]+)/,
        /\/d\/([a-zA-Z0-9_-]+)/,
    ];

    for (const pattern of idExtractPatterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w2000`;
        }
    }
    return null;
};
