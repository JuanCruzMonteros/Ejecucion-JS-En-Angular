(function () {
    var ccJs = function (options) {
        var mode = "BCP"; var useFPC = false; var includeReferrer = false; var runOptimusOnly = false; var cmp = { daisybit: null, wait: 250, done: 0, start: 0 }; var baseDomain = ".crwdcntrl.net"; var validPrefix = ["bcp", "cn"]; var bcpDomainPrefix = "bcp", async_props = { async: false, asyncBehaviors: {}, asyncOpportunityIds: [], asyncOpportunities: [] }, behaviors = {}, bcpd_callback = null, consentSetCB = null, consentGetCB = null, pv = "pv\x3dy", dobcp = false, placementOpps = { p: [], pt: [] }; var domain = document.domain, test = false,
            sep = "/", delim = "/", autoFire = false; var _cc_testCkeName = "_cc_cc"; var _cc_testCkeVal = "ctst"; var referrer; var _cc_idCkeName = "_cc_id"; var client, bcpClient; client = bcpClient = 6596; var actualClient = { id: 6596, useFirstPartyDomain: "NEVER", domainPrefix: "", cookieDomain: "", cookieDomainIDN: "" }; function setCMPWait(waitMs) { cmp.wait = waitMs } function setTest(testOn) { if (typeof testOn != "undefined" && (testOn == true || testOn == false)) test = testOn } function parseQueryStringToParameters(doc) {
                var qs = parseQuery(running.src.replace(/^[^\?]+\??/,
                    "")); ns = qs["ns"] || "LOTCC_" + client; if (mode == "BCP") { autoFire = !!(qs["autobcp"] || false); if (typeof qs["pre"] != "undefined") setBCPDomainPrefix(qs["pre"][0]); if (typeof qs["cmpwait"] != "undefined") setCMPWait(qs["cmpwait"][0]); if ("true" == qs["runOptimusOnly"]) runOptimusOnly = true; delete qs["ns"]; delete qs["autobcp"]; delete qs["pre"]; delete qs["cmpwait"]; delete qs["runOptimusOnly"]; for (var type in qs) if (isArray(qs[type])) for (var i = 0, beh; beh = qs[type][i++];)add(type, beh) }
            } var ns, running = document.getElementById("LOTCC_" +
                client); if (running) parseQueryStringToParameters(running); else ns = "LOTCC_" + client; if (!(ns in window)) window[ns] = {}; function parseQuery(query) { var params = {}; if (!query) return params; var pairs = query.split(/[;&]/); for (var i = 0; i < pairs.length; i++) { var key_val = pairs[i].split("\x3d"); if (!key_val || key_val.length != 2) continue; var key = unescape(key_val[0]); var val = unescape(key_val[1]); val = val.replace(/\+/g, " "); params[key] && params[key].push ? params[key].push(val) : params[key] = [val] } return params } function isArray(v) {
                    return v &&
                        typeof v === "object" && typeof v.length === "number" && !v.propertyIsEnumerable("length")
                } function getDefinedValue(overrideVal, defaultVal) { if (typeof overrideVal != "undefined" && overrideVal != null) return overrideVal; else return defaultVal } function add(name, id) { if (behaviors[name] == null) behaviors[name] = new Array; var entry = behaviors[name]; entry[entry.length] = encodeURIComponent(id) } function append(url, val, vr, delimArg) {
                    if (typeof val != "undefined" && val.length > 0) {
                        var delimToUse = getDefinedValue(delimArg, delim); var vals;
                        if (isArray(val)) vals = val; else vals = val.split(","); var vn = delimToUse + vr + "\x3d"; for (var i = 0; i < vals.length; i++)url += vn + vals[i]
                    } return url
                } function setBCPDomainPrefix(prefix) { if (validPrefix.indexOf(prefix) >= 0) bcpDomainPrefix = prefix; else if (typeof console != "undefined") console.log(prefix + " is not valid") } function baseURL(is_pv, version, domainArg, sepArg, delimArg) {
                    if (typeof version == "undefined" || version == null) version = "5"; is_pv = is_pv && !namespace.pvdone; var domainToUse; if (typeof domainArg != "undefined" && domainArg !=
                        null) domainToUse = domainArg; else domainToUse = getDomain(); var url = getPrefix() + domainToUse; var sepToUse = getDefinedValue(sepArg, sep); var delimToUse = getDefinedValue(delimArg, delim); url += "/" + version + sepToUse + "c\x3d" + bcpClient + delimToUse + "rand\x3d" + getRandomNumber(); if (cmp["daisybit"] != null) url += delimToUse + "db\x3d" + cmp["daisybit"]; if (is_pv && mode == "BCP") url += delimToUse + pv; return url
                } function getRandomNumber() { var min = 1E8; var max = 999999999; var randomnumber = Math.floor(min + (max - min) * Math.random()); return randomnumber }
        function getPrefix() { return "https://" } function storageAvailable(type) { var storage; try { storage = window[type]; var x = "__storage_test__"; storage.setItem(x, x); storage.removeItem(x); return true } catch (e) { return e instanceof DOMException && (e["code"] === 22 || e["code"] === 1014 || e["name"] === "QuotaExceededError" || e["name"] === "NS_ERROR_DOM_QUOTA_REACHED") && (storage && storage.length !== 0) } } var useLocalStorage = storageAvailable("localStorage"); function readData(key) {
            var retVal = getCookie(key); if (!retVal && useLocalStorage) retVal =
                readLocalStorage(key); return retVal
        } function getCookie(cookieName) { var cookieValue = null; var cookieString = "" + document.cookie; if (cookieString.length != 0) { var cookieMatch = cookieString.match(cookieName + "\x3d([^;]*)"); if (typeof cookieMatch != "undefined" && cookieMatch != null) cookieValue = cookieMatch[1] } return cookieValue } function readLocalStorage(key) { return localStorage.getItem(key) } function handleCookies(data) {
            var firstPartyCookieDomain = getFirstPartyCookieDomain(data); var cookieSuccess = false; if (firstPartyCookieDomain !=
                null) if (data.cookies && data.cookies != "undefined" && data.cookies != null && data.cookies.length > 0) cookieSuccess = writeData(data.cookies, firstPartyCookieDomain); return cookieSuccess
        } function getFirstPartyCookieDomain(data) {
            var cookieDomain = null; if (typeof data !== "undefined" && data.domain && data.domain != "undefined" && data.domain != null && actualClient.cookieDomain.length > 0) {
                var domainCandidate = document.domain; if (actualClient.cookieDomain == "." + domainCandidate || actualClient.cookieDomain === domainCandidate) cookieDomain =
                    actualClient.cookieDomain; else if (actualClient.cookieDomainIDN == "." + domainCandidate || actualClient.cookieDomainIDN === domainCandidate) cookieDomain = actualClient.cookieDomainIDN; else if (domainCandidate.indexOf(actualClient.cookieDomain) !== -1) cookieDomain = actualClient.cookieDomain; else if (domainCandidate.indexOf(actualClient.cookieDomainIDN) !== -1) cookieDomain = actualClient.cookieDomainIDN
            } return cookieDomain
        } function writeData(cookieArray, domainArg) {
            var cookieSuccess = writeCookies(cookieArray, domainArg);
            var localStorageSuccess = writeLocalStorage(cookieArray, domainArg); return cookieSuccess || localStorageSuccess
        } function writeCookies(cookieArray, domainArg) {
            if (typeof cookieArray != "undefined" && cookieArray != null) {
                var cookieCount = cookieArray.length; for (var i = 0; i < cookieCount; i++) {
                    var cookie = cookieArray[i]; if (cookie.name == "undefined" || cookie.name == null || cookie.value == "undefined" || cookie.value == null) continue; var cookieString = ""; cookieString += cookie.name + "\x3d" + cookie.value + ";"; var kvs = new Object; kvs["domain"] =
                        domainArg; kvs["path"] = getCookiePropertyWithDefault(cookie, "path", "/"); var maxAge = getCookieProperty(cookie, "maxAge"); if (maxAge != -1) { var d = new Date; d.setTime(d.getTime() + maxAge * 1E3); kvs["expires"] = d.toGMTString() } var val; for (var key in kvs) { val = kvs[key]; if (typeof val != "undefined" && val != null) cookieString += key + "\x3d" + val + ";" } document.cookie = cookieString
                } return true
            } return false
        } function writeLocalStorage(cookieArray, domainArg) {
            if (useLocalStorage && typeof cookieArray != "undefined" && cookieArray != null) {
                var cookieCount =
                    cookieArray.length; for (var i = 0; i < cookieCount; i++) { var cookie = cookieArray[i]; if (cookie.name !== _cc_idCkeName || cookie.value == "undefined" || cookie.value == null) continue; localStorage.setItem(cookie.name, cookie.value) } return true
            } return false
        } function writeTestCookie(returnedDomain) { document.cookie = _cc_testCkeName + "\x3d" + _cc_testCkeVal + ";" + "domain\x3d" + returnedDomain + ";"; var cookieValue = getCookie(_cc_testCkeName); if (cookieValue == _cc_testCkeVal) return true; else return false } function getCookieProperty(cookie,
            property) { if (cookie[property] != "undefined" && cookie[property] != null) return cookie[property]; else return null } function getCookiePropertyWithDefault(cookie, property, defaultVal) { if (cookie[property] != "undefined" && cookie[property] != null) return cookie[property]; else return defaultVal } function getReferrer() {
                if (!referrer) {
                    if ("referrer" in options) referrer = options.referrer; else if (window.document.referrer !== "") referrer = window.document.referrer; else referrer = window.location.href; var queryIndex = referrer.indexOf("?");
                    if (queryIndex !== -1) referrer = referrer.substring(0, queryIndex)
                } return referrer
            } options = options || {}; var namespace = "namespace" in options ? options.namespace : window[ns]; namespace.pvdone = "pvdone" in options ? options.pvdone : false; namespace.loaded = "loaded" in options ? options.loaded : false; namespace.dropSyncPixels = "dropSyncPixels" in options ? options.dropSyncPixels : true; namespace.runOptimus = "runOptimus" in options ? options.runOptimus : true; if (!client) return false; var addEvent = function () {
                if (document.addEventListener) return function (obj,
                    sEvent, func) { obj.addEventListener(sEvent, func, false); return true }; else if (document.attachEvent) return function (obj, sEvent, func) { obj.attachEvent("on" + sEvent, func); return true }; else return function (obj, sEvent, func) { return false }
            }(); for (var prop in async_props) if (prop in namespace) async_props[prop] = namespace[prop]; else if ("LOTCC" in window && typeof LOTCC === "object" && prop in LOTCC) async_props[prop] = LOTCC[prop]; namespace.enableDiv = function () { }; namespace.enableNamedDiv = function () { }; namespace.fillDiv = function () { };
        namespace.add = add; namespace.addBehavior = addBehavior; namespace.addInterest = addInterest; namespace.addAction = addAction; namespace.addMedia = addMedia; namespace.bcp = bcp; namespace.bcpd = bcpd; namespace.bcpw = bcpw; namespace.bcpf = bcpf; namespace.bcpdpv = bcpdpv; namespace.setTest = setTest; namespace.setBCPDomainPrefix = setBCPDomainPrefix; namespace.setConsent = setConsent; namespace.getConsent = getConsent; namespace.getConsentCB = getConsentCB; namespace.setConsentCB = setConsentCB; LOTCC = namespace; addEvent(window, "load", doneload);
        addEvent(window, "load", loadAsync); if (autoFire) bcp(); function getConsentPre() { return getPrefix() + "privacy" + baseDomain + "/consent" } function setConsent(cb, c, co) {
            consentSetCB = cb; var t = document.createElement("script"); t.type = "text/javascript"; t.src = fpcPidAppend(getConsentPre() + "/set?c\x3d" + c + (useFPC ? "\x26fpc\x3dy" : "") + "\x26callback\x3d" + ns + ".setConsentCB\x26rand\x3d" + getRandomNumber()); if (co.hasOwnProperty("analytics")) t.src += "\x26ca\x3d" + (co.analytics ? 1 : 0); if (co.hasOwnProperty("datasharing")) t.src += "\x26cds\x3d" +
                (co.datasharing ? 1 : 0); if (co.hasOwnProperty("targeting")) t.src += "\x26cta\x3d" + (co.targeting ? 1 : 0); if (co.hasOwnProperty("crossdevice")) t.src += "\x26ccd\x3d" + (co.crossdevice ? 1 : 0); t.id = "_lotconsentset"; document.body.appendChild(t)
        } function fpcPidAppend(url) { if (useFPC) { var id = readData(_cc_idCkeName); if (id != null) url += "\x26pid\x3d" + id } return url } function getConsent(cb, c) {
            consentGetCB = cb; var t = document.createElement("script"); t.type = "text/javascript"; t.src = fpcPidAppend(getConsentPre() + "/get?c\x3d" + c + "\x26callback\x3d" +
                ns + ".getConsentCB\x26rand\x3d" + getRandomNumber()); t.id = "_lotconsentget"; document.body.appendChild(t)
        } function getConsentCB(data) { var scriptTag = document.getElementById("_lotconsentget"); document.body.removeChild(scriptTag); consentGetCB(data["Profile"]) } function setConsentCB(data) {
            var scriptTag = document.getElementById("_lotconsentset"); document.body.removeChild(scriptTag); if (!useFPC || data["cookies"] == "undefined" || data["cookies"] != null && data["cookies"].length == 0 || handleCookies(data)) consentSetCB(data["Profile"]);
            else consentSetCB({ error: 201 })
        } function flash(msg) { var div; if (div = document.getElementById("LOTCC.status")) div.innerHTML = msg } function addBehavior(id) { add("b", id) } function addAction(id) { add("act", id) } function addInterest(id) { add("int", id) } function addMedia(id) { add("med", id) } function addMemberId(id) { } function addContentId(id) { } function addOpportunityId(id) { placementOpps.p.push(id) } function addOpportunity(tag) { placementOpps.pt.push(tag) } function appendInternal(url, vals, vr) {
            if (typeof vals != "undefined" &&
                vals.length > 0) { var vn = delim + vr + "\x3d"; for (var i = 0; i < vals.length; i++)url += vn + vals[i] } return url
        } function appendAll(url) { OptimusRule.applyRBData(); for (var type in behaviors) url = appendInternal(url, behaviors[type], type); for (var pl_type in placementOpps) url = append(url, placementOpps[pl_type], pl_type); if (placementOpps.p.length > 0 || placementOpps.pt.length > 0) url = append(url, "y", "dp"); if (async_props.async) url = append(url, "y", "async"); return url } function getDomain() {
            return test ? "bcp.test.lotame.com" : bcpDomainPrefix +
                baseDomain
        } function bcp() { if (runOptimusOnly) return; if (typeof __cmp != "undefined") { setTimeout(function () { if (cmp.done == 0) { cmp.done = 2; add("cmp", "1"); add("cmpto", cmp.wait); bcpinternal() } }, cmp.wait); cmp.start = Date.now(); __cmp("getConsentData", null, function (val, success) { cmp.daisybit = val["consentData"]; if (cmp.done == 0) { cmp.done = 1; add("cmpwait", Date.now() - cmp.start); add("cmp", "1"); bcpinternal() } }) } else bcpinternal() } function bcpinternal() { namespace.loaded ? firebcp() : dobcp = true } function bcpdpv() {
            var pvbak = namespace.pvdone;
            namespace.pvdone = true; bcpd(); namespace.pvdone = pvbak
        } function bcpd(cb) { var url = appendAll(baseURL(false)); pixel(url, cb) } function bcpw() { var len = arguments.length; if (len > 0) for (var i = 0; i < len; i += 2)if (i + 1 < len) add(arguments[i], arguments[i + 1]); bcpd() } function pixel(url, cb) { var pi = new Image; pi.onload = img_done; pi.onerror = img_done; pi.onabort = img_done; bcpd_callback = cb; reset(url); pi.src = url } function img_done(url) { if (bcpd_callback) bcpd_callback() } function reset(url) {
            behaviors = {}; placementOpps = { p: [], pt: [] }; if (typeof lotbcp !=
                "undefined") lotbcp = ""; if (typeof lotact != "undefined") lotact = ""; if (typeof lotint != "undefined") lotint = ""; if (typeof lotmed != "undefined") lotmed = ""; if (url && url.indexOf(pv) > 0) namespace.pvdone = true
        } function bcpf() { firebcp(); dobcp = false } function getWaitingAddValues() { var rtn = 0; for (var type in behaviors) { var vals = behaviors[type]; if (typeof vals != "undefined") rtn += vals.length } return rtn } function executeOptimus() {
            var startCount = getWaitingAddValues(); addTrigger({
                "act": ["Superville : Section : SolicitudTarjetas : Action : Enviar"],
                location: "supervielle\\.com\\.ar/SolicitudTarjetas", element: "{{input.submitbutton}}", event: "click", opr: 65699
            }); addTrigger({ "act": ["Superville : Section : Empresas : Plan-sueldo : Action : Click Manual de Pago de Sueldo"], location: "supervielle\\.com\\.ar/Empresas/Plan\\-sueldo/", element: '{{img[title*\x3d"ManualPagoSueldo"]}}', event: "click", opr: 65700 }); addTrigger({
                "act": ["Superville : Section : Empresas : Plan-sueldo : Action : Click Registro a Superville Empresas"], location: "supervielle\\.com\\.ar/Empresas/Plan\\-sueldo/",
                element: '{{img[title*\x3d"Registro-Supervielle-empresas"]}}', event: "click", opr: 65701
            }); addTrigger({ "act": ["tiendasupervielle.com : Search Box"], location: "http\\://www\\.tiendasupervielle\\.com/", element: "{{#ftBox61427761f6c2417381946c26ec3329b4}}", event: "click", opr: 79573 }); addTrigger({ "act": ["tiendasupervielle.com : Daily Offers"], location: "http\\://www\\.tiendasupervielle\\.com/", element: "{{div.home-box:nth-of-type(2) div.slider-carousel div.owl-wrapper-outer div.owl-wrapper}}", event: "click", opr: 79574 });
            addTrigger({ "act": ["$2 : Action : PYME Click"], location: "\\://([^/]*)", element: '{{img[title*\x3d"750_Superate_Pyme_boceto_Landing_BOCETO_03"]}}', event: "click", opr: 84621 }); addTrigger({ "act": ["$2 : Action : Nuevos Emprendedores Click"], location: "\\://([^/]*)", element: '{{img[title*\x3d"750_Superate_Pyme_boceto_Landing_BOCETO_05"]}}', event: "click", opr: 84622 }); addTrigger({
                "act": ["Tienda Supervielle : Click : Viajes"], location: "(.*)", element: "{{div.content-menu-viajes.pull-left.hidden-xs.hidden-sm a}}",
                event: "click", opr: 98682
            }); addTrigger({ "int": ["fondospremier.com.ar : Total Site Traffic"], location: "fondospremier\\.com\\.ar", element: "{{html}}", opr: 65544 }); addTrigger({ "int": ["fondospremier.com.ar : Section : $1"], location: "fondospremier\\.com\\.ar/(a-zA-Z_-)($:.html)", element: "{{html}}", opr: 65545 }); addTrigger({ "int": ["fondospremier.com.ar : Section : Infomes Diarios"], location: "fondospremier\\.com\\.ar", element: "{{div.container_12 div.grid_9 div.members a:nth-of-type(2)}}", event: "click", opr: 65546 });
            addTrigger({ "int": ["aeris.com.ar : Total Site Traffic"], location: "aeris\\.com\\.ar", element: "{{html}}", opr: 65547 }); addTrigger({ "int": ["aeris.com.ar : Section : {{div.tabs nav ul li.selected}}.textContent"], location: "aeris\\.com\\.ar/(a-zA-Z_-)($:.aspx)", element: "{{div.tabs nav ul li.selected}}", opr: 65548 }); addTrigger({ "int": ["clubsupervielle.com.ar : Total Site Traffic"], location: "clubsupervielle\\.com\\.ar", element: "{{html}}", opr: 65549 }); addTrigger({
                "int": ["clubsupervielle.com.ar : Section : {{div.tabs nav ul li.selected}}.textContent"],
                location: "clubsupervielle\\.com\\.ar/(a-zA-Z_-)($:.aspx)", element: "{{div.tabs nav ul li.selected}}", opr: 65550
            }); addTrigger({ "int": ["mispuntosupervielle.com.ar : Total Site Traffic"], location: "mispuntosupervielle\\.com\\.ar", element: "{{html}}", opr: 65551 }); addTrigger({ "int": ["mispuntosupervielle.com.ar : Section : {{div.tabs nav ul li.selected}}.textContent"], location: "mispuntosupervielle\\.com\\.ar/(a-zA-Z_-)($:.aspx)", element: "{{div.tabs nav ul li.selected}}", opr: 65552 }); addTrigger({
                "int": ["supervielle.com.ar : Total Site Traffic"],
                location: "supervielle\\.com\\.ar", element: "{{html}}", opr: 65553
            }); addTrigger({ "int": ["$1 supervielle.com.ar : Total Site Traffic"], location: "\\://([a-zA-Z.]*)supervielle\\.com\\.ar", element: "{{html}}", opr: 65554 }); addTrigger({ "int": ["$1 supervielle.com.ar : Section : $2"], location: "\\://([a-zA-Z.]*)supervielle\\.com\\.ar/([a-zA-Z0-9_-]+)", element: "{{html}}", opr: 65555 }); addTrigger({
                "int": ["$1 supervielle.com.ar : Section : $2 : $3"], location: "\\://([a-zA-Z.]*)supervielle\\.com\\.ar/([a-zA-Z0-9_-]+)/([a-zA-Z0-9_-]+)",
                element: "{{html}}", opr: 65556
            }); addTrigger({ "int": ["$1 supervielle.com.ar : Section : $2 : $3 : $4"], location: "\\://([a-zA-Z.]*)supervielle\\.com\\.ar/([a-zA-Z0-9_-]+)/([a-zA-Z0-9_-]+)/([a-zA-Z0-9_-]+)", element: "{{html}}", opr: 65557 }); addTrigger({ "int": ["hipotecarios.supervielle : Total Site Traffic"], location: "hipotecarios\\.supervielle\\.com", element: "{{html}}", opr: 76245 }); addTrigger({
                "int": ["hipotecarios.supervielle : Site Section : $1"], location: "hipotecarios\\.supervielle\\.com\\.ar/([a-zA-Z0-9_-]+)",
                element: "{{html}}", opr: 76246
            }); addTrigger({ "int": ["hipotecarios.supervielle : Site Section : $2 : $1"], location: "hipotecarios\\.supervielle\\.com\\.ar/([a-zA-Z0-9_-]+)/([a-zA-Z0-9_-]+)", element: "{{html}}", opr: 76247 }); addTrigger({ "int": ["hipotecarios - formulario"], location: "https\\://hipotecarios\\.supervielle\\.com\\.ar/\\#app", element: "{{html}}", opr: 77623 }); addTrigger({
                "int": ["tiendasupervielle.com : {{#quick-menu \x3e a.viajes}}.textContent"], location: "tiendasupervielle\\.com", element: "{{#quick-menu \x3e a.viajes}}",
                event: "click", opr: 96005
            }); addTrigger({ "int": ["$1 : Total Site Traffic"], location: "\\://([^/]*)([/])", element: "{{html}}", opr: 65737 }); addTrigger({ "int": ["$1 : Site Section : $2"], location: "\\://([^/]*)/([a-zA-Z0-9_+%-]+)", element: "{{html}}", opr: 65738 }); addTrigger({ "int": ["$1 : Site Section : $2 : $3"], location: "\\://([^/]*)/([a-zA-Z0-9_+%-]+)/([a-zA-Z0-9_+%-]+)", element: "{{html}}", opr: 66883 }); addTrigger({
                "srch": ["$1 : Facebook Referral"], location: "([a-zA-Z0-9_+%-]+)(.com|.com.in|.co.uk|.in|.vn|.fm|.org|.tv|.my|.sg|.net|.pk|.ar|.br|.cl|.ec|.gy|.es|.mx|.com.co|.com.pa|.com.ve|.com.ar|.com.mx|.net|.cat)",
                element: "r{{facebook.com}}", opr: 69877
            }); addTrigger({ "srch": ["$1 : Referred from Twitter"], location: "([a-zA-Z0-9_+%-]+)(.com|.com.in|.co.uk|.in|.vn|.fm|.org|.tv|.my|.sg|.net|.pk|.ar|.br|.cl|.ec|.gy|.es|.mx|.com.co|.com.pa|.com.ve|.com.ar|.com.mx|.net|.cat)", element: "r{{twitter.com}}", opr: 69878 }); addTrigger({ "int": ["$1 : Site Section : $2 : $3 : $4"], location: "\\://([^/]*)/([a-zA-Z0-9_+%-]+)/([a-zA-Z0-9_+%-]+)/([a-zA-Z0-9_+%-]+)", element: "{{html}}", opr: 72346 }); bindTriggers(); return getWaitingAddValues() -
                startCount
        } function firebcp() {
            if (namespace.runOptimus) try { executeOptimus() } catch (exception) { } if (namespace.dropSyncPixels) {
                var url = generateFirebcpURL("5"); try {
                    var tempIFrame = document.createElement("iframe"); tempIFrame.setAttribute("id", "LOTCCFrame_" + (new Date).getTime()); url = append(url, "ifr", "rt"); tempIFrame.setAttribute("src", url.replace(/'/g, "%27")); tempIFrame.setAttribute("title", "empty"); tempIFrame.setAttribute("tabindex", "-1"); tempIFrame.setAttribute("role", "presentation"); tempIFrame.setAttribute("aria-hidden",
                        "true"); tempIFrame.style.border = "0px"; tempIFrame.style.width = "0px"; tempIFrame.style.height = "0px"; tempIFrame.style.display = "block"; document.body.appendChild(tempIFrame)
                } catch (exception) { var pixel = new Image(1, 1); pixel.src = url.replace(/'/g, "%27") }
            } reset(url)
        } function generateFirebcpURL(version) {
            var url = appendAll(baseURL(true, version)); if (typeof lotbcp != "undefined") url = append(url, lotbcp, "b"); if (typeof lotact != "undefined") url = append(url, lotact, "act"); if (typeof lotint != "undefined") url = append(url, lotint,
                "int"); if (typeof lotmed != "undefined") url = append(url, lotmed, "med"); if (includeReferrer) url = append(url, encodeURIComponent(getReferrer()), "ref"); return url
        } function doneload() { if (dobcp) bcpf(); namespace.loaded = true } function loadAsync() {
            if (async_props.async) try {
                for (type in async_props.asyncBehaviors) for (var i = 0, b; b = async_props.asyncBehaviors[type][i++];)add(type, b); for (var i = 0, id; id = async_props.asyncOpportunityIds[i++];)addOpportunityId(async_props.asyncOpportunityIds[id]); for (var i = 0, tag; tag = async_props.asyncOpportunities[i++];)addOpportunity(async_props.asyncOpportunities[tag]);
                bcp()
            } catch (e) { }
        } var placement_rules = [], addTrigger = addOptimusRule; function bindTriggers() {
            placement_rules.sort(function (a, b) { var regex = /^#/; if (regex.test(a.element) && !regex.test(b.element)) return -1; if (!regex.test(a.element) && regex.test(b.element)) return 1; return 0 }); for (var i = 0, pl; pl = placement_rules[i++];)pl.process(); if (OptimusRule.element_cache.length > 0) for (var i = OptimusRule.element_cache.length - 1; i >= 0; i--) {
                var el = OptimusRule.element_cache[i][0]; var handlers = OptimusRule.element_cache[i][1]; for (var ev in handlers) addEvent(el,
                    ev, function (h) { var evt_el = el; return function (evt) { for (var j = 0, callback; callback = h[j++];)callback.call(evt_el, evt); var hasBehaviors = false; for (var type in behaviors) { hasBehaviors = true; break } if (hasBehaviors || OptimusRule.rbData !== null) { if (runOptimusOnly) { parseQueryStringToParameters(running); add("amskip", "Y") } bcpw() } } }(handlers[ev])); delete OptimusRule.element_cache[i]; OptimusRule.element_cache.length--
            }
        } function addOptimusRule(r) { var o = new OptimusRule(r); return o.process() } function addHapaxRule(r) {
            var h =
                new HapaxRule(r); return h.process()
        } function addPlacementRule(r) { placement_rules.push(new PlacementRule(r)) } function OptimusRule(o) { o = o || {}; this.location = o.location || null; this.rule_id = o.opr || null; this.element = o.element || null; this.event = o.event || null; this.location_matches = null; this.element_matches = null; this.current_document = document; this.rbk = o.rbk || null; for (var bt in o) if (typeof o[bt] === "object" && o[bt] !== null && o[bt].length > 0) { this.behavior_type = bt; this.behavior = o[bt][0] } } OptimusRule.prototype = {
            process: function () {
                var rule_matches =
                    0; if (!this.is_valid()) return false; for (var href in this.document_map) {
                        if (this.document_map[href] === null) continue; var loc_match = null; try { var re = new RegExp(this.location); loc_match = re.exec(href) } catch (e) { this.add("opterr") } if (loc_match === null) continue; this.location_matches = loc_match; var doc = this.document_map[href]; if (this.element !== null) {
                            this.query_regex.lastIndex = 0; var query_element = this.query_regex.test(this.element) ? this.element : "{{#" + this.element + "}}"; var elm_match = this.query(query_element, doc);
                            if (elm_match.length == 0 && this.event == null) continue; var missing_property = false; for (var i = 0, el; el = elm_match[i++];)if (typeof el["property_name"] !== "undefined" && el["property_name"] !== null && el["property_content"] === null) missing_property = true; if (missing_property) continue; this.element_matches = elm_match; this.event !== null ? this.create_event(doc) : this.match(doc); rule_matches++
                        } else { this.match(doc); rule_matches++ }
                    } return rule_matches
            }, match: function (doc) {
                var matches = this.query(this.behavior, doc); if (this.rbk ===
                    null) {
                        var p_behavior = this.behavior; for (var i = 0, m; m = matches[i++];)p_behavior = p_behavior.replace(m.expression, m.property_content !== null ? m.property_content : ""); p_behavior = p_behavior.replace(this.query_regex, ""); if (this.location_matches !== null && this.location_matches.length > 0) for (var i = 0; i < this.location_matches.length; i++) { var sub_regex = new RegExp("\\$" + i.toString() + "\\b"); p_behavior = p_behavior.replace(sub_regex, this.location_matches[i]) } if (p_behavior !== "") {
                            p_behavior = "#OpR#" + this.rule_id + "#" + decodeURI(p_behavior);
                            this.add(p_behavior)
                        }
                } else this.matchRBK(matches)
            }, matchRBK: function (matches) {
                var rbVals = []; var locs = this.location_matches; var subRegexes = []; if (locs !== null && locs.length > 0) for (var i = 0; i < locs.length; i++)subRegexes.push(new RegExp("\\$" + i.toString() + "\\b")); var addToVals = function (v) { if (v !== "") { for (var i = 0; i < subRegexes.length; i++)v = v.replace(subRegexes[i], locs[i]); rbVals.push(v) } }; if (matches.length > 0) for (var i = 0, m; m = matches[i++];)if (typeof m.properties !== "undefined" && m.properties.length > 0) for (var x = 0,
                    p; p = m.properties[x++];)addToVals(("" + this.behavior).replace(m.expression, p)); else addToVals(("" + this.behavior).replace(m.expression, m.property_content !== null ? m.property_content : "")); else { var v = ("" + this.behavior).replace(this.query_regex, ""); addToVals(v) } if (rbVals.length > 0) OptimusRule.addRBData(this.rbk, rbVals)
            }, add: function (b) { add(this.behavior_type, b) }, create_event: function (doc) {
                var bind_to = []; if (this.element_matches.length > 0) for (var i = 0; i < this.element_matches.length; i++)for (var j = 0; j < this.element_matches[i]["elements"].length; j++)bind_to.push(this.element_matches[i]["elements"][j]);
                else if (this.element_matches.length == 0 && this.event == "click") bind_to.push(doc); else return false; var create_callback = function (curr_elm, inst) {
                    var curDoc = doc; return function (evt) {
                        if (curr_elm === curDoc && inst.element !== null) {
                            var els = inst.query(inst.element, curDoc); if (els.length == 0) return; for (var i = 0, el_list; el_list = els[i++];) {
                                var found = false; if (el_list.elements && el_list.elements.length > 0) for (var j = 0, el; el = el_list.elements[j++];)if (evt.target && evt.target == el || evt.srcElement && evt.srcElement == el) {
                                    inst.match(curDoc);
                                    found = true; break
                                } if (found) break
                            }
                        } else if (this === curr_elm) inst.match(curDoc)
                    }
                }; for (var i = 0, curr_elm; curr_elm = bind_to[i++];) {
                    if (!(curr_elm.nodeType && (curr_elm.nodeType == 1 || curr_elm.nodeType == 9))) continue; var found = false; for (var j = 0, arr_elm; arr_elm = OptimusRule.element_cache[j++];) { if (!isArray(arr_elm)) continue; var cached_elm = arr_elm[0]; var handler = arr_elm[1]; if (curr_elm === cached_elm) { if (!(this.event in handler)) handler[this.event] = []; handler[this.event].push(create_callback(curr_elm, this)); found = true } } if (found ===
                        false) { var new_elm = [curr_elm, {}]; new_elm[1][this.event] = [create_callback(curr_elm, this)]; OptimusRule.element_cache.push(new_elm) }
                } return OptimusRule.element_cache
            }, is_valid: function () {
                var valid = true; if (this.location === "" || this.location === null || typeof this.location !== "string") valid = false; if (this.rule_id === null || isNaN(parseInt(this.rule_id, 10))) valid = false; if (this.element !== null && typeof this.element !== "string") valid = false; if (this.event !== null && (this.element == null || typeof this.event !== "string")) valid =
                    false; return valid
            }, filter: function (c) { var str = c.replace(/<\/?[^>]+\/?>/gi, "").replace(/\n|\t|\r/gi, " ").replace(/\s{2,}/g, " ").replace(/\[quote\][\s\S]*\[\/quote\]/gi, ""); try { str = decodeURIComponent(str) } catch (e) { } if (typeof client !== "undefined" && client == 2241) str = str.replace(/[^\u0020-\u007e]/g, ""); return str }, query: function (q, doc) {
                var matches = [], results, expr, selector, property, els, prefix; try {
                    this.query_regex.lastIndex = 0; while ((results = this.query_regex.exec(q)) !== null) {
                        expr = results[0]; prefix = results[1] ||
                            "e"; selector = results[2]; property = results[4] || null; els = typeof OptimusRule.supported_sources[prefix] === "function" ? OptimusRule.supported_sources[prefix].call(this, selector, property, doc) : []; if (els.length > 0) matches.push({ expression: expr, elements: els[0], property_name: property, property_content: els[1], properties: els[2] })
                    }
                } catch (e) { this.add("opterr"); matches = [] } return matches
            }, query_regex: /([a-zA-Z]+)?\{\{([^}}]*)\}\}(\.([a-zA-Z0-9\._-]+))?/g, document_map: function (w, doc_map) {
                doc_map[w.location.href] = w.document;
                var has_access = false; if (window.parent != w) { try { if (w.parent.location.href) { has_access = true; return arguments.callee(w.parent, doc_map) } } catch (e) { } if (!has_access) if (w.document.referrer !== "") doc_map[w.document.referrer] = null } return doc_map
            }(window, {})
        }; OptimusRule.element_cache = []; OptimusRule.supported_sources = {
            e: function (s, p, d) {
                p = p || "value"; var els = this.query_by_selector(s, d); var props = []; for (var i = 0, e; e = els[i++];) {
                    var prop_arr = p.split("."); for (var j = 0; typeof e[prop_arr[j]] !== "undefined"; j++)e = e[prop_arr[j]];
                    if (j === prop_arr.length) props.push(this.filter(e.toString()))
                } var p_content = props.length > 0 ? props.join(",") : null; return els.length > 0 ? [els, p_content, props] : []
            }, r: function (s, p, d) { p = parseInt(p, 10) || 0; var re = new RegExp(s); var matches = re.exec(d.referrer); var r_prop = matches !== null && typeof matches[p] !== "undefined" ? this.filter(matches[p]) : null; return r_prop !== null ? [matches, r_prop, [r_prop]] : [] }
        }; OptimusRule.rbData = null; OptimusRule.addRBData = function (k, a) {
            OptimusRule.rbData = OptimusRule.rbData || {}; if (typeof OptimusRule.rbData[k] ===
                "undefined") OptimusRule.rbData[k] = a.length > 1 ? a : a[0]; else { if (window.toString.call(OptimusRule.rbData[k]) !== "[object Array]") OptimusRule.rbData[k] = [OptimusRule.rbData[k]]; Array.prototype.push.apply(OptimusRule.rbData[k], a) }
        }; OptimusRule.applyRBData = function () { if (OptimusRule.rbData !== null) { add("rb", JSON.stringify(OptimusRule.rbData)); OptimusRule.rbData = null } }; function HapaxRule(h) { OptimusRule.call(this, h); this.behavior_type = "ugc"; this.behavior = h["ug"][0] || null } HapaxRule.prototype = new OptimusRule; HapaxRule.prototype.is_valid =
            function () { var valid = true; if (this.location === "" || this.location === null || typeof this.location !== "string") valid = false; if (this.element === "" || this.element === null || typeof this.element !== "string") valid = false; if (this.event === "" || this.event === null || typeof this.event !== "string") valid = false; if (this.behavior === "" || this.behavior === null || typeof this.behavior !== "object") valid = false; return valid }; function PlacementRule(p) {
                OptimusRule.call(this, p); this.placement_id = p.placement_id || null; this.placement = p.placement ||
                    null
            } PlacementRule.prototype = new OptimusRule; PlacementRule.prototype.process = function () { if (!this.is_valid) return false; var els = this.query(this.query_regex.test(this.element) ? this.element : "{{" + this.element + "}}", document); if (els.length <= 0) return false; if (this.placement_id !== null) this.addOpportunityId(); else if (this.placement !== null) this.addOpportunity(); else return false; return true }; PlacementRule.prototype.addOpportunityId = function () { addOpportunityId(this.placement_id) }; PlacementRule.prototype.addOpportunity =
                function () { addOpportunity(this.placement) }; PlacementRule.prototype.is_valid = function () { var valid = true; if ((this.placement == null || typeof this.placement !== "string") && (this.placement_id == null || isNaN(parseInt(this.placement_id, 10)))) valid = false; if (this.element === "" || this.element === null || typeof this.element !== "string") valid = false; return valid }; (function () {
                    var doc = document; var isIE = /(?!.*?opera.*?)msie(?!.*?opera.*?)/i.test(navigator.userAgent); var isWebKit = /webkit/i.test(navigator.userAgent); var cache =
                        {}; var cacheOn = !isIE && !isWebKit; var persistCache = {}; var _uid = 0; var reg = { trim: /^\s+|\s+$/g, quickTest: /^[^:\[>+~ ,]+$/, typeSelector: /(^[^\[:]+?)(?:\[|:|$)/, tag: /^(\w+|\*)/, id: /^(\w*|\*)#/, classRE: /^(\w*|\*)\./, attributeName: /(\w+)(?:[!+~*\^$|=])|\w+/, attributeValue: /(?:[!+~*\^$|=]=*)(.+)(?:\])/, pseudoName: /(:[^\(]+)/, pseudoArgs: /(?:\()(.+)(?:\))/, nthParts: /([+-]?\d)*(n)([+-]\d+)*/i, combinatorTest: /[+>~ ](?![^\(]+\)|[^\[]+\])/, combinator: /\s*[>~]\s*(?![=])|\s*\+\s*(?![0-9)])|\s+/g, recursive: /:(not|has)\((\w+|\*)?([#.](\w|\d)+)*(:(\w|-)+(\([^\)]+\))?|\[[^\}]+\])*(\s*,\s*(\w+|\*)?([#.](\w|\d)+)*(:(\w|-)+(\([^\)]+\))?|\[[^\}]+\])*)*\)/gi };
                    var arrayIt = function (a) { if (!!(window.attachEvent && !window.opera)) return function (a) { if (a instanceof Array) return a; for (var i = 0, result = [], m; m = a[i++];)result[result.length] = m; return result }; else return function (a) { return Array.prototype.slice.call(a) } }(null); function filter(a, tag) { var r = [], uids = {}; if (tag) tag = new RegExp("^" + tag + "$", "i"); for (var i = 0, ae; ae = a[i++];) { ae.uid = ae.uid || _uid++; if (!uids[ae.uid] && (!tag || ae.nodeName.search(tag) !== -1)) r[r.length] = uids[ae.uid] = ae } return r } function getAttribute(e,
                        a) { if (!e) return null; if (a === "class" || a === "className") return e.className; if (a === "for") return e.htmlFor; return e.getAttribute(a) || e[a] } function getByClass(selector, selectorRE, root, includeRoot, cacheKey, tag, flat) {
                            var result = []; if (!!flat) return selectorRE.test(root.className) ? [root] : []; if (root.getElementsByClassName) {
                                result = arrayIt(root.getElementsByClassName(selector)); if (!!includeRoot) if (selectorRE.test(root.className)) result[result.length] = root; if (tag != "*") result = filter(result, tag); cache[cacheKey] =
                                    result.slice(0); return result
                            } else if (doc.getElementsByClassName) { result = arrayIt(doc.getElementsByClassName(selector)); if (tag != "*") result = filter(result, tag); cache[cacheKey] = result.slice(0); return result } var es = tag == "*" && root.all ? root.all : root.getElementsByTagName(tag); if (!!includeRoot) es[es.length] = root; for (var index = 0, e; e = es[index++];)if (selectorRE.test(e.className)) result[result.length] = e; return result
                        } function getById(selector, root, includeRoot, cacheKey, tag, flat) {
                            var rs, result = []; if (!!flat) return getAttribute(root,
                                "id") === selector ? [root] : []; if (root.getElementById) rs = root.getElementById(selector); else rs = doc.getElementById(selector); if (rs && getAttribute(rs, "id") === selector) { result[result.length] = rs; cache[cacheKey] = result.slice(0); return result } var es = root.getElementsByTagName(tag); if (!!includeRoot) es[es.length] = root; for (var index = 0, e; e = es[index++];)if (getAttribute(e, "id") === selector) { result[result.length] = e; break } return result
                        } function getContextFromSequenceSelector(selector, roots, includeRoot, flat) {
                            var context,
                            contextRE, tag, contextType = "", result = [], tResult = [], root, rootCount, rootsLength; reg.id.lastIndex = reg.typeSelector.lastIndex = reg.classRE.lastIndex = 0; if (!reg.tag.test(selector)) selector = "*" + selector; context = reg.typeSelector.exec(selector)[1]; roots = roots instanceof Array ? roots.slice(0) : [roots]; rootsLength = roots.length; rootCount = rootsLength - 1; if (reg.id.test(context)) { contextType = "id"; tag = (tag = context.match(/^\w+/)) ? tag[0] : "*"; context = context.replace(reg.id, "") } else if (reg.classRE.test(context)) {
                                contextType =
                                "class"; tag = (tag = context.match(reg.tag)) ? tag[0] : "*"; context = context.replace(reg.tag, ""); contextRE = persistCache[context + "RegExp"] || (persistCache[context + "RegExp"] = new RegExp("(?:^|\\s)" + context.replace(/\./g, "\\s*") + "(?:\\s|$)")); context = context.replace(/\./g, " ")
                            } while (rootCount > -1) {
                                root = roots[rootCount--]; root.uid = root.uid || _uid++; var cacheKey = selector + root.uid; if (cacheOn && cache[cacheKey]) { result = result.concat(cache[cacheKey]); continue } if (contextType === "id") tResult = getById(context, root, includeRoot,
                                    cacheKey, tag, flat); else if (contextType === "class") tResult = getByClass(context, contextRE, root, includeRoot, cacheKey, tag, flat); else { tResult = arrayIt(root.getElementsByTagName(context)); if (!!includeRoot && (root.nodeName.toUpperCase() === context.toUpperCase() || context === "*")) tResult[tResult.length] = root } result = rootsLength > 1 ? result.concat(tResult) : tResult; cache[cacheKey] = result.slice(0)
                            } return result
                        } var peppy = {
                            query: function (selectorGroups, root, includeRoot, recursed, flat) {
                                var elements = []; if (!recursed) selectorGroups =
                                    selectorGroups.replace(reg.trim, "").replace(/(\[)\s+/g, "$1").replace(/\s+(\])/g, "$1").replace(/(\[[^\] ]+)\s+/g, "$1").replace(/\s+([^ \[]+\])/g, "$1").replace(/(\()\s+/g, "$1").replace(/(\+)([^0-9])/g, "$1 $2").replace(/['"]/g, "").replace(/\(\s*even\s*\)/gi, "(2n)").replace(/\(\s*odd\s*\)/gi, "(2n+1)"); if (typeof root === "string") root = (root = getContextFromSequenceSelector(root, doc)).length > 0 ? root : undefined; root = root || doc; root.uid = root.uid || _uid++; var cacheKey = selectorGroups + root.uid; if (cacheOn && cache[cacheKey]) return cache[cacheKey];
                                reg.quickTest.lastIndex = 0; if (reg.quickTest.test(selectorGroups)) { elements = getContextFromSequenceSelector(selectorGroups, root, includeRoot, flat); return cache[cacheKey] = elements.slice(0) } var groupsWorker, groups, selector; groupsWorker = selectorGroups.split(/\s*,\s*/g); groups = groupsWorker.length > 1 ? [""] : groupsWorker; for (var gwi = 0, tc = 0, gi = 0, g; groupsWorker.length > 1 && (g = groupsWorker[gwi++]) !== undefined;) {
                                    var l, r; tc += ((l = g.match(/\(/g)) ? l.length : 0) - ((r = g.match(/\)/g)) ? r.length : 0); groups[gi] = groups[gi] || ""; groups[gi] +=
                                        groups[gi] === "" ? g : "," + g; if (tc === 0) gi++
                                } var gCount = 0; while ((selector = groups[gCount++]) !== undefined) {
                                    reg.quickTest.lastIndex = 0; if (reg.quickTest.test(selector)) { result = getContextFromSequenceSelector(selector, root, includeRoot, flat); elements = groups.length > 1 ? elements.concat(result) : result; continue } reg.combinatorTest.lastIndex = 0; if (reg.combinatorTest.test(selector)) {
                                        var parts, pLength, pCount = 0, combinators, cCount = 0, result; parts = selector.split(reg.combinator); pLength = parts.length; combinators = selector.match(reg.combinator) ||
                                            [""]; while (pCount < pLength) { var c, part1, part2; c = combinators[cCount++].replace(reg.trim, ""); part1 = result || peppy.query(parts[pCount++], root, includeRoot, true, flat); part2 = peppy.query(parts[pCount++], c == "" || c == "\x3e" ? part1 : root, c == "" || c == "\x3e", true, flat); result = peppy.queryCombinator(part1, part2, c) } elements = groups.length > 1 ? elements.concat(result) : result; result = undefined
                                    } else { result = peppy.querySelector(selector, root, includeRoot, flat); elements = groups.length > 1 ? elements.concat(result) : result }
                                } if (groups.length >
                                    1) elements = filter(elements); return cache[cacheKey] = elements.slice(0)
                            }, queryCombinator: function (l, r, c) { var result = [], uids = {}, proc = {}, succ = {}, fail = {}, combinatorCheck = peppy.simpleSelector.combinator[c]; for (var li = 0, le; le = l[li++];) { le.uid = le.uid || _uid++; uids[le.uid] = le } for (var ri = 0, re; re = r[ri++];) { re.uid = re.uid || _uid++; if (!proc[re.uid] && combinatorCheck(re, uids, fail, succ)) result[result.length] = re; proc[re.uid] = re } return result }, querySelector: function (selector, root, includeRoot, flat) {
                                var context, passed = [],
                                count, totalCount, e, first = true; context = getContextFromSequenceSelector(selector, root, includeRoot, flat); count = context.length; totalCount = count - 1; var tests, recursive; if (/:(not|has)/i.test(selector)) { recursive = selector.match(reg.recursive); selector = selector.replace(reg.recursive, "") } if (!(tests = selector.match(/:(\w|-)+(\([^\(]+\))*|\[[^\[]+\]/g))) tests = []; if (recursive) tests = tests.concat(recursive); var aTest; while ((aTest = tests.pop()) !== undefined) {
                                    var pc = persistCache[aTest], testFuncScope, testFunc, testFuncKey,
                                    testFuncArgs = [], isCountTest = false; passed = []; if (pc) { testFuncKey = pc[0]; testFuncScope = pc[1]; testFuncArgs = pc.slice(2); testFunc = testFuncScope[testFuncKey] } else if (!/^:/.test(aTest)) { var n = aTest.match(reg.attributeName); var v = aTest.match(reg.attributeValue); testFuncArgs[1] = n[1] || n[0]; testFuncArgs[2] = v ? v[1] : ""; testFuncKey = "" + aTest.match(/[~!+*\^$|=]/); testFuncScope = peppy.simpleSelector.attribute; testFunc = testFuncScope[testFuncKey]; persistCache[aTest] = [testFuncKey, testFuncScope].concat(testFuncArgs) } else {
                                        var pa =
                                            aTest.match(reg.pseudoArgs); testFuncArgs[1] = pa ? pa[1] : ""; testFuncKey = aTest.match(reg.pseudoName)[1]; testFuncScope = peppy.simpleSelector.pseudos; if (/nth-(?!.+only)/i.test(aTest)) { var a, b, nArg = testFuncArgs[1], nArgPC = persistCache[nArg]; if (nArgPC) { a = nArgPC[0]; b = nArgPC[1] } else { var nParts = nArg.match(reg.nthParts); if (nParts) { a = parseInt(nParts[1], 10) || 0; b = parseInt(nParts[3], 10) || 0; if (/^\+n|^n/i.test(nArg)) a = 1; else if (/^-n/i.test(nArg)) a = -1; testFuncArgs[2] = a; testFuncArgs[3] = b; persistCache[nArg] = [a, b] } } } else if (/^:contains/.test(aTest)) {
                                                var cArg =
                                                    testFuncArgs[1]; var cArgPC = persistCache[cArg]; if (cArgPC) testFuncArgs[1] = cArgPC; else testFuncArgs[1] = persistCache[cArg] = new RegExp(cArg)
                                            } testFunc = testFuncScope[testFuncKey]; persistCache[aTest] = [testFuncKey, testFuncScope].concat(testFuncArgs)
                                    } isCountTest = /^:(nth[^-]|eq|gt|lt|first|last)/i.test(aTest); if (isCountTest) testFuncArgs[3] = totalCount; var cLength = context.length, cCount = cLength - 1; while (cCount > -1) {
                                        e = context[cCount--]; if (first) e.peppyCount = cCount + 1; var pass = true; testFuncArgs[0] = e; if (isCountTest) testFuncArgs[2] =
                                            e.peppyCount; if (!testFunc.apply(testFuncScope, testFuncArgs)) pass = false; if (pass) passed.push(e)
                                    } context = passed; first = false
                                } return passed
                            }, simpleSelector: {
                                attribute: {
                                    "null": function (e, a, v) { return !!getAttribute(e, a) }, "\x3d": function (e, a, v) { return getAttribute(e, a) == v }, "~": function (e, a, v) { return getAttribute(e, a).match(new RegExp("\\b" + v + "\\b")) }, "^": function (e, a, v) { return getAttribute(e, a).indexOf(v) === 0 }, "$": function (e, a, v) { var attr = getAttribute(e, a); return attr.lastIndexOf(v) === attr.length - v.length },
                                    "*": function (e, a, v) { return getAttribute(e, a).indexOf(v) != -1 }, "|": function (e, a, v) { return getAttribute(e, a).match("^" + v + "-?((" + v + "-)*(" + v + "$))*") }, "!": function (e, a, v) { return getAttribute(e, a) !== v }
                                }, pseudos: {
                                    ":root": function (e) { return e === doc.getElementsByTagName("html")[0] ? true : false }, ":nth-child": function (e, n, a, b, t) {
                                        if (!e.nodeIndex) {
                                            var node = e.parentNode.firstChild, count = 0, last; for (; node; node = node.nextSibling)if (node.nodeType == 1) { last = node; node.nodeIndex = ++count } last.IsLastNode = true; if (count == 1) last.IsOnlyChild =
                                                true
                                        } var position = e.nodeIndex; if (n == "first") return position == 1; if (n == "last") return !!e.IsLastNode; if (n == "only") return !!e.IsOnlyChild; return !a && !b && position == n || (a == 0 ? position == b : a > 0 ? position >= b && (position - b) % a == 0 : position <= b && (position + b) % a == 0)
                                    }, ":nth-last-child": function (e, n) { return this[":nth-child"](e, n) }, ":nth-of-type": function (e, n, t) { return this[":nth-child"](e, n, null, null, t) }, ":nth-last-of-type": function (e, n, t) { return this[":nth-child"](e, n, null, null, t) }, ":first-child": function (e) {
                                        return this[":nth-child"](e,
                                            "first")
                                    }, ":last-child": function (e) { return this[":nth-child"](e, "last") }, ":first-of-type": function (e, n, t) { return this[":nth-child"](e, "first", null, null, t) }, ":last-of-type": function (e, n, t) { return this[":nth-child"](e, "last", null, null, t) }, ":only-child": function (e) { return this[":nth-child"](e, "only") }, ":only-of-type": function (e, n, t) { return this[":nth-child"](e, "only", null, null, t) }, ":empty": function (e) {
                                        for (var node = e.firstChild; node !== null; node = node.nextSibling)if (node.nodeType === 1 || node.nodeType === 3) return false;
                                        return true
                                    }, ":not": function (e, s) { return peppy.query(s, e, true, true, true).length === 0 }, ":has": function (e, s) { return peppy.query(s, e, true, true, true).length > 0 }, ":selected": function (e) { return e.selected }, ":hidden": function (e) { return e.type === "hidden" || e.style.display === "none" }, ":visible": function (e) { return e.type !== "hidden" && e.style.display !== "none" }, ":input": function (e) { return e.nodeName.search(/input|select|textarea|button/i) !== -1 }, ":radio": function (e) { return e.type === "radio" }, ":checkbox": function (e) {
                                        return e.type ===
                                            "checkbox"
                                    }, ":text": function (e) { return e.type === "text" }, ":header": function (e) { return e.nodeName.search(/h\d/i) !== -1 }, ":enabled": function (e) { return !e.disabled && e.type !== "hidden" }, ":disabled": function (e) { return e.disabled }, ":checked": function (e) { return e.checked }, ":contains": function (e, s) { return s.test(e.textContent || e.innerText || "") }, ":parent": function (e) { return !!e.firstChild }, ":odd": function (e) { return this[":nth-child"](e, "2n+2", 2, 2) }, ":even": function (e) { return this[":nth-child"](e, "2n+1", 2, 1) }, ":nth": function (e,
                                        s, i) { return s == i }, ":eq": function (e, s, i) { return s == i }, ":gt": function (e, s, i) { return i > s }, ":lt": function (e, s, i) { return i < s }, ":first": function (e, s, i) { return i == 0 }, ":last": function (e, s, i, end) { return i == end }
                                }, combinator: {
                                    "": function (r, u, f, s) { var rUID = r.uid; while ((r = r.parentNode) !== null && !f[r.uid]) if (!!u[r.uid] || !!s[r.uid]) return s[rUID] = true; return f[rUID] = false }, "\x3e": function (r, u, f, s) { return r.parentNode && u[r.parentNode.uid] }, "+": function (r, u, f, s) {
                                        while ((r = r.previousSibling) !== null && !f[r.uid]) if (r.nodeType ===
                                            1) return r.uid in u; return false
                                    }, "~": function (r, u, f, s) { var rUID = r.uid; while ((r = r.previousSibling) !== null && !f[r.uid]) if (!!u[r.uid] || !!s[r.uid]) return s[rUID] = true; return f[rUID] = false }
                                }
                            }
                        }; if (doc.querySelectorAll) (function () { var oldpeppy = peppy.query; peppy.query = function (sel, context) { context = context || doc; if (context === doc) try { return context.querySelectorAll(sel) } catch (e) { } return oldpeppy.apply(oldpeppy, arrayIt(arguments)) } })(); else {
                            var clearCache = function () { cache = {} }; if (doc.addEventListener) {
                                doc.addEventListener("DOMAttrModified",
                                    clearCache, false); doc.addEventListener("DOMNodeInserted", clearCache, false); doc.addEventListener("DOMNodeRemoved", clearCache, false)
                            } else if (doc.attachEvent) { doc.attachEvent("DOMAttrModified", clearCache); doc.attachEvent("DOMNodeInserted", clearCache); doc.attachEvent("DOMNodeRemoved", clearCache) }
                        } OptimusRule.prototype.query_by_selector = function () { try { return peppy.query.apply(peppy, arguments) } catch (e) { if (typeof console != "undefined") console.log("Error processing selector: " + arguments[0]); return [] } }
                })();
        if (runOptimusOnly) { if (executeOptimus() > 0) { add("amskip", "Y"); bcpd() } return } bcp()
    }; ccJs()
})();