import{_ as y}from"./vendor-B0ga06J7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();function h(o){return o.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}function I(o="INV"){const e=Date.now().toString().slice(-6),t=Math.floor(Math.random()*1e3).toString().padStart(3,"0");return`${o}-${e}-${t}`}async function w(o){if(!o||!o.trim())return null;try{const{decodeInvoice:e}=await y(async()=>{const{decodeInvoice:n}=await import("./index.modern-DRrZddpj.js");return{decodeInvoice:n}},[]);return e(o.trim())}catch(e){return console.error("Error decoding Lightning invoice:",e),null}}function T(o){return o?/^lnbc[0-9]+[munp]?[0-9]*[a-z0-9]+$/i.test(o.trim()):!0}function x(){return{invoiceDate:new Date().toISOString().split("T")[0]}}function L(o,e){return(parseInt(o)||0)*(parseInt(e)||0)}function d(o,e="success"){const t=document.createElement("div");t.className=`notification notification-${e}`,t.textContent=o,Object.assign(t.style,{position:"fixed",top:"20px",right:"20px",padding:"15px 20px",borderRadius:"8px",color:"white",fontWeight:"bold",zIndex:"1000",transform:"translateX(100%)",transition:"transform 0.3s ease",maxWidth:"300px",wordWrap:"break-word"});const n={success:"#10b981",error:"#ef4444",warning:"#f59e0b"};t.style.backgroundColor=n[e]||n.success,document.body.appendChild(t),setTimeout(()=>{t.style.transform="translateX(0)"},100),setTimeout(()=>{t.style.transform="translateX(100%)",setTimeout(()=>{document.body.removeChild(t)},300)},3e3)}function S(o,e){let t;return function(...r){const i=()=>{clearTimeout(t),o(...r)};clearTimeout(t),t=setTimeout(i,e)}}function E(o){const e=document.createElement("div");return e.textContent=o,e.innerHTML}const f={FORM_DATA:"bullish_invoice_form_data",TEMPLATES:"bullish_invoice_templates",SETTINGS:"bullish_invoice_settings"};function C(o){try{localStorage.setItem(f.FORM_DATA,JSON.stringify(o))}catch(e){console.error("Error saving form data:",e)}}function P(){try{const o=localStorage.getItem(f.FORM_DATA);return o?JSON.parse(o):null}catch(o){return console.error("Error loading form data:",o),null}}function _(o,e){try{const t=b();t[o]={...e,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},localStorage.setItem(f.TEMPLATES,JSON.stringify(t))}catch(t){console.error("Error saving template:",t)}}function b(){try{const o=localStorage.getItem(f.TEMPLATES);return o?JSON.parse(o):{}}catch(o){return console.error("Error loading templates:",o),{}}}function F(o){try{return b()[o]||null}catch(e){return console.error("Error loading template:",e),null}}function M(){try{const o=b();return Object.keys(o)}catch(o){return console.error("Error getting template names:",o),[]}}function k(){try{const o=localStorage.getItem(f.SETTINGS);return o?JSON.parse(o):D()}catch(o){return console.error("Error loading settings:",o),D()}}function D(){return{autoSave:!0,autoSaveInterval:5e3,defaultInvoicePrefix:"INV",defaultCurrency:"sats",theme:"dark"}}async function O(o,e){try{const t=event.target,n=t.innerHTML;t.innerHTML="⏳ Generating...",t.disabled=!0;const r=(await y(async()=>{const{default:a}=await import("./vendor-B0ga06J7.js").then(c=>c.h);return{default:a}},[])).default,i=await r(o,{backgroundColor:"#ffffff",scale:2,useCORS:!0,allowTaint:!1,logging:!1,scrollX:0,scrollY:0}),s=document.createElement("a");s.download=`${e}.png`,s.href=i.toDataURL("image/png"),document.body.appendChild(s),s.click(),document.body.removeChild(s),t.innerHTML=n,t.disabled=!1,d("Image exported successfully!","success")}catch(t){console.error("Error exporting image:",t),d("Error exporting image. Please try again.","error");const n=event.target;n.innerHTML="🖼️ Export Image",n.disabled=!1}}async function A(o,e){try{const t=event.target,n=t.innerHTML;t.innerHTML="⏳ Generating...",t.disabled=!0;const r=(await y(async()=>{const{default:l}=await import("./vendor-B0ga06J7.js").then(p=>p.h);return{default:l}},[])).default,{jsPDF:i}=await y(async()=>{const{jsPDF:l}=await import("./vendor-B0ga06J7.js").then(p=>p.j);return{jsPDF:l}},[]),s=await r(o,{backgroundColor:"#ffffff",scale:2,useCORS:!0,allowTaint:!1,logging:!1,scrollX:0,scrollY:0}),a=new i("p","mm","a4"),c=s.toDataURL("image/png"),v=210,m=295,u=v,g=s.height*u/s.width;if(g<=m){const l=(m-g)/2;a.addImage(c,"PNG",0,l,u,g)}else{let l=g,p=0;for(a.addImage(c,"PNG",0,p,u,g),l-=m;l>=0;)p=l-g,a.addPage(),a.addImage(c,"PNG",0,p,u,g),l-=m}a.save(`${e}.pdf`),t.innerHTML=n,t.disabled=!1,d("PDF exported successfully!","success")}catch(t){console.error("Error exporting PDF:",t),d("Error exporting PDF. Please try again.","error");const n=event.target;n.innerHTML="📄 Export PDF",n.disabled=!1}}function $(o){try{const e=window.open("","_blank"),t=o.cloneNode(!0);e.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Invoice Print</title>
                    
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 0; 
                    padding: 20px; 
                    background: white; 
                    color: black; 
                }
                .invoice-preview { 
                    box-shadow: none; 
                    border: 1px solid #ccc; 
                    padding: 20px; 
                }
                @media print {
                    body { padding: 0; }
                }
            </style>
        
                </head>
                <body>
                    ${t.outerHTML}
                </body>
            </html>
        `),e.document.close(),e.focus(),e.onload=function(){e.print(),e.close()},d("Print dialog opened!","success")}catch(e){console.error("Error printing invoice:",e),d("Error printing invoice. Please try again.","error")}}class H{constructor(){this.settings=k(),this.autoSaveTimer=null,this.init(),this.loadVersion()}init(){this.setupEventListeners(),this.loadSavedData(),this.setupAutoSave(),this.updatePreview(),this.setupTemplateControls()}setupEventListeners(){var e,t,n,r,i,s;document.querySelectorAll("input, textarea").forEach(a=>{a.addEventListener("input",S(()=>{this.updatePreview(),this.saveFormData()},300))}),(e=document.getElementById("exportPdfBtn"))==null||e.addEventListener("click",()=>{const a=document.getElementById("invoicePreview"),c=`invoice-${this.getFormData().invoiceNumber||"INV-001"}`;A(a,c)}),(t=document.getElementById("exportImageBtn"))==null||t.addEventListener("click",()=>{const a=document.getElementById("invoicePreview"),c=`invoice-${this.getFormData().invoiceNumber||"INV-001"}`;O(a,c)}),(n=document.getElementById("printBtn"))==null||n.addEventListener("click",()=>{const a=document.getElementById("invoicePreview");$(a)}),(r=document.getElementById("lightningInvoice"))==null||r.addEventListener("blur",async a=>{await this.validateLightningInvoice(a.target)}),(i=document.getElementById("generateInvoiceNumberBtn"))==null||i.addEventListener("click",()=>{this.generateNewInvoiceNumber()}),(s=document.getElementById("clearFormBtn"))==null||s.addEventListener("click",()=>{this.clearForm()})}getFormData(){var e,t,n,r,i,s,a,c,v,m,u;return{invoiceNumber:((e=document.getElementById("invoiceNumber"))==null?void 0:e.value)||"INV-001",invoiceDate:((t=document.getElementById("invoiceDate"))==null?void 0:t.value)||"",fromName:((n=document.getElementById("fromName"))==null?void 0:n.value)||"",toName:((r=document.getElementById("toName"))==null?void 0:r.value)||"",description:((i=document.getElementById("description"))==null?void 0:i.value)||"",quantity:parseInt((s=document.getElementById("quantity"))==null?void 0:s.value)||1,rate:parseInt((a=document.getElementById("rate"))==null?void 0:a.value)||0,lightningInvoice:((c=document.getElementById("lightningInvoice"))==null?void 0:c.value)||"",notes:((v=document.getElementById("notes"))==null?void 0:v.value)||"",total:L(parseInt((m=document.getElementById("quantity"))==null?void 0:m.value)||1,parseInt((u=document.getElementById("rate"))==null?void 0:u.value)||0)}}setFormData(e){e.invoiceNumber&&(document.getElementById("invoiceNumber").value=e.invoiceNumber),e.invoiceDate&&(document.getElementById("invoiceDate").value=e.invoiceDate),e.fromName&&(document.getElementById("fromName").value=e.fromName),e.toName&&(document.getElementById("toName").value=e.toName),e.description&&(document.getElementById("description").value=e.description),e.quantity&&(document.getElementById("quantity").value=e.quantity),e.rate&&(document.getElementById("rate").value=e.rate),e.lightningInvoice&&(document.getElementById("lightningInvoice").value=e.lightningInvoice),e.notes&&(document.getElementById("notes").value=e.notes)}updatePreview(){const e=this.getFormData(),t=e.total;document.getElementById("previewInvoiceNumber")&&(document.getElementById("previewInvoiceNumber").textContent=e.invoiceNumber),document.getElementById("previewInvoiceDate")&&(document.getElementById("previewInvoiceDate").textContent=e.invoiceDate||"--"),document.getElementById("previewFromName")&&(document.getElementById("previewFromName").innerHTML=E(e.fromName.replace(/\n/g,"<br>"))),document.getElementById("previewToName")&&(document.getElementById("previewToName").innerHTML=E(e.toName.replace(/\n/g,"<br>"))),document.getElementById("previewDescription")&&(document.getElementById("previewDescription").textContent=e.description),document.getElementById("previewQuantity")&&(document.getElementById("previewQuantity").textContent=e.quantity),document.getElementById("previewRate")&&(document.getElementById("previewRate").textContent=h(e.rate)),document.getElementById("previewAmount")&&(document.getElementById("previewAmount").textContent=h(t)),document.getElementById("previewTotal")&&(document.getElementById("previewTotal").textContent=h(t));const n=document.getElementById("lightningSection");if(n)if(e.lightningInvoice.trim()){n.style.display="block",document.getElementById("previewLightningInvoice").textContent=e.lightningInvoice,this.updateLightningDetails(e.lightningInvoice);const i=document.getElementById("qrCodeContainer");i&&(i.style.display="block",this.updateQRCode(e.lightningInvoice))}else n.style.display="none";const r=document.getElementById("notesSection");r&&(e.notes.trim()?(r.style.display="block",document.getElementById("previewNotes").innerHTML=E(e.notes.replace(/\n/g,"<br>"))):r.style.display="none")}async validateLightningInvoice(e){const t=T(e.value);if(e.classList.remove("input-error","input-success"),e.value.trim()&&!t)e.classList.add("input-error"),this.showError(e,"Invalid Lightning Network invoice format");else if(e.value.trim()&&t)try{await w(e.value)?(e.classList.add("input-success"),this.removeError(e)):(e.classList.add("input-error"),this.showError(e,"Invalid Lightning Network invoice"))}catch{e.classList.add("input-error"),this.showError(e,"Invalid Lightning Network invoice")}}showError(e,t){this.removeError(e);const n=document.createElement("div");n.className="error-message",n.textContent=t,e.parentNode.appendChild(n)}removeError(e){const t=e.parentNode.querySelector(".error-message");t&&t.remove()}generateNewInvoiceNumber(){const e=I(this.settings.defaultInvoicePrefix);document.getElementById("invoiceNumber").value=e,this.updatePreview(),this.saveFormData(),d("New invoice number generated!","success")}clearForm(){if(confirm("Are you sure you want to clear all form data? This action cannot be undone.")){const e=x();document.getElementById("invoiceNumber").value=I(this.settings.defaultInvoicePrefix),document.getElementById("invoiceDate").value=e.invoiceDate,document.getElementById("fromName").value="",document.getElementById("toName").value="",document.getElementById("description").value="",document.getElementById("quantity").value="1",document.getElementById("rate").value="",document.getElementById("lightningInvoice").value="",document.getElementById("notes").value="",this.updatePreview(),this.saveFormData(),d("Form cleared successfully!","success")}}saveFormData(){if(this.settings.autoSave){const e=this.getFormData();C(e)}}loadSavedData(){const e=P();if(e)this.setFormData(e),d("Previous form data loaded!","success");else{const t=x();document.getElementById("invoiceDate").value=t.invoiceDate,document.getElementById("invoiceNumber").value=I(this.settings.defaultInvoicePrefix)}}setupAutoSave(){this.settings.autoSave&&(this.autoSaveTimer=setInterval(()=>{this.saveFormData()},this.settings.autoSaveInterval))}setupTemplateControls(){const e=document.querySelector(".form-panel");if(e&&!document.querySelector(".template-controls")){const t=this.createTemplateControls();e.insertBefore(t,e.firstChild)}}createTemplateControls(){const e=document.createElement("div");return e.className="template-controls",e.innerHTML=`
            <h3>📋 Templates</h3>
            <div class="template-buttons">
                <button type="button" class="btn btn-small btn-success" onclick="app.saveCurrentTemplate()">
                    💾 Save Template
                </button>
                <button type="button" class="btn btn-small btn-secondary" onclick="app.loadTemplateDialog()">
                    📂 Load Template
                </button>
                <button type="button" class="btn btn-small btn-warning" onclick="app.clearForm()">
                    🗑️ Clear Form
                </button>
                <button type="button" class="btn btn-small btn-primary" onclick="app.generateNewInvoiceNumber()">
                    🔄 New Invoice #
                </button>
            </div>
        `,e}saveCurrentTemplate(){const e=prompt("Enter template name:");if(e&&e.trim()){const t=this.getFormData();_(e.trim(),t),d(`Template "${e}" saved successfully!`,"success")}}loadTemplateDialog(){const e=M();if(e.length===0){d("No saved templates found.","warning");return}const t=e.map(r=>`<option value="${r}">${r}</option>`).join(""),n=document.createElement("div");n.style.cssText=`
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `,n.innerHTML=`
            <div style="
                background: #1a1a2e;
                padding: 30px;
                border-radius: 15px;
                border: 1px solid rgba(255, 215, 0, 0.3);
                max-width: 400px;
                width: 90%;
            ">
                <h3 style="color: #ffd700; margin-bottom: 20px;">Load Template</h3>
                <select id="templateSelect" style="
                    width: 100%;
                    padding: 12px;
                    margin-bottom: 20px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 2px solid rgba(255, 215, 0, 0.3);
                    border-radius: 10px;
                    color: white;
                ">
                    ${t}
                </select>
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button onclick="this.closest('div[style*="position: fixed"]').remove()" style="
                        padding: 10px 20px;
                        background: #6366f1;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                    ">Cancel</button>
                    <button onclick="app.loadSelectedTemplate()" style="
                        padding: 10px 20px;
                        background: #10b981;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                    ">Load</button>
                </div>
            </div>
        `,document.body.appendChild(n)}loadSelectedTemplate(){const t=document.getElementById("templateSelect").value,n=F(t);n&&(this.setFormData(n),this.updatePreview(),this.saveFormData(),d(`Template "${t}" loaded successfully!`,"success")),document.querySelector('div[style*="position: fixed"]').remove()}loadVersion(){try{const e="0.0.2",t=document.getElementById("versionDisplay");t&&(t.textContent=`v${e}`)}catch{console.log("Could not load version, using default")}}updateQRCode(e){const t=document.getElementById("lightningQR");t&&e&&t.setAttribute("lightning",e)}async updateLightningDetails(e){try{const t=await w(e),n=document.getElementById("lightningExpiry");if(t&&n){if(t.timestamp&&t.expiry){const r=new Date((t.timestamp+t.expiry)*1e3);if(r-new Date>0){const a=r.getMonth()+1,c=r.getDate(),v=r.getFullYear(),m=r.getHours(),u=r.getMinutes(),g=m>=12?"PM":"AM",l=m%12||12,p=u.toString().padStart(2,"0"),N=`${a}/${c}/${v} ${l}:${p} ${g}`;n.textContent=`Expires: ${N}`}else n.textContent="Expired"}else n.textContent="Expiration time not available";n.style.display="inline-block"}else n&&(n.style.display="none")}catch(t){console.error("Error updating Lightning details:",t);const n=document.getElementById("lightningExpiry");n&&(n.style.display="none")}}}let B;document.addEventListener("DOMContentLoaded",()=>{B=new H,window.app=B});
