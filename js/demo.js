const stages = [
    {
        title: "第一阶段：低分区到 5.5",
        desc: "在备考初期，针对基础较弱的学生，无法完整听懂文章内容。此时通过技巧（如定位词、提示词、题型判断），学生可以快速上手。技巧的灵活运用能帮助拿到 5.5 左右的分数。",
        skill: 70,
        strength: 15,
        sSpeed: "4s",
        aSpeed: "3s"
    },
    {
        title: "第二阶段：混乱过渡期",
        desc: "这是最易走弯路、最关键的阶段。学生尝试‘听懂全文’，注意力转向内容导致原技巧失效。正确率大幅下降，感觉‘听了后面忘前面’。这一阶段非常磨炼意志，实力提升缓慢，最需老师引导。",
        skill: 8, 
        strength: 38,
        sSpeed: "1.8s", 
        aSpeed: "3s" // 略微提速，从5.5s降到4.8s，体感更流畅
    },
    {
        title: "第三阶段：6.0 分以上",
        desc: "实力提升后，技巧不再与实力冲突，而是二者相辅相成。正确率回升且高于第一阶段。学生逐渐有了自主学习和总结能力，实力无上限，技巧锦上添花。",
        skill: 85,
        strength: 95,
        sSpeed: "2.7s", 
        aSpeed: "3.5s"
    }
];

let currentIdx = 0;
let isAuto = true;
let timer = null;

const dots = document.getElementById('dot-container');
stages.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = `dot ${i === 0 ? 'active' : ''}`;
    dots.appendChild(d);
});

function updateDisplay() {
    const s = stages[currentIdx];
    document.getElementById('title').innerText = s.title;
    document.getElementById('desc').innerText = s.desc;

    const skillBar = document.getElementById('skill-bar');
    const strengthBar = document.getElementById('strength-bar');

    skillBar.style.transitionDuration = s.sSpeed;
    strengthBar.style.transitionDuration = s.aSpeed;

    skillBar.style.width = s.skill + '%';
    strengthBar.style.width = s.strength + '%';

    document.getElementById('skill-val').innerText = s.skill + '%';
    document.getElementById('strength-val').innerText = s.strength + '%';

    document.querySelectorAll('.dot').forEach((d, i) => {
        d.className = `dot ${i === currentIdx ? 'active' : ''}`;
    });
}

function stopAuto() {
    if (isAuto) {
        isAuto = false;
        clearInterval(timer);
        document.getElementById('status-tag').innerText = "手动控制模式";
        document.getElementById('status-tag').style.color = "#3b82f6";
    }
}

function nextStep() { stopAuto(); currentIdx = (currentIdx + 1) % stages.length; updateDisplay(); }
function prevStep() { stopAuto(); currentIdx = (currentIdx - 1 + stages.length) % stages.length; updateDisplay(); }

timer = setInterval(() => {
    if (isAuto) {
        currentIdx = (currentIdx + 1) % stages.length;
        updateDisplay();
    }
}, 6000);

updateDisplay();