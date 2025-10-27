import{_ as v}from"./vendor-B0ga06J7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(t){if(t.ep)return;t.ep=!0;const i=n(t);fetch(t.href,i)}})();function I(r){return r.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}function w(r="INV"){const e=Date.now().toString().slice(-6),n=Math.floor(Math.random()*1e3).toString().padStart(3,"0");return`${r}-${e}-${n}`}function L(){return{invoiceDate:new Date().toISOString().split("T")[0]}}function m(r,e="success"){const n=document.createElement("div");n.className=`notification notification-${e}`,n.textContent=r,Object.assign(n.style,{position:"fixed",bottom:"20px",left:"20px",padding:"15px 20px",borderRadius:"8px",color:"white",fontWeight:"bold",zIndex:"1000",transform:"translateX(-100%)",transition:"transform 0.3s ease",maxWidth:"300px",wordWrap:"break-word"});const o={success:"#ff9900",error:"#ff9900",warning:"#ff9900"};n.style.backgroundColor=o[e]||o.success,document.body.appendChild(n),setTimeout(()=>{n.style.transform="translateX(0)"},100),setTimeout(()=>{n.style.transform="translateX(-100%)",setTimeout(()=>{document.body.removeChild(n)},300)},3e3)}function B(r,e){let n;return function(...t){const i=()=>{clearTimeout(n),r(...t)};clearTimeout(n),n=setTimeout(i,e)}}function E(r){const e=document.createElement("div");return e.textContent=r,e.innerHTML}const y={FORM_DATA:"bullishinvoice_formData",TEMPLATES:"bullishinvoice_templates",SETTINGS:"bullishinvoice_settings"};function M(r){try{localStorage.setItem(y.FORM_DATA,JSON.stringify(r))}catch(e){console.error("Error saving form data:",e)}}function N(){try{const r=localStorage.getItem(y.FORM_DATA);return r?JSON.parse(r):null}catch(r){return console.error("Error loading form data:",r),null}}function C(r,e){try{const n=x();n[r]={...e,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},localStorage.setItem(y.TEMPLATES,JSON.stringify(n))}catch(n){console.error("Error saving template:",n)}}function x(){try{const r=localStorage.getItem(y.TEMPLATES);return r?JSON.parse(r):{}}catch(r){return console.error("Error loading templates:",r),{}}}function k(r){try{return x()[r]||null}catch(e){return console.error("Error loading template:",e),null}}function q(r){try{const e=x();delete e[r],localStorage.setItem(y.TEMPLATES,JSON.stringify(e))}catch(e){console.error("Error deleting template:",e)}}function $(){try{const r=x();return Object.keys(r)}catch(r){return console.error("Error getting template names:",r),[]}}function _(){try{const r=localStorage.getItem(y.SETTINGS);return r?JSON.parse(r):S()}catch(r){return console.error("Error loading settings:",r),S()}}function S(){return{autoSave:!0,autoSaveInterval:5e3,defaultInvoicePrefix:"INV",defaultCurrency:"sats",theme:"dark"}}class P{constructor(){this.isProcessing=!1,this.currentInvoice=null,this.qrElement=null,this.paymentCompleted=!1,this.debugMode=this.detectDebugMode(),this.debugMode&&(console.log("🚀 LightningPayment initialized with DEBUG MODE ENABLED"),console.log("   Exports will skip payment and execute directly")),window.toggleDebugMode=()=>this.toggleDebugMode(),window.redetectDebugMode=()=>this.redetectDebugMode()}async createInvoice(){try{const{LightningAddress:e}=await v(async()=>{const{LightningAddress:t}=await import("./index.modern-GuuHck_z.js");return{LightningAddress:t}},[]),n=new e("bullish@getalby.com");await n.fetch();const o=await n.requestInvoice({satoshi:21,description:"Export payment for bullishInvoice",expiry:86400});return console.log("Invoice created:",{paymentRequest:o.paymentRequest,paymentHash:o.paymentHash,satoshi:o.satoshi}),o}catch(e){throw console.error("Error creating invoice:",e),new Error("Failed to create Lightning invoice")}}async displayInvoice(e,n){try{const o=document.querySelector("#qr-container");if(!o)throw new Error("QR container not found");const t=document.createElement("bitcoin-qr");t.setAttribute("width","400"),t.setAttribute("height","400"),t.setAttribute("lightning",e.paymentRequest),t.setAttribute("is-polling","true"),t.setAttribute("poll-interval","3000"),t.setAttribute("type","svg"),t.setAttribute("corners-square-color","#ff9900"),t.setAttribute("corners-dot-color","#ff9900"),t.setAttribute("corners-square-type","square"),t.setAttribute("dots-type","square"),t.setAttribute("dots-color","#ff9900"),t.callback=async()=>{await this.checkPaymentStatus(e,n)},o.appendChild(t),this.qrElement=t,console.log("QR code displayed for invoice:",e.paymentRequest)}catch(o){throw console.error("Error displaying invoice with bitcoin-qr:",o),new Error("Failed to display invoice")}}createModalOverlay(){const e=document.createElement("div");return e.id="payment-overlay",e.style.cssText=`
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
        `,document.head.appendChild(n),document.body.appendChild(e),e}removeExportProcessingModal(){const e=document.getElementById("export-processing-overlay");e&&e.remove()}async checkPaymentStatus(e,n){if(!this.paymentCompleted)try{if(await e.verifyPayment()&&e.preimage){console.log("Payment verified successfully!"),console.log(`Preimage: ${e.preimage}`),this.paymentCompleted=!0,this.qrElement&&this.qrElement.setAttribute("is-polling","false");const t=document.getElementById("payment-status");t&&(t.textContent="✅ Payment received! Processing export...",t.style.color="#10b981"),this.createExportProcessingModal(),n(!0)}}catch(o){console.error("Error checking payment status:",o)}}cancelPayment(){this.qrElement&&(this.qrElement.remove(),this.qrElement=null),this.isProcessing=!1,this.currentInvoice=null,this.paymentCompleted=!1,this.removeModalOverlay(),m("Payment cancelled.","info")}async handleExportPayment(e,n){if(this.isProcessing){m("Payment already in progress. Please wait.","warning");return}if(this.debugMode){console.log("🐛 DEBUG MODE: Skipping Lightning payment, executing export directly"),m("Debug mode: Skipping payment, exporting directly...","info");try{await e(...n),m("Export completed (debug mode)!","success")}catch(o){console.error("Error in debug export:",o),m("Error during debug export. Please try again.","error")}return}this.isProcessing=!0,this.paymentCompleted=!1,this.createModalOverlay();try{m("Creating Lightning invoice...","info");const o=await this.createInvoice();this.currentInvoice=o,console.log("Created invoice:",{paymentRequest:o.paymentRequest,paymentHash:o.paymentHash,satoshi:o.satoshi}),m("Invoice created! Please scan QR code to pay.","success"),await this.displayInvoice(o,async t=>{var i;if(t){m("Payment received! Processing export...","success"),console.log("Payment verified successfully!");const s=(i=this.currentInvoice)==null?void 0:i.preimage;s&&console.log(`Preimage: ${s}`);try{await e(...n);const l=document.getElementById("export-status");l&&(l.textContent="Export completed successfully!",l.style.color="#10b981");const d=document.getElementById("export-processing-overlay");if(d){const a=d.querySelector("div > div");a&&(a.innerHTML=`
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
                                `)}m("Export completed successfully!","success"),setTimeout(()=>{this.isProcessing=!1,this.currentInvoice=null,this.paymentCompleted=!1,this.removeExportProcessingModal()},2e3)}catch(l){console.error("Error during export:",l);const d=document.getElementById("export-status");d&&(d.textContent="Export failed",d.style.color="#ef4444");const a=document.getElementById("export-processing-overlay");if(a){const u=a.querySelector("div > div");u&&(u.innerHTML=`
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
                                `)}m("Error during export. Please try again.","error"),setTimeout(()=>{this.isProcessing=!1,this.currentInvoice=null,this.paymentCompleted=!1,this.removeExportProcessingModal()},3e3)}}else m("Payment cancelled.","info"),this.isProcessing=!1,this.currentInvoice=null,this.paymentCompleted=!1,this.removeModalOverlay()})}catch(o){console.error("Error in payment flow:",o),m("Error processing payment. Please try again.","error"),this.isProcessing=!1,this.currentInvoice=null,this.paymentCompleted=!1,this.removeModalOverlay(),this.removeExportProcessingModal()}}detectDebugMode(){var t;const e={manualOverride:window.DEBUG_MODE===!0,isViteDev:!1,isLocalhost:window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.hostname==="0.0.0.0",isDevPort:window.location.port==="3000"||window.location.port==="5173"||window.location.port==="8080",isDevUrl:window.location.href.includes("localhost")||window.location.href.includes("127.0.0.1")||window.location.href.includes(":3000")||window.location.href.includes(":5173"),isFileProtocol:window.location.protocol==="file:",hasDevTools:window.location.search.includes("dev")||window.location.search.includes("debug"),hasConsole:window.outerHeight-window.innerHeight>200,hasSourceMaps:((t=document.querySelector('script[src*=".js"]'))==null?void 0:t.src.includes("?"))||!1},n=Object.values(e).filter(Boolean).length,o=e.manualOverride||n>=2;return o&&console.log("🐛 Debug mode auto-detected:",{indicators:e,positiveCount:n,reason:e.manualOverride?"Manual override":`${n} development indicators detected`}),o}toggleDebugMode(){this.debugMode=!this.debugMode,window.DEBUG_MODE=this.debugMode;const e=this.debugMode?"ENABLED":"DISABLED",n=this.debugMode?"🐛":"✅";return console.log(`${n} Debug mode ${e}`),console.log("Debug mode allows exports without Lightning payment"),m(`Debug mode ${e.toLowerCase()}`,this.debugMode?"warning":"success"),this.debugMode}redetectDebugMode(){return this.debugMode=this.detectDebugMode(),console.log(`🔄 Debug mode re-detected: ${this.debugMode?"ENABLED":"DISABLED"}`),this.debugMode}}const T=new P,c={pdf:{scale:2,format:"png",compression:!0,fastMode:!1},image:{scale:1.5,jpegQuality:.9,format:"jpeg"}};window.EXPORT_SETTINGS=c;window.setExportQuality=(r,e)=>{r==="pdf"?(e==="high"||e==="medium"?(c.pdf.scale=2,c.pdf.format="png",c.pdf.fastMode=!1):e==="low"&&(c.pdf.scale=1.5,c.pdf.format="png",c.pdf.fastMode=!0),console.log(`PDF quality set to: ${e}`,c.pdf)):r==="image"&&(e==="high"?(c.image.scale=2,c.image.jpegQuality=.95,c.image.format="png"):e==="medium"?(c.image.scale=1.5,c.image.jpegQuality=.9,c.image.format="jpeg"):e==="low"&&(c.image.scale=1,c.image.jpegQuality=.8,c.image.format="jpeg"),console.log(`Image quality set to: ${e}`,c.image))};async function F(r,e){await T.handleExportPayment(O,[r,e])}async function O(r,e){try{const n=(await v(async()=>{const{default:s}=await import("./vendor-B0ga06J7.js").then(l=>l.h);return{default:s}},[])).default,o=await n(r,{backgroundColor:"#ffffff",scale:c.image.scale,useCORS:!0,allowTaint:!1,logging:!1,scrollX:0,scrollY:0,width:r.offsetWidth,height:r.offsetHeight,windowWidth:r.offsetWidth,windowHeight:r.offsetHeight}),t=document.createElement("a"),i=c.image.format==="jpeg"?"jpg":"png";t.download=`${e}.${i}`,c.image.format==="jpeg"?t.href=o.toDataURL("image/jpeg",c.image.jpegQuality):t.href=o.toDataURL("image/png"),document.body.appendChild(t),t.click(),document.body.removeChild(t),m("Image exported successfully!","success")}catch(n){console.error("Error exporting image:",n),m("Error exporting image. Please try again.","error")}}async function H(r,e){await T.handleExportPayment(R,[r,e])}async function R(r,e){try{console.log("📄 PDF Export Settings:",c.pdf);const n=(await v(async()=>{const{default:g}=await import("./vendor-B0ga06J7.js").then(p=>p.h);return{default:g}},[])).default,{jsPDF:o}=await v(async()=>{const{jsPDF:g}=await import("./vendor-B0ga06J7.js").then(p=>p.j);return{jsPDF:g}},[]),t=await n(r,{backgroundColor:"#ffffff",scale:c.pdf.scale,useCORS:!0,allowTaint:!1,logging:!1,scrollX:0,scrollY:0}),i=new o({orientation:"portrait",unit:"mm",format:"a4",compress:c.pdf.compression}),s=t.toDataURL("image/png"),l=210,d=295;console.log("Canvas dimensions:",{width:t.width,height:t.height,scale:c.pdf.scale,elementWidth:r.offsetWidth,elementHeight:r.offsetHeight});const a=l,u=t.height*a/t.width,f=Math.min(a,l),h=Math.min(u,d);console.log("PDF dimensions:",{pageWidth:l,pageHeight:d,imgWidth:a,imgHeight:u,finalImgWidth:f,finalImgHeight:h});const b=c.pdf.fastMode?"FAST":"SLOW";if(u<=d)i.addImage(s,"PNG",0,0,a,u,void 0,b);else{let g=u,p=0;for(i.addImage(s,"PNG",0,p,a,u,void 0,b),g-=d;g>=0;)p=g-u,i.addPage(),i.addImage(s,"PNG",0,p,a,u,void 0,b),g-=d}c.pdf.compression&&(i.compress=!0),i.save(`${e}.pdf`),m("PDF exported successfully!","success")}catch(n){console.error("Error exporting PDF:",n),m("Error exporting PDF. Please try again.","error")}}class z{constructor(){this.settings=_(),this.autoSaveTimer=null,this.lightningPayment=new P,this.currentLightningInvoice="",this.init(),this.loadVersion()}init(){this.setupEventListeners(),this.setupLineItemEventListeners(),this.loadSavedData(),this.setupAutoSave(),this.updatePreview(),this.setupHamburgerMenu()}setupEventListeners(){document.querySelectorAll("input, textarea").forEach(a=>{a.addEventListener("input",()=>{this.updatePreview(),this.saveFormData()})});const n=document.getElementById("lightningAddress");n&&n.addEventListener("input",B(async a=>{await this.validateLightningAddress(a.target)},500));const o=document.getElementById("generateQRBtn");o&&o.addEventListener("click",async()=>{await this.generateInvoiceFromAddress()});const t=document.getElementById("exportPdfBtn"),i=document.getElementById("exportImageBtn");t&&t.addEventListener("click",()=>{const a=document.getElementById("invoicePreview");a&&H(a,"invoice")}),i&&i.addEventListener("click",()=>{const a=document.getElementById("invoicePreview");a&&F(a,"invoice")}),this.updateQRCodeSize(),window.addEventListener("resize",()=>this.updateQRCodeSize());const s=document.getElementById("lightningAddress");s&&s.addEventListener("blur",async a=>{await this.validateLightningAddress(a.target)});const l=document.getElementById("generateInvoiceNumberBtn");l&&l.addEventListener("click",()=>{this.generateNewInvoiceNumber()});const d=document.getElementById("clearFormBtn");d&&d.addEventListener("click",()=>{this.clearForm()})}getFormData(){var o,t,i,s,l,d;const e=this.getLineItems(),n=e.reduce((a,u)=>a+u.quantity*u.rate,0);return{invoiceNumber:((o=document.getElementById("invoiceNumber"))==null?void 0:o.value)||"INV-001",invoiceDate:((t=document.getElementById("invoiceDate"))==null?void 0:t.value)||"",fromName:((i=document.getElementById("fromName"))==null?void 0:i.value)||"",toName:((s=document.getElementById("toName"))==null?void 0:s.value)||"",lineItems:e,lightningAddress:((l=document.getElementById("lightningAddress"))==null?void 0:l.value)||"",lightningInvoice:this.currentLightningInvoice||"",notes:((d=document.getElementById("notes"))==null?void 0:d.value)||"",total:n}}getLineItems(){const e=[];return document.querySelectorAll(".line-item").forEach(o=>{var d,a,u;const t=o.getAttribute("data-item-id"),i=((d=document.getElementById(`description-${t}`))==null?void 0:d.value)||"",s=parseFloat((a=document.getElementById(`quantity-${t}`))==null?void 0:a.value)||1,l=parseFloat((u=document.getElementById(`rate-${t}`))==null?void 0:u.value)||0;i.trim()&&e.push({id:t,description:i,quantity:s,rate:l,amount:s*l})}),e}setFormData(e){e.invoiceNumber&&(document.getElementById("invoiceNumber").value=e.invoiceNumber),e.invoiceDate&&(document.getElementById("invoiceDate").value=e.invoiceDate),e.fromName&&(document.getElementById("fromName").value=e.fromName),e.toName&&(document.getElementById("toName").value=e.toName),e.lightningAddress&&(document.getElementById("lightningAddress").value=e.lightningAddress),e.lightningInvoice&&(this.currentLightningInvoice=e.lightningInvoice),e.notes&&(document.getElementById("notes").value=e.notes),e.lineItems&&Array.isArray(e.lineItems)&&this.setLineItems(e.lineItems)}setLineItems(e){const o=document.getElementById("lineItemsContainer").querySelectorAll(".line-item");o.length>0&&(document.getElementById("description-1").value="",document.getElementById("quantity-1").value="1",document.getElementById("rate-1").value="");for(let t=1;t<o.length;t++)o[t].remove();e.forEach((t,i)=>{i===0?(document.getElementById("description-1").value=t.description,document.getElementById("quantity-1").value=t.quantity,document.getElementById("rate-1").value=t.rate):this.addLineItem(t.description,t.quantity,t.rate)}),this.updatePreview()}updatePreview(){const e=this.getFormData(),n=e.total;document.getElementById("previewInvoiceNumber")&&(document.getElementById("previewInvoiceNumber").textContent=e.invoiceNumber),document.getElementById("previewInvoiceDate")&&(document.getElementById("previewInvoiceDate").textContent=e.invoiceDate||"--"),document.getElementById("previewFromName")&&(document.getElementById("previewFromName").innerHTML=E(e.fromName.replace(/\n/g,"<br>"))),document.getElementById("previewToName")&&(document.getElementById("previewToName").innerHTML=E(e.toName.replace(/\n/g,"<br>"))),this.updatePreviewTable(e.lineItems),document.getElementById("previewTotal")&&(document.getElementById("previewTotal").textContent=I(n));const o=document.getElementById("lightningSection");if(o)if(e.lightningInvoice&&e.lightningInvoice.trim()){o.style.display="block",this.updateLightningDetails(e.lightningInvoice);const i=document.getElementById("qrCodeContainer");i&&(i.style.display="block",this.updateQRCode(e.lightningInvoice))}else o.style.display="none";const t=document.getElementById("notesSection");t&&(e.notes.trim()?(t.style.display="block",document.getElementById("previewNotes").innerHTML=E(e.notes.replace(/\n/g,"<br>"))):t.style.display="none")}async validateLightningAddress(e){const n=e.value.trim();if(e.classList.remove("input-error","input-success"),!n||n.length<3)return this.removeError(e),!1;const t=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(n);return t?(e.classList.add("input-success"),this.removeError(e)):n.includes("@")&&n.includes(".")&&(e.classList.add("input-error"),this.showError(e,"Invalid Lightning Address format (e.g., hello@getalby.com)")),t}async generateInvoiceFromAddress(){var i;const e=document.getElementById("lightningAddress"),n=e.value.trim();if(!n){m("Please enter a Lightning Address first","warning");return}if(!await this.validateLightningAddress(e)){m("Please enter a valid Lightning Address","warning");return}const t=this.getFormData().total;if(t<=0){m("Please add line items with a total greater than 0","warning");return}try{m("Generating Lightning invoice...","info");const{LightningAddress:s}=await v(async()=>{const{LightningAddress:a}=await import("./index.modern-GuuHck_z.js");return{LightningAddress:a}},[]),l=new s(n);await l.fetch();const d=await l.requestInvoice({satoshi:t,description:`Invoice ${((i=document.getElementById("invoiceNumber"))==null?void 0:i.value)||"INV-001"}`,expiry:86400});this.currentLightningInvoice=d.paymentRequest,console.log("Generated Lightning Invoice:",{paymentRequest:d.paymentRequest,paymentHash:d.paymentHash,satoshi:d.satoshi,description:d.description,timestamp:d.timestamp,expiry:d.expiry,invoice:d}),this.updatePreview(),m("Lightning invoice generated successfully!","success")}catch(s){console.error("Error generating Lightning invoice:",s),m("Failed to generate Lightning invoice. Please check the address and try again.","error")}}showError(e,n){this.removeError(e);const o=document.createElement("div");o.className="error-message",o.textContent=n,e.parentNode.appendChild(o)}removeError(e){const n=e.parentNode.querySelector(".error-message");n&&n.remove()}generateNewInvoiceNumber(){const e=w(this.settings.defaultInvoicePrefix);document.getElementById("invoiceNumber").value=e,this.updatePreview(),this.saveFormData(),m("New invoice number generated!","success")}clearForm(){this.showConfirmDialog("Clear Form","Are you sure you want to clear all form data? This action cannot be undone.",()=>{const e=L();document.getElementById("invoiceNumber").value=w(this.settings.defaultInvoicePrefix),document.getElementById("invoiceDate").value=e.invoiceDate,document.getElementById("fromName").value="",document.getElementById("toName").value="",document.getElementById("description-1").value="",document.getElementById("quantity-1").value="1",document.getElementById("rate-1").value="";const n=document.querySelectorAll(".line-item");for(let o=1;o<n.length;o++)n[o].remove();document.getElementById("lightningAddress").value="",this.currentLightningInvoice="",document.getElementById("notes").value="",this.updatePreview(),this.saveFormData(),m("Form cleared successfully!","success")})}saveFormData(){if(this.settings.autoSave){const e=this.getFormData();M(e)}}loadSavedData(){const e=N();if(e)this.setFormData(e),m("Previous form data loaded!","success");else{const n=L();document.getElementById("invoiceDate").value=n.invoiceDate,document.getElementById("invoiceNumber").value=w(this.settings.defaultInvoicePrefix)}}setupAutoSave(){this.settings.autoSave&&(this.autoSaveTimer=setInterval(()=>{this.saveFormData()},this.settings.autoSaveInterval))}setupHamburgerMenu(){document.querySelector(".menu-overlay")||document.body.insertAdjacentHTML("beforeend",`
                <div class="menu-overlay" id="menuOverlay"></div>
                <div class="menu-sidebar" id="menuSidebar">
                    <div class="menu-section">
                        <h3>Invoice Actions</h3>
                        <div class="menu-buttons">
                            <button class="menu-btn" id="menuGenerateInvoice">New Invoice #</button>
                            <button class="menu-btn" id="menuClearForm">Clear Form</button>
                        </div>
                    </div>
                    
                    <div class="menu-section">
                        <h3>Templates</h3>
                        <div class="menu-buttons">
                            <button class="menu-btn" id="menuSaveTemplate">Save Template</button>
                        </div>
                        <div class="template-list" id="templateList">
                            <div class="no-templates">No templates saved</div>
                        </div>
                    </div>
                </div>
                <button class="menu-close-btn" id="menuCloseBtn" aria-label="Close Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            `);const e=document.getElementById("hamburgerBtn"),n=document.getElementById("menuOverlay"),o=document.getElementById("menuSidebar"),t=document.getElementById("menuCloseBtn"),i=()=>{e.classList.toggle("active"),n.classList.toggle("active"),o.classList.toggle("active"),t.classList.toggle("active")};e.addEventListener("click",i),n.addEventListener("click",i),t.addEventListener("click",i),document.getElementById("menuGenerateInvoice").addEventListener("click",()=>{this.generateNewInvoiceNumber(),i()}),document.getElementById("menuClearForm").addEventListener("click",()=>{this.clearForm(),i()}),document.getElementById("menuSaveTemplate").addEventListener("click",()=>{this.saveCurrentTemplate()}),this.refreshTemplateList()}refreshTemplateList(){const e=document.getElementById("templateList"),n=$();if(n.length===0){e.innerHTML='<div class="no-templates">No templates saved</div>';return}let o="";n.forEach(t=>{o+=`
                <div class="template-item">
                    <span class="template-name" onclick="app.loadTemplateByName('${t}')">${t}</span>
                    <div class="template-actions">
                        <button class="template-action-btn load" onclick="app.loadTemplateByName('${t}')">Load</button>
                        <button class="template-action-btn delete" onclick="app.deleteTemplateByName('${t}')">Delete</button>
                    </div>
                </div>
            `}),e.innerHTML=o}loadTemplateByName(e){const n=k(e);n&&(this.setFormData(n),this.updatePreview(),this.saveFormData(),m(`Template "${e}" loaded successfully!`,"success"),document.getElementById("hamburgerBtn").classList.remove("active"),document.getElementById("menuOverlay").classList.remove("active"),document.getElementById("menuSidebar").classList.remove("active"),document.getElementById("menuCloseBtn").classList.remove("active"))}deleteTemplateByName(e){this.showConfirmDialog("Delete Template",`Are you sure you want to delete the template "${e}"?`,()=>{q(e),m(`Template "${e}" deleted successfully!`,"success"),this.refreshTemplateList()})}showConfirmDialog(e,n,o){const t=document.createElement("div");t.className="confirm-modal-overlay",t.style.cssText=`
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `,t.innerHTML=`
            <div style="
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                padding: 30px;
                border-radius: 5px;
                border: 1px solid rgba(255, 153, 0, 0.3);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                max-width: 400px;
                width: 90%;
            ">
                <h3 style="color: #ff9900; margin-bottom: 20px; font-size: 1.3em; font-weight: bold;">${e}</h3>
                <p style="color: #ffffff; margin-bottom: 25px; line-height: 1.5;">${n}</p>
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button id="confirmCancelBtn" style="
                        padding: 10px 20px;
                        background: rgba(255, 255, 255, 0.1);
                        color: #ffffff;
                        border: 2px solid rgba(255, 255, 255, 0.2);
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                        transition: all 0.3s ease;
                    ">Cancel</button>
                    <button id="confirmBtn" style="
                        padding: 10px 20px;
                        background: linear-gradient(45deg, #ff9900, #ffaa33);
                        color: #000000;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                        transition: all 0.3s ease;
                    ">Confirm</button>
                </div>
            </div>
        `,document.body.appendChild(t);const i=t.querySelector("#confirmCancelBtn"),s=t.querySelector("#confirmBtn");i&&(i.addEventListener("mouseenter",()=>{i.style.background="rgba(255, 255, 255, 0.2)",i.style.transform="translateY(-2px)"}),i.addEventListener("mouseleave",()=>{i.style.background="rgba(255, 255, 255, 0.1)",i.style.transform="translateY(0)"}),i.addEventListener("click",()=>{t.remove()})),s&&(s.addEventListener("mouseenter",()=>{s.style.transform="translateY(-2px)",s.style.boxShadow="0 5px 15px rgba(255, 153, 0, 0.4)"}),s.addEventListener("mouseleave",()=>{s.style.transform="translateY(0)",s.style.boxShadow="none"}),s.addEventListener("click",()=>{o(),t.remove()})),t.addEventListener("click",l=>{l.target===t&&t.remove()})}saveCurrentTemplate(){const e=document.createElement("div");e.className="template-modal-overlay",e.style.cssText=`
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `,e.innerHTML=`
            <div style="
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                padding: 30px;
                border-radius: 5px;
                border: 1px solid rgba(255, 153, 0, 0.3);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                max-width: 400px;
                width: 90%;
            ">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                    <h3 style="color: #ff9900; font-size: 1.3em; font-weight: bold; margin: 0;">Save Template</h3>
                    <div style="position: relative; display: inline-block;">
                        <svg id="infoIcon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff9900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor: help;">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        <div id="infoTooltip" style="
                            position: absolute;
                            bottom: calc(100% + 8px);
                            left: 75%;
                            transform: translateX(-50%);
                            background: rgba(0, 0, 0, 0.95);
                            color: #ffffff;
                            padding: 12px 18px;
                            border-radius: 5px;
                            font-size: 14px;
                            white-space: normal;
                            width: 400px;
                            border: 1px solid rgba(255, 153, 0, 0.3);
                            pointer-events: none;
                            opacity: 0;
                            transition: opacity 0.3s ease;
                            z-index: 1001;
                            line-height: 1.5;
                            text-align: center;
                        ">
                            Saves from/to names, Lightning address, and notes for quicker invoice creation for regular clients.
                        </div>
                    </div>
                </div>
                <input type="text" id="templateNameInput" placeholder="Enter template name" style="
                    width: 100%;
                    padding: 12px 16px;
                    margin-bottom: 20px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 2px solid rgba(255, 153, 0, 0.3);
                    border-radius: 5px;
                    color: #ffffff;
                    font-size: 16px;
                    box-sizing: border-box;
                ">
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button id="cancelSaveBtn" style="
                        padding: 10px 20px;
                        background: rgba(255, 255, 255, 0.1);
                        color: #ffffff;
                        border: 2px solid rgba(255, 255, 255, 0.2);
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                        transition: all 0.3s ease;
                    ">Cancel</button>
                    <button id="saveBtn" style="
                        padding: 10px 20px;
                        background: linear-gradient(45deg, #ff9900, #ffaa33);
                        color: #000000;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                        transition: all 0.3s ease;
                    ">Save</button>
                </div>
            </div>
        `,document.body.appendChild(e);const n=e.querySelector("#templateNameInput");setTimeout(()=>n==null?void 0:n.focus(),100);const o=e.querySelector("#infoIcon"),t=e.querySelector("#infoTooltip");o&&t&&(o.addEventListener("mouseenter",()=>{t.style.opacity="1"}),o.addEventListener("mouseleave",()=>{t.style.opacity="0"}));const i=e.querySelector("#cancelSaveBtn"),s=e.querySelector("#saveBtn");i&&(i.addEventListener("mouseenter",()=>{i.style.background="rgba(255, 255, 255, 0.2)",i.style.transform="translateY(-2px)"}),i.addEventListener("mouseleave",()=>{i.style.background="rgba(255, 255, 255, 0.1)",i.style.transform="translateY(0)"}),i.addEventListener("click",()=>{e.remove()})),s&&(s.addEventListener("mouseenter",()=>{s.style.transform="translateY(-2px)",s.style.boxShadow="0 5px 15px rgba(255, 153, 0, 0.4)"}),s.addEventListener("mouseleave",()=>{s.style.transform="translateY(0)",s.style.boxShadow="none"}),s.addEventListener("click",()=>{var d,a,u,f;const l=n==null?void 0:n.value;if(l&&l.trim()){const h={fromName:((d=document.getElementById("fromName"))==null?void 0:d.value)||"",toName:((a=document.getElementById("toName"))==null?void 0:a.value)||"",lightningAddress:((u=document.getElementById("lightningAddress"))==null?void 0:u.value)||"",notes:((f=document.getElementById("notes"))==null?void 0:f.value)||""};C(l.trim(),h),m(`Template "${l}" saved successfully!`,"success"),this.refreshTemplateList(),e.remove()}else m("Please enter a template name","warning")})),e.addEventListener("click",l=>{l.target===e&&e.remove()}),n&&n.addEventListener("keypress",l=>{l.key==="Enter"&&(s==null||s.click())})}loadVersion(){try{const e="0.0.18",n=document.getElementById("versionDisplay");n&&(n.textContent=`v${e}`)}catch{console.log("Could not load version, using default")}}updateQRCodeSize(){const e=document.querySelector("#qrCodeContainer bitcoin-qr");if(!e)return;const n=Math.min(Math.floor(window.innerWidth/3),300),o=Math.round(n/100)*100;e.setAttribute("width",o),e.setAttribute("height",o)}updateQRCode(e){const n=document.getElementById("qrCodeContainer");let o=n==null?void 0:n.querySelector("bitcoin-qr");if(!n||!e)return;o&&o.remove();const t=Math.min(Math.floor(window.innerWidth/3),300),i=Math.round(t/100)*100;o=document.createElement("bitcoin-qr"),o.setAttribute("lightning",e),o.setAttribute("type","svg"),o.setAttribute("width",i.toString()),o.setAttribute("height",i.toString()),o.setAttribute("dots-color","#ff9900"),o.setAttribute("background-color","transparent"),o.setAttribute("corners-square-color","#ff9900"),o.setAttribute("poll-interval","3000"),o.setAttribute("is-polling","true"),n.appendChild(o),console.log("QR code updated with invoice:",e.substring(0,20)+"...")}async updateLightningDetails(e){try{const{decodeInvoice:n}=await v(async()=>{const{decodeInvoice:i}=await import("./index.modern-GuuHck_z.js");return{decodeInvoice:i}},[]),o=n(e),t=document.getElementById("lightningExpiry");if(o&&t){if(o.timestamp&&o.expiry){const i=new Date((o.timestamp+o.expiry)*1e3);if(i-new Date>0){const d=i.getMonth()+1,a=i.getDate(),u=i.getFullYear(),f=i.getHours(),h=i.getMinutes(),b=f>=12?"PM":"AM",g=f%12||12,p=h.toString().padStart(2,"0"),A=`${d}/${a}/${u} ${g}:${p} ${b}`;t.textContent=`Expires: ${A}`}else t.textContent="Expired"}else t.textContent="Expiration time not available";t.style.display="inline-block"}else t&&(t.style.display="none")}catch(n){console.error("Error updating Lightning details:",n);const o=document.getElementById("lightningExpiry");o&&(o.style.display="none")}}updatePreviewTable(e){const n=document.getElementById("previewItemsTable");if(n&&(n.innerHTML="",e.forEach(o=>{const t=document.createElement("tr");t.innerHTML=`
                <td>${E(o.description)}</td>
                <td>${o.quantity}</td>
                <td>${I(o.rate)}</td>
                <td class="amount">${I(o.amount)}</td>
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
        `;document.getElementById("lineItemsContainer").insertAdjacentHTML("beforeend",i),this.addLineItemEventListeners(t)}getNextItemId(){const e=document.querySelectorAll(".line-item");let n=0;return e.forEach(o=>{const t=parseInt(o.getAttribute("data-item-id"));t>n&&(n=t)}),n+1}addLineItemEventListeners(e){[document.getElementById(`description-${e}`),document.getElementById(`quantity-${e}`),document.getElementById(`rate-${e}`)].forEach(t=>{t&&t.addEventListener("input",B(()=>{this.updatePreview(),this.saveFormData()},300))});const o=document.querySelector(`[data-item-id="${e}"].remove-item`);o&&o.addEventListener("click",()=>{this.removeLineItem(e)})}removeLineItem(e){const n=document.querySelector(`[data-item-id="${e}"]`);n&&(n.remove(),this.updatePreview(),this.saveFormData())}setupLineItemEventListeners(){document.querySelectorAll(".line-item").forEach(o=>{const t=o.getAttribute("data-item-id");this.addLineItemEventListeners(t)});const n=document.getElementById("addLineItemBtn");n&&n.addEventListener("click",()=>{this.addLineItem()})}}let D;document.addEventListener("DOMContentLoaded",()=>{D=new z,window.app=D});
