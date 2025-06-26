export const Share = async () => {
    const shareData = {
        title: "Dants-sport",
        text: "Check out this app: Dants-sport",
        url: window.location.href,
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
            console.log('Venue shared successfully');
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        try {
            await navigator.clipboard.writeText(shareData.url);
            alert('Link copied to clipboard!');
        } catch (err) {
            alert('Could not copy the link. Please copy it manually.');
        }
    }
};
