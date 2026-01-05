import{r as c,j as e}from"./index-Bb3NupjY.js";const m=({isOpen:t,type:l,message:x,onClose:s,duration:a=4e3})=>{const[d,n]=c.useState(100);if(c.useEffect(()=>{if(t){const i=setInterval(()=>{n(o=>o<=0?(clearInterval(i),s(),0):o-100/(a/100))},100);return()=>clearInterval(i)}else n(100)},[t,a,s]),!t)return null;const g=()=>{switch(l){case"success":return e.jsx("i",{className:"ri-checkbox-circle-line text-2xl"});case"error":return e.jsx("i",{className:"ri-close-circle-line text-2xl"});case"warning":return e.jsx("i",{className:"ri-alert-line text-2xl"});case"info":return e.jsx("i",{className:"ri-information-line text-2xl"});default:return e.jsx("i",{className:"ri-notification-line text-2xl"})}},r=(()=>{switch(l){case"success":return{bg:"bg-green-50",border:"border-green-200",icon:"text-green-600",text:"text-green-800",progress:"bg-green-600"};case"error":return{bg:"bg-red-50",border:"border-red-200",icon:"text-red-600",text:"text-red-800",progress:"bg-red-600"};case"warning":return{bg:"bg-yellow-50",border:"border-yellow-200",icon:"text-yellow-600",text:"text-yellow-800",progress:"bg-yellow-600"};case"info":return{bg:"bg-blue-50",border:"border-blue-200",icon:"text-blue-600",text:"text-blue-800",progress:"bg-blue-600"};default:return{bg:"bg-gray-50",border:"border-gray-200",icon:"text-gray-600",text:"text-gray-800",progress:"bg-gray-600"}}})();return e.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center pointer-events-none",children:[e.jsx("div",{className:"pointer-events-auto animate-[slide-up_0.3s_ease-out]",children:e.jsxs("div",{className:`${r.bg} ${r.border} border rounded-lg shadow-2xl max-w-md w-full mx-4 overflow-hidden`,children:[e.jsxs("div",{className:"flex items-start gap-4 p-6",children:[e.jsx("div",{className:`${r.icon} flex-shrink-0`,children:g()}),e.jsx("div",{className:"flex-1 min-w-0",children:e.jsx("p",{className:`${r.text} text-sm leading-relaxed`,children:x})}),e.jsx("button",{onClick:s,className:`${r.icon} hover:opacity-70 transition-opacity flex-shrink-0`,children:e.jsx("i",{className:"ri-close-line text-xl"})})]}),e.jsx("div",{className:"h-1 bg-gray-200",children:e.jsx("div",{className:`h-full ${r.progress} transition-all duration-100 ease-linear`,style:{width:`${d}%`}})})]})}),e.jsx("style",{children:`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `})]})};export{m as N};
//# sourceMappingURL=NotificationPopup-Br5iZ8zM.js.map
