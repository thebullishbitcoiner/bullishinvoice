import{_ as f}from"./vendor-B0ga06J7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(t){if(t.ep)return;t.ep=!0;const i=n(t);fetch(t.href,i)}})();function w(r){return r.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}function I(r="INV"){const e=Date.now().toString().slice(-6),n=Math.floor(Math.random()*1e3).toString().padStart(3,"0");return`${r}-${e}-${n}`}function L(){return{invoiceDate:new Date().toISOString().split("T")[0]}}function d(r,e="success"){const n=document.createElement("div");n.className=`notification notification-${e}`,n.textContent=r,Object.assign(n.style,{position:"fixed",top:"20px",right:"20px",padding:"15px 20px",borderRadius:"8px",color:"white",fontWeight:"bold",zIndex:"1000",transform:"translateX(100%)",transition:"transform 0.3s ease",maxWidth:"300px",wordWrap:"break-word"});const o={success:"#ff9900",error:"#ff9900",warning:"#ff9900"};n.style.backgroundColor=o[e]||o.success,document.body.appendChild(n),setTimeout(()=>{n.style.transform="translateX(0)"},100),setTimeout(()=>{n.style.transform="translateX(100%)",setTimeout(()=>{document.body.removeChild(n)},300)},3e3)}function D(r,e){let n;return function(...t){const i=()=>{clearTimeout(n),r(...t)};clearTimeout(n),n=setTimeout(i,e)}}function E(r){const e=document.createElement("div");return e.textContent=r,e.innerHTML}const y={FORM_DATA:"bullishinvoice_form_data",TEMPLATES:"bullishinvoice_templates",SETTINGS:"bullishinvoice_settings"};function M(r){try{localStorage.setItem(y.FORM_DATA,JSON.stringify(r))}catch(e){console.error("Error saving form data:",e)}}function C(){try{const r=localStorage.getItem(y.FORM_DATA);return r?JSON.parse(r):null}catch(r){return console.error("Error loading form data:",r),null}}function N(r,e){try{const n=x();n[r]={...e,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},localStorage.setItem(y.TEMPLATES,JSON.stringify(n))}catch(n){console.error("Error saving template:",n)}}function x(){try{const r=localStorage.getItem(y.TEMPLATES);return r?JSON.parse(r):{}}catch(r){return console.error("Error loading templates:",r),{}}}function q(r){try{return x()[r]||null}catch(e){return console.error("Error loading template:",e),null}}function _(){try{const r=x();return Object.keys(r)}catch(r){return console.error("Error getting template names:",r),[]}}function $(){try{const r=localStorage.getItem(y.SETTINGS);return r?JSON.parse(r):B()}catch(r){return console.error("Error loading settings:",r),B()}}function B(){return{autoSave:!0,autoSaveInterval:5e3,defaultInvoicePrefix:"INV",defaultCurrency:"sats",theme:"dark"}}class S{constructor(){this.isProcessing=!1,this.currentInvoice=null,this.qrElement=null,this.paymentCompleted=!1,this.debugMode=this.detectDebugMode(),this.debugMode&&(console.log("🚀 LightningPayment initialized with DEBUG MODE ENABLED"),console.log("   Exports will skip payment and execute directly")),window.toggleDebugMode=()=>this.toggleDebugMode(),window.redetectDebugMode=()=>this.redetectDebugMode()}async createInvoice(){try{const{LightningAddress:e}=await f(async()=>{const{LightningAddress:t}=await import("./index.modern-GuuHck_z.js");return{LightningAddress:t}},[]),n=new e("bullish@blitz-wallet.com");await n.fetch();const o=await n.requestInvoice({satoshi:21,description:"Export payment for bullishInvoice",expiry:86400});return console.log("Invoice created:",{paymentRequest:o.paymentRequest,paymentHash:o.paymentHash,satoshi:o.satoshi}),o}catch(e){throw console.error("Error creating invoice:",e),new Error("Failed to create Lightning invoice")}}async displayInvoice(e,n){try{const o=document.querySelector("#qr-container");if(!o)throw new Error("QR container not found");const t=document.createElement("bitcoin-qr");t.setAttribute("width","400"),t.setAttribute("height","400"),t.setAttribute("lightning",e.paymentRequest),t.setAttribute("is-polling","true"),t.setAttribute("poll-interval","3000"),t.setAttribute("type","svg"),t.setAttribute("corners-square-color","#ff9900"),t.setAttribute("corners-dot-color","#ff9900"),t.setAttribute("corners-square-type","square"),t.setAttribute("dots-type","square"),t.setAttribute("dots-color","#ff9900"),t.callback=async()=>{await this.checkPaymentStatus(e,n)},o.appendChild(t),this.qrElement=t,console.log("QR code displayed for invoice:",e.paymentRequest)}catch(o){throw console.error("Error displaying invoice with bitcoin-qr:",o),new Error("Failed to display invoice")}}createModalOverlay(){const e=document.createElement("div");return e.id="payment-overlay",e.style.cssText=`
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
        `,document.head.appendChild(n),document.body.appendChild(e),e}removeExportProcessingModal(){const e=document.getElementById("export-processing-overlay");e&&e.remove()}async checkPaymentStatus(e,n){if(!this.paymentCompleted)try{if(await e.verifyPayment()&&e.preimage){console.log("Payment verified successfully!"),console.log(`Preimage: ${e.preimage}`),this.paymentCompleted=!0,this.qrElement&&this.qrElement.setAttribute("is-polling","false");const t=document.getElementById("payment-status");t&&(t.textContent="✅ Payment received! Processing export...",t.style.color="#10b981"),this.createExportProcessingModal(),n(!0)}}catch(o){console.error("Error checking payment status:",o)}}cancelPayment(){this.qrElement&&(this.qrElement.remove(),this.qrElement=null),this.isProcessing=!1,this.currentInvoice=null,this.paymentCompleted=!1,this.removeModalOverlay(),d("Payment cancelled.","info")}async handleExportPayment(e,n){if(this.isProcessing){d("Payment already in progress. Please wait.","warning");return}if(this.debugMode){console.log("🐛 DEBUG MODE: Skipping Lightning payment, executing export directly"),d("Debug mode: Skipping payment, exporting directly...","info");try{await e(...n),d("Export completed (debug mode)!","success")}catch(o){console.error("Error in debug export:",o),d("Error during debug export. Please try again.","error")}return}this.isProcessing=!0,this.paymentCompleted=!1,this.createModalOverlay();try{d("Creating Lightning invoice...","info");const o=await this.createInvoice();this.currentInvoice=o,console.log("Created invoice:",{paymentRequest:o.paymentRequest,paymentHash:o.paymentHash,satoshi:o.satoshi}),d("Invoice created! Please scan QR code to pay.","success"),await this.displayInvoice(o,async t=>{var i;if(t){d("Payment received! Processing export...","success"),console.log("Payment verified successfully!");const c=(i=this.currentInvoice)==null?void 0:i.preimage;c&&console.log(`Preimage: ${c}`);try{await e(...n);const m=document.getElementById("export-status");m&&(m.textContent="Export completed successfully!",m.style.color="#10b981");const a=document.getElementById("export-processing-overlay");if(a){const s=a.querySelector("div > div");s&&(s.innerHTML=`
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
                                `)}d("Export completed successfully!","success"),setTimeout(()=>{this.isProcessing=!1,this.currentInvoice=null,this.paymentCompleted=!1,this.removeExportProcessingModal()},2e3)}catch(m){console.error("Error during export:",m);const a=document.getElementById("export-status");a&&(a.textContent="Export failed",a.style.color="#ef4444");const s=document.getElementById("export-processing-overlay");if(s){const u=s.querySelector("div > div");u&&(u.innerHTML=`
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
                                `)}d("Error during export. Please try again.","error"),setTimeout(()=>{this.isProcessing=!1,this.currentInvoice=null,this.paymentCompleted=!1,this.removeExportProcessingModal()},3e3)}}else d("Payment cancelled.","info"),this.isProcessing=!1,this.currentInvoice=null,this.paymentCompleted=!1,this.removeModalOverlay()})}catch(o){console.error("Error in payment flow:",o),d("Error processing payment. Please try again.","error"),this.isProcessing=!1,this.currentInvoice=null,this.paymentCompleted=!1,this.removeModalOverlay(),this.removeExportProcessingModal()}}detectDebugMode(){var t;const e={manualOverride:window.DEBUG_MODE===!0,isViteDev:!1,isLocalhost:window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.hostname==="0.0.0.0",isDevPort:window.location.port==="3000"||window.location.port==="5173"||window.location.port==="8080",isDevUrl:window.location.href.includes("localhost")||window.location.href.includes("127.0.0.1")||window.location.href.includes(":3000")||window.location.href.includes(":5173"),isFileProtocol:window.location.protocol==="file:",hasDevTools:window.location.search.includes("dev")||window.location.search.includes("debug"),hasConsole:window.outerHeight-window.innerHeight>200,hasSourceMaps:((t=document.querySelector('script[src*=".js"]'))==null?void 0:t.src.includes("?"))||!1},n=Object.values(e).filter(Boolean).length,o=e.manualOverride||n>=2;return o&&console.log("🐛 Debug mode auto-detected:",{indicators:e,positiveCount:n,reason:e.manualOverride?"Manual override":`${n} development indicators detected`}),o}toggleDebugMode(){this.debugMode=!this.debugMode,window.DEBUG_MODE=this.debugMode;const e=this.debugMode?"ENABLED":"DISABLED",n=this.debugMode?"🐛":"✅";return console.log(`${n} Debug mode ${e}`),console.log("Debug mode allows exports without Lightning payment"),d(`Debug mode ${e.toLowerCase()}`,this.debugMode?"warning":"success"),this.debugMode}redetectDebugMode(){return this.debugMode=this.detectDebugMode(),console.log(`🔄 Debug mode re-detected: ${this.debugMode?"ENABLED":"DISABLED"}`),this.debugMode}}const T=new S,l={pdf:{scale:2,format:"png",compression:!0,fastMode:!1},image:{scale:1.5,jpegQuality:.9,format:"jpeg"}};window.EXPORT_SETTINGS=l;window.setExportQuality=(r,e)=>{r==="pdf"?(e==="high"||e==="medium"?(l.pdf.scale=2,l.pdf.format="png",l.pdf.fastMode=!1):e==="low"&&(l.pdf.scale=1.5,l.pdf.format="png",l.pdf.fastMode=!0),console.log(`PDF quality set to: ${e}`,l.pdf)):r==="image"&&(e==="high"?(l.image.scale=2,l.image.jpegQuality=.95,l.image.format="png"):e==="medium"?(l.image.scale=1.5,l.image.jpegQuality=.9,l.image.format="jpeg"):e==="low"&&(l.image.scale=1,l.image.jpegQuality=.8,l.image.format="jpeg"),console.log(`Image quality set to: ${e}`,l.image))};async function F(r,e){await T.handleExportPayment(O,[r,e])}async function O(r,e){try{const n=(await f(async()=>{const{default:c}=await import("./vendor-B0ga06J7.js").then(m=>m.h);return{default:c}},[])).default,o=await n(r,{backgroundColor:"#ffffff",scale:l.image.scale,useCORS:!0,allowTaint:!1,logging:!1,scrollX:0,scrollY:0,width:r.offsetWidth,height:r.offsetHeight,windowWidth:r.offsetWidth,windowHeight:r.offsetHeight}),t=document.createElement("a"),i=l.image.format==="jpeg"?"jpg":"png";t.download=`${e}.${i}`,l.image.format==="jpeg"?t.href=o.toDataURL("image/jpeg",l.image.jpegQuality):t.href=o.toDataURL("image/png"),document.body.appendChild(t),t.click(),document.body.removeChild(t),d("Image exported successfully!","success")}catch(n){console.error("Error exporting image:",n),d("Error exporting image. Please try again.","error")}}async function R(r,e){await T.handleExportPayment(k,[r,e])}async function k(r,e){try{console.log("📄 PDF Export Settings:",l.pdf);const n=(await f(async()=>{const{default:g}=await import("./vendor-B0ga06J7.js").then(p=>p.h);return{default:g}},[])).default,{jsPDF:o}=await f(async()=>{const{jsPDF:g}=await import("./vendor-B0ga06J7.js").then(p=>p.j);return{jsPDF:g}},[]),t=await n(r,{backgroundColor:"#ffffff",scale:l.pdf.scale,useCORS:!0,allowTaint:!1,logging:!1,scrollX:0,scrollY:0}),i=new o({orientation:"portrait",unit:"mm",format:"a4",compress:l.pdf.compression}),c=t.toDataURL("image/png"),m=210,a=295;console.log("Canvas dimensions:",{width:t.width,height:t.height,scale:l.pdf.scale,elementWidth:r.offsetWidth,elementHeight:r.offsetHeight});const s=m,u=t.height*s/t.width,v=Math.min(s,m),b=Math.min(u,a);console.log("PDF dimensions:",{pageWidth:m,pageHeight:a,imgWidth:s,imgHeight:u,finalImgWidth:v,finalImgHeight:b});const h=l.pdf.fastMode?"FAST":"SLOW";if(u<=a)i.addImage(c,"PNG",0,0,s,u,void 0,h);else{let g=u,p=0;for(i.addImage(c,"PNG",0,p,s,u,void 0,h),g-=a;g>=0;)p=g-u,i.addPage(),i.addImage(c,"PNG",0,p,s,u,void 0,h),g-=a}l.pdf.compression&&(i.compress=!0),i.save(`${e}.pdf`),d("PDF exported successfully!","success")}catch(n){console.error("Error exporting PDF:",n),d("Error exporting PDF. Please try again.","error")}}class H{constructor(){this.settings=$(),this.autoSaveTimer=null,this.lightningPayment=new S,this.currentLightningInvoice="",this.init(),this.loadVersion()}init(){this.setupEventListeners(),this.setupLineItemEventListeners(),this.loadSavedData(),this.setupAutoSave(),this.updatePreview(),this.setupTemplateControls()}setupEventListeners(){document.querySelectorAll("input, textarea").forEach(s=>{s.addEventListener("input",()=>{this.updatePreview(),this.saveFormData()})});const n=document.getElementById("lightningAddress");n&&n.addEventListener("input",D(async s=>{await this.validateLightningAddress(s.target)},500));const o=document.getElementById("generateQRBtn");o&&o.addEventListener("click",async()=>{await this.generateInvoiceFromAddress()});const t=document.getElementById("exportPdfBtn"),i=document.getElementById("exportImageBtn");t&&t.addEventListener("click",()=>{const s=document.getElementById("invoicePreview");s&&R(s,"invoice")}),i&&i.addEventListener("click",()=>{const s=document.getElementById("invoicePreview");s&&F(s,"invoice")}),this.updateQRCodeSize(),window.addEventListener("resize",()=>this.updateQRCodeSize());const c=document.getElementById("lightningAddress");c&&c.addEventListener("blur",async s=>{await this.validateLightningAddress(s.target)});const m=document.getElementById("generateInvoiceNumberBtn");m&&m.addEventListener("click",()=>{this.generateNewInvoiceNumber()});const a=document.getElementById("clearFormBtn");a&&a.addEventListener("click",()=>{this.clearForm()})}getFormData(){var o,t,i,c,m,a;const e=this.getLineItems(),n=e.reduce((s,u)=>s+u.quantity*u.rate,0);return{invoiceNumber:((o=document.getElementById("invoiceNumber"))==null?void 0:o.value)||"INV-001",invoiceDate:((t=document.getElementById("invoiceDate"))==null?void 0:t.value)||"",fromName:((i=document.getElementById("fromName"))==null?void 0:i.value)||"",toName:((c=document.getElementById("toName"))==null?void 0:c.value)||"",lineItems:e,lightningAddress:((m=document.getElementById("lightningAddress"))==null?void 0:m.value)||"",lightningInvoice:this.currentLightningInvoice||"",notes:((a=document.getElementById("notes"))==null?void 0:a.value)||"",total:n}}getLineItems(){const e=[];return document.querySelectorAll(".line-item").forEach(o=>{var a,s,u;const t=o.getAttribute("data-item-id"),i=((a=document.getElementById(`description-${t}`))==null?void 0:a.value)||"",c=parseFloat((s=document.getElementById(`quantity-${t}`))==null?void 0:s.value)||1,m=parseFloat((u=document.getElementById(`rate-${t}`))==null?void 0:u.value)||0;i.trim()&&e.push({id:t,description:i,quantity:c,rate:m,amount:c*m})}),e}setFormData(e){e.invoiceNumber&&(document.getElementById("invoiceNumber").value=e.invoiceNumber),e.invoiceDate&&(document.getElementById("invoiceDate").value=e.invoiceDate),e.fromName&&(document.getElementById("fromName").value=e.fromName),e.toName&&(document.getElementById("toName").value=e.toName),e.lightningAddress&&(document.getElementById("lightningAddress").value=e.lightningAddress),e.lightningInvoice&&(this.currentLightningInvoice=e.lightningInvoice),e.notes&&(document.getElementById("notes").value=e.notes),e.lineItems&&Array.isArray(e.lineItems)&&this.setLineItems(e.lineItems)}setLineItems(e){const o=document.getElementById("lineItemsContainer").querySelectorAll(".line-item");o.length>0&&(document.getElementById("description-1").value="",document.getElementById("quantity-1").value="1",document.getElementById("rate-1").value="");for(let t=1;t<o.length;t++)o[t].remove();e.forEach((t,i)=>{i===0?(document.getElementById("description-1").value=t.description,document.getElementById("quantity-1").value=t.quantity,document.getElementById("rate-1").value=t.rate):this.addLineItem(t.description,t.quantity,t.rate)}),this.updatePreview()}updatePreview(){const e=this.getFormData(),n=e.total;document.getElementById("previewInvoiceNumber")&&(document.getElementById("previewInvoiceNumber").textContent=e.invoiceNumber),document.getElementById("previewInvoiceDate")&&(document.getElementById("previewInvoiceDate").textContent=e.invoiceDate||"--"),document.getElementById("previewFromName")&&(document.getElementById("previewFromName").innerHTML=E(e.fromName.replace(/\n/g,"<br>"))),document.getElementById("previewToName")&&(document.getElementById("previewToName").innerHTML=E(e.toName.replace(/\n/g,"<br>"))),this.updatePreviewTable(e.lineItems),document.getElementById("previewTotal")&&(document.getElementById("previewTotal").textContent=w(n));const o=document.getElementById("lightningSection");if(o)if(e.lightningInvoice&&e.lightningInvoice.trim()){o.style.display="block",this.updateLightningDetails(e.lightningInvoice);const i=document.getElementById("qrCodeContainer");i&&(i.style.display="block",this.updateQRCode(e.lightningInvoice))}else o.style.display="none";const t=document.getElementById("notesSection");t&&(e.notes.trim()?(t.style.display="block",document.getElementById("previewNotes").innerHTML=E(e.notes.replace(/\n/g,"<br>"))):t.style.display="none")}async validateLightningAddress(e){const n=e.value.trim();if(e.classList.remove("input-error","input-success"),!n||n.length<3)return this.removeError(e),!1;const t=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(n);return t?(e.classList.add("input-success"),this.removeError(e)):n.includes("@")&&n.includes(".")&&(e.classList.add("input-error"),this.showError(e,"Invalid Lightning Address format (e.g., hello@getalby.com)")),t}async generateInvoiceFromAddress(){var i;const e=document.getElementById("lightningAddress"),n=e.value.trim();if(!n){d("Please enter a Lightning Address first","warning");return}if(!await this.validateLightningAddress(e)){d("Please enter a valid Lightning Address","warning");return}const t=this.getFormData().total;if(t<=0){d("Please add line items with a total greater than 0","warning");return}try{d("Generating Lightning invoice...","info");const{LightningAddress:c}=await f(async()=>{const{LightningAddress:s}=await import("./index.modern-GuuHck_z.js");return{LightningAddress:s}},[]),m=new c(n);await m.fetch();const a=await m.requestInvoice({satoshi:t,description:`Invoice ${((i=document.getElementById("invoiceNumber"))==null?void 0:i.value)||"INV-001"}`,expiry:86400});this.currentLightningInvoice=a.paymentRequest,console.log("Generated Lightning Invoice:",{paymentRequest:a.paymentRequest,paymentHash:a.paymentHash,satoshi:a.satoshi,description:a.description,timestamp:a.timestamp,expiry:a.expiry,invoice:a}),this.updatePreview(),d("Lightning invoice generated successfully!","success")}catch(c){console.error("Error generating Lightning invoice:",c),d("Failed to generate Lightning invoice. Please check the address and try again.","error")}}showError(e,n){this.removeError(e);const o=document.createElement("div");o.className="error-message",o.textContent=n,e.parentNode.appendChild(o)}removeError(e){const n=e.parentNode.querySelector(".error-message");n&&n.remove()}generateNewInvoiceNumber(){const e=I(this.settings.defaultInvoicePrefix);document.getElementById("invoiceNumber").value=e,this.updatePreview(),this.saveFormData(),d("New invoice number generated!","success")}clearForm(){if(confirm("Are you sure you want to clear all form data? This action cannot be undone.")){const e=L();document.getElementById("invoiceNumber").value=I(this.settings.defaultInvoicePrefix),document.getElementById("invoiceDate").value=e.invoiceDate,document.getElementById("fromName").value="",document.getElementById("toName").value="",document.getElementById("description").value="",document.getElementById("quantity").value="1",document.getElementById("rate").value="",document.getElementById("lightningAddress").value="",this.currentLightningInvoice="",document.getElementById("notes").value="",this.updatePreview(),this.saveFormData(),d("Form cleared successfully!","success")}}saveFormData(){if(this.settings.autoSave){const e=this.getFormData();M(e)}}loadSavedData(){const e=C();if(e)this.setFormData(e),d("Previous form data loaded!","success");else{const n=L();document.getElementById("invoiceDate").value=n.invoiceDate,document.getElementById("invoiceNumber").value=I(this.settings.defaultInvoicePrefix)}}setupAutoSave(){this.settings.autoSave&&(this.autoSaveTimer=setInterval(()=>{this.saveFormData()},this.settings.autoSaveInterval))}setupTemplateControls(){const e=document.querySelector(".form-panel");if(e&&!document.querySelector(".template-controls")){const n=this.createTemplateControls();e.insertBefore(n,e.firstChild)}}createTemplateControls(){const e=document.createElement("div");return e.className="template-controls",e.innerHTML=`
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
        `,e}saveCurrentTemplate(){const e=prompt("Enter template name:");if(e&&e.trim()){const n=this.getFormData();N(e.trim(),n),d(`Template "${e}" saved successfully!`,"success")}}loadTemplateDialog(){const e=_();if(e.length===0){d("No saved templates found.","warning");return}const n=e.map(c=>`<option value="${c}">${c}</option>`).join(""),o=document.createElement("div");o.style.cssText=`
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
        `,document.body.appendChild(o);const t=o.querySelector("#cancelTemplateBtn"),i=o.querySelector("#loadTemplateBtn");t&&t.addEventListener("click",()=>{o.remove()}),i&&i.addEventListener("click",()=>{this.loadSelectedTemplate(),o.remove()})}loadSelectedTemplate(){const n=document.getElementById("templateSelect").value,o=q(n);o&&(this.setFormData(o),this.updatePreview(),this.saveFormData(),d(`Template "${n}" loaded successfully!`,"success"))}loadVersion(){try{const e="0.0.14",n=document.getElementById("versionDisplay");n&&(n.textContent=`v${e}`)}catch{console.log("Could not load version, using default")}}updateQRCodeSize(){const e=document.querySelector("#qrCodeContainer bitcoin-qr");if(!e)return;const n=Math.min(Math.floor(window.innerWidth/3),300),o=Math.round(n/100)*100;e.setAttribute("width",o),e.setAttribute("height",o)}updateQRCode(e){const n=document.querySelector("#qrCodeContainer bitcoin-qr");n&&e&&(n.setAttribute("lightning",e),n.setAttribute("is-polling","true"),this.updateQRCodeSize())}async updateLightningDetails(e){try{const{decodeInvoice:n}=await f(async()=>{const{decodeInvoice:i}=await import("./index.modern-GuuHck_z.js");return{decodeInvoice:i}},[]),o=n(e),t=document.getElementById("lightningExpiry");if(o&&t){if(o.timestamp&&o.expiry){const i=new Date((o.timestamp+o.expiry)*1e3);if(i-new Date>0){const a=i.getMonth()+1,s=i.getDate(),u=i.getFullYear(),v=i.getHours(),b=i.getMinutes(),h=v>=12?"PM":"AM",g=v%12||12,p=b.toString().padStart(2,"0"),A=`${a}/${s}/${u} ${g}:${p} ${h}`;t.textContent=`Expires: ${A}`}else t.textContent="Expired"}else t.textContent="Expiration time not available";t.style.display="inline-block"}else t&&(t.style.display="none")}catch(n){console.error("Error updating Lightning details:",n);const o=document.getElementById("lightningExpiry");o&&(o.style.display="none")}}updatePreviewTable(e){const n=document.getElementById("previewItemsTable");if(n&&(n.innerHTML="",e.forEach(o=>{const t=document.createElement("tr");t.innerHTML=`
                <td>${E(o.description)}</td>
                <td>${o.quantity}</td>
                <td>${w(o.rate)}</td>
                <td class="amount">${w(o.amount)}</td>
            `,n.appendChild(t)}),e.length===0)){const o=document.createElement("tr");o.innerHTML=`
                <td>No items</td>
                <td>0</td>
                <td>0</td>
                <td class="amount">0</td>
            `,n.appendChild(o)}}addLineItem(e="",n=1,o=0){const t=this.getNextItemId(),i=`
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
                            <input type="number" id="rate-${t}" placeholder="100000" min="1" class="item-rate" value="${o}">
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-danger remove-item" data-item-id="${t}">X</button>
            </div>
        `;document.getElementById("lineItemsContainer").insertAdjacentHTML("beforeend",i),this.addLineItemEventListeners(t)}getNextItemId(){const e=document.querySelectorAll(".line-item");let n=0;return e.forEach(o=>{const t=parseInt(o.getAttribute("data-item-id"));t>n&&(n=t)}),n+1}addLineItemEventListeners(e){[document.getElementById(`description-${e}`),document.getElementById(`quantity-${e}`),document.getElementById(`rate-${e}`)].forEach(t=>{t&&t.addEventListener("input",D(()=>{this.updatePreview(),this.saveFormData()},300))});const o=document.querySelector(`[data-item-id="${e}"].remove-item`);o&&o.addEventListener("click",()=>{this.removeLineItem(e)})}removeLineItem(e){const n=document.querySelector(`[data-item-id="${e}"]`);n&&(n.remove(),this.updatePreview(),this.saveFormData())}setupLineItemEventListeners(){document.querySelectorAll(".line-item").forEach(o=>{const t=o.getAttribute("data-item-id");this.addLineItemEventListeners(t)});const n=document.getElementById("addLineItemBtn");n&&n.addEventListener("click",()=>{this.addLineItem()})}}let P;document.addEventListener("DOMContentLoaded",()=>{P=new H,window.app=P});
