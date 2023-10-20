chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'youtube_url') {

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
          min-height: 400px;
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
          z-index: 10;
          flex-direction: column;
        }
        .ytdownloaderpopup h1, .ytdownloaderpopup > span {
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
        }
        .ytdownloaderpopup .formats {
          margin: 16px 0;
        }
        .radio {
          display: inline-block;
          position: relative;
          margin: 2px 24px;
          font-size: 16px;
          line-height: 36px;
          color: #fff;
       }
        .radio__input {
          position: absolute;
          top: 4px;
          left: 0;
          width: 36px;
          height: 20px;
          opacity: 0;
          z-index: 0;
       }
        .radio__label {
          display: block;
          padding: 0 0 0 36px;
          cursor: pointer;
          color: var(--yt-spec-text-secondary);
          font-family: "Roboto","Arial",sans-serif;
          font-size: 1.4rem;
          /*line-height: 2rem;*/
          font-weight: 400;
       }
        .radio__label:before {
          content: '';
          position: absolute;
          top: 4px;
          left: 0;
          width: 20px;
          height: 20px;
          background-color: transparent;
          border: 2px solid rgb(255 255 255 / 54%);
          border-radius: 14px;
          z-index: 1;
          transition: border-color 0.38s cubic-bezier(0.4, 0, 0.2, 1);
       }
        .radio__label:after {
          content: '';
          position: absolute;
          top: 10px;
          left: 6px;
          width: 12px;
          height: 12px;
          background-color: #3ea6ff;
          border-radius: 50%;
          z-index: 2;
          transform: scale(0, 0);
          transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1);
       }
        .radio__input:checked + .radio__label:before {
          border-color: #3ea6ff;
       }
        .radio__input:checked + .radio__label:after {
          transform: scale(1, 1);
       }
       .btns {
        display: flex;
        flex-direction: row-reverse;
        margin: 0 16px;
       }
       ._btn_ {
        padding: 0 16px;
        height: 36px;
        font-size: 14px;
        line-height: 36px;
        border-radius: 18px;
       }
       ._btn_ {
        padding: 0 16px;
        color: #000;
       }
       ._filledbtn_ {
        background-color: #3ea6ff;
       }
       ._textbtn_ {
        color: #3ea6ff;
        background-color: transparent;
       }
       ._bg_ {
        background-color: #00000055;
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        z-index: 5;
       }`;
        let a = document.createElement('div')
        a.innerHTML = `<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIiB3aWR0aD0iMjAiPjxwYXRoIGQ9Ik00NzkuOC0zNjQuMDc3cS01LjY2MiAwLTEwLjQyMy0yLjExNS00Ljc2Mi0yLjExNi04Ljk5Mi02LjM0NmwtMTAyLjc3LTEwMi43N3EtNC44NDYtNC43NTUtNS4xMTUtMTEuMjI0LS4yNy02LjQ2OCA1LjYzNy0xMi4wODQgNi4wOTQtNS42MTUgMTEuNzQ3LTUuMjMxIDUuNjU0LjM4NSAxMS4yNyA2LjAwMUw0NjQtNDE0di0zNDZxMC02LjgzOSA0LjUyLTExLjQxOVE0NzMuMDQtNzc2IDQ3OS43ODktNzc2cTYuNzUgMCAxMS40OCA0LjU4MVE0OTYtNzY2LjgzOSA0OTYtNzYwdjM0Nmw4My44NDYtODMuODQ2cTQuNTEzLTQuODQ3IDEwLjcxOC01LjExNiA2LjIwNS0uMjY5IDEyLjI5OSA1LjM0NiA1LjkwNyA1LjYxNiA1LjUyMiAxMS42NTQtLjM4NSA2LjAzOS02IDExLjY1NGwtMTAyLjc3IDEwMS43N3EtNC42MyA0LjIzLTkuMzkyIDYuMzQ2LTQuNzYxIDIuMTE1LTEwLjQyMyAyLjExNVpNMjg4LjMzMi0yMzJRMjY0LTIzMiAyNDgtMjQ4LjE1dC0xNi00MC40NjV2LTMyLjkyM3EwLTYuODM5IDQuNTItMTEuNDIgNC41Mi00LjU4IDExLjI2OS00LjU4IDYuNzQ5IDAgMTEuNDggNC41OCA0LjczMSA0LjU4MSA0LjczMSAxMS40MnYzMi45MjNxMCA5LjIzIDcuNjkyIDE2LjkyM1EyNzkuMzg1LTI2NCAyODguNjE1LTI2NGgzODIuNzdxOS4yMyAwIDE2LjkyMy03LjY5MlE2OTYtMjc5LjM4NSA2OTYtMjg4LjYxNXYtMzIuOTIzcTAtNi44MzkgNC41Mi0xMS40MiA0LjUyMS00LjU4IDExLjI3LTQuNTh0MTEuNDc5IDQuNThxNC43MzEgNC41ODEgNC43MzEgMTEuNDJ2MzIuOTIzcTAgMjQuMzE1LTE2LjE2MiA0MC40NjVRNjk1LjY3Ni0yMzIgNjcxLjM0NC0yMzJIMjg4LjMzMloiLz48L3N2Zz4="><span>Download</span>`
        a.className = "ytdownloaderbtn"
        document.querySelector('#flexible-item-buttons').childNodes.forEach((item) => {
          item.style.display = 'none'
        })

        document.querySelector('#flexible-item-buttons').appendChild(a)

        a.addEventListener('click', () => {
          fetch('https://ytdownloader.hmdnjf.repl.co/?id=' + request.url, { mode: 'cors' })
            .then((response) => response.json()) // Parse the response as JSON
            .then((result) => {
              let popup = document.createElement('div')
              let bg = document.createElement('div')
              bg.className = '_bg_'
              popup.className = 'ytdownloaderpopup'
              popup.innerHTML = `<h1>YT Downloader</h1>
            <span class="_title_">Download this video for Free</span>
            <span>Enjoy watching videos offline.</span>
            <!-- RADIO BUTTONS -->
            <div class="formats"></div>
            <div class="btns">
              <div id="_download_" class="ytdownloaderbtn _btn_ _filledbtn_">
                <span>Download</span>
              </div>
              <div id="_cancel_" class="ytdownloaderbtn _btn_ _textbtn_">
                <span>Cancel</span>
              </div>
            </div>`
              document.querySelector('ytd-popup-container').appendChild(popup)
              document.querySelector('ytd-popup-container').appendChild(bg)

              result.formats.sort((a, b) => (a.hasAudio > b.hasAudio) ? -1 : ((b.hasAudio > a.hasAudio) ? 1 : 0))
              for (let i = 0; i < result.formats.length; i++) {
                const item = result.formats[i];
                if (item.qualityLabel) {
                  if (i > 0 && !item.hasAudio && item.qualityLabel === result.formats[i - 1].qualityLabel && item.contentLength > result.formats[i - 1].contentLength || i < result.formats.length - 1 && !item.hasAudio && item.qualityLabel === result.formats[i + 1].qualityLabel && item.contentLength > result.formats[i + 1].contentLength) {
                  } else {
                    var title = ''
                    if (item.hasVideo && item.hasAudio) {
                      title = item.qualityLabel + ' (Standard)'
                    } else if (item.hasVideo && !item.hasAudio) {
                      title = item.qualityLabel + ' (No Audio)'
                    }
                    popup.querySelector('.formats').innerHTML += `
                    <div class="radio">
                        <input type="radio" name="radio" id="radio-${i}" class="radio__input">
                        <label for="radio-${i}" class="radio__label">${title}</label>
                    </div><br>`
                  }
                }

              }
              popup.querySelectorAll('.formats .radio')[0].querySelector('input').checked = true;

              document.querySelector('#_download_').addEventListener('click', () => {
                var selectedFormatId = 0;
                document.querySelectorAll('.radio input').forEach((item) => {
                  if (item.checked) selectedFormatId = item.id.split('-')[1]
                })
                window.open(result.formats[selectedFormatId].url, '_blank')
              })

              document.querySelector('#_cancel_').addEventListener('click', () => {
                popup.remove()
                bg.remove()
              })
            })
        }).catch((error) => console.error(error)); // Handle errors
      } else {
        document.querySelector('#flexible-item-buttons').children[0].style.display = 'none'
      }

    }
  });