import{_ as g}from"./vendor-B0ga06J7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();function h(o){return o.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}function f(o="INV"){const e=Date.now().toString().slice(-6),t=Math.floor(Math.random()*1e3).toString().padStart(3,"0");return`${o}-${e}-${t}`}async function b(o){if(!o||!o.trim())return null;try{const{decodeInvoice:e}=await g(async()=>{const{decodeInvoice:i}=await import("./index.modern-GuuHck_z.js");return{decodeInvoice:i}},[]);return e(o.trim())}catch(e){return console.error("Error decoding Lightning invoice:",e),null}}function T(o){return o?/^lnbc[0-9]+[munp]?[0-9]*[a-z0-9]+$/i.test(o.trim()):!0}function E(){return{invoiceDate:new Date().toISOString().split("T")[0]}}function c(o,e="success"){const t=document.createElement("div");t.className=`notification notification-${e}`,t.textContent=o,Object.assign(t.style,{position:"fixed",top:"20px",right:"20px",padding:"15px 20px",borderRadius:"8px",color:"white",fontWeight:"bold",zIndex:"1000",transform:"translateX(100%)",transition:"transform 0.3s ease",maxWidth:"300px",wordWrap:"break-word"});const i={success:"#ff9900",error:"#ff9900",warning:"#ff9900"};t.style.backgroundColor=i[e]||i.success,document.body.appendChild(t),setTimeout(()=>{t.style.transform="translateX(0)"},100),setTimeout(()=>{t.style.transform="translateX(100%)",setTimeout(()=>{document.body.removeChild(t)},300)},3e3)}function N(o,e){let t;return function(...n){const r=()=>{clearTimeout(t),o(...n)};clearTimeout(t),t=setTimeout(r,e)}}function v(o){const e=document.createElement("div");return e.textContent=o,e.innerHTML}const y={FORM_DATA:"bullish_invoice_form_data",TEMPLATES:"bullish_invoice_templates",SETTINGS:"bullish_invoice_settings"};function C(o){try{localStorage.setItem(y.FORM_DATA,JSON.stringify(o))}catch(e){console.error("Error saving form data:",e)}}function A(){try{const o=localStorage.getItem(y.FORM_DATA);return o?JSON.parse(o):null}catch(o){return console.error("Error loading form data:",o),null}}function q(o,e){try{const t=I();t[o]={...e,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},localStorage.setItem(y.TEMPLATES,JSON.stringify(t))}catch(t){console.error("Error saving template:",t)}}function I(){try{const o=localStorage.getItem(y.TEMPLATES);return o?JSON.parse(o):{}}catch(o){return console.error("Error loading templates:",o),{}}}function k(o){try{return I()[o]||null}catch(e){return console.error("Error loading template:",e),null}}function _(){try{const o=I();return Object.keys(o)}catch(o){return console.error("Error getting template names:",o),[]}}function $(){try{const o=localStorage.getItem(y.SETTINGS);return o?JSON.parse(o):w()}catch(o){return console.error("Error loading settings:",o),w()}}function w(){return{autoSave:!0,autoSaveInterval:5e3,defaultInvoicePrefix:"INV",defaultCurrency:"sats",theme:"dark"}}class L{constructor(){this.isProcessing=!1,this.currentInvoice=null,this.paymentCheckInterval=null,this.qrElement=null}async createInvoice(){try{const{LightningAddress:e}=await g(async()=>{const{LightningAddress:n}=await import("./index.modern-GuuHck_z.js");return{LightningAddress:n}},[]),t=new e("bullish@blitz-wallet.com");await t.fetch();const i=await t.requestInvoice({satoshi:20});return console.log("Invoice created:",{paymentRequest:i.paymentRequest,paymentHash:i.paymentHash,satoshi:i.satoshi}),i}catch(e){throw console.error("Error creating invoice:",e),new Error("Failed to create Lightning invoice")}}createModalOverlay(){const e=document.createElement("div");return e.id="payment-overlay",e.style.cssText=`
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 9998;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: Arial, sans-serif;
        `,e.innerHTML=`
            <div style="text-align: center; padding: 20px; background: rgba(0, 0, 0, 0.9); border-radius: 12px; max-width: 500px;">
                <div style="font-size: 32px; margin-bottom: 15px;">⚡</div>
                <div style="font-size: 20px; margin-bottom: 10px; font-weight: bold;">Lightning Payment</div>
                <div style="font-size: 16px; margin-bottom: 20px; opacity: 0.8;">Scan QR code to pay 21 sats</div>
                <div id="qr-container" style="display: flex; justify-content: center; margin-bottom: 20px;"></div>
                <div style="font-size: 14px; opacity: 0.7;">Payment will be verified automatically</div>
                <button id="close-payment-modal" style="
                    margin-top: 15px;
                    padding: 8px 16px;
                    background: #ff9900;
                    color: #000;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: bold;
                ">Close</button>
            </div>
        `,document.body.appendChild(e),e.querySelector("#close-payment-modal").addEventListener("click",()=>{this.cancelPayment()}),e}removeModalOverlay(){const e=document.getElementById("payment-overlay");e&&e.remove()}async displayInvoice(e,t){try{const i=document.querySelector("#qr-container");if(!i)throw new Error("QR container not found");const n=document.createElement("bitcoin-qr");n.setAttribute("width","400"),n.setAttribute("height","400"),n.setAttribute("lightning",e.paymentRequest),n.setAttribute("is-polling","true"),n.setAttribute("poll-interval","3000"),n.setAttribute("type","svg"),n.setAttribute("corners-square-color","#ff9900"),n.setAttribute("corners-dot-color","#ff9900"),n.setAttribute("corners-square-type","square"),n.setAttribute("dots-type","square"),n.setAttribute("dots-color","#ff9900"),n.setAttribute("debug","true"),n.callback=async()=>{await this.checkPaymentStatus(e,t)},i.appendChild(n),this.qrElement=n,console.log("QR code displayed for invoice:",e.paymentRequest)}catch(i){throw console.error("Error displaying invoice with bitcoin-qr:",i),new Error("Failed to display invoice")}}async checkPaymentStatus(e,t){try{await e.verifyPayment()&&e.preimage&&(console.log("Payment verified successfully!"),console.log(`Preimage: ${e.preimage}`),this.qrElement&&this.qrElement.setAttribute("is-polling","false"),t(!0))}catch(i){console.error("Error checking payment status:",i)}}cancelPayment(){this.qrElement&&this.qrElement.setAttribute("is-polling","false"),this.paymentCheckInterval&&(clearInterval(this.paymentCheckInterval),this.paymentCheckInterval=null),this.isProcessing=!1,this.currentInvoice=null,this.removeModalOverlay(),c("Payment cancelled.","info")}async handleExportPayment(e,t){if(this.isProcessing){c("Payment already in progress. Please wait.","warning");return}this.isProcessing=!0,this.createModalOverlay();try{c("Creating Lightning invoice...","info");const i=await this.createInvoice();this.currentInvoice=i,console.log("Created invoice:",{paymentRequest:i.paymentRequest,paymentHash:i.paymentHash,satoshi:i.satoshi}),c("Invoice created! Please scan QR code to pay.","success"),await this.displayInvoice(i,async n=>{var r;if(n){c("Payment received! Processing export...","success"),console.log("Payment verified successfully!");const s=(r=this.currentInvoice)==null?void 0:r.preimage;s&&console.log(`Preimage: ${s}`),setTimeout(async()=>{try{await e(...t),c("Export completed successfully!","success")}catch(m){console.error("Error during export:",m),c("Error during export. Please try again.","error")}},3e3)}else c("Payment cancelled.","info");this.isProcessing=!1,this.currentInvoice=null,this.removeModalOverlay()})}catch(i){console.error("Error in payment flow:",i),c("Error processing payment. Please try again.","error"),this.isProcessing=!1,this.currentInvoice=null,this.removeModalOverlay()}}}const B=new L;async function F(o,e){await B.handleExportPayment(M,[o,e])}async function M(o,e){try{const t=(await g(async()=>{const{default:r}=await import("./vendor-B0ga06J7.js").then(s=>s.h);return{default:r}},[])).default,i=await t(o,{backgroundColor:"#ffffff",scale:2,useCORS:!0,allowTaint:!1,logging:!1,scrollX:0,scrollY:0}),n=document.createElement("a");n.download=`${e}.png`,n.href=i.toDataURL("image/png"),document.body.appendChild(n),n.click(),document.body.removeChild(n),c("Image exported successfully!","success")}catch(t){console.error("Error exporting image:",t),c("Error exporting image. Please try again.","error")}}async function O(o,e){await B.handleExportPayment(R,[o,e])}async function R(o,e){try{const t=(await g(async()=>{const{default:u}=await import("./vendor-B0ga06J7.js").then(p=>p.h);return{default:u}},[])).default,{jsPDF:i}=await g(async()=>{const{jsPDF:u}=await import("./vendor-B0ga06J7.js").then(p=>p.j);return{jsPDF:u}},[]),n=await t(o,{backgroundColor:"#ffffff",scale:2,useCORS:!0,allowTaint:!1,logging:!1,scrollX:0,scrollY:0}),r=new i("p","mm","a4"),s=n.toDataURL("image/png"),m=210,d=295,a=m,l=n.height*a/n.width;if(l<=d){const u=(d-l)/2;r.addImage(s,"PNG",0,u,a,l)}else{let u=l,p=0;for(r.addImage(s,"PNG",0,p,a,l),u-=d;u>=0;)p=u-l,r.addPage(),r.addImage(s,"PNG",0,p,a,l),u-=d}r.save(`${e}.pdf`),c("PDF exported successfully!","success")}catch(t){console.error("Error exporting PDF:",t),c("Error exporting PDF. Please try again.","error")}}function H(o){try{const e=document.body.style.display,t=document.body.style.visibility;document.body.style.display="block",document.body.style.visibility="hidden",o.style.visibility="visible",o.style.position="absolute",o.style.left="0",o.style.top="0",o.style.width="8.5in",o.style.height="11in",o.style.margin="0",o.style.padding="0.5in",o.style.backgroundColor="white",o.style.color="black",o.style.fontFamily="Arial, sans-serif",o.style.boxShadow="none",o.style.border="none",o.style.overflow="visible",o.style.zIndex="9999";const i=document.createElement("style");i.textContent=`
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
        `,document.head.appendChild(i),window.print(),setTimeout(()=>{document.body.style.display=e,document.body.style.visibility=t,o.style.visibility="",o.style.position="",o.style.left="",o.style.top="",o.style.width="",o.style.height="",o.style.margin="",o.style.padding="",o.style.backgroundColor="",o.style.color="",o.style.fontFamily="",o.style.boxShadow="",o.style.border="",o.style.overflow="",o.style.zIndex="",document.head.removeChild(i)},1e3),c("Print dialog opened!","success")}catch(e){console.error("Error printing invoice:",e),c("Error printing invoice. Please try again.","error")}}class z{constructor(){this.settings=$(),this.autoSaveTimer=null,this.lightningPayment=new L,this.init(),this.loadVersion()}init(){this.setupEventListeners(),this.setupLineItemEventListeners(),this.loadSavedData(),this.setupAutoSave(),this.updatePreview(),this.setupTemplateControls()}setupEventListeners(){document.querySelectorAll("input, textarea").forEach(a=>{a.addEventListener("input",()=>{this.updatePreview(),this.saveFormData()})});const t=document.getElementById("lightningInvoice");t&&t.addEventListener("input",async a=>{await this.validateLightningInvoice(a.target)&&this.updateQRCode(a.target.value)});const i=document.getElementById("exportPdfBtn"),n=document.getElementById("exportImageBtn"),r=document.getElementById("printBtn");i&&i.addEventListener("click",()=>{const a=document.getElementById("invoicePreview");a&&O(a,"invoice")}),n&&n.addEventListener("click",()=>{const a=document.getElementById("invoicePreview");a&&F(a,"invoice")}),r&&r.addEventListener("click",()=>{const a=document.getElementById("invoicePreview");a&&H(a)}),this.updateQRCodeSize(),window.addEventListener("resize",()=>this.updateQRCodeSize());const s=document.getElementById("lightningInvoice");s&&s.addEventListener("blur",async a=>{await this.validateLightningInvoice(a.target)});const m=document.getElementById("generateInvoiceNumberBtn");m&&m.addEventListener("click",()=>{this.generateNewInvoiceNumber()});const d=document.getElementById("clearFormBtn");d&&d.addEventListener("click",()=>{this.clearForm()})}getFormData(){var i,n,r,s,m,d;const e=this.getLineItems(),t=e.reduce((a,l)=>a+l.quantity*l.rate,0);return{invoiceNumber:((i=document.getElementById("invoiceNumber"))==null?void 0:i.value)||"INV-001",invoiceDate:((n=document.getElementById("invoiceDate"))==null?void 0:n.value)||"",fromName:((r=document.getElementById("fromName"))==null?void 0:r.value)||"",toName:((s=document.getElementById("toName"))==null?void 0:s.value)||"",lineItems:e,lightningInvoice:((m=document.getElementById("lightningInvoice"))==null?void 0:m.value)||"",notes:((d=document.getElementById("notes"))==null?void 0:d.value)||"",total:t}}getLineItems(){const e=[];return document.querySelectorAll(".line-item").forEach(i=>{var d,a,l;const n=i.getAttribute("data-item-id"),r=((d=document.getElementById(`description-${n}`))==null?void 0:d.value)||"",s=parseInt((a=document.getElementById(`quantity-${n}`))==null?void 0:a.value)||1,m=parseInt((l=document.getElementById(`rate-${n}`))==null?void 0:l.value)||0;r.trim()&&e.push({id:n,description:r,quantity:s,rate:m,amount:s*m})}),e}setFormData(e){e.invoiceNumber&&(document.getElementById("invoiceNumber").value=e.invoiceNumber),e.invoiceDate&&(document.getElementById("invoiceDate").value=e.invoiceDate),e.fromName&&(document.getElementById("fromName").value=e.fromName),e.toName&&(document.getElementById("toName").value=e.toName),e.lightningInvoice&&(document.getElementById("lightningInvoice").value=e.lightningInvoice),e.notes&&(document.getElementById("notes").value=e.notes),e.lineItems&&Array.isArray(e.lineItems)&&this.setLineItems(e.lineItems)}setLineItems(e){const i=document.getElementById("lineItemsContainer").querySelectorAll(".line-item");i.length>0&&(i[0],document.getElementById("description-1").value="",document.getElementById("quantity-1").value="1",document.getElementById("rate-1").value="");for(let n=1;n<i.length;n++)i[n].remove();e.forEach((n,r)=>{r===0?(document.getElementById("description-1").value=n.description,document.getElementById("quantity-1").value=n.quantity,document.getElementById("rate-1").value=n.rate):this.addLineItem(n.description,n.quantity,n.rate)}),this.updatePreview()}updatePreview(){const e=this.getFormData(),t=e.total;document.getElementById("previewInvoiceNumber")&&(document.getElementById("previewInvoiceNumber").textContent=e.invoiceNumber),document.getElementById("previewInvoiceDate")&&(document.getElementById("previewInvoiceDate").textContent=e.invoiceDate||"--"),document.getElementById("previewFromName")&&(document.getElementById("previewFromName").innerHTML=v(e.fromName.replace(/\n/g,"<br>"))),document.getElementById("previewToName")&&(document.getElementById("previewToName").innerHTML=v(e.toName.replace(/\n/g,"<br>"))),this.updatePreviewTable(e.lineItems),document.getElementById("previewTotal")&&(document.getElementById("previewTotal").textContent=h(t));const i=document.getElementById("lightningSection");if(i)if(e.lightningInvoice.trim()){i.style.display="block",this.updateLightningDetails(e.lightningInvoice);const r=document.getElementById("qrCodeContainer");r&&(r.style.display="block",this.updateQRCode(e.lightningInvoice))}else i.style.display="none";const n=document.getElementById("notesSection");n&&(e.notes.trim()?(n.style.display="block",document.getElementById("previewNotes").innerHTML=v(e.notes.replace(/\n/g,"<br>"))):n.style.display="none")}async validateLightningInvoice(e){const t=T(e.value);if(e.classList.remove("input-error","input-success"),e.value.trim()&&!t)e.classList.add("input-error"),this.showError(e,"Invalid Lightning Network invoice format");else if(e.value.trim()&&t)try{await b(e.value)?(e.classList.add("input-success"),this.removeError(e)):(e.classList.add("input-error"),this.showError(e,"Invalid Lightning Network invoice"))}catch{e.classList.add("input-error"),this.showError(e,"Invalid Lightning Network invoice")}return t}showError(e,t){this.removeError(e);const i=document.createElement("div");i.className="error-message",i.textContent=t,e.parentNode.appendChild(i)}removeError(e){const t=e.parentNode.querySelector(".error-message");t&&t.remove()}generateNewInvoiceNumber(){const e=f(this.settings.defaultInvoicePrefix);document.getElementById("invoiceNumber").value=e,this.updatePreview(),this.saveFormData(),c("New invoice number generated!","success")}clearForm(){if(confirm("Are you sure you want to clear all form data? This action cannot be undone.")){const e=E();document.getElementById("invoiceNumber").value=f(this.settings.defaultInvoicePrefix),document.getElementById("invoiceDate").value=e.invoiceDate,document.getElementById("fromName").value="",document.getElementById("toName").value="",document.getElementById("description").value="",document.getElementById("quantity").value="1",document.getElementById("rate").value="",document.getElementById("lightningInvoice").value="",document.getElementById("notes").value="",this.updatePreview(),this.saveFormData(),c("Form cleared successfully!","success")}}saveFormData(){if(this.settings.autoSave){const e=this.getFormData();C(e)}}loadSavedData(){const e=A();if(e)this.setFormData(e),c("Previous form data loaded!","success");else{const t=E();document.getElementById("invoiceDate").value=t.invoiceDate,document.getElementById("invoiceNumber").value=f(this.settings.defaultInvoicePrefix)}}setupAutoSave(){this.settings.autoSave&&(this.autoSaveTimer=setInterval(()=>{this.saveFormData()},this.settings.autoSaveInterval))}setupTemplateControls(){const e=document.querySelector(".form-panel");if(e&&!document.querySelector(".template-controls")){const t=this.createTemplateControls();e.insertBefore(t,e.firstChild)}}createTemplateControls(){const e=document.createElement("div");return e.className="template-controls",e.innerHTML=`
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
        `,e}saveCurrentTemplate(){const e=prompt("Enter template name:");if(e&&e.trim()){const t=this.getFormData();q(e.trim(),t),c(`Template "${e}" saved successfully!`,"success")}}loadTemplateDialog(){const e=_();if(e.length===0){c("No saved templates found.","warning");return}const t=e.map(n=>`<option value="${n}">${n}</option>`).join(""),i=document.createElement("div");i.style.cssText=`
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
        `,i.innerHTML=`
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
        `,document.body.appendChild(i)}loadSelectedTemplate(){const t=document.getElementById("templateSelect").value,i=k(t);i&&(this.setFormData(i),this.updatePreview(),this.saveFormData(),c(`Template "${t}" loaded successfully!`,"success")),document.querySelector('div[style*="position: fixed"]').remove()}loadVersion(){try{const e="0.0.9",t=document.getElementById("versionDisplay");t&&(t.textContent=`v${e}`)}catch{console.log("Could not load version, using default")}}updateQRCodeSize(){const e=document.getElementById("lightningQR");if(!e)return;const t=Math.min(Math.floor(window.innerWidth/3),300),i=Math.round(t/100)*100;e.setAttribute("width",i),e.setAttribute("height",i)}updateQRCode(e){const t=document.getElementById("lightningQR");t&&e&&(t.setAttribute("lightning",e),this.updateQRCodeSize())}async updateLightningDetails(e){try{const t=await b(e),i=document.getElementById("lightningExpiry");if(t&&i){if(t.timestamp&&t.expiry){const n=new Date((t.timestamp+t.expiry)*1e3);if(n-new Date>0){const m=n.getMonth()+1,d=n.getDate(),a=n.getFullYear(),l=n.getHours(),u=n.getMinutes(),p=l>=12?"PM":"AM",P=l%12||12,S=u.toString().padStart(2,"0"),D=`${m}/${d}/${a} ${P}:${S} ${p}`;i.textContent=`Expires: ${D}`}else i.textContent="Expired"}else i.textContent="Expiration time not available";i.style.display="inline-block"}else i&&(i.style.display="none")}catch(t){console.error("Error updating Lightning details:",t);const i=document.getElementById("lightningExpiry");i&&(i.style.display="none")}}updatePreviewTable(e){const t=document.getElementById("previewItemsTable");if(t&&(t.innerHTML="",e.forEach(i=>{const n=document.createElement("tr");n.innerHTML=`
                <td>${v(i.description)}</td>
                <td>${i.quantity}</td>
                <td>${h(i.rate)}</td>
                <td class="amount">${h(i.amount)}</td>
            `,t.appendChild(n)}),e.length===0)){const i=document.createElement("tr");i.innerHTML=`
                <td>No items</td>
                <td>0</td>
                <td>0</td>
                <td class="amount">0</td>
            `,t.appendChild(i)}}addLineItem(e="",t=1,i=0){const n=this.getNextItemId(),r=`
            <div class="line-item" data-item-id="${n}">
                <div class="form-group">
                    <label for="description-${n}">Item/Service Description</label>
                    <input type="text" id="description-${n}" placeholder="Bitcoin Consulting Services" class="item-description" value="${e}">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="quantity-${n}">Quantity</label>
                        <input type="number" id="quantity-${n}" placeholder="1" value="${t}" min="1" class="item-quantity">
                    </div>
                    <div class="form-group">
                        <label for="rate-${n}">Price</label>
                        <div class="sats-input">
                            <input type="number" id="rate-${n}" placeholder="100000" min="1" class="item-rate" value="${i}">
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-danger remove-item" data-item-id="${n}">X</button>
            </div>
        `;document.getElementById("lineItemsContainer").insertAdjacentHTML("beforeend",r),this.addLineItemEventListeners(n)}getNextItemId(){const e=document.querySelectorAll(".line-item");let t=0;return e.forEach(i=>{const n=parseInt(i.getAttribute("data-item-id"));n>t&&(t=n)}),t+1}addLineItemEventListeners(e){[document.getElementById(`description-${e}`),document.getElementById(`quantity-${e}`),document.getElementById(`rate-${e}`)].forEach(n=>{n&&n.addEventListener("input",N(()=>{this.updatePreview(),this.saveFormData()},300))});const i=document.querySelector(`[data-item-id="${e}"].remove-item`);i&&i.addEventListener("click",()=>{this.removeLineItem(e)})}removeLineItem(e){const t=document.querySelector(`[data-item-id="${e}"]`);t&&(t.remove(),this.updatePreview(),this.saveFormData())}setupLineItemEventListeners(){document.querySelectorAll(".line-item").forEach(i=>{const n=i.getAttribute("data-item-id");this.addLineItemEventListeners(n)});const t=document.getElementById("addLineItemBtn");t&&t.addEventListener("click",()=>{this.addLineItem()})}}let x;document.addEventListener("DOMContentLoaded",()=>{x=new z,window.app=x});
