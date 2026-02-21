(function() {
    // ১. ডাটা সেটিংস
    let qxData = JSON.parse(localStorage.getItem('qx_pro_v6')) || {
        name: 'Mynoddin',
        balance: '12,550.00',
        photo: 'https://via.placeholder.com/60'
    };

    // ২. ডিজাইন (হুবহু ছবির মতো পার্পল গ্লো)
    if (!document.getElementById('proStyle')) {
        const style = document.createElement('style');
        style.id = 'proStyle';
        style.innerHTML = `
            #proPanel {
                position: fixed !important; top: 10% !important; left: 50% !important; 
                transform: translateX(-50%) !important; width: 330px !important; 
                background: #0d0d15 !important; color: white !important; border-radius: 15px !important;
                z-index: 2147483647 !important; border: 2px solid #7d2ae8 !important; 
                padding: 20px !important; font-family: sans-serif !important;
                box-shadow: 0 0 30px rgba(125, 42, 232, 0.7) !important;
            }
            .ui-header { background: rgba(255, 0, 100, 0.1); border: 1px solid #ff0064; padding: 10px; border-radius: 8px; text-align: center; font-size: 11px; margin-bottom: 15px; }
            .ui-img { text-align: center; margin-bottom: 15px; }
            .ui-img img { width: 65px; height: 65px; border-radius: 50%; border: 2px solid #7d2ae8; padding: 2px; }
            .ui-in-box { margin-bottom: 12px; }
            .ui-in-box label { display: block; font-size: 10px; color: #9da3b6; margin-bottom: 5px; text-transform: uppercase; }
            .ui-in-box input { width: 100%; background: #161625; border: 1px solid #333; color: #00ff88; padding: 10px; border-radius: 8px; outline: none; box-sizing: border-box; border: 1px solid #444; }
            .ui-btn-apply { width: 100%; background: linear-gradient(90deg, #7d2ae8, #ff00e5); border: none; padding: 12px; color: white; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 10px; }
            .ui-btn-close { width: 100%; background: transparent; color: #555; border: none; padding: 5px; cursor: pointer; font-size: 11px; margin-top: 5px; }
        `;
        document.head.appendChild(style);
    }

    // ৩. প্যানেল তৈরি
    if (!document.getElementById('proPanel')) {
        const panel = document.createElement('div');
        panel.id = 'proPanel';
        panel.innerHTML = `
            <div class="ui-header"><b>DEVELOPER: @PRIVATE_OWNER</b><p style="margin:2px;color:#ff0064;font-weight:bold;">PREMIUM LICENSE ACTIVE</p></div>
            <div class="ui-img"><img src="${qxData.photo}" id="pImgPre"></div>
            <div class="ui-in-box"><label>Leaderboard Name</label><input type="text" id="pName" value="${qxData.name}"></div>
            <div class="ui-in-box"><label>Live Balance ($)</label><input type="text" id="pBal" value="${qxData.balance}"></div>
            <div class="ui-in-box"><label>Photo URL</label><input type="text" id="pPhoto" value="${qxData.photo}"></div>
            <button class="ui-btn-apply" id="pSaveBtn">APPLY SETTINGS</button>
            <button class="ui-btn-close" onclick="document.getElementById('proPanel').remove()">CLOSE MENU</button>
        `;
        document.body.appendChild(panel);
    }

    // ৪. হ্যাকিং ফাংশন (এই অংশটিই আপনার ব্যালেন্স বদলে দেবে)
    function bruteForceUpdate() {
        const bal = document.getElementById('pBal').value;
        const name = document.getElementById('pName').value;

        // ব্যালেন্স টার্গেট করা
        const balEls = document.querySelectorAll('.us-balance__value, .v-money, [class*="balance-value"]');
        balEls.forEach(el => {
            el.innerText = '$' + bal;
        });

        // DEMO লেখাকে LIVE করা
        const typeEls = document.querySelectorAll('.us-balance__type, [class*="balance__type"]');
        typeEls.forEach(el => {
            el.innerText = 'LIVE';
            el.style.color = '#00ff88'; // সবুজ রঙ
        });

        // ডেমো টুপি আইকন (🎓) লুকানো
        const icons = document.querySelectorAll('.us-balance__icon, svg.icon--demo');
        icons.forEach(el => el.style.display = 'none');

        // লিডারবোর্ড ও নাম পরিবর্তন
        document.querySelectorAll('.user-profile__name, .leaderboard__item-name').forEach(el => el.innerText = name);
    }

    // প্রতি ৩০০ মিলিসেকেন্ডে (০.৩ সেকেন্ড) রান হবে যাতে ডাটা পাল্টাতে না পারে
    setInterval(bruteForceUpdate, 300);

    // সেভ বাটন
    document.getElementById('pSaveBtn').onclick = function() {
        const n = document.getElementById('pName').value;
        const b = document.getElementById('pBal').value;
        const p = document.getElementById('pPhoto').value;
        localStorage.setItem('qx_pro_v6', JSON.stringify({name: n, balance: b, photo: p}));
        alert("Settings Applied Successfully!");
    };
})();
