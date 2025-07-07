// import { useEffect } from 'react';
// let widgetReady = false;

// export default function TawkLoader() {
//     useEffect(() => {
//         console.log("TAWK URL:", process.env.REACT_APP_TAWK_URL);

//         window.Tawk_API = window.Tawk_API || {};
//         window.Tawk_API.autoStart = false;

//         window.Tawk_API.onLoad = () => {
//             console.log('Tawk loaded');
//             widgetReady = true;
//         };

//         window.Tawk_API.onStatusChange = (status) => {
//             console.log('Status:', status);
//             if (status === 'online' && widgetReady) {
//                 window.Tawk_API.start({ showWidget: true });
//             }
//         };

//         const s = document.createElement('script');
//         s.async = true;
//         s.src = process.env.REACT_APP_TAWK_URL;
//         s.charset = 'UTF-8';
//         s.setAttribute('crossorigin', '*');
//         document.getElementsByTagName('script')[0].parentNode.insertBefore(s, null);

//         return () => {
//             s.remove();
//             delete window.Tawk_API;
//             widgetReady = false;
//         };
//     }, []);

//     // expose readiness
//     window.__tawkWidgetReady = () => widgetReady;
//     return null;
// }
