import{c as T,r as c,s as l,j as e,R as A}from"./index-Bb3NupjY.js";function q(){const{id:m}=T(),[r,w]=c.useState(null),[x,g]=c.useState(!0),[u,j]=c.useState(null);c.useEffect(()=>{m&&C(parseInt(m))},[m]),c.useEffect(()=>{if(r&&!x){const s=setTimeout(()=>{window.print()},1e3);return()=>clearTimeout(s)}},[r,x]);const C=async s=>{try{g(!0),j(null);const{data:a,error:n}=await l.from("cotizaciones").select("*").eq("id",s).single();if(n)throw n;let o=null;if(a.cliente_id){const{data:i,error:d}=await l.from("clientes").select("*").eq("id",a.cliente_id).single();!d&&i?o=i:(console.warn("No se pudo cargar el cliente:",d),o={id:a.cliente_id,razon_social:"Cliente Ejemplo S.A.",identificacion:"3-101-2562-32",correo:"cliente@ejemplo.com",telefono:"2205-2525",direccion:"San José, Costa Rica"})}const{data:p,error:y}=await l.from("cotizacion_items").select("*").eq("cotizacion_id",s);if(y)throw y;const I=await Promise.all((p||[]).map(async i=>{let d=null;if(i.producto_id){const{data:h}=await l.from("productos").select("*").eq("id_producto",i.producto_id).single();d=h}let v=[];if(i.producto_id){const{data:h}=await l.from("bom_items").select("*").eq("product_id",i.producto_id);v=h||[]}return{...i,producto:d,bom_items:v}}));w({...a,cliente:o,cotizacion_items:I})}catch(a){console.error("Error cargando cotización detallada:",a),j(a.message||"Error al cargar la cotización")}finally{g(!1)}},b=s=>{if(!s)return"Fecha no disponible";try{const a=new Date(s);return isNaN(a.getTime())?"Fecha inválida":a.toLocaleDateString("es-CR",{year:"numeric",month:"long",day:"numeric"})}catch{return"Fecha inválida"}},t=s=>{const a=Number(s);return isNaN(a)||s===null||s===void 0?"₡0,00":new Intl.NumberFormat("es-CR",{style:"currency",currency:"CRC",minimumFractionDigits:2,maximumFractionDigits:2}).format(a)};if(x)return e.jsx("div",{className:"min-h-screen bg-white flex items-center justify-center print:hidden",children:e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),e.jsx("p",{className:"mt-4 text-gray-600",children:"Preparando vista de impresión..."})]})});if(u||!r)return e.jsx("div",{className:"min-h-screen bg-white flex items-center justify-center print:hidden",children:e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-red-500 text-6xl mb-4",children:"⚠️"}),e.jsx("h2",{className:"text-2xl font-bold text-gray-800 mb-2",children:"Error al cargar"}),e.jsx("p",{className:"text-gray-600 mb-4",children:u||"Cotización no encontrada"}),e.jsx("button",{onClick:()=>window.close(),className:"bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700",children:"Cerrar"})]})});const k=r.codigo||r.numero_cotizacion||r.id.toString(),_=r.fecha_emision||r.fecha_cotizacion||"",N=Number(r.subtotal)||0,f=Number(r.descuento_global||r.descuento_general)||0,z=(N-f)*.13,D=Number(r.impuestos||r.impuesto)||z,S=r.cliente?.razon_social||r.cliente?.nombre_completo||r.cliente?.nombre||"Cliente Ejemplo S.A.",E=r.cliente?.identificacion||r.cliente?.cedula||"3-101-2562-32",O=r.cliente?.correo||r.cliente?.email||"cliente@ejemplo.com",F=r.cliente?.telefono||r.cliente?.celular||"2205-2525",R=r.cliente?.direccion||"San José, Costa Rica";return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        @media print {
          body { 
            margin: 0; 
            padding: 0; 
            font-size: 11px;
            line-height: 1.3;
            color: #000;
          }
          .print-hidden { display: none !important; }
          .print-page-break { page-break-before: always; }
          .print-no-break { page-break-inside: avoid; }
          .break-inside-avoid { page-break-inside: avoid; }
          
          /* Reglas específicas para evitar cortes indeseados */
          .item-with-bom {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .bom-section {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-top: 0;
          }
          
          .product-row {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .totals-section { 
            page-break-inside: avoid;
            break-inside: avoid;
            margin-top: 20px;
          }
          
          .header-section {
            page-break-after: avoid;
            break-after: avoid;
          }
          
          .client-info {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          table { 
            page-break-inside: auto; 
            border-collapse: collapse;
            width: 100%;
          }
          
          tr { 
            page-break-inside: avoid; 
            page-break-after: auto;
            break-inside: avoid;
          }
          
          thead { 
            display: table-header-group; 
            page-break-after: avoid;
            break-after: avoid;
          }
          
          tfoot { 
            display: table-footer-group; 
          }
          
          .bom-block { 
            display: block !important; 
            page-break-inside: avoid;
            break-inside: avoid;
            margin: 8px 0;
            padding: 8px;
            border-left: 3px solid #ddd;
            background-color: #f8f9fa;
          }
          
          @page { 
            margin: 1.5cm; 
            size: A4; 
          }
          
          h1, h2, h3 { 
            page-break-after: avoid;
            break-after: avoid;
            margin-bottom: 8px;
          }
          
          /* Asegurar que los componentes BOM no se separen del producto */
          .product-with-components {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
        
        @media screen {
          .print-controls {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border: 1px solid #e5e7eb;
          }
        }
      `}),e.jsxs("div",{className:"print-controls print-hidden",children:[e.jsxs("button",{onClick:()=>window.print(),className:"bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mr-2 flex items-center",children:[e.jsx("i",{className:"ri-printer-line mr-2"}),"🖨️ Imprimir"]}),e.jsx("button",{onClick:()=>window.close(),className:"bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700",children:"Cerrar"})]}),e.jsx("div",{className:"bg-white min-h-screen",children:e.jsxs("div",{className:"max-w-4xl mx-auto p-8",children:[e.jsxs("div",{className:"header-section flex justify-between items-start mb-8 print-no-break",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYi7j4OFVRmD2T0m6NyFHqYa96zun92AUTIA&s",alt:"OLO Logo",className:"w-16 h-16 rounded-lg mr-4 object-contain"}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-2xl font-bold text-gray-900 mb-1",children:"Overseas Logistics Operations"}),e.jsxs("div",{className:"text-sm text-gray-600 space-y-1",children:[e.jsx("p",{children:"Centro logístico IRO (CLIRO), Bodega 100A"}),e.jsx("p",{children:"200 mts al oeste de la Iglesia Católica El Coyol, Alajuela"}),e.jsx("p",{children:"Tel: 2205 2525 | Email: Olo@Olo.com"}),e.jsx("p",{children:"Cédula: 3-101-101010"})]})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-900",children:"COTIZACIÓN"}),e.jsxs("p",{className:"text-lg text-gray-600",children:["#",k]})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 client-info",children:[e.jsxs("div",{className:"bg-gray-50 p-6 rounded-lg print-no-break",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Información del Cliente"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("p",{children:[e.jsx("span",{className:"font-medium",children:"Nombre:"})," ",S]}),e.jsxs("p",{children:[e.jsx("span",{className:"font-medium",children:"Identificación:"})," ",E]}),e.jsxs("p",{children:[e.jsx("span",{className:"font-medium",children:"Email:"})," ",O]}),e.jsxs("p",{children:[e.jsx("span",{className:"font-medium",children:"Teléfono:"})," ",F]}),e.jsxs("p",{children:[e.jsx("span",{className:"font-medium",children:"Dirección:"})," ",R]})]})]}),e.jsxs("div",{className:"bg-gray-50 p-6 rounded-lg print-no-break",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Datos de la Cotización"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("p",{children:[e.jsx("span",{className:"font-medium",children:"Fecha:"})," ",b(_)]}),e.jsxs("p",{children:[e.jsx("span",{className:"font-medium",children:"Vencimiento:"})," ",b(r.fecha_vencimiento)]}),e.jsxs("p",{children:[e.jsx("span",{className:"font-medium",children:"Estado:"}),e.jsx("span",{className:`ml-2 px-2 py-1 rounded-full text-xs font-medium ${r.estado==="Aprobada"||r.estado==="aprobada"?"bg-green-100 text-green-800":r.estado==="Pendiente"||r.estado==="pendiente"?"bg-yellow-100 text-yellow-800":"bg-red-100 text-red-800"}`,children:r.estado})]})]})]})]}),e.jsxs("div",{className:"mb-8",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900 mb-4 print-no-break",children:"Productos Cotizados"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full border-collapse border border-gray-300",children:[e.jsx("thead",{className:"bg-gray-100",children:e.jsxs("tr",{children:[e.jsx("th",{className:"border border-gray-300 px-4 py-3 text-left font-semibold",children:"Código"}),e.jsx("th",{className:"border border-gray-300 px-4 py-3 text-left font-semibold",children:"Descripción"}),e.jsx("th",{className:"border border-gray-300 px-4 py-3 text-center font-semibold",children:"Cantidad"}),e.jsx("th",{className:"border border-gray-300 px-4 py-3 text-center font-semibold",children:"Unidad"}),e.jsx("th",{className:"border border-gray-300 px-4 py-3 text-right font-semibold",children:"Precio Unit."}),e.jsx("th",{className:"border border-gray-300 px-4 py-3 text-center font-semibold",children:"Desc. %"}),e.jsx("th",{className:"border border-gray-300 px-4 py-3 text-center font-semibold",children:"Imp. %"}),e.jsx("th",{className:"border border-gray-300 px-4 py-3 text-right font-semibold",children:"Total"})]})}),e.jsx("tbody",{children:r.cotizacion_items.map(s=>e.jsx(A.Fragment,{children:e.jsx("tr",{className:"product-with-components",children:e.jsx("td",{colSpan:8,className:"p-0 border-0",children:e.jsx("table",{className:"w-full border-collapse",children:e.jsxs("tbody",{children:[e.jsxs("tr",{className:"product-row hover:bg-gray-50",children:[e.jsx("td",{className:"border border-gray-300 px-4 py-3 w-20",children:s.producto?.codigo_producto||"SERV"}),e.jsx("td",{className:"border border-gray-300 px-4 py-3",children:s.descripcion}),e.jsx("td",{className:"border border-gray-300 px-4 py-3 text-center w-20",children:Number(s.cantidad).toLocaleString("es-CR",{maximumFractionDigits:2})}),e.jsx("td",{className:"border border-gray-300 px-4 py-3 text-center w-16",children:"UN"}),e.jsx("td",{className:"border border-gray-300 px-4 py-3 text-right w-24",children:t(Number(s.precio_unitario))}),e.jsxs("td",{className:"border border-gray-300 px-4 py-3 text-center w-16",children:[Number(s.descuento||0).toFixed(1),"%"]}),e.jsx("td",{className:"border border-gray-300 px-4 py-3 text-center w-16",children:"13%"}),e.jsx("td",{className:"border border-gray-300 px-4 py-3 text-right font-semibold w-24",children:t(Number(s.subtotal))})]}),s.bom_items&&s.bom_items.length>0&&e.jsx("tr",{className:"bom-section",children:e.jsx("td",{colSpan:8,className:"p-0 border border-gray-300",children:e.jsxs("div",{className:"bom-block border-l-4 border-blue-200 bg-blue-50 px-6 py-4 ml-4 mr-2 my-2",children:[e.jsx("div",{className:"text-sm font-semibold mb-3 text-gray-700",children:"Ítems utilizados:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{className:"text-gray-600 bg-white",children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-left py-2 px-3 border-b border-gray-200",children:"Código comp."}),e.jsx("th",{className:"text-left py-2 px-3 border-b border-gray-200",children:"Descripción"}),e.jsx("th",{className:"text-right py-2 px-3 border-b border-gray-200",children:"Cantidad"}),e.jsx("th",{className:"text-left py-2 px-3 border-b border-gray-200",children:"Unidad"}),e.jsx("th",{className:"text-right py-2 px-3 border-b border-gray-200",children:"Precio Unit."}),e.jsx("th",{className:"text-right py-2 px-3 border-b border-gray-200",children:"Total"})]})}),e.jsx("tbody",{className:"bg-white",children:s.bom_items.map(a=>{const n=Number(s.cantidad)*Number(a.cantidad_x_unidad||0),o=Number(a.precio_ajustado||a.precio_unitario||a.precio_unitario_base||0),p=n*o;return e.jsxs("tr",{className:"hover:bg-gray-50",children:[e.jsx("td",{className:"py-2 px-3 border-b border-gray-100",children:a.id_componente||"—"}),e.jsx("td",{className:"py-2 px-3 border-b border-gray-100",children:a.nombre_componente||"Sin descripción"}),e.jsx("td",{className:"text-right py-2 px-3 border-b border-gray-100",children:n.toLocaleString("es-CR",{maximumFractionDigits:2})}),e.jsx("td",{className:"py-2 px-3 border-b border-gray-100",children:a.unidad||"—"}),e.jsx("td",{className:"text-right py-2 px-3 border-b border-gray-100",children:t(o)}),e.jsx("td",{className:"text-right py-2 px-3 border-b border-gray-100 font-medium",children:t(p)})]},a.id)})})]})})]})})})]})})})})},s.id))})]})})]}),e.jsx("div",{className:"flex justify-end mb-8 totals-section",children:e.jsx("div",{className:"w-full max-w-md",children:e.jsx("div",{className:"bg-gray-50 p-6 rounded-lg",children:e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-medium",children:"Subtotal:"}),e.jsx("span",{children:t(N)})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-medium",children:"Descuento:"}),e.jsxs("span",{children:["-",t(f)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-medium",children:"Impuesto:"}),e.jsx("span",{children:t(D)})]}),r.flete&&Number(r.flete)>0&&e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-medium",children:"Flete:"}),e.jsx("span",{children:t(Number(r.flete))})]}),r.otros_cargos&&Number(r.otros_cargos)>0&&e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-medium",children:"Otros:"}),e.jsx("span",{children:t(Number(r.otros_cargos))})]}),e.jsx("div",{className:"border-t border-gray-300 pt-3",children:e.jsxs("div",{className:"flex justify-between text-lg font-bold",children:[e.jsx("span",{children:"Total:"}),e.jsx("span",{children:t(Number(r.total))})]})})]})})})}),(r.notas||r.observaciones)&&e.jsxs("div",{className:"mb-8 print-no-break",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Observaciones"}),e.jsx("div",{className:"bg-gray-50 p-4 rounded-lg",children:e.jsx("p",{className:"text-gray-700",children:r.notas||r.observaciones})})]}),e.jsxs("div",{className:"border-t border-gray-300 pt-6 text-center text-sm text-gray-600 print-no-break",children:[e.jsxs("p",{children:["Cotización generada el ",b(new Date().toISOString())]}),e.jsx("p",{className:"mt-2",children:"Overseas Logistics Operations - Sistema de Gestión de Cotizaciones"})]})]})})]})}export{q as default};
//# sourceMappingURL=CotizacionPrintPage-DWVX40cT.js.map
