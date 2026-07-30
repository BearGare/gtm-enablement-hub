import React, { useState, useEffect, useRef } from "react";

import { A, TL, BG, CD, C2, BO, TX, MU, SU, WA, ER } from "./colors";
import type { ItemSection, Item, Message, ProgMap, ObjectionCard, ObjectionTheme, LandRiskTheme } from "./types";
import { PILLARS, MODS, ARCH, PERSONAS, COMPS, DISC, RELAY_AI, SDLC_STAGES, SDLC_INTRO, GLOSSARY, GLOSSARY_LOOKUP, SAMPLE_CALL_TRANSCRIPT, DISCOVERY_PATHS, LAND_TOOLCHAIN, LAND_PROOF_TEMPLATES, OBJECTIONS } from "./data";

// Sorted glossary keys longest-first so multi-word terms match before single words
const GKEYS=Object.keys(GLOSSARY_LOOKUP).sort((a,b)=>b.length-a.length);
// Short abbreviations that are always written in ALL CAPS — only link when uppercase
const UPPERCASE_ONLY=new Set(["pr","prs","ci","cd","sre","slo","sli","slos","iac","cve","sbom","slsa","sast","dast","sca","ast","mttr","e2e","api","vm","vms","soc","yaml","commit","waf","opa","secret","secrets","drift","monolith","gha","ghas","rbac","eks","ecs","aws","gcp","ide","ar","fme","mcp"]);
// Regex with \b word boundaries — prevents matching inside longer words
const GTERM_RE=new RegExp(
  GKEYS.map(k=>"\\b"+k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b").join("|"),
  "gi"
);

type GPopoverData={label:string;def:string;seeAlso?:string;categoryId:string;x:number;y:number};
let _setGPopover:React.Dispatch<React.SetStateAction<GPopoverData|null>>=(()=>{});

// RELAY_AI items (platform concepts, agents, features) need educational coaching,
// not sales roleplay. Computed once from the data so detection is always up to date.
const RELAY_AI_IDS=new Set([...RELAY_AI.platform,...RELAY_AI.agents,...RELAY_AI.features].map(i=>i.id));

// ── Progress tiers ───────────────────────────────────────────────────────
type ProgEntry={visited?:boolean;chatHistory?:Message[];msgCount?:number;lastVisit?:number;reflection?:string;masteryReady?:boolean};
type Tier="none"|"viewed"|"practiced"|"mastered";
const tierOf=(p?:ProgEntry):Tier=>{
  if(!p||(!p.visited&&!p.chatHistory))return "none";
  if(p.chatHistory)return (p.masteryReady&&!!p.reflection)?"mastered":"practiced";
  return "viewed";
};

// ── Call analysis parsing ────────────────────────────────────────────────
const parseAnalysis=(text=""):{fitRating?:string;sentiment?:string}=>{
  const section=(re:RegExp)=>{const m=text.match(re);return m?m[1]:"";};
  const firstLine=(seg:string)=>(seg.split("\n").map(l=>l.trim()).filter(Boolean)[0]||"");
  const pick=(line:string,opts:string[])=>opts.find(o=>new RegExp("\\b"+o.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")+"\\b","i").test(line));
  const fitSeg=firstLine(section(/##\s*Relay Fit Assessment([\s\S]*?)(?=\n##\s|$)/i));
  const seSeg=firstLine(section(/##\s*Sentiment[^\n]*([\s\S]*?)(?=\n##\s|$)/i));
  return {
    fitRating:pick(fitSeg,["No clear signal","Strong","Partial","Weak"]),
    sentiment:pick(seSeg,["Warm","Neutral","Cold"]),
  };
};

let _glossEnabled=true;
let _fs=14;
let _compact=false;
let _bookmarks=new Set<string>();
let _toggleBookmark=(_id:string)=>{};

function autoLink(text:string,key:string):React.ReactNode[]{
  if(!_glossEnabled)return[text];
  const out:React.ReactNode[]=[];
  let last=0;
  GTERM_RE.lastIndex=0;
  let m:RegExpExecArray|null;
  while((m=GTERM_RE.exec(text))!==null){
    if(m.index>last)out.push(text.slice(last,m.index));
    const matched=m[0];
    const matchedLower=matched.toLowerCase();
    const entry=GLOSSARY_LOOKUP[matchedLower];
    if(entry&&!(UPPERCASE_ONLY.has(matchedLower)&&!/^[A-Z\d][A-Z\d]*s?$/.test(matched))){
      const idx=m.index;
      out.push(
        <span key={`${key}-${idx}`}
          onClick={(e)=>{
            e.stopPropagation();
            const r=(e.target as HTMLElement).getBoundingClientRect();
            _setGPopover({...entry,x:r.left,y:r.bottom+6});
          }}
          style={{borderBottom:`1px dotted ${A}`,color:A,cursor:"pointer",fontWeight:600}}>
          {matched}
        </span>
      );
    }else{
      out.push(matched);
    }
    last=m.index+m[0].length;
  }
  if(last<text.length)out.push(text.slice(last));
  return out;
}

const fmt=(t="",enableGloss=true):React.ReactNode[]=>{
  const re=/\*\*([^*]+)\*\*|\*([^*\n]+)\*|\[([^\]]+)\]\(([^)]+)\)/g;
  const out:React.ReactNode[]=[];let last=0;let m:RegExpExecArray|null;
  while((m=re.exec(t))!==null){
    if(m.index>last){
      const plain=t.slice(last,m.index);
      if(enableGloss)out.push(...autoLink(plain,`f${last}`));
      else out.push(plain);
    }
    if(m[1]!==undefined)out.push(<strong key={m.index} style={{color:TX,fontWeight:600}}>{m[1]}</strong>);
    else if(m[2]!==undefined)out.push(<em key={m.index} style={{fontStyle:"italic"}}>{m[2]}</em>);
    else out.push(<a key={m.index} href={m[4]} target="_blank" rel="noopener noreferrer" style={{color:A,textDecoration:"underline",cursor:"pointer"}}>{m[3]}</a>);
    last=m.index+m[0].length;
  }
  if(last<t.length){
    const plain=t.slice(last);
    if(enableGloss)out.push(...autoLink(plain,`f${last}`));
    else out.push(plain);
  }
  return out;
};
const Md=({t=""}:{t:string})=>{
  type Block={type:"table",lines:string[]}|{type:"line",ln:string};
  const blocks:Block[]=[];
  for(const ln of t.split('\n')){
    const tr=ln.trim();
    const isSep=/^\|[\s\-|:]+\|$/.test(tr);
    const isTRow=!isSep&&/^\|.+\|$/.test(tr);
    if(isTRow){const last=blocks[blocks.length-1];if(last?.type==="table")last.lines.push(ln);else blocks.push({type:"table",lines:[ln]});}
    else if(!isSep)blocks.push({type:"line",ln});
  }
  const parseRow=(row:string)=>row.split('|').slice(1,-1).map(c=>c.trim());
  return(
    <div style={{lineHeight:1.75,fontSize:_fs-1,color:TX}}>
      {blocks.map((b,i)=>{
        if(b.type==="table"){
          const [hdr,...rows]=b.lines;
          return(
            <table key={i} style={{width:"100%",borderCollapse:"collapse",margin:"8px 0",fontSize:_fs-2}}>
              <thead><tr>{parseRow(hdr).map((c,j)=><th key={j} style={{padding:"5px 8px",borderBottom:`1px solid ${BO}`,color:MU,fontWeight:700,fontSize:10,textAlign:"left",letterSpacing:.5,textTransform:"uppercase"}}>{c}</th>)}</tr></thead>
              <tbody>{rows.map((row,ri)=><tr key={ri}>{parseRow(row).map((c,ci)=><td key={ci} style={{padding:"5px 8px",borderBottom:ri<rows.length-1?`1px solid ${BO}22`:"none",color:TX}}>{fmt(c)}</td>)}</tr>)}</tbody>
            </table>
          );
        }
        const ln=b.ln;
        if(!ln.trim())return <div key={i} style={{height:5}}/>;
        if(ln.startsWith('###'))return <div key={i} style={{color:WA,fontWeight:700,fontSize:13,margin:"12px 0 3px"}}>{ln.replace(/^#+\s/,'')}</div>;
        if(ln.startsWith('##'))return <div key={i} style={{color:A,fontWeight:600,fontSize:14,margin:"11px 0 4px"}}>{ln.replace(/^#+\s/,'')}</div>;
        if(/^[•\-*]\s/.test(ln))return <div key={i} style={{display:"flex",gap:8,marginBottom:3,paddingLeft:4}}><span style={{color:A,flexShrink:0}}>›</span><span>{fmt(ln.slice(2))}</span></div>;
        return <div key={i} style={{marginBottom:3}}>{fmt(ln)}</div>;
      })}
    </div>
  );
};
const Chip=({l,c=A}:{l:string,c?:string})=><span style={{background:c+"22",color:c,border:`1px solid ${c}44`,borderRadius:99,padding:"3px 9px",fontSize:9,fontWeight:700,letterSpacing:0.8,textTransform:"uppercase",whiteSpace:"nowrap"}}>{l}</span>;

const Dot=({p,id}:{p:ProgMap,id:string})=>{const s=p[id];return <div style={{width:8,height:8,borderRadius:99,background:s?.chatHistory?SU:s?.visited?WA:BO,flexShrink:0}}/>;};
const Hdr=({title,accent,sub}:{title:string,accent?:string,sub:string})=>{
  const parts=accent&&title.includes(accent)?title.split(accent):null;
  return <div style={{marginBottom:16}}><div style={{fontSize:17,fontWeight:700,marginBottom:3,fontFamily:"Poppins,system-ui,sans-serif"}}>{parts?<>{parts[0]}<span style={{color:A}}>{accent}</span>{parts[1]}</>:title}</div><div style={{fontSize:12,color:MU}}>{sub}</div></div>;
};
const Callout=({c=A,ch}:{c?:string,ch:React.ReactNode})=><div style={{background:c+"11",border:`1px solid ${c}33`,borderRadius:8,padding:"11px 14px",marginBottom:16,fontSize:12,lineHeight:1.65,color:TX}}>{ch}</div>;


function CardWrap({children,onClick,accent=A,prog,id,style={}}:{children:React.ReactNode,onClick:()=>void,accent?:string,prog:ProgMap,id:string,style?:React.CSSProperties}){
  const[hov,setHov]=useState(false);
  const starred=_bookmarks.has(id);
  return(
    <div onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:hov?C2:CD,border:`1px solid ${hov?accent+"55":BO}`,borderRadius:10,padding:_compact?10:16,cursor:"pointer",transition:"all .2s",position:"relative",...style}}>
      {id&&(
        <div style={{position:"absolute",top:8,right:8,display:"flex",gap:5,alignItems:"center"}}>
          <button onClick={e=>{e.stopPropagation();_toggleBookmark(id);}}
            title={starred?"Remove bookmark":"Save"}
            style={{background:"none",border:"none",cursor:"pointer",fontSize:13,lineHeight:1,padding:0,color:starred?WA:MU,opacity:hov||starred?1:0,transition:"opacity .15s"}}>
            {starred?"⭐":"☆"}
          </button>
          <Dot p={prog} id={id}/>
        </div>
      )}
      {children}
    </div>
  );
}

function Accordion({sections}:{sections:ItemSection[]}){
  const[open,setOpen]=useState<Record<string,boolean>>(()=>Object.fromEntries(sections.map(s=>[s.title,s.open??false])));
  return(
    <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
      {sections.map(s=>(
        <div key={s.title} style={{background:C2,borderRadius:8,border:`1px solid ${BO}`,overflow:"hidden"}}>
          <button onClick={()=>setOpen(p=>({...p,[s.title]:!p[s.title]}))} style={{width:"100%",background:"none",border:"none",padding:_compact?"7px 12px":"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",color:TX,fontSize:_fs-1,fontWeight:600,textAlign:"left"}}>
            <span>{s.title}</span>
            <span style={{color:MU,fontSize:11,flexShrink:0,marginLeft:8}}>{open[s.title]?"▲":"▼"}</span>
          </button>
          {open[s.title]&&<div style={{padding:_compact?"0 12px 10px":"0 14px 12px"}}><Md t={s.content}/></div>}
        </div>
      ))}
    </div>
  );
}

type ChatMode="module"|"sdlc"|"persona"|"competitive"|"concept"|"objection";
function Modal({item,prog,onClose,onChat,onOpenItem,mode="module"}:{item:Item,prog:ProgMap,onClose:()=>void,onChat:(item:Item,mode:ChatMode)=>void,onOpenItem:(item:Item)=>void,mode?:ChatMode}){
  const title=item.title||item.n||item.co||"";
  const p=prog[item.id];
  return(
    <div style={{position:"fixed",inset:0,background:"#000000bb",zIndex:20,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:CD,border:`1px solid ${BO}`,borderRadius:12,width:"100%",maxWidth:660,maxHeight:"88vh",overflow:"auto",padding:24,position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:16,background:"none",border:"none",color:MU,fontSize:22,cursor:"pointer",lineHeight:1}}>×</button>
        <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:14}}>
          {item.e&&<div style={{fontSize:28,flexShrink:0}}>{item.e}</div>}
          <div style={{flex:1,paddingRight:24}}>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:6}}>
              {item.b&&<Chip l={item.b} c={item.c||A}/>}
              {item.role&&<Chip l={item.role} c={TL}/>}
              {item.tag&&<Chip l={item.tag} c={A}/>}
              {p?.chatHistory&&<Chip l={`${p.msgCount||0} exchanges`} c={SU}/>}
            </div>
            <div style={{fontWeight:700,fontSize:17,lineHeight:1.3}}>{title}</div>
          </div>
        </div>
        {(item.short||item.sum)&&<div style={{color:MU,fontSize:13,marginBottom:12,lineHeight:1.6}}>{item.short||item.sum}</div>}

        {item.str&&(
          <>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:10}}>
              <div style={{background:C2,borderRadius:8,padding:11,border:`1px solid ${BO}`}}>
                <div style={{fontSize:10,fontWeight:700,color:MU,marginBottom:3,letterSpacing:.7}}>THEIR STRENGTH</div>
                <div style={{fontSize:12,color:TX}}>{item.str}</div>
              </div>
              <div style={{background:C2,borderRadius:8,padding:11,border:`1px solid ${BO}`}}>
                <div style={{fontSize:10,fontWeight:700,color:WA,marginBottom:3,letterSpacing:.7}}>WATCH OUT FOR</div>
                <div style={{fontSize:12,color:TX}}>{item.wo}</div>
              </div>
            </div>
            {item.adv&&(
              <div style={{background:ER+"11",border:`1px solid ${ER}33`,borderRadius:8,padding:"10px 12px",marginBottom:12,fontSize:12,lineHeight:1.6}}>
                <span style={{color:ER,fontWeight:700,letterSpacing:.7}}>WHY RELAY: </span>
                <span style={{color:TX}}>{item.adv}</span>
              </div>
            )}
          </>
        )}
        {item.d&&<div style={{background:C2,borderRadius:8,padding:14,marginBottom:10,border:`1px solid ${BO}`}}><Md t={item.d}/></div>}
        {item.url&&<a href={item.url} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:11,color:A,fontWeight:700,marginBottom:10,textDecoration:"none",background:A+"11",border:`1px solid ${A}33`,borderRadius:6,padding:"5px 10px"}}>🔗 View case study →</a>}
        {item.sections&&<Accordion sections={item.sections}/>}
        {item.subModules&&item.subModules.length>0&&(
          <div style={{marginBottom:12}}>
            <div style={{fontSize:10,fontWeight:800,color:MU,letterSpacing:1.2,marginBottom:8,textTransform:"uppercase"}}>Module Breakdown</div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {item.subModules.map(sub=>(
                <div key={sub.id} onClick={()=>onOpenItem(sub)}
                  style={{background:C2,border:`1px solid ${BO}`,borderRadius:8,padding:"10px 12px",cursor:"pointer",transition:"all .15s",display:"flex",alignItems:"center",gap:10}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=(item.c||A)+"55";(e.currentTarget as HTMLDivElement).style.background=BG;}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=BO;(e.currentTarget as HTMLDivElement).style.background=C2;}}>
                  {sub.e&&<span style={{fontSize:18,flexShrink:0}}>{sub.e}</span>}
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:13,color:TX,marginBottom:1}}>{sub.title}</div>
                    {sub.short&&<div style={{fontSize:11,color:MU,lineHeight:1.4}}>{sub.short}</div>}
                  </div>
                  <span style={{fontSize:10,fontWeight:700,color:item.c||A,flexShrink:0}}>Open →</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {item.sa&&(
          <div style={{background:A+"11",borderRadius:8,padding:11,marginBottom:10,border:`1px solid ${A}33`}}>
            <div style={{fontSize:10,fontWeight:700,color:A,marginBottom:3,letterSpacing:.7}}>💡 SALES ANGLE</div>
            <div style={{fontSize:12,color:TX,lineHeight:1.65}}>{item.sa}</div>
          </div>
        )}
        {p?.chatHistory&&(
          <div style={{background:SU+"09",borderRadius:8,padding:11,marginBottom:10,border:`1px solid ${SU}22`}}>
            <div style={{fontSize:10,fontWeight:700,color:SU,marginBottom:3,letterSpacing:.7}}>📚 PREVIOUS SESSION</div>
            <div style={{fontSize:12,color:MU}}>{p.msgCount} messages saved. Continue where you left off.</div>
          </div>
        )}
        <button onClick={()=>onChat(item,mode)} style={{width:"100%",background:`linear-gradient(135deg,${A},${TL})`,color:BG,border:"none",borderRadius:8,padding:"11px",fontWeight:700,fontSize:14,cursor:"pointer",marginTop:2}}>
          🧠 {p?.chatHistory?"Continue →":mode==="persona"?"Start Roleplay →":mode==="competitive"?"Practice Objection →":mode==="concept"?"Explore Concept →":mode==="objection"?"Practice with AI →":"Start Deep Dive →"}
        </button>
      </div>
    </div>
  );
}

// Simple localStorage-based persistence
const store = {
  get: (key: string) => { try { return localStorage.getItem(key); } catch { return null; } },
  set: (key: string, val: string) => { try { localStorage.setItem(key, val); } catch {} },
};

export default function App(){
  const[tab,setTab]=useState(0);
  const[userId]=useState<string>(()=>{
    let id=localStorage.getItem('signalHubUserId')
    if(!id){id=crypto.randomUUID();localStorage.setItem('signalHubUserId',id)}
    return id
  });
  const[sdlcActive,setSdlcActive]=useState<string|null>(null);
  const[modal,setModal]=useState<Item|null>(null);
  const[chat,setChat]=useState<{topic:Item&{title:string,mode?:string},messages:Message[]}|null>(null);
  const[input,setInput]=useState("");
  const[loading,setLoading]=useState(false);
  const[prog,setProg]=useState<ProgMap>({});
  const[openQ,setOpenQ]=useState<string|null>(null);
  const[reflectionDraft,setReflectionDraft]=useState("");
  const[editingReflection,setEditingReflection]=useState(false);
  const[glossaryOpen,setGlossaryOpen]=useState<string|null>(null);
  const[glossarySearch,setGlossarySearch]=useState("");
  const[gPopover,setGPopover]=useState<{label:string;def:string;seeAlso?:string;categoryId:string;x:number;y:number}|null>(null);
  const[loaded,setLoaded]=useState(false);
  const[compFilter,setCompFilter]=useState<string>("all");
  const msgsRef=useRef<HTMLDivElement>(null);
  const inputRef=useRef<HTMLTextAreaElement>(null);
  const[callTranscript,setCallTranscript]=useState("");
  const[callMsgs,setCallMsgs]=useState<Message[]>([]);
  const[callLoading,setCallLoading]=useState(false);
  const[callInput,setCallInput]=useState("");
  const[callHistory,setCallHistory]=useState<Array<{id:string;title:string;createdAt:number;messages:Message[];modSuffix?:string;modules?:string[];account?:string;contact?:string}>>([]);
  const[showCallHistory,setShowCallHistory]=useState(false);
  const[currentCallId,setCurrentCallId]=useState<string|null>(null);
  const callMsgsRef=useRef<HTMLDivElement>(null);
  const callInputRef=useRef<HTMLTextAreaElement>(null);
  const[callAccount,setCallAccount]=useState("");
  const[callContact,setCallContact]=useState("");
  const[callType,setCallType]=useState<"CC"|"DM">("DM");
  const[callModules,setCallModules]=useState<string[]>([]);
  const[editingCallMeta,setEditingCallMeta]=useState(false);
  const[metaSnapshot,setMetaSnapshot]=useState<{account:string;contact:string;type:"CC"|"DM";modules:string[]}>({account:"",contact:"",type:"DM",modules:[]});
  const[glossEnabled,setGlossEnabled]=useState(true);
  const[confirmModal,setConfirmModal]=useState<{title:string;body:string;onConfirm:()=>void}|null>(null);
  const[userName,setUserName]=useState("");
  const[userRole,setUserRole]=useState<"SDR"|"AE"|"SE"|"">("");
  const[defaultCallType,setDefaultCallType]=useState<"CC"|"DM">("DM");
  const[coachStyle,setCoachStyle]=useState<"socratic"|"direct">("socratic");
  const[uiDensity,setUiDensity]=useState<"comfortable"|"compact">("comfortable");
  const[fontSize,setFontSize]=useState(14);
  const[showSearch,setShowSearch]=useState(false);
  const[searchQuery,setSearchQuery]=useState("");
  const[bookmarks,setBookmarks]=useState<Set<string>>(new Set());
  const[showBookmarks,setShowBookmarks]=useState(false);
  const[slackCopied,setSlackCopied]=useState(false);
  const[discMode,setDiscMode]=useState<"browse"|"path">("browse");
  const[pathStageId,setPathStageId]=useState<string>("release");
  const[pathStep,setPathStep]=useState(0);
  const[landConstraint,setLandConstraint]=useState<string>("");
  const[landPersonas,setLandPersonas]=useState<string[]>([]);
  const[landToolchain,setLandToolchain]=useState<Set<string>>(new Set());
  const[landRisk,setLandRisk]=useState<LandRiskTheme>("already_have_x");
  const[landBriefCopied,setLandBriefCopied]=useState(false);
  const[objTheme,setObjTheme]=useState<ObjectionTheme|"all">("all");
  const[objPersona,setObjPersona]=useState<string>("all");
  const[objActiveId,setObjActiveId]=useState<string|null>(null);

  _setGPopover=setGPopover;
  _glossEnabled=glossEnabled;
  _fs=fontSize;
  _compact=uiDensity==="compact";
  _bookmarks=bookmarks;

  // seeAlso navigation helpers
  const MOD_NAME_TO_ID:Record<string,string>={
    "plans":"plans","code":"code","portal":"portal","ci":"ci","test":"test","cd":"cd",
    "flags":"flags","infra":"infra","data":"data","secure":"secure","supply":"supply",
    "sre":"sre","cost":"cost","insights":"insights",
    "relay plans":"plans","relay code":"code","relay portal":"portal","relay ci":"ci",
    "relay test":"test","relay cd":"cd","relay flags":"flags","relay infra":"infra",
    "relay data":"data","relay secure":"secure","relay supply":"supply","relay sre":"sre",
    "relay cost":"cost","relay insights":"insights",
  };
  // Tab indices for new IA (must match TABS order below)
  const STAB_MAP:{[k:string]:number}={sdlc:2,architecture:1,solutions:1,personas:3,competitive:4,discovery:5,land:6,"land planner":6,objection:7,"objection gym":7,glossary:8,calls:9,progress:10,settings:11,methodology:11};
  const STAGE_IDS=new Set(["plan","code","build","test","secure","release","operate","improve"]);

  const openModByName=(name:string)=>{
    const lo=name.toLowerCase();
    const id=MOD_NAME_TO_ID[lo];
    let item:import("./types").Item|undefined=MODS.find(m=>m.id===id);
    if(!item&&id){for(const mod of MODS){const sub=mod.subModules?.find(s=>s.id===id);if(sub){item=sub;break;}}}
    if(!item){
      const allAi=[...RELAY_AI.platform,...RELAY_AI.agents,...RELAY_AI.features];
      item=allAi.find(m=>(m.title||"").toLowerCase()===lo || m.id===id);
    }
    if(item){setTab(1);setModal(item);save({...prog,[item.id]:{...(prog[item.id]||{}),visited:true,lastVisit:Date.now()}});}
    else setTab(1);
  };

  // seeAlso tokens (comma+space separated). Interactive suffixes:
  //   "… tab"        → STAB_MAP tab switch
  //   "… stage(s)"   → SDLC tab (+ stage focus when recognised)
  //   "… module"     → openModByName (Relay modules + Relay AI cards)
  //   "… battlecard" → Competitive tab + open matching COMPS item (match n or id)
  const renderSeeAlso=(seeAlso:string)=>seeAlso.split(", ").map((part,i)=>{
    const lo=part.toLowerCase();
    let onClick:(()=>void)|null=null;
    if(lo.endsWith(" tab")){
      const tname=lo.slice(0,-4).trim();
      const tidx=STAB_MAP[tname];
      if(tidx!==undefined) onClick=()=>{setGPopover(null);setTab(tidx);};
    } else if(/stages?$/.test(lo)){
      const sname=lo.replace(/ stages?$/,"").trim();
      if(STAGE_IDS.has(sname)) onClick=()=>{setGPopover(null);setTab(2);setSdlcActive(sname);};
      else onClick=()=>{setGPopover(null);setTab(2);};
    } else if(lo.endsWith(" module")){
      const mname=lo.slice(0,-7).trim();
      onClick=()=>{setGPopover(null);openModByName(mname);};
    } else if(lo.endsWith(" battlecard")){
      const stem=lo.slice(0,-" battlecard".length).trim();
      const comp=COMPS.find(c=>String(c.n||"").toLowerCase()===stem || c.id.toLowerCase()===stem);
      if(comp) onClick=()=>{
        setGPopover(null);
        setTab(STAB_MAP.competitive);
        setModal(comp);
        save({...prog,[comp.id]:{...(prog[comp.id]||{}),visited:true,lastVisit:Date.now()}});
      };
    }
    return(
      <React.Fragment key={i}>
        {i>0&&", "}
        {onClick
          ?<span onClick={onClick} style={{color:A,textDecoration:"underline",cursor:"pointer",fontWeight:600}}>{part}</span>
          :<span>{part}</span>
        }
      </React.Fragment>
    );
  });

  useEffect(()=>{
    try{
      const raw=store.get("signalHubGTM");
      if(raw)setProg(JSON.parse(raw));
    }catch{}
    try{
      const rawCalls=store.get("signalHubCalls");
      if(rawCalls)setCallHistory(JSON.parse(rawCalls));
    }catch{}
    try{
      const rawGloss=store.get("signalHubGlossEnabled");
      if(rawGloss!==null)setGlossEnabled(rawGloss!=="false");
    }catch{}
    try{const v=store.get("signalHubUserName");if(v)setUserName(v);}catch{}
    try{const v=store.get("signalHubUserRole");if(v)setUserRole(v as "SDR"|"AE"|"SE"|"");}catch{}
    try{const v=store.get("signalHubDefaultCallType");if(v){setDefaultCallType(v as "CC"|"DM");setCallType(v as "CC"|"DM");}}catch{}
    try{const v=store.get("signalHubCoachStyle");if(v)setCoachStyle(v as "socratic"|"direct");}catch{}
    try{const v=store.get("signalHubDensity");if(v)setUiDensity(v as "comfortable"|"compact");}catch{}
    try{const v=store.get("signalHubFontSize");if(v)setFontSize(Number(v));}catch{}
    try{const v=store.get("signalHubBookmarks");if(v)setBookmarks(new Set(JSON.parse(v)));}catch{}
    setLoaded(true);
  },[]);

  useEffect(()=>{
    const handler=(e:KeyboardEvent)=>{
      if((e.metaKey||e.ctrlKey)&&e.key==="k"){e.preventDefault();setShowSearch(v=>!v);}
      if(e.key==="Escape"){setShowSearch(false);setShowBookmarks(false);}
    };
    window.addEventListener("keydown",handler);
    return()=>window.removeEventListener("keydown",handler);
  },[]);

  const save=(p:ProgMap)=>{setProg(p);store.set("signalHubGTM",JSON.stringify(p));};

  const progSummary=():string=>{
    const items=MODS
      .map(m=>({m,tier:tierOf(prog[m.id]),p:prog[m.id]}))
      .filter(x=>x.tier==="practiced"||x.tier==="mastered");
    if(!items.length)return "";
    return items.map(({m,tier,p})=>{
      const ref=p?.reflection?` — "${p.reflection}"`:"";
      return `- ${m.title}: ${tier==="mastered"?"Mastered":"Practiced"}${ref}`;
    }).join("\n");
  };

  useEffect(()=>{if(!currentCallId)setCallType(defaultCallType);},[defaultCallType]);
  useEffect(()=>{if(msgsRef.current)msgsRef.current.scrollTop=msgsRef.current.scrollHeight;},[chat?.messages?.length,loading]);
  useEffect(()=>{if(callMsgsRef.current)callMsgsRef.current.scrollTop=callMsgsRef.current.scrollHeight;},[callMsgs.length,callLoading]);
  useEffect(()=>{
    try{const v=sessionStorage.getItem("signalHubLandConstraint");if(v){setLandConstraint(v);sessionStorage.removeItem("signalHubLandConstraint");}}catch{}
  },[]);

  const goLandPlanner=(stageId:string)=>{
    setLandConstraint(stageId);
    try{sessionStorage.setItem("signalHubLandConstraint",stageId);}catch{}
    setTab(6);
  };

  const openChat=(item:Item,mode:ChatMode="module")=>{
    const id=item.id;
    const prev=prog[id]?.chatHistory;
    const title=String(item.title||item.n||item.co||"this topic");
    const opener=prev?`Picking up from your previous session on **${title}**. Where do you want to go from here?`:
      mode==="objection"?`Let's drill this objection: **"${title}"**\n\nBefore I show you anything, answer it in your own words — how would you respond if a buyer said that to you right now? (There are traps in common answers — I'll flag them after you go first.)`:
      mode==="sdlc"?`Let's dig into the **${title}** stage of the SDLC.\n\n**Start here:** In your own words, what do you think actually happens during this stage? Don't worry about Relay yet — just tell me what you know (or think you know) about this part of software delivery. There are no wrong answers.`:
      mode==="concept"?`Let's build your understanding of **${title}** — not to pitch it, but so you can speak to it confidently when it comes up.\n\n**Start here:** In your own words, what does **${title}** actually do or mean within the Relay platform? Just your current understanding — no sales framing needed.`:
      mode==="persona"?(()=>{
        const practiced=MODS.filter(m=>{const t=tierOf(prog[m.id]);return t==="practiced"||t==="mastered";});
        if(!practiced.length){
          const hint=item.short?`\n\nThis persona's primary concern: **${item.short.split(".")[0].trim()}**.`:"";
          return `I'll play the **${title}** in a discovery call. This is an open canvas — start wherever you'd naturally begin.\n\nI'll respond as this persona would and break character every few exchanges to coach you on what's landing and what isn't. Go ahead.${hint}`;
        }
        const top=practiced.slice(0,3).map(m=>m.title);
        const modList=top.length===1?top[0]:top.slice(0,-1).join(", ")+" and "+top.slice(-1);
        if(practiced.length<=3)return `I'll play the **${title}**. You've been working on ${modList} — try leading with whichever fits this conversation, or open however you'd naturally approach it.\n\nI'll respond authentically as the persona and break character to coach you. Go ahead.`;
        return `I'll play the **${title}**. You've got solid product coverage — let's see how it translates. Lead the call as you would with a real prospect. No scaffolding from here.`;
      })():
      mode==="competitive"?`Let's pressure-test your **${title}** knowledge.\n\nI'm a prospect who just said: *"We're already using ${title.replace(/^vs\.?\s*/i,"")} — we don't really see a reason to look at anything else."*\n\nHow do you respond?`:
      item.scenario
        ? `Let's get the **${title}** fundamentals solid before we get into scenarios.\n\n**Start here:** What does **${title}** actually do, and what's the strongest reason a ${item.buyer||"senior buyer"} would choose it over whatever they're already using? Give me your honest current answer — I'll build on it from there.`
        : `Ready to deep-dive on **${title}**.\n\n**Start here:** In your own words, how would you explain **${title}** to ${item.buyer||"a senior buyer"}? Don't worry about being perfect — I want to hear your current mental model so I can build on it.`;
    setChat({topic:{...item,title,mode},messages:prev||[{role:"assistant",content:opener}]});
    setModal(null);
    setReflectionDraft("");setEditingReflection(false);
    save({...prog,[id]:{...(prog[id]||{}),visited:true,lastVisit:Date.now()}});
  };

  const send=async()=>{
    if(!input.trim()||loading||!chat)return;
    const msg:Message={role:"user",content:input.trim()};
    const msgs=[...chat.messages,msg];
    setChat(c=>c?({...c,messages:msgs}):null);
    setInput("");setLoading(true);

    try{
      const mode=chat.topic.mode||"module";
      const userCtx=userName?`\n\nRep context: ${userName}${userRole?` (${userRole})`:""}. Tailor your coaching to their role and experience level.`:"";
      const styleNote=coachStyle==="direct"?"\n\nCOACHING STYLE: Be concise and direct. Skip lengthy Socratic sequences — give your feedback or key point in 2–3 sentences, then ask at most one focused question. Use bullet points for lists. No preamble.":"";
      const nameGuard=`\n\nRELAY MODULE NAMING — use only the canonical module titles from the platform module list below. Never invent expansions or legacy aliases (for example do not say SEI, IaCM, AST, or WAAP as Relay product names). Prefer Relay CI / Relay CD / Relay Test / Relay Insights / Relay Cost / Relay SRE / Relay Supply / Relay Infra. Module names: ${MODS.map(m=>m.title).join(", ")}.`;
      const repKnowledge=progSummary();
      const repCtx=repKnowledge
        ?`\n\nRep's current module knowledge — calibrate difficulty to this:\n${repKnowledge}\n\nFor mastered topics (where a reflection is shown), probe deeper than their stated mental model. For practiced topics, test whether they can apply what they know in this context. Only reference modules listed above — don't introduce Relay capabilities the rep hasn't covered yet.`
        :`\n\nThe rep is new to the product — keep the scenario accessible. Don't reference specific Relay modules or capabilities they haven't mentioned themselves. Focus on surfacing this persona's pain points and letting the rep find natural entry points.`;
      const platformCtx=`Key Relay platform context:
- Relay is a full-SDLC delivery platform for engineering organisations. It covers one continuous value stream: Plan → Code → Build → Test → Secure → Release → Operate → Improve.
- The core thesis: Relay can cover the whole stream, but GTM conversations start where work is waiting — find the constraint, then expand.
- Platform modules: ${MODS.map(m=>`${m.title} (${m.short})`).join("; ")}
- Relay AI: unified intelligence layer (Delivery Graph + agents Pilot, Conductor, Prover, Medic) powering code assistance, release intelligence, test selection, and incident correlation.
- Relay is not a monitoring vendor, not a point CI tool, not a cloud cost dashboard — it is the control plane from roadmap to production.`;
      const masterySignal=`

MASTERY SIGNAL: When the rep has demonstrated they can articulate the core value proposition AND at least one defensible differentiator without being prompted — set a high bar, not just progress or a reasonable answer — include [MASTERY_UNLOCKED] on its own line at the very end of your response. If in doubt, don't signal. Use at most once per session, after at least 3 substantive exchanges.`;
      const sys=mode==="objection"?
`You are a Relay sales coach scoring objection handling. The rep is practising a real buyer objection.

Objection: ${chat.topic.title}
${chat.topic.d||""}
Strong answer reference: ${chat.topic.sa||""}

Coaching flow:
- Ask the rep to respond in their own words first. Do NOT give the answer before they try.
- After they respond, score 1-5 on four dimensions: (1) Reframe without trash-talking the incumbent, (2) Coexist / honesty on toolchain, (3) Constraint-focus (lands the pain before pitching modules), (4) Next question or logical bridge.
- Name the traps they fell into (if any) before acknowledging what worked.
- Only after 2+ rep attempts, share the strong answer and coach tips from the reference above.
- Keep Socratic or direct per the coaching style already appended. Never invent customer names or win rates.
- Follow NAMING.md rules: use only canonical Relay module names.${masterySignal}`:
      mode==="concept"?
`You are a Relay platform educator helping a sales rep build genuine understanding of a platform concept or capability. Your goal is platform literacy — help them understand what this is and why it matters, not how to sell it.

Concept: ${chat.topic.title}
Context: ${chat.topic.short||""}
Detail: ${chat.topic.d||""}

Teaching approach:
- Plain English first. Explain without assuming prior knowledge.
- Test understanding: after explaining something, ask "how would you describe that to a colleague?"
- Connect to relevance: "When would a customer ask about this? What concern would surface it?"
- After solid understanding, one bridge to application: "Here's how this might come up in a conversation with a VP Eng / CTO / Head of Platform — what would you say?"
- Keep responses to 4-6 sentences then a question. Don't lecture.
- Tone: patient, direct, educational — not a sales pitch.${masterySignal}`:
      mode==="sdlc"?
`You are a DevOps and software delivery educator helping a sales rep build genuine understanding of the software delivery lifecycle. Your job is to teach concepts clearly, not to sell Relay.

Stage: ${chat.topic.title}
Stage content: ${chat.topic.d||""}
${chat.topic.sections?"Key sections: "+chat.topic.sections.map((s:{title:string})=>s.title).join(", "):""}

Teaching approach:
- Plain English first — no jargon without explanation. Assume the rep has no engineering background.
- Use analogies freely (e.g. "a canary deployment is like introducing a new menu item at one table before rolling it out to the whole restaurant")
- Check comprehension: after explaining a concept, ask "how would you explain that in your own words?"
- After the concept is solid, show one practical connection: "Here's where this matters in a customer conversation..."
- Keep responses to 4-6 sentences then a question. Don't lecture.
- Tone: patient, curious, peer-level. This is a learning conversation, not a test.${masterySignal}`:
      mode==="persona"?
`You are roleplaying as a ${chat.topic.title} in a B2B software discovery call with a Relay sales rep. Your goal is to respond authentically as that persona — with real concerns, scepticism, and priorities — while giving the rep genuine practice.

Persona: ${chat.topic.title}
Persona detail: ${chat.topic.d||""}
${chat.topic.sa?`What this persona cares about: ${chat.topic.sa}`:""}

Roleplay rules:
- Stay in character. Respond as the persona would: push back, ask clarifying questions, express scepticism.
- Be realistic, not a pushover — but don't be impossible. Real buyers engage when reps say the right things.
- After every 3-4 exchanges, break character briefly: "Coaching moment — [what landed / what didn't / what to try next]", then offer to continue the roleplay.
- If the rep says something genuinely good, acknowledge it in character (let the conversation advance).
- Tone: professional, slightly guarded, realistic.${repCtx}${masterySignal}`:
      mode==="competitive"?
`You are a Relay sales coach helping a rep prepare for competitive objections against ${chat.topic.title||"this competitor"}.

Competitor: ${chat.topic.title}
Competitive intel: ${chat.topic.d||""}
${chat.topic.sa?`Key differentiation: ${chat.topic.sa}`:""}
${platformCtx}

Coaching approach:
- Start adversarially: play the sceptical prospect defending their current tool.
- After the rep responds, step out of roleplay and coach: what worked, what missed, what to try differently.
- Surface the landmines: things reps commonly say that backfire with this competitor's users.
- After 3-4 exchanges, flip to pure coaching: "Here's the framework for this competitive conversation..."
- Keep the rep active — never just lecture. Ask "what would you say next?" regularly.${repCtx}${masterySignal}`:
      // default: module coaching
`You are a Relay sales coaching assistant for the GTM organisation. Keep responses to 3-5 sentences then a question or scenario.

Topic: ${chat.topic.title}
${chat.topic.buyer?`Primary buyer: ${chat.topic.buyer}`:""}
${chat.topic.scenario?`Entry point scenario: ${chat.topic.scenario}`:""}
Reference: ${chat.topic.d||""}
Sales angle: ${chat.topic.sa||""}

${platformCtx}

Coaching flow (follow this order):
1. First 2-3 exchanges: establish whether the rep can articulate what ${chat.topic.title} does and its key defensible differentiators. If they can't, close that gap before anything else.
2. Only introduce roleplay or scenario work once product knowledge is solid.
3. If the rep drifts into discovery tactics without demonstrating product knowledge, redirect: "Good instinct on discovery — but first, tell me what Relay ${chat.topic.title} actually offers that their current tool doesn't."

Coaching style:
- Be honest before being encouraging — if the answer has a real flaw or gap, name it directly before acknowledging what was right. Don't pad responses with validation.
- Practical — always tie back to how this lands with ${chat.topic.buyer||"this buyer"} in a real conversation
- Ground roleplay moments in the entry scenario above — use realistic objections for this persona
- Tone: direct, peer-level${masterySignal}`;
      const r=await fetch("/api/chat",{
        method:"POST",
        headers:{"Content-Type":"application/json","x-user-id":userId},
        body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,system:sys+userCtx+styleNote+nameGuard,messages:msgs.map(m=>({role:m.role,content:m.content})),rag_query:msg.content})
      });
      const d=await r.json();
      const raw=d.content?.[0]?.text||"Something went wrong — please try again.";
      const hasMasterySignal=raw.includes("[MASTERY_UNLOCKED]");
      const reply=raw.replace(/\[MASTERY_UNLOCKED\]\s*/g,"").trimEnd();
      const updated:Message[]=[...msgs,{role:"assistant",content:reply}];
      setChat(c=>c?({...c,messages:updated}):null);
      const id=chat.topic.id;
      const prev=prog[id]||{};
      save({...prog,[id]:{...prev,visited:true,chatHistory:updated,lastVisit:Date.now(),msgCount:updated.length,...(hasMasterySignal&&!prev.masteryReady?{masteryReady:true}:{})}});
    }catch{
      setChat(c=>c?({...c,messages:[...msgs,{role:"assistant",content:"Connection error — please try again."}]}):null);
    }
    setLoading(false);
    setTimeout(()=>inputRef.current?.focus(),80);
  };

  const buildCallSystem=():string=>{
    const modCtx=MODS.map(m=>`- **${m.title}**: ${m.short}`).join("\n");
    return `You are an expert Relay GTM analyst reviewing a sales call transcript. Your job is to give the rep direct, honest, actionable intelligence — no coaching, no questions back.

ANALYSIS FORMAT — produce these sections in order with these exact headings:

## Relay Fit Assessment
Rate: Strong / Partial / Weak / No clear signal — then explain with specific evidence from the transcript. Assess fit across the full SDLC (Plan, Code, Build, Secure, Deploy, Observe, Optimise). Be honest — identify which stages have real signal and which are absent.

## Sentiment & Buying Signals
Overall tone: Warm / Neutral / Cold. List the key signals — specific phrases or moments that indicate intent or resistance.

## Pain Points Identified
**Direct statements (verbatim):** Pull exact quotes from the transcript where the prospect expresses pain, frustration, or a problem. Format each as: **"exact quote"** — brief explanation of what it signals (skip explanation only if the meaning is completely obvious).
**Inferred pain:** Pain you can reasonably conclude from context, tone, or what wasn't said — even if they never stated it directly.

## Relay Module Fit
Which Relay modules are relevant, tied to specific things said. Don't list a module unless there's real evidence.

## Recommended Next Steps
Concrete actions the rep should take after this call.

---
RELAY MODULES:
${modCtx}

IMPORTANT: Be specific — reference what was actually said. Be honest — reps need accurate qualification intel, not optimism. Answer all follow-up questions directly without asking the rep to explain or reflect first.

After completing the analysis sections above, output exactly these three lines with no extra text:
ACCOUNT: [company or account name from the transcript, or Unknown if not mentioned]
CONTACT: [contact person's full name from the transcript, or Unknown if not mentioned]
MODULES: [comma-separated list using ONLY these exact abbreviations, max 5, most relevant first: PLANS, CI, BUILD, SECURE, DEPLOY, FLAGS, PORTAL, INFRA, SRE, COST, INSIGHTS, SUPPLY]`;
  };

  const analyseCall=async()=>{
    if(!callTranscript.trim()||callLoading)return;
    setCallLoading(true);
    const userMsg:Message={role:"user",content:`Please analyse this call transcript:\n\n${callTranscript.trim()}`};
    setCallMsgs([userMsg]);
    try{
      const r=await fetch("/api/chat",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:4000,system:buildCallSystem(),messages:[{role:userMsg.role,content:userMsg.content}]})
      });
      const d=await r.json();
      const reply=d.content?.[0]?.text||"Analysis failed — please try again.";
      const modsMatch=reply.match(/^MODULES[:\s]+(.+)$/mi);
      const accountMatch=reply.match(/^ACCOUNT[:\s]+(.+)$/mi);
      const contactMatch=reply.match(/^CONTACT[:\s]+(.+)$/mi);
      const allMods=modsMatch?modsMatch[1].split(",").map((m:string)=>m.trim()).filter(Boolean):[];
      const topMods=allMods.slice(0,3);
      const modSuffix=topMods.length>0?` — ${topMods.join(" · ")}`:""
      const cleanReply=reply.replace(/^(ACCOUNT|CONTACT|MODULES)[:\s]+.*/gmi,"").replace(/\n{3,}/g,"\n\n").trim();
      const extAccount=(accountMatch?.[1]||"").trim();
      const extContact=(contactMatch?.[1]||"").trim();
      const finalAccount=callAccount.trim()||(/^unknown$/i.test(extAccount)?"":extAccount)||"Unknown Account";
      const finalContact=callContact.trim()||(/^unknown$/i.test(extContact)?"":extContact)||"Unknown Contact";
      if(!callAccount.trim()&&extAccount&&!/^unknown$/i.test(extAccount))setCallAccount(extAccount);
      if(!callContact.trim()&&extContact&&!/^unknown$/i.test(extContact))setCallContact(extContact);
      setCallModules(topMods);
      const title=`${finalAccount} · ${finalContact} · ${callType}${modSuffix}`;
      const newMsgs:Message[]=[userMsg,{role:"assistant",content:cleanReply}];
      setCallMsgs(newMsgs);
      const id=Date.now().toString();
      setCurrentCallId(id);
      const record={id,title,createdAt:Date.now(),messages:newMsgs,modSuffix,modules:topMods,account:finalAccount,contact:finalContact};
      setCallHistory(prev=>{
        const newHistory=[record,...prev].slice(0,20);
        store.set("signalHubCalls",JSON.stringify(newHistory));
        return newHistory;
      });
    }catch{
      setCallMsgs([userMsg,{role:"assistant",content:"Connection error — please try again."}]);
    }
    setCallLoading(false);
  };

  const sendCallMsg=async(textOverride?:string)=>{
    const text=(textOverride??callInput).trim();
    if(!text||callLoading||callMsgs.length<2)return;
    const msg:Message={role:"user",content:text};
    const msgs=[...callMsgs,msg];
    setCallMsgs(msgs);
    setCallInput("");setCallLoading(true);
    try{
      const r=await fetch("/api/chat",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1200,system:buildCallSystem(),messages:msgs.map(m=>({role:m.role,content:m.content}))})
      });
      const d=await r.json();
      const reply=d.content?.[0]?.text||"Something went wrong — please try again.";
      const updated:Message[]=[...msgs,{role:"assistant",content:reply}];
      setCallMsgs(updated);
      if(currentCallId){
        setCallHistory(prev=>{
          const newHistory=prev.map(h=>h.id===currentCallId?{...h,messages:updated}:h);
          store.set("signalHubCalls",JSON.stringify(newHistory));
          return newHistory;
        });
      }
    }catch{
      setCallMsgs(prev=>[...prev,{role:"assistant",content:"Connection error — please try again."}]);
    }
    setCallLoading(false);
    setTimeout(()=>callInputRef.current?.focus(),80);
  };

  const MOD_LABELS:Record<string,string>={
    plans:"PLANS",code:"CODE",portal:"PORTAL",ci:"CI",test:"TEST",cd:"CD",
    flags:"FLAGS",infra:"INFRA",data:"DATA",secure:"SECURE",supply:"SUPPLY",
    sre:"SRE",cost:"COST",insights:"INSIGHTS",
  };
  const ALL_MOD_CHIPS=MODS.map(m=>({label:MOD_LABELS[m.id]||m.title||m.id,e:m.e||""}));

  const ABBR_TO_MOD:Record<string,string>={
    ...Object.fromEntries(Object.entries(MOD_LABELS).map(([id,label])=>[label,id])),
  };
  const openModuleByAbbr=(abbr:string)=>{
    const m=MODS.find(x=>x.id===ABBR_TO_MOD[abbr]);
    if(!m)return;
    setModal(m);
    save({...prog,[m.id]:{...(prog[m.id]||{}),visited:true,lastVisit:Date.now()}});
  };

  const saveCallTitle=(account:string,contact:string,type:"CC"|"DM",modules:string[])=>{
    if(!currentCallId)return;
    setCallHistory(prev=>{
      const newModSuffix=modules.length>0?` — ${modules.join(" · ")}`:""
      const newTitle=`${account.trim()||"Unknown Account"} · ${contact.trim()||"Unknown Contact"} · ${type}${newModSuffix}`;
      const updated=prev.map(h=>h.id===currentCallId?{...h,title:newTitle,modSuffix:newModSuffix,modules,account:account.trim()||undefined,contact:contact.trim()||undefined}:h);
      store.set("signalHubCalls",JSON.stringify(updated));
      return updated;
    });
  };

  const toggleGloss=(val:boolean)=>{setGlossEnabled(val);store.set("signalHubGlossEnabled",String(val));};
  const toggleBookmark=(id:string)=>{
    setBookmarks(prev=>{
      const next=new Set(prev);
      if(next.has(id))next.delete(id);else next.add(id);
      store.set("signalHubBookmarks",JSON.stringify([...next]));
      return next;
    });
  };
  _toggleBookmark=toggleBookmark;

  const runSearch=(q:string):{[g:string]:{label:string;sub:string;emoji:string;onSelect:()=>void}[]}=>{
    if(q.trim().length<2)return{};
    const lo=q.toLowerCase();
    const hit=(...fields:(string|undefined)[])=>fields.some(f=>f?.toLowerCase().includes(lo));
    const out:{[g:string]:{label:string;sub:string;emoji:string;onSelect:()=>void}[]}={};
    const add=(g:string,label:string,sub:string,emoji:string,onSelect:()=>void)=>{
      if(!out[g])out[g]=[];
      if(out[g].length<6)out[g].push({label,sub,emoji,onSelect});
    };
    MODS.forEach(m=>{
      if(hit(m.title,m.short,m.d,m.sa))add("Solutions",m.title||"",m.short||"",m.e||"🧩",()=>{setShowSearch(false);setModal(m);save({...prog,[m.id]:{...(prog[m.id]||{}),visited:true,lastVisit:Date.now()}});});
      m.subModules?.forEach(s=>{if(hit(s.title,s.short,s.d,s.sa))add("Solutions",s.title||"",s.short||"",s.e||"🧩",()=>{setShowSearch(false);setModal(s);save({...prog,[s.id]:{...(prog[s.id]||{}),visited:true,lastVisit:Date.now()}});});});
    });
    ARCH.forEach(m=>{if(hit(m.title,m.short,m.d,m.sa))add("Architecture",m.title||"",(m.short||m.d||"").slice(0,80),m.e||"⚙️",()=>{setShowSearch(false);setModal(m);save({...prog,[m.id]:{...(prog[m.id]||{}),visited:true,lastVisit:Date.now()}});});});
    PERSONAS.forEach(m=>{if(hit(m.title,m.n?.toString(),m.role,m.short,m.d,m.str,m.sa))add("Personas",m.title||m.n?.toString()||"",m.role||"","👤",()=>{setShowSearch(false);setModal(m);save({...prog,[m.id]:{...(prog[m.id]||{}),visited:true,lastVisit:Date.now()}});});});
    COMPS.forEach(m=>{if(hit(m.n?.toString(),m.co,m.str,m.adv,m.wo,m.d))add("Competitive",m.n?.toString()||m.co||"",(m.str||"").slice(0,80),"⚔️",()=>{setShowSearch(false);setModal(m);save({...prog,[m.id]:{...(prog[m.id]||{}),visited:true,lastVisit:Date.now()}});});});
    DISCOVERY_PATHS.forEach(p=>{if(hit(p.title,...p.steps.map(s=>s.prompt)))add("Discovery Paths",p.title,p.steps[0]?.prompt.slice(0,80)||"",p.e,()=>{setShowSearch(false);setTab(5);setDiscMode("path");setPathStageId(p.stageId);setPathStep(0);});});
    OBJECTIONS.forEach(o=>{if(hit(o.title,o.strongAnswer,o.coachTips,o.trap))add("Objection Gym",o.title,(o.trap||"").slice(0,80),o.e,()=>{setShowSearch(false);setTab(7);setObjActiveId(o.id);});});
    for(const cat of GLOSSARY){for(const t of cat.terms){if((out["Glossary"]?.length||0)>=6)break;if(t.term.toLowerCase().includes(lo)||t.def.toLowerCase().includes(lo))add("Glossary",t.term,t.def.slice(0,80),"📖",()=>{setShowSearch(false);setTab(8);setGlossarySearch(t.term);});}}
    return out;
  };

  const copyForSlack=()=>{
    const analysis=callMsgs.find(m=>m.role==="assistant");
    if(!analysis)return;
    const date=new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});
    const title=`Call Analysis — ${callAccount||"Unknown Account"} · ${callContact||"Unknown Contact"} · ${callType}`;
    const mdToHtml=(md:string)=>{
      const lines=md.split("\n");
      const out:string[]=[];
      let inList=false;
      for(const line of lines){
        const trimmed=line.trim();
        if(trimmed.startsWith("- ")||trimmed.startsWith("• ")){
          if(!inList){out.push("<ul>");inList=true;}
          out.push("<li>"+inlineHtml(trimmed.slice(2))+"</li>");
        } else {
          if(inList){out.push("</ul>");inList=false;}
          if(/^## /.test(line))out.push("<h2>"+inlineHtml(line.slice(3))+"</h2>");
          else if(/^### /.test(line))out.push("<h3>"+inlineHtml(line.slice(4))+"</h3>");
          else if(trimmed==="---")out.push("<hr>");
          else if(trimmed==="")out.push("<br>");
          else out.push("<p>"+inlineHtml(line)+"</p>");
        }
      }
      if(inList)out.push("</ul>");
      return out.join("");
    };
    const inlineHtml=(s:string)=>s
      .replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")
      .replace(/\*([^*\n]+)\*/g,"<strong>$1</strong>")
      .replace(/_([^_\n]+)_/g,"<em>$1</em>");
    const html=`<p><strong>${title}</strong><br><em>${date}</em></p>${mdToHtml(analysis.content)}`;
    const plain=`${title}\n${date}\n\n${analysis.content}`;
    navigator.clipboard.write([new ClipboardItem({"text/html":new Blob([html],{type:"text/html"}),"text/plain":new Blob([plain],{type:"text/plain"})})]).then(()=>{setSlackCopied(true);setTimeout(()=>setSlackCopied(false),2500);});
  };

  const saveUserName=(v:string)=>{setUserName(v);store.set("signalHubUserName",v);};
  const saveUserRole=(v:"SDR"|"AE"|"SE"|"")=>{setUserRole(v);store.set("signalHubUserRole",v);};
  const saveDefaultCallType=(v:"CC"|"DM")=>{setDefaultCallType(v);store.set("signalHubDefaultCallType",v);};
  const saveCoachStyle=(v:"socratic"|"direct")=>{setCoachStyle(v);store.set("signalHubCoachStyle",v);};
  const saveUiDensity=(v:"comfortable"|"compact")=>{setUiDensity(v);store.set("signalHubDensity",v);};
  const saveFontSize=(v:number)=>{setFontSize(v);store.set("signalHubFontSize",String(v));};

  const confirmResetProgress=()=>setConfirmModal({
    title:"Reset Learning Progress",
    body:"This will permanently clear your visited status, deep-dive history, and message counts for all topics. Your call analyses are not affected. This cannot be undone.",
    onConfirm:()=>{save({});setConfirmModal(null);}
  });
  const confirmClearHistory=()=>setConfirmModal({
    title:"Clear Call History",
    body:"This will permanently delete all saved call analyses, including transcripts and follow-up conversations. Your learning progress is not affected. This cannot be undone.",
    onConfirm:()=>{setCallHistory([]);setCurrentCallId(null);setCallMsgs([]);store.set("signalHubCalls",JSON.stringify([]));setConfirmModal(null);}
  });

  const DISC_ITEMS:Item[]=DISC.map((g,gi)=>({id:`disc-${gi}`,title:g.title,e:"🔍"}));
  const PATH_ITEMS:Item[]=DISCOVERY_PATHS.map(p=>({id:`path-${p.stageId}`,title:p.title,e:p.e}));
  const OBJ_ITEMS:Item[]=OBJECTIONS.map(o=>({id:o.id,title:o.title,e:o.e}));
  const allItems:Item[]=[...MODS,...ARCH,...PERSONAS,...COMPS,...DISC_ITEMS,...PATH_ITEMS,...OBJ_ITEMS];
  const visited=allItems.filter(it=>tierOf(prog[it.id])!=="none").length;
  const practicedCount=allItems.filter(it=>tierOf(prog[it.id])==="practiced").length;
  const mastered=allItems.filter(it=>tierOf(prog[it.id])==="mastered").length;
  const pct=Math.round((visited/allItems.length)*100);

  const TABS=["🏠 Dashboard","🧩 Solutions","🔄 SDLC","👥 Personas","⚔️ Competitive","🔍 Discovery","🗺️ Land Planner","🥊 Objection Gym","📖 Glossary","📞 Calls","🎯 Progress","⚙️ Settings"];

  return(
    <div style={{minHeight:"100vh",background:BG,color:TX,fontFamily:"Inter,system-ui,sans-serif",fontSize:14,opacity:loaded?1:0,transition:"opacity .2s"}}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div style={{background:CD,borderBottom:`1px solid ${BO}`,padding:"11px 18px",display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:10}}>
        <div style={{width:32,height:32,borderRadius:7,background:`linear-gradient(135deg,${A},${TL})`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:14,color:BG,flexShrink:0}}>G</div>
        <div>
          <div style={{fontWeight:700,fontSize:14,letterSpacing:-.2,fontFamily:"Poppins,system-ui,sans-serif"}}>GTM Enablement Hub</div>
          <div style={{fontSize:11,color:MU}}>Relay · <span style={{color:A,fontWeight:600}}>Full-SDLC GTM enablement</span></div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8}}>
          <button onClick={()=>setShowSearch(v=>!v)} title="Search (⌘K)"
            style={{background:"none",border:`1px solid ${BO}`,borderRadius:7,padding:"5px 10px",color:MU,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}>
            🔍 <span>Search</span>
          </button>
          <button onClick={()=>setShowBookmarks(v=>!v)}
            style={{background:bookmarks.size>0?A+"11":"none",border:`1px solid ${bookmarks.size>0?A+"44":BO}`,borderRadius:7,padding:"5px 10px",color:bookmarks.size>0?A:MU,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}>
            {bookmarks.size>0?`⭐ ${bookmarks.size}`:"☆ Saved"}
          </button>
          <div style={{width:1,height:18,background:BO,flexShrink:0}}/>
          <div style={{fontSize:11,color:MU,whiteSpace:"nowrap"}}>{visited}/{allItems.length} explored · {mastered} mastered</div>
          <div style={{width:90,background:BO,borderRadius:99,height:4,overflow:"hidden",flexShrink:0}}>
            <div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${A},${TL})`,transition:"width .5s"}}/>
          </div>
          <span style={{fontSize:12,fontWeight:700,color:A,minWidth:28}}>{pct}%</span>
        </div>
      </div>

      {/* ── Tab bar ────────────────────────────────────────────────────── */}
      <div style={{background:CD,borderBottom:`1px solid ${BO}`,display:"flex",overflowX:"auto",padding:"0 6px"}}>
        {TABS.map((t,i)=>(
          <button key={i} onClick={()=>setTab(i)} style={{background:"none",border:"none",borderBottom:tab===i?`2px solid ${A}`:"2px solid transparent",padding:"10px 11px",fontSize:12,fontWeight:tab===i?700:400,color:tab===i?A:MU,cursor:"pointer",whiteSpace:"nowrap",transition:"all .15s"}}>{t}</button>
        ))}
      </div>

      <div style={{padding:uiDensity==="compact"?"12px":"18px",maxWidth:1100,margin:"0 auto",fontSize:fontSize}}>

        {/* ── tab 0: Dashboard ─────────────────────────────────────────── */}
        {tab===0&&(
          <div>
            <Hdr title="GTM Enablement Hub" accent="Enablement Hub" sub="Relay full-SDLC enablement — explore modules, personas, competitive landscape, discovery, and AI coaching."/>
            {/* Stats row */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20}}>
              {[
                {l:"Solutions",v:MODS.length,e:"🧩",onClick:()=>setTab(1)},
                {l:"Personas",v:PERSONAS.length,e:"👥",onClick:()=>setTab(3)},
                {l:"Battlecards",v:COMPS.length,e:"⚔️",onClick:()=>setTab(4)},
                {l:"Discovery",v:DISC.reduce((n,g)=>n+g.qs.length,0),e:"🔍",onClick:()=>setTab(5)},
              ].map((s,i)=>(
                <div key={i} onClick={s.onClick} style={{background:CD,border:`1px solid ${BO}`,borderRadius:10,padding:"16px 14px",textAlign:"center",cursor:"pointer",transition:"all .2s"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=A+"55";(e.currentTarget as HTMLDivElement).style.background=C2;}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=BO;(e.currentTarget as HTMLDivElement).style.background=CD;}}>
                  <div style={{fontSize:28,marginBottom:4}}>{s.e}</div>
                  <div style={{fontSize:30,fontWeight:700,color:A,fontFamily:"Poppins,system-ui,sans-serif",lineHeight:1.1}}>{s.v}</div>
                  <div style={{fontSize:10,color:MU,marginTop:4,textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>{s.l}</div>
                </div>
              ))}
            </div>
            {/* CTA cards */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:20}}>
              {[
                {title:"Explore SDLC Map",sub:"Walk the full software delivery value stream and find where work waits.",e:"🔄",tab:2,c:A},
                {title:"Browse Solutions",sub:"Four value pillars powered by Relay AI — explore every module.",e:"🧩",tab:1,c:TL},
                {title:"Land Planner",sub:"Wedge → toolchain honesty → proof ladder. Build a scoped land narrative.",e:"🗺️",tab:6,c:WA},
                {title:"Paste a Call",sub:"AI analysis of your transcript — fit, sentiment, pain points, next steps.",e:"📞",tab:9,c:SU},
              ].map((cta,i)=>(
                <div key={i} onClick={()=>setTab(cta.tab)}
                  style={{background:CD,border:`1px solid ${cta.c}33`,borderRadius:10,padding:"16px 18px",cursor:"pointer",transition:"all .2s"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=cta.c+"66";(e.currentTarget as HTMLDivElement).style.background=cta.c+"08";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=cta.c+"33";(e.currentTarget as HTMLDivElement).style.background=CD;}}>
                  <div style={{fontSize:24,marginBottom:8}}>{cta.e}</div>
                  <div style={{fontWeight:700,fontSize:14,color:TX,marginBottom:4}}>{cta.title}</div>
                  <div style={{fontSize:12,color:MU,lineHeight:1.55}}>{cta.sub}</div>
                  <div style={{fontSize:11,fontWeight:700,color:cta.c,marginTop:10}}>Go →</div>
                </div>
              ))}
            </div>
            {/* Suggested path */}
            <div style={{background:A+"09",border:`1px solid ${A}22`,borderRadius:10,padding:"16px 18px",marginBottom:16}}>
              <div style={{fontWeight:700,fontSize:13,color:A,marginBottom:10}}>📋 Suggested path — 4 steps</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {[
                  {n:"1",t:"Start with the SDLC map","d":"Walk the value stream. Find where work waits — that stage is the wedge."},
                  {n:"2",t:"Open Solutions / Relay AI","d":"Learn the modules that sit on that constraint."},
                  {n:"3",t:"Study the buyer persona","d":"How that persona thinks about the constraint and what good sounds like."},
                  {n:"4",t:"Practise objections or a call","d":"Objection Gym for hard pushes; Calls for transcripts."},
                ].map((step,i)=>(
                  <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                    <div style={{width:22,height:22,borderRadius:99,background:A,color:BG,fontWeight:700,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{step.n}</div>
                    <div>
                      <div style={{fontWeight:600,fontSize:13,color:TX,marginBottom:2}}>{step.t}</div>
                      <div style={{fontSize:12,color:MU,lineHeight:1.55}}>{step.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Progress teaser */}
            {visited>0&&(
              <div style={{background:CD,border:`1px solid ${BO}`,borderRadius:10,padding:"14px 16px",display:"flex",alignItems:"center",gap:14}}>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:13,color:TX,marginBottom:3}}>Your progress</div>
                  <div style={{fontSize:12,color:MU}}>{visited} items explored · {practicedCount} practiced · {mastered} mastered</div>
                </div>
                <div style={{width:100,background:BO,borderRadius:99,height:5,overflow:"hidden"}}>
                  <div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${A},${TL})`}}/>
                </div>
                <button onClick={()=>setTab(10)} style={{background:"none",border:`1px solid ${BO}`,borderRadius:7,padding:"5px 11px",fontSize:11,color:MU,cursor:"pointer",fontWeight:600,whiteSpace:"nowrap"}}>View progress →</button>
              </div>
            )}
          </div>
        )}

        {/* ── tab 1: Solutions ─────────────────────────────────────────── */}
        {tab===1&&(
          <div>
            <Hdr title="The Relay Platform — Solutions" accent="Solutions" sub="Four value pillars powered by Relay AI. Click any module to explore."/>
            {/* Four pillar columns */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:_compact?6:10,marginBottom:_compact?8:14}}>
              {PILLARS.map(pil=>{
                const mods=MODS.filter(m=>m.pillar===pil.id);
                return(
                  <div key={pil.id} style={{background:CD,border:`1px solid ${pil.c}33`,borderRadius:10,overflow:"hidden"}}>
                    <div style={{background:pil.c+"18",borderBottom:`1px solid ${pil.c}33`,padding:"10px 12px"}}>
                      <div style={{fontSize:10,fontWeight:700,color:pil.c,letterSpacing:.8}}>{pil.label.toUpperCase()}</div>
                      <div style={{fontSize:16,fontWeight:800,color:TX,lineHeight:1.1}}>{pil.value}</div>
                    </div>
                    <div style={{padding:_compact?"5px 5px 2px":"8px 8px 4px"}}>
                      {mods.map(m=>{
                        const open=()=>{setModal(m);save({...prog,[m.id]:{...(prog[m.id]||{}),visited:true,lastVisit:Date.now()}});};
                        return(
                          <div key={m.id} onClick={open}
                            style={{background:C2,border:`1px solid ${BO}`,borderRadius:7,padding:_compact?"6px 8px":"9px 10px",marginBottom:_compact?3:5,cursor:"pointer",transition:"all .15s",position:"relative"}}
                            onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=m.c+"66";}}
                            onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=BO;}}>
                            <div style={{position:"absolute",top:6,right:6,display:"flex",gap:4,alignItems:"center"}}>
                              <button onClick={e=>{e.stopPropagation();toggleBookmark(m.id);}} title={bookmarks.has(m.id)?"Remove bookmark":"Save"}
                                style={{background:"none",border:"none",cursor:"pointer",fontSize:11,lineHeight:1,padding:0,color:bookmarks.has(m.id)?WA:MU}}>
                                {bookmarks.has(m.id)?"⭐":"☆"}
                              </button>
                              <Dot p={prog} id={m.id}/>
                            </div>
                            <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}>
                              <span style={{fontSize:_compact?13:16}}>{m.e}</span>
                              <span style={{fontWeight:700,fontSize:_fs-2,color:TX,paddingRight:12}}>{m.title}</span>
                            </div>
                            <div style={{fontSize:_fs-3,color:MU,lineHeight:1.5,marginBottom:5}}>{m.short}</div>
                            <div style={{fontSize:10,fontWeight:700,color:pil.c}}>Explore →</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Relay AI section */}
            {(()=>{
              const [relayAi,deliveryGraph,guardrails]=RELAY_AI.platform;
              const openItem=(item:Item)=>{setModal(item);save({...prog,[item.id]:{...(prog[item.id]||{}),visited:true,lastVisit:Date.now()}});};
              const aiCard=(item:Item,mx:string,borderC:string,bgTint:string,extra?:React.ReactNode)=>(
                <div key={item.id} style={{margin:`0 ${mx}`,marginBottom:8,background:CD,border:`1px solid ${borderC}`,borderRadius:10,cursor:"pointer",transition:"all .15s"}}
                  onClick={()=>openItem(item)}
                  onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background=bgTint;(e.currentTarget as HTMLDivElement).style.borderColor=A+"88";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background=CD;(e.currentTarget as HTMLDivElement).style.borderColor=borderC;}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,padding:"11px 14px 5px"}}>
                    <span style={{fontSize:15}}>{item.e}</span>
                    <span style={{fontWeight:700,fontSize:13,color:TX,flex:1}}>{item.title}</span>
                    <span style={{fontSize:10,fontWeight:700,color:A,flexShrink:0}}>Explore →</span>
                  </div>
                  <div style={{padding:"0 14px 11px",fontSize:11,color:MU,lineHeight:1.5}}>{item.short}</div>
                  {extra&&<div style={{padding:"0 14px 12px"}}>{extra}</div>}
                </div>
              );
              return(
                <div style={{marginBottom:14}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                    <span style={{fontSize:10,fontWeight:800,color:A,letterSpacing:1.4,background:A+"22",padding:"3px 8px",borderRadius:4,flexShrink:0}}>RELAY AI</span>
                    <span style={{fontSize:12,color:MU,flex:1}}>Unified intelligence across the delivery stream — Delivery Graph context, not bolted-on copilots.</span>
                    <div onClick={()=>openItem(guardrails)}
                      style={{display:"flex",alignItems:"center",gap:5,background:ER+"18",border:`1px solid ${ER}44`,borderRadius:5,padding:"3px 9px",cursor:"pointer",flexShrink:0,transition:"all .15s"}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=ER+"99";}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=ER+"44";}}>
                      <span style={{fontSize:12}}>{guardrails.e}</span>
                      <span style={{fontSize:10,fontWeight:700,color:ER}}>AI Guardrails →</span>
                    </div>
                  </div>
                  {aiCard(relayAi,"0",A+"33",A+"08")}
                  {aiCard(deliveryGraph,"-6px",A+"55",A+"0c")}
                  {aiCard(guardrails,"-12px",A+"77",A+"11",
                    <div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10,justifyContent:"center"}}>
                        {RELAY_AI.agents.map(agent=>(
                          <div key={agent.id} onClick={e=>{e.stopPropagation();openItem(agent);}}
                            style={{background:C2,border:`1px solid ${agent.c}44`,borderRadius:5,padding:"4px 9px",cursor:"pointer",display:"flex",alignItems:"center",gap:5,transition:"all .15s"}}
                            onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=agent.c+"99";(e.currentTarget as HTMLDivElement).style.background=agent.c+"11";}}
                            onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=agent.c+"44";(e.currentTarget as HTMLDivElement).style.background=C2;}}>
                            <span style={{fontSize:12}}>{agent.e}</span>
                            <span style={{fontSize:11,fontWeight:600,color:TX}}>{agent.title}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{borderTop:`1px solid ${A}22`,paddingTop:8}}>
                        <div style={{fontSize:9,fontWeight:800,color:MU,letterSpacing:1.2,marginBottom:6,textAlign:"center"}}>AI PLATFORM FEATURES</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:5,justifyContent:"center"}}>
                          {RELAY_AI.features.map(feat=>(
                            <div key={feat.id} onClick={e=>{e.stopPropagation();openItem(feat);}}
                              style={{background:BG,border:`1px solid ${feat.c}55`,borderRadius:5,padding:"4px 9px",cursor:"pointer",display:"flex",alignItems:"center",gap:5,transition:"all .15s"}}
                              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=feat.c+"aa";(e.currentTarget as HTMLDivElement).style.background=feat.c+"11";}}
                              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=feat.c+"55";(e.currentTarget as HTMLDivElement).style.background=BG;}}>
                              <span style={{fontSize:12}}>{feat.e}</span>
                              <span style={{fontSize:11,fontWeight:600,color:TX}}>{feat.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
            {/* Architecture strip */}
            <div style={{marginTop:8}}>
              <div style={{fontWeight:700,fontSize:11,color:MU,marginBottom:7,textTransform:"uppercase",letterSpacing:1}}>Architecture</div>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {ARCH.map(s=>(
                  <div key={s.id} onClick={()=>{setModal(s);save({...prog,[s.id]:{...(prog[s.id]||{}),visited:true,lastVisit:Date.now()}});}}
                    style={{background:CD,border:`1px solid ${BO}`,borderRadius:8,padding:12,cursor:"pointer",display:"flex",gap:10,alignItems:"center",transition:"all .2s"}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background=C2;(e.currentTarget as HTMLDivElement).style.borderColor=s.c+"55";}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background=CD;(e.currentTarget as HTMLDivElement).style.borderColor=BO;}}>
                    <div style={{width:28,height:28,borderRadius:99,background:s.c+"22",color:s.c,fontWeight:800,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{s.e}</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:12,marginBottom:1}}>{s.title}</div>
                      <div style={{fontSize:11,color:MU,lineHeight:1.5}}>{fmt(String(s.short||""))}</div>
                    </div>
                    <Dot p={prog} id={s.id}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── tab 2: SDLC ──────────────────────────────────────────────── */}
        {tab===2&&(()=>{
          const active=SDLC_STAGES.find(s=>s.id===sdlcActive)||null;
          const STAGE_ORDER=["plan","code","build","test","secure","release","operate","improve"];
          const activeIdx=active?STAGE_ORDER.indexOf(active.id):-1;
          const prevStage=activeIdx>0?SDLC_STAGES.find(s=>s.id===STAGE_ORDER[activeIdx-1])||null:null;
          const nextStage=activeIdx>=0&&activeIdx<STAGE_ORDER.length-1?SDLC_STAGES.find(s=>s.id===STAGE_ORDER[activeIdx+1])||null:null;
          const Node=({s}:{s:typeof SDLC_STAGES[0]})=>{
            const on=sdlcActive===s.id;
            return(
              <div onClick={()=>setSdlcActive(on?null:s.id)}
                style={{flex:1,minWidth:0,background:on?s.c+"22":"transparent",border:`2px solid ${on?s.c:"transparent"}`,borderRadius:8,padding:"10px 4px",cursor:"pointer",textAlign:"center",transition:"all .15s",userSelect:"none"}}>
                <div style={{fontSize:20}}>{s.e}</div>
                <div style={{fontSize:11,fontWeight:700,color:on?s.c:TX,marginTop:3,lineHeight:1.2}}>{s.st}</div>
                <div style={{fontSize:9,color:MU,marginTop:2,lineHeight:1.3,display:uiDensity==="compact"?"none":"block"}}>{s.question}</div>
              </div>
            );
          };
          return(
            <div>
              <Hdr title="SDLC Explorer" accent="Explorer" sub="One continuous value stream. Find where work waits — start there. Click any stage to explore."/>
              <div style={{background:A+"09",border:`1px solid ${A}22`,borderRadius:10,padding:"14px 16px",marginBottom:14}}>
                <Md t={SDLC_INTRO}/>
              </div>
              <div style={{background:CD,border:`1px solid ${BO}`,borderRadius:10,padding:"12px 10px",marginBottom:14}}>
                <div style={{fontSize:9,fontWeight:700,color:A,letterSpacing:1.2,marginBottom:2}}>VALUE STREAM</div>
                <div style={{fontSize:10,color:MU,marginBottom:10}}>Equal stages · start at the constraint · expand when ready</div>
                <div style={{display:"flex",gap:3,alignItems:"center",overflowX:"auto"}}>
                  {STAGE_ORDER.map((id,i)=>{
                    const s=SDLC_STAGES.find(x=>x.id===id)!;
                    return <React.Fragment key={id}><Node s={s}/>{i<STAGE_ORDER.length-1&&<span style={{fontSize:16,color:MU,fontFamily:"Arial",flexShrink:0}}>›</span>}</React.Fragment>;
                  })}
                </div>
              </div>
              <Callout c={A} ch={<><strong style={{color:A}}>Constraint-first:</strong> Relay can cover the whole stream. The useful question is where a typical change loses the most calendar time — that stage is the wedge, and adjacent modules are already there when the team is ready.</>}/>
              {active&&(
                <div style={{background:C2,border:`2px solid ${active.c}44`,borderRadius:10,padding:16,marginBottom:14,marginTop:4}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                    <div style={{fontSize:28}}>{active.e}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                        <div style={{fontWeight:700,fontSize:16,color:active.c}}>{active.st}</div>
                        {active.question&&<span style={{fontSize:11,fontWeight:600,color:MU,fontStyle:"italic"}}>{active.question}</span>}
                      </div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                        {active.mods?.map((m,i)=><Chip key={i} l={m} c={active.c}/>)}
                      </div>
                    </div>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,paddingBottom:10,borderBottom:`1px solid ${BO}`}}>
                    <button onClick={()=>setSdlcActive(prevStage?.id||null)} disabled={!prevStage} style={{background:"none",border:`1px solid ${prevStage?BO:"transparent"}`,borderRadius:6,padding:"5px 10px",fontSize:11,color:prevStage?MU:"transparent",cursor:prevStage?"pointer":"default"}}>← {prevStage?prevStage.st:""}</button>
                    <span style={{fontSize:10,color:MU,fontWeight:600}}>{STAGE_ORDER.indexOf(active.id)+1} / {STAGE_ORDER.length}</span>
                    <button onClick={()=>setSdlcActive(nextStage?.id||null)} disabled={!nextStage} style={{background:"none",border:`1px solid ${nextStage?BO:"transparent"}`,borderRadius:6,padding:"5px 10px",fontSize:11,color:nextStage?MU:"transparent",cursor:nextStage?"pointer":"default"}}>{nextStage?nextStage.st:""} →</button>
                  </div>
                  {active.d&&<div style={{background:BG,borderRadius:8,padding:14,marginBottom:12,border:`1px solid ${BO}`}}><Md t={active.d}/></div>}
                  {active.sections&&<Accordion sections={active.sections}/>}
                  <button onClick={()=>openChat({...active,title:active.st||active.id},"sdlc")} style={{width:"100%",background:`linear-gradient(135deg,${active.c},${A})`,color:BG,border:"none",borderRadius:8,padding:"10px",fontWeight:700,fontSize:13,cursor:"pointer",marginTop:4}}>🧠 Coach me on {active.st} →</button>
                </div>
              )}
              {!active&&<div style={{textAlign:"center",color:MU,fontSize:13,padding:"16px 0"}}>Select a stage above to explore it</div>}
            </div>
          );
        })()}

        {/* ── tab 3: Personas ───────────────────────────────────────────── */}
        {tab===3&&(
          <div>
            <Hdr title="Buyer Personas" accent="Personas" sub="Personas covering the full buying committee. Click any for discovery tactics and roleplay coaching."/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {PERSONAS.map(p=>(
                <CardWrap key={p.id} onClick={()=>{setModal(p);save({...prog,[p.id]:{...(prog[p.id]||{}),visited:true,lastVisit:Date.now()}});}} accent={p.c} prog={prog} id={p.id}>
                  <div style={{fontSize:26,marginBottom:8}}>{p.e}</div>
                  {p.role&&<Chip l={p.role} c={p.c}/>}
                  <div style={{fontWeight:700,fontSize:14,margin:"8px 0 5px"}}>{p.title}</div>
                  <div style={{fontSize:12,color:MU,lineHeight:1.6}}>{p.short}</div>
                </CardWrap>
              ))}
            </div>
          </div>
        )}

        {/* ── tab 4: Competitive ────────────────────────────────────────── */}
        {tab===4&&(()=>{
          const COMP_CATS=[
            {id:"all",label:"All"},
            {id:"featured",label:"⭐ Top"},
            {id:"platform",label:"Platform"},
            {id:"cd",label:"CD & Release"},
            {id:"ci",label:"CI & Build"},
            {id:"sre",label:"SRE"},
            {id:"flags",label:"Feature Flags"},
            {id:"security",label:"Security"},
            {id:"ai",label:"AI Code"},
            {id:"idp",label:"Dev Portal"},
            {id:"supply",label:"Supply / Artifacts"},
            {id:"insights",label:"Eng Insights"},
            {id:"finops",label:"FinOps"},
            {id:"iac",label:"Infra / IaC"},
            {id:"chaos",label:"Reliability Exp."},
          ];
          const filteredComps=compFilter==="featured"?COMPS.filter(c=>c.featured):compFilter==="all"?COMPS:COMPS.filter(c=>c.cats?.includes(compFilter));
          return(
            <div>
              <Hdr title="Competitive Intelligence" accent="Intelligence" sub="Filter by product category. Click any card for the full battlecard and objection-handling guide."/>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
                {COMP_CATS.map(cat=>(
                  <button key={cat.id} onClick={()=>setCompFilter(cat.id)}
                    style={{background:compFilter===cat.id?A+"22":C2,border:`1px solid ${compFilter===cat.id?A:BO}`,borderRadius:99,padding:"4px 12px",fontSize:11,fontWeight:600,color:compFilter===cat.id?A:MU,cursor:"pointer",transition:"all .15s",letterSpacing:.3}}>
                    {cat.label}
                  </button>
                ))}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:9}}>
                {filteredComps.map(comp=>(
                  <div key={comp.id} onClick={()=>{setModal(comp);save({...prog,[comp.id]:{...(prog[comp.id]||{}),visited:true,lastVisit:Date.now()}});}}
                    style={{background:CD,border:`1px solid ${BO}`,borderRadius:10,padding:14,cursor:"pointer",display:"grid",gridTemplateColumns:"auto 1fr 1fr auto",gap:14,alignItems:"center",transition:"all .2s"}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background=C2;(e.currentTarget as HTMLDivElement).style.borderColor=comp.c+"44";}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background=CD;(e.currentTarget as HTMLDivElement).style.borderColor=BO;}}>
                    <div style={{fontSize:26}}>{comp.e}</div>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                        <div style={{fontWeight:700,fontSize:13}}>{comp.n}</div>
                        <Dot p={prog} id={comp.id}/>
                      </div>
                      <div style={{fontSize:11,color:MU,lineHeight:1.5}}>{comp.str?.slice(0,55)}…</div>
                    </div>
                    <div>
                      <div style={{fontSize:10,fontWeight:700,color:SU,marginBottom:2,letterSpacing:.6}}>OUR EDGE</div>
                      <div style={{fontSize:11,color:TX,lineHeight:1.5}}>{comp.adv?.slice(0,70)}…</div>
                    </div>
                    <div style={{fontSize:11,color:A,fontWeight:600,whiteSpace:"nowrap"}}>Battle card →</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* ── tab 5: Discovery ──────────────────────────────────────────── */}
        {tab===5&&(()=>{
          const STAGE_ORDER=["plan","code","build","test","secure","release","operate","improve"];
          const discPath=DISCOVERY_PATHS.find(p=>p.stageId===pathStageId)||DISCOVERY_PATHS[0];
          const step=discPath?.steps[pathStep];
          return(
          <div>
            <Hdr title="Discovery" accent="Paths" sub="Browse questions by theme or follow a constraint-first path stage by stage."/>
            <div style={{display:"flex",gap:6,marginBottom:14}}>
              {(["browse","path"] as const).map(m=>(
                <button key={m} onClick={()=>setDiscMode(m)}
                  style={{background:discMode===m?A+"22":C2,border:`1px solid ${discMode===m?A:BO}`,borderRadius:99,padding:"6px 16px",fontSize:12,fontWeight:discMode===m?700:400,color:discMode===m?A:MU,cursor:"pointer",transition:"all .15s",textTransform:"capitalize"}}>
                  {m==="browse"?"Browse":"Path"}
                </button>
              ))}
            </div>
            {discMode==="browse"&&(
              <div style={{display:"flex",flexDirection:"column",gap:18}}>
                {DISC.map((g,gi)=>(
                  <div key={gi}>
                    <div style={{fontWeight:700,fontSize:14,marginBottom:9,color:TX}}>{g.title}</div>
                    <div style={{display:"flex",flexDirection:"column",gap:7}}>
                      {g.qs.map((q,qi)=>{
                        const k=`${gi}-${qi}`;const isOpen=openQ===k;
                        return(
                          <div key={qi} onClick={()=>{setOpenQ(isOpen?null:k);if(!isOpen)save({...prog,[`disc-${gi}`]:{...(prog[`disc-${gi}`]||{}),visited:true,lastVisit:Date.now()}});}} style={{background:CD,border:`1px solid ${isOpen?A+"55":BO}`,borderRadius:9,cursor:"pointer",overflow:"hidden",transition:"all .2s"}}>
                            <div style={{padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
                              <div style={{fontSize:13,fontStyle:"italic",color:isOpen?TX:MU,fontWeight:isOpen?500:400,flex:1}}>"{q.q}"</div>
                              <span style={{color:A,fontSize:14,transform:isOpen?"rotate(180deg)":"none",transition:"transform .2s",flexShrink:0}}>▼</span>
                            </div>
                            {isOpen&&(
                              <div style={{padding:"0 14px 12px",borderTop:`1px solid ${BO}`}}>
                                <div style={{marginTop:10}}>
                                  <div style={{fontSize:10,fontWeight:700,color:WA,marginBottom:3,letterSpacing:.7}}>WHY THIS QUESTION</div>
                                  <div style={{fontSize:12,color:TX,lineHeight:1.7,marginBottom:10}}>{q.why}</div>
                                  <div style={{fontSize:10,fontWeight:700,color:A,marginBottom:3,letterSpacing:.7}}>FOLLOW-UP</div>
                                  <div style={{fontSize:12,fontStyle:"italic",color:MU}}>"{q.fu}"</div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {discMode==="path"&&discPath&&(
              <div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
                  {STAGE_ORDER.map(sid=>{
                    const s=SDLC_STAGES.find(x=>x.id===sid);
                    if(!s)return null;
                    return(
                      <button key={sid} onClick={()=>{setPathStageId(sid);setPathStep(0);save({...prog,[`path-${sid}`]:{...(prog[`path-${sid}`]||{}),visited:true,lastVisit:Date.now()}});}}
                        style={{background:pathStageId===sid?A+"22":C2,border:`1px solid ${pathStageId===sid?A:BO}`,borderRadius:99,padding:"5px 13px",fontSize:12,fontWeight:pathStageId===sid?700:400,color:pathStageId===sid?A:MU,cursor:"pointer",display:"flex",alignItems:"center",gap:5,transition:"all .15s"}}>
                        <span>{s.e}</span><span>{s.st}</span>
                      </button>
                    );
                  })}
                </div>
                <div style={{background:CD,border:`1px solid ${A}33`,borderRadius:10,padding:16,marginBottom:14}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                    <span style={{fontSize:24}}>{discPath.e}</span>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:15,color:TX}}>{discPath.title}</div>
                      <div style={{fontSize:11,color:MU}}>Step {pathStep+1} of {discPath.steps.length}</div>
                    </div>
                    <div style={{display:"flex",gap:5}}>
                      {discPath.steps.map((_,i)=>(
                        <div key={i} style={{width:8,height:8,borderRadius:99,background:i===pathStep?A:i<pathStep?SU:BO,flexShrink:0,cursor:"pointer",transition:"background .15s"}} onClick={()=>setPathStep(i)}/>
                      ))}
                    </div>
                  </div>
                  {step&&(
                    <>
                      <div style={{background:C2,borderRadius:8,padding:"12px 14px",marginBottom:10,border:`1px solid ${BO}`}}>
                        <div style={{fontSize:10,fontWeight:700,color:WA,marginBottom:5,letterSpacing:.7}}>QUESTION</div>
                        <div style={{fontSize:13,fontStyle:"italic",color:TX,lineHeight:1.7,marginBottom:8}}>"{step.prompt}"</div>
                        <div style={{fontSize:10,fontWeight:700,color:MU,marginBottom:3,letterSpacing:.7}}>WHY</div>
                        <div style={{fontSize:12,color:MU,lineHeight:1.65}}>{step.why}</div>
                      </div>
                      {step.hintNext&&<div style={{fontSize:11,color:A,fontWeight:600,marginBottom:8}}>→ Next: {step.hintNext}</div>}
                      {step.moduleHints&&step.moduleHints.length>0&&(
                        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
                          {step.moduleHints.map(h=><Chip key={h} l={h} c={TL}/>)}
                        </div>
                      )}
                    </>
                  )}
                  <div style={{display:"flex",gap:8,justifyContent:"space-between",alignItems:"center",borderTop:`1px solid ${BO}`,paddingTop:12}}>
                    <button onClick={()=>setPathStep(p=>Math.max(0,p-1))} disabled={pathStep===0}
                      style={{background:"none",border:`1px solid ${pathStep>0?BO:"transparent"}`,borderRadius:7,padding:"7px 14px",fontSize:12,color:pathStep>0?MU:"transparent",cursor:pathStep>0?"pointer":"default"}}>← Back</button>
                    {pathStep<discPath.steps.length-1?(
                      <button onClick={()=>setPathStep(p=>p+1)}
                        style={{background:A,color:BG,border:"none",borderRadius:7,padding:"7px 16px",fontSize:12,fontWeight:700,cursor:"pointer"}}>Next →</button>
                    ):(
                      <button onClick={()=>goLandPlanner(pathStageId)}
                        style={{background:`linear-gradient(135deg,${A},${TL})`,color:BG,border:"none",borderRadius:7,padding:"7px 16px",fontSize:12,fontWeight:700,cursor:"pointer"}}>Open Land Planner →</button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          );
        })()}

        {/* ── tab 6: Land Planner ───────────────────────────────────────── */}
        {tab===6&&(()=>{
          const STAGE_ORDER=["plan","code","build","test","secure","release","operate","improve"];
          const stage=SDLC_STAGES.find(s=>s.id===landConstraint)||null;
          const modTitles=stage?.mods||[];
          const resolveMod=(title:string)=>MODS.find(m=>m.title===title);
          const landMod=resolveMod(modTitles[0]||"");
          const expandMods=modTitles.slice(1).map(resolveMod).filter((m):m is typeof MODS[0]=>!!m);
          const proofTemplate=LAND_PROOF_TEMPLATES.find(t=>t.risk===landRisk);
          const discPath=DISCOVERY_PATHS.find(p=>p.stageId===landConstraint);
          const stanceColor=(s:string)=>s==="replace"?ER:s==="coexist"?WA:TL;
          const buildBrief=()=>{
            const lines:string[]=[];
            lines.push(`# Land Planner — ${stage?.st||"(no stage selected)"}\n`);
            if(landMod)lines.push(`## Wedge Module\n${landMod.e||""} **${landMod.title}** — ${landMod.short||""}\n`);
            if(stage?.question)lines.push(`Stage question: ${stage.question}\n`);
            if(stage?.friction&&stage.friction.length>0)lines.push(`Friction signals:\n${stage.friction.map((f:string)=>`- ${f}`).join("\n")}\n`);
            if(expandMods.length>0)lines.push(`Expansion modules: ${expandMods.map(m=>m.title).join(", ")}\n`);
            if(discPath&&discPath.steps.length>=2)lines.push(`Confirming questions:\n- ${discPath.steps[0].prompt}\n- ${discPath.steps[1].prompt}\n`);
            if(landToolchain.size>0){
              lines.push(`## Toolchain Honesty`);
              LAND_TOOLCHAIN.filter(t=>landToolchain.has(t.id)).forEach(t=>{
                lines.push(`**${t.label}** [${t.stance.toUpperCase()}]: ${t.note}`);
              });
              lines.push("");
            }
            if(proofTemplate){
              lines.push(`## Proof Ladder — ${proofTemplate.label}`);
              lines.push(`What to show: ${proofTemplate.whatToShow}`);
              lines.push(`Metric: ${proofTemplate.metric}`);
              lines.push(`Who attends: ${proofTemplate.whoAttends}`);
              lines.push(`Exit criteria: ${proofTemplate.exitCriteria}`);
              lines.push(`Non-goals: ${proofTemplate.nonGoals}`);
            }
            return lines.join("\n");
          };
          return(
          <div>
            <Hdr title="Land Planner" accent="Planner" sub="Enter a complex platform deal: wedge → toolchain honesty → proof ladder. No fake accounts."/>
            {/* Shared inputs */}
            <div style={{background:CD,border:`1px solid ${BO}`,borderRadius:10,padding:16,marginBottom:14}}>
              <div style={{fontSize:10,fontWeight:700,color:MU,letterSpacing:1,marginBottom:8,textTransform:"uppercase"}}>Constraint Stage (required)</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
                {STAGE_ORDER.map(sid=>{
                  const s=SDLC_STAGES.find(x=>x.id===sid);
                  if(!s)return null;
                  return(
                    <button key={sid} onClick={()=>setLandConstraint(landConstraint===sid?"":sid)}
                      style={{background:landConstraint===sid?A+"22":C2,border:`1px solid ${landConstraint===sid?A:BO}`,borderRadius:99,padding:"5px 13px",fontSize:12,fontWeight:landConstraint===sid?700:400,color:landConstraint===sid?A:MU,cursor:"pointer",display:"flex",alignItems:"center",gap:5,transition:"all .15s"}}>
                      <span>{s.e}</span><span>{s.st}</span>
                    </button>
                  );
                })}
              </div>
              <div style={{fontSize:10,fontWeight:700,color:MU,letterSpacing:1,marginBottom:8,textTransform:"uppercase"}}>Personas in Room</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
                {PERSONAS.map(p=>{
                  const sel=landPersonas.includes(p.id);
                  return(
                    <button key={p.id} onClick={()=>setLandPersonas(prev=>sel?prev.filter(x=>x!==p.id):[...prev,p.id])}
                      style={{background:sel?A+"22":C2,border:`1px solid ${sel?A:BO}`,borderRadius:99,padding:"4px 11px",fontSize:11,fontWeight:sel?700:400,color:sel?A:MU,cursor:"pointer",display:"flex",alignItems:"center",gap:4,transition:"all .15s"}}>
                      <span>{p.e}</span><span>{p.title}</span>
                    </button>
                  );
                })}
              </div>
              <div style={{fontSize:10,fontWeight:700,color:MU,letterSpacing:1,marginBottom:8,textTransform:"uppercase"}}>Their Toolchain</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
                {LAND_TOOLCHAIN.map(t=>{
                  const sel=landToolchain.has(t.id);
                  return(
                    <button key={t.id} onClick={()=>setLandToolchain(prev=>{const n=new Set(prev);sel?n.delete(t.id):n.add(t.id);return n;})}
                      style={{background:sel?A+"22":C2,border:`1px solid ${sel?A:BO}`,borderRadius:99,padding:"4px 11px",fontSize:11,fontWeight:sel?700:400,color:sel?A:MU,cursor:"pointer",transition:"all .15s"}}>
                      {t.label}
                    </button>
                  );
                })}
              </div>
              <div style={{fontSize:10,fontWeight:700,color:MU,letterSpacing:1,marginBottom:8,textTransform:"uppercase"}}>Risk Theme</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {LAND_PROOF_TEMPLATES.map(t=>(
                  <button key={t.risk} onClick={()=>setLandRisk(t.risk as LandRiskTheme)}
                    style={{background:landRisk===t.risk?A+"22":C2,border:`1px solid ${landRisk===t.risk?A:BO}`,borderRadius:99,padding:"4px 11px",fontSize:11,fontWeight:landRisk===t.risk?700:400,color:landRisk===t.risk?A:MU,cursor:"pointer",transition:"all .15s"}}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            {!landConstraint&&(
              <div style={{color:MU,fontSize:13,textAlign:"center",padding:"24px 0"}}>← Pick a constraint stage above to build your land narrative.</div>
            )}
            {landConstraint&&stage&&(
              <>
                {/* Section 1: Wedge */}
                <div style={{background:CD,border:`1px solid ${A}33`,borderRadius:10,padding:16,marginBottom:14}}>
                  <div style={{fontSize:10,fontWeight:800,color:A,letterSpacing:1.2,marginBottom:10,textTransform:"uppercase"}}>1 · Wedge</div>
                  {landMod&&(
                    <div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10}}>
                      <span style={{fontSize:24}}>{landMod.e}</span>
                      <div>
                        <div style={{fontWeight:700,fontSize:14,color:TX,marginBottom:3}}>{landMod.title}</div>
                        <div style={{fontSize:12,color:MU,lineHeight:1.6}}>{landMod.short}</div>
                      </div>
                    </div>
                  )}
                  {stage.question&&<div style={{fontSize:12,fontStyle:"italic",color:MU,marginBottom:10,padding:"8px 12px",background:C2,borderRadius:7,border:`1px solid ${BO}`}}>"{stage.question}"</div>}
                  {stage.friction&&stage.friction.length>0&&(
                    <div style={{marginBottom:10}}>
                      <div style={{fontSize:10,fontWeight:700,color:WA,marginBottom:5,letterSpacing:.7}}>FRICTION SIGNALS</div>
                      {stage.friction.map((f:string,i:number)=>(
                        <div key={i} style={{display:"flex",gap:7,marginBottom:3,fontSize:12,color:TX,lineHeight:1.55}}>
                          <span style={{color:WA,flexShrink:0}}>›</span><span>{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {expandMods.length>0&&(
                    <div style={{marginBottom:10}}>
                      <div style={{fontSize:10,fontWeight:700,color:TL,marginBottom:5,letterSpacing:.7}}>EXPANSION MODULES</div>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        {expandMods.map(m=><Chip key={m.id} l={m.title||m.id} c={TL}/>)}
                      </div>
                    </div>
                  )}
                  {discPath&&discPath.steps.length>=2&&(
                    <div>
                      <div style={{fontSize:10,fontWeight:700,color:MU,marginBottom:5,letterSpacing:.7}}>CONFIRMING QUESTIONS</div>
                      {[discPath.steps[0],discPath.steps[1]].map((s,i)=>(
                        <div key={i} style={{fontSize:12,fontStyle:"italic",color:MU,marginBottom:4,lineHeight:1.6}}>"{s.prompt}"</div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Section 2: Toolchain honesty */}
                {landToolchain.size>0&&(
                  <div style={{background:CD,border:`1px solid ${BO}`,borderRadius:10,padding:16,marginBottom:14}}>
                    <div style={{fontSize:10,fontWeight:800,color:WA,letterSpacing:1.2,marginBottom:10,textTransform:"uppercase"}}>2 · Toolchain Honesty</div>
                    <div style={{display:"flex",flexDirection:"column",gap:10}}>
                      {LAND_TOOLCHAIN.filter(t=>landToolchain.has(t.id)).map(t=>(
                        <div key={t.id} style={{background:C2,borderRadius:8,padding:"10px 12px",border:`1px solid ${BO}`}}>
                          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
                            <span style={{fontWeight:700,fontSize:12,color:TX,flex:1}}>{t.label}</span>
                            <Chip l={t.stance.toUpperCase()} c={stanceColor(t.stance)}/>
                          </div>
                          <div style={{fontSize:12,color:MU,lineHeight:1.6,marginBottom:5}}>{t.note}</div>
                          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                            {t.modules.map(m=><Chip key={m} l={m} c={TL}/>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Section 3: Proof ladder */}
                {proofTemplate&&(
                  <div style={{background:CD,border:`1px solid ${SU}33`,borderRadius:10,padding:16,marginBottom:14}}>
                    <div style={{fontSize:10,fontWeight:800,color:SU,letterSpacing:1.2,marginBottom:10,textTransform:"uppercase"}}>3 · Proof Ladder — {proofTemplate.label}</div>
                    {[
                      {l:"WHAT TO SHOW",v:proofTemplate.whatToShow},
                      {l:"METRIC",v:proofTemplate.metric},
                      {l:"WHO ATTENDS",v:proofTemplate.whoAttends},
                      {l:"EXIT CRITERIA",v:proofTemplate.exitCriteria},
                      {l:"NON-GOALS",v:proofTemplate.nonGoals},
                    ].map(({l,v})=>(
                      <div key={l} style={{marginBottom:10}}>
                        <div style={{fontSize:10,fontWeight:700,color:MU,marginBottom:3,letterSpacing:.7}}>{l}</div>
                        <div style={{fontSize:12,color:TX,lineHeight:1.65}}>{v}</div>
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={()=>{
                  const brief=buildBrief();
                  navigator.clipboard.writeText(brief).then(()=>{setLandBriefCopied(true);setTimeout(()=>setLandBriefCopied(false),2000);}).catch(()=>{});
                }} style={{width:"100%",background:landBriefCopied?SU:A,color:BG,border:"none",borderRadius:8,padding:"11px",fontWeight:700,fontSize:13,cursor:"pointer",transition:"background .2s",marginBottom:8}}>
                  {landBriefCopied?"✓ Copied!":"📋 Copy land brief"}
                </button>
              </>
            )}
          </div>
          );
        })()}

        {/* ── tab 7: Objection Gym ───────────────────────────────────────── */}
        {tab===7&&(()=>{
          const THEME_LABELS:Record<ObjectionTheme,string>={
            category_reframe:"Category Reframe",
            security_trust:"Security / Trust",
            consolidation:"Consolidation",
            ai_washing:"AI Washing",
            budget_owner:"Budget / Owner",
          };
          const themes=(Object.keys(THEME_LABELS) as ObjectionTheme[]);
          const filteredObjs=OBJECTIONS.filter(o=>{
            const themeOk=objTheme==="all"||o.theme===objTheme;
            const personaOk=objPersona==="all"||o.personaIds.includes(objPersona);
            return themeOk&&personaOk;
          });
          const activeCard:ObjectionCard|undefined=OBJECTIONS.find(o=>o.id===objActiveId);
          return(
          <div>
            <Hdr title="Objection Gym" accent="Gym" sub="Practise hard objections offline — or with AI coach. Pick a theme and try it in your own words first."/>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
              <button onClick={()=>setObjTheme("all")} style={{background:objTheme==="all"?A+"22":C2,border:`1px solid ${objTheme==="all"?A:BO}`,borderRadius:99,padding:"4px 12px",fontSize:11,fontWeight:objTheme==="all"?700:400,color:objTheme==="all"?A:MU,cursor:"pointer"}}>All</button>
              {themes.map(t=>(
                <button key={t} onClick={()=>setObjTheme(t)} style={{background:objTheme===t?A+"22":C2,border:`1px solid ${objTheme===t?A:BO}`,borderRadius:99,padding:"4px 12px",fontSize:11,fontWeight:objTheme===t?700:400,color:objTheme===t?A:MU,cursor:"pointer"}}>{THEME_LABELS[t]}</button>
              ))}
            </div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
              <button onClick={()=>setObjPersona("all")} style={{background:objPersona==="all"?TL+"22":C2,border:`1px solid ${objPersona==="all"?TL:BO}`,borderRadius:99,padding:"3px 10px",fontSize:11,fontWeight:objPersona==="all"?700:400,color:objPersona==="all"?TL:MU,cursor:"pointer"}}>All personas</button>
              {PERSONAS.map(p=>(
                <button key={p.id} onClick={()=>setObjPersona(objPersona===p.id?"all":p.id)} style={{background:objPersona===p.id?TL+"22":C2,border:`1px solid ${objPersona===p.id?TL:BO}`,borderRadius:99,padding:"3px 10px",fontSize:11,fontWeight:objPersona===p.id?700:400,color:objPersona===p.id?TL:MU,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
                  <span>{p.e}</span><span>{p.title}</span>
                </button>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:activeCard?"1fr 1fr":"1fr 1fr",gap:10}}>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {filteredObjs.length===0&&<div style={{color:MU,fontSize:13,padding:"16px 0"}}>No objections match these filters.</div>}
                {filteredObjs.map(o=>(
                  <div key={o.id} onClick={()=>setObjActiveId(objActiveId===o.id?null:o.id)}
                    style={{background:objActiveId===o.id?A+"11":CD,border:`1px solid ${objActiveId===o.id?A+"55":BO}`,borderRadius:9,padding:"11px 13px",cursor:"pointer",transition:"all .15s"}}
                    onMouseEnter={e=>{if(objActiveId!==o.id)(e.currentTarget as HTMLDivElement).style.borderColor=A+"33";}}
                    onMouseLeave={e=>{if(objActiveId!==o.id)(e.currentTarget as HTMLDivElement).style.borderColor=BO;}}>
                    <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                      <span style={{fontSize:18,flexShrink:0}}>{o.e}</span>
                      <div style={{flex:1}}>
                        <div style={{fontSize:10,fontWeight:700,color:MU,marginBottom:3,letterSpacing:.7}}>{THEME_LABELS[o.theme]}</div>
                        <div style={{fontWeight:600,fontSize:12,color:TX,lineHeight:1.5}}>{o.title}</div>
                        <div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:5}}>
                          {o.personaIds.map(pid=>{const per=PERSONAS.find(p=>p.id===pid);return per?<span key={pid} style={{fontSize:9,color:MU}}>{per.e}</span>:null;})}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {activeCard&&(
                <div style={{background:CD,border:`1px solid ${A}33`,borderRadius:10,padding:16,position:"sticky",top:16,alignSelf:"flex-start"}}>
                  <div style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:10}}>
                    <span style={{fontSize:22}}>{activeCard.e}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:10,fontWeight:700,color:MU,letterSpacing:.7,marginBottom:2}}>{THEME_LABELS[activeCard.theme]}</div>
                      <div style={{fontWeight:700,fontSize:13,color:TX,lineHeight:1.4}}>{activeCard.title}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>
                    {activeCard.personaIds.map(pid=>{const per=PERSONAS.find(p=>p.id===pid);return per?<Chip key={pid} l={per.title||pid} c={TL}/>:null;})}
                  </div>
                  <div style={{background:ER+"11",border:`1px solid ${ER}33`,borderRadius:7,padding:"9px 12px",marginBottom:10}}>
                    <div style={{fontSize:10,fontWeight:700,color:ER,marginBottom:3,letterSpacing:.7}}>TRAP</div>
                    <div style={{fontSize:12,color:TX,lineHeight:1.65}}>{activeCard.trap}</div>
                  </div>
                  <div style={{background:SU+"11",border:`1px solid ${SU}33`,borderRadius:7,padding:"9px 12px",marginBottom:10}}>
                    <div style={{fontSize:10,fontWeight:700,color:SU,marginBottom:3,letterSpacing:.7}}>STRONG ANSWER</div>
                    <div style={{fontSize:12,color:TX,lineHeight:1.65}}>{activeCard.strongAnswer}</div>
                  </div>
                  <div style={{background:A+"11",border:`1px solid ${A}33`,borderRadius:7,padding:"9px 12px",marginBottom:12}}>
                    <div style={{fontSize:10,fontWeight:700,color:A,marginBottom:3,letterSpacing:.7}}>COACH TIPS</div>
                    <div style={{fontSize:12,color:TX,lineHeight:1.65}}>{activeCard.coachTips}</div>
                  </div>
                  <button onClick={()=>{
                    const item:Item={
                      id:activeCard.id,
                      e:activeCard.e,
                      title:activeCard.title,
                      short:activeCard.theme,
                      d:`## Objection\n${activeCard.title}\n\n## Trap\n${activeCard.trap}\n\n## Strong answer\n${activeCard.strongAnswer}\n\n## Coach tips\n${activeCard.coachTips}`,
                      sa:activeCard.strongAnswer,
                    };
                    openChat(item,"objection");
                  }} style={{width:"100%",background:`linear-gradient(135deg,${A},${TL})`,color:BG,border:"none",borderRadius:8,padding:"10px",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                    🥊 Practice with AI →
                  </button>
                </div>
              )}
            </div>
          </div>
          );
        })()}

        {/* ── tab 8: Glossary ───────────────────────────────────────────── */}
        {tab===8&&(()=>{
          const sq=glossarySearch.toLowerCase().trim();
          const searchResults=sq?GLOSSARY.flatMap(cat=>
            cat.terms.filter(t=>t.term.toLowerCase().includes(sq)||t.def.toLowerCase().includes(sq))
              .map(t=>({...t,catTitle:cat.title,catEmoji:cat.emoji,catId:cat.id}))
          ):[];
          return(
          <div>
            <Hdr title="DevOps Glossary" accent="Glossary" sub="Key concepts and terminology. Search for any term, or browse by category."/>
            <div style={{position:"relative",marginBottom:14}}>
              <input
                value={glossarySearch}
                onChange={e=>setGlossarySearch(e.target.value)}
                placeholder="Search terms… e.g. sprint, pull request, canary"
                style={{width:"100%",background:CD,border:`1px solid ${glossarySearch?A:BO}`,borderRadius:8,padding:"10px 36px 10px 14px",color:TX,fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}
              />
              {glossarySearch&&(
                <button onClick={()=>setGlossarySearch("")}
                  style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:MU,fontSize:16,cursor:"pointer",lineHeight:1,padding:0}}>×</button>
              )}
            </div>
            {sq?(
              <div style={{display:"flex",flexDirection:"column",gap:0,background:CD,border:`1px solid ${BO}`,borderRadius:10,overflow:"hidden"}}>
                {searchResults.length===0&&<div style={{padding:"20px 16px",color:MU,fontSize:13,textAlign:"center"}}>No terms match "{glossarySearch}"</div>}
                {searchResults.map((t,i)=>(
                  <div key={i} style={{padding:"12px 16px",borderBottom:i<searchResults.length-1?`1px solid ${BO}22`:"none"}}>
                    <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}>
                      <span style={{fontSize:11,color:MU}}>{t.catEmoji} {t.catTitle}</span>
                    </div>
                    <div style={{fontWeight:700,fontSize:13,color:A,marginBottom:4}}>{t.term}</div>
                    <div style={{fontSize:12,color:TX,lineHeight:1.65}}>{t.def}</div>
                    {t.seeAlso&&<div style={{fontSize:11,color:MU,marginTop:4}}>See also: {renderSeeAlso(t.seeAlso)}</div>}
                  </div>
                ))}
              </div>
            ):(
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {GLOSSARY.map(cat=>(
                <div key={cat.id} style={{background:CD,border:`1px solid ${BO}`,borderRadius:10,overflow:"hidden"}}>
                  <button onClick={()=>setGlossaryOpen(glossaryOpen===cat.id?null:cat.id)} style={{width:"100%",background:"none",border:"none",padding:"13px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",color:TX}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontSize:18}}>{cat.emoji}</span>
                      <span style={{fontWeight:700,fontSize:14}}>{cat.title}</span>
                      <span style={{fontSize:11,color:MU}}>({cat.terms.length} terms)</span>
                    </div>
                    <span style={{color:MU,fontSize:12}}>{glossaryOpen===cat.id?"▲":"▼"}</span>
                  </button>
                  {glossaryOpen===cat.id&&(
                    <div style={{borderTop:`1px solid ${BO}`,padding:"4px 0 8px"}}>
                      {cat.terms.map((t,i)=>(
                        <div key={i} style={{padding:"10px 16px",borderBottom:i<cat.terms.length-1?`1px solid ${BO}22`:"none"}}>
                          <div style={{fontWeight:700,fontSize:13,color:A,marginBottom:4}}>{t.term}</div>
                          <div style={{fontSize:12,color:TX,lineHeight:1.65}}>{t.def}</div>
                          {t.seeAlso&&<div style={{fontSize:11,color:MU,marginTop:4}}>See also: {renderSeeAlso(t.seeAlso)}</div>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            )}
          </div>
          );
        })()}

        {/* ── tab 9: Calls ──────────────────────────────────────────────── */}
        {tab===9&&(
          <div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
              <div>
                <div style={{fontSize:17,fontWeight:700,fontFamily:"Poppins,system-ui,sans-serif",marginBottom:3}}>
                  {callMsgs.length>0?"📞 Analysis":"📞 Call Analysis"}
                </div>
                <div style={{fontSize:12,color:MU}}>
                  {callMsgs.length>0?"Ask follow-up questions or start a new analysis":"AI-powered analysis — not coaching. Paste a transcript to get started."}
                </div>
              </div>
              <div style={{display:"flex",gap:7}}>
                {callMsgs.some(m=>m.role==="assistant")&&(
                  <button onClick={copyForSlack}
                    style={{background:slackCopied?SU+"22":C2,border:`1px solid ${slackCopied?SU:BO}`,borderRadius:7,padding:"6px 12px",fontSize:12,color:slackCopied?SU:MU,cursor:"pointer",fontWeight:600,transition:"all .2s"}}>
                    {slackCopied?"✓ Copied!":"📋 Copy for Slack"}
                  </button>
                )}
                {callMsgs.length>0&&(
                  <button onClick={()=>{setCallMsgs([]);setCallTranscript("");setCurrentCallId(null);setCallAccount("");setCallContact("");setCallModules([]);setCallType(defaultCallType);setEditingCallMeta(false);}}
                    style={{background:C2,border:`1px solid ${BO}`,borderRadius:7,padding:"6px 12px",fontSize:12,color:MU,cursor:"pointer",fontWeight:600}}>
                    ← New Analysis
                  </button>
                )}
                {callHistory.length>0&&(
                  <button onClick={()=>setShowCallHistory(v=>!v)}
                    style={{background:showCallHistory?A+"22":C2,border:`1px solid ${showCallHistory?A:BO}`,borderRadius:7,padding:"6px 12px",fontSize:12,color:showCallHistory?A:MU,cursor:"pointer",fontWeight:600}}>
                    📋 History ({callHistory.length})
                  </button>
                )}
              </div>
            </div>
            {callMsgs.length===0&&(
              <div>
                <Callout c={A} ch={<><strong style={{color:A}}>Expert analysis mode.</strong> Paste a transcript to get Relay module fit, sentiment, pain points, and next steps — then use the chat to dig deeper into any area.</>}/>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
                  {["🎯 Relay Fit Rating","📊 Sentiment","🔍 Pain Points","🧩 Relay Modules","✅ Next Steps"].map(l=>(
                    <Chip key={l} l={l} c={A}/>
                  ))}
                </div>
                <div style={{display:"flex",gap:4,marginBottom:10}}>
                  {(["CC","DM"] as const).map(t=>(
                    <button key={t} onClick={()=>setCallType(t)}
                      style={{background:callType===t?A+"22":C2,border:`1px solid ${callType===t?A:BO}`,borderRadius:7,padding:"8px 16px",fontSize:12,fontWeight:700,color:callType===t?A:MU,cursor:"pointer",letterSpacing:.5}}>
                      {t}
                    </button>
                  ))}
                  <button onClick={()=>{
                      if(!SAMPLE_CALL_TRANSCRIPT.trim())return;
                      setCallTranscript(SAMPLE_CALL_TRANSCRIPT);
                      setCallType("DM");
                      setCallAccount("");
                      setCallContact("");
                      setCallModules([]);
                    }}
                    style={{marginLeft:"auto",background:TL+"18",border:`1px solid ${TL}44`,borderRadius:7,padding:"8px 14px",fontSize:12,fontWeight:700,color:TL,cursor:"pointer"}}>
                    📄 Load sample transcript
                  </button>
                </div>
                <textarea
                  value={callTranscript}
                  onChange={e=>setCallTranscript(e.target.value)}
                  placeholder={"Paste your call transcript here…\n\nWorks with cold calls, discovery calls, or any sales conversation. The longer and more detailed, the better the analysis."}
                  style={{width:"100%",minHeight:240,background:CD,border:`1px solid ${callTranscript?A:BO}`,borderRadius:9,padding:"14px 15px",color:TX,fontSize:13,resize:"vertical",fontFamily:"inherit",outline:"none",lineHeight:1.65,boxSizing:"border-box",transition:"border-color .2s"}}
                />
                <button
                  onClick={analyseCall}
                  disabled={!callTranscript.trim()||callLoading}
                  style={{marginTop:10,width:"100%",background:!callTranscript.trim()||callLoading?"#1A2E48":`linear-gradient(135deg,${A},${TL})`,color:!callTranscript.trim()||callLoading?MU:"#07101E",border:"none",borderRadius:8,padding:"13px",fontWeight:700,fontSize:14,cursor:callLoading?"not-allowed":"pointer",transition:"all .2s"}}>
                  {callLoading?"🔍 Analysing…":"🔍 Analyse Call"}
                </button>
                {callHistory.length>0&&(
                  <div style={{marginTop:20}}>
                    <div style={{fontSize:11,fontWeight:700,color:MU,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Recent Calls</div>
                    <div style={{display:"flex",flexDirection:"column",gap:6}}>
                      {callHistory.slice(0,3).map(h=>(
                        <div key={h.id} onClick={()=>{setCallMsgs(h.messages);setCurrentCallId(h.id);setCallAccount(h.account||"");setCallContact(h.contact||"");setCallModules(h.modules||[]);setEditingCallMeta(false);}}
                          style={{background:CD,border:`1px solid ${BO}`,borderRadius:8,padding:"10px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,transition:"all .15s"}}
                          onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.borderColor=A+"55"}
                          onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.borderColor=BO}>
                          <div style={{flex:1}}>
                            <div style={{fontWeight:600,fontSize:12,marginBottom:2}}>{h.title}</div>
                            <div style={{fontSize:10,color:MU}}>{new Date(h.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</div>
                          </div>
                          <div style={{fontSize:11,color:A,fontWeight:600}}>View →</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {callMsgs.length>0&&(
              <div style={{display:"flex",flexDirection:"column",gap:0}}>
                {editingCallMeta?(
                  <div style={{marginBottom:12,padding:"10px 12px",background:C2,borderRadius:8,border:`1px solid ${A}44`}}>
                    <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
                      <input
                        autoFocus
                        value={callAccount}
                        onChange={e=>setCallAccount(e.target.value)}
                        onKeyDown={e=>{if(e.key==="Escape"){setCallAccount(metaSnapshot.account);setCallContact(metaSnapshot.contact);setCallType(metaSnapshot.type);setCallModules(metaSnapshot.modules);setEditingCallMeta(false);}}}
                        placeholder="Account name"
                        style={{flex:2,background:"transparent",border:"none",borderBottom:`1px solid ${A}55`,padding:"3px 2px",color:TX,fontSize:12,fontFamily:"inherit",outline:"none",minWidth:0}}
                      />
                      <input
                        value={callContact}
                        onChange={e=>setCallContact(e.target.value)}
                        onKeyDown={e=>{if(e.key==="Escape"){setCallAccount(metaSnapshot.account);setCallContact(metaSnapshot.contact);setCallType(metaSnapshot.type);setCallModules(metaSnapshot.modules);setEditingCallMeta(false);}}}
                        placeholder="Contact name"
                        style={{flex:2,background:"transparent",border:"none",borderBottom:`1px solid ${A}55`,padding:"3px 2px",color:TX,fontSize:12,fontFamily:"inherit",outline:"none",minWidth:0}}
                      />
                      <div style={{display:"flex",gap:3,flexShrink:0}}>
                        {(["CC","DM"] as const).map(t=>(
                          <button key={t} onClick={()=>setCallType(t)}
                            style={{background:callType===t?A+"22":C2,border:`1px solid ${callType===t?A:BO}`,borderRadius:5,padding:"3px 10px",fontSize:11,fontWeight:700,color:callType===t?A:MU,cursor:"pointer"}}>
                            {t}
                          </button>
                        ))}
                      </div>
                      <button onClick={()=>{saveCallTitle(callAccount,callContact,callType,callModules);setEditingCallMeta(false);}}
                        style={{background:SU+"22",border:`1px solid ${SU}44`,borderRadius:5,padding:"4px 10px",fontSize:12,fontWeight:700,color:SU,cursor:"pointer",flexShrink:0}}>✓</button>
                      <button onClick={()=>{setCallAccount(metaSnapshot.account);setCallContact(metaSnapshot.contact);setCallType(metaSnapshot.type);setCallModules(metaSnapshot.modules);setEditingCallMeta(false);}}
                        style={{background:"none",border:`1px solid ${BO}`,borderRadius:5,padding:"4px 10px",fontSize:12,color:MU,cursor:"pointer",flexShrink:0}}>✕</button>
                    </div>
                    <div style={{borderTop:`1px solid ${BO}`,paddingTop:9}}>
                      <div style={{fontSize:9,fontWeight:800,color:MU,letterSpacing:1.2,marginBottom:7}}>MODULES — SELECT UP TO 3</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                        {ALL_MOD_CHIPS.map(({label,e})=>{
                          const selected=callModules.includes(label);
                          const atMax=callModules.length>=3&&!selected;
                          return(
                            <button key={label}
                              onClick={()=>{if(atMax)return;setCallModules(prev=>selected?prev.filter(x=>x!==label):[...prev,label]);}}
                              style={{background:selected?A+"22":C2,border:`1px solid ${selected?A:BO}`,borderRadius:6,padding:"4px 9px",fontSize:11,fontWeight:selected?700:400,color:selected?A:atMax?MU+"66":MU,cursor:atMax?"default":"pointer",display:"flex",alignItems:"center",gap:5,opacity:atMax?0.4:1,transition:"all .15s"}}>
                              {e&&<span style={{fontSize:12}}>{e}</span>}
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ):(
                  <div style={{display:"flex",gap:8,marginBottom:12,padding:"9px 12px",background:C2,borderRadius:8,border:`1px solid ${BO}`,alignItems:"center"}}>
                    <span style={{flex:1,fontSize:12,color:MU,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      <span style={{color:TX,fontWeight:600}}>{callAccount||"Unknown Account"}</span>
                      {" · "}
                      <span style={{color:TX}}>{callContact||"Unknown Contact"}</span>
                      {" · "}
                      <span style={{color:A,fontWeight:700}}>{callType}</span>
                      {callModules.length>0&&<span style={{color:MU}}>{` — ${callModules.join(" · ")}`}</span>}
                    </span>
                    <button
                      onClick={()=>{setMetaSnapshot({account:callAccount,contact:callContact,type:callType,modules:callModules});setEditingCallMeta(true);}}
                      title="Edit call details"
                      style={{background:"none",border:"none",color:MU,cursor:"pointer",fontSize:13,padding:"2px 4px",flexShrink:0,lineHeight:1,opacity:.7}}>✏️</button>
                  </div>
                )}
                {(()=>{
                  const analysisMsg=callMsgs.find(m=>m.role==="assistant");
                  if(!analysisMsg)return null;
                  const {fitRating,sentiment}=parseAnalysis(analysisMsg.content);
                  const fitColor=fitRating==="Strong"?SU:fitRating==="Partial"?WA:fitRating==="Weak"?ER:MU;
                  const seColor=sentiment==="Warm"?SU:sentiment==="Neutral"?WA:sentiment==="Cold"?A:MU;
                  if(!fitRating&&!sentiment&&callModules.length===0)return null;
                  const pill=(c:string,clickable:boolean):React.CSSProperties=>({background:c+"22",border:`1px solid ${c}44`,color:c,borderRadius:99,padding:"4px 11px",fontSize:11,fontWeight:700,whiteSpace:"nowrap",cursor:clickable?"pointer":"default",display:"inline-flex",alignItems:"center",gap:5});
                  return(
                    <div style={{display:"flex",flexWrap:"wrap",gap:6,alignItems:"center",marginBottom:12}}>
                      {fitRating&&<span style={pill(fitColor,false)}>🎯 Relay Fit · {fitRating}</span>}
                      {sentiment&&<span style={pill(seColor,false)}>📊 {sentiment}</span>}
                      {callModules.map(label=>(
                        <button key={label} onClick={()=>openModuleByAbbr(label)} title={`Open ${label} module`} style={{...pill(A,true),fontWeight:600}}>🧩 {label}</button>
                      ))}
                    </div>
                  );
                })()}
                <div ref={callMsgsRef} style={{maxHeight:"calc(100vh - 280px)",overflowY:"auto",display:"flex",flexDirection:"column",gap:9,paddingBottom:14}}>
                  {callMsgs.slice(1).map((m,i)=>(
                    <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                      <div style={{maxWidth:"100%",borderRadius:m.role==="user"?"12px 12px 2px 12px":"12px 12px 12px 2px",padding:"10px 14px",fontSize:13,lineHeight:1.7,background:m.role==="user"?A:C2,color:m.role==="user"?"#07101E":TX,border:m.role==="assistant"?`1px solid ${BO}`:"none"}}>
                        {m.role==="assistant"?<Md t={m.content}/>:m.content}
                      </div>
                    </div>
                  ))}
                  {callLoading&&(
                    <div style={{display:"flex"}}>
                      <div style={{background:C2,border:`1px solid ${BO}`,borderRadius:"12px 12px 12px 2px",padding:"9px 13px",fontSize:13,color:MU}}>Analysing…</div>
                    </div>
                  )}
                </div>
                {callMsgs.length>=2&&!callLoading&&(
                  <div style={{display:"flex",flexWrap:"wrap",gap:6,paddingTop:10,marginTop:4}}>
                    {["What objections should I prep for?","What's the best angle for this account?","Draft a follow-up email","What did I miss in discovery?","Which Relay modules fit best here?"].map(q=>(
                      <button key={q} onClick={()=>sendCallMsg(q)}
                        style={{background:C2,border:`1px solid ${BO}`,borderRadius:99,padding:"5px 12px",fontSize:12,color:A,cursor:"pointer",fontWeight:600,transition:"all .15s"}}
                        onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor=A+"66";(e.currentTarget as HTMLButtonElement).style.background=A+"11";}}
                        onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor=BO;(e.currentTarget as HTMLButtonElement).style.background=C2;}}>
                        {q}
                      </button>
                    ))}
                  </div>
                )}
                {callMsgs.length>=2&&(
                  <div style={{display:"flex",gap:7,paddingTop:10,borderTop:`1px solid ${BO}`,marginTop:4}}>
                    <textarea
                      ref={callInputRef}
                      value={callInput}
                      onChange={e=>setCallInput(e.target.value)}
                      onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendCallMsg();}}}
                      placeholder="Ask a follow-up question… (Enter to send)"
                      style={{flex:1,background:C2,border:`1px solid ${BO}`,borderRadius:7,padding:"9px 11px",color:TX,fontSize:13,resize:"none",height:52,fontFamily:"inherit",outline:"none",lineHeight:1.5}}
                    />
                    <button
                      onClick={()=>sendCallMsg()}
                      disabled={callLoading||!callInput.trim()}
                      style={{background:!callInput.trim()||callLoading?"#1A2E48":A,color:!callInput.trim()||callLoading?MU:"#07101E",border:"none",borderRadius:7,padding:"0 15px",fontWeight:700,fontSize:13,cursor:callLoading?"not-allowed":"pointer",alignSelf:"stretch"}}>
                      Send
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── tab 10: Progress ──────────────────────────────────────────── */}
        {tab===10&&(
          <div>
            <Hdr title="My Learning Progress" accent="Progress" sub="Every deep dive builds context. Dot colours: grey = not started, amber = visited, green = deep dived."/>
            {(()=>{
              const now=Date.now();const STALE=14*24*60*60*1000;
              const stale=allItems.filter(item=>{const p=prog[item.id];return p?.lastVisit&&(now-p.lastVisit)>STALE;}).sort((a,b)=>(prog[a.id]?.lastVisit||0)-(prog[b.id]?.lastVisit||0)).slice(0,8);
              if(!stale.length)return null;
              return(
                <div style={{marginBottom:20,background:WA+"11",border:`1px solid ${WA}33`,borderRadius:10,padding:"16px 18px"}}>
                  <div style={{fontWeight:700,fontSize:13,color:WA,marginBottom:3}}>🔁 Time to Review</div>
                  <div style={{fontSize:12,color:MU,marginBottom:12,lineHeight:1.5}}>These topics haven't been visited in over 14 days — a quick refresh keeps the knowledge sharp.</div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {stale.map(item=>{
                      const p=prog[item.id];const title=item.title||item.n||item.co||"";
                      const daysAgo=Math.floor((now-(p?.lastVisit||0))/(24*60*60*1000));
                      return(
                        <div key={item.id} onClick={()=>setModal(item)}
                          style={{background:CD,border:`1px solid ${BO}`,borderRadius:7,padding:"9px 13px",cursor:"pointer",display:"flex",alignItems:"center",gap:11,transition:"border-color .15s"}}
                          onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.borderColor=WA+"55"}
                          onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.borderColor=BO}>
                          <span style={{fontSize:14,flexShrink:0}}>{item.e||"•"}</span>
                          <span style={{flex:1,fontWeight:600,fontSize:12}}>{title}</span>
                          <span style={{fontSize:11,color:WA,fontWeight:600,flexShrink:0}}>{daysAgo}d ago</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20}}>
              {[{l:"Topics Visited",v:`${visited}/${allItems.length}`,c:WA},{l:"Practiced",v:`${practicedCount}`,c:A},{l:"Mastered",v:`${mastered}/${allItems.length}`,c:SU},{l:"Mastery Score",v:`${Math.round((mastered/allItems.length)*100)}%`,c:TL}].map((s,i)=>(
                <div key={i} style={{background:CD,border:`1px solid ${BO}`,borderRadius:10,padding:"18px 14px",textAlign:"center"}}>
                  <div style={{fontSize:36,fontWeight:700,color:s.c,fontFamily:"Poppins,system-ui,sans-serif",lineHeight:1.1}}>{s.v}</div>
                  <div style={{fontSize:10,color:MU,marginTop:6,textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>{s.l}</div>
                </div>
              ))}
            </div>
            {[
              {label:"Solutions",items:MODS as Item[],onClick:(item:Item)=>setModal(item)},
              {label:"Architecture",items:ARCH as Item[],onClick:(item:Item)=>setModal(item)},
              {label:"Personas",items:PERSONAS as Item[],onClick:(item:Item)=>setModal(item)},
              {label:"Competitive",items:COMPS as Item[],onClick:(item:Item)=>setModal(item)},
              {label:"Discovery",items:DISC_ITEMS,onClick:()=>setTab(5)},
              {label:"Discovery Paths",items:PATH_ITEMS,onClick:(item:Item)=>{const sid=item.id.replace("path-","");setTab(5);setDiscMode("path");setPathStageId(sid);setPathStep(0);}},
              {label:"Objection Gym",items:OBJ_ITEMS,onClick:(item:Item)=>{setTab(7);setObjActiveId(item.id);}},
            ].map(({label,items,onClick})=>(
              <div key={label} style={{marginBottom:18}}>
                <div style={{fontWeight:700,fontSize:11,color:MU,marginBottom:7,textTransform:"uppercase",letterSpacing:1}}>{label}</div>
                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                  {items.map(item=>{
                    const p=prog[item.id];const title=item.title||item.n||item.co||"";const t=tierOf(p);
                    const tColor=t==="mastered"?SU:t==="practiced"?A:t==="viewed"?WA:BO;
                    const isDisc=item.id.startsWith("disc-")||item.id.startsWith("path-");
                    return(
                      <div key={item.id} onClick={()=>onClick(item)} style={{background:CD,border:`1px solid ${t==="none"?BO:tColor+"33"}`,borderRadius:7,padding:"9px 13px",cursor:"pointer",display:"flex",alignItems:"center",gap:11,transition:"all .15s"}}
                        onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.background=C2}
                        onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.background=CD}>
                        <div style={{fontSize:15}}>{item.e||"•"}</div>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:600,fontSize:12}}>{title}</div>
                          {p?.lastVisit&&<div style={{fontSize:10,color:MU}}>Last visited {new Date(p.lastVisit).toLocaleDateString()}</div>}
                        </div>
                        <div style={{display:"flex",gap:5,alignItems:"center"}}>
                          {t==="mastered"?<Chip l="Mastered" c={SU}/>:t==="practiced"?<Chip l={`Practiced · ${p?.msgCount||0}`} c={A}/>:t==="viewed"?<Chip l={isDisc?"Reviewed":"Viewed"} c={WA}/>:<Chip l="Not started" c={MU}/>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── tab 11: Settings ──────────────────────────────────────────── */}
        {tab===11&&(
          <div>
            <Hdr title="Settings" accent="Settings" sub="Global preferences and data management for your GTM Enablement Hub session."/>

            {/* ── Your Profile ── */}
            <div style={{background:CD,border:`1px solid ${BO}`,borderRadius:10,padding:"20px 22px",marginBottom:14}}>
              <div style={{fontWeight:700,fontSize:13,color:TX,marginBottom:4}}>Your Profile</div>
              <div style={{fontSize:12,color:MU,marginBottom:16,lineHeight:1.6}}>Used to personalise AI coaching sessions. When set, the coach will address you by name and tailor feedback to your role.</div>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <div style={{flex:1,minWidth:180}}>
                  <div style={{fontSize:11,color:MU,marginBottom:5,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>Your Name</div>
                  <input
                    value={userName}
                    onChange={e=>saveUserName(e.target.value)}
                    placeholder="e.g. Alex"
                    style={{width:"100%",background:C2,border:`1px solid ${BO}`,borderRadius:7,padding:"8px 11px",color:TX,fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}
                  />
                </div>
                <div style={{flex:1,minWidth:180}}>
                  <div style={{fontSize:11,color:MU,marginBottom:5,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>Your Role</div>
                  <div style={{display:"flex",gap:7}}>
                    {(["SDR","AE","SE",""] as const).map(r=>(
                      <button key={r||"none"} onClick={()=>saveUserRole(r)}
                        style={{flex:1,background:userRole===r?A+"22":C2,border:`1px solid ${userRole===r?A+"55":BO}`,color:userRole===r?A:MU,borderRadius:7,padding:"8px 4px",fontSize:12,fontWeight:userRole===r?700:400,cursor:"pointer"}}>
                        {r||"—"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Call Analysis Defaults ── */}
            <div style={{background:CD,border:`1px solid ${BO}`,borderRadius:10,padding:"20px 22px",marginBottom:14}}>
              <div style={{fontWeight:700,fontSize:13,color:TX,marginBottom:4}}>Call Analysis Defaults</div>
              <div style={{fontSize:12,color:MU,marginBottom:16,lineHeight:1.6}}>Sets the default call type when you start a new analysis. You can always change this manually for individual calls.</div>
              <div style={{display:"flex",gap:10}}>
                {(["CC","DM"] as const).map(ct=>(
                  <button key={ct} onClick={()=>saveDefaultCallType(ct)}
                    style={{flex:1,background:defaultCallType===ct?A+"22":C2,border:`1px solid ${defaultCallType===ct?A+"55":BO}`,borderRadius:8,padding:"14px 12px",cursor:"pointer",textAlign:"left",transition:"all .15s"}}>
                    <div style={{fontWeight:700,fontSize:13,color:defaultCallType===ct?A:TX,marginBottom:4}}>{ct==="CC"?"CC — Cold Call":"DM — Discovery Meeting"}</div>
                    <div style={{fontSize:11,color:MU,lineHeight:1.5}}>{ct==="CC"?"Typically the default for SDRs doing outbound prospecting.":"Typically the default for AEs running structured discovery."}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Coaching Style ── */}
            <div style={{background:CD,border:`1px solid ${BO}`,borderRadius:10,padding:"20px 22px",marginBottom:14}}>
              <div style={{fontWeight:700,fontSize:13,color:TX,marginBottom:4}}>Coaching Style</div>
              <div style={{fontSize:12,color:MU,marginBottom:16,lineHeight:1.6}}>Controls how the AI coach responds during deep-dive sessions across all topics.</div>
              <div style={{display:"flex",gap:10}}>
                {(["socratic","direct"] as const).map(s=>(
                  <button key={s} onClick={()=>saveCoachStyle(s)}
                    style={{flex:1,background:coachStyle===s?A+"22":C2,border:`1px solid ${coachStyle===s?A+"55":BO}`,borderRadius:8,padding:"14px 12px",cursor:"pointer",textAlign:"left",transition:"all .15s"}}>
                    <div style={{fontWeight:700,fontSize:13,color:coachStyle===s?A:TX,marginBottom:4}}>{s==="socratic"?"Socratic (default)":"Direct"}</div>
                    <div style={{fontSize:11,color:MU,lineHeight:1.5}}>{s==="socratic"?"Builds on your thinking, asks follow-up questions, challenges gaps. Best for building deep understanding.":"Short, direct feedback and answers. Best for quick reference or reps who already know the material."}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Display ── */}
            <div style={{background:CD,border:`1px solid ${BO}`,borderRadius:10,padding:"20px 22px",marginBottom:14}}>
              <div style={{fontWeight:700,fontSize:13,color:TX,marginBottom:4}}>Display</div>
              <div style={{fontSize:12,color:MU,marginBottom:16,lineHeight:1.6}}>Layout density and text size for the content area. Changes take effect immediately.</div>
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                <div>
                  <div style={{fontSize:11,color:MU,marginBottom:8,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>Layout Density</div>
                  <div style={{display:"flex",gap:10}}>
                    {(["comfortable","compact"] as const).map(d=>(
                      <button key={d} onClick={()=>saveUiDensity(d)}
                        style={{flex:1,background:uiDensity===d?A+"22":C2,border:`1px solid ${uiDensity===d?A+"55":BO}`,color:uiDensity===d?A:MU,borderRadius:7,padding:"9px 12px",fontSize:12,fontWeight:uiDensity===d?700:400,cursor:"pointer",textTransform:"capitalize"}}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <div style={{fontSize:11,color:MU,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>Text Size</div>
                    <div style={{fontSize:11,color:A,fontWeight:700}}>{fontSize}px</div>
                  </div>
                  <input type="range" min={12} max={16} step={1} value={fontSize}
                    onChange={e=>saveFontSize(Number(e.target.value))}
                    style={{width:"100%",accentColor:A,cursor:"pointer"}}
                  />
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:MU,marginTop:4}}>
                    <span>Small (12)</span><span>Default (14)</span><span>Large (16)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Glossary Auto-Linking ── */}
            <div style={{background:CD,border:`1px solid ${BO}`,borderRadius:10,padding:"20px 22px",marginBottom:14}}>
              <div style={{fontWeight:700,fontSize:13,color:TX,marginBottom:4}}>Glossary Auto-Linking</div>
              <div style={{fontSize:12,color:MU,marginBottom:14,lineHeight:1.6}}>When enabled, recognised terms across the platform are underlined and clickable — tap any highlighted word to see its definition. Disable for a cleaner reading experience.</div>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <button onClick={()=>toggleGloss(!glossEnabled)}
                  style={{position:"relative",width:44,height:24,borderRadius:12,border:"none",background:glossEnabled?A:BO,cursor:"pointer",transition:"background .2s",flexShrink:0}}>
                  <div style={{position:"absolute",top:3,left:glossEnabled?22:3,width:18,height:18,borderRadius:9,background:"#fff",transition:"left .2s"}}/>
                </button>
                <span style={{fontSize:13,color:glossEnabled?A:MU,fontWeight:600}}>{glossEnabled?"On — terms are highlighted and clickable":"Off — plain text throughout"}</span>
              </div>
            </div>

            {/* ── Data Management ── */}
            <div style={{background:CD,border:`1px solid ${BO}`,borderRadius:10,padding:"20px 22px",marginBottom:14}}>
              <div style={{fontWeight:700,fontSize:13,color:TX,marginBottom:4}}>Data Management</div>
              <div style={{fontSize:12,color:MU,marginBottom:16,lineHeight:1.6}}>Reset your learning data or clear your call analysis history. Both actions are permanent and cannot be undone.</div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <div style={{background:C2,border:`1px solid ${BO}`,borderRadius:8,padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
                  <div>
                    <div style={{fontWeight:600,fontSize:13,color:TX,marginBottom:2}}>Reset Learning Progress</div>
                    <div style={{fontSize:11,color:MU}}>Clears visited status, deep-dive history, and message counts for all topics. Call analyses are not affected.</div>
                  </div>
                  <button onClick={confirmResetProgress}
                    style={{background:ER+"22",border:`1px solid ${ER}55`,color:ER,borderRadius:7,padding:"8px 16px",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
                    Reset Progress
                  </button>
                </div>
                <div style={{background:C2,border:`1px solid ${BO}`,borderRadius:8,padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
                  <div>
                    <div style={{fontWeight:600,fontSize:13,color:TX,marginBottom:2}}>Clear Call History</div>
                    <div style={{fontSize:11,color:MU}}>Permanently deletes all saved call analyses, including transcripts and follow-up conversations. Learning progress is not affected.</div>
                  </div>
                  <button onClick={confirmClearHistory}
                    style={{background:ER+"22",border:`1px solid ${ER}55`,color:ER,borderRadius:7,padding:"8px 16px",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
                    Clear History
                  </button>
                </div>
              </div>
            </div>

            {/* ── About this hub ── */}
            <div style={{background:CD,border:`1px solid ${BO}`,borderRadius:10,padding:"20px 22px",marginBottom:14,opacity:0.95}}>
              <div style={{fontWeight:700,fontSize:13,color:MU,marginBottom:4}}>About this hub</div>
              <div style={{fontSize:12,color:MU,marginBottom:16,lineHeight:1.6}}>Research standards and how this enablement hub is meant to be used — impressum-style reference.</div>
              <Accordion sections={[
                {title:"1. Relay is the product under study",content:`GTM Enablement Hub is the enablement system for Relay — a fictional full-SDLC delivery platform. Framed for Relay GTM: modules, personas, competitive landscape, discovery, and call practice.`},
                {title:"2. Teaching content, labelled clearly",content:`Personas, competitive cards, and discovery prompts are teaching material. Hypotheses and illustrative scenarios are labelled — validate in real discovery; do not present hub content as customer intel.`},
                {title:"3. Competitive and discovery standards",content:`Competitive cards follow NAMING.md framing. Discovery is constraint-first: find where work waits, then map Relay modules.`},
                {title:"4. AI-powered coaching and analysis",content:`Coaching chat and call analysis use Claude via server-side proxy. Review AI outputs before use.`},
                {title:"5. How the hub is built",content:`React + TypeScript (Vite), serverless API proxy, optional RAG via Turso/Voyage. See README.md.`},
              ]}/>
            </div>
          </div>
        )}
      </div>

      {/* ── Confirm modal ─────────────────────────────────────────────────── */}
      {confirmModal&&(
        <div style={{position:"fixed",inset:0,background:"#00000099",zIndex:60,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 16px"}} onClick={()=>setConfirmModal(null)}>
          <div onClick={e=>e.stopPropagation()}
            style={{width:"min(420px,100%)",background:CD,border:`1px solid ${ER}55`,borderRadius:12,padding:"24px 22px",boxShadow:"0 12px 40px #00000066"}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:12}}>
              <div style={{fontSize:22,flexShrink:0,marginTop:1}}>⚠️</div>
              <div>
                <div style={{fontWeight:700,fontSize:15,color:TX,marginBottom:6}}>{confirmModal.title}</div>
                <div style={{fontSize:13,color:MU,lineHeight:1.65}}>{confirmModal.body}</div>
              </div>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:18}}>
              <button onClick={()=>setConfirmModal(null)}
                style={{background:"none",border:`1px solid ${BO}`,color:TX,borderRadius:7,padding:"9px 18px",fontSize:13,fontWeight:600,cursor:"pointer"}}>
                Cancel
              </button>
              <button onClick={confirmModal.onConfirm}
                style={{background:ER,border:"none",color:"#fff",borderRadius:7,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer"}}>
                Yes, delete permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Global search overlay ──────────────────────────────────────────── */}
      {showSearch&&(
        <div style={{position:"fixed",inset:0,background:"#00000099",zIndex:70,display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:64}} onClick={()=>setShowSearch(false)}>
          <div onClick={e=>e.stopPropagation()}
            style={{width:"min(620px,92vw)",background:CD,border:`1px solid ${BO}`,borderRadius:12,boxShadow:"0 20px 60px #000000bb",overflow:"hidden",maxHeight:"calc(100vh - 100px)",display:"flex",flexDirection:"column"}}>
            <div style={{padding:"12px 16px",borderBottom:`1px solid ${BO}`,display:"flex",gap:10,alignItems:"center",flexShrink:0}}>
              <span style={{fontSize:16,flexShrink:0}}>🔍</span>
              <input autoFocus value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
                onKeyDown={e=>{if(e.key==="Escape")setShowSearch(false);}}
                placeholder="Search solutions, battlecards, personas, discovery, glossary…"
                style={{flex:1,background:"none",border:"none",outline:"none",color:TX,fontSize:14,fontFamily:"inherit"}}/>
              <kbd style={{fontSize:10,color:MU,background:C2,border:`1px solid ${BO}`,borderRadius:4,padding:"2px 6px",flexShrink:0}}>ESC</kbd>
            </div>
            <div style={{overflowY:"auto",flex:1}}>
              {searchQuery.trim().length<2?(
                <div style={{padding:"36px 16px",textAlign:"center",color:MU,fontSize:13}}>Type at least 2 characters to search across all content</div>
              ):(()=>{
                const results=runSearch(searchQuery);
                const groups=Object.entries(results);
                if(!groups.length)return <div style={{padding:"36px 16px",textAlign:"center",color:MU,fontSize:13}}>No results for "{searchQuery}"</div>;
                return groups.map(([group,items])=>(
                  <div key={group}>
                    <div style={{padding:"10px 16px 4px",fontSize:10,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:1}}>{group}</div>
                    {items.map((r,i)=>(
                      <div key={i} onClick={r.onSelect}
                        style={{padding:"10px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,borderTop:`1px solid ${BO}22`,transition:"background .1s"}}
                        onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.background=C2}
                        onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.background="transparent"}>
                        <span style={{fontSize:20,flexShrink:0,width:28,textAlign:"center"}}>{r.emoji}</span>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontWeight:600,fontSize:13,color:TX,marginBottom:2}}>{r.label}</div>
                          <div style={{fontSize:11,color:MU,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.sub}</div>
                        </div>
                        <span style={{fontSize:11,color:A,flexShrink:0}}>→</span>
                      </div>
                    ))}
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ── Bookmarks panel ───────────────────────────────────────────────── */}
      {showBookmarks&&(
        <div style={{position:"fixed",inset:0,background:"#00000088",zIndex:30,display:"flex",justifyContent:"flex-end"}} onClick={()=>setShowBookmarks(false)}>
          <div onClick={e=>e.stopPropagation()} style={{width:"min(380px,100vw)",background:CD,borderLeft:`1px solid ${BO}`,display:"flex",flexDirection:"column",height:"100%",padding:"18px 16px",overflowY:"auto"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexShrink:0}}>
              <div style={{fontWeight:700,fontSize:14}}>⭐ Saved Items</div>
              <button onClick={()=>setShowBookmarks(false)} style={{background:"none",border:"none",color:MU,fontSize:22,cursor:"pointer",lineHeight:1}}>×</button>
            </div>
            {bookmarks.size===0?(
              <div style={{color:MU,fontSize:13,lineHeight:1.65}}>No saved items yet. Hover any card and click the ☆ star to save it here for quick access.</div>
            ):(()=>{
              const bItems=allItems.filter(i=>bookmarks.has(i.id));
              const groups=[
                {label:"Solutions",items:bItems.filter(i=>MODS.some(m=>m.id===i.id||m.subModules?.some(s=>s.id===i.id)))},
                {label:"Architecture",items:bItems.filter(i=>ARCH.some(m=>m.id===i.id))},
                {label:"Personas",items:bItems.filter(i=>PERSONAS.some(m=>m.id===i.id))},
                {label:"Competitive",items:bItems.filter(i=>COMPS.some(m=>m.id===i.id))},
              ].filter(g=>g.items.length>0);
              return groups.map(({label,items})=>(
                <div key={label} style={{marginBottom:16}}>
                  <div style={{fontSize:10,fontWeight:700,color:MU,marginBottom:7,textTransform:"uppercase",letterSpacing:1}}>{label}</div>
                  <div style={{display:"flex",flexDirection:"column",gap:5}}>
                    {items.map(item=>{
                      const title=item.title||item.n||item.co||"";
                      return(
                        <div key={item.id}
                          style={{display:"flex",alignItems:"center",gap:10,background:C2,border:`1px solid ${BO}`,borderRadius:7,padding:"9px 12px",cursor:"pointer",transition:"border-color .15s"}}
                          onClick={()=>{setShowBookmarks(false);setModal(item);save({...prog,[item.id]:{...(prog[item.id]||{}),visited:true,lastVisit:Date.now()}});}}
                          onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.borderColor=A+"55"}
                          onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.borderColor=BO}>
                          <span style={{fontSize:14,flexShrink:0}}>{item.e||"•"}</span>
                          <span style={{flex:1,fontWeight:600,fontSize:12,color:TX}}>{title}</span>
                          <button onClick={e=>{e.stopPropagation();toggleBookmark(item.id);}} title="Remove"
                            style={{background:"none",border:"none",cursor:"pointer",fontSize:14,color:WA,flexShrink:0,padding:"2px 4px",lineHeight:1}}>⭐</button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      )}

      {/* ── Glossary term popover ─────────────────────────────────────────── */}
      {gPopover&&(
        <div style={{position:"fixed",inset:0,zIndex:50}} onClick={()=>setGPopover(null)}>
          <div onClick={e=>e.stopPropagation()}
            style={{position:"fixed",left:Math.min(gPopover.x,window.innerWidth-320),top:Math.min(gPopover.y,window.innerHeight-240),width:300,background:CD,border:`1px solid ${A}44`,borderRadius:10,boxShadow:"0 8px 32px #00000055",padding:14,zIndex:51}}>
            <button onClick={()=>setGPopover(null)} style={{position:"absolute",top:8,right:10,background:"none",border:"none",color:MU,fontSize:18,cursor:"pointer",lineHeight:1,padding:0}}>×</button>
            <div style={{fontWeight:700,fontSize:13,color:A,marginBottom:6,paddingRight:20}}>{gPopover.label}</div>
            <div style={{fontSize:12,color:TX,lineHeight:1.65}}>{gPopover.def}</div>
            {gPopover.seeAlso&&(
              <div style={{fontSize:11,color:MU,marginTop:10,paddingTop:10,borderTop:`1px solid ${BO}`}}>
                <span>See also: </span>{renderSeeAlso(gPopover.seeAlso)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Call History panel ────────────────────────────────────────────── */}
      {showCallHistory&&(
        <div style={{position:"fixed",inset:0,background:"#00000088",zIndex:30,display:"flex",justifyContent:"flex-end"}} onClick={()=>setShowCallHistory(false)}>
          <div onClick={e=>e.stopPropagation()} style={{width:"min(420px,100vw)",background:CD,borderLeft:`1px solid ${BO}`,display:"flex",flexDirection:"column",height:"100%",padding:"18px 16px",overflowY:"auto"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexShrink:0}}>
              <div style={{fontWeight:700,fontSize:14}}>📋 Call History</div>
              <button onClick={()=>setShowCallHistory(false)} style={{background:"none",border:"none",color:MU,fontSize:22,cursor:"pointer",lineHeight:1}}>×</button>
            </div>
            {callHistory.length===0&&<div style={{color:MU,fontSize:13}}>No saved calls yet.</div>}
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {callHistory.map(h=>(
                <div key={h.id} onClick={()=>{setCallMsgs(h.messages);setCurrentCallId(h.id);setCallAccount(h.account||"");setCallContact(h.contact||"");setCallModules(h.modules||[]);setTab(9);setShowCallHistory(false);setEditingCallMeta(false);}}
                  style={{background:currentCallId===h.id?A+"11":C2,border:`1px solid ${currentCallId===h.id?A+"44":BO}`,borderRadius:8,padding:"11px 13px",cursor:"pointer",transition:"all .15s"}}
                  onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.borderColor=A+"55"}
                  onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.borderColor=currentCallId===h.id?A+"44":BO}>
                  <div style={{fontWeight:600,fontSize:13,marginBottom:3}}>{h.title}</div>
                  <div style={{fontSize:10,color:MU,marginBottom:6}}>{new Date(h.createdAt).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</div>
                  <div style={{fontSize:11,color:A,fontWeight:600}}>Load →</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Modal ─────────────────────────────────────────────────────────── */}
      {modal&&!chat&&<Modal item={modal} prog={prog} onClose={()=>setModal(null)} onChat={openChat} mode={(RELAY_AI_IDS.has(modal.id)?"concept":modal.role?"persona":modal.str?"competitive":"module") as ChatMode} onOpenItem={(item:Item)=>{save({...prog,[item.id]:{...(prog[item.id]||{}),visited:true,lastVisit:Date.now()}});setModal(item);}}/>}

      {/* ── Chat panel ────────────────────────────────────────────────────── */}
      {chat&&(
        <div style={{position:"fixed",inset:0,background:"#00000088",zIndex:30,display:"flex",justifyContent:"flex-end"}}>
          <div style={{width:"min(510px,100vw)",background:CD,borderLeft:`1px solid ${BO}`,display:"flex",flexDirection:"column",height:"100%"}}>
            <div style={{padding:"13px 16px",borderBottom:`1px solid ${BO}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
              <div>
                <div style={{fontWeight:700,fontSize:13}}>🧠 {chat.topic.title}</div>
                <div style={{fontSize:11,color:MU,marginTop:1}}>{chat.topic.mode==="concept"?"Understand it · explore it · explain it":chat.topic.mode==="objection"?"Answer it · get scored · sharpen the response":"Explain it · get challenged · master it"}</div>
              </div>
              <button onClick={()=>setChat(null)} style={{background:"none",border:"none",color:MU,fontSize:22,cursor:"pointer",lineHeight:1}}>×</button>
            </div>
            <div ref={msgsRef} style={{flex:1,overflowY:"auto",padding:"14px 16px",display:"flex",flexDirection:"column",gap:9}}>
              {chat.messages.map((m,i)=>(
                <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                  <div style={{maxWidth:"88%",borderRadius:m.role==="user"?"12px 12px 2px 12px":"12px 12px 12px 2px",padding:"9px 13px",fontSize:13,lineHeight:1.7,background:m.role==="user"?A:C2,color:m.role==="user"?"#07101E":TX,border:m.role==="assistant"?`1px solid ${BO}`:"none"}}>
                    {m.role==="assistant"?<Md t={m.content}/>:m.content}
                  </div>
                </div>
              ))}
              {loading&&<div style={{display:"flex"}}><div style={{background:C2,border:`1px solid ${BO}`,borderRadius:"12px 12px 12px 2px",padding:"9px 13px",fontSize:13,color:MU}}>Thinking…</div></div>}
              {(()=>{
                if(!prog[chat.topic.id]?.masteryReady)return null;
                const saved=prog[chat.topic.id]?.reflection;
                const showEditor=!saved||editingReflection;
                const saveReflection=()=>{if(!reflectionDraft.trim())return;save({...prog,[chat.topic.id]:{...(prog[chat.topic.id]||{}),reflection:reflectionDraft.trim()}});setEditingReflection(false);};
                return(
                  <div style={{borderRadius:10,padding:"12px 14px",marginTop:6,background:(saved&&!editingReflection?SU:WA)+"18",border:`1px solid ${(saved&&!editingReflection?SU:WA)}44`}}>
                    {showEditor?(
                      <>
                        <div style={{fontSize:11,fontWeight:700,color:saved?SU:WA,marginBottom:7}}>🎯 Lock it in — in one sentence, how would you pitch or explain this?</div>
                        <div style={{display:"flex",gap:7}}>
                          <input autoFocus value={reflectionDraft} onChange={e=>setReflectionDraft(e.target.value)}
                            onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();saveReflection();}}}
                            placeholder="Your one-line takeaway…"
                            style={{flex:1,background:C2,border:`1px solid ${BO}`,borderRadius:7,padding:"8px 11px",color:TX,fontSize:12,fontFamily:"inherit",outline:"none"}}/>
                          <button onClick={saveReflection} disabled={!reflectionDraft.trim()}
                            style={{background:reflectionDraft.trim()?SU:"#1A2E48",color:reflectionDraft.trim()?"#07101E":MU,border:"none",borderRadius:7,padding:"0 15px",fontWeight:700,fontSize:12,cursor:reflectionDraft.trim()?"pointer":"not-allowed"}}>Save</button>
                        </div>
                      </>
                    ):(
                      <div style={{display:"flex",alignItems:"center",gap:9}}>
                        <span style={{fontSize:11,fontWeight:700,color:SU,flexShrink:0}}>✓ Mastered</span>
                        <span style={{flex:1,fontSize:12,color:TX,fontStyle:"italic",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>"{saved}"</span>
                        <button onClick={()=>{setReflectionDraft(saved||"");setEditingReflection(true);}}
                          style={{background:"none",border:`1px solid ${BO}`,borderRadius:6,padding:"3px 10px",fontSize:11,color:MU,cursor:"pointer",flexShrink:0}}>Edit</button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
            <div style={{padding:"10px 13px",borderTop:`1px solid ${BO}`,display:"flex",gap:7,flexShrink:0}}>
              <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Share your understanding… (Enter to send)" style={{flex:1,background:C2,border:`1px solid ${BO}`,borderRadius:7,padding:"9px 11px",color:TX,fontSize:13,resize:"none",height:52,fontFamily:"inherit",outline:"none",lineHeight:1.5}}/>
              <button onClick={send} disabled={loading||!input.trim()} style={{background:!input.trim()||loading?"#1A2E48":A,color:!input.trim()||loading?MU:"#07101E",border:"none",borderRadius:7,padding:"0 15px",fontWeight:700,fontSize:13,cursor:loading?"not-allowed":"pointer",alignSelf:"stretch"}}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
