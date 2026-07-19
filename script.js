// ===== 프로젝트 카드 펼침/접힘 =====
document.querySelectorAll(".card-head").forEach(function (head) {
  head.addEventListener("click", function () {
    var expanded = head.getAttribute("aria-expanded") === "true";
    var detail = document.getElementById(head.getAttribute("aria-controls"));
    head.setAttribute("aria-expanded", String(!expanded));
    detail.hidden = expanded;
  });
});

// ===== 이메일 복사 =====
function showToast(message) {
  var toast = document.getElementById("toast");
  toast.textContent = message;
  toast.hidden = false;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(function () {
    toast.classList.remove("show");
    setTimeout(function () { toast.hidden = true; }, 300);
  }, 2000);
}

function copyEmail(email) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(
      function () { showToast("이메일 주소가 복사되었습니다"); },
      function () { showToast(email); }
    );
  } else {
    // 클립보드 API 미지원 환경: 주소를 직접 보여준다
    showToast(email);
  }
}

["copyEmail", "copyEmailHero"].forEach(function (id) {
  var btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener("click", function () {
      copyEmail(btn.getAttribute("data-email"));
    });
  }
});

// ===== 절제된 스크롤 리빌 =====
var revealTargets = document.querySelectorAll(".card, .timeline li, .contact-inner");
revealTargets.forEach(function (el) { el.classList.add("reveal"); });

if ("IntersectionObserver" in window) {
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach(function (el) { io.observe(el); });
} else {
  revealTargets.forEach(function (el) { el.classList.add("in"); });
}
