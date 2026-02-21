(function() {
    // ১. ডাটা সেটিংস
    let qxConfig = JSON.parse(localStorage.getItem('qx_pro_final_v7')) || {
        name: 'Mynoddin',
        balance: '12,550.00',
        photo: 'https://via.placeholder.com/60'
    };

    // ২. ডিজাইন (পার্পল থিম + টেলিগ্রাম আইকন স্টাইল)
    if (!document.getElementById('qxStyle')) {
        const style = document.createElement('style');
        style.id = 'qxStyle';
        style.innerHTML = `
            #proPanel {
                position: fixed !important; top: 10% !important; left: 50% !important; 
                transform: translateX(-50%) !important; width: 330px !important; 
                background: #0d0d15 !important; color: white !important; border-radius: 15px !important;
                z-index: 2147483647 !important; border: 2px solid #7d2ae8 !important; 
                padding: 20px !important; font-family: sans-serif !important;
                box-shadow: 0 0 30px rgba(125, 42, 232, 0.7) !important;
            }
            .ui-h { background: rgba(255, 0, 100, 0.1); border: 1px solid #ff0064; padding: 10px; border-radius: 8px; text-align: center; font-size: 11px; margin-bottom: 15px; }
            .ui-in { margin-bottom: 12px; }
            .ui-in label { display: block; font-size: 10px; color: #9da3b6; margin-bottom: 5px; }
            .ui-in input { width: 100%; background: #161625; border: 1px solid #333; color: #00ff88; padding: 10px; border-radius: 8px; outline: none; box-sizing: border-box; }
            .ui-btn { width: 100%; background: linear-gradient(90deg, #7d2ae8, #ff00e5); border: none; padding: 12px; color: white; border-radius: 8px; font-weight: bold; cursor: pointer; }
            
            /* টেলিগ্রাম আইকন স্টাইল */
            .tg-icon { width: 20px; height: 20px; vertical-align: middle; margin-right: 5px; fill: #00ff88; }
        `;
        document.head.appendChild(style);
    }

    // ৩. প্যানেল তৈরি
    if (!document.getElementById('proPanel')) {
        const panel = document.createElement('div');
        panel.id = 'proPanel';
        panel.innerHTML = `
            <div class="ui-h"><b>DEVELOPER: @PRIVATE_OWNER</b><p style="margin:2px;color:#ff0064;font-weight:bold;">PREMIUM LICENSE ACTIVE</p></div>
            <div class="ui-in"><label>Leaderboard Name</label><input type="text" id="iName" value="${qxConfig.name}"></div>
            <div class="ui-in"><label>Set Balance ($)</label><input type="text" id="iBal" value="${qxConfig.balance}"></div>
            <button class="ui-btn" id="iSave">APPLY & SAVE</button>
            <button style="width:100%; background:transparent; border:none; color:#555; margin-top:8px; cursor:pointer;" onclick="document.getElementById('proPanel').remove()">Close</button>
        `;
        document.body.appendChild(panel);
    }

    // ৪. হ্যাকিং ফাংশন (আইকন এবং টেক্সট পরিবর্তন)
    function updateInterface() {
        const targetBal = document.getElementById('iBal').value;
        const targetName = document.getElementById('iName').value;

        // টেলিগ্রাম আইকন (SVG)
        const tgSvg = `<svg class="tg-icon" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.891 8.146l-2.103 9.917c-.159.704-.577.878-1.167.548l-3.21-2.364-1.549 1.489c-.171.171-.315.315-.644.315l.23-3.268 5.947-5.371c.259-.23-.056-.358-.403-.127l-7.348 4.629-3.17-1.011c-.704-.219-.714-.704.146-1.04l12.404-4.779c.575-.209 1.077.135.815 1.092z"/></svg>`;

        // ১. ব্যালেন্স পরিবর্তন
        document.querySelectorAll('.us-balance__value, .v-money').forEach(el => {
            el.innerText = '$' + targetBal;
        });

        // ২. DEMO লেখাটিকে LIVE করা এবং সবুজ করা
        document.querySelectorAll('.us-balance__type').forEach(el => {
            el.innerText = 'LIVE';
            el.style.color = '#00ff88';
            el.style.fontWeight = 'bold';
        });

        // ৩. টুপির আইকন (🎓) সরিয়ে টেলিগ্রাম আইকন বসানো
        document.querySelectorAll('.us-balance__icon').forEach(el => {
            if (!el.classList.contains('tg-added')) {
                el.innerHTML = tgSvg;
                el.classList.add('tg-added');
                el.style.display = 'inline-block';
            }
        });

        // ৪. লিডারবোর্ড নাম পরিবর্তন
        document.querySelectorAll('.user-profile__name, .leaderboard__item-name').forEach(el => {
            el.innerText = targetName;
        });
    }

    // প্রতি ৫০০ মিলিসেকেন্ডে অটো রান হবে
    setInterval(updateInterface, 500);

    // সেভ বাটন
    document.getElementById('iSave').onclick = function() {
        qxConfig.name = document.getElementById('iName').value;
        qxConfig.balance = document.getElementById('iBal').value;
        localStorage.setItem('qx_pro_final_v7', JSON.stringify(qxConfig));
        alert("Success! Telegram Logo & Live Status Applied.");
    };
})();
