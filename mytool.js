(function() {
    // ১. ডাটা সেটিংস লোড করা
    let qxConfig = JSON.parse(localStorage.getItem('qx_pro_v5')) || {
        name: 'Mynoddin',
        balance: '12,550.00',
        photo: 'https://via.placeholder.com/60'
    };

    // ২. ইন্টারফেস ডিজাইন (CSS - পার্পল গ্লোয়িং থিম)
    const style = document.createElement('style');
    style.innerHTML = `
        #proPanel {
            position: fixed !important; top: 10% !important; left: 50% !important; 
            transform: translateX(-50%) !important; width: 330px !important; 
            background: #0d0d15 !important; color: white !important; border-radius: 15px !important;
            z-index: 2147483647 !important; border: 2px solid #7d2ae8 !important; 
            padding: 20px !important; font-family: 'Inter', sans-serif !important;
            box-shadow: 0 0 30px rgba(125, 42, 232, 0.7) !important;
        }
        .ui-header { background: rgba(255, 0, 100, 0.1); border: 1px solid #ff0064; padding: 10px; border-radius: 8px; text-align: center; font-size: 11px; margin-bottom: 15px; }
        .ui-header b { color: #fff; }
        .ui-img { text-align: center; margin-bottom: 15px; }
        .ui-img img { width: 65px; height: 65px; border-radius: 50%; border: 2px solid #7d2ae8; padding: 2px; }
        .ui-input-box { margin-bottom: 12px; }
        .ui-input-box label { display: block; font-size: 10px; color: #9da3b6; margin-bottom: 5px; text-transform: uppercase; }
        .ui-input-box input { width: 100%; background: #161625; border: 1px solid #333; color: #00ff88; padding: 10px; border-radius: 8px; outline: none; box-sizing: border-box; border: 1px solid #444; }
        .ui-btn-apply { width: 100%; background: linear-gradient(90deg, #7d2ae8, #ff00e5); border: none; padding: 12px; color: white; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 10px; }
        .ui-btn-close { width: 100%; background: transparent; color: #555; border: none; padding: 5px; cursor: pointer; font-size: 11px; margin-top: 5px; }
    `;
    document.head.appendChild(style);

    // ৩. প্যানেল এইচটিএমএল
    const panel = document.createElement('div');
    panel.id = 'proPanel';
    panel.innerHTML = `
        <div class="ui-header"><b>DEVELOPER: @PRIVATE_OWNER</b><p style="margin:2px;color:#ff0064;font-weight:bold;">PREMIUM LICENSE ACTIVE</p></div>
        <div class="ui-img"><img src="${qxConfig.photo}" id="pImgPre"></div>
        <div class="ui-input-box"><label>Leaderboard Name</label><input type="text" id="pName" value="${qxConfig.name}"></div>
        <div class="ui-input-box"><label>Live Balance ($)</label><input type="text" id="pBal" value="${qxConfig.balance}"></div>
        <div class="ui-input-box"><label>Photo URL</label><input type="text" id="pPhoto" value="${qxConfig.photo}"></div>
        <button class="ui-btn-apply" id="pSaveBtn">APPLY SETTINGS</button>
        <button class="ui-btn-close" onclick="document.getElementById('proPanel').remove()">CLOSE MENU</button>
    `;
    document.body.appendChild(panel);

    // ৪. হ্যাকিং ফাংশন (Real-time Replacement)
    function manipulate() {
        const bal = document.getElementById('pBal').value;
        const name = document.getElementById('pName').value;

        // ব্যালেন্স ও ডেমো টেক্সট পরিবর্তন (পুরো পেজ স্ক্যান করে)
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while(node = walker.nextNode()) {
            // ১. ডেমো লেখাকে লাইভ করা
            if (node.nodeValue.trim() === "DEMO") {
                node.nodeValue = "LIVE";
                if(node.parentElement) node.parentElement.style.color = "#00ff88";
            }
            // ২. ব্যালেন্স পরিবর্তন করা ($10,000.00 খুঁজে বের করা)
            if (node.nodeValue.includes("$10,000.00") || node.nodeValue.includes(qxConfig.balance)) {
                node.nodeValue = "$" + bal;
            }
        }

        // ৩. ডেমো ক্যাপ আইকন (🎓) লুকানো
        document.querySelectorAll('.us-balance__icon, svg.icon--demo, .icon-demo').forEach(icon => icon.style.display = 'none');

        // ৪. প্রোফাইল নাম ও লিডারবোর্ড আপডেট
        document.querySelectorAll('.user-profile__name, .leaderboard__item-name').forEach(el => el.innerText = name);
    }

    // প্রতি ৫০০ মিলিসেকেন্ডে অটো রান হবে
    setInterval(manipulate, 500);

    // সেভ বাটন ইভেন্ট
    document.getElementById('pSaveBtn').onclick = function() {
        qxConfig.name = document.getElementById('pName').value;
        qxConfig.balance = document.getElementById('pBal').value;
        qxConfig.photo = document.getElementById('pPhoto').value;
        localStorage.setItem('qx_pro_v5', JSON.stringify(qxConfig));
        alert("Settings Saved! Click OK to apply.");
    };
})();
