import{_ as E}from"./vendor-B0ga06J7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();function y(n){return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}function h(n="INV"){const e=Date.now().toString().slice(-6),t=Math.floor(Math.random()*1e3).toString().padStart(3,"0");return`${n}-${e}-${t}`}function N(n){return n?/^lnbc[0-9]+[munp]?[0-9]*[a-z0-9]+$/i.test(n.trim()):!0}function w(){return{invoiceDate:new Date().toISOString().split("T")[0]}}function x(n,e){return(parseInt(n)||0)*(parseInt(e)||0)}function l(n,e="success"){const t=document.createElement("div");t.className=`notification notification-${e}`,t.textContent=n,Object.assign(t.style,{position:"fixed",top:"20px",right:"20px",padding:"15px 20px",borderRadius:"8px",color:"white",fontWeight:"bold",zIndex:"1000",transform:"translateX(100%)",transition:"transform 0.3s ease",maxWidth:"300px",wordWrap:"break-word"});const o={success:"#10b981",error:"#ef4444",warning:"#f59e0b"};t.style.backgroundColor=o[e]||o.success,document.body.appendChild(t),setTimeout(()=>{t.style.transform="translateX(0)"},100),setTimeout(()=>{t.style.transform="translateX(100%)",setTimeout(()=>{document.body.removeChild(t)},300)},3e3)}function D(n,e){let t;return function(...r){const i=()=>{clearTimeout(t),n(...r)};clearTimeout(t),t=setTimeout(i,e)}}function I(n){const e=document.createElement("div");return e.textContent=n,e.innerHTML}const v={FORM_DATA:"bullish_invoice_form_data",TEMPLATES:"bullish_invoice_templates",SETTINGS:"bullish_invoice_settings"};function S(n){try{localStorage.setItem(v.FORM_DATA,JSON.stringify(n))}catch(e){console.error("Error saving form data:",e)}}function L(){try{const n=localStorage.getItem(v.FORM_DATA);return n?JSON.parse(n):null}catch(n){return console.error("Error loading form data:",n),null}}function P(n,e){try{const t=b();t[n]={...e,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},localStorage.setItem(v.TEMPLATES,JSON.stringify(t))}catch(t){console.error("Error saving template:",t)}}function b(){try{const n=localStorage.getItem(v.TEMPLATES);return n?JSON.parse(n):{}}catch(n){return console.error("Error loading templates:",n),{}}}function C(n){try{return b()[n]||null}catch(e){return console.error("Error loading template:",e),null}}function _(){try{const n=b();return Object.keys(n)}catch(n){return console.error("Error getting template names:",n),[]}}function F(){try{const n=localStorage.getItem(v.SETTINGS);return n?JSON.parse(n):T()}catch(n){return console.error("Error loading settings:",n),T()}}function T(){return{autoSave:!0,autoSaveInterval:5e3,defaultInvoicePrefix:"INV",defaultCurrency:"sats",theme:"dark"}}async function k(n,e){try{const t=event.target,o=t.innerHTML;t.innerHTML="⏳ Generating...",t.disabled=!0;const r=(await E(async()=>{const{default:a}=await import("./vendor-B0ga06J7.js").then(c=>c.h);return{default:a}},[])).default,i=await r(n,{backgroundColor:"#ffffff",scale:2,useCORS:!0,allowTaint:!1,logging:!1,scrollX:0,scrollY:0}),s=document.createElement("a");s.download=`${e}.png`,s.href=i.toDataURL("image/png"),document.body.appendChild(s),s.click(),document.body.removeChild(s),t.innerHTML=o,t.disabled=!1,l("Image exported successfully!","success")}catch(t){console.error("Error exporting image:",t),l("Error exporting image. Please try again.","error");const o=event.target;o.innerHTML="🖼️ Export Image",o.disabled=!1}}async function O(n,e){try{const t=event.target,o=t.innerHTML;t.innerHTML="⏳ Generating...",t.disabled=!0;const r=(await E(async()=>{const{default:d}=await import("./vendor-B0ga06J7.js").then(p=>p.h);return{default:d}},[])).default,{jsPDF:i}=await E(async()=>{const{jsPDF:d}=await import("./vendor-B0ga06J7.js").then(p=>p.j);return{jsPDF:d}},[]),s=await r(n,{backgroundColor:"#ffffff",scale:2,useCORS:!0,allowTaint:!1,logging:!1,scrollX:0,scrollY:0}),a=new i("p","mm","a4"),c=s.toDataURL("image/png"),f=210,m=295,u=f,g=s.height*u/s.width;if(g<=m){const d=(m-g)/2;a.addImage(c,"PNG",0,d,u,g)}else{let d=g,p=0;for(a.addImage(c,"PNG",0,p,u,g),d-=m;d>=0;)p=d-g,a.addPage(),a.addImage(c,"PNG",0,p,u,g),d-=m}a.save(`${e}.pdf`),t.innerHTML=o,t.disabled=!1,l("PDF exported successfully!","success")}catch(t){console.error("Error exporting PDF:",t),l("Error exporting PDF. Please try again.","error");const o=event.target;o.innerHTML="📄 Export PDF",o.disabled=!1}}function A(n){try{const e=window.open("","_blank"),t=n.cloneNode(!0);e.document.write(`
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
        `),e.document.close(),e.focus(),e.onload=function(){e.print(),e.close()},l("Print dialog opened!","success")}catch(e){console.error("Error printing invoice:",e),l("Error printing invoice. Please try again.","error")}}class M{constructor(){this.settings=F(),this.autoSaveTimer=null,this.init(),this.loadVersion()}init(){this.setupEventListeners(),this.loadSavedData(),this.setupAutoSave(),this.updatePreview(),this.setupTemplateControls()}setupEventListeners(){var e,t,o,r,i,s;document.querySelectorAll("input, textarea").forEach(a=>{a.addEventListener("input",D(()=>{this.updatePreview(),this.saveFormData()},300))}),(e=document.getElementById("exportPdfBtn"))==null||e.addEventListener("click",()=>{const a=document.getElementById("invoicePreview"),c=`invoice-${this.getFormData().invoiceNumber||"INV-001"}`;O(a,c)}),(t=document.getElementById("exportImageBtn"))==null||t.addEventListener("click",()=>{const a=document.getElementById("invoicePreview"),c=`invoice-${this.getFormData().invoiceNumber||"INV-001"}`;k(a,c)}),(o=document.getElementById("printBtn"))==null||o.addEventListener("click",()=>{const a=document.getElementById("invoicePreview");A(a)}),(r=document.getElementById("lightningInvoice"))==null||r.addEventListener("blur",a=>{this.validateLightningInvoice(a.target)}),(i=document.getElementById("generateInvoiceNumberBtn"))==null||i.addEventListener("click",()=>{this.generateNewInvoiceNumber()}),(s=document.getElementById("clearFormBtn"))==null||s.addEventListener("click",()=>{this.clearForm()})}getFormData(){var e,t,o,r,i,s,a,c,f,m,u;return{invoiceNumber:((e=document.getElementById("invoiceNumber"))==null?void 0:e.value)||"INV-001",invoiceDate:((t=document.getElementById("invoiceDate"))==null?void 0:t.value)||"",fromName:((o=document.getElementById("fromName"))==null?void 0:o.value)||"",toName:((r=document.getElementById("toName"))==null?void 0:r.value)||"",description:((i=document.getElementById("description"))==null?void 0:i.value)||"",quantity:parseInt((s=document.getElementById("quantity"))==null?void 0:s.value)||1,rate:parseInt((a=document.getElementById("rate"))==null?void 0:a.value)||0,lightningInvoice:((c=document.getElementById("lightningInvoice"))==null?void 0:c.value)||"",notes:((f=document.getElementById("notes"))==null?void 0:f.value)||"",total:x(parseInt((m=document.getElementById("quantity"))==null?void 0:m.value)||1,parseInt((u=document.getElementById("rate"))==null?void 0:u.value)||0)}}setFormData(e){e.invoiceNumber&&(document.getElementById("invoiceNumber").value=e.invoiceNumber),e.invoiceDate&&(document.getElementById("invoiceDate").value=e.invoiceDate),e.fromName&&(document.getElementById("fromName").value=e.fromName),e.toName&&(document.getElementById("toName").value=e.toName),e.description&&(document.getElementById("description").value=e.description),e.quantity&&(document.getElementById("quantity").value=e.quantity),e.rate&&(document.getElementById("rate").value=e.rate),e.lightningInvoice&&(document.getElementById("lightningInvoice").value=e.lightningInvoice),e.notes&&(document.getElementById("notes").value=e.notes)}updatePreview(){const e=this.getFormData(),t=e.total;document.getElementById("previewInvoiceNumber")&&(document.getElementById("previewInvoiceNumber").textContent=e.invoiceNumber),document.getElementById("previewInvoiceDate")&&(document.getElementById("previewInvoiceDate").textContent=e.invoiceDate||"--"),document.getElementById("previewFromName")&&(document.getElementById("previewFromName").innerHTML=I(e.fromName.replace(/\n/g,"<br>"))),document.getElementById("previewToName")&&(document.getElementById("previewToName").innerHTML=I(e.toName.replace(/\n/g,"<br>"))),document.getElementById("previewDescription")&&(document.getElementById("previewDescription").textContent=e.description),document.getElementById("previewQuantity")&&(document.getElementById("previewQuantity").textContent=e.quantity),document.getElementById("previewRate")&&(document.getElementById("previewRate").textContent=y(e.rate)),document.getElementById("previewAmount")&&(document.getElementById("previewAmount").textContent=y(t)),document.getElementById("previewTotal")&&(document.getElementById("previewTotal").textContent=y(t));const o=document.getElementById("lightningSection");if(o)if(e.lightningInvoice.trim()){o.style.display="block",document.getElementById("previewLightningInvoice").textContent=e.lightningInvoice;const i=document.getElementById("qrCodeContainer");i&&(i.style.display="block",this.updateQRCode(e.lightningInvoice))}else o.style.display="none";const r=document.getElementById("notesSection");r&&(e.notes.trim()?(r.style.display="block",document.getElementById("previewNotes").innerHTML=I(e.notes.replace(/\n/g,"<br>"))):r.style.display="none")}validateLightningInvoice(e){const t=N(e.value);e.classList.remove("input-error","input-success"),e.value.trim()&&!t?(e.classList.add("input-error"),this.showError(e,"Invalid Lightning Network invoice format")):e.value.trim()&&t&&(e.classList.add("input-success"),this.removeError(e))}showError(e,t){this.removeError(e);const o=document.createElement("div");o.className="error-message",o.textContent=t,e.parentNode.appendChild(o)}removeError(e){const t=e.parentNode.querySelector(".error-message");t&&t.remove()}generateNewInvoiceNumber(){const e=h(this.settings.defaultInvoicePrefix);document.getElementById("invoiceNumber").value=e,this.updatePreview(),this.saveFormData(),l("New invoice number generated!","success")}clearForm(){if(confirm("Are you sure you want to clear all form data? This action cannot be undone.")){const e=w();document.getElementById("invoiceNumber").value=h(this.settings.defaultInvoicePrefix),document.getElementById("invoiceDate").value=e.invoiceDate,document.getElementById("fromName").value="",document.getElementById("toName").value="",document.getElementById("description").value="",document.getElementById("quantity").value="1",document.getElementById("rate").value="",document.getElementById("lightningInvoice").value="",document.getElementById("notes").value="",this.updatePreview(),this.saveFormData(),l("Form cleared successfully!","success")}}saveFormData(){if(this.settings.autoSave){const e=this.getFormData();S(e)}}loadSavedData(){const e=L();if(e)this.setFormData(e),l("Previous form data loaded!","success");else{const t=w();document.getElementById("invoiceDate").value=t.invoiceDate,document.getElementById("invoiceNumber").value=h(this.settings.defaultInvoicePrefix)}}setupAutoSave(){this.settings.autoSave&&(this.autoSaveTimer=setInterval(()=>{this.saveFormData()},this.settings.autoSaveInterval))}setupTemplateControls(){const e=document.querySelector(".form-panel");if(e&&!document.querySelector(".template-controls")){const t=this.createTemplateControls();e.insertBefore(t,e.firstChild)}}createTemplateControls(){const e=document.createElement("div");return e.className="template-controls",e.innerHTML=`
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
        `,e}saveCurrentTemplate(){const e=prompt("Enter template name:");if(e&&e.trim()){const t=this.getFormData();P(e.trim(),t),l(`Template "${e}" saved successfully!`,"success")}}loadTemplateDialog(){const e=_();if(e.length===0){l("No saved templates found.","warning");return}const t=e.map(r=>`<option value="${r}">${r}</option>`).join(""),o=document.createElement("div");o.style.cssText=`
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
        `,o.innerHTML=`
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
        `,document.body.appendChild(o)}loadSelectedTemplate(){const t=document.getElementById("templateSelect").value,o=C(t);o&&(this.setFormData(o),this.updatePreview(),this.saveFormData(),l(`Template "${t}" loaded successfully!`,"success")),document.querySelector('div[style*="position: fixed"]').remove()}async loadVersion(){try{const t=await(await fetch("/package.json")).json(),o=document.querySelector(".version");o&&(o.textContent=`v${t.version}`)}catch{console.log("Could not load version from package.json, using default")}}updateQRCode(e){const t=document.getElementById("lightningQR");t&&e&&t.setAttribute("lightning",e)}}let B;document.addEventListener("DOMContentLoaded",()=>{B=new M,window.app=B});
