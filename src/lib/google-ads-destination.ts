/** Google Ads account configured on this page for Google's dynamic-number domain verification. Config only: no events or conversion labels. */
export const GOOGLE_ADS_DESTINATION_ID = "AW-11380233464";

/**
 * Adds one `config` for the destination to the Google tag that GTM already installs; it loads nothing itself.
 * Uses `window.gtag` when present, otherwise queues the Arguments object gtag.js replays, via `dataLayer.push`
 * so a GTM-wrapped push still sees it. A window flag plus a dataLayer scan stop a re-run from configuring twice.
 */
export const GOOGLE_ADS_DESTINATION_SCRIPT = `(function(w,id){var dl=w.dataLayer=w.dataLayer||[];if(w.__googleAdsDestination===id)return;w.__googleAdsDestination=id;for(var i=0;i<dl.length;i++){if(dl[i]&&dl[i][0]==="config"&&dl[i][1]===id)return;}if(typeof w.gtag==="function"){w.gtag("config",id);return;}(function(){dl.push(arguments);})("config",id);})(window,${JSON.stringify(GOOGLE_ADS_DESTINATION_ID)});`;
