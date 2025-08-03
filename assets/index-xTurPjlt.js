import{_ as f}from"./vendor-B0ga06J7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();function h(n){return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}function b(n="INV"){const e=Date.now().toString().slice(-6),t=Math.floor(Math.random()*1e3).toString().padStart(3,"0");return`${n}-${e}-${t}`}async function w(n){if(!n||!n.trim())return null;try{const{decodeInvoice:e}=await f(async()=>{const{decodeInvoice:o}=await import("./index.modern-DRrZddpj.js");return{decodeInvoice:o}},[]);return e(n.trim())}catch(e){return console.error("Error decoding Lightning invoice:",e),null}}function T(n){return n?/^lnbc[0-9]+[munp]?[0-9]*[a-z0-9]+$/i.test(n.trim()):!0}function x(){return{invoiceDate:new Date().toISOString().split("T")[0]}}function L(n,e){return(parseInt(n)||0)*(parseInt(e)||0)}function d(n,e="success"){const t=document.createElement("div");t.className=`notification notification-${e}`,t.textContent=n,Object.assign(t.style,{position:"fixed",top:"20px",right:"20px",padding:"15px 20px",borderRadius:"8px",color:"white",fontWeight:"bold",zIndex:"1000",transform:"translateX(100%)",transition:"transform 0.3s ease",maxWidth:"300px",wordWrap:"break-word"});const o={success:"#10b981",error:"#ef4444",warning:"#f59e0b"};t.style.backgroundColor=o[e]||o.success,document.body.appendChild(t),setTimeout(()=>{t.style.transform="translateX(0)"},100),setTimeout(()=>{t.style.transform="translateX(100%)",setTimeout(()=>{document.body.removeChild(t)},300)},3e3)}function S(n,e){let t;return function(...i){const r=()=>{clearTimeout(t),n(...i)};clearTimeout(t),t=setTimeout(r,e)}}function I(n){const e=document.createElement("div");return e.textContent=n,e.innerHTML}const v={FORM_DATA:"bullish_invoice_form_data",TEMPLATES:"bullish_invoice_templates",SETTINGS:"bullish_invoice_settings"};function C(n){try{localStorage.setItem(v.FORM_DATA,JSON.stringify(n))}catch(e){console.error("Error saving form data:",e)}}function P(){try{const n=localStorage.getItem(v.FORM_DATA);return n?JSON.parse(n):null}catch(n){return console.error("Error loading form data:",n),null}}function _(n,e){try{const t=E();t[n]={...e,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},localStorage.setItem(v.TEMPLATES,JSON.stringify(t))}catch(t){console.error("Error saving template:",t)}}function E(){try{const n=localStorage.getItem(v.TEMPLATES);return n?JSON.parse(n):{}}catch(n){return console.error("Error loading templates:",n),{}}}function F(n){try{return E()[n]||null}catch(e){return console.error("Error loading template:",e),null}}function k(){try{const n=E();return Object.keys(n)}catch(n){return console.error("Error getting template names:",n),[]}}function M(){try{const n=localStorage.getItem(v.SETTINGS);return n?JSON.parse(n):D()}catch(n){return console.error("Error loading settings:",n),D()}}function D(){return{autoSave:!0,autoSaveInterval:5e3,defaultInvoicePrefix:"INV",defaultCurrency:"sats",theme:"dark"}}async function A(n,e){try{const t=event.target,o=t.innerHTML;t.innerHTML="⏳ Generating...",t.disabled=!0;const i=(await f(async()=>{const{default:a}=await import("./vendor-B0ga06J7.js").then(l=>l.h);return{default:a}},[])).default,r=await i(n,{backgroundColor:"#ffffff",scale:2,useCORS:!0,allowTaint:!1,logging:!1,scrollX:0,scrollY:0}),s=document.createElement("a");s.download=`${e}.png`,s.href=r.toDataURL("image/png"),document.body.appendChild(s),s.click(),document.body.removeChild(s),t.innerHTML=o,t.disabled=!1,d("Image exported successfully!","success")}catch(t){console.error("Error exporting image:",t),d("Error exporting image. Please try again.","error");const o=event.target;o.innerHTML="🖼️ Export Image",o.disabled=!1}}async function O(n,e){try{const t=event.target,o=t.innerHTML;t.innerHTML="⏳ Generating...",t.disabled=!0;const i=(await f(async()=>{const{default:c}=await import("./vendor-B0ga06J7.js").then(p=>p.h);return{default:c}},[])).default,{jsPDF:r}=await f(async()=>{const{jsPDF:c}=await import("./vendor-B0ga06J7.js").then(p=>p.j);return{jsPDF:c}},[]),s=await i(n,{backgroundColor:"#ffffff",scale:2,useCORS:!0,allowTaint:!1,logging:!1,scrollX:0,scrollY:0}),a=new r("p","mm","a4"),l=s.toDataURL("image/png"),y=210,m=295,u=y,g=s.height*u/s.width;if(g<=m){const c=(m-g)/2;a.addImage(l,"PNG",0,c,u,g)}else{let c=g,p=0;for(a.addImage(l,"PNG",0,p,u,g),c-=m;c>=0;)p=c-g,a.addPage(),a.addImage(l,"PNG",0,p,u,g),c-=m}a.save(`${e}.pdf`),t.innerHTML=o,t.disabled=!1,d("PDF exported successfully!","success")}catch(t){console.error("Error exporting PDF:",t),d("Error exporting PDF. Please try again.","error");const o=event.target;o.innerHTML="📄 Export PDF",o.disabled=!1}}function $(n){try{const e=document.body.style.display,t=document.body.style.visibility;document.body.style.display="block",document.body.style.visibility="hidden",n.style.visibility="visible",n.style.position="absolute",n.style.left="0",n.style.top="0",n.style.width="8.5in",n.style.height="11in",n.style.margin="0",n.style.padding="0.5in",n.style.backgroundColor="white",n.style.color="black",n.style.fontFamily="Arial, sans-serif",n.style.boxShadow="none",n.style.border="none",n.style.overflow="visible",n.style.zIndex="9999";const o=document.createElement("style");o.textContent=`
            @media print {
                body {
                    margin: 0 !important;
                    padding: 0 !important;
                    background: white !important;
                }
                .invoice-preview {
                    box-shadow: none !important;
                    border: none !important;
                    margin: 0 !important;
                    padding: 0.5in !important;
                    width: 8.5in !important;
                    height: 11in !important;
                    max-width: none !important;
                    overflow: visible !important;
                    background: white !important;
                    color: black !important;
                    font-family: Arial, sans-serif !important;
                }
                .lightning-section {
                    break-inside: avoid;
                }
                .qr-code-container {
                    break-inside: avoid;
                }
                .form-panel,
                .app-header,
                .action-buttons,
                .template-controls {
                    display: none !important;
                }
            }
        `,document.head.appendChild(o),window.print(),setTimeout(()=>{document.body.style.display=e,document.body.style.visibility=t,n.style.visibility="",n.style.position="",n.style.left="",n.style.top="",n.style.width="",n.style.height="",n.style.margin="",n.style.padding="",n.style.backgroundColor="",n.style.color="",n.style.fontFamily="",n.style.boxShadow="",n.style.border="",n.style.overflow="",n.style.zIndex="",document.head.removeChild(o)},1e3),d("Print dialog opened!","success")}catch(e){console.error("Error printing invoice:",e),d("Error printing invoice. Please try again.","error")}}class R{constructor(){this.settings=M(),this.autoSaveTimer=null,this.init(),this.loadVersion()}init(){this.setupEventListeners(),this.loadSavedData(),this.setupAutoSave(),this.updatePreview(),this.setupTemplateControls()}setupEventListeners(){var e,t,o,i,r,s;document.querySelectorAll("input, textarea").forEach(a=>{a.addEventListener("input",S(()=>{this.updatePreview(),this.saveFormData()},300))}),(e=document.getElementById("exportPdfBtn"))==null||e.addEventListener("click",()=>{const a=document.getElementById("invoicePreview"),l=`invoice-${this.getFormData().invoiceNumber||"INV-001"}`;O(a,l)}),(t=document.getElementById("exportImageBtn"))==null||t.addEventListener("click",()=>{const a=document.getElementById("invoicePreview"),l=`invoice-${this.getFormData().invoiceNumber||"INV-001"}`;A(a,l)}),(o=document.getElementById("printBtn"))==null||o.addEventListener("click",()=>{const a=document.getElementById("invoicePreview");$(a)}),(i=document.getElementById("lightningInvoice"))==null||i.addEventListener("blur",async a=>{await this.validateLightningInvoice(a.target)}),(r=document.getElementById("generateInvoiceNumberBtn"))==null||r.addEventListener("click",()=>{this.generateNewInvoiceNumber()}),(s=document.getElementById("clearFormBtn"))==null||s.addEventListener("click",()=>{this.clearForm()})}getFormData(){var e,t,o,i,r,s,a,l,y,m,u;return{invoiceNumber:((e=document.getElementById("invoiceNumber"))==null?void 0:e.value)||"INV-001",invoiceDate:((t=document.getElementById("invoiceDate"))==null?void 0:t.value)||"",fromName:((o=document.getElementById("fromName"))==null?void 0:o.value)||"",toName:((i=document.getElementById("toName"))==null?void 0:i.value)||"",description:((r=document.getElementById("description"))==null?void 0:r.value)||"",quantity:parseInt((s=document.getElementById("quantity"))==null?void 0:s.value)||1,rate:parseInt((a=document.getElementById("rate"))==null?void 0:a.value)||0,lightningInvoice:((l=document.getElementById("lightningInvoice"))==null?void 0:l.value)||"",notes:((y=document.getElementById("notes"))==null?void 0:y.value)||"",total:L(parseInt((m=document.getElementById("quantity"))==null?void 0:m.value)||1,parseInt((u=document.getElementById("rate"))==null?void 0:u.value)||0)}}setFormData(e){e.invoiceNumber&&(document.getElementById("invoiceNumber").value=e.invoiceNumber),e.invoiceDate&&(document.getElementById("invoiceDate").value=e.invoiceDate),e.fromName&&(document.getElementById("fromName").value=e.fromName),e.toName&&(document.getElementById("toName").value=e.toName),e.description&&(document.getElementById("description").value=e.description),e.quantity&&(document.getElementById("quantity").value=e.quantity),e.rate&&(document.getElementById("rate").value=e.rate),e.lightningInvoice&&(document.getElementById("lightningInvoice").value=e.lightningInvoice),e.notes&&(document.getElementById("notes").value=e.notes)}updatePreview(){const e=this.getFormData(),t=e.total;document.getElementById("previewInvoiceNumber")&&(document.getElementById("previewInvoiceNumber").textContent=e.invoiceNumber),document.getElementById("previewInvoiceDate")&&(document.getElementById("previewInvoiceDate").textContent=e.invoiceDate||"--"),document.getElementById("previewFromName")&&(document.getElementById("previewFromName").innerHTML=I(e.fromName.replace(/\n/g,"<br>"))),document.getElementById("previewToName")&&(document.getElementById("previewToName").innerHTML=I(e.toName.replace(/\n/g,"<br>"))),document.getElementById("previewDescription")&&(document.getElementById("previewDescription").textContent=e.description),document.getElementById("previewQuantity")&&(document.getElementById("previewQuantity").textContent=e.quantity),document.getElementById("previewRate")&&(document.getElementById("previewRate").textContent=h(e.rate)),document.getElementById("previewAmount")&&(document.getElementById("previewAmount").textContent=h(t)),document.getElementById("previewTotal")&&(document.getElementById("previewTotal").textContent=h(t));const o=document.getElementById("lightningSection");if(o)if(e.lightningInvoice.trim()){o.style.display="block",document.getElementById("previewLightningInvoice").textContent=e.lightningInvoice,this.updateLightningDetails(e.lightningInvoice);const r=document.getElementById("qrCodeContainer");r&&(r.style.display="block",this.updateQRCode(e.lightningInvoice))}else o.style.display="none";const i=document.getElementById("notesSection");i&&(e.notes.trim()?(i.style.display="block",document.getElementById("previewNotes").innerHTML=I(e.notes.replace(/\n/g,"<br>"))):i.style.display="none")}async validateLightningInvoice(e){const t=T(e.value);if(e.classList.remove("input-error","input-success"),e.value.trim()&&!t)e.classList.add("input-error"),this.showError(e,"Invalid Lightning Network invoice format");else if(e.value.trim()&&t)try{await w(e.value)?(e.classList.add("input-success"),this.removeError(e)):(e.classList.add("input-error"),this.showError(e,"Invalid Lightning Network invoice"))}catch{e.classList.add("input-error"),this.showError(e,"Invalid Lightning Network invoice")}}showError(e,t){this.removeError(e);const o=document.createElement("div");o.className="error-message",o.textContent=t,e.parentNode.appendChild(o)}removeError(e){const t=e.parentNode.querySelector(".error-message");t&&t.remove()}generateNewInvoiceNumber(){const e=b(this.settings.defaultInvoicePrefix);document.getElementById("invoiceNumber").value=e,this.updatePreview(),this.saveFormData(),d("New invoice number generated!","success")}clearForm(){if(confirm("Are you sure you want to clear all form data? This action cannot be undone.")){const e=x();document.getElementById("invoiceNumber").value=b(this.settings.defaultInvoicePrefix),document.getElementById("invoiceDate").value=e.invoiceDate,document.getElementById("fromName").value="",document.getElementById("toName").value="",document.getElementById("description").value="",document.getElementById("quantity").value="1",document.getElementById("rate").value="",document.getElementById("lightningInvoice").value="",document.getElementById("notes").value="",this.updatePreview(),this.saveFormData(),d("Form cleared successfully!","success")}}saveFormData(){if(this.settings.autoSave){const e=this.getFormData();C(e)}}loadSavedData(){const e=P();if(e)this.setFormData(e),d("Previous form data loaded!","success");else{const t=x();document.getElementById("invoiceDate").value=t.invoiceDate,document.getElementById("invoiceNumber").value=b(this.settings.defaultInvoicePrefix)}}setupAutoSave(){this.settings.autoSave&&(this.autoSaveTimer=setInterval(()=>{this.saveFormData()},this.settings.autoSaveInterval))}setupTemplateControls(){const e=document.querySelector(".form-panel");if(e&&!document.querySelector(".template-controls")){const t=this.createTemplateControls();e.insertBefore(t,e.firstChild)}}createTemplateControls(){const e=document.createElement("div");return e.className="template-controls",e.innerHTML=`
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
        `,e}saveCurrentTemplate(){const e=prompt("Enter template name:");if(e&&e.trim()){const t=this.getFormData();_(e.trim(),t),d(`Template "${e}" saved successfully!`,"success")}}loadTemplateDialog(){const e=k();if(e.length===0){d("No saved templates found.","warning");return}const t=e.map(i=>`<option value="${i}">${i}</option>`).join(""),o=document.createElement("div");o.style.cssText=`
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
        `,document.body.appendChild(o)}loadSelectedTemplate(){const t=document.getElementById("templateSelect").value,o=F(t);o&&(this.setFormData(o),this.updatePreview(),this.saveFormData(),d(`Template "${t}" loaded successfully!`,"success")),document.querySelector('div[style*="position: fixed"]').remove()}loadVersion(){try{const e="0.0.2",t=document.getElementById("versionDisplay");t&&(t.textContent=`v${e}`)}catch{console.log("Could not load version, using default")}}updateQRCode(e){const t=document.getElementById("lightningQR");t&&e&&t.setAttribute("lightning",e)}async updateLightningDetails(e){try{const t=await w(e),o=document.getElementById("lightningExpiry");if(t&&o){if(t.timestamp&&t.expiry){const i=new Date((t.timestamp+t.expiry)*1e3);if(i-new Date>0){const a=i.getMonth()+1,l=i.getDate(),y=i.getFullYear(),m=i.getHours(),u=i.getMinutes(),g=m>=12?"PM":"AM",c=m%12||12,p=u.toString().padStart(2,"0"),N=`${a}/${l}/${y} ${c}:${p} ${g}`;o.textContent=`Expires: ${N}`}else o.textContent="Expired"}else o.textContent="Expiration time not available";o.style.display="inline-block"}else o&&(o.style.display="none")}catch(t){console.error("Error updating Lightning details:",t);const o=document.getElementById("lightningExpiry");o&&(o.style.display="none")}}}let B;document.addEventListener("DOMContentLoaded",()=>{B=new R,window.app=B});
