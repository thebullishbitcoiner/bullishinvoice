import{_ as h}from"./vendor-B0ga06J7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();function I(i){return i.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}function b(i="INV"){const e=Date.now().toString().slice(-6),t=Math.floor(Math.random()*1e3).toString().padStart(3,"0");return`${i}-${e}-${t}`}async function w(i){if(!i||!i.trim())return null;try{const{decodeInvoice:e}=await h(async()=>{const{decodeInvoice:n}=await import("./index.modern-DRrZddpj.js");return{decodeInvoice:n}},[]);return e(i.trim())}catch(e){return console.error("Error decoding Lightning invoice:",e),null}}function D(i){return i?/^lnbc[0-9]+[munp]?[0-9]*[a-z0-9]+$/i.test(i.trim()):!0}function x(){return{invoiceDate:new Date().toISOString().split("T")[0]}}function u(i,e="success"){const t=document.createElement("div");t.className=`notification notification-${e}`,t.textContent=i,Object.assign(t.style,{position:"fixed",top:"20px",right:"20px",padding:"15px 20px",borderRadius:"8px",color:"white",fontWeight:"bold",zIndex:"1000",transform:"translateX(100%)",transition:"transform 0.3s ease",maxWidth:"300px",wordWrap:"break-word"});const n={success:"#10b981",error:"#ef4444",warning:"#f59e0b"};t.style.backgroundColor=n[e]||n.success,document.body.appendChild(t),setTimeout(()=>{t.style.transform="translateX(0)"},100),setTimeout(()=>{t.style.transform="translateX(100%)",setTimeout(()=>{document.body.removeChild(t)},300)},3e3)}function N(i,e){let t;return function(...o){const r=()=>{clearTimeout(t),i(...o)};clearTimeout(t),t=setTimeout(r,e)}}function f(i){const e=document.createElement("div");return e.textContent=i,e.innerHTML}const y={FORM_DATA:"bullish_invoice_form_data",TEMPLATES:"bullish_invoice_templates",SETTINGS:"bullish_invoice_settings"};function S(i){try{localStorage.setItem(y.FORM_DATA,JSON.stringify(i))}catch(e){console.error("Error saving form data:",e)}}function C(){try{const i=localStorage.getItem(y.FORM_DATA);return i?JSON.parse(i):null}catch(i){return console.error("Error loading form data:",i),null}}function P(i,e){try{const t=E();t[i]={...e,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},localStorage.setItem(y.TEMPLATES,JSON.stringify(t))}catch(t){console.error("Error saving template:",t)}}function E(){try{const i=localStorage.getItem(y.TEMPLATES);return i?JSON.parse(i):{}}catch(i){return console.error("Error loading templates:",i),{}}}function _(i){try{return E()[i]||null}catch(e){return console.error("Error loading template:",e),null}}function $(){try{const i=E();return Object.keys(i)}catch(i){return console.error("Error getting template names:",i),[]}}function F(){try{const i=localStorage.getItem(y.SETTINGS);return i?JSON.parse(i):L()}catch(i){return console.error("Error loading settings:",i),L()}}function L(){return{autoSave:!0,autoSaveInterval:5e3,defaultInvoicePrefix:"INV",defaultCurrency:"sats",theme:"dark"}}async function A(i,e){try{const t=event.target,n=t.innerHTML;t.innerHTML="⏳ Generating...",t.disabled=!0;const o=(await h(async()=>{const{default:l}=await import("./vendor-B0ga06J7.js").then(c=>c.h);return{default:l}},[])).default,r=await o(i,{backgroundColor:"#ffffff",scale:2,useCORS:!0,allowTaint:!1,logging:!1,scrollX:0,scrollY:0}),s=document.createElement("a");s.download=`${e}.png`,s.href=r.toDataURL("image/png"),document.body.appendChild(s),s.click(),document.body.removeChild(s),t.innerHTML=n,t.disabled=!1,u("Image exported successfully!","success")}catch(t){console.error("Error exporting image:",t),u("Error exporting image. Please try again.","error");const n=event.target;n.innerHTML="Export Image",n.disabled=!1}}async function k(i,e){try{const t=event.target,n=t.innerHTML;t.innerHTML="⏳ Generating...",t.disabled=!0;const o=(await h(async()=>{const{default:m}=await import("./vendor-B0ga06J7.js").then(p=>p.h);return{default:m}},[])).default,{jsPDF:r}=await h(async()=>{const{jsPDF:m}=await import("./vendor-B0ga06J7.js").then(p=>p.j);return{jsPDF:m}},[]),s=await o(i,{backgroundColor:"#ffffff",scale:2,useCORS:!0,allowTaint:!1,logging:!1,scrollX:0,scrollY:0}),l=new r("p","mm","a4"),c=s.toDataURL("image/png"),a=210,d=295,v=a,g=s.height*v/s.width;if(g<=d){const m=(d-g)/2;l.addImage(c,"PNG",0,m,v,g)}else{let m=g,p=0;for(l.addImage(c,"PNG",0,p,v,g),m-=d;m>=0;)p=m-g,l.addPage(),l.addImage(c,"PNG",0,p,v,g),m-=d}l.save(`${e}.pdf`),t.innerHTML=n,t.disabled=!1,u("PDF exported successfully!","success")}catch(t){console.error("Error exporting PDF:",t),u("Error exporting PDF. Please try again.","error");const n=event.target;n.innerHTML="Export PDF",n.disabled=!1}}function M(i){try{const e=document.body.style.display,t=document.body.style.visibility;document.body.style.display="block",document.body.style.visibility="hidden",i.style.visibility="visible",i.style.position="absolute",i.style.left="0",i.style.top="0",i.style.width="8.5in",i.style.height="11in",i.style.margin="0",i.style.padding="0.5in",i.style.backgroundColor="white",i.style.color="black",i.style.fontFamily="Arial, sans-serif",i.style.boxShadow="none",i.style.border="none",i.style.overflow="visible",i.style.zIndex="9999";const n=document.createElement("style");n.textContent=`
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
        `,document.head.appendChild(n),window.print(),setTimeout(()=>{document.body.style.display=e,document.body.style.visibility=t,i.style.visibility="",i.style.position="",i.style.left="",i.style.top="",i.style.width="",i.style.height="",i.style.margin="",i.style.padding="",i.style.backgroundColor="",i.style.color="",i.style.fontFamily="",i.style.boxShadow="",i.style.border="",i.style.overflow="",i.style.zIndex="",document.head.removeChild(n)},1e3),u("Print dialog opened!","success")}catch(e){console.error("Error printing invoice:",e),u("Error printing invoice. Please try again.","error")}}class q{constructor(){this.settings=F(),this.autoSaveTimer=null,this.init(),this.loadVersion()}init(){this.setupEventListeners(),this.setupLineItemEventListeners(),this.loadSavedData(),this.setupAutoSave(),this.updatePreview(),this.setupTemplateControls()}setupEventListeners(){document.querySelectorAll("input, textarea").forEach(a=>{a.addEventListener("input",()=>{this.updatePreview(),this.saveFormData()})});const t=document.getElementById("lightningInvoice");t&&t.addEventListener("input",async a=>{await this.validateLightningInvoice(a.target)&&this.updateQRCode(a.target.value)});const n=document.getElementById("exportPdfBtn"),o=document.getElementById("exportImageBtn"),r=document.getElementById("printBtn");n&&n.addEventListener("click",()=>{const a=document.getElementById("invoicePreview");a&&k(a,"invoice")}),o&&o.addEventListener("click",()=>{const a=document.getElementById("invoicePreview");a&&A(a,"invoice")}),r&&r.addEventListener("click",()=>{const a=document.getElementById("invoicePreview");a&&M(a)}),window.addEventListener("resize",()=>{const a=document.getElementById("lightningInvoice");a&&a.value&&this.updateQRCode(a.value)});const s=document.getElementById("lightningInvoice");s&&s.addEventListener("blur",async a=>{await this.validateLightningInvoice(a.target)});const l=document.getElementById("generateInvoiceNumberBtn");l&&l.addEventListener("click",()=>{this.generateNewInvoiceNumber()});const c=document.getElementById("clearFormBtn");c&&c.addEventListener("click",()=>{this.clearForm()})}getFormData(){var n,o,r,s,l,c;const e=this.getLineItems(),t=e.reduce((a,d)=>a+d.quantity*d.rate,0);return{invoiceNumber:((n=document.getElementById("invoiceNumber"))==null?void 0:n.value)||"INV-001",invoiceDate:((o=document.getElementById("invoiceDate"))==null?void 0:o.value)||"",fromName:((r=document.getElementById("fromName"))==null?void 0:r.value)||"",toName:((s=document.getElementById("toName"))==null?void 0:s.value)||"",lineItems:e,lightningInvoice:((l=document.getElementById("lightningInvoice"))==null?void 0:l.value)||"",notes:((c=document.getElementById("notes"))==null?void 0:c.value)||"",total:t}}getLineItems(){const e=[];return document.querySelectorAll(".line-item").forEach(n=>{var c,a,d;const o=n.getAttribute("data-item-id"),r=((c=document.getElementById(`description-${o}`))==null?void 0:c.value)||"",s=parseInt((a=document.getElementById(`quantity-${o}`))==null?void 0:a.value)||1,l=parseInt((d=document.getElementById(`rate-${o}`))==null?void 0:d.value)||0;r.trim()&&e.push({id:o,description:r,quantity:s,rate:l,amount:s*l})}),e}setFormData(e){e.invoiceNumber&&(document.getElementById("invoiceNumber").value=e.invoiceNumber),e.invoiceDate&&(document.getElementById("invoiceDate").value=e.invoiceDate),e.fromName&&(document.getElementById("fromName").value=e.fromName),e.toName&&(document.getElementById("toName").value=e.toName),e.lightningInvoice&&(document.getElementById("lightningInvoice").value=e.lightningInvoice),e.notes&&(document.getElementById("notes").value=e.notes),e.lineItems&&Array.isArray(e.lineItems)&&this.setLineItems(e.lineItems)}setLineItems(e){const n=document.getElementById("lineItemsContainer").querySelectorAll(".line-item");n.length>0&&(n[0],document.getElementById("description-1").value="",document.getElementById("quantity-1").value="1",document.getElementById("rate-1").value="");for(let o=1;o<n.length;o++)n[o].remove();e.forEach((o,r)=>{r===0?(document.getElementById("description-1").value=o.description,document.getElementById("quantity-1").value=o.quantity,document.getElementById("rate-1").value=o.rate):this.addLineItem(o.description,o.quantity,o.rate)}),this.updatePreview()}updatePreview(){const e=this.getFormData(),t=e.total;document.getElementById("previewInvoiceNumber")&&(document.getElementById("previewInvoiceNumber").textContent=e.invoiceNumber),document.getElementById("previewInvoiceDate")&&(document.getElementById("previewInvoiceDate").textContent=e.invoiceDate||"--"),document.getElementById("previewFromName")&&(document.getElementById("previewFromName").innerHTML=f(e.fromName.replace(/\n/g,"<br>"))),document.getElementById("previewToName")&&(document.getElementById("previewToName").innerHTML=f(e.toName.replace(/\n/g,"<br>"))),this.updatePreviewTable(e.lineItems),document.getElementById("previewTotal")&&(document.getElementById("previewTotal").textContent=I(t));const n=document.getElementById("lightningSection");if(n)if(e.lightningInvoice.trim()){n.style.display="block",document.getElementById("previewLightningInvoice").textContent=e.lightningInvoice,this.updateLightningDetails(e.lightningInvoice);const r=document.getElementById("qrCodeContainer");r&&(r.style.display="block",this.updateQRCode(e.lightningInvoice))}else n.style.display="none";const o=document.getElementById("notesSection");o&&(e.notes.trim()?(o.style.display="block",document.getElementById("previewNotes").innerHTML=f(e.notes.replace(/\n/g,"<br>"))):o.style.display="none")}async validateLightningInvoice(e){const t=D(e.value);if(e.classList.remove("input-error","input-success"),e.value.trim()&&!t)e.classList.add("input-error"),this.showError(e,"Invalid Lightning Network invoice format");else if(e.value.trim()&&t)try{await w(e.value)?(e.classList.add("input-success"),this.removeError(e)):(e.classList.add("input-error"),this.showError(e,"Invalid Lightning Network invoice"))}catch{e.classList.add("input-error"),this.showError(e,"Invalid Lightning Network invoice")}return t}showError(e,t){this.removeError(e);const n=document.createElement("div");n.className="error-message",n.textContent=t,e.parentNode.appendChild(n)}removeError(e){const t=e.parentNode.querySelector(".error-message");t&&t.remove()}generateNewInvoiceNumber(){const e=b(this.settings.defaultInvoicePrefix);document.getElementById("invoiceNumber").value=e,this.updatePreview(),this.saveFormData(),u("New invoice number generated!","success")}clearForm(){if(confirm("Are you sure you want to clear all form data? This action cannot be undone.")){const e=x();document.getElementById("invoiceNumber").value=b(this.settings.defaultInvoicePrefix),document.getElementById("invoiceDate").value=e.invoiceDate,document.getElementById("fromName").value="",document.getElementById("toName").value="",document.getElementById("description").value="",document.getElementById("quantity").value="1",document.getElementById("rate").value="",document.getElementById("lightningInvoice").value="",document.getElementById("notes").value="",this.updatePreview(),this.saveFormData(),u("Form cleared successfully!","success")}}saveFormData(){if(this.settings.autoSave){const e=this.getFormData();S(e)}}loadSavedData(){const e=C();if(e)this.setFormData(e),u("Previous form data loaded!","success");else{const t=x();document.getElementById("invoiceDate").value=t.invoiceDate,document.getElementById("invoiceNumber").value=b(this.settings.defaultInvoicePrefix)}}setupAutoSave(){this.settings.autoSave&&(this.autoSaveTimer=setInterval(()=>{this.saveFormData()},this.settings.autoSaveInterval))}setupTemplateControls(){const e=document.querySelector(".form-panel");if(e&&!document.querySelector(".template-controls")){const t=this.createTemplateControls();e.insertBefore(t,e.firstChild)}}createTemplateControls(){const e=document.createElement("div");return e.className="template-controls",e.innerHTML=`
            <h3>Templates</h3>
            <div class="template-buttons">
                <button type="button" class="btn btn-success" onclick="app.saveCurrentTemplate()">
                    Save Template
                </button>
                <button type="button" class="btn btn-secondary" onclick="app.loadTemplateDialog()">
                    Load Template
                </button>
                <button type="button" class="btn btn-warning" onclick="app.clearForm()">
                    Clear Form
                </button>
                <button type="button" class="btn btn-primary" onclick="app.generateNewInvoiceNumber()">
                    New Invoice #
                </button>
            </div>
        `,e}saveCurrentTemplate(){const e=prompt("Enter template name:");if(e&&e.trim()){const t=this.getFormData();P(e.trim(),t),u(`Template "${e}" saved successfully!`,"success")}}loadTemplateDialog(){const e=$();if(e.length===0){u("No saved templates found.","warning");return}const t=e.map(o=>`<option value="${o}">${o}</option>`).join(""),n=document.createElement("div");n.style.cssText=`
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
        `,document.body.appendChild(n)}loadSelectedTemplate(){const t=document.getElementById("templateSelect").value,n=_(t);n&&(this.setFormData(n),this.updatePreview(),this.saveFormData(),u(`Template "${t}" loaded successfully!`,"success")),document.querySelector('div[style*="position: fixed"]').remove()}loadVersion(){try{const e="0.0.3",t=document.getElementById("versionDisplay");t&&(t.textContent=`v${e}`)}catch{console.log("Could not load version, using default")}}updateQRCode(e){const t=document.getElementById("lightningQR");if(t&&e){t.setAttribute("lightning",e);let n=300;window.innerWidth<=480?n=150:window.innerWidth<=768&&(n=200),t.setAttribute("width",n),t.setAttribute("height",n)}}async updateLightningDetails(e){try{const t=await w(e),n=document.getElementById("lightningExpiry");if(t&&n){if(t.timestamp&&t.expiry){const o=new Date((t.timestamp+t.expiry)*1e3);if(o-new Date>0){const l=o.getMonth()+1,c=o.getDate(),a=o.getFullYear(),d=o.getHours(),v=o.getMinutes(),g=d>=12?"PM":"AM",m=d%12||12,p=v.toString().padStart(2,"0"),T=`${l}/${c}/${a} ${m}:${p} ${g}`;n.textContent=`Expires: ${T}`}else n.textContent="Expired"}else n.textContent="Expiration time not available";n.style.display="inline-block"}else n&&(n.style.display="none")}catch(t){console.error("Error updating Lightning details:",t);const n=document.getElementById("lightningExpiry");n&&(n.style.display="none")}}updatePreviewTable(e){const t=document.getElementById("previewItemsTable");if(t&&(t.innerHTML="",e.forEach(n=>{const o=document.createElement("tr");o.innerHTML=`
                <td>${f(n.description)}</td>
                <td>${n.quantity}</td>
                <td>${I(n.rate)}</td>
                <td class="amount">${I(n.amount)}</td>
            `,t.appendChild(o)}),e.length===0)){const n=document.createElement("tr");n.innerHTML=`
                <td>No items</td>
                <td>0</td>
                <td>0</td>
                <td class="amount">0</td>
            `,t.appendChild(n)}}addLineItem(e="",t=1,n=0){const o=this.getNextItemId(),r=`
            <div class="line-item" data-item-id="${o}">
                <div class="form-group">
                    <label for="description-${o}">Item/Service Description</label>
                    <input type="text" id="description-${o}" placeholder="Bitcoin Consulting Services" class="item-description" value="${e}">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="quantity-${o}">Quantity</label>
                        <input type="number" id="quantity-${o}" placeholder="1" value="${t}" min="1" class="item-quantity">
                    </div>
                    <div class="form-group">
                        <label for="rate-${o}">Price</label>
                        <div class="sats-input">
                            <input type="number" id="rate-${o}" placeholder="100000" min="1" class="item-rate" value="${n}">
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-danger remove-item" data-item-id="${o}">X</button>
            </div>
        `;document.getElementById("lineItemsContainer").insertAdjacentHTML("beforeend",r),this.addLineItemEventListeners(o)}getNextItemId(){const e=document.querySelectorAll(".line-item");let t=0;return e.forEach(n=>{const o=parseInt(n.getAttribute("data-item-id"));o>t&&(t=o)}),t+1}addLineItemEventListeners(e){[document.getElementById(`description-${e}`),document.getElementById(`quantity-${e}`),document.getElementById(`rate-${e}`)].forEach(o=>{o&&o.addEventListener("input",N(()=>{this.updatePreview(),this.saveFormData()},300))});const n=document.querySelector(`[data-item-id="${e}"].remove-item`);n&&n.addEventListener("click",()=>{this.removeLineItem(e)})}removeLineItem(e){const t=document.querySelector(`[data-item-id="${e}"]`);t&&(t.remove(),this.updatePreview(),this.saveFormData())}setupLineItemEventListeners(){document.querySelectorAll(".line-item").forEach(n=>{const o=n.getAttribute("data-item-id");this.addLineItemEventListeners(o)});const t=document.getElementById("addLineItemBtn");t&&t.addEventListener("click",()=>{this.addLineItem()})}}let B;document.addEventListener("DOMContentLoaded",()=>{B=new q,window.app=B});
