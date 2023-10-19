chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'youtube_url') {
      // alert(request.url) // new url is now in content scripts!

      if (!document.querySelector('.ytdownloaderbtn')) {
        var styleElem = document.head.appendChild(document.createElement("style"));

        styleElem.innerHTML = `
        .ytdownloaderbtn {
            display: inline-flex;
            align-items: center;
            padding: 0px 6px;
            padding-right: 16px;
            margin-left: 8px;
            height: 36px;
            line-height: 36px;
            border-radius: 50px;
            font-size: 14px;
            font-family: Roboto, Arial, sans-serif;
            font-weight: 500;
            color: var(--yt-spec-text-primary);
            background-color: var(--yt-spec-badge-chip-background);
            position: relative;
            overflow: hidden;
        }
        .ytdownloaderbtn:before {
          content: '';
          background-color: var(--yt-spec-badge-chip-background);
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          opacity: 0;
        }
        .ytdownloaderbtn:hover {
          cursor: pointer;
        }
        .ytdownloaderbtn:hover:before {
          opacity: 1;
        }
        .ytdownloaderbtn img {
            filter: invert(1);
            width: 33px;
        }
        .ytdownloaderpopup {
          background-color: #212121;
          // width: 400px;
          height: 400px;
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
          right: 0;
          margin: 0 auto;
          width: 419px;
          max-width: 80vw;
          padding: 24px 0px 12px 0;
          display: flex;
          border-radius: 16px;
          box-shadow: 0px 0px 0 100vw #00000055;
          flex-direction: column;
        }
        .ytdownloaderpopup h1, .ytdownloaderpopup span {
          color: #eee;
          font-size: 16px;
          padding-top: 12px;
          padding-left: 24px;
          font-weight: normal;
        }
        .ytdownloaderpopup h1 {
          font-size: 24px;
        }
        .ytdownloaderpopup ._title_ {
          font-size: 18px;
        }`;
        let a = document.createElement('div')
        a.innerHTML = `<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIiB3aWR0aD0iMjAiPjxwYXRoIGQ9Ik00NzkuOC0zNjQuMDc3cS01LjY2MiAwLTEwLjQyMy0yLjExNS00Ljc2Mi0yLjExNi04Ljk5Mi02LjM0NmwtMTAyLjc3LTEwMi43N3EtNC44NDYtNC43NTUtNS4xMTUtMTEuMjI0LS4yNy02LjQ2OCA1LjYzNy0xMi4wODQgNi4wOTQtNS42MTUgMTEuNzQ3LTUuMjMxIDUuNjU0LjM4NSAxMS4yNyA2LjAwMUw0NjQtNDE0di0zNDZxMC02LjgzOSA0LjUyLTExLjQxOVE0NzMuMDQtNzc2IDQ3OS43ODktNzc2cTYuNzUgMCAxMS40OCA0LjU4MVE0OTYtNzY2LjgzOSA0OTYtNzYwdjM0Nmw4My44NDYtODMuODQ2cTQuNTEzLTQuODQ3IDEwLjcxOC01LjExNiA2LjIwNS0uMjY5IDEyLjI5OSA1LjM0NiA1LjkwNyA1LjYxNiA1LjUyMiAxMS42NTQtLjM4NSA2LjAzOS02IDExLjY1NGwtMTAyLjc3IDEwMS43N3EtNC42MyA0LjIzLTkuMzkyIDYuMzQ2LTQuNzYxIDIuMTE1LTEwLjQyMyAyLjExNVpNMjg4LjMzMi0yMzJRMjY0LTIzMiAyNDgtMjQ4LjE1dC0xNi00MC40NjV2LTMyLjkyM3EwLTYuODM5IDQuNTItMTEuNDIgNC41Mi00LjU4IDExLjI2OS00LjU4IDYuNzQ5IDAgMTEuNDggNC41OCA0LjczMSA0LjU4MSA0LjczMSAxMS40MnYzMi45MjNxMCA5LjIzIDcuNjkyIDE2LjkyM1EyNzkuMzg1LTI2NCAyODguNjE1LTI2NGgzODIuNzdxOS4yMyAwIDE2LjkyMy03LjY5MlE2OTYtMjc5LjM4NSA2OTYtMjg4LjYxNXYtMzIuOTIzcTAtNi44MzkgNC41Mi0xMS40MiA0LjUyMS00LjU4IDExLjI3LTQuNTh0MTEuNDc5IDQuNThxNC43MzEgNC41ODEgNC43MzEgMTEuNDJ2MzIuOTIzcTAgMjQuMzE1LTE2LjE2MiA0MC40NjVRNjk1LjY3Ni0yMzIgNjcxLjM0NC0yMzJIMjg4LjMzMloiLz48L3N2Zz4="><span>Download</span>`
        a.className = "ytdownloaderbtn"
        document.querySelector('#flexible-item-buttons').children[0].style.display = 'none'
        document.querySelector('#flexible-item-buttons').appendChild(a)

        a.addEventListener('click', () => {
          let popup = document.createElement('div')
          popup.className = 'ytdownloaderpopup'
          popup.innerHTML = `<h1>YT Downloader</h1><span class="_title_">Download this video for Free</span><span>Enjoy watching videos offline.</span>`
          document.querySelector('ytd-popup-container').appendChild(popup)
        })
      } else {
        document.querySelector('#flexible-item-buttons').children[0].style.display = 'none'
      }

    }
  });