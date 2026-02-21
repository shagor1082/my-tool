(function() {
    // ১. সেটিংস লোড
    let qxConfig = JSON.parse(localStorage.getItem('qx_final_v8')) || {
        name: 'Mynoddin',
        balance: '12,550.00'
    };

    // ২. ডিজাইন (পার্পল থিম)
    if (!document.getElementById('qx_style_v8')) {
        const style = document.createElement('style');
        style.id = 'qx_style_v8';
        style.innerHTML = `
            #proPanel {
                position: fixed !important; top: 10% !important; left: 50% !important; 
                transform: translateX(-50%) !important; width: 330px !important; 
                background: #0d0d15 !important; color: white !important; border-radius: 15px !important;
                z-index: 999999999 !important; border: 2px solid #7d2ae8 !important; 
                padding: 20px !important; font-family: sans-serif !important;
                box-shadow: 0 0 30px rgba(125, 42, 232, 0.7) !important;
            }
            .ui-row { margin-bottom: 15px; }
            .ui-row label { display: block; font-size: 11px; color: #9da3b6; margin-bottom: 5px; }
            .ui-row input { width: 100%; background: #161625; border: 1px solid #333; color: #00ff88; padding: 10px; border-radius: 8px; outline: none; box-sizing: border-box; }
            .ui-btn-save { width: 100%; background: linear-gradient(90deg, #7d2ae8, #ff00e5); border: none; padding: 12px; color: white; border-radius: 8px; font-weight: bold; cursor: pointer; }
        `;
        document.head.appendChild(style);
    }

    // ৩. প্যানেল তৈরি
    if (!document.getElementById('proPanel')) {
        const panel = document.createElement('div');
        panel.id = 'proPanel';
        panel.innerHTML = `
            <div style="background:rgba(255,0,100,0.1); border:1px solid #ff0064; padding:10px; border-radius:8px; text-align:center; font-size:11px; margin-bottom:15px;">
                <b>DEVELOPER: @PRIVATE_OWNER</b><p style="margin:2px;color:#ff0064">PREMIUM LICENSE ACTIVE</p>
            </div>
            <div class="ui-row"><label>Leaderboard Name</label><input type="text" id="iName" value="${qxConfig.name}"></div>
            <div class="ui-row"><label>Set Balance ($)</label><input type="text" id="iBal" value="${qxConfig.balance}"></div>
            <button class="ui-btn-save" id="iSave">APPLY & SAVE</button>
            <button style="width:100%; background:transparent; border:none; color:#555; margin-top:10px; cursor:pointer;" onclick="document.getElementById('proPanel').remove()">Close</button>
        `;
        document.body.appendChild(panel);
    }

    // ৪. মূল হ্যাকিং ফাংশন (আইকন, লাইভ স্ট্যাটাস এবং ব্যালেন্স)
    function forceUpdate() {
        const b = document.getElementById('iBal').value;
        const n = document.getElementById('iName').value;

        // টেলিগ্রাম আইকন (সবুজ রঙের)
        const tgIcon = `<svg viewBox="0 0 24 24" style="width:20px; height:20px; fill:#00ff88; vertical-align:middle; margin-right:5px;"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.891 8.146l-2.103 9.917c-.159.704-.577.878-1.167.548l-3.21-2.364-1.549 1.489c-.171.171-.315.315-.644.315l.23-3.268 5.947-5.371c.259-.23-.056-.358-.403-.127l-7.348 4.629-3.17-1.011c-.704-.219-.714-.704.146-1.04l12.404-4.779c.575-.209 1.077.135.815 1.092z"/></svg>`;

        // ১. সব টেক্সট নোড চেক করা (ব্রুট ফোর্স)
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
            // ডেমো লেখাকে লাইভ করা
            if (node.nodeValue.trim() === "DEMO") {
                node.nodeValue = "LIVE";
                if (node.parentElement) {
                    node.parentElement.style.color = "#00ff88";
                    node.parentElement.style.fontWeight = "bold";
                }
            }
            // ব্যালেন্স পরিবর্তন করা ($10,000.00 বা আগের সেভ করা ব্যালেন্স)
            if (node.nodeValue.includes("$10,000.00") || node.nodeValue.includes("$" + qxConfig.balance)) {
                node.nodeValue = "$" + b;
            }
        }

        // ২. আইকন পরিবর্তন (টুপির আইকন সরিয়ে টেলিগ্রাম বসানো)
        const icons = document.querySelectorAll('.us-balance__icon, .icon-demo, svg.icon--demo');
        icons.forEach(icon => {
            if (!icon.classList.contains('tg-ready')) {
                icon.innerHTML = tgIcon;
                icon.classList.add('tg-ready');
                icon.style.display = 'inline-block';
            }
        });

        // ৩. লিডারবোর্ড এবং ইউজার নেম
        document.querySelectorAll('.user-profile__name, .leaderboard__item-name').forEach(el => el.innerText = n);
    }

    // প্রতি ৩০০ মিলিসেকেন্ডে এটি রান হবে (যাতে কোটেক্স পাল্টাতে না পারে)
    setInterval(forceUpdate, 300);

    // সেভ বাটন
    document.getElementById('iSave').onclick = function() {
        qxConfig.name = document.getElementById('iName').value;
        qxConfig.balance = document.getElementById('iBal').value;
        localStorage.setItem('qx_final_v8', JSON.stringify(qxConfig));
        alert("System Applied: Telegram Logo + Live Account!");
    };

})();
