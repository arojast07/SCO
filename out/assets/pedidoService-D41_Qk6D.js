import{s as i}from"./index-Xz42BvxI.js";class _{async getPedidos(o){const{data:{user:e}}=await i.auth.getUser();if(!e)throw new Error("Usuario no autenticado");const{data:t}=await i.from("usuario_tienda_actual").select("tienda_id").eq("usuario_id",e.id).single();if(!t)throw new Error("No hay tienda asignada");let r=i.from("pedidos").select(`
        *,
        cliente:clientes(
          id,
          nombre_razon_social,
          identificacion
        ),
        pedido_items(
          id,
          item_type,
          item_id,
          descripcion,
          unidad,
          cantidad,
          precio_unit,
          descuento_pct,
          impuesto_pct,
          total,
          meta_json
        )
      `).eq("tienda_id",t.tienda_id).order("created_at",{ascending:!1});o?.estado&&(r=r.eq("estado",o.estado)),o?.cliente_id&&(r=r.eq("cliente_id",o.cliente_id)),o?.fecha_desde&&(r=r.gte("created_at",o.fecha_desde)),o?.fecha_hasta&&(r=r.lte("created_at",o.fecha_hasta));const{data:s,error:a}=await r;if(a)throw a;return(s||[]).map(n=>({...n,items:n.pedido_items||[]}))}async getPedidoById(o){try{const{data:e,error:t}=await i.from("pedidos").select(`
          *,
          clientes!inner(
            id,
            nombre_razon_social,
            identificacion
          ),
          pedido_items(
            id,
            item_type,
            item_id,
            descripcion,
            unidad,
            cantidad,
            precio_unit,
            descuento_pct,
            impuesto_pct,
            total,
            meta_json
          )
        `).eq("id",o).single();if(t)throw t;return{...e,items:e.pedido_items||[]}}catch(e){return console.error("Error obteniendo pedido:",e),null}}async createPedido(o){try{const{data:{user:e}}=await i.auth.getUser();if(!e)throw new Error("Usuario no autenticado");const{data:t}=await i.from("usuario_tienda_actual").select("tienda_id").eq("usuario_id",e.id).single();if(!t)throw new Error("No hay tienda asignada");const{data:r,error:s}=await i.from("pedidos").insert({codigo:o.codigo||`PED-${Date.now()}`,cliente_id:o.cliente_id,moneda:o.moneda,tipo_cambio:o.tipo_cambio,subtotal:o.subtotal,descuento_total:o.descuento_total,impuesto_total:o.impuesto_total,total:o.total,estado:o.estado||"borrador",notas:o.notas,tienda_id:t.tienda_id,created_by:e.id,created_at:new Date().toISOString(),updated_at:new Date().toISOString()}).select().single();if(s)throw s;if(o.items&&o.items.length>0){const a=o.items.map(n=>({pedido_id:r.id,item_type:n.item_type,item_id:n.item_id,descripcion:n.descripcion,unidad:n.unidad,cantidad:n.cantidad,precio_unit:n.precio_unit,descuento_pct:n.descuento_pct||0,impuesto_pct:n.impuesto_pct||13,total:n.total,meta_json:n.meta_json})),{error:d}=await i.from("pedido_items").insert(a);if(d)throw d;r.estado==="borrador"&&await this.crearReservasInventario(r.id,o.items)}return this.getPedidoById(r.id)}catch(e){throw console.error("Error creando pedido:",e),e}}async createPedidoFromCotizacion(o){try{const{data:e,error:t}=await i.from("cotizaciones").select(`
          *,
          cotizacion_items (*)
        `).eq("id",o).single();if(t)throw t;if(!e)throw new Error("Cotización no encontrada");if(e.estado!=="aprobada"&&e.estado!=="Aprobada")throw new Error("Solo se pueden crear pedidos desde cotizaciones aprobadas");const r=e.cotizacion_items.map(a=>({item_type:"producto",item_id:a.producto_id,descripcion:a.descripcion,unidad:"UN",cantidad:a.cantidad,precio_unit:a.precio_unitario,descuento_pct:a.descuento||0,impuesto_pct:13,total:a.subtotal,meta_json:null})),s={codigo:`PED-${e.numero_cotizacion||e.codigo||Date.now()}`,cliente_id:e.cliente_id,moneda:"CRC",tipo_cambio:1,subtotal:e.subtotal,descuento_total:e.descuento_global||e.descuento_general||0,impuesto_total:e.impuestos||e.impuesto||0,total:e.total,estado:"borrador",notas:`Generado desde cotización #${e.numero_cotizacion||e.codigo}. ${e.notas||e.observaciones||""}`.trim(),items:r};return await this.createPedido(s)}catch(e){throw console.error("Error creando pedido desde cotización:",e),e}}async updatePedido(o,e){const t=await this.getPedidoById(o);if(!t)throw new Error("Pedido no encontrado");if(t.estado==="facturado")throw new Error("No se pueden editar pedidos que ya han sido facturados");if(t.estado==="cancelado")throw new Error("No se pueden editar pedidos cancelados");const{error:r}=await i.from("pedidos").update({cliente_id:e.cliente_id,moneda:e.moneda,tipo_cambio:e.tipo_cambio,notas:e.notas,subtotal:e.subtotal,descuento_total:e.descuento_total,impuesto_total:e.impuesto_total,total:e.total,updated_at:new Date().toISOString()}).eq("id",o);if(r)throw r;if(e.items&&(await i.from("pedido_items").delete().eq("pedido_id",o),t.estado==="borrador"&&await this.liberarReservas(o),e.items.length>0)){const s=e.items.map(d=>({pedido_id:o,item_type:d.item_type,item_id:d.item_id,descripcion:d.descripcion,unidad:d.unidad,cantidad:d.cantidad,precio_unit:d.precio_unit,descuento_pct:d.descuento_pct||0,impuesto_pct:d.impuesto_pct||13,total:d.total,meta_json:d.meta_json})),{error:a}=await i.from("pedido_items").insert(s);if(a)throw a;t.estado==="borrador"&&await this.crearReservasInventario(o,e.items)}return this.getPedidoById(o)}async liberarReservas(o){try{const{error:e}=await i.from("inventario_reservas").delete().eq("pedido_id",o);if(e)throw e;console.log("Reservas liberadas para pedido:",o)}catch(e){throw console.error("Error liberando reservas:",e),e}}async crearReservasInventario(o,e){try{console.log("🔍 [RESERVAS] Iniciando creación de reservas para pedido:",o),console.log("🔍 [RESERVAS] Items recibidos:",e);const t=e.filter(c=>c.item_type==="inventario");if(console.log("🔍 [RESERVAS] Items de inventario filtrados:",t.length),t.length===0){console.log("ℹ️ [RESERVAS] No hay items de inventario, no se crearán reservas");return}const r=t.map(c=>c.item_id);console.log("🔍 [RESERVAS] Validando existencia de artículos:",r);const{data:s,error:a}=await i.from("inventario").select("id").in("id",r);if(a)throw console.error("❌ [RESERVAS] Error validando artículos:",a),a;const d=(s||[]).map(c=>c.id);console.log("✅ [RESERVAS] Artículos existentes en inventario:",d);const n=t.filter(c=>d.includes(c.item_id));if(n.length===0){console.log("⚠️ [RESERVAS] Ningún artículo existe en inventario, no se crearán reservas");return}console.log("✅ [RESERVAS] Items válidos para reservar:",n.length);const l=n.map(c=>({pedido_id:o,id_articulo:c.item_id,cantidad:c.cantidad,vence_at:new Date(Date.now()+10080*60*1e3).toISOString(),estado:"activa"}));console.log("🔍 [RESERVAS] Reservas a crear:",l);const{error:p}=await i.from("inventario_reservas").insert(l);if(p)throw console.error("❌ [RESERVAS] Error creando reservas:",p),p;console.log("✅ [RESERVAS] Reservas creadas exitosamente para pedido:",o),console.log("✅ [RESERVAS] Total de reservas creadas:",l.length)}catch(t){throw console.error("❌ [RESERVAS] Error en crearReservasInventario:",t),t}}async confirmarPedido(o,e){try{const t=await this.getPedidoById(o);if(!t)throw new Error("Pedido no encontrado");if(t.estado!=="borrador")throw new Error("Solo se pueden confirmar pedidos en estado borrador");const{error:r}=await i.from("pedidos").update({estado:"confirmado",updated_at:new Date().toISOString()}).eq("id",o);if(r)throw r;console.log("✅ Pedido confirmado exitosamente:",o)}catch(t){throw console.error("❌ Error confirmando pedido:",t),t}}async cancelarPedido(o,e){try{const t=await this.getPedidoById(o);if(!t)throw new Error("Pedido no encontrado");if(t.estado==="facturado")throw new Error("No se pueden cancelar pedidos facturados");if(t.estado==="cancelado")throw new Error("El pedido ya está cancelado");await this.liberarReservas(o);const{error:r}=await i.from("pedidos").update({estado:"cancelado",updated_at:new Date().toISOString()}).eq("id",o);if(r)throw r;console.log("✅ Pedido cancelado exitosamente:",o)}catch(t){throw console.error("❌ Error cancelando pedido:",t),t}}async deletePedido(o){try{const e=await this.getPedidoById(o);if(!e)throw new Error("Pedido no encontrado");if(e.estado!=="borrador"&&e.estado!=="cancelado")throw new Error("Solo se pueden eliminar pedidos en estado borrador o cancelado");await this.liberarReservas(o),await i.from("pedido_items").delete().eq("pedido_id",o);const{error:t}=await i.from("pedidos").delete().eq("id",o);if(t)throw t;console.log("✅ Pedido eliminado exitosamente:",o)}catch(e){throw console.error("❌ Error eliminando pedido:",e),e}}}const w=new _;export{w as p};
//# sourceMappingURL=pedidoService-D41_Qk6D.js.map
