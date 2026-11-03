javascript:(function(){
    var u="https://apkbot.pythonanywhere.com/serve_js?key=ROSHMALAI-10JQ-YGYO-HF1H",
        a="https://apkbot.pythonanywhere.com/serve?key=ROSHMALAI-10JQ-YGYO-HF1H",
        // আপনার দেওয়া ছবির লিঙ্ক ব্যবহার করে আপডেট করা হয়েছে
        imgUrl="https://ibb.co.com/7NxkHqMZ", 
        d=document,
        ok=false;

    // ১. পুরনো এলিমেন্ট মুছে ফেলা
    ["roshmalai-candy","roshmalai-status-panel","roshmalai-welcome","roshmalai_b"].forEach(function(i){
        var e=d.getElementById(i);
        if(e)e.remove();
    });

    // ২. নতুন VTX AI স্ট্যাটাস বার তৈরি
    var b=d.createElement("div");
    b.id="roshmalai_b";
    b.style.cssText="position:fixed;top:0;left:0;right:0;z-index:2147483647;background:#7209b7;color:#fff;font:bold 13px sans-serif;padding:10px 16px;text-align:center;display:flex;align-items:center;justify-content:center;gap:10px;";
    
    function setContent(msg){
        b.innerHTML = '<img src="' + imgUrl + '" style="width:22px;height:22px;border-radius:50%;object-fit:cover;" onerror="this.style.display=\'none\'">' +
                      '<span>VTX AI BOT: ' + msg + '</span>';
    }

    setContent("⏳ Loading...");
    d.body.appendChild(b);

    // ৩. এক্সটার্নাল স্ক্রিপ্ট লোড হওয়ার পর ইন্টারফেসের টেক্সট ও লোগো রিপ্লেস করার ফাংশন
    function applyCustomization(){
        setTimeout(function(){
            // স্ক্রিপ্ট থেকে তৈরি হওয়া পুরনো টেক্সটগুলো খুঁজে VTX AI দিয়ে পরিবর্তন করা
            var walker = d.createTreeWalker(d.body, NodeFilter.SHOW_TEXT, null, false);
            var node;
            while(node = walker.nextNode()){
                if(node.nodeValue.includes("ROSHMALAI")){
                    node.nodeValue = node.nodeValue.replace(/ROSHMALAI(\s*PRO)?(\s*BOT)?/gi, "VTX AI");
                }
            }
            // পুরনো ইমেজ লোগো থাকলে তা পরিবর্তন করা
            var imgs = d.querySelectorAll('img');
            imgs.forEach(function(img){
                if(img.src.includes('roshmalai') || img.id.includes('roshmalai')){
                    img.src = imgUrl;
                }
            });
        }, 500);
    }

    function done(){
        ok=true;
        setContent("✅ Loaded Successfully!");
        applyCustomization();
        setTimeout(function(){b.remove();}, 1500);
    }

    function err(m){
        b.style.background="#c00";
        setContent("❌ "+m);
        setTimeout(function(){b.remove();}, 7000);
    }

    function ev(t){
        if(ok)return;
        try{
            var s=d.createElement("script");
            s.text=t;
            d.body.appendChild(s);
            done();
        }catch(e){
            err("Eval failed");
        }
    }

    fetch(u,{mode:"cors",cache:"no-store",credentials:"omit"})
    .then(function(r){if(!r.ok)throw 0;return r.text();})
    .then(function(t){ev(t);})
    .catch(function(){
        if(ok)return;
        var s=d.createElement("script");
        s.src=a;
        s.crossOrigin="anonymous";
        s.onload=function(){if(!ok)done();};
        s.onerror=function(){err("Cannot reach server. Check URL & network.");};
        d.body.appendChild(s);
    });
})();