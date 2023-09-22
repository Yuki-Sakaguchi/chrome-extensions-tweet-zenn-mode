chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "preformAction") {
    alert("click popup button !");
  }
});

window.addEventListener("load", main);

function main() {
  console.log("main");
  const tweet = document.querySelector('[data-testid="cellInnerDiv"]');
  if (tweet) {
    init();
  } else {
    setTimeout(main, 200);
  }
}

function init() {
  const tweet = document.querySelector('[data-testid="cellInnerDiv"]');
  const wrapper = tweet.parentElement;
  console.log(wrapper);

  const config = {
    childList: true,
  };

  const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        console.log("update child list");
        hideAd();
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(wrapper, config);

  hideAd();
}

function hideAd() {
  console.log("hideAd");
  const tweet = document.querySelectorAll('[data-testid="cellInnerDiv"]');
  for (let i = 0; i < tweet.length; i++) {
    if (tweet[i].style.display === "none") continue;
    const targets = tweet[i].querySelectorAll(
      "span.css-901oao.css-16my406.r-1tl8opc.r-bcqeeo.r-qvutc0"
    );
    for (let j = 0; j < targets.length; j++) {
      if (targets[j].textContent === "プロモーション") {
        console.log("ad");
        tweet[i].style.display = "none";
      }
    }
  }
}
