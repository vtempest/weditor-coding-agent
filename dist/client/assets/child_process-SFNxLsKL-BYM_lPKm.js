const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-hG14gnXQ.js","assets/index--2C-3QU1.js","assets/framework-BxJhUdbf.js"])))=>i.map(i=>d[i]);
import{_ as Qe}from"./index--2C-3QU1.js";import{_ as Jn,g as Z,D as Xe,c as Yn,s as Rt,S as Ze,i as de,f as et,a as zn,P as Kn,b as Ee,d as Qn,r as Xn,B as N,V as J,N as je,M as fe,E as Pt,W as Zn,R as Ht,p as er,e as tr,h as nr,o as y,j as be,k as b,l as tt,G as Fe,m as Y,C as nt,n as rr,q as sr}from"./index-hG14gnXQ.js";import"./framework-BxJhUdbf.js";var or=Object.defineProperty,ir=(he,I,me)=>I in he?or(he,I,{enumerable:!0,configurable:!0,writable:!0,value:me}):he[I]=me,ee=(he,I,me)=>ir(he,typeof I!="symbol"?I+"":I,me);let te,Bt,ar,rt,Tt,Nt,st,We,jt,De,Ft,Wt,cr,Ot,Mt,Lt,ot,Ut,Gt,lr,Vt,qt,Jt,Yt,zt,Kt,hr=Promise.all([(()=>{try{return Jn}catch{}})()]).then(async()=>{class he{constructor(e,r){ee(this,"volume"),ee(this,"cwd"),ee(this,"env"),ee(this,"commands",new Map),ee(this,"lastExit",0),ee(this,"aliases",new Map),ee(this,"_execQueue",Promise.resolve({stdout:"",stderr:"",exitCode:0})),ee(this,"_spawnChild",null),this.volume=e,this.cwd=r?.cwd??"/",this.env=r?.env?{...r.env}:{},this.env.PWD=this.cwd}registerCommand(e){this.commands.set(e.name,e)}setSpawnChildCallback(e){this._spawnChild=e}getSpawnChildCallback(){return this._spawnChild}getCwd(){return this.cwd}setCwd(e){this.cwd=e,this.env.PWD=e}getEnv(){return this.env}async exec(e,r){if(r?.cwd||r?.env){const t=this._execQueue;let o;this._execQueue=new Promise(s=>{o=s}),await t.catch(()=>{});try{const s=await this._execInner(e,r);return o(s),s}catch(s){const a={stdout:"",stderr:`shell: ${s instanceof Error?s.message:String(s)}
`,exitCode:1};return o(a),a}}return this._execInner(e,r)}async _execInner(e,r){const t=this.cwd,o={...this.env};r?.cwd&&(this.cwd=r.cwd,this.env.PWD=r.cwd),r?.env&&Object.assign(this.env,r.env);try{const s=await this.expandCommandSubstitution(e),a=er(s,this.env,this.lastExit);return await this.execList(a)}catch(s){return{stdout:"",stderr:`shell: ${s instanceof Error?s.message:String(s)}
`,exitCode:1}}finally{if(r?.cwd&&this.cwd===r.cwd&&(this.cwd=t,this.env.PWD=t),r?.env)for(const s of Object.keys(r.env))s in o?this.env[s]=o[s]:delete this.env[s]}}async execList(e){let r={stdout:"",stderr:"",exitCode:0};for(let t=0;t<e.entries.length;t++){const o=e.entries[t],s=await this.execPipeline(o.pipeline);if(r={stdout:r.stdout+s.stdout,stderr:r.stderr+s.stderr,exitCode:s.exitCode},this.lastExit=s.exitCode,o.next==="&&"&&s.exitCode!==0||o.next==="||"&&s.exitCode===0)break}return r}async execPipeline(e){if(e.commands.length===1)return this.execCommand(e.commands[0]);let r,t={stdout:"",exitCode:0},o="";for(const s of e.commands){const a=await this.execCommand(s,r);o+=a.stderr,r=a.stdout,t=a}return{stdout:t.stdout,stderr:o,exitCode:t.exitCode}}async execCommand(e,r){if(e.args.length===0){for(const[c,d]of Object.entries(e.assignments))this.env[c]=d;return{stdout:"",stderr:"",exitCode:0}}let t=[];for(const c of e.args)t.push(...tr(c,this.cwd,this.volume));const o=this.aliases.get(t[0]);if(o&&(t=[...o.split(/\s+/),...t.slice(1)]),t[0]==="sh"&&t[1]==="-c"&&t[2])return this.exec(t[2],{cwd:this.cwd,env:this.env});const s=t[0],a=t.slice(1);if(r===void 0){for(const c of e.redirects)if(c.type==="read"){const d=this.resolvePath(c.target);try{r=this.volume.readFileSync(d,"utf8")}catch{return{stdout:"",stderr:`shell: ${c.target}: No such file or directory
`,exitCode:1}}}}const u={};for(const[c,d]of Object.entries(e.assignments))u[c]=this.env[c],this.env[c]=d;const i=this.buildContext();let f;const l=nr.get(s);if(l){const c=l(a,i,r);f=c instanceof Promise?await c:c,s==="cd"&&(this.cwd=i.cwd,this.env=i.env),(s==="export"||s==="unset")&&(this.env=i.env)}else if(s==="alias")f=this.handleAlias(a);else if(s==="source"||s===".")f=await this.handleSource(a);else if(s==="history")f={stdout:"",stderr:"",exitCode:0};else if(this.commands.has(s)){try{f=await this.commands.get(s).execute(a,i)}catch(c){const d=c instanceof Error?c.message:String(c);f={stdout:"",stderr:`${s}: ${d}
`,exitCode:1}}this.cwd=i.cwd,this.env=i.env}else{const c=this.resolveFromPath(s);if(c&&this.commands.has("node")){try{f=await this.commands.get("node").execute([c,...a],i)}catch(d){const h=d instanceof Error?d.message:String(d);f={stdout:"",stderr:`${s}: ${h}
`,exitCode:1}}this.cwd=i.cwd,this.env=i.env}else f={stdout:"",stderr:`${s}: command not found
`,exitCode:127}}for(const[c,d]of Object.entries(u))d===void 0?delete this.env[c]:this.env[c]=d;return f=await this.applyRedirects(f,e),this.lastExit=f.exitCode,f}buildContext(){return{cwd:this.cwd,env:{...this.env},volume:this.volume,exec:(e,r)=>this.exec(e,r)}}resolvePath(e){return e.startsWith("/")?this.normalizePath(e):this.normalizePath(`${this.cwd}/${e}`)}resolveFromPath(e){const t=(this.env.PATH||"").split(":");for(const o of t){if(!o)continue;const s=`${o}/${e}`;if(this.volume.existsSync(s))try{const a=this.volume.readFileSync(s,"utf8"),u=a.match(/node\s+"([^"]+)"/);if(u&&this.volume.existsSync(u[1]))return u[1];if(a.startsWith("#!/")||a.startsWith("'use strict'")||a.startsWith('"use strict"')||a.startsWith("var ")||a.startsWith("const ")||a.startsWith("import ")||a.startsWith("module."))return s}catch{}}return null}normalizePath(e){const r=e.split("/").filter(Boolean),t=[];for(const o of r)o===".."?t.pop():o!=="."&&t.push(o);return"/"+t.join("/")}async applyRedirects(e,r){let{stdout:t,stderr:o,exitCode:s}=e;for(const a of r.redirects){if(a.type==="stderr-to-stdout"){t+=o,o="";continue}if(a.type==="write"||a.type==="append"){const u=this.resolvePath(a.target);try{if(a.type==="append"&&this.volume.existsSync(u)){const i=this.volume.readFileSync(u,"utf8");this.volume.writeFileSync(u,i+t)}else{const i=this.normalizePath(u.substring(0,u.lastIndexOf("/")));i&&i!=="/"&&!this.volume.existsSync(i)&&this.volume.mkdirSync(i,{recursive:!0}),this.volume.writeFileSync(u,t)}t=""}catch(i){o+=`shell: ${a.target}: ${i instanceof Error?i.message:"Cannot write"}
`,s=1}}}return{stdout:t,stderr:o,exitCode:s}}async expandCommandSubstitution(e){let r="",t=0;for(;t<e.length;){if(e[t]==="'"){for(r+="'",t++;t<e.length&&e[t]!=="'";)r+=e[t++];t<e.length&&(r+=e[t++]);continue}if(e[t]==="$"&&e[t+1]==="("){t+=2;let o=1,s="";for(;t<e.length&&o>0;)e[t]==="("&&o++,e[t]===")"&&o--,o>0&&(s+=e[t]),t++;const a=await this.exec(s);r+=a.stdout.replace(/\n$/,"");continue}if(e[t]==="`"){t++;let o="";for(;t<e.length&&e[t]!=="`";)o+=e[t++];t<e.length&&t++;const s=await this.exec(o);r+=s.stdout.replace(/\n$/,"");continue}r+=e[t++]}return r}handleAlias(e){if(e.length===0){let r="";for(const[t,o]of this.aliases)r+=`alias ${t}='${o}'
`;return{stdout:r,stderr:"",exitCode:0}}for(const r of e){const t=r.indexOf("=");if(t>0){let o=r.slice(t+1);(o.startsWith("'")&&o.endsWith("'")||o.startsWith('"')&&o.endsWith('"'))&&(o=o.slice(1,-1)),this.aliases.set(r.slice(0,t),o)}else{const o=this.aliases.get(r);return o?{stdout:`alias ${r}='${o}'
`,stderr:"",exitCode:0}:{stdout:"",stderr:`alias: ${r}: not found
`,exitCode:1}}}return{stdout:"",stderr:"",exitCode:0}}async handleSource(e){if(e.length===0)return{stdout:"",stderr:`source: missing file argument
`,exitCode:1};const r=this.resolvePath(e[0]);try{const t=this.volume.readFileSync(r,"utf8");return this.exec(t)}catch{return{stdout:"",stderr:`source: ${e[0]}: No such file or directory
`,exitCode:1}}}}const I="\x1B[0m",me="\x1B[1m",M="\x1B[36m";function Qt(n){return{name:"npm",async execute(e,r){if(!n.hasFile("/"))return{stdout:"",stderr:`Volume unavailable
`,exitCode:1};const t=e[0];if(!t||t==="help"||t==="--help")return{stdout:`${me}Usage:${I} npm <command>

${me}Commands:${I}
  ${M}run${I} <script>      Run a package.json script
  ${M}start${I}             Alias for npm run start
  ${M}test${I}              Alias for npm run test
  ${M}install${I} [pkg]     Install packages
  ${M}uninstall${I} <pkg>   Remove a package
  ${M}ls${I}                List installed packages
  ${M}init${I}              Create a package.json
  ${M}create${I} <pkg>      Create a project (runs create-<pkg>)
  ${M}version${I}           Show version info
  ${M}info${I} <pkg>        Show package info
  ${M}exec${I} <cmd>        Execute a package binary
  ${M}prefix${I}            Show prefix
  ${M}root${I}              Show node_modules path
  ${M}bin${I}               Show bin directory
  ${M}config${I}            Manage configuration
`,stderr:"",exitCode:0};switch(t){case"run":case"run-script":return n.runScript(e.slice(1),r);case"start":return n.runScript(["start"],r);case"test":case"t":case"tst":return n.runScript(["test"],r);case"install":case"i":case"add":return n.installPackages(e.slice(1),r);case"ci":try{n.removeNodeModules(r.cwd)}catch{}return n.installPackages([],r);case"uninstall":case"remove":case"rm":case"un":return n.uninstallPackages(e.slice(1),r);case"ls":case"list":return n.listPackages(r);case"init":case"create":return n.npmInitOrCreate(e.slice(1),t,r);case"version":case"-v":case"--version":return{stdout:J.NPM+`
`,stderr:"",exitCode:0};case"info":case"view":case"show":return n.npmInfo(e.slice(1),r);case"exec":return n.npxExecute(e.slice(1),r);case"prefix":return{stdout:r.cwd+`
`,stderr:"",exitCode:0};case"root":return{stdout:r.cwd+`/node_modules
`,stderr:"",exitCode:0};case"bin":return{stdout:r.cwd+`/node_modules/.bin
`,stderr:"",exitCode:0};case"pack":return n.npmPack(r);case"config":case"c":return n.npmConfig(e.slice(1),r);case"outdated":return{stdout:"",stderr:n.formatWarn("outdated check not available in nodepod","npm"),exitCode:0};case"audit":return{stdout:`found 0 vulnerabilities
`,stderr:"",exitCode:0};case"fund":return{stdout:`0 packages are looking for funding
`,stderr:"",exitCode:0};case"cache":return e[1]==="clean"||e[1]==="clear"?{stdout:`Cache cleared.
`,stderr:"",exitCode:0}:{stdout:"",stderr:n.formatErr(`cache: unknown subcommand ${e[1]??""}`,"npm"),exitCode:1};case"whoami":return{stdout:`nodepod-user
`,stderr:"",exitCode:0};case"ping":return{stdout:`PING ${je} - ok
`,stderr:"",exitCode:0};case"set-script":{const o=e[1],s=e.slice(2).join(" ");if(!o||!s)return{stdout:"",stderr:n.formatErr("Usage: npm set-script <name> <command>","npm"),exitCode:1};try{const a=r.cwd+"/package.json",u=n.readFile(a),i=JSON.parse(u);return i.scripts||(i.scripts={}),i.scripts[o]=s,n.writeFile(a,JSON.stringify(i,null,2)+`
`),{stdout:"",stderr:n.formatWarn('`set-script` is deprecated. Use `npm pkg set scripts.${scriptName}="${scriptCmd}"` instead.',"npm"),exitCode:0}}catch(a){return{stdout:"",stderr:n.formatErr(a.message||"Failed to update package.json","npm"),exitCode:1}}}case"pkg":return n.npmPkg?n.npmPkg(e.slice(1),r):{stdout:"",stderr:n.formatErr("npm pkg not implemented","npm"),exitCode:1};default:return{stdout:"",stderr:n.formatErr(`Unknown command "${t}"`,"npm"),exitCode:1}}}}}const U="\x1B[0m",_e="\x1B[1m",ne="\x1B[36m";function Xt(n){return{name:"pnpm",async execute(e,r){if(!n.hasFile("/"))return{stdout:"",stderr:`Volume unavailable
`,exitCode:1};const t=e[0];if(!t||t==="help"||t==="--help")return{stdout:`${_e}Usage:${U} pnpm <command>

${_e}Manage your dependencies:${U}
  ${ne}add${U} [pkg]         Install packages
  ${ne}install${U}           Install from manifest
  ${ne}remove${U} <pkg>      Remove a package
  ${ne}list${U}              List installed packages

${_e}Run your scripts:${U}
  ${ne}run${U} <script>      Run a script
  ${ne}exec${U} <cmd>        Execute a package binary
  ${ne}dlx${U} <pkg>         Download and execute a package

${_e}Create a project:${U}
  ${ne}init${U}              Create a package.json
  ${ne}create${U} <pkg>      Create a project

  ${ne}version${U}           Show version info
`,stderr:"",exitCode:0};switch(t){case"add":return n.installPackages(e.slice(1),r,"pnpm");case"install":case"i":return n.installPackages(e.slice(1),r,"pnpm");case"remove":case"rm":case"uninstall":case"un":return n.uninstallPackages(e.slice(1),r,"pnpm");case"list":case"ls":return n.listPackages(r,"pnpm");case"run":return n.runScript(e.slice(1),r);case"start":return n.runScript(["start"],r);case"test":case"t":return n.runScript(["test"],r);case"exec":return n.npxExecute(e.slice(1),r);case"dlx":return n.npxExecute(e.slice(1),r);case"init":case"create":return n.npmInitOrCreate(e.slice(1),t,r);case"version":case"-v":case"--version":return{stdout:J.PNPM+`
`,stderr:"",exitCode:0};case"audit":return{stdout:`No known vulnerabilities found
`,stderr:"",exitCode:0};case"outdated":return{stdout:"",stderr:"",exitCode:0};case"why":return{stdout:"",stderr:n.formatWarn("why: not available in nodepod","pnpm"),exitCode:0};default:return{stdout:"",stderr:n.formatErr(`Unknown command "${t}"`,"pnpm"),exitCode:1}}}}}const z="\x1B[0m",it="\x1B[1m",ae="\x1B[36m";function Zt(n){return{name:"yarn",async execute(e,r){if(!n.hasFile("/"))return{stdout:"",stderr:`Volume unavailable
`,exitCode:1};const t=e[0];if(!t)return n.installPackages([],r,"yarn");if(t==="help"||t==="--help")return{stdout:`${it}Usage:${z} yarn <command>

${it}Commands:${z}
  ${ae}add${z} [pkg]         Install packages
  ${ae}install${z}           Install from manifest
  ${ae}remove${z} <pkg>      Remove a package
  ${ae}list${z}              List installed packages
  ${ae}run${z} <script>      Run a script
  ${ae}dlx${z} <pkg>         Download and execute a package
  ${ae}init${z}              Create a package.json
  ${ae}create${z} <pkg>      Create a project
  ${ae}version${z}           Show version info
`,stderr:"",exitCode:0};switch(t){case"add":return n.installPackages(e.slice(1),r,"yarn");case"install":case"i":return n.installPackages(e.slice(1),r,"yarn");case"remove":case"rm":case"uninstall":return n.uninstallPackages(e.slice(1),r,"yarn");case"list":case"ls":return n.listPackages(r,"yarn");case"run":return n.runScript(e.slice(1),r);case"start":return n.runScript(["start"],r);case"test":case"t":return n.runScript(["test"],r);case"exec":return n.npxExecute(e.slice(1),r);case"dlx":return n.npxExecute(e.slice(1),r);case"init":case"create":return n.npmInitOrCreate(e.slice(1),t,r);case"version":case"-v":case"--version":return{stdout:J.YARN+`
`,stderr:"",exitCode:0};case"info":return n.npmInfo(e.slice(1),r);case"audit":return{stdout:`0 vulnerabilities found
`,stderr:"",exitCode:0};case"outdated":return{stdout:"",stderr:"",exitCode:0};case"why":return{stdout:"",stderr:n.formatWarn("why: not available in nodepod","yarn"),exitCode:0};case"global":return{stdout:"",stderr:n.formatWarn("global: not available in nodepod","yarn"),exitCode:0};default:return n.runScript(e,r)}}}}const P="\x1B[0m",at="\x1B[1m",K="\x1B[2m",en="\x1B[32m",ce="\x1B[36m";function tn(n){return{name:"bun",async execute(e,r){if(!n.hasFile("/"))return{stdout:"",stderr:`Volume unavailable
`,exitCode:1};const t=e[0];if(!t||t==="help"||t==="--help")return{stdout:`${at}Bun${P} is a fast JavaScript runtime, package manager, and bundler.

${K}Usage:${P} bun <command> [...flags] [...args]

${at}Commands:${P}
  ${ce}run${P}       ${K}Run a package.json script or file${P}
  ${ce}install${P}   ${K}Install dependencies from package.json${P}
  ${ce}add${P}       ${K}Add a dependency${P}
  ${ce}remove${P}    ${K}Remove a dependency${P}
  ${ce}init${P}      ${K}Start an empty Bun project${P}
  ${ce}create${P}    ${K}Create a new project from a template${P}
  ${ce}test${P}      ${K}Run unit tests${P}
  ${ce}x${P}         ${K}Execute a package binary (bunx)${P}
  ${ce}pm${P}        ${K}Package manager utilities${P}
`,stderr:"",exitCode:0};switch(t){case"run":return e[1]&&(e[1].endsWith(".js")||e[1].endsWith(".ts")||e[1].endsWith(".mjs")||e[1].endsWith(".tsx")||e[1].endsWith(".jsx"))?n.executeNodeBinary(e[1],e.slice(2),r):n.runScript(e.slice(1),r);case"start":return n.runScript(["start"],r);case"test":case"t":return n.runScript(["test"],r);case"install":case"i":return n.installPackages(e.slice(1),r,"bun");case"add":return n.installPackages(e.slice(1),r,"bun");case"remove":case"rm":return n.uninstallPackages(e.slice(1),r,"bun");case"x":return n.npxExecute(e.slice(1),r);case"init":case"create":return n.npmInitOrCreate(e.slice(1),t,r);case"pm":{const o=e[1];return o==="ls"||o==="list"?n.listPackages(r,"bun"):o==="cache"?{stdout:`Cache path: /tmp/bun-cache
`,stderr:"",exitCode:0}:{stdout:`${K}bun pm: available subcommands: ls, cache${P}
`,stderr:"",exitCode:0}}case"version":case"-v":case"--version":return{stdout:J.BUN+`
`,stderr:"",exitCode:0};case"upgrade":return{stdout:`${en}Bun is already up to date.${P}
`,stderr:"",exitCode:0};default:{if(e[0]&&!e[0].startsWith("-")){const o=e[0].startsWith("/")?e[0]:`${r.cwd}/${e[0]}`.replace(/\/+/g,"/");return n.hasFile(o)?n.executeNodeBinary(e[0],e.slice(1),r):n.runScript(e,r)}return{stdout:"",stderr:`error: unknown command "${t}"
`,exitCode:1}}}}}}function nn(n){return{name:"bunx",async execute(e,r){return n.npxExecute(e,r)}}}const ct="\x1B[0m",lt="\x1B[1m";function rn(n){return{name:"node",async execute(e,r){if(!n.hasFile("/"))return{stdout:"",stderr:`Volume unavailable
`,exitCode:1};let t=null,o=null,s=null;const a=[];let u=!1;for(let i=0;i<e.length;i++){if(u){a.push(e[i]);continue}if(e[i]==="-e"||e[i]==="--eval")o=e[++i]??"";else if(e[i]==="-p"||e[i]==="--print")s=e[++i]??"";else{if(e[i]==="--version"||e[i]==="-v")return{stdout:J.NODE+`
`,stderr:"",exitCode:0};if(e[i]==="--help"||e[i]==="-h")return{stdout:`${lt}Usage:${ct} node [options] [script.js] [arguments]
`,stderr:"",exitCode:0};e[i]==="-r"||e[i]==="--require"||e[i]==="--experimental-specifier-resolution"||e[i]==="--loader"||e[i]==="--import"?i++:e[i].startsWith("-")||(t=e[i],u=!0)}}return o!==null?n.evalCode(o,r):s!==null?n.printCode(s,r):t?n.executeNodeBinary(t,a,r):{stdout:"",stderr:`${lt}Usage:${ct} node <file> [args...]
`,exitCode:1}}}}function sn(n){return{name:"npx",async execute(e,r){return n.npxExecute(e,r)}}}const Ae="\x1B[31m",$e="\x1B[33m",on="\x1B[1m";function ut(n,e){const r=n.length,t=e.length,o=r+t;if(o===0)return[];const s=[],a=new Map;a.set(1,0);let u=-1;e:for(let c=0;c<=o;c++){s.push(new Map(a));for(let d=-c;d<=c;d+=2){let h;d===-c||d!==c&&(a.get(d-1)??0)<(a.get(d+1)??0)?h=a.get(d+1)??0:h=(a.get(d-1)??0)+1;let g=h-d;for(;h<r&&g<t&&n[h]===e[g];)h++,g++;if(a.set(d,h),h>=r&&g>=t){u=c;break e}}}u<0&&(u=o);let i=r,f=t;const l=[];for(let c=u;c>0;c--){const d=s[c],h=i-f;let g;h===-c||h!==c&&(d.get(h-1)??0)<(d.get(h+1)??0)?g=h+1:g=h-1;const p=d.get(g)??0,m=p-g;for(;i>p&&f>m;)i--,f--,l.push({kind:"equal",oldIdx:i,newIdx:f,line:n[i]});c>0&&(i===p?(f--,l.push({kind:"insert",oldIdx:-1,newIdx:f,line:e[f]})):(i--,l.push({kind:"delete",oldIdx:i,newIdx:-1,line:n[i]})))}for(;i>0&&f>0;)i--,f--,l.push({kind:"equal",oldIdx:i,newIdx:f,line:n[i]});return l.reverse(),l}function an(n,e=3){const r=[];if(n.length===0)return r;const t=[];for(let u=0;u<n.length;u++)n[u].kind!=="equal"&&t.push(u);if(t.length===0)return r;let o=t[0],s=t[0];const a=[];for(let u=1;u<t.length;u++)t[u]-s<=e*2||(a.push([o,s]),o=t[u]),s=t[u];a.push([o,s]);for(const[u,i]of a){const f=Math.max(0,u-e),l=Math.min(n.length-1,i+e),c=n.slice(f,l+1);let d=1/0,h=1/0,g=0,p=0;for(const m of c)m.kind==="equal"?(m.oldIdx<d&&(d=m.oldIdx),m.newIdx<h&&(h=m.newIdx),g++,p++):m.kind==="delete"?(m.oldIdx<d&&(d=m.oldIdx),g++):(m.newIdx<h&&(h=m.newIdx),p++);r.push({oldStart:(d===1/0?0:d)+1,oldCount:g,newStart:(h===1/0?0:h)+1,newCount:p,lines:c})}return r}function cn(n){let e=0,r=0;for(const t of n)t.kind==="insert"?e++:t.kind==="delete"&&r++;return{insertions:e,deletions:r}}class le{constructor(e,r,t){ee(this,"vol"),ee(this,"gitDir"),ee(this,"workDir"),this.vol=e,this.workDir=r,this.gitDir=t}readStore(){try{const e=this.vol.readFileSync(this.gitDir+"/objects/store.json","utf8");return JSON.parse(e)}catch{return{}}}writeStore(e){this.vol.writeFileSync(this.gitDir+"/objects/store.json",JSON.stringify(e))}hashContent(e,r){const t=`${e} ${r.length}\0`;return rr("sha1").update(t+r).digest("hex")}writeObject(e,r){const t=this.hashContent(e,r),o=this.readStore();return o[t]||(o[t]={type:e,data:r},this.writeStore(o)),t}readObject(e){return this.readStore()[e]??null}readIndex(){try{const e=this.vol.readFileSync(this.gitDir+"/index","utf8");return JSON.parse(e).entries??[]}catch{return[]}}writeIndex(e){this.vol.writeFileSync(this.gitDir+"/index",JSON.stringify({entries:e}))}addToIndex(e,r){const t=this.writeObject("blob",r),o=this.readIndex(),s=o.findIndex(u=>u.path===e),a={path:e,hash:t,mode:100644,mtime:Date.now()};s>=0?o[s]=a:o.push(a),o.sort((u,i)=>u.path.localeCompare(i.path)),this.writeIndex(o)}removeFromIndex(e){const r=this.readIndex().filter(t=>t.path!==e);this.writeIndex(r)}getHEAD(){try{return this.vol.readFileSync(this.gitDir+"/HEAD","utf8").trim()}catch{return"ref: refs/heads/main"}}setHEAD(e){this.vol.writeFileSync(this.gitDir+"/HEAD",e+`
`)}getCurrentBranch(){const e=this.getHEAD();return e.startsWith("ref: refs/heads/")?e.slice(16):null}resolveRef(e){if(/^[0-9a-f]{40}$/.test(e))return e;if(e.startsWith("ref: ")){const r=e.slice(5);try{return this.vol.readFileSync(this.gitDir+"/"+r,"utf8").trim()}catch{return null}}try{return this.vol.readFileSync(this.gitDir+"/refs/heads/"+e,"utf8").trim()}catch{}try{return this.vol.readFileSync(this.gitDir+"/refs/tags/"+e,"utf8").trim()}catch{}return null}resolveHEAD(){return this.resolveRef(this.getHEAD())}updateBranchRef(e,r){const t=this.gitDir+"/refs/heads/"+e,o=t.substring(0,t.lastIndexOf("/"));this.vol.existsSync(o)||this.vol.mkdirSync(o,{recursive:!0}),this.vol.writeFileSync(t,r+`
`)}listBranches(){try{return this.vol.readdirSync(this.gitDir+"/refs/heads")}catch{return[]}}deleteBranch(e){try{const r=this.gitDir+"/refs/heads/"+e;if(this.vol.existsSync(r))return this.vol.unlinkSync(r),!0}catch{}return!1}readConfig(){try{return this.vol.readFileSync(this.gitDir+"/config","utf8")}catch{return""}}writeConfig(e){this.vol.writeFileSync(this.gitDir+"/config",e)}getConfigValue(e){const r=this.readConfig(),t=e.split(".");if(t.length<2)return null;let o,s=null,a;t.length===3?(o=t[0],s=t[1],a=t[2]):(o=t[0],a=t[1]);const u=r.split(`
`);let i=!1;for(const f of u){const l=f.trim();if(l.startsWith("[")){if(s){const c=`[${o} "${s}"]`;i=l===c}else i=l===`[${o}]`;continue}if(i){const c=l.match(/^(\w+)\s*=\s*(.*)$/);if(c&&c[1]===a)return c[2].trim()}}return null}setConfigValue(e,r){const t=e.split(".");let o,s;if(t.length===3)o=`[${t[0]} "${t[1]}"]`,s=t[2];else if(t.length===2)o=`[${t[0]}]`,s=t[1];else return;const u=this.readConfig().split(`
`);let i=-1,f=-1,l=!1,c=-1;for(let d=0;d<u.length;d++){const h=u[d].trim();if(h.startsWith("[")){l&&f===-1&&(c=d-1),l=h===o,l&&(i=d);continue}if(l){c=d;const g=h.match(/^(\w+)\s*=\s*(.*)$/);g&&g[1]===s&&(f=d)}}l&&c===-1&&(c=i),f>=0?u[f]=`	${s} = ${r}`:i>=0?u.splice(c+1,0,`	${s} = ${r}`):(u.length>0&&u[u.length-1]!==""&&u.push(""),u.push(o),u.push(`	${s} = ${r}`)),this.writeConfig(u.join(`
`))}buildTree(e){const r=[],t=new Map;for(const s of e){const a=s.path.indexOf("/");if(a===-1)r.push({name:s.path,mode:String(s.mode),type:"blob",hash:s.hash});else{const u=s.path.substring(0,a),i={...s,path:s.path.substring(a+1)};t.has(u)||t.set(u,[]),t.get(u).push(i)}}for(const[s,a]of t){const u=this.buildTree(a);r.push({name:s,mode:"40000",type:"tree",hash:u})}r.sort((s,a)=>s.name.localeCompare(a.name));const o=JSON.stringify(r);return this.writeObject("tree",o)}createCommit(e,r,t,o){const s=`${this.getConfigValue("user.name")??"nodepod-user"} <${this.getConfigValue("user.email")??"user@nodepod.dev"}>`,a={tree:t,parent:r,author:s,committer:s,timestamp:Date.now(),message:e};return o&&(a.parent2=o),this.writeObject("commit",JSON.stringify(a))}readCommit(e){const r=this.readObject(e);return!r||r.type!=="commit"?null:JSON.parse(r.data)}walkLog(e,r){const t=[];let o=e;for(;o&&t.length<r;){const s=this.readCommit(o);if(!s)break;t.push({hash:o,...s}),o=s.parent}return t}getCommitTree(e){const r=this.readCommit(e);return r?this.flattenTree(r.tree,""):new Map}flattenTree(e,r){const t=this.readObject(e);if(!t||t.type!=="tree")return new Map;const o=JSON.parse(t.data),s=new Map;for(const a of o){const u=r?r+"/"+a.name:a.name;if(a.type==="blob")s.set(u,a.hash);else for(const[i,f]of this.flattenTree(a.hash,u))s.set(i,f)}return s}getBlobContent(e){const r=this.readObject(e);return!r||r.type!=="blob"?null:r.data}diffWorkingVsIndex(){const e=this.readIndex(),r=new Map(e.map(s=>[s.path,s.hash])),t=[],o=new Set;this.walkWorkTree(this.workDir,"",(s,a)=>{o.add(s);const u=this.hashContent("blob",a),i=r.get(s);i&&u!==i&&t.push({path:s,status:"modified",oldContent:this.getBlobContent(i)??"",newContent:a})});for(const s of e)o.has(s.path)||t.push({path:s.path,status:"deleted",oldContent:this.getBlobContent(s.hash)??""});return t}diffIndexVsHEAD(){const e=this.readIndex(),r=this.resolveHEAD(),t=r?this.getCommitTree(r):new Map,o=[],s=new Map(e.map(a=>[a.path,a.hash]));for(const a of e){const u=t.get(a.path);u?u!==a.hash&&o.push({path:a.path,status:"modified"}):o.push({path:a.path,status:"added"})}for(const[a]of t)s.has(a)||o.push({path:a,status:"deleted"});return o}getUntrackedFiles(){const e=this.readIndex(),r=new Set(e.map(o=>o.path)),t=[];return this.walkWorkTree(this.workDir,"",o=>{r.has(o)||t.push(o)}),t.sort()}walkWorkTree(e,r,t){let o;try{o=this.vol.readdirSync(e)}catch{return}for(const s of o){if(s===".git"||s==="node_modules")continue;const a=e+"/"+s;try{const u=this.vol.statSync(a);if(u.isDirectory())this.walkWorkTree(a,r?r+"/"+s:s,t);else if(u.isFile()){const i=r?r+"/"+s:s,f=this.vol.readFileSync(a,"utf8");t(i,f)}}catch{}}}readStashList(){try{const e=this.vol.readFileSync(this.gitDir+"/refs/stash","utf8");return JSON.parse(e)}catch{return[]}}writeStashList(e){const r=this.gitDir+"/refs";this.vol.existsSync(r)||this.vol.mkdirSync(r,{recursive:!0}),this.vol.writeFileSync(this.gitDir+"/refs/stash",JSON.stringify(e))}getRemoteUrl(e){return this.getConfigValue(`remote.${e}.url`)}parseGitHubUrl(e){let r=e.match(/github\.com\/([^/]+)\/([^/.]+?)(?:\.git)?$/);return r?{owner:r[1],repo:r[2]}:(r=e.match(/github\.com:([^/]+)\/([^/.]+?)(?:\.git)?$/),r?{owner:r[1],repo:r[2]}:null)}}async function W(n,e,r="GET",t){const o=`https://api.github.com${n}`,s={Accept:"application/vnd.github.v3+json",Authorization:`token ${e}`,"User-Agent":"nodepod-git"};t&&(s["Content-Type"]="application/json");const a=await sr(o,{method:r,headers:s,body:t?JSON.stringify(t):void 0});let u;try{u=await a.json()}catch{u=null}return{ok:a.ok,status:a.status,data:u}}function Oe(n,e){let r=e;for(;;){const t=r+"/.git";try{if(n.existsSync(t))return{gitDir:t,workDir:r}}catch{}const o=r.substring(0,r.lastIndexOf("/"))||"/";if(o===r)break;r=o}return n.existsSync("/.git")?{gitDir:"/.git",workDir:"/"}:null}function L(n,e){const r=Oe(n,e);return r?{repo:new le(n,r.workDir,r.gitDir)}:{error:b(`fatal: not a git repository (or any of the parent directories): .git
`,128)}}function dt(n,e){let r=e.cwd;for(const s of n)if(!s.startsWith("-")){r=be(e.cwd,s);break}const t=r+"/.git";if(e.volume.existsSync(t))return y(`Reinitialized existing Git repository in ${t}/
`);const o=[t,t+"/objects",t+"/refs",t+"/refs/heads",t+"/refs/tags"];for(const s of o)e.volume.existsSync(s)||e.volume.mkdirSync(s,{recursive:!0});return e.volume.writeFileSync(t+"/HEAD",`ref: refs/heads/main
`),e.volume.writeFileSync(t+"/config",`[core]
	bare = false
	filemode = false
[user]
	name = nodepod-user
	email = user@nodepod.dev
`),e.volume.writeFileSync(t+"/objects/store.json","{}"),e.volume.writeFileSync(t+"/index",'{"entries":[]}'),e.volume.existsSync(r)||e.volume.mkdirSync(r,{recursive:!0}),y(`Initialized empty Git repository in ${t}/
`)}function ln(n,e){const r=L(e.volume,e.cwd);if("error"in r)return r.error;const{repo:t}=r,o=n.includes("-A")||n.includes("--all")||n.includes("."),s=o?[]:n.filter(a=>!a.startsWith("-"));if(!o&&s.length===0)return b(`Nothing specified, nothing added.
`);if(o){t.walkWorkTree(t.workDir,"",(i,f)=>{t.addToIndex(i,f)});const a=t.readIndex(),u=[];for(const i of a){const f=t.workDir+"/"+i.path;e.volume.existsSync(f)||u.push(i.path)}for(const i of u)t.removeFromIndex(i)}else for(const a of s){const u=be(e.cwd,a),i=tt(t.workDir,u);if(!i.startsWith(".."))if(e.volume.existsSync(u))try{if(e.volume.statSync(u).isDirectory())t.walkWorkTree(u,i,(l,c)=>{t.addToIndex(l,c)});else{const l=e.volume.readFileSync(u,"utf8");t.addToIndex(i,l)}}catch{}else t.removeFromIndex(i)}return y("")}function un(n,e){const r=L(e.volume,e.cwd);if("error"in r)return r.error;const{repo:t}=r,o=n.includes("-s")||n.includes("--short"),s=n.includes("--porcelain"),a=t.diffIndexVsHEAD(),u=t.diffWorkingVsIndex(),i=t.getUntrackedFiles();if(o||s){let c="";for(const d of a){const h=d.status==="added"?"A":d.status==="deleted"?"D":"M";c+=`${h}  ${d.path}
`}for(const d of u){const h=d.status==="deleted"?"D":"M";c+=` ${h} ${d.path}
`}for(const d of i)c+=`?? ${d}
`;return y(c)}let l=`On branch ${t.getCurrentBranch()??"(HEAD detached)"}
`;if(a.length===0&&u.length===0&&i.length===0)return l+=`nothing to commit, working tree clean
`,y(l);if(a.length>0){l+=`
Changes to be committed:
`,l+=`  (use "git restore --staged <file>..." to unstage)
`;for(const c of a){const d=c.status==="added"?"new file":c.status==="deleted"?"deleted":"modified";l+=`	${Fe}${d}:   ${c.path}${Y}
`}}if(u.length>0){l+=`
Changes not staged for commit:
`,l+=`  (use "git add <file>..." to update what will be committed)
`;for(const c of u){const d=c.status==="deleted"?"deleted":"modified";l+=`	${Ae}${d}:   ${c.path}${Y}
`}}if(i.length>0){l+=`
Untracked files:
`,l+=`  (use "git add <file>..." to include in what will be committed)
`;for(const c of i)l+=`	${Ae}${c}${Y}
`}return y(l)}function dn(n,e){const r=L(e.volume,e.cwd);if("error"in r)return r.error;const{repo:t}=r;let o=null,s=!1,a=!1;for(let $=0;$<n.length;$++)n[$]==="-m"||n[$]==="--message"?o=n[++$]??"":n[$]==="-a"||n[$]==="--all"?s=!0:n[$]==="--allow-empty"?a=!0:n[$]==="--allow-empty-message"||n[$].startsWith("-m")&&(o=n[$].slice(2));if(o===null)return b("error: switch `m' requires a value\n");if(s){const $=t.readIndex();for(const w of $){const S=t.workDir+"/"+w.path;if(e.volume.existsSync(S))try{const x=e.volume.readFileSync(S,"utf8");t.addToIndex(w.path,x)}catch{}else t.removeFromIndex(w.path)}}const u=t.readIndex(),i=t.diffIndexVsHEAD();if(i.length===0&&!a)return b(`nothing to commit, working tree clean
`);const f=t.buildTree(u),l=t.resolveHEAD(),c=t.createCommit(o,l,f),d=t.getCurrentBranch();d?t.updateBranchRef(d,c):t.setHEAD(c);const h=c.slice(0,7),m=`[${d??"HEAD"}${!l?" (root-commit)":""} ${h}] ${o}
 ${i.length} file${i.length!==1?"s":""} changed
`;return y(m)}function fn(n,e){const r=L(e.volume,e.cwd);if("error"in r)return r.error;const{repo:t}=r;let o=50,s=!1,a=null;for(let c=0;c<n.length;c++)n[c]==="--oneline"?s=!0:n[c]==="-n"||n[c]==="--max-count"?o=parseInt(n[++c],10)||50:n[c].startsWith("-")&&/^-\d+$/.test(n[c])?o=parseInt(n[c].slice(1),10)||50:n[c].startsWith("--format=")?a=n[c].slice(9):n[c].startsWith("--pretty=format:")?a=n[c].slice(16):n[c].startsWith("--pretty=")&&(a=n[c].slice(9));const u=t.resolveHEAD();if(!u)return y("");const i=t.walkLog(u,o);if(i.length===0)return y("");const f=t.getCurrentBranch();let l="";for(const c of i)if(a!==null){let d=a.replace(/%H/g,c.hash).replace(/%h/g,c.hash.slice(0,7)).replace(/%s/g,c.message.split(`
`)[0]).replace(/%an/g,c.author.split(" <")[0]).replace(/%ae/g,(c.author.match(/<(.+?)>/)??["",""])[1]).replace(/%d/g,c.hash===u&&f?` (HEAD -> ${f})`:"").replace(/%n/g,`
`);l+=d+`
`}else if(s){const d=c.hash===u&&f?` ${$e}(HEAD -> ${nt}${f}${$e})${Y}`:"";l+=`${$e}${c.hash.slice(0,7)}${Y}${d} ${c.message.split(`
`)[0]}
`}else{const d=c.hash===u&&f?` ${$e}(HEAD -> ${nt}${f}${$e})${Y}`:"";l+=`${$e}commit ${c.hash}${Y}${d}
`,l+=`Author: ${c.author}
`,l+=`Date:   ${new Date(c.timestamp).toUTCString()}
`,l+=`
    ${c.message}

`}return y(l)}function hn(n,e){const r=L(e.volume,e.cwd);if("error"in r)return r.error;const{repo:t}=r,o=n.includes("--staged")||n.includes("--cached"),s=n.includes("--stat");let a;if(o){a=t.diffIndexVsHEAD();const i=t.resolveHEAD(),f=i?t.getCommitTree(i):new Map,l=t.readIndex(),c=new Map(l.map(d=>[d.path,d.hash]));for(const d of a){const h=f.get(d.path),g=c.get(d.path);d.oldContent=h?t.getBlobContent(h)??"":"",d.newContent=g?t.getBlobContent(g)??"":""}}else a=t.diffWorkingVsIndex();if(a.length===0)return y("");if(s){let i="",f=0,l=0;for(const c of a){const d=c.oldContent?c.oldContent.split(`
`):[],h=c.newContent?c.newContent.split(`
`):[],g=ut(d,h),{insertions:p,deletions:m}=cn(g);f+=p,l+=m,i+=` ${c.path} | ${p+m} ${Fe}${"+".repeat(p)}${Ae}${"-".repeat(m)}${Y}
`}return i+=` ${a.length} file${a.length!==1?"s":""} changed`,f>0&&(i+=`, ${f} insertion${f!==1?"s":""}(+)`),l>0&&(i+=`, ${l} deletion${l!==1?"s":""}(-)`),i+=`
`,y(i)}let u="";for(const i of a){const f=i.oldContent?i.oldContent.split(`
`):[],l=i.newContent?i.newContent.split(`
`):[];u+=`${on}diff --git a/${i.path} b/${i.path}${Y}
`,i.status==="added"&&(u+=`new file mode 100644
`),i.status==="deleted"&&(u+=`deleted file mode 100644
`),u+=`--- ${i.status==="added"?"/dev/null":"a/"+i.path}
`,u+=`+++ ${i.status==="deleted"?"/dev/null":"b/"+i.path}
`;const c=ut(f,l),d=an(c,3);for(const h of d){u+=`${nt}@@ -${h.oldStart},${h.oldCount} +${h.newStart},${h.newCount} @@${Y}
`;for(const g of h.lines)g.kind==="equal"?u+=` ${g.line}
`:g.kind==="delete"?u+=`${Ae}-${g.line}${Y}
`:u+=`${Fe}+${g.line}${Y}
`}}return y(u)}function mn(n,e){const r=L(e.volume,e.cwd);if("error"in r)return r.error;const{repo:t}=r;if(n.includes("--show-current")){const l=t.getCurrentBranch();return y(l?l+`
`:`
`)}const o=n.indexOf("-d")!==-1?n.indexOf("-d"):n.indexOf("-D");if(o>=0){const l=n[o+1];return l?l===t.getCurrentBranch()?b(`error: Cannot delete branch '${l}' checked out.
`):t.deleteBranch(l)?y(`Deleted branch ${l}.
`):b(`error: branch '${l}' not found.
`):b(`error: branch name required
`)}const s=n.indexOf("-m");if(s>=0){const l=n[s+1],c=n[s+2];if(!l||!c)return b(`error: too few arguments to rename
`);const d=t.resolveRef(l);return d?(t.updateBranchRef(c,d),t.deleteBranch(l),t.getCurrentBranch()===l&&t.setHEAD("ref: refs/heads/"+c),y(`Branch '${l}' renamed to '${c}'.
`)):b(`error: refname ${l} not a valid ref
`)}const a=n.filter(l=>!l.startsWith("-"));if(a.length>0){const l=a[0],c=a[1],d=c?t.resolveRef(c):t.resolveHEAD();return d?(t.updateBranchRef(l,d),y("")):b(`fatal: not a valid object name: '${c??"HEAD"}'
`,128)}const u=t.listBranches(),i=t.getCurrentBranch();let f="";for(const l of u.sort())l===i?f+=`* ${Fe}${l}${Y}
`:f+=`  ${l}
`;return y(f)}function ft(n,e){const r=L(e.volume,e.cwd);if("error"in r)return r.error;const{repo:t}=r,o=n.includes("-b"),s=n.filter(d=>!d.startsWith("-"));if(s.length===0)return b(`error: you must specify a branch to checkout
`);let a,u=null;if(o){const d=n.indexOf("-b");if(u=n[d+1],!u)return b(`error: switch 'b' requires a value
`);a=n[d+2]??t.getCurrentBranch()??"HEAD"}else a=s[0];let i=t.resolveRef(a);if(o)return i||(i=t.resolveHEAD()),i?(t.updateBranchRef(u,i),t.setHEAD("ref: refs/heads/"+u),y(`Switched to a new branch '${u}'
`)):b(`fatal: not a valid object name: '${a}'
`,128);const l=t.listBranches().includes(a);if(!i)return b(`error: pathspec '${a}' did not match any file(s) known to git.
`);const c=t.resolveHEAD();if(i!==c){const d=t.getCommitTree(i),h=c?t.getCommitTree(c):new Map;for(const[p,m]of d){const $=t.getBlobContent(m);if($!==null){const w=t.workDir+"/"+p,S=w.substring(0,w.lastIndexOf("/"));S&&!e.volume.existsSync(S)&&e.volume.mkdirSync(S,{recursive:!0}),e.volume.writeFileSync(w,$)}}for(const[p]of h)if(!d.has(p)){const m=t.workDir+"/"+p;try{e.volume.unlinkSync(m)}catch{}}const g=[];for(const[p,m]of d)g.push({path:p,hash:m,mode:100644,mtime:Date.now()});g.sort((p,m)=>p.path.localeCompare(m.path)),t.writeIndex(g)}return l?(t.setHEAD("ref: refs/heads/"+a),y(`Switched to branch '${a}'
`)):(t.setHEAD(i),y(`HEAD is now at ${i.slice(0,7)}
`))}function pn(n,e){const r=[];for(let t=0;t<n.length;t++)n[t]==="-c"||n[t]==="--create"?r.push("-b"):r.push(n[t]);return ft(r,e)}function gn(n,e){const r=Oe(e.volume,e.cwd);for(const o of n)switch(o){case"--show-toplevel":return r?y(r.workDir+`
`):b(`fatal: not a git repository
`,128);case"--is-inside-work-tree":return y(r?`true
`:`false
`);case"--git-dir":return r?y(`.git
`):b(`fatal: not a git repository
`,128);case"--is-bare-repository":return y(`false
`);case"--abbrev-ref":{if(n[n.indexOf(o)+1]==="HEAD"&&r){const u=new le(e.volume,r.workDir,r.gitDir).getCurrentBranch();return y((u??"HEAD")+`
`)}return y(`HEAD
`)}case"--short":{if(n[n.indexOf(o)+1]==="HEAD"&&r){const u=new le(e.volume,r.workDir,r.gitDir).resolveHEAD();return y(u?u.slice(0,7)+`
`:`
`)}return y(`
`)}case"--verify":{const s=n[n.indexOf(o)+1];if(!r)return b(`fatal: not a git repository
`,128);const a=new le(e.volume,r.workDir,r.gitDir);if(s==="HEAD"){const i=a.resolveHEAD();return i?y(i+`
`):b(`fatal: Needed a single revision
`,128)}const u=a.resolveRef(s??"");return u?y(u+`
`):b(`fatal: Needed a single revision
`,128)}}const t=n.filter(o=>!o.startsWith("-"));if(t.length>0&&r){const o=new le(e.volume,r.workDir,r.gitDir);for(const s of t)if(s==="HEAD"){const a=o.resolveHEAD();if(a)return y(a+`
`)}else{const a=o.resolveRef(s);if(a)return y(a+`
`)}}return y(`
`)}function $n(n,e){const r=Oe(e.volume,e.cwd);if(n.includes("--list")||n.includes("-l")){if(!r)return b(`fatal: not a git repository
`,128);const l=new le(e.volume,r.workDir,r.gitDir).readConfig().split(`
`);let c="",d="",h="";for(const g of l){const p=g.trim(),m=p.match(/^\[(\w+)\s*(?:"([^"]*)")?\]$/);if(m){c=m[1],d=m[2]??"";continue}const $=p.match(/^(\w+)\s*=\s*(.*)$/);if($&&c){const w=d?`${c}.${d}.${$[1]}`:`${c}.${$[1]}`;h+=`${w}=${$[2].trim()}
`}}return y(h)}const t=n.filter(i=>i!=="--global"&&i!=="--local"&&i!=="--get");if(t.length===0)return b(`error: key required
`);const o=t[0],s=t[1];if(!r)return s!==void 0?b(`fatal: not a git repository
`,128):y(`
`);const a=new le(e.volume,r.workDir,r.gitDir);if(s!==void 0)return a.setConfigValue(o,s),y("");const u=a.getConfigValue(o);return u!==null?y(u+`
`):b("")}function vn(n,e){const r=L(e.volume,e.cwd);if("error"in r)return r.error;const{repo:t}=r,o=n[0];if(o==="add"){const c=n[1],d=n[2];return!c||!d?b(`usage: git remote add <name> <url>
`):(t.setConfigValue(`remote.${c}.url`,d),t.setConfigValue(`remote.${c}.fetch`,`+refs/heads/*:refs/remotes/${c}/*`),y(""))}if(o==="remove"||o==="rm"){const c=n[1];if(!c)return b(`usage: git remote remove <name>
`);const h=t.readConfig().split(`
`),g=[];let p=!1;for(const m of h){if(m.trim()===`[remote "${c}"]`){p=!0;continue}m.trim().startsWith("[")&&p&&(p=!1),p||g.push(m)}return t.writeConfig(g.join(`
`)),y("")}if(o==="get-url"){const c=n[1]??"origin",d=t.getRemoteUrl(c);return d?y(d+`
`):b(`fatal: No such remote '${c}'
`,2)}const s=n.includes("-v")||n.includes("--verbose"),a=t.readConfig(),u=[],i=a.split(`
`);let f="";for(const c of i){const d=c.trim().match(/^\[remote\s+"([^"]+)"\]$/);if(d){f=d[1];continue}if(f){const h=c.trim().match(/^url\s*=\s*(.+)$/);h&&(u.push({name:f,url:h[1].trim()}),f="")}}let l="";for(const c of u)s?(l+=`${c.name}	${c.url} (fetch)
`,l+=`${c.name}	${c.url} (push)
`):l+=c.name+`
`;return y(l)}function wn(n,e){const r=L(e.volume,e.cwd);if("error"in r)return r.error;const{repo:t}=r;if(n.includes("--abort")){try{e.volume.unlinkSync(t.gitDir+"/MERGE_HEAD"),e.volume.unlinkSync(t.gitDir+"/MERGE_MSG")}catch{}return y(`Merge aborted.
`)}const o=n.filter(g=>!g.startsWith("-"))[0];if(!o)return b(`error: specify a branch to merge
`);const s=t.resolveRef(o);if(!s)return b(`merge: ${o} - not something we can merge
`);const a=t.resolveHEAD();if(!a){const g=t.getCurrentBranch();return g&&t.updateBranchRef(g,s),y(`Fast-forward
`)}if(a===s)return y(`Already up to date.
`);let u=s,i=!1;for(let g=0;g<1e3;g++){if(u===a){i=!0;break}const p=t.readCommit(u);if(!p||!p.parent)break;u=p.parent}if(i){const g=t.getCurrentBranch();g?t.updateBranchRef(g,s):t.setHEAD(s);const p=t.getCommitTree(s);for(const[$,w]of p){const S=t.getBlobContent(w);if(S!==null){const x=t.workDir+"/"+$,D=x.substring(0,x.lastIndexOf("/"));D&&!e.volume.existsSync(D)&&e.volume.mkdirSync(D,{recursive:!0}),e.volume.writeFileSync(x,S)}}const m=[];for(const[$,w]of p)m.push({path:$,hash:w,mode:100644,mtime:Date.now()});return t.writeIndex(m),y(`Updating ${a.slice(0,7)}..${s.slice(0,7)}
Fast-forward
`)}const f=t.readIndex(),l=t.buildTree(f),c=`Merge branch '${o}'`,d=t.createCommit(c,a,l,s),h=t.getCurrentBranch();return h?t.updateBranchRef(h,d):t.setHEAD(d),y(`Merge made by the 'recursive' strategy.
`)}function yn(n,e){const r=L(e.volume,e.cwd);if("error"in r)return r.error;const{repo:t}=r,o=n[0]??"push";if(o==="list"){const s=t.readStashList();let a="";for(let u=0;u<s.length;u++)a+=`stash@{${u}}: ${s[u].message}
`;return y(a)}if(o==="push"||o==="save"||!n[0]){const s=n.find(p=>!p.startsWith("-"))&&n[0]!=="push"&&n[0]!=="save"?n.join(" "):"WIP on "+(t.getCurrentBranch()??"HEAD"),a=t.diffWorkingVsIndex(),u=t.diffIndexVsHEAD();if(a.length===0&&u.length===0)return y(`No local changes to save
`);const i=t.readIndex();t.walkWorkTree(t.workDir,"",(p,m)=>{t.addToIndex(p,m)});const f=t.readIndex(),l=t.buildTree(f),c=t.resolveHEAD(),d=t.createCommit("stash: "+s,c,l);t.writeIndex(i);const h=t.resolveHEAD();if(h){const p=t.getCommitTree(h);for(const[m,$]of p){const w=t.getBlobContent($);if(w!==null){const S=t.workDir+"/"+m,x=S.substring(0,S.lastIndexOf("/"));x&&!e.volume.existsSync(x)&&e.volume.mkdirSync(x,{recursive:!0}),e.volume.writeFileSync(S,w)}}}const g=t.readStashList();return g.unshift({message:s,commitHash:d}),t.writeStashList(g),y(`Saved working directory and index state ${s}
`)}if(o==="pop"||o==="apply"){const s=n[1]?parseInt(n[1],10):0,a=t.readStashList();if(s>=a.length)return b(`error: stash@{${s}} does not exist
`);const u=a[s],i=t.getCommitTree(u.commitHash);for(const[f,l]of i){const c=t.getBlobContent(l);if(c!==null){const d=t.workDir+"/"+f,h=d.substring(0,d.lastIndexOf("/"));h&&!e.volume.existsSync(h)&&e.volume.mkdirSync(h,{recursive:!0}),e.volume.writeFileSync(d,c)}}return o==="pop"&&(a.splice(s,1),t.writeStashList(a)),y(`Applied stash@{${s}}
`)}if(o==="drop"){const s=n[1]?parseInt(n[1],10):0,a=t.readStashList();return s>=a.length?b(`error: stash@{${s}} does not exist
`):(a.splice(s,1),t.writeStashList(a),y(`Dropped stash@{${s}}
`))}return b(`error: unknown stash subcommand '${o}'
`)}function bn(n,e){const r=L(e.volume,e.cwd);if("error"in r)return r.error;const{repo:t}=r,o=n.includes("--cached"),s=n.filter(a=>!a.startsWith("-"));if(s.length===0)return b(`usage: git rm [--cached] <file>...
`);for(const a of s){const u=be(e.cwd,a),i=tt(t.workDir,u);if(t.removeFromIndex(i),!o)try{e.volume.unlinkSync(u)}catch{}}return y("")}function Cn(n,e){const r=L(e.volume,e.cwd);if("error"in r)return r.error;const{repo:t}=r,o=n.includes("--hard"),s=n.includes("--soft"),a=n.filter(l=>!l.startsWith("-"));if(a.length>0&&!o&&!s){const l=t.resolveHEAD(),c=l?t.getCommitTree(l):new Map;for(const d of a){const h=be(e.cwd,d),g=tt(t.workDir,h),p=c.get(g);if(p){const m=t.readIndex(),$=m.findIndex(w=>w.path===g);$>=0&&(m[$].hash=p,t.writeIndex(m))}else t.removeFromIndex(g)}return y("")}const u=a[0]??"HEAD",i=t.resolveRef(u)??t.resolveHEAD();if(!i)return b(`fatal: Failed to resolve HEAD
`,128);if(!s){const l=t.getCommitTree(i),c=[];for(const[d,h]of l)c.push({path:d,hash:h,mode:100644,mtime:Date.now()});c.sort((d,h)=>d.path.localeCompare(h.path)),t.writeIndex(c)}if(o){const l=t.getCommitTree(i);for(const[c,d]of l){const h=t.getBlobContent(d);if(h!==null){const g=t.workDir+"/"+c,p=g.substring(0,g.lastIndexOf("/"));p&&!e.volume.existsSync(p)&&e.volume.mkdirSync(p,{recursive:!0}),e.volume.writeFileSync(g,h)}}}const f=t.getCurrentBranch();return f&&t.updateBranchRef(f,i),y(`HEAD is now at ${i.slice(0,7)}
`)}function Ie(n){return n.GITHUB_TOKEN||n.GH_TOKEN||null}async function Sn(n,e){var r;const t=n.filter(B=>!B.startsWith("-")),o=t[0];if(!o)return b(`usage: git clone <repository> [<directory>]
`);let s="main";const a=n.indexOf("-b");a>=0&&n[a+1]&&(s=n[a+1]);const i=new le(e.volume,"/","/").parseGitHubUrl(o);if(!i)return b(`fatal: repository '${o}' is not a GitHub URL
`,128);const f=Ie(e.env);if(!f)return b(`fatal: authentication required. Set GITHUB_TOKEN environment variable.
`,128);let l=t[1]??i.repo;l.startsWith("/")||(l=be(e.cwd,l));const c=await W(`/repos/${i.owner}/${i.repo}`,f);if(!c.ok)return c.status===404?b(`fatal: repository '${o}' not found
`,128):b(`fatal: GitHub API error: ${c.status} ${((r=c.data)==null?void 0:r.message)??""}
`,128);const d=c.data.default_branch??"main";s==="main"&&d!=="main"&&(s=d);const h=await W(`/repos/${i.owner}/${i.repo}/git/ref/heads/${s}`,f);if(!h.ok)return b(`fatal: Remote branch '${s}' not found
`,128);const g=h.data.object.sha,p=await W(`/repos/${i.owner}/${i.repo}/git/commits/${g}`,f);if(!p.ok)return b(`fatal: could not fetch commit
`,128);const m=p.data.tree.sha,$=await W(`/repos/${i.owner}/${i.repo}/git/trees/${m}?recursive=1`,f);if(!$.ok)return b(`fatal: could not fetch tree
`,128);e.volume.existsSync(l)||e.volume.mkdirSync(l,{recursive:!0});let w=0;const S=[];for(const B of $.data.tree)B.type==="blob"&&S.push({path:B.path,sha:B.sha});const x=10;for(let B=0;B<S.length;B+=x){const A=S.slice(B,B+x),F=await Promise.all(A.map(T=>W(`/repos/${i.owner}/${i.repo}/git/blobs/${T.sha}`,f)));for(let T=0;T<A.length;T++){const O=F[T];if(!O.ok)continue;const X=l+"/"+A[T].path,ie=X.substring(0,X.lastIndexOf("/"));ie&&!e.volume.existsSync(ie)&&e.volume.mkdirSync(ie,{recursive:!0});let ye;O.data.encoding==="base64"?ye=atob(O.data.content.replace(/\n/g,"")):ye=O.data.content,e.volume.writeFileSync(X,ye),w++}}dt([],{...e,cwd:l});const D=new le(e.volume,l,l+"/.git");D.setConfigValue("remote.origin.url",o),D.setConfigValue("remote.origin.fetch","+refs/heads/*:refs/remotes/origin/*"),D.setConfigValue("branch."+s+".remote","origin"),D.setConfigValue("branch."+s+".merge","refs/heads/"+s),D.setHEAD("ref: refs/heads/"+s),D.walkWorkTree(l,"",(B,A)=>{D.addToIndex(B,A)});const G=D.readIndex(),_=D.buildTree(G),V=D.createCommit(`Clone of ${o}`,null,_);return D.updateBranchRef(s,V),y(`Cloning into '${t[1]??i.repo}'...
remote: Enumerating objects: ${w}
Receiving objects: 100% (${w}/${w}), done.
`)}async function kn(n,e){var r,t,o,s,a;const u=L(e.volume,e.cwd);if("error"in u)return u.error;const{repo:i}=u,f=Ie(e.env);if(!f)return b(`fatal: authentication required. Set GITHUB_TOKEN environment variable.
`,128);const l=n.filter(A=>!A.startsWith("-")),c=l[0]??"origin",d=i.getCurrentBranch();if(!d)return b(`fatal: not on a branch
`,128);const h=l[1]??d,g=i.getRemoteUrl(c);if(!g)return b(`fatal: '${c}' does not appear to be a git repository
`,128);const p=i.parseGitHubUrl(g);if(!p)return b(`fatal: remote '${c}' is not a GitHub URL
`,128);const m=i.resolveHEAD();if(!m)return b(`fatal: nothing to push
`,128);const $=i.getCommitTree(m),w=new Map;for(const[A,F]of $){const T=i.getBlobContent(F);if(T===null)continue;const O=await W(`/repos/${p.owner}/${p.repo}/git/blobs`,f,"POST",{content:btoa(T),encoding:"base64"});if(!O.ok)return b(`fatal: failed to create blob for ${A}: ${(r=O.data)==null?void 0:r.message}
`,128);w.set(A,O.data.sha)}const S=Array.from(w).map(([A,F])=>({path:A,mode:"100644",type:"blob",sha:F})),x=await W(`/repos/${p.owner}/${p.repo}/git/trees`,f,"POST",{tree:S});if(!x.ok)return b(`fatal: failed to create tree: ${(t=x.data)==null?void 0:t.message}
`,128);let D=null;const G=await W(`/repos/${p.owner}/${p.repo}/git/ref/heads/${h}`,f);G.ok&&(D=G.data.object.sha);const _=i.readCommit(m),V={message:_?.message??"Push from nodepod",tree:x.data.sha};D&&(V.parents=[D]);const B=await W(`/repos/${p.owner}/${p.repo}/git/commits`,f,"POST",V);if(!B.ok)return b(`fatal: failed to create commit: ${(o=B.data)==null?void 0:o.message}
`,128);if(D){const A=n.includes("-f")||n.includes("--force"),F=await W(`/repos/${p.owner}/${p.repo}/git/refs/heads/${h}`,f,"PATCH",{sha:B.data.sha,force:A});if(!F.ok)return b(`fatal: failed to update ref: ${(s=F.data)==null?void 0:s.message}
`,128)}else{const A=await W(`/repos/${p.owner}/${p.repo}/git/refs`,f,"POST",{ref:`refs/heads/${h}`,sha:B.data.sha});if(!A.ok)return b(`fatal: failed to create ref: ${(a=A.data)==null?void 0:a.message}
`,128)}return y(`To ${g}
   ${(D??"000000").slice(0,7)}..${B.data.sha.slice(0,7)}  ${d} -> ${h}
`)}async function xn(n,e){const r=L(e.volume,e.cwd);if("error"in r)return r.error;const{repo:t}=r,o=Ie(e.env);if(!o)return b(`fatal: authentication required. Set GITHUB_TOKEN environment variable.
`,128);const s=n.filter(_=>!_.startsWith("-")),a=s[0]??"origin",u=t.getCurrentBranch();if(!u)return b(`fatal: not on a branch
`,128);const i=s[1]??u,f=t.getRemoteUrl(a);if(!f)return b(`fatal: '${a}' does not appear to be a git repository
`,128);const l=t.parseGitHubUrl(f);if(!l)return b(`fatal: remote '${a}' is not a GitHub URL
`,128);const c=await W(`/repos/${l.owner}/${l.repo}/git/ref/heads/${i}`,o);if(!c.ok)return b(`fatal: couldn't find remote ref refs/heads/${i}
`,128);const d=c.data.object.sha,h=t.resolveHEAD();if(h===d)return y(`Already up to date.
`);const g=await W(`/repos/${l.owner}/${l.repo}/git/commits/${d}`,o);if(!g.ok)return b(`fatal: could not fetch remote commit
`,128);const p=g.data.tree.sha,m=await W(`/repos/${l.owner}/${l.repo}/git/trees/${p}?recursive=1`,o);if(!m.ok)return b(`fatal: could not fetch tree
`,128);let $=0;const w=[];for(const _ of m.data.tree)_.type==="blob"&&w.push({path:_.path,sha:_.sha});const S=10;for(let _=0;_<w.length;_+=S){const V=w.slice(_,_+S),B=await Promise.all(V.map(A=>W(`/repos/${l.owner}/${l.repo}/git/blobs/${A.sha}`,o)));for(let A=0;A<V.length;A++){const F=B[A];if(!F.ok)continue;const T=t.workDir+"/"+V[A].path,O=T.substring(0,T.lastIndexOf("/"));O&&!e.volume.existsSync(O)&&e.volume.mkdirSync(O,{recursive:!0});let X;F.data.encoding==="base64"?X=atob(F.data.content.replace(/\n/g,"")):X=F.data.content,e.volume.writeFileSync(T,X),$++}}t.walkWorkTree(t.workDir,"",(_,V)=>{t.addToIndex(_,V)});const x=t.readIndex(),D=t.buildTree(x),G=t.createCommit(`Pull from ${a}/${i}`,h,D);return t.updateBranchRef(u,G),y(`From ${f}
Updating ${(h??"000000").slice(0,7)}..${d.slice(0,7)}
Fast-forward
 ${$} file${$!==1?"s":""} changed
`)}async function En(n,e){const r=L(e.volume,e.cwd);if("error"in r)return r.error;const{repo:t}=r,o=Ie(e.env);if(!o)return b(`fatal: authentication required. Set GITHUB_TOKEN environment variable.
`,128);const a=n.filter(c=>!c.startsWith("-"))[0]??"origin",u=t.getRemoteUrl(a);if(!u)return b(`fatal: '${a}' does not appear to be a git repository
`,128);const i=t.parseGitHubUrl(u);if(!i)return b(`fatal: remote '${a}' is not a GitHub URL
`,128);const f=await W(`/repos/${i.owner}/${i.repo}/branches`,o);if(!f.ok)return b(`fatal: could not list remote branches
`,128);let l=`From ${u}
`;for(const c of f.data){const d=t.gitDir+"/refs/remotes/"+a+"/"+c.name,h=d.substring(0,d.lastIndexOf("/"));e.volume.existsSync(h)||e.volume.mkdirSync(h,{recursive:!0}),e.volume.writeFileSync(d,c.commit.sha+`
`),l+=` * [updated]    ${c.name} -> ${a}/${c.name}
`}return y(l)}function Dn(){return{name:"git",async execute(n,e){if(n.length===0)return y(`usage: git [--version] <command> [<args>]
`);let r=e;if(n[0]==="-C"&&n[1]){const s=be(e.cwd,n[1]);r={...e,cwd:s},n=n.slice(2)}const t=n[0],o=n.slice(1);switch(t){case"--version":case"-v":return y(`git version ${J.GIT}
`);case"--help":case"help":return y(`usage: git <command> [<args>]

Available commands:
  init       Create an empty Git repository
  clone      Clone a repository from GitHub
  add        Add file contents to the index
  status     Show the working tree status
  commit     Record changes to the repository
  log        Show commit logs
  diff       Show changes
  branch     List, create, or delete branches
  checkout   Switch branches or restore files
  switch     Switch branches
  merge      Join two development histories together
  remote     Manage set of tracked repositories
  push       Update remote refs (GitHub)
  pull       Fetch and integrate remote changes (GitHub)
  fetch      Download objects from remote (GitHub)
  stash      Stash the changes in a dirty working directory
  reset      Reset current HEAD to the specified state
  rm         Remove files from the working tree and index
  rev-parse  Ancillary plumbing command
  config     Get and set repository options
`);case"init":return dt(o,r);case"clone":return Sn(o,r);case"add":return ln(o,r);case"status":return un(o,r);case"commit":return dn(o,r);case"log":return fn(o,r);case"diff":return hn(o,r);case"branch":return mn(o,r);case"checkout":return ft(o,r);case"switch":return pn(o,r);case"merge":return wn(o,r);case"remote":return vn(o,r);case"push":return kn(o,r);case"pull":return xn(o,r);case"fetch":return En(o,r);case"stash":return yn(o,r);case"reset":return Cn(o,r);case"rm":return bn(o,r);case"rev-parse":return gn(o,r);case"config":return $n(o,r);default:return b(`git: '${t}' is not a git command. See 'git --help'.
`)}}}}let H=null,E=null;const ht=globalThis.setTimeout.bind(globalThis);let pe=null,Re=!0,ve=null,re=null,ge=null,Ce=null,Se=null,Pe=null;const Me=new Set;Ot=function(n,e){var r,t,o,s;for(const a of Me)(t=(r=a.stdout)==null?void 0:r._setSize)==null||t.call(r,n,e),(s=(o=a.stderr)==null?void 0:o._setSize)==null||s.call(o,n,e)};function Le(){const n=Z();return n?.stdoutSink??ve}function He(){const n=Z();return n?.stderrSink??re}function _n(){const n=Z();return n?n.abortController.signal:ge}function mt(){const n=Z();return n?.liveStdin??ke}function An(){var n;const e=Z();return((n=e?.termCols)==null?void 0:n.call(e))??Ce?.()??80}function In(){var n;const e=Z();return((n=e?.termRows)==null?void 0:n.call(e))??Se?.()??24}function pt(n){var e;if(n instanceof Error){let t=((e=n.constructor)!=null&&e.name&&n.constructor.name!=="Error"?`${n.constructor.name}: `:"")+(n.message||n.name||"Unknown error");return n.stack&&(t+=`
`+n.stack),t}return n==null?"Script threw a falsy value":String(n)||"Unknown error (non-Error object thrown)"}qt=function(n){ve=n.onStdout??null,re=n.onStderr??null,ge=n.signal??null,Ce=n.getCols??null,Se=n.getRows??null,Pe=n.onRawModeChange??null;const e=Z();e&&(e.stdoutSink=n.onStdout??null,e.stderrSink=n.onStderr??null,n.signal&&n.signal.addEventListener("abort",()=>e.abortController.abort(),{once:!0}),e.termCols=n.getCols??null,e.termRows=n.getRows??null)},Bt=function(){ve=null,re=null,ge=null,Ce=null,Se=null,Pe=null;const n=Z();n&&(n.stdoutSink=null,n.stderrSink=null,n.termCols=null,n.termRows=null)},Jt=function(n){pe=n},Gt=function(n){Re=n};let Ue=null;Vt=function(n){Ue=n};let Ge=null;Lt=function(n){Ge=n};let Be=null,Ve=null,Te=[];Ut=function(n){Be=n},ot=function(n){if(Ve=n,Te.length>0){const e=Te;Te=[];for(const r of e)n(r)}},Ft=function(n){Ve?Ve(n):Te.push(n)},De=function(){return H?.getCwd()??"/"},lr=function(n){H&&H.setCwd(n)},Yt=function(n,e,r){if(!H){r(new Error("[Nodepod] Shell not initialized"),"","");return}H.exec(n,e).then(t=>{if(t.exitCode!==0){const o=new Error(`Command failed: ${n}`);o.code=t.exitCode,r(o,t.stdout,t.stderr)}else r(null,t.stdout,t.stderr)},t=>{r(t instanceof Error?t:new Error(String(t)),"","")})};let ke=null;cr=function(){const n=mt();return n?!!n.isRaw:!1},Mt=function(n){const e=mt();e&&e.emit("data",n)},Wt=function(n,e){E=n,H=new he(n,{cwd:e?.cwd??"/",env:{HOME:"/home/user",USER:"user",PATH:"/usr/local/bin:/usr/bin:/bin:/node_modules/.bin",NODE_ENV:"development",TERM:"xterm-256color",COLORTERM:"truecolor",npm_config_user_agent:Xe.npm_config_user_agent,npm_execpath:Xe.npm_execpath,npm_node_execpath:Xe.npm_node_execpath,...e?.env}});const r={installPackages:$t,uninstallPackages:On,listPackages:Mn,runScript:Hn,npmInitOrCreate:Ln,npmInfo:Un,npmPack:Gn,npmConfig:Vn,npxExecute:vt,executeNodeBinary:We,evalCode:(t,o)=>Rn(t,o),printCode:(t,o)=>Pn(t,o),removeNodeModules:t=>{const o=`${t}/node_modules`.replace(/\/+/g,"/");E.existsSync(o)&&qe(E,o)},formatErr:Q,formatWarn:Ne,hasFile:t=>!!E&&E.existsSync(t),readFile:t=>E.readFileSync(t,"utf8"),writeFile:(t,o)=>E.writeFileSync(t,o)};H.registerCommand(rn(r)),H.registerCommand(sn(r)),H.registerCommand(Qt(r)),H.registerCommand(Xt(r)),H.registerCommand(Zt(r)),H.registerCommand(tn(r)),H.registerCommand(nn(r)),H.registerCommand(Dn())};function Rn(n,e){let r="",t="";const o=new Ze(E,{cwd:e.cwd,env:e.env,enableSharedArrayBuffer:Re,onConsole:(s,a)=>{const u=et(a[0],...a.slice(1))+`
`;s==="error"?t+=u:r+=u},onStdout:s=>{r+=s},onStderr:s=>{t+=s}});try{o.execute(n,"/<eval>.js")}catch(s){return de(s)?{stdout:r,stderr:t,exitCode:0}:(t+=`Error: ${s instanceof Error?s.message:String(s)}
`,{stdout:r,stderr:t,exitCode:1})}return{stdout:r,stderr:t,exitCode:0}}function Pn(n,e){let r="",t="";const o=new Ze(E,{cwd:e.cwd,env:e.env,enableSharedArrayBuffer:Re,onConsole:(s,a)=>{const u=et(a[0],...a.slice(1))+`
`;s==="error"?t+=u:r+=u},onStdout:s=>{r+=s},onStderr:s=>{t+=s}});try{const s=o.execute(n,"/<print>.js");r+=String(s.exports)+`
`}catch(s){return t+=`Error: ${s instanceof Error?s.message:String(s)}
`,{stdout:r,stderr:t,exitCode:1}}return{stdout:r,stderr:t,exitCode:0}}function qe(n,e){for(const r of n.readdirSync(e)){const t=`${e}/${r}`;n.statSync(t).isDirectory()?qe(n,t):n.unlinkSync(t)}n.rmdirSync(e)}function xe(n){const e=`${n}/package.json`.replace(/\/+/g,"/");if(!E.existsSync(e))return{fail:{stdout:"",stderr:Q("package.json not found","npm"),exitCode:1}};try{return{pkg:JSON.parse(E.readFileSync(e,"utf8"))}}catch{return{fail:{stdout:"",stderr:Q("Malformed package.json","npm"),exitCode:1}}}}async function Hn(n,e){const r=n[0];if(!r){const S=xe(e.cwd);if("fail"in S)return S.fail;const x=S.pkg.scripts??{},D=Object.keys(x);if(D.length===0)return{stdout:"",stderr:"",exitCode:0};let G=`Scripts in ${S.pkg.name??""}:
`;for(const _ of D)G+=`  ${_}
    ${x[_]}
`;return{stdout:G,stderr:"",exitCode:0}}const t=n.indexOf("--"),o=t>=0?n.slice(t+1):[],s=xe(e.cwd);if("fail"in s)return s.fail;const a=s.pkg.scripts??{};let u=a[r];if(!u){let S=Q(`Missing script: "${r}"`,"npm");const x=Object.keys(a);if(x.length){S+=`
Available:
`;for(const D of x)S+=`  ${oe}${D}${v}: ${R}${a[D]}${v}
`}return{stdout:"",stderr:S,exitCode:1}}o.length>0&&(u+=" "+o.map(S=>S.includes(" ")?`"${S}"`:S).join(" "));const i=`${e.cwd}/node_modules/.bin`.replace(/\/+/g,"/"),f=e.env.PATH||"",l=f.includes(i)?f:`${i}:${f}`,c={...e.env,PATH:l,npm_lifecycle_event:r};s.pkg.name&&(c.npm_package_name=s.pkg.name),s.pkg.version&&(c.npm_package_version=s.pkg.version);let d="",h="";const g=`${s.pkg.name??""}@${s.pkg.version??""}`,p=a[`pre${r}`];if(p){const S=`
> ${g} pre${r}
> ${p}

`;h+=S,re&&re(S);const x=await e.exec(p,{cwd:e.cwd,env:c});if(d+=x.stdout,h+=x.stderr,x.exitCode!==0)return{stdout:d,stderr:h,exitCode:x.exitCode}}const m=`
> ${g} ${r}
> ${u}

`;h+=m,re&&re(m);const $=await e.exec(u,{cwd:e.cwd,env:c});if(d+=$.stdout,h+=$.stderr,$.exitCode!==0)return{stdout:d,stderr:h,exitCode:$.exitCode};const w=a[`post${r}`];if(w){const S=`
> ${g} post${r}
> ${w}

`;h+=S,re&&re(S);const x=await e.exec(w,{cwd:e.cwd,env:c});if(d+=x.stdout,h+=x.stderr,x.exitCode!==0)return{stdout:d,stderr:h,exitCode:x.exitCode}}return{stdout:d,stderr:h,exitCode:0}}const v="\x1B[0m",se="\x1B[1m",R="\x1B[2m",ue="\x1B[31m",Je="\x1B[32m",we="\x1B[33m",Bn="\x1B[34m",oe="\x1B[36m",Tn="\x1B[37m",Ye="\x1B[2K",gt=["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];function Nn(n,e){let r=0,t=n;const o=setInterval(()=>{e(`${Ye}\r${oe}${gt[r]}${v} ${t}`),r=(r+1)%gt.length},80);return{update(s){t=s},succeed(s){clearInterval(o),e(`${Ye}\r${Je}✔${v} ${s}
`)},fail(s){clearInterval(o),e(`${Ye}\r${ue}✖${v} ${s}
`)},stop(){clearInterval(o)}}}const jn={npm:ue,pnpm:we,yarn:Bn,bun:Tn};function Fn(n,e="npm"){const r=jn[e],t=n.match(/^Resolving\s+(.+?)\.{3}$/);if(t)return`${R}Resolving${v} ${r}${t[1]}${v}${R}...${v}`;const o=n.match(/^Downloading\s+(\d+)\s+package/);if(o)return`${R}Downloading${v} ${we}${o[1]}${v} ${R}packages...${v}`;const s=n.match(/^(?:\s*)?Fetching\s+(.+?)\.{3}$/);if(s)return`${R}Fetching${v} ${r}${s[1]}${v}${R}...${v}`;if(n.match(/^(?:\s*)?Transformed\s+(\d+)\s+file/))return`${R}${n.trim()}${v}`;if(n.match(/^Installed\s+(\d+)/))return`${Je}${n}${v}`;const i=n.match(/^Skipping\s+(.+?)\s+\(up to date\)$/);return i?`${R}Skipping${v} ${r}${i[1]}${v} ${R}(up to date)${v}`:n}function Wn(n,e,r){const t=`${n} package${n!==1?"s":""}`;switch(r){case"npm":return`${se}added ${t}${v} ${R}in ${e}s${v}`;case"pnpm":return`${se}packages:${v} ${Je}+${n}${v}
${R}Done in ${e}s${v}`;case"yarn":return`${se}${t} added${v} ${R}in ${e}s${v}`;case"bun":return`${se}${t} installed${v} ${R}[${e}s]${v}`}}function Q(n,e){switch(e){case"npm":return`${ue}npm ERR!${v} ${n}
`;case"pnpm":return`${ue} ERR_PNPM${v}  ${n}
`;case"yarn":return`${ue}error${v} ${n}
`;case"bun":return`${ue}error:${v} ${n}
`}}function Ne(n,e){switch(e){case"npm":return`${we}npm WARN${v} ${n}
`;case"pnpm":return`${we} WARN${v}  ${n}
`;case"yarn":return`${we}warning${v} ${n}
`;case"bun":return`${we}warn:${v} ${n}
`}}async function $t(n,e,r="npm"){const{DependencyInstaller:t}=await Qe(()=>import("./index-hG14gnXQ.js").then(l=>l.t),__vite__mapDeps([0,1,2])).then(async l=>(await l.__tla,l)).then(l=>l.aj),o=new t(E,{cwd:e.cwd});let s="";const a=ve??(l=>{}),u=Date.now(),i=r==="bun"?`${R}bun install${v} ${R}${J.BUN_V}${v}`:`${R}Resolving dependencies...${v}`,f=Nn(i,a);try{const l=n.filter(w=>!w.startsWith("-")),c=w=>{const S=Fn(w,r);s+=w+`
`,f.update(S)},d=n.some(w=>w==="-D"||w==="--save-dev"||w==="--dev"),h=n.some(w=>w==="--no-save");let g;for(let w=0;w<n.length;w++){const S=n[w];if(S==="--registry"&&n[w+1]){g=n[w+1];break}if(S.startsWith("--registry=")){g=S.slice(11);break}}let p=0;if(l.length===0)p=(await o.installFromManifest(void 0,{withDevDeps:!0,onProgress:c,registry:g})).newPackages.length;else for(const w of l){const S=await o.install(w,void 0,{persist:!h,persistDev:d&&!h,onProgress:c,registry:g});p+=S.newPackages.length}const m=((Date.now()-u)/1e3).toFixed(1),$=Wn(p,m,r);return f.succeed($),s+=`added ${p} packages in ${m}s
`,{stdout:s,stderr:"",exitCode:0}}catch(l){const c=l instanceof Error?l.message:String(l);return f.fail(`${ue}${c}${v}`),{stdout:s,stderr:Q(c,r),exitCode:1}}}async function On(n,e,r="npm"){var t,o;const s=n.filter(i=>!i.startsWith("-"));if(s.length===0)return{stdout:"",stderr:Q("Must specify package to remove",r),exitCode:1};const a=ve??(i=>{});let u="";for(const i of s){const f=`${e.cwd}/node_modules/${i}`.replace(/\/+/g,"/");if(E.existsSync(f))try{qe(E,f);const c=r==="bun"?`${R}-${v} ${i}`:r==="pnpm"?`${ue}-${v} ${i}`:`removed ${i}`;u+=c+`
`,a(c+`
`)}catch(c){return{stdout:u,stderr:Q(`Failed to remove ${i}: ${c instanceof Error?c.message:String(c)}`,r),exitCode:1}}else u+=Ne(`${i} not installed`,r);const l=xe(e.cwd);if(!("fail"in l)){const c=l.pkg;let d=!1;if((t=c.dependencies)!=null&&t[i]&&(delete c.dependencies[i],d=!0),(o=c.devDependencies)!=null&&o[i]&&(delete c.devDependencies[i],d=!0),d){const h=`${e.cwd}/package.json`.replace(/\/+/g,"/");E.writeFileSync(h,JSON.stringify(c,null,2))}}}return{stdout:u,stderr:"",exitCode:0}}async function Mn(n,e="npm"){const{DependencyInstaller:r}=await Qe(()=>import("./index-hG14gnXQ.js").then(f=>f.t),__vite__mapDeps([0,1,2])).then(async f=>(await f.__tla,f)).then(f=>f.aj),o=new r(E,{cwd:n.cwd}).listInstalled(),s=Object.entries(o);if(s.length===0)return{stdout:`${R}(empty)${v}
`,stderr:"",exitCode:0};const a=xe(n.cwd),u="fail"in a?n.cwd:`${a.pkg.name??"project"}@${a.pkg.version??"0.0.0"}`;let i="";switch(e){case"npm":i+=`${u} ${n.cwd}
`;for(let f=0;f<s.length;f++){const[l,c]=s[f],d=f===s.length-1;i+=`${d?"└──":"├──"} ${l}@${R}${c}${v}
`}break;case"pnpm":i+=`${R}Legend: production dependency, optional only, dev only${v}

`,i+=`${u} ${n.cwd}

`,i+=`${se}dependencies:${v}
`;for(const[f,l]of s)i+=`${f} ${R}${l}${v}
`;break;case"yarn":i+=`${se}${u}${v}
`;for(let f=0;f<s.length;f++){const[l,c]=s[f],d=f===s.length-1;i+=`${d?"└─":"├─"} ${l}@${oe}${c}${v}
`}break;case"bun":for(const[f,l]of s)i+=`${f}@${R}${l}${v}
`;i+=`
${R}${s.length} packages installed${v}
`;break}return{stdout:i,stderr:"",exitCode:0}}async function Ln(n,e,r){const t=n.filter(l=>l.startsWith("-")),o=n.filter(l=>!l.startsWith("-"));if(e==="create"||e==="init"&&o.length>0){const l=o[0];let c;if(l.startsWith("@"))c=l;else{const d=l.indexOf("@");if(d>0){const h=l.slice(0,d),g=l.slice(d);c=`create-${h}${g}`}else c=`create-${l}`}return vt(["-y",c,...o.slice(1),...t],r)}const s=`${r.cwd}/package.json`.replace(/\/+/g,"/");if(E.existsSync(s))return{stdout:"",stderr:Ne("package.json already exists","npm"),exitCode:0};const a=t.includes("-y")||t.includes("--yes"),i={name:r.cwd.split("/").filter(Boolean).pop()||"my-project",version:"1.0.0",description:"",main:"index.js",scripts:{test:'echo "Error: no test specified" && exit 1',start:"node index.js"},keywords:[],author:"",license:"ISC"};return E.writeFileSync(s,JSON.stringify(i,null,2)),{stdout:a?`Wrote to ${s}
`:`Wrote to ${s}

${JSON.stringify(i,null,2)}
`,stderr:"",exitCode:0}}async function Un(n,e){var r;const t=n[0];if(!t)return{stdout:"",stderr:Q("Usage: npm info <package>","npm"),exitCode:1};const o=`/node_modules/${t}/package.json`;if(E.existsSync(o))try{const s=JSON.parse(E.readFileSync(o,"utf8"));let a=`${s.name}@${s.version}
`;if(s.description&&(a+=`${s.description}
`),s.license&&(a+=`license: ${s.license}
`),s.homepage&&(a+=`homepage: ${s.homepage}
`),s.dependencies){a+=`
dependencies:
`;for(const[u,i]of Object.entries(s.dependencies))a+=`  ${u}: ${i}
`}return{stdout:a,stderr:"",exitCode:0}}catch{}try{const{RegistryClient:s}=await Qe(()=>import("./index-hG14gnXQ.js").then(l=>l.t),__vite__mapDeps([0,1,2])).then(async l=>(await l.__tla,l)).then(l=>l.ax),u=await new s().fetchManifest(t),i=(r=u["dist-tags"])==null?void 0:r.latest;let f=`${t}@${i??"unknown"}
`;if(i&&u.versions[i]){const l=u.versions[i];l.description&&(f+=`${l.description}
`),l.license&&(f+=`license: ${l.license}
`),l.homepage&&(f+=`homepage: ${l.homepage}
`)}return{stdout:f,stderr:"",exitCode:0}}catch{return{stdout:"",stderr:Q(`Not found: ${t}`,"npm"),exitCode:1}}}function Gn(n){const e=xe(n.cwd);if("fail"in e)return e.fail;const r=`${R}npm notice${v}`;let t=`${r}
`;t+=`${r} ${se}package:${v} ${e.pkg.name}@${e.pkg.version}
`;const o=[],s=a=>{try{for(const u of E.readdirSync(a)){if(u==="node_modules"||u.startsWith("."))continue;const i=`${a}/${u}`;E.statSync(i).isDirectory()?s(i):o.push(i)}}catch{}};s(n.cwd);for(const a of o)t+=`${r} ${a}
`;return t+=`${r} ${se}total files:${v} ${o.length}
`,{stdout:t,stderr:"",exitCode:0}}function Vn(n,e){const r=n[0];if(!r||r==="list"){let t=`; nodepod project config
`;return t+=`prefix = "${e.cwd}"
`,t+=`registry = "${je}"
`,{stdout:t,stderr:"",exitCode:0}}if(r==="get"){const t=n[1];return t==="prefix"?{stdout:e.cwd+`
`,stderr:"",exitCode:0}:t==="registry"?{stdout:je+`
`,stderr:"",exitCode:0}:{stdout:`undefined
`,stderr:"",exitCode:0}}return r==="set"?{stdout:"",stderr:Ne("config set: not supported in nodepod","npm"),exitCode:0}:{stdout:"",stderr:Q(`config: unknown subcommand "${r}"`,"npm"),exitCode:1}}We=async function(n,e,r,t){if(!E)return{stdout:"",stderr:`Volume unavailable
`,exitCode:1};const o=n.startsWith("/")?n:`${r.cwd}/${n}`.replace(/\/+/g,"/");let s="";if(E.existsSync(o)&&!E.statSync(o).isDirectory())s=o;else{const p=[".js",".mjs",".cjs",".ts",".tsx",".jsx"];for(const m of p)if(E.existsSync(o+m)){s=o+m;break}if(!s){const m=o.endsWith("/")?o:o+"/";for(const $ of["index.js","index.mjs","index.ts","index.cjs"])if(E.existsSync(m+$)){s=m+$;break}}}if(!s){const p=`Cannot locate module '${o}'
`,m=He();return m&&m(p),{stdout:"",stderr:p,exitCode:1}}let a="",u="",i=!1,f=0;const l=p=>{a+=p;const m=Le();return m&&m(p),!0},c=p=>{u+=p;const m=He();return m&&m(p),!0},d=globalThis.process,h=Z(),g=Yn({volume:E,cwd:r.cwd,env:r.env});g.stdoutSink=h?.stdoutSink??ve,g.stderrSink=h?.stderrSink??re,g.liveStdin=h?.liveStdin??ke,g.termCols=h?.termCols??Ce,g.termRows=h?.termRows??Se,h&&h.abortController.signal.aborted||ge?.aborted?g.abortController.abort():ge&&ge.addEventListener("abort",()=>g.abortController.abort(),{once:!0}),Rt(g);try{const p=new Ze(E,{cwd:r.cwd,env:r.env,enableSharedArrayBuffer:Re,onConsole:(C,k)=>{if(k.length===1){const q=k[0];if(de(q)||typeof q=="string"&&q.startsWith("Error: Process exited with code"))return}const j=et(k[0],...k.slice(1))+`
`;C==="error"?c(j):l(j)},onStdout:l,onStderr:c,workerThreadsOverride:t?.workerThreadsOverride}),m=p.getProcess();m._chdirHook=C=>{H&&H.setCwd(C)};let $;const w=new Promise(C=>{$=C});m.exit=(C=0)=>{if(!(zn().size>0&&C!==0))throw i||(i=!0,f=C,m.emit("exit",C),$()),new Kn(C)},m.argv=["node",s,...e],Be&&(m.send=(C,k)=>Be?(Be(C),typeof k=="function"&&k(null),!0):!1,m.connected=!0,m.disconnect=()=>{m.connected=!1},ot(C=>{m.emit("message",C)}));const S=ke,x=_n();if(x){m.stdout.isTTY=!0,m.stderr.isTTY=!0,m.stdin.isTTY=!0;const C=An(),k=In();m.stdout.columns=C,m.stdout.rows=k,m.stderr.columns=C,m.stderr.rows=k,m.stdin.setRawMode=q=>(m.stdin.isRaw=q,Pe&&Pe(q),m.stdin),ke=m.stdin;const j=Z();j&&(j.liveStdin=m.stdin),Me.add(m)}const D=!!t?.isFork;let G=null;if(D){G=Ee().register("IPCChannel");const C=m.disconnect;m.disconnect=()=>{C?.call(m),G?.close(),G=null}}let _=null,V=!1,B;const A=new Promise(C=>{B=C});try{p.runFileTLA(s).catch(k=>{if(de(k))return;const j=pt(k);c(`Error: ${j}
`),i||(i=!0,f=1)}).finally(()=>{V=!0,B()})}catch(C){if(!de(C)){const k=pt(C);_=C instanceof Error?C:new Error(k)}}const F=()=>{d&&(globalThis.process=d)};if(_){F();const C=_.message||_.name||"Unknown error",k=_.stack||"",j=k&&!k.includes(C)?`${C}
${k}`:k||C;return{stdout:a,stderr:u+`Error: ${j}
`,exitCode:1}}if(i)return F(),{stdout:a,stderr:u,exitCode:f};await new Promise(C=>ht(C,0));const T=Ee(),O=()=>V?T.activeRefedCount()>0:!0,X=()=>{if(i)return f;const C=m.exitCode;return typeof C=="number"?C:0};let ie=!1;const ye=async()=>{if(ie)return;ie=!0;const C=X();try{m.emit("beforeExit",C)}catch(k){if(de(k))return}try{await T.emitBeforeExit(C)}catch(k){if(de(k))return}await new Promise(k=>ht(k,0))};if(!x&&!O()){if(i||await ye(),!i&&!O()){const C=X();try{m.emit("exit",C)}catch{}return F(),{stdout:a,stderr:u,exitCode:C}}O()&&(ie=!1)}const Ke=new WeakSet,_t=C=>{C.preventDefault();const k=C.reason;if(de(k))return;k!=null&&typeof k=="object"&&Ke.add(k);try{const q=m.listenerCount?m.listenerCount("unhandledRejection")>0:!1;if(m.emit("unhandledRejection",k,C.promise),q)return}catch{}const j=k instanceof Error?`Unhandled rejection: ${k.message}
${k.stack??""}
`:`Unhandled rejection: ${String(k)}
`;c(j)},At=C=>{C.preventDefault();const k=C.error??new Error(C.message||"Unknown error");if(de(k)||k!=null&&typeof k=="object"&&Ke.has(k))return;k!=null&&typeof k=="object"&&Ke.add(k);try{const q=m.listenerCount?m.listenerCount("uncaughtException")>0:!1;if(m.emit("uncaughtException",k),q)return}catch{}try{if(m.listenerCount?m.listenerCount("unhandledRejection")>0:!1)return}catch{}const j=k instanceof Error?`${k.stack||k.message}
`:`Uncaught: ${String(k)}
`;c(j)},It=typeof globalThis.addEventListener=="function";It&&(globalThis.addEventListener("unhandledrejection",_t),globalThis.addEventListener("error",At));try{const C=x?new Promise(j=>{if(x.aborted){j();return}x.addEventListener("abort",()=>j(),{once:!0})}):null;for(;!i&&!x?.aborted;){if(!V){const q=[A,T.drainPromise(),w];C&&q.push(C),await Promise.race(q);continue}if(T.activeRefedCount()===0){if(!ie){if(await ye(),i||x?.aborted)break;if(T.activeRefedCount()>0){ie=!1;continue}}break}const j=[T.drainPromise(),w];C&&j.push(C),await Promise.race(j),T.activeRefedCount()>0&&(ie=!1)}const k=X();if(!i)try{m.emit("exit",k)}catch{}return{stdout:a,stderr:u,exitCode:k}}finally{F(),m.exit=()=>{},It&&(globalThis.removeEventListener("unhandledrejection",_t),globalThis.removeEventListener("error",At)),ke=S;const C=Z();C&&(C.liveStdin=S),Me.delete(m),Qn(),Ee().closeAll(),Xn()}}finally{Rt(h)}};async function vt(n,e){if(!E)return{stdout:"",stderr:`Volume unavailable
`,exitCode:1};let r=!0,t=null;const o=[];let s=!1;for(let l=0;l<n.length;l++){if(s){o.push(n[l]);continue}if(n[l]==="--"){s=!0;continue}if(n[l]==="-y"||n[l]==="--yes"){r=!0;continue}if(n[l]==="-n"||n[l]==="--no"){r=!1;continue}if((n[l]==="-p"||n[l]==="--package")&&l+1<n.length){t=n[++l];continue}if(n[l]==="--help"||n[l]==="-h")return{stdout:`${se}Usage:${v} npx [options] <command> [args...]

${se}Options:${v}
  ${oe}-y${v}, ${oe}--yes${v}       Auto-confirm install
  ${oe}-n${v}, ${oe}--no${v}        Don't install if not found
  ${oe}-p${v}, ${oe}--package${v}   Specify package to install
  ${oe}--${v}              Separator for command args
`,stderr:"",exitCode:0};o.push(n[l])}let a=o[0];if(!a)return{stdout:"",stderr:Q("missing command","npm"),exitCode:1};let u;if(a.startsWith("@")){const l=a.slice(1),c=l.indexOf("@");c>0&&l.indexOf("/")<c?(u="@"+l.slice(0,c),l.slice(c+1)):u=a}else{const l=a.indexOf("@");l>0?(u=a.slice(0,l),a.slice(l+1)):u=a}const i=t||a;t&&t.replace(/@[^@/]+$/,"").replace(/^@/,"");let f=wt(u,E,e.cwd);if(!f&&r){const l=await $t([i],e);if(l.exitCode!==0)return l;f=wt(u,E,e.cwd)}return f?We(f,o.slice(1),e):{stdout:"",stderr:`npx: command '${u}' not found
`,exitCode:1}}function wt(n,e,r){const t=(n.startsWith("@"),n),o=t.includes("/")?t.split("/").pop():t,s=r&&r!=="/"?[`${r}/node_modules`,"/node_modules"]:["/node_modules"];for(const a of s){const u=`${a}/${t}/package.json`;if(e.existsSync(u))try{const f=JSON.parse(e.readFileSync(u,"utf8"));if(f.bin){if(typeof f.bin=="string")return`${a}/${t}/${f.bin}`;if(typeof f.bin=="object"){const l=f.bin,c=l[o]||l[t]||Object.values(l)[0];if(c)return`${a}/${t}/${c}`}}if(f.main)return`${a}/${t}/${f.main}`}catch{}const i=`${a}/.bin/${n}`;if(e.existsSync(i))try{const l=e.readFileSync(i,"utf8").match(/node\s+"([^"]+)"/);if(l&&e.existsSync(l[1]))return l[1]}catch{}}return null}rt=function(n,e,r){let t={},o;typeof e=="function"?o=e:e&&(t=e,o=r);const s=new te;if(!H){const i=new Error("[Nodepod] exec requires shell. Call initShellExec() first.");return setTimeout(()=>{s.emit("error",i),o&&o(i,"","")},0),s}const a=t.cwd??De(),u=t.env??void 0;return H.exec(n,{cwd:a,env:u}).then(i=>{var f,l,c,d;const{stdout:h,stderr:g,exitCode:p}=i;if(h&&((f=s.stdout)==null||f.push(N.from(h))),g&&((l=s.stderr)==null||l.push(N.from(g))),(c=s.stdout)==null||c.push(null),(d=s.stderr)==null||d.push(null),s.exitCode=p,s.emit("close",p,null),s.emit("exit",p,null),o)if(p!==0){const m=new Error(`Command failed: ${n}`);m.code=p,o(m,h??"",g??"")}else o(null,h??"",g??"")},i=>{s.emit("error",i instanceof Error?i:new Error(String(i))),o&&o(i instanceof Error?i:new Error(String(i)),"","")}),s},st=function(n,e){var r,t;const o=n.trim(),s=e?.encoding,a=Et(o,e);if(a!==null)return s==="buffer"?N.from(a):a;if(!pe)throw new Error("[Nodepod] execSync needs SharedArrayBuffer + SyncChannel. enable COOP/COEP headers, or drop `enableSharedArrayBuffer: false` from NodepodOptions.");const u=pe.allocateSlot(),i=e?.cwd??((t=(r=globalThis.process)==null?void 0:r.cwd)==null?void 0:t.call(r))??"/",f=e?.env??{};self.postMessage({type:"spawn-sync",requestId:yt++,command:o.split(/\s+/)[0],args:o.split(/\s+/).slice(1),cwd:i,env:f,syncSlot:u,shellCommand:o});const{exitCode:l,stdout:c}=pe.waitForResult(u,12e4);if(l!==0){const d=new Error(`Command failed: ${o}
${c}`);throw d.status=l,d.stderr=N.from(""),d.stdout=N.from(c),d.output=[null,d.stdout,d.stderr],d}return s==="buffer"?N.from(c):c};let yt=1;const bt={node:"/usr/local/bin/node",npm:"/usr/local/bin/npm",npx:"/usr/local/bin/npx",pnpm:"/usr/local/bin/pnpm",yarn:"/usr/local/bin/yarn",bun:"/usr/local/bin/bun",bunx:"/usr/local/bin/bunx",git:"/usr/bin/git"};function Ct(n){if(bt[n])return bt[n];if(E){const e=`/node_modules/.bin/${n}`;if(E.existsSync(e))return e}return null}function St(n){const e=new Error(`Command failed: ${n}
/bin/sh: 1: ${n.split(/\s+/)[0]}: not found
`);throw e.status=127,e.stderr=N.from(`/bin/sh: 1: ${n.split(/\s+/)[0]}: not found
`),e.stdout=N.from(""),e}function ze(n){if(!E)return null;let e=n;for(;;){const r=e+"/.git";try{if(E.existsSync(r))return{gitDir:r,workDir:e}}catch{}const t=e.substring(0,e.lastIndexOf("/"))||"/";if(t===e)break;e=t}try{if(E.existsSync("/.git"))return{gitDir:"/.git",workDir:"/"}}catch{}return null}function kt(n){try{const e=E.readFileSync(n+"/HEAD","utf8").trim();return e.startsWith("ref: refs/heads/")?e.slice(16):e.slice(0,7)}catch{return"main"}}function xt(n){try{const e=E.readFileSync(n+"/HEAD","utf8").trim();if(e.startsWith("ref: ")){const r=n+"/"+e.slice(5);return E.readFileSync(r,"utf8").trim()}return e}catch{return null}}function qn(n,e){try{const r=E.readFileSync(n+"/config","utf8"),t=e.split(".");let o,s=null,a;if(t.length===3)o=t[0],s=t[1],a=t[2];else if(t.length===2)o=t[0],a=t[1];else return null;const u=r.split(`
`);let i=!1;for(const f of u){const l=f.trim();if(l.startsWith("[")){i=s?l===`[${o} "${s}"]`:l===`[${o}]`;continue}if(i){const c=l.match(/^(\w+)\s*=\s*(.*)$/);if(c&&c[1]===a)return c[2].trim()}}}catch{}return null}function Et(n,e){if(/^node\s+(--version|-v)\s*$/.test(n))return J.NODE+`
`;if(/^npm\s+(--version|-v)\s*$/.test(n))return J.NPM+`
`;if(/^pnpm\s+(--version|-v)\s*$/.test(n))return J.PNPM+`
`;if(/^yarn\s+(--version|-v)\s*$/.test(n))return J.YARN+`
`;if(/^bun\s+(--version|-v)\s*$/.test(n))return J.BUN+`
`;const r=n.match(/^(?:which|command\s+-v)\s+(\S+)\s*$/);if(r){const a=r[1],u=Ct(a);if(u)return u+`
`;St(n)}const t=n.match(/^(\S+)\s+(--version|-v)\s*$/);if(t){const a=t[1];if(a==="node"||a==="npm"||a==="pnpm"||a==="yarn"||a==="bun")return null;Ct(a)||St(n)}if(/^(?:npm|yarn|pnpm)\s+config\s+get\s+registry\s*$/.test(n))return je.replace(/\/$/,"")+`
`;const o=n.match(/^echo\s+["']?(.*?)["']?\s*$/);if(o)return o[1]+`
`;if(/^uname\s+-s\s*$/.test(n))return`Linux
`;if(/^uname\s+-m\s*$/.test(n))return`x86_64
`;if(/^uname\s+-a\s*$/.test(n))return`Linux nodepod 5.10.0 #1 SMP x86_64 GNU/Linux
`;if(/^git\s+(--version|-v)\s*$/.test(n)||n==="git --version")return"git version "+J.GIT+`
`;if(E){const a=n.match(/^git\s+rev-parse\s+(.+)$/);if(a){const i=a[1].trim(),f=e?.cwd||"/",l=ze(f);if(i==="--show-toplevel")return l?l.workDir+`
`:"";if(i==="--is-inside-work-tree")return l?`true
`:`false
`;if(i==="--git-dir")return l?`.git
`:"";if(i==="--is-bare-repository")return`false
`;if(i==="--abbrev-ref HEAD"&&l)return kt(l.gitDir)+`
`;if((i==="HEAD"||i==="--verify HEAD")&&l){const c=xt(l.gitDir);return c?c+`
`:""}if(i==="--short HEAD"&&l){const c=xt(l.gitDir);return c?c.slice(0,7)+`
`:""}}if(/^git\s+branch\s+--show-current\s*$/.test(n)){const i=e?.cwd||"/",f=ze(i);if(f)return kt(f.gitDir)+`
`}const u=n.match(/^git\s+config\s+(?:--get\s+)?(\S+)\s*$/);if(u){const i=e?.cwd||"/",f=ze(i);if(f){const l=qn(f.gitDir,u[1]);return l!==null?l+`
`:""}return""}}if(/^git\s/.test(n)||n==="true"||n===":")return"";if(n==="pwd")return(e?.cwd||"/")+`
`;if(n.startsWith("cat ")&&E){const a=n.slice(4).trim().replace(/['"]/g,"");try{return E.readFileSync(a,"utf8")}catch{return""}}if((n==="ls"||n.startsWith("ls "))&&E){const a=n==="ls"?e?.cwd||"/":n.slice(3).trim().replace(/['"]/g,"");try{return E.readdirSync(a).join(`
`)+`
`}catch{return""}}const s=n.match(/^(?:test|\[)\s+(-[fd])\s+["']?(.*?)["']?\s*\]?\s*$/);if(s&&E){const a=s[1],u=s[2];try{const i=E.statSync(u);if(a==="-f"&&i.isFile()||a==="-d"&&i.isDirectory())return""}catch{}return""}return null}function Dt(n){const e=r=>r==="inherit"||r==="ignore"||r==="pipe"?r:"pipe";if(n==null)return["pipe","pipe","pipe"];if(typeof n=="string"){const r=e(n);return[r,r,r]}return Array.isArray(n)?[e(n[0]),e(n[1]),e(n[2])]:["pipe","pipe","pipe"]}zt=function(n,e,r){let t=[],o={};Array.isArray(e)?(t=e,o=r??{}):e&&(o=e);const s=new te,a=Dt(o.stdio),u=a[0]==="inherit",i=a[1]==="inherit",f=a[2]==="inherit";if(Ue){const l=o.cwd??De(),c=o.env??{};t.length&&`${n}${t.join(" ")}`;const d=Ee().register("ChildProcess");s._elHandle=d;let h=!1,g=!1;Ue(n,t,{cwd:l,env:c,stdio:u?"inherit":"pipe",onStdout:p=>{var m;if(h=!0,a[1]==="pipe"&&((m=s.stdout)==null||m.push(N.from(p))),i){const $=Le();$&&$(p)}},onStderr:p=>{var m;if(g=!0,a[2]==="pipe"&&((m=s.stderr)==null||m.push(N.from(p))),f){const $=He();$&&$(p)}}}).then(({exitCode:p,stdout:m,stderr:$})=>{var w,S,x,D;d.close(),!h&&m&&((w=s.stdout)==null||w.push(N.from(m))),!g&&$&&((S=s.stderr)==null||S.push(N.from($))),(x=s.stdout)==null||x.push(null),(D=s.stderr)==null||D.push(null),s.exitCode=p,s.emit("close",p,null),s.emit("exit",p,null)}).catch(p=>{d.close(),s.emit("error",p instanceof Error?p:new Error(String(p)))})}else if(H){const l=o.cwd??De(),c=o.env??void 0,d=t.length?`${n} ${t.map(h=>h.includes(" ")?`"${h}"`:h).join(" ")}`:n;H.exec(d,{cwd:l,env:c}).then(h=>{var g,p,m,$;const{stdout:w,stderr:S,exitCode:x}=h;w&&((g=s.stdout)==null||g.push(N.from(w))),S&&((p=s.stderr)==null||p.push(N.from(S))),(m=s.stdout)==null||m.push(null),($=s.stderr)==null||$.push(null),s.exitCode=x,s.emit("close",x,null),s.emit("exit",x,null)},h=>{s.emit("error",h instanceof Error?h:new Error(String(h)))})}else setTimeout(()=>{s.emit("error",new Error("[Nodepod] spawn requires shell or worker mode."))},0);return queueMicrotask(()=>s.emit("spawn")),s},Kt=function(n,e,r){var t,o;let s=[],a={};Array.isArray(e)?(s=e,a=r??{}):e&&(a=e);const u=s.length?`${n} ${s.join(" ")}`:n,i=Et(u,{cwd:a.cwd,env:a.env});if(i!==null){const h=N.from(i),g=N.from("");return{stdout:h,stderr:g,status:0,signal:null,pid:fe.BASE+Math.floor(Math.random()*fe.RANGE),output:[null,h,g]}}if(!pe)throw new Error("[Nodepod] spawnSync needs SharedArrayBuffer + SyncChannel. enable COOP/COEP headers, or drop `enableSharedArrayBuffer: false` from NodepodOptions.");const f=pe.allocateSlot(),l=a.cwd??((o=(t=globalThis.process)==null?void 0:t.cwd)==null?void 0:o.call(t))??"/",c=a.env??{},d=Dt(a.stdio);self.postMessage({type:"spawn-sync",requestId:yt++,command:u.split(/\s+/)[0],args:u.split(/\s+/).slice(1),cwd:l,env:c,syncSlot:f,shellCommand:u,stdio:d});try{const{exitCode:h,stdout:g}=pe.waitForResult(f,12e4),p=N.from(g),m=N.from("");return{stdout:p,stderr:m,status:h,signal:null,pid:fe.BASE+Math.floor(Math.random()*fe.RANGE),output:[null,p,m]}}catch(h){const g=N.from(h?.stdout??""),p=N.from(h?.message??"");return{stdout:g,stderr:p,status:h?.status??1,signal:null,pid:fe.BASE+Math.floor(Math.random()*fe.RANGE),output:[null,g,p],error:h instanceof Error?h:new Error(String(h))}}},Nt=function(n,e,r){const t=e?.length?`${n} ${e.join(" ")}`:n;return st(t,r)},Tt=function(n,e,r,t){let o=[],s={},a;Array.isArray(e)?(o=e,typeof r=="function"?a=r:r&&(s=r,a=t)):typeof e=="function"?a=e:e&&(s=e,a=r);const u=o.length?`${n} ${o.join(" ")}`:n;return rt(u,s,a)},jt=function(n,e,r){let t=[],o={};Array.isArray(e)?(t=e,o=r??{}):e&&(o=e);const s=o.cwd||De(),a=o.env||(H?.getEnv()??{}),u=n.startsWith("/")?n:`${s}/${n}`.replace(/\/+/g,"/"),i=new te;if(i.connected=!0,i.spawnargs=["node",u,...t],i.spawnfile="node",!Ge)return setTimeout(()=>{i.emit("error",new Error("[Nodepod] fork requires worker mode. No forkChild callback set."))},0),i;const f=Ee().register("ChildProcess");i._elHandle=f;const l=Ge(u,t,{cwd:s,env:a,onStdout:c=>{var d;(d=i.stdout)==null||d.emit("data",c);const h=Le();h&&h(c)},onStderr:c=>{var d;(d=i.stderr)==null||d.emit("data",c);const h=He();h&&h(c)},onIPC:c=>{i.emit("message",c)},onExit:c=>{f.close(),i.exitCode=c,i.connected=!1,i.emit("exit",c,null),i.emit("close",c,null)}});return i.send=(c,d)=>i.connected?(l.sendIPC(c),!0):!1,i.kill=c=>(i.killed=!0,i.connected=!1,l.disconnect(),i.emit("exit",null,c??"SIGTERM"),i.emit("close",null,c??"SIGTERM"),!0),i.disconnect=()=>{i.connected=!1,l.disconnect(),i.emit("disconnect")},i},te=function(){this&&(Pt.call(this),this.pid=fe.BASE+Math.floor(Math.random()*fe.RANGE),this.connected=!1,this.killed=!1,this.exitCode=null,this.signalCode=null,this.spawnargs=[],this.spawnfile="",this.stdin=new Zn,this.stdout=new Ht,this.stderr=new Ht)},Object.setPrototypeOf(te.prototype,Pt.prototype),te.prototype.kill=function(e){return this.killed=!0,this.emit("exit",null,e??"SIGTERM"),!0},te.prototype.disconnect=function(){this.connected=!1},te.prototype.send=function(e,r){return r&&r(new Error("IPC unavailable")),!1},te.prototype.ref=function(){const e=this._elHandle;return e&&e.ref(),this},te.prototype.unref=function(){const e=this._elHandle;return e&&e.unref(),this},ar={exec:rt,execSync:st,execFile:Tt,execFileSync:Nt,spawn:zt,spawnSync:Kt,fork:jt,ShellProcess:te,initShellExec:Wt,shellExec:Yt,setStreamingCallbacks:qt,clearStreamingCallbacks:Bt,sendStdin:Mt,setSyncChannel:Jt,setSabEnabled:Gt,setSpawnChildCallback:Vt,setForkChildCallback:Lt,setIPCSend:Ut,setIPCReceiveHandler:ot,handleIPCFromParent:Ft,executeNodeBinary:We,notifyTerminalResize:Ot}});export{te as ShellProcess,hr as __tla,Bt as clearStreamingCallbacks,ar as default,rt as exec,Tt as execFile,Nt as execFileSync,st as execSync,We as executeNodeBinary,jt as fork,De as getShellCwd,Ft as handleIPCFromParent,Wt as initShellExec,cr as isStdinRaw,Ot as notifyTerminalResize,Mt as sendStdin,Lt as setForkChildCallback,ot as setIPCReceiveHandler,Ut as setIPCSend,Gt as setSabEnabled,lr as setShellCwd,Vt as setSpawnChildCallback,qt as setStreamingCallbacks,Jt as setSyncChannel,Yt as shellExec,zt as spawn,Kt as spawnSync};
