import{_ as b}from"./vendor-B0ga06J7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();function h(n){return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}function I(n="INV"){const e=Date.now().toString().slice(-6),t=Math.floor(Math.random()*1e3).toString().padStart(3,"0");return`${n}-${e}-${t}`}function N(n){return n?/^lnbc[0-9]+[munp]?[0-9]*[a-z0-9]+$/i.test(n.trim()):!0}function T(){return{invoiceDate:new Date().toISOString().split("T")[0]}}function D(n,e){return(parseInt(n)||0)*(parseInt(e)||0)}function c(n,e="success"){const t=document.createElement("div");t.className=`notification notification-${e}`,t.textContent=n,Object.assign(t.style,{position:"fixed",top:"20px",right:"20px",padding:"15px 20px",borderRadius:"8px",color:"white",fontWeight:"bold",zIndex:"1000",transform:"translateX(100%)",transition:"transform 0.3s ease",maxWidth:"300px",wordWrap:"break-word"});const o={success:"#10b981",error:"#ef4444",warning:"#f59e0b"};t.style.backgroundColor=o[e]||o.success,document.body.appendChild(t),setTimeout(()=>{t.style.transform="translateX(0)"},100),setTimeout(()=>{t.style.transform="translateX(100%)",setTimeout(()=>{document.body.removeChild(t)},300)},3e3)}function S(n,e){let t;return function(...r){const i=()=>{clearTimeout(t),n(...r)};clearTimeout(t),t=setTimeout(i,e)}}function E(n){const e=document.createElement("div");return e.textContent=n,e.innerHTML}const g={FORM_DATA:"bullish_invoice_form_data",TEMPLATES:"bullish_invoice_templates",SETTINGS:"bullish_invoice_settings"};function L(n){try{localStorage.setItem(g.FORM_DATA,JSON.stringify(n))}catch(e){console.error("Error saving form data:",e)}}function C(){try{const n=localStorage.getItem(g.FORM_DATA);return n?JSON.parse(n):null}catch(n){return console.error("Error loading form data:",n),null}}function P(n,e){try{const t=w();t[n]={...e,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},localStorage.setItem(g.TEMPLATES,JSON.stringify(t))}catch(t){console.error("Error saving template:",t)}}function w(){try{const n=localStorage.getItem(g.TEMPLATES);return n?JSON.parse(n):{}}catch(n){return console.error("Error loading templates:",n),{}}}function _(n){try{return w()[n]||null}catch(e){return console.error("Error loading template:",e),null}}function F(){try{const n=w();return Object.keys(n)}catch(n){return console.error("Error getting template names:",n),[]}}function k(){try{const n=localStorage.getItem(g.SETTINGS);return n?JSON.parse(n):B()}catch(n){return console.error("Error loading settings:",n),B()}}function B(){return{autoSave:!0,autoSaveInterval:5e3,defaultInvoicePrefix:"INV",defaultCurrency:"sats",theme:"dark"}}async function O(n,e){try{const t=event.target,o=t.innerHTML;t.innerHTML="⏳ Generating...",t.disabled=!0;const r=(await b(async()=>{const{default:s}=await import("./vendor-B0ga06J7.js").then(l=>l.h);return{default:s}},[])).default,i=await r(n,{backgroundColor:"#ffffff",scale:2,useCORS:!0,allowTaint:!1,logging:!1,width:n.offsetWidth,height:n.offsetHeight}),a=document.createElement("a");a.download=`${e}.png`,a.href=i.toDataURL("image/png"),document.body.appendChild(a),a.click(),document.body.removeChild(a),t.innerHTML=o,t.disabled=!1,c("Image exported successfully!","success")}catch(t){console.error("Error exporting image:",t),c("Error exporting image. Please try again.","error");const o=event.target;o.innerHTML="🖼️ Export Image",o.disabled=!1}}async function A(n,e){try{const t=event.target,o=t.innerHTML;t.innerHTML="⏳ Generating...",t.disabled=!0;const r=(await b(async()=>{const{default:f}=await import("./vendor-B0ga06J7.js").then(y=>y.h);return{default:f}},[])).default,{jsPDF:i}=await b(async()=>{const{jsPDF:f}=await import("./vendor-B0ga06J7.js").then(y=>y.j);return{jsPDF:f}},[]),a=await r(n,{backgroundColor:"#ffffff",scale:2,useCORS:!0,allowTaint:!1,logging:!1,width:n.offsetWidth,height:n.offsetHeight}),s=new i("p","mm","a4"),l=a.toDataURL("image/png"),m=210,u=295,d=a.height*m/a.width;let p=d,v=0;for(s.addImage(l,"PNG",0,v,m,d),p-=u;p>=0;)v=p-d,s.addPage(),s.addImage(l,"PNG",0,v,m,d),p-=u;s.save(`${e}.pdf`),t.innerHTML=o,t.disabled=!1,c("PDF exported successfully!","success")}catch(t){console.error("Error exporting PDF:",t),c("Error exporting PDF. Please try again.","error");const o=event.target;o.innerHTML="📄 Export PDF",o.disabled=!1}}function M(n){try{const e=window.open("","_blank"),t=n.cloneNode(!0);e.document.write(`
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
        `),e.document.close(),e.focus(),e.onload=function(){e.print(),e.close()},c("Print dialog opened!","success")}catch(e){console.error("Error printing invoice:",e),c("Error printing invoice. Please try again.","error")}}class H{constructor(){this.settings=k(),this.autoSaveTimer=null,this.init(),this.loadVersion()}init(){this.setupEventListeners(),this.loadSavedData(),this.setupAutoSave(),this.updatePreview(),this.setupTemplateControls()}setupEventListeners(){var e,t,o,r,i,a;document.querySelectorAll("input, textarea").forEach(s=>{s.addEventListener("input",S(()=>{this.updatePreview(),this.saveFormData()},300))}),(e=document.getElementById("exportPdfBtn"))==null||e.addEventListener("click",()=>{const s=document.getElementById("invoicePreview"),l=`invoice-${this.getFormData().invoiceNumber||"INV-001"}`;A(s,l)}),(t=document.getElementById("exportImageBtn"))==null||t.addEventListener("click",()=>{const s=document.getElementById("invoicePreview"),l=`invoice-${this.getFormData().invoiceNumber||"INV-001"}`;O(s,l)}),(o=document.getElementById("printBtn"))==null||o.addEventListener("click",()=>{const s=document.getElementById("invoicePreview");M(s)}),(r=document.getElementById("lightningInvoice"))==null||r.addEventListener("blur",s=>{this.validateLightningInvoice(s.target)}),(i=document.getElementById("generateInvoiceNumberBtn"))==null||i.addEventListener("click",()=>{this.generateNewInvoiceNumber()}),(a=document.getElementById("clearFormBtn"))==null||a.addEventListener("click",()=>{this.clearForm()})}getFormData(){var e,t,o,r,i,a,s,l,m,u,d;return{invoiceNumber:((e=document.getElementById("invoiceNumber"))==null?void 0:e.value)||"INV-001",invoiceDate:((t=document.getElementById("invoiceDate"))==null?void 0:t.value)||"",fromName:((o=document.getElementById("fromName"))==null?void 0:o.value)||"",toName:((r=document.getElementById("toName"))==null?void 0:r.value)||"",description:((i=document.getElementById("description"))==null?void 0:i.value)||"",quantity:parseInt((a=document.getElementById("quantity"))==null?void 0:a.value)||1,rate:parseInt((s=document.getElementById("rate"))==null?void 0:s.value)||0,lightningInvoice:((l=document.getElementById("lightningInvoice"))==null?void 0:l.value)||"",notes:((m=document.getElementById("notes"))==null?void 0:m.value)||"",total:D(parseInt((u=document.getElementById("quantity"))==null?void 0:u.value)||1,parseInt((d=document.getElementById("rate"))==null?void 0:d.value)||0)}}setFormData(e){e.invoiceNumber&&(document.getElementById("invoiceNumber").value=e.invoiceNumber),e.invoiceDate&&(document.getElementById("invoiceDate").value=e.invoiceDate),e.fromName&&(document.getElementById("fromName").value=e.fromName),e.toName&&(document.getElementById("toName").value=e.toName),e.description&&(document.getElementById("description").value=e.description),e.quantity&&(document.getElementById("quantity").value=e.quantity),e.rate&&(document.getElementById("rate").value=e.rate),e.lightningInvoice&&(document.getElementById("lightningInvoice").value=e.lightningInvoice),e.notes&&(document.getElementById("notes").value=e.notes)}updatePreview(){const e=this.getFormData(),t=e.total;document.getElementById("previewInvoiceNumber")&&(document.getElementById("previewInvoiceNumber").textContent=e.invoiceNumber),document.getElementById("previewInvoiceDate")&&(document.getElementById("previewInvoiceDate").textContent=e.invoiceDate||"--"),document.getElementById("previewFromName")&&(document.getElementById("previewFromName").innerHTML=E(e.fromName.replace(/\n/g,"<br>"))),document.getElementById("previewToName")&&(document.getElementById("previewToName").innerHTML=E(e.toName.replace(/\n/g,"<br>"))),document.getElementById("previewDescription")&&(document.getElementById("previewDescription").textContent=e.description),document.getElementById("previewQuantity")&&(document.getElementById("previewQuantity").textContent=e.quantity),document.getElementById("previewRate")&&(document.getElementById("previewRate").textContent=h(e.rate)),document.getElementById("previewAmount")&&(document.getElementById("previewAmount").textContent=h(t)),document.getElementById("previewTotal")&&(document.getElementById("previewTotal").textContent=h(t));const o=document.getElementById("lightningSection");if(o)if(e.lightningInvoice.trim()){o.style.display="block",document.getElementById("previewLightningInvoice").textContent=e.lightningInvoice;const i=document.getElementById("qrCodeContainer");i&&(i.style.display="block",this.updateQRCode(e.lightningInvoice))}else o.style.display="none";const r=document.getElementById("notesSection");r&&(e.notes.trim()?(r.style.display="block",document.getElementById("previewNotes").innerHTML=E(e.notes.replace(/\n/g,"<br>"))):r.style.display="none")}validateLightningInvoice(e){const t=N(e.value);e.classList.remove("input-error","input-success"),e.value.trim()&&!t?(e.classList.add("input-error"),this.showError(e,"Invalid Lightning Network invoice format")):e.value.trim()&&t&&(e.classList.add("input-success"),this.removeError(e))}showError(e,t){this.removeError(e);const o=document.createElement("div");o.className="error-message",o.textContent=t,e.parentNode.appendChild(o)}removeError(e){const t=e.parentNode.querySelector(".error-message");t&&t.remove()}generateNewInvoiceNumber(){const e=I(this.settings.defaultInvoicePrefix);document.getElementById("invoiceNumber").value=e,this.updatePreview(),this.saveFormData(),c("New invoice number generated!","success")}clearForm(){if(confirm("Are you sure you want to clear all form data? This action cannot be undone.")){const e=T();document.getElementById("invoiceNumber").value=I(this.settings.defaultInvoicePrefix),document.getElementById("invoiceDate").value=e.invoiceDate,document.getElementById("fromName").value="",document.getElementById("toName").value="",document.getElementById("description").value="",document.getElementById("quantity").value="1",document.getElementById("rate").value="",document.getElementById("lightningInvoice").value="",document.getElementById("notes").value="",this.updatePreview(),this.saveFormData(),c("Form cleared successfully!","success")}}saveFormData(){if(this.settings.autoSave){const e=this.getFormData();L(e)}}loadSavedData(){const e=C();if(e)this.setFormData(e),c("Previous form data loaded!","success");else{const t=T();document.getElementById("invoiceDate").value=t.invoiceDate,document.getElementById("invoiceNumber").value=I(this.settings.defaultInvoicePrefix)}}setupAutoSave(){this.settings.autoSave&&(this.autoSaveTimer=setInterval(()=>{this.saveFormData()},this.settings.autoSaveInterval))}setupTemplateControls(){const e=document.querySelector(".form-panel");if(e&&!document.querySelector(".template-controls")){const t=this.createTemplateControls();e.insertBefore(t,e.firstChild)}}createTemplateControls(){const e=document.createElement("div");return e.className="template-controls",e.innerHTML=`
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
        `,e}saveCurrentTemplate(){const e=prompt("Enter template name:");if(e&&e.trim()){const t=this.getFormData();P(e.trim(),t),c(`Template "${e}" saved successfully!`,"success")}}loadTemplateDialog(){const e=F();if(e.length===0){c("No saved templates found.","warning");return}const t=e.map(r=>`<option value="${r}">${r}</option>`).join(""),o=document.createElement("div");o.style.cssText=`
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
        `,document.body.appendChild(o)}loadSelectedTemplate(){const t=document.getElementById("templateSelect").value,o=_(t);o&&(this.setFormData(o),this.updatePreview(),this.saveFormData(),c(`Template "${t}" loaded successfully!`,"success")),document.querySelector('div[style*="position: fixed"]').remove()}async loadVersion(){try{const t=await(await fetch("/package.json")).json(),o=document.querySelector(".version");o&&(o.textContent=`v${t.version}`)}catch{console.log("Could not load version from package.json, using default")}}updateQRCode(e){const t=document.getElementById("lightningQR");t&&e&&t.setAttribute("lightning",e)}}let x;document.addEventListener("DOMContentLoaded",()=>{x=new H,window.app=x});
