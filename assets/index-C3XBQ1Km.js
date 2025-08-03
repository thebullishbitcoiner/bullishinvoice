import{_ as h}from"./vendor-B0ga06J7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();function I(o){return o.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}function b(o="INV"){const e=Date.now().toString().slice(-6),t=Math.floor(Math.random()*1e3).toString().padStart(3,"0");return`${o}-${e}-${t}`}async function w(o){if(!o||!o.trim())return null;try{const{decodeInvoice:e}=await h(async()=>{const{decodeInvoice:n}=await import("./index.modern-DRrZddpj.js");return{decodeInvoice:n}},[]);return e(o.trim())}catch(e){return console.error("Error decoding Lightning invoice:",e),null}}function N(o){return o?/^lnbc[0-9]+[munp]?[0-9]*[a-z0-9]+$/i.test(o.trim()):!0}function x(){return{invoiceDate:new Date().toISOString().split("T")[0]}}function m(o,e="success"){const t=document.createElement("div");t.className=`notification notification-${e}`,t.textContent=o,Object.assign(t.style,{position:"fixed",top:"20px",right:"20px",padding:"15px 20px",borderRadius:"8px",color:"white",fontWeight:"bold",zIndex:"1000",transform:"translateX(100%)",transition:"transform 0.3s ease",maxWidth:"300px",wordWrap:"break-word"});const n={success:"#10b981",error:"#ef4444",warning:"#f59e0b"};t.style.backgroundColor=n[e]||n.success,document.body.appendChild(t),setTimeout(()=>{t.style.transform="translateX(0)"},100),setTimeout(()=>{t.style.transform="translateX(100%)",setTimeout(()=>{document.body.removeChild(t)},300)},3e3)}function L(o,e){let t;return function(...i){const r=()=>{clearTimeout(t),o(...i)};clearTimeout(t),t=setTimeout(r,e)}}function f(o){const e=document.createElement("div");return e.textContent=o,e.innerHTML}const y={FORM_DATA:"bullish_invoice_form_data",TEMPLATES:"bullish_invoice_templates",SETTINGS:"bullish_invoice_settings"};function S(o){try{localStorage.setItem(y.FORM_DATA,JSON.stringify(o))}catch(e){console.error("Error saving form data:",e)}}function C(){try{const o=localStorage.getItem(y.FORM_DATA);return o?JSON.parse(o):null}catch(o){return console.error("Error loading form data:",o),null}}function P(o,e){try{const t=E();t[o]={...e,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},localStorage.setItem(y.TEMPLATES,JSON.stringify(t))}catch(t){console.error("Error saving template:",t)}}function E(){try{const o=localStorage.getItem(y.TEMPLATES);return o?JSON.parse(o):{}}catch(o){return console.error("Error loading templates:",o),{}}}function $(o){try{return E()[o]||null}catch(e){return console.error("Error loading template:",e),null}}function _(){try{const o=E();return Object.keys(o)}catch(o){return console.error("Error getting template names:",o),[]}}function F(){try{const o=localStorage.getItem(y.SETTINGS);return o?JSON.parse(o):B()}catch(o){return console.error("Error loading settings:",o),B()}}function B(){return{autoSave:!0,autoSaveInterval:5e3,defaultInvoicePrefix:"INV",defaultCurrency:"sats",theme:"dark"}}async function k(o,e){try{const t=event.target,n=t.innerHTML;t.innerHTML="⏳ Generating...",t.disabled=!0;const i=(await h(async()=>{const{default:s}=await import("./vendor-B0ga06J7.js").then(l=>l.h);return{default:s}},[])).default,r=await i(o,{backgroundColor:"#ffffff",scale:2,useCORS:!0,allowTaint:!1,logging:!1,scrollX:0,scrollY:0}),a=document.createElement("a");a.download=`${e}.png`,a.href=r.toDataURL("image/png"),document.body.appendChild(a),a.click(),document.body.removeChild(a),t.innerHTML=n,t.disabled=!1,m("Image exported successfully!","success")}catch(t){console.error("Error exporting image:",t),m("Error exporting image. Please try again.","error");const n=event.target;n.innerHTML="🖼️ Export Image",n.disabled=!1}}async function A(o,e){try{const t=event.target,n=t.innerHTML;t.innerHTML="⏳ Generating...",t.disabled=!0;const i=(await h(async()=>{const{default:d}=await import("./vendor-B0ga06J7.js").then(g=>g.h);return{default:d}},[])).default,{jsPDF:r}=await h(async()=>{const{jsPDF:d}=await import("./vendor-B0ga06J7.js").then(g=>g.j);return{jsPDF:d}},[]),a=await i(o,{backgroundColor:"#ffffff",scale:2,useCORS:!0,allowTaint:!1,logging:!1,scrollX:0,scrollY:0}),s=new r("p","mm","a4"),l=a.toDataURL("image/png"),p=210,c=295,v=p,u=a.height*v/a.width;if(u<=c){const d=(c-u)/2;s.addImage(l,"PNG",0,d,v,u)}else{let d=u,g=0;for(s.addImage(l,"PNG",0,g,v,u),d-=c;d>=0;)g=d-u,s.addPage(),s.addImage(l,"PNG",0,g,v,u),d-=c}s.save(`${e}.pdf`),t.innerHTML=n,t.disabled=!1,m("PDF exported successfully!","success")}catch(t){console.error("Error exporting PDF:",t),m("Error exporting PDF. Please try again.","error");const n=event.target;n.innerHTML="📄 Export PDF",n.disabled=!1}}function M(o){try{const e=document.body.style.display,t=document.body.style.visibility;document.body.style.display="block",document.body.style.visibility="hidden",o.style.visibility="visible",o.style.position="absolute",o.style.left="0",o.style.top="0",o.style.width="8.5in",o.style.height="11in",o.style.margin="0",o.style.padding="0.5in",o.style.backgroundColor="white",o.style.color="black",o.style.fontFamily="Arial, sans-serif",o.style.boxShadow="none",o.style.border="none",o.style.overflow="visible",o.style.zIndex="9999";const n=document.createElement("style");n.textContent=`
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
        `,document.head.appendChild(n),window.print(),setTimeout(()=>{document.body.style.display=e,document.body.style.visibility=t,o.style.visibility="",o.style.position="",o.style.left="",o.style.top="",o.style.width="",o.style.height="",o.style.margin="",o.style.padding="",o.style.backgroundColor="",o.style.color="",o.style.fontFamily="",o.style.boxShadow="",o.style.border="",o.style.overflow="",o.style.zIndex="",document.head.removeChild(n)},1e3),m("Print dialog opened!","success")}catch(e){console.error("Error printing invoice:",e),m("Error printing invoice. Please try again.","error")}}class q{constructor(){this.settings=F(),this.autoSaveTimer=null,this.init(),this.loadVersion()}init(){this.setupEventListeners(),this.setupLineItemEventListeners(),this.loadSavedData(),this.setupAutoSave(),this.updatePreview(),this.setupTemplateControls()}setupEventListeners(){var e,t,n,i,r,a;document.querySelectorAll("input, textarea").forEach(s=>{s.addEventListener("input",L(()=>{this.updatePreview(),this.saveFormData()},300))}),(e=document.getElementById("exportPdfBtn"))==null||e.addEventListener("click",()=>{const s=document.getElementById("invoicePreview"),l=`invoice-${this.getFormData().invoiceNumber||"INV-001"}`;A(s,l)}),(t=document.getElementById("exportImageBtn"))==null||t.addEventListener("click",()=>{const s=document.getElementById("invoicePreview"),l=`invoice-${this.getFormData().invoiceNumber||"INV-001"}`;k(s,l)}),(n=document.getElementById("printBtn"))==null||n.addEventListener("click",()=>{const s=document.getElementById("invoicePreview");M(s)}),(i=document.getElementById("lightningInvoice"))==null||i.addEventListener("blur",async s=>{await this.validateLightningInvoice(s.target)}),(r=document.getElementById("generateInvoiceNumberBtn"))==null||r.addEventListener("click",()=>{this.generateNewInvoiceNumber()}),(a=document.getElementById("clearFormBtn"))==null||a.addEventListener("click",()=>{this.clearForm()})}getFormData(){var n,i,r,a,s,l;const e=this.getLineItems(),t=e.reduce((p,c)=>p+c.quantity*c.rate,0);return{invoiceNumber:((n=document.getElementById("invoiceNumber"))==null?void 0:n.value)||"INV-001",invoiceDate:((i=document.getElementById("invoiceDate"))==null?void 0:i.value)||"",fromName:((r=document.getElementById("fromName"))==null?void 0:r.value)||"",toName:((a=document.getElementById("toName"))==null?void 0:a.value)||"",lineItems:e,lightningInvoice:((s=document.getElementById("lightningInvoice"))==null?void 0:s.value)||"",notes:((l=document.getElementById("notes"))==null?void 0:l.value)||"",total:t}}getLineItems(){const e=[];return document.querySelectorAll(".line-item").forEach(n=>{var l,p,c;const i=n.getAttribute("data-item-id"),r=((l=document.getElementById(`description-${i}`))==null?void 0:l.value)||"",a=parseInt((p=document.getElementById(`quantity-${i}`))==null?void 0:p.value)||1,s=parseInt((c=document.getElementById(`rate-${i}`))==null?void 0:c.value)||0;r.trim()&&e.push({id:i,description:r,quantity:a,rate:s,amount:a*s})}),e}setFormData(e){e.invoiceNumber&&(document.getElementById("invoiceNumber").value=e.invoiceNumber),e.invoiceDate&&(document.getElementById("invoiceDate").value=e.invoiceDate),e.fromName&&(document.getElementById("fromName").value=e.fromName),e.toName&&(document.getElementById("toName").value=e.toName),e.lightningInvoice&&(document.getElementById("lightningInvoice").value=e.lightningInvoice),e.notes&&(document.getElementById("notes").value=e.notes),e.lineItems&&Array.isArray(e.lineItems)&&this.setLineItems(e.lineItems)}setLineItems(e){const n=document.getElementById("lineItemsContainer").querySelectorAll(".line-item");n.length>0&&(n[0],document.getElementById("description-1").value="",document.getElementById("quantity-1").value="1",document.getElementById("rate-1").value="");for(let i=1;i<n.length;i++)n[i].remove();e.forEach((i,r)=>{r===0?(document.getElementById("description-1").value=i.description,document.getElementById("quantity-1").value=i.quantity,document.getElementById("rate-1").value=i.rate):this.addLineItem(i.description,i.quantity,i.rate)}),this.updatePreview()}updatePreview(){const e=this.getFormData(),t=e.total;document.getElementById("previewInvoiceNumber")&&(document.getElementById("previewInvoiceNumber").textContent=e.invoiceNumber),document.getElementById("previewInvoiceDate")&&(document.getElementById("previewInvoiceDate").textContent=e.invoiceDate||"--"),document.getElementById("previewFromName")&&(document.getElementById("previewFromName").innerHTML=f(e.fromName.replace(/\n/g,"<br>"))),document.getElementById("previewToName")&&(document.getElementById("previewToName").innerHTML=f(e.toName.replace(/\n/g,"<br>"))),this.updatePreviewTable(e.lineItems),document.getElementById("previewTotal")&&(document.getElementById("previewTotal").textContent=I(t));const n=document.getElementById("lightningSection");if(n)if(e.lightningInvoice.trim()){n.style.display="block",document.getElementById("previewLightningInvoice").textContent=e.lightningInvoice,this.updateLightningDetails(e.lightningInvoice);const r=document.getElementById("qrCodeContainer");r&&(r.style.display="block",this.updateQRCode(e.lightningInvoice))}else n.style.display="none";const i=document.getElementById("notesSection");i&&(e.notes.trim()?(i.style.display="block",document.getElementById("previewNotes").innerHTML=f(e.notes.replace(/\n/g,"<br>"))):i.style.display="none")}async validateLightningInvoice(e){const t=N(e.value);if(e.classList.remove("input-error","input-success"),e.value.trim()&&!t)e.classList.add("input-error"),this.showError(e,"Invalid Lightning Network invoice format");else if(e.value.trim()&&t)try{await w(e.value)?(e.classList.add("input-success"),this.removeError(e)):(e.classList.add("input-error"),this.showError(e,"Invalid Lightning Network invoice"))}catch{e.classList.add("input-error"),this.showError(e,"Invalid Lightning Network invoice")}}showError(e,t){this.removeError(e);const n=document.createElement("div");n.className="error-message",n.textContent=t,e.parentNode.appendChild(n)}removeError(e){const t=e.parentNode.querySelector(".error-message");t&&t.remove()}generateNewInvoiceNumber(){const e=b(this.settings.defaultInvoicePrefix);document.getElementById("invoiceNumber").value=e,this.updatePreview(),this.saveFormData(),m("New invoice number generated!","success")}clearForm(){if(confirm("Are you sure you want to clear all form data? This action cannot be undone.")){const e=x();document.getElementById("invoiceNumber").value=b(this.settings.defaultInvoicePrefix),document.getElementById("invoiceDate").value=e.invoiceDate,document.getElementById("fromName").value="",document.getElementById("toName").value="",document.getElementById("description").value="",document.getElementById("quantity").value="1",document.getElementById("rate").value="",document.getElementById("lightningInvoice").value="",document.getElementById("notes").value="",this.updatePreview(),this.saveFormData(),m("Form cleared successfully!","success")}}saveFormData(){if(this.settings.autoSave){const e=this.getFormData();S(e)}}loadSavedData(){const e=C();if(e)this.setFormData(e),m("Previous form data loaded!","success");else{const t=x();document.getElementById("invoiceDate").value=t.invoiceDate,document.getElementById("invoiceNumber").value=b(this.settings.defaultInvoicePrefix)}}setupAutoSave(){this.settings.autoSave&&(this.autoSaveTimer=setInterval(()=>{this.saveFormData()},this.settings.autoSaveInterval))}setupTemplateControls(){const e=document.querySelector(".form-panel");if(e&&!document.querySelector(".template-controls")){const t=this.createTemplateControls();e.insertBefore(t,e.firstChild)}}createTemplateControls(){const e=document.createElement("div");return e.className="template-controls",e.innerHTML=`
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
        `,e}saveCurrentTemplate(){const e=prompt("Enter template name:");if(e&&e.trim()){const t=this.getFormData();P(e.trim(),t),m(`Template "${e}" saved successfully!`,"success")}}loadTemplateDialog(){const e=_();if(e.length===0){m("No saved templates found.","warning");return}const t=e.map(i=>`<option value="${i}">${i}</option>`).join(""),n=document.createElement("div");n.style.cssText=`
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
        `,document.body.appendChild(n)}loadSelectedTemplate(){const t=document.getElementById("templateSelect").value,n=$(t);n&&(this.setFormData(n),this.updatePreview(),this.saveFormData(),m(`Template "${t}" loaded successfully!`,"success")),document.querySelector('div[style*="position: fixed"]').remove()}loadVersion(){try{const e="0.0.2",t=document.getElementById("versionDisplay");t&&(t.textContent=`v${e}`)}catch{console.log("Could not load version, using default")}}updateQRCode(e){const t=document.getElementById("lightningQR");t&&e&&t.setAttribute("lightning",e)}async updateLightningDetails(e){try{const t=await w(e),n=document.getElementById("lightningExpiry");if(t&&n){if(t.timestamp&&t.expiry){const i=new Date((t.timestamp+t.expiry)*1e3);if(i-new Date>0){const s=i.getMonth()+1,l=i.getDate(),p=i.getFullYear(),c=i.getHours(),v=i.getMinutes(),u=c>=12?"PM":"AM",d=c%12||12,g=v.toString().padStart(2,"0"),D=`${s}/${l}/${p} ${d}:${g} ${u}`;n.textContent=`Expires: ${D}`}else n.textContent="Expired"}else n.textContent="Expiration time not available";n.style.display="inline-block"}else n&&(n.style.display="none")}catch(t){console.error("Error updating Lightning details:",t);const n=document.getElementById("lightningExpiry");n&&(n.style.display="none")}}updatePreviewTable(e){const t=document.getElementById("previewItemsTable");if(t&&(t.innerHTML="",e.forEach(n=>{const i=document.createElement("tr");i.innerHTML=`
                <td>${f(n.description)}</td>
                <td>${n.quantity}</td>
                <td>${I(n.rate)}</td>
                <td class="amount">${I(n.amount)}</td>
            `,t.appendChild(i)}),e.length===0)){const n=document.createElement("tr");n.innerHTML=`
                <td>No items</td>
                <td>0</td>
                <td>0</td>
                <td class="amount">0</td>
            `,t.appendChild(n)}}addLineItem(e="",t=1,n=0){const i=document.getElementById("lineItemsContainer"),r=this.getNextItemId(),a=`
            <div class="line-item" data-item-id="${r}">
                <div class="form-group">
                    <label for="description-${r}">Item/Service Description</label>
                    <input type="text" id="description-${r}" placeholder="Bitcoin Consulting Services" class="item-description" value="${e}">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="quantity-${r}">Quantity</label>
                        <input type="number" id="quantity-${r}" placeholder="1" value="${t}" min="1" class="item-quantity">
                    </div>
                    <div class="form-group">
                        <label for="rate-${r}">Rate (per unit in sats)</label>
                        <div class="sats-input">
                            <input type="number" id="rate-${r}" placeholder="100000" min="1" class="item-rate" value="${n}">
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-danger btn-small remove-item" data-item-id="${r}">🗑️</button>
                    </div>
                </div>
            </div>
        `;return i.insertAdjacentHTML("beforeend",a),this.addLineItemEventListeners(r),r}getNextItemId(){const e=document.querySelectorAll(".line-item");let t=0;return e.forEach(n=>{const i=parseInt(n.getAttribute("data-item-id"));i>t&&(t=i)}),t+1}addLineItemEventListeners(e){[document.getElementById(`description-${e}`),document.getElementById(`quantity-${e}`),document.getElementById(`rate-${e}`)].forEach(i=>{i&&i.addEventListener("input",L(()=>{this.updatePreview(),this.saveFormData()},300))});const n=document.querySelector(`[data-item-id="${e}"].remove-item`);n&&n.addEventListener("click",()=>{this.removeLineItem(e)})}removeLineItem(e){const t=document.querySelector(`[data-item-id="${e}"]`);t&&(t.remove(),this.updatePreview(),this.saveFormData())}setupLineItemEventListeners(){document.querySelectorAll(".line-item").forEach(n=>{const i=n.getAttribute("data-item-id");this.addLineItemEventListeners(i)});const t=document.getElementById("addLineItemBtn");t&&t.addEventListener("click",()=>{this.addLineItem()})}}let T;document.addEventListener("DOMContentLoaded",()=>{T=new q,window.app=T});
