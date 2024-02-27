(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function d(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(a){if(a.ep)return;a.ep=!0;const o=d(a);fetch(a.href,o)}})();const n={base_url:"http://localhost:3000",hideModals:()=>{document.querySelectorAll(".modal").forEach(t=>t.classList.remove("is-active"))},showEditListForm:t=>{console.log(t.target),t.target.classList.add("is-hidden"),t.target.nextElementSibling.classList.remove("is-hidden")},hideEditListForm:()=>{document.querySelectorAll(".edit-list-form").forEach(t=>t.classList.add("is-hidden")),document.querySelectorAll("h2").forEach(t=>t.classList.remove("is-hidden"))},showEditCardForm:t=>{const e=t.target.closest(".box");e.querySelector(".edit-card-form").classList.remove("is-hidden"),e.querySelector(".column").classList.add("is-hidden")},hideEditCardForm:()=>{document.querySelectorAll(".edit-card-form").forEach(t=>t.classList.add("is-hidden")),document.querySelectorAll(".box .card-title").forEach(t=>t.classList.remove("is-hidden"))},getLastCardPosition:t=>document.querySelector(`[data-list-id = '${t}'] .panel-block`).lastElementChild?parseInt(document.querySelector(`[data-list-id = '${t}'] .panel-block`).lastElementChild.getAttribute("data-card-position")):0,getAllNextCards:(t,e,d,r)=>{const a=[];if(document.querySelectorAll(`[data-list-id = '${t}'] .box`).forEach(o=>a.push(o)),d=="previous"){console.log(a),console.log("Ici on passe dans la branche 'previous' du getAllcards");const o=a.filter(s=>s.getAttribute("data-card-position")>r&&s.getAttribute("data-card-id")!=e.id);return console.log(o),o}else return console.log("Ici on passe dans la branche 'next' du getAllcards"),a.filter(s=>s.getAttribute("data-card-position")>=e.position&&s.getAttribute("data-card-id")!=e.id)}},c={dragStartHandler:async t=>{document.querySelectorAll(".box").forEach(r=>r.removeEventListener("dragstart",i.dragstartHandler)),document.querySelectorAll(".panel").forEach(r=>{r.addEventListener("dragenter",c.dragEnterHandler),r.addEventListener("dragover",c.dragOverHandler),r.addEventListener("dragleave",c.dragLeaveHandler),r.addEventListener("dragend",c.dragEndHandler),r.addEventListener("drop",c.dropHandler)});const e={id:parseInt(t.target.getAttribute("data-list-id")),position:parseInt(t.target.getAttribute("data-list-position"))},d=JSON.stringify(e);t.dataTransfer.setData("listData",d)},dragEnterHandler:t=>{t.preventDefault(),t.target.closest(".panel").style["border-right"]="5px solid black"},dragOverHandler:t=>{t.preventDefault(),t.target.closest(".panel").style["border-right"]="5px solid black"},dragLeaveHandler:t=>{t.preventDefault(),t.target.closest(".panel").style["border-right"]=""},dragEndHandler:t=>{t.target.closest(".panel").style["border-right"]="",document.querySelectorAll(".box").forEach(e=>e.addEventListener("dragstart",i.dragstartHandler)),document.querySelectorAll(".panel").forEach(e=>{e.removeEventListener("dragenter",c.dragEnterHandler),e.removeEventListener("dragover",c.dragOverHandler),e.removeEventListener("dragleave",c.dragLeaveHandler),e.removeEventListener("dragend",c.dragEndHandler),e.removeEventListener("drop",c.dropHandler)})},dropHandler:async t=>{t.target.closest(".panel").style["border-right"]="",document.querySelectorAll(".box").forEach(r=>r.addEventListener("dragstart",i.dragstartHandler)),document.querySelectorAll(".panel").forEach(r=>{r.removeEventListener("dragenter",c.dragEnterHandler),r.removeEventListener("dragover",c.dragOverHandler),r.removeEventListener("dragleave",c.dragLeaveHandler),r.removeEventListener("dragend",c.dragEndHandler),r.removeEventListener("drop",c.dropHandler)});const e=JSON.parse(t.dataTransfer.getData("listData")),d=document.querySelector(`[data-list-id = "${e.id}"]`);t.target.closest(".panel")&&t.target.closest(".card-lists").insertBefore(d,t.target.closest(".panel").nextSibling);try{document.querySelectorAll(".panel").forEach(async(a,o)=>{a.setAttribute("data-list-position",o+1);const s={};s.position=o+1;const l=JSON.stringify(s),g=await fetch(n.base_url+"/lists/"+a.getAttribute("data-list-id"),{headers:{"Content-Type":"application/json"},method:"PATCH",body:l})})}catch(r){console.error(r)}}},i={dragstartHandler:async t=>{t.stopPropagatioLists,document.querySelectorAll(".panel").forEach(r=>{r.removeEventListener("dragstart",c.dragStartHandler),document.querySelector(".card-lists").addEventListener("dragend",i.dragEndHadler),document.querySelectorAll(".panel-block").forEach(a=>{a.addEventListener("dragenter",i.dragEnterHandler),a.addEventListener("dragover",i.dragOverHandler),a.addEventListener("dragleave",i.dragLeaveHandler),a.addEventListener("drop",i.dropHandler)})});const e={id:parseInt(t.target.getAttribute("data-card-id")),position:parseInt(t.target.getAttribute("data-card-position")),list_id:parseInt(t.target.getAttribute("data-card-list_id"))},d=JSON.stringify(e);t.dataTransfer.setData("cardData",d)},dragEnterHandler:async t=>{t.stopPropagation(),t.preventDefault(),t.target.closest(".panel").style.background="blueviolet",t.target.closest(".box")?t.target.closest(".box").style["border-bottom"]="5px solid black":t.target.previousElementSibling.style["border-bottom"]="5px solid black"},dragOverHandler:async t=>{t.stopPropagation(),t.preventDefault(),t.target.closest(".panel").style.background="blueviolet",t.target.closest(".box")?t.target.closest(".box").style["border-bottom"]="5px solid black":t.target.previousElementSibling.style["border-bottom"]="5px solid black"},dragLeaveHandler:async t=>{t.stopPropagation(),t.preventDefault(),t.target.closest(".panel").style.background="",t.target.closest(".box")?t.target.closest(".box").style["border-bottom"]="":t.target.previousElementSibling.style["border-bottom"]=""},dragEndHadler:async t=>{t.stopPropagation(),t.preventDefault(),t.target.closest(".panel").style.background="",t.target.closest(".box")?t.target.closest(".box").style["border-bottom"]="":t.target.previousElementSibling.style["border-bottom"]="",document.querySelectorAll(".panel").forEach(e=>{e.addEventListener("dragstart",c.dragStartHandler)}),document.querySelector(".card-lists").removeEventListener("dragend",i.dragEndHadler),document.querySelectorAll(".panel-block").forEach(e=>{e.removeEventListener("dragenter",i.dragEnterHandler),e.removeEventListener("dragover",i.dragOverHandler),e.removeEventListener("dragleave",i.dragLeaveHandler),e.removeEventListener("drop",i.dropHandler)})},dropHandler:async t=>{t.stopPropagation(),document.querySelectorAll(".panel").forEach(e=>{e.addEventListener("dragstart",c.dragStartHandler)}),document.querySelector(".card-lists").removeEventListener("dragend",i.dragEndHadler),document.querySelectorAll(".panel-block").forEach(e=>{e.removeEventListener("dragenter",i.dragEnterHandler),e.removeEventListener("dragover",i.dragOverHandler),e.removeEventListener("dragleave",i.dragLeaveHandler),e.removeEventListener("drop",i.dropHandler)});try{t.target.closest(".panel").style.background="",t.target.closest(".box")?t.target.closest(".box").style["border-bottom"]="":t.target.previousElementSibling.style["border-bottom"]="";const e=JSON.parse(t.dataTransfer.getData("cardData")),d=e.list_id,r=t.target.closest(".panel").getAttribute("data-list-id");e.list_id=parseInt(r);const a=document.querySelector(`[data-card-id = "${e.id}"]`);a.setAttribute("data-card-list_id",e.list_id),t.target.closest(".box")?t.target.closest(".panel-block").insertBefore(a,t.target.closest(".box").nextSibling):t.target.closest(".panel-block").prepend(a),document.querySelectorAll(`[data-list-id = '${e.list_id}'] .box`).forEach(async(o,s)=>{o.setAttribute("data-card-position",s+1);const l={};l.position=s+1,l.list_id=e.list_id;const g=JSON.stringify(l),b=await fetch(n.base_url+"/cards/"+o.getAttribute("data-card-id"),{headers:{"Content-Type":"application/json"},method:"PATCH",body:g})}),document.querySelectorAll(`[data-list-id = '${d}'] .box`).forEach(async(o,s)=>{o.setAttribute("data-card-position",s+1);const l={};l.position=s+1,l.list_id=d;const g=JSON.stringify(l),b=await fetch(n.base_url+"/cards/"+o.getAttribute("data-card-id"),{headers:{"Content-Type":"application/json"},method:"PATCH",body:g})})}catch(e){console.error(e)}}},m={makeTagInDOM:t=>{console.log(t);const e=document.createElement("span");e.classList.add("tag"),e.dataset.tagId=t.id,e.textContent=t.name,e.style.backgroundColor=t.color,e.addEventListener("dblclick",m.removeTagToCard),document.querySelector(`.box[data-card-id = "${t.card_tag.card_id}"]`).querySelector(".tags").appendChild(e)},showAssociateTagForm:async t=>{const d=t.target.closest(".box").getAttribute("data-card-id"),r=document.getElementById("addTagToCardModal");r.querySelector('input[name = "card_id"]').value=d;const a=r.querySelector('select[name="tag_id"]');try{const o=await fetch(n.base_url+"/tags"),s=await o.json();if(!o.ok)throw s;for(const l of s){const g=document.createElement("option");g.textContent=l.name,g.value=l.id,a.appendChild(g)}}catch(o){console.log(o)}r.classList.add("is-active")},associateTagToCard:async t=>{t.preventDefault();const e=new FormData(t.target),d={};e.forEach((a,o)=>d[o]=a),console.log(d);const r=JSON.stringify(d);try{console.log(e.get("card_id"));const s=(await(await fetch(`${n.base_url}/cards/${e.get("card_id")}/tag`,{headers:{"Content-Type":"application/json"},method:"POST",body:r})).json()).tags.find(l=>l.id===Number(e.get("tag_id")));return m.makeTagInDOM(s),n.hideModals()}catch(a){console.error(a)}},removeTagToCard:async t=>{const e=t.target.closest(".box").dataset.cardId,d=t.target.dataset.tagId;try{const r=await fetch(n.base_url+"/cards/"+e+"/tag/"+d,{method:"DELETE"});t.target.remove()}catch(r){console.error(r)}}},u={setBaseUrl(t){this.base_url=t},showAddCardModal:t=>{document.getElementById("cardForm").reset();const e=t.target.closest(".panel").dataset.listId;document.getElementById("list_id").setAttribute("value",`${e}`),document.getElementById("addCardModal").classList.add("is-active")},handleAddCardForm:async t=>{try{t.preventDefault();const e=new FormData(t.target),d={};e.forEach((s,l)=>d[l]=s),d.position=n.getLastCardPosition(d.list_id)+1;const r=JSON.stringify(d);console.log(r);const o=await(await fetch(n.base_url+"/cards",{headers:{"Content-Type":"application/json"},method:"POST",body:r})).json();return u.makeCardInDOM(o),n.hideModals()}catch(e){console.error(e)}},makeCardInDOM:t=>{if(console.log(t),"content"in document.createElement("template")){const e=document.getElementById("card_template"),d=document.querySelector(`[data-list-id = '${t.list_id}'] .panel-block`),r=document.importNode(e.content,!0),a=r.querySelector(".box");a.style.backgroundColor=t.color,a.setAttribute("data-card-id",t.id),a.setAttribute("data-card-position",t.position),a.setAttribute("data-card-list_id",t.list_id),a.addEventListener("dragstart",i.dragstartHandler);const o=r.querySelector(".edit-card-form");o.addEventListener("submit",u.editCard),o.querySelector("input").setAttribute("value",t.id),r.querySelector(".card-title").textContent=t.title,r.querySelector(".modify_card_button").addEventListener("click",n.showEditCardForm),r.querySelector(".delete_card_button").addEventListener("click",u.deleteCard),r.querySelector(".associate_tag_button").addEventListener("click",m.showAssociateTagForm),d.appendChild(r)}},editCard:async t=>{try{t.preventDefault();const e=new FormData(t.target),d={};e.forEach((o,s)=>d[s]=o);const r=JSON.stringify(d);console.log(d);const a=await fetch(n.base_url+"/cards/"+d.id,{headers:{"Content-Type":"application/json"},method:"PATCH",body:r});if(a.ok){const o=await a.json(),s=t.target.closest(".box");return s.querySelector(".card-title").textContent=o.title,s.style["background-color"]=o.color,n.hideEditCardForm()}}catch(e){console.error(e)}},deleteCard:async t=>{if(t.preventDefault(),window.confirm("Suppression de la carte ?")){const e=t.target.closest(".box").getAttribute("data-card-id");(await fetch(n.base_url+"/cards/"+e,{method:"DELETE"})).ok&&document.querySelector(`div[data-card-id = '${e}']`).remove()}}},p={showAddModal:()=>{document.getElementById("listForm").reset(),document.getElementById("addListModal").classList.add("is-active")},handleAddForm:async t=>{try{t.preventDefault();const e=new FormData(t.target),d={};e.forEach((o,s)=>d[s]=o);const r=JSON.stringify(d),a=await fetch(n.base_url+"/lists",{headers:{"Content-Type":"application/json"},method:"POST",body:r});if(a.ok){const o=await a.json();return p.makeListInDOM(o),n.hideModals()}}catch(e){console.error(e)}},makeListInDOM:t=>{if("content"in document.createElement("template")){const e=document.getElementById("list_template"),d=document.querySelector(".card-lists"),r=document.importNode(e.content,!0),a=r.querySelector("h2");a.textContent=t.name,a.addEventListener("dblclick",n.showEditListForm);const o=r.querySelector(".edit-list-form");o.addEventListener("submit",p.editListName),o.querySelector("input").setAttribute("value",t.id);const s=r.querySelector(".panel-block");s.addEventListener("dragenter",i.dragEnterHandler),s.addEventListener("dragover",i.dragOverHandler),s.addEventListener("drop",i.dropHandler),s.addEventListener("dragleave",i.dragLeaveHandler);const l=r.querySelector(".panel");l.setAttribute("data-list-id",t.id),l.setAttribute("data-list-position",t.position),l.addEventListener("dragstart",c.dragStartHandler),r.querySelector(".add-list-button").addEventListener("click",u.showAddCardModal),r.querySelector(".delete-list-button").addEventListener("click",p.deleteList),d.appendChild(r)}},editListName:async t=>{try{t.preventDefault();const e=new FormData(t.target),d={};e.forEach((o,s)=>d[s]=o);const r=JSON.stringify(d);console.log(d);const a=await fetch(n.base_url+"/lists/"+d.list_id,{headers:{"Content-Type":"application/json"},method:"PATCH",body:r});if(a.ok){const o=await a.json();return t.target.previousElementSibling.textContent=o.name,n.hideEditListForm()}}catch(e){console.error(e)}},deleteList:async t=>{if(t.preventDefault(),console.log(t.target),window.confirm("Suppression de la carte ?")){const e=t.target.closest("[data-list-id]").getAttribute("data-list-id");(await fetch(n.base_url+"/lists/"+e,{method:"DELETE"})).ok&&document.querySelector(`div[data-list-id = '${e}']`).remove()}}},y={init:()=>{console.log("app.init !"),y.addListenerToActions(),y.createListsHomePage()},addListenerToActions:()=>{document.getElementById("addListButton").addEventListener("click",p.showAddModal),document.querySelectorAll(".is-pulled-right").forEach(t=>t.addEventListener("click",u.showAddCardModal)),document.querySelectorAll(".close").forEach(t=>t.addEventListener("click",n.hideModals)),document.getElementById("listForm").addEventListener("submit",p.handleAddForm),document.getElementById("cardForm").addEventListener("submit",u.handleAddCardForm),document.querySelectorAll("h2").forEach(t=>{t.addEventListener("dblclick",n.showEditListForm),document.querySelectorAll(".modify_card_button").forEach(e=>e.addEventListener("click",n.showEditCardForm))}),document.getElementById("tagForm").addEventListener("submit",m.associateTagToCard)},getListFromAPI:async()=>{try{return(await fetch(n.base_url+"/lists")).json()}catch(t){console.error(t)}},createListsHomePage:async()=>{try{const t=await y.getListFromAPI();for(const e of t){p.makeListInDOM(e);for(const d of e.card){u.makeCardInDOM(d);for(const r of d.tags)m.makeTagInDOM(r)}}}catch(t){console.error(t)}}};document.addEventListener("DOMContentLoaded",y.init);