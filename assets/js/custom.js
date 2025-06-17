// Replace the complete path of label a with the root path
document.addEventListener('DOMContentLoaded', function () {
    const { isTargetSite, targetRoute, baseUrl} = getModifyRouteConfig();
    if(!isTargetSite || !targetRoute || !baseUrl){
        return
    }
    // current site need change route
    document.body.querySelectorAll('*').forEach((element) => {
        if (element.tagName === 'A') {
            const href = element.getAttribute('href');
            const originalPath = new URL(href, window.location.origin).pathname;
            const baseURlPath = new URL(baseUrl).pathname.replace(/\/$/g, '');
            // href consistent with baseUrl
            if(originalPath.includes(baseURlPath)){
                const newPath = originalPath.replace(baseURlPath, targetRoute);
                element.setAttribute('href', newPath);
            }
        }
    });
});

function getModifyRouteConfig(){
    const element = document.getElementById('site-config');
    const targetRoute = element?.getAttribute('data-target-route');
    const destination = element?.getAttribute('data-destination');
    const baseUrl = element?.getAttribute('data-base-url');
    if(!targetRoute || !destination || !baseUrl){
        return {}
    }
    const destinations = destination.replace(/^\[|\]$/g, '').split(' ');
    const currentUrl = window.location.href;
    const isTargetSite = destinations.some((trustedUrl) => {
        const regex = new RegExp(`^${trustedUrl}`);
        return regex.test(currentUrl);
    });

    return {
        isTargetSite,
        targetRoute,
        baseUrl
    }
}

window.getModifyRouteConfig = getModifyRouteConfig;