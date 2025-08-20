import{_ as g}from"./vendor-B0ga06J7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();function f(r){return r.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}function h(r="INV"){const e=Date.now().toString().slice(-6),n=Math.floor(Math.random()*1e3).toString().padStart(3,"0");return`${r}-${e}-${n}`}function I(){return{invoiceDate:new Date().toISOString().split("T")[0]}}function c(r,e="success"){const n=document.createElement("div");n.className=`notification notification-${e}`,n.textContent=r,Object.assign(n.style,{position:"fixed",top:"20px",right:"20px",padding:"15px 20px",borderRadius:"8px",color:"white",fontWeight:"bold",zIndex:"1000",transform:"translateX(100%)",transition:"transform 0.3s ease",maxWidth:"300px",wordWrap:"break-word"});const i={success:"#ff9900",error:"#ff9900",warning:"#ff9900"};n.style.backgroundColor=i[e]||i.success,document.body.appendChild(n),setTimeout(()=>{n.style.transform="translateX(0)"},100),setTimeout(()=>{n.style.transform="translateX(100%)",setTimeout(()=>{document.body.removeChild(n)},300)},3e3)}function b(r,e){let n;return function(...t){const o=()=>{clearTimeout(n),r(...t)};clearTimeout(n),n=setTimeout(o,e)}}function v(r){const e=document.createElement("div");return e.textContent=r,e.innerHTML}const y={FORM_DATA:"bullish_invoice_form_data",TEMPLATES:"bullish_invoice_templates",SETTINGS:"bullish_invoice_settings"};function D(r){try{localStorage.setItem(y.FORM_DATA,JSON.stringify(r))}catch(e){console.error("Error saving form data:",e)}}function C(){try{const r=localStorage.getItem(y.FORM_DATA);return r?JSON.parse(r):null}catch(r){return console.error("Error loading form data:",r),null}}function N(r,e){try{const n=E();n[r]={...e,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},localStorage.setItem(y.TEMPLATES,JSON.stringify(n))}catch(n){console.error("Error saving template:",n)}}function E(){try{const r=localStorage.getItem(y.TEMPLATES);return r?JSON.parse(r):{}}catch(r){return console.error("Error loading templates:",r),{}}}function q(r){try{return E()[r]||null}catch(e){return console.error("Error loading template:",e),null}}function _(){try{const r=E();return Object.keys(r)}catch(r){return console.error("Error getting template names:",r),[]}}function M(){try{const r=localStorage.getItem(y.SETTINGS);return r?JSON.parse(r):x()}catch(r){return console.error("Error loading settings:",r),x()}}function x(){return{autoSave:!0,autoSaveInterval:5e3,defaultInvoicePrefix:"INV",defaultCurrency:"sats",theme:"dark"}}class L{constructor(){this.isProcessing=!1,this.currentInvoice=null,this.qrElement=null,this.paymentCompleted=!1}async createInvoice(){try{const{LightningAddress:e}=await g(async()=>{const{LightningAddress:t}=await import("./index.modern-GuuHck_z.js");return{LightningAddress:t}},[]),n=new e("bullish@blitz-wallet.com");await n.fetch();const i=await n.requestInvoice({satoshi:21,description:"Export payment for bullishInvoice",expiry:86400});return console.log("Invoice created:",{paymentRequest:i.paymentRequest,paymentHash:i.paymentHash,satoshi:i.satoshi}),i}catch(e){throw console.error("Error creating invoice:",e),new Error("Failed to create Lightning invoice")}}async displayInvoice(e,n){try{const i=document.querySelector("#qr-container");if(!i)throw new Error("QR container not found");const t=document.createElement("bitcoin-qr");t.setAttribute("width","400"),t.setAttribute("height","400"),t.setAttribute("lightning",e.paymentRequest),t.setAttribute("is-polling","true"),t.setAttribute("poll-interval","3000"),t.setAttribute("type","svg"),t.setAttribute("corners-square-color","#ff9900"),t.setAttribute("corners-dot-color","#ff9900"),t.setAttribute("corners-square-type","square"),t.setAttribute("dots-type","square"),t.setAttribute("dots-color","#ff9900"),t.callback=async()=>{await this.checkPaymentStatus(e,n)},i.appendChild(t),this.qrElement=t,console.log("QR code displayed for invoice:",e.paymentRequest)}catch(i){throw console.error("Error displaying invoice with bitcoin-qr:",i),new Error("Failed to display invoice")}}createModalOverlay(){const e=document.createElement("div");return e.id="payment-overlay",e.style.cssText=`
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
                <div id="payment-status" style="font-size: 16px; margin-bottom: 10px; color: #ff9900; font-weight: bold;">Waiting for payment...</div>
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
        `,document.body.appendChild(e),e.querySelector("#close-payment-modal").addEventListener("click",()=>{this.cancelPayment()}),e}removeModalOverlay(){const e=document.getElementById("payment-overlay");e&&e.remove()}createExportProcessingModal(){this.removeModalOverlay();const e=document.createElement("div");e.id="export-processing-overlay",e.style.cssText=`
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
            <div style="text-align: center; padding: 30px; background: rgba(0, 0, 0, 0.9); border-radius: 12px; max-width: 400px;">
                <div style="margin-bottom: 20px;">
                    <div class="loading-spinner" style="
                        width: 60px;
                        height: 60px;
                        border: 4px solid rgba(255, 153, 0, 0.3);
                        border-top: 4px solid #ff9900;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 20px;
                    "></div>
                </div>
                <div style="font-size: 20px; margin-bottom: 10px; font-weight: bold;">Processing Export</div>
                <div style="font-size: 16px; margin-bottom: 15px; opacity: 0.8;">Creating your file...</div>
                <div id="export-status" style="font-size: 14px; color: #ff9900; font-weight: bold;">Please wait while we generate your file</div>
            </div>
        `;const n=document.createElement("style");return n.textContent=`
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `,document.head.appendChild(n),document.body.appendChild(e),e}removeExportProcessingModal(){const e=document.getElementById("export-processing-overlay");e&&e.remove()}async checkPaymentStatus(e,n){if(!this.paymentCompleted)try{if(await e.verifyPayment()&&e.preimage){console.log("Payment verified successfully!"),console.log(`Preimage: ${e.preimage}`),this.paymentCompleted=!0,this.qrElement&&this.qrElement.setAttribute("is-polling","false");const t=document.getElementById("payment-status");t&&(t.textContent="✅ Payment received! Processing export...",t.style.color="#10b981"),this.createExportProcessingModal(),n(!0)}}catch(i){console.error("Error checking payment status:",i)}}cancelPayment(){this.qrElement&&(this.qrElement.remove(),this.qrElement=null),this.isProcessing=!1,this.currentInvoice=null,this.paymentCompleted=!1,this.removeModalOverlay(),c("Payment cancelled.","info")}async handleExportPayment(e,n){if(this.isProcessing){c("Payment already in progress. Please wait.","warning");return}this.isProcessing=!0,this.paymentCompleted=!1,this.createModalOverlay();try{c("Creating Lightning invoice...","info");const i=await this.createInvoice();this.currentInvoice=i,console.log("Created invoice:",{paymentRequest:i.paymentRequest,paymentHash:i.paymentHash,satoshi:i.satoshi}),c("Invoice created! Please scan QR code to pay.","success"),await this.displayInvoice(i,async t=>{var o;if(t){c("Payment received! Processing export...","success"),console.log("Payment verified successfully!");const l=(o=this.currentInvoice)==null?void 0:o.preimage;l&&console.log(`Preimage: ${l}`);try{await e(...n);const d=document.getElementById("export-status");d&&(d.textContent="Export completed successfully!",d.style.color="#10b981");const s=document.getElementById("export-processing-overlay");if(s){const a=s.querySelector("div > div");a&&(a.innerHTML=`
                                    <div style="margin-bottom: 20px;">
                                        <div style="
                                            width: 60px;
                                            height: 60px;
                                            border: 4px solid #10b981;
                                            border-radius: 50%;
                                            margin: 0 auto 20px;
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            font-size: 24px;
                                            color: #10b981;
                                        ">✓</div>
                                    </div>
                                    <div style="font-size: 20px; margin-bottom: 10px; font-weight: bold;">Export Complete</div>
                                    <div style="font-size: 16px; margin-bottom: 15px; opacity: 0.8;">Your file has been downloaded</div>
                                    <div id="export-status" style="font-size: 14px; color: #10b981; font-weight: bold;">Export completed successfully!</div>
                                `)}c("Export completed successfully!","success"),setTimeout(()=>{this.isProcessing=!1,this.currentInvoice=null,this.paymentCompleted=!1,this.removeExportProcessingModal()},2e3)}catch(d){console.error("Error during export:",d);const s=document.getElementById("export-status");s&&(s.textContent="Export failed",s.style.color="#ef4444");const a=document.getElementById("export-processing-overlay");if(a){const m=a.querySelector("div > div");m&&(m.innerHTML=`
                                    <div style="margin-bottom: 20px;">
                                        <div style="
                                            width: 60px;
                                            height: 60px;
                                            border: 4px solid #ef4444;
                                            border-radius: 50%;
                                            margin: 0 auto 20px;
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            font-size: 24px;
                                            color: #ef4444;
                                        ">✗</div>
                                    </div>
                                    <div style="font-size: 20px; margin-bottom: 10px; font-weight: bold;">Export Failed</div>
                                    <div style="font-size: 16px; margin-bottom: 15px; opacity: 0.8;">Something went wrong</div>
                                    <div id="export-status" style="font-size: 14px; color: #ef4444; font-weight: bold;">Export failed</div>
                                `)}c("Error during export. Please try again.","error"),setTimeout(()=>{this.isProcessing=!1,this.currentInvoice=null,this.paymentCompleted=!1,this.removeExportProcessingModal()},3e3)}}else c("Payment cancelled.","info"),this.isProcessing=!1,this.currentInvoice=null,this.paymentCompleted=!1,this.removeModalOverlay()})}catch(i){console.error("Error in payment flow:",i),c("Error processing payment. Please try again.","error"),this.isProcessing=!1,this.currentInvoice=null,this.paymentCompleted=!1,this.removeModalOverlay(),this.removeExportProcessingModal()}}}const B=new L;async function F(r,e){await B.handleExportPayment($,[r,e])}async function $(r,e){try{const n=(await g(async()=>{const{default:o}=await import("./vendor-B0ga06J7.js").then(l=>l.h);return{default:o}},[])).default,i=await n(r,{backgroundColor:"#ffffff",scale:2,useCORS:!0,allowTaint:!1,logging:!1,scrollX:0,scrollY:0}),t=document.createElement("a");t.download=`${e}.png`,t.href=i.toDataURL("image/png"),document.body.appendChild(t),t.click(),document.body.removeChild(t),c("Image exported successfully!","success")}catch(n){console.error("Error exporting image:",n),c("Error exporting image. Please try again.","error")}}async function R(r,e){await B.handleExportPayment(k,[r,e])}async function k(r,e){try{const n=(await g(async()=>{const{default:u}=await import("./vendor-B0ga06J7.js").then(p=>p.h);return{default:u}},[])).default,{jsPDF:i}=await g(async()=>{const{jsPDF:u}=await import("./vendor-B0ga06J7.js").then(p=>p.j);return{jsPDF:u}},[]),t=await n(r,{backgroundColor:"#ffffff",scale:2,useCORS:!0,allowTaint:!1,logging:!1,scrollX:0,scrollY:0}),o=new i("p","mm","a4"),l=t.toDataURL("image/png"),d=210,s=295,a=d,m=t.height*a/t.width;if(m<=s){const u=(s-m)/2;o.addImage(l,"PNG",0,u,a,m)}else{let u=m,p=0;for(o.addImage(l,"PNG",0,p,a,m),u-=s;u>=0;)p=u-m,o.addPage(),o.addImage(l,"PNG",0,p,a,m),u-=s}o.save(`${e}.pdf`),c("PDF exported successfully!","success")}catch(n){console.error("Error exporting PDF:",n),c("Error exporting PDF. Please try again.","error")}}class O{constructor(){this.settings=M(),this.autoSaveTimer=null,this.lightningPayment=new L,this.currentLightningInvoice="",this.init(),this.loadVersion()}init(){this.setupEventListeners(),this.setupLineItemEventListeners(),this.loadSavedData(),this.setupAutoSave(),this.updatePreview(),this.setupTemplateControls()}setupEventListeners(){document.querySelectorAll("input, textarea").forEach(a=>{a.addEventListener("input",()=>{this.updatePreview(),this.saveFormData()})});const n=document.getElementById("lightningAddress");n&&n.addEventListener("input",b(async a=>{await this.validateLightningAddress(a.target)},500));const i=document.getElementById("generateQRBtn");i&&i.addEventListener("click",async()=>{await this.generateInvoiceFromAddress()});const t=document.getElementById("exportPdfBtn"),o=document.getElementById("exportImageBtn");t&&t.addEventListener("click",()=>{const a=document.getElementById("invoicePreview");a&&R(a,"invoice")}),o&&o.addEventListener("click",()=>{const a=document.getElementById("invoicePreview");a&&F(a,"invoice")}),this.updateQRCodeSize(),window.addEventListener("resize",()=>this.updateQRCodeSize());const l=document.getElementById("lightningAddress");l&&l.addEventListener("blur",async a=>{await this.validateLightningAddress(a.target)});const d=document.getElementById("generateInvoiceNumberBtn");d&&d.addEventListener("click",()=>{this.generateNewInvoiceNumber()});const s=document.getElementById("clearFormBtn");s&&s.addEventListener("click",()=>{this.clearForm()})}getFormData(){var i,t,o,l,d,s;const e=this.getLineItems(),n=e.reduce((a,m)=>a+m.quantity*m.rate,0);return{invoiceNumber:((i=document.getElementById("invoiceNumber"))==null?void 0:i.value)||"INV-001",invoiceDate:((t=document.getElementById("invoiceDate"))==null?void 0:t.value)||"",fromName:((o=document.getElementById("fromName"))==null?void 0:o.value)||"",toName:((l=document.getElementById("toName"))==null?void 0:l.value)||"",lineItems:e,lightningAddress:((d=document.getElementById("lightningAddress"))==null?void 0:d.value)||"",lightningInvoice:this.currentLightningInvoice||"",notes:((s=document.getElementById("notes"))==null?void 0:s.value)||"",total:n}}getLineItems(){const e=[];return document.querySelectorAll(".line-item").forEach(i=>{var s,a,m;const t=i.getAttribute("data-item-id"),o=((s=document.getElementById(`description-${t}`))==null?void 0:s.value)||"",l=parseInt((a=document.getElementById(`quantity-${t}`))==null?void 0:a.value)||1,d=parseInt((m=document.getElementById(`rate-${t}`))==null?void 0:m.value)||0;o.trim()&&e.push({id:t,description:o,quantity:l,rate:d,amount:l*d})}),e}setFormData(e){e.invoiceNumber&&(document.getElementById("invoiceNumber").value=e.invoiceNumber),e.invoiceDate&&(document.getElementById("invoiceDate").value=e.invoiceDate),e.fromName&&(document.getElementById("fromName").value=e.fromName),e.toName&&(document.getElementById("toName").value=e.toName),e.lightningAddress&&(document.getElementById("lightningAddress").value=e.lightningAddress),e.lightningInvoice&&(this.currentLightningInvoice=e.lightningInvoice),e.notes&&(document.getElementById("notes").value=e.notes),e.lineItems&&Array.isArray(e.lineItems)&&this.setLineItems(e.lineItems)}setLineItems(e){const i=document.getElementById("lineItemsContainer").querySelectorAll(".line-item");i.length>0&&(document.getElementById("description-1").value="",document.getElementById("quantity-1").value="1",document.getElementById("rate-1").value="");for(let t=1;t<i.length;t++)i[t].remove();e.forEach((t,o)=>{o===0?(document.getElementById("description-1").value=t.description,document.getElementById("quantity-1").value=t.quantity,document.getElementById("rate-1").value=t.rate):this.addLineItem(t.description,t.quantity,t.rate)}),this.updatePreview()}updatePreview(){const e=this.getFormData(),n=e.total;document.getElementById("previewInvoiceNumber")&&(document.getElementById("previewInvoiceNumber").textContent=e.invoiceNumber),document.getElementById("previewInvoiceDate")&&(document.getElementById("previewInvoiceDate").textContent=e.invoiceDate||"--"),document.getElementById("previewFromName")&&(document.getElementById("previewFromName").innerHTML=v(e.fromName.replace(/\n/g,"<br>"))),document.getElementById("previewToName")&&(document.getElementById("previewToName").innerHTML=v(e.toName.replace(/\n/g,"<br>"))),this.updatePreviewTable(e.lineItems),document.getElementById("previewTotal")&&(document.getElementById("previewTotal").textContent=f(n));const i=document.getElementById("lightningSection");if(i)if(e.lightningInvoice&&e.lightningInvoice.trim()){i.style.display="block",this.updateLightningDetails(e.lightningInvoice);const o=document.getElementById("qrCodeContainer");o&&(o.style.display="block",this.updateQRCode(e.lightningInvoice))}else i.style.display="none";const t=document.getElementById("notesSection");t&&(e.notes.trim()?(t.style.display="block",document.getElementById("previewNotes").innerHTML=v(e.notes.replace(/\n/g,"<br>"))):t.style.display="none")}async validateLightningAddress(e){const n=e.value.trim();if(e.classList.remove("input-error","input-success"),!n||n.length<3)return this.removeError(e),!1;const t=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(n);return t?(e.classList.add("input-success"),this.removeError(e)):n.includes("@")&&n.includes(".")&&(e.classList.add("input-error"),this.showError(e,"Invalid Lightning Address format (e.g., hello@getalby.com)")),t}async generateInvoiceFromAddress(){var o;const e=document.getElementById("lightningAddress"),n=e.value.trim();if(!n){c("Please enter a Lightning Address first","warning");return}if(!await this.validateLightningAddress(e)){c("Please enter a valid Lightning Address","warning");return}const t=this.getFormData().total;if(t<=0){c("Please add line items with a total greater than 0","warning");return}try{c("Generating Lightning invoice...","info");const{LightningAddress:l}=await g(async()=>{const{LightningAddress:a}=await import("./index.modern-GuuHck_z.js");return{LightningAddress:a}},[]),d=new l(n);await d.fetch();const s=await d.requestInvoice({satoshi:t,description:`Invoice ${((o=document.getElementById("invoiceNumber"))==null?void 0:o.value)||"INV-001"}`,expiry:86400});this.currentLightningInvoice=s.paymentRequest,console.log("Generated Lightning Invoice:",{paymentRequest:s.paymentRequest,paymentHash:s.paymentHash,satoshi:s.satoshi,description:s.description,timestamp:s.timestamp,expiry:s.expiry,invoice:s}),this.updatePreview(),c("Lightning invoice generated successfully!","success")}catch(l){console.error("Error generating Lightning invoice:",l),c("Failed to generate Lightning invoice. Please check the address and try again.","error")}}showError(e,n){this.removeError(e);const i=document.createElement("div");i.className="error-message",i.textContent=n,e.parentNode.appendChild(i)}removeError(e){const n=e.parentNode.querySelector(".error-message");n&&n.remove()}generateNewInvoiceNumber(){const e=h(this.settings.defaultInvoicePrefix);document.getElementById("invoiceNumber").value=e,this.updatePreview(),this.saveFormData(),c("New invoice number generated!","success")}clearForm(){if(confirm("Are you sure you want to clear all form data? This action cannot be undone.")){const e=I();document.getElementById("invoiceNumber").value=h(this.settings.defaultInvoicePrefix),document.getElementById("invoiceDate").value=e.invoiceDate,document.getElementById("fromName").value="",document.getElementById("toName").value="",document.getElementById("description").value="",document.getElementById("quantity").value="1",document.getElementById("rate").value="",document.getElementById("lightningAddress").value="",this.currentLightningInvoice="",document.getElementById("notes").value="",this.updatePreview(),this.saveFormData(),c("Form cleared successfully!","success")}}saveFormData(){if(this.settings.autoSave){const e=this.getFormData();D(e)}}loadSavedData(){const e=C();if(e)this.setFormData(e),c("Previous form data loaded!","success");else{const n=I();document.getElementById("invoiceDate").value=n.invoiceDate,document.getElementById("invoiceNumber").value=h(this.settings.defaultInvoicePrefix)}}setupAutoSave(){this.settings.autoSave&&(this.autoSaveTimer=setInterval(()=>{this.saveFormData()},this.settings.autoSaveInterval))}setupTemplateControls(){const e=document.querySelector(".form-panel");if(e&&!document.querySelector(".template-controls")){const n=this.createTemplateControls();e.insertBefore(n,e.firstChild)}}createTemplateControls(){const e=document.createElement("div");return e.className="template-controls",e.innerHTML=`
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
        `,e}saveCurrentTemplate(){const e=prompt("Enter template name:");if(e&&e.trim()){const n=this.getFormData();N(e.trim(),n),c(`Template "${e}" saved successfully!`,"success")}}loadTemplateDialog(){const e=_();if(e.length===0){c("No saved templates found.","warning");return}const n=e.map(l=>`<option value="${l}">${l}</option>`).join(""),i=document.createElement("div");i.style.cssText=`
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
                    ${n}
                </select>
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button id="cancelTemplateBtn" style="
                        padding: 10px 20px;
                        background: #6366f1;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                    ">Cancel</button>
                    <button id="loadTemplateBtn" style="
                        padding: 10px 20px;
                        background: #10b981;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                    ">Load</button>
                </div>
            </div>
        `,document.body.appendChild(i);const t=i.querySelector("#cancelTemplateBtn"),o=i.querySelector("#loadTemplateBtn");t&&t.addEventListener("click",()=>{i.remove()}),o&&o.addEventListener("click",()=>{this.loadSelectedTemplate(),i.remove()})}loadSelectedTemplate(){const n=document.getElementById("templateSelect").value,i=q(n);i&&(this.setFormData(i),this.updatePreview(),this.saveFormData(),c(`Template "${n}" loaded successfully!`,"success"))}loadVersion(){try{const e="0.0.13",n=document.getElementById("versionDisplay");n&&(n.textContent=`v${e}`)}catch{console.log("Could not load version, using default")}}updateQRCodeSize(){const e=document.querySelector("#qrCodeContainer bitcoin-qr");if(!e)return;const n=Math.min(Math.floor(window.innerWidth/3),300),i=Math.round(n/100)*100;e.setAttribute("width",i),e.setAttribute("height",i)}updateQRCode(e){const n=document.querySelector("#qrCodeContainer bitcoin-qr");n&&e&&(n.setAttribute("lightning",e),n.setAttribute("is-polling","true"),this.updateQRCodeSize())}async updateLightningDetails(e){try{const{decodeInvoice:n}=await g(async()=>{const{decodeInvoice:o}=await import("./index.modern-GuuHck_z.js");return{decodeInvoice:o}},[]),i=n(e),t=document.getElementById("lightningExpiry");if(i&&t){if(i.timestamp&&i.expiry){const o=new Date((i.timestamp+i.expiry)*1e3);if(o-new Date>0){const s=o.getMonth()+1,a=o.getDate(),m=o.getFullYear(),u=o.getHours(),p=o.getMinutes(),P=u>=12?"PM":"AM",S=u%12||12,T=p.toString().padStart(2,"0"),A=`${s}/${a}/${m} ${S}:${T} ${P}`;t.textContent=`Expires: ${A}`}else t.textContent="Expired"}else t.textContent="Expiration time not available";t.style.display="inline-block"}else t&&(t.style.display="none")}catch(n){console.error("Error updating Lightning details:",n);const i=document.getElementById("lightningExpiry");i&&(i.style.display="none")}}updatePreviewTable(e){const n=document.getElementById("previewItemsTable");if(n&&(n.innerHTML="",e.forEach(i=>{const t=document.createElement("tr");t.innerHTML=`
                <td>${v(i.description)}</td>
                <td>${i.quantity}</td>
                <td>${f(i.rate)}</td>
                <td class="amount">${f(i.amount)}</td>
            `,n.appendChild(t)}),e.length===0)){const i=document.createElement("tr");i.innerHTML=`
                <td>No items</td>
                <td>0</td>
                <td>0</td>
                <td class="amount">0</td>
            `,n.appendChild(i)}}addLineItem(e="",n=1,i=0){const t=this.getNextItemId(),o=`
            <div class="line-item" data-item-id="${t}">
                <div class="form-group">
                    <label for="description-${t}">Item/Service Description</label>
                    <input type="text" id="description-${t}" placeholder="Bitcoin Consulting Services" class="item-description" value="${e}">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="quantity-${t}">Quantity</label>
                        <input type="number" id="quantity-${t}" placeholder="1" value="${n}" min="1" class="item-quantity">
                    </div>
                    <div class="form-group">
                        <label for="rate-${t}">Price</label>
                        <div class="sats-input">
                            <input type="number" id="rate-${t}" placeholder="100000" min="1" class="item-rate" value="${i}">
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-danger remove-item" data-item-id="${t}">X</button>
            </div>
        `;document.getElementById("lineItemsContainer").insertAdjacentHTML("beforeend",o),this.addLineItemEventListeners(t)}getNextItemId(){const e=document.querySelectorAll(".line-item");let n=0;return e.forEach(i=>{const t=parseInt(i.getAttribute("data-item-id"));t>n&&(n=t)}),n+1}addLineItemEventListeners(e){[document.getElementById(`description-${e}`),document.getElementById(`quantity-${e}`),document.getElementById(`rate-${e}`)].forEach(t=>{t&&t.addEventListener("input",b(()=>{this.updatePreview(),this.saveFormData()},300))});const i=document.querySelector(`[data-item-id="${e}"].remove-item`);i&&i.addEventListener("click",()=>{this.removeLineItem(e)})}removeLineItem(e){const n=document.querySelector(`[data-item-id="${e}"]`);n&&(n.remove(),this.updatePreview(),this.saveFormData())}setupLineItemEventListeners(){document.querySelectorAll(".line-item").forEach(i=>{const t=i.getAttribute("data-item-id");this.addLineItemEventListeners(t)});const n=document.getElementById("addLineItemBtn");n&&n.addEventListener("click",()=>{this.addLineItem()})}}let w;document.addEventListener("DOMContentLoaded",()=>{w=new O,window.app=w});
